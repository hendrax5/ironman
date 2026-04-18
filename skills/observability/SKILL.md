---
name: observability
description: "Standar observability — structured logging, tracing, metrics, dan health check yang konsisten untuk semua service."
version: "1.0.0"
---

# 📡 Observability Skill — Structured Logging & Tracing

> Melengkapi Engineering Supreme Law Section 10.
> Skill ini mendefinisikan FIELD WAJIB dan FORMAT EKSAK.

================================================================
## STRUCTURED LOG — FORMAT WAJIB
================================================================

Setiap baris log HARUS berupa JSON dengan field berikut:

```json
{
  "timestamp": "2026-04-18T12:00:00.123Z",
  "level": "info",
  "traceId": "abc-123-def-456",
  "spanId": "span-789",
  "requestId": "req-uuid-xxx",
  "module": "user-service",
  "action": "createUser",
  "message": "User berhasil dibuat",
  "userId": "usr-xxx",
  "duration": 45,
  "metadata": {}
}
```

FIELD WAJIB (harus selalu ada):
  - timestamp  : ISO 8601 dengan millisecond
  - level      : error | warn | info | debug
  - traceId    : ID trace dari request masuk (propagasi)
  - module     : Nama modul/service yang menulis log
  - action     : Nama fungsi/operasi yang sedang berjalan
  - message    : Pesan yang bisa dibaca manusia

FIELD KONTEKSTUAL (ada jika relevan):
  - requestId  : ID unik per HTTP request
  - spanId     : ID span untuk distributed tracing
  - userId     : ID user yang melakukan aksi
  - tenantId   : ID tenant (untuk multi-tenant)
  - duration   : Waktu eksekusi dalam ms
  - metadata   : Data tambahan spesifik operasi

DILARANG DI LOG:
  - Password, token, secret, API key
  - PII: email, nomor HP, alamat (kecuali di-mask)
  - Request/response body lengkap (terlalu besar)
  - Stack trace di level info (hanya di error)

================================================================
## LOG LEVEL — KAPAN PAKAI APA
================================================================

ERROR:
  - Operasi gagal dan TIDAK bisa di-recover otomatis
  - Perlu perhatian manusia
  - Contoh: DB connection lost, payment gateway timeout
  ```json
  {
    "level": "error",
    "message": "Gagal koneksi ke database",
    "error": {
      "name": "ConnectionError",
      "message": "ECONNREFUSED 5432",
      "stack": "..."
    }
  }
  ```

WARN:
  - Operasi berhasil tapi ada yang tidak ideal
  - Perlu monitoring tapi belum kritis
  - Contoh: Retry berhasil, cache miss, deprecated API
  ```json
  {
    "level": "warn",
    "message": "Cache miss untuk key products:list",
    "cacheKey": "products:list:page1"
  }
  ```

INFO:
  - Operasi normal yang perlu dicatat
  - Checkpoint bisnis penting
  - Contoh: User created, order completed, deploy success
  ```json
  {
    "level": "info",
    "message": "Order selesai diproses",
    "orderId": "ord-xxx",
    "amount": 150000
  }
  ```

DEBUG:
  - Detail teknis untuk troubleshooting
  - DILARANG di production (disable via env var)
  - Contoh: Query params, function arguments

================================================================
## TRACING — PROPAGASI traceId
================================================================

CARA KERJA:
  1. Request masuk → ambil traceId dari header `x-trace-id`
  2. Jika tidak ada → generate UUID baru
  3. Simpan di context (AsyncLocalStorage / cls-hooked)
  4. SEMUA log dalam request ini WAJIB pakai traceId yang sama
  5. Jika memanggil service lain → kirim traceId di header

IMPLEMENTASI (Node.js):
```javascript
// middleware/tracing.js
const { AsyncLocalStorage } = require('async_hooks');
const { v4: uuid } = require('uuid');

const traceStore = new AsyncLocalStorage();

function tracingMiddleware(req, res, next) {
  const traceId = req.headers['x-trace-id'] || uuid();
  const requestId = uuid();

  res.setHeader('x-trace-id', traceId);
  res.setHeader('x-request-id', requestId);

  traceStore.run({ traceId, requestId }, () => next());
}

function getTrace() {
  return traceStore.getStore() || {};
}

module.exports = { tracingMiddleware, getTrace };
```

================================================================
## HEALTH CHECK — ENDPOINT WAJIB
================================================================

LIVENESS (apakah service hidup?):
```
GET /health/live → 200 { "status": "ok" }
```

READINESS (apakah service siap terima traffic?):
```
GET /health/ready → 200
{
  "status": "ok",
  "checks": {
    "database": { "status": "ok", "latency": 5 },
    "redis": { "status": "ok", "latency": 2 },
    "queue": { "status": "ok", "latency": 8 }
  }
}
```

JIKA ADA DEPENDENCY YANG DOWN:
```
GET /health/ready → 503
{
  "status": "degraded",
  "checks": {
    "database": { "status": "ok", "latency": 5 },
    "redis": {
      "status": "error",
      "message": "Connection refused"
    }
  }
}
```

ATURAN:
  - /health/live TIDAK boleh cek dependency (hanya cek process hidup)
  - /health/ready WAJIB cek semua dependency kritis
  - Kedua endpoint TANPA auth (agar load balancer bisa akses)
  - Response time health check < 5 detik (timeout)

================================================================
## METRICS — STANDAR YANG HARUS DIEXPOSE
================================================================

WAJIB (jika menggunakan Prometheus):
  - http_requests_total (counter, label: method, path, status)
  - http_request_duration_seconds (histogram)
  - db_query_duration_seconds (histogram)
  - active_connections (gauge, label: pool_name)
  - error_total (counter, label: type, module)
