---
name: async-queue
description: "Standar async processing — idempotency, dead-letter queue, retry policy, dan pola 202 Accepted untuk background jobs."
version: "1.0.0"
---

# 📨 Async Queue Skill — Background Jobs & Event Processing

> Melengkapi Engineering Supreme Law Section 11.
> Skill ini berisi POLA IMPLEMENTASI yang sering salah diterapkan.

================================================================
## KAPAN HARUS ASYNC
================================================================

WAJIB ASYNC jika:
  - Operasi > 500ms (email, PDF, report, notifikasi)
  - Fire-and-forget (tidak perlu tunggu hasil)
  - Fan-out ke multiple consumer
  - Operasi yang bisa di-retry jika gagal
  - Integrasi dengan external service yang tidak reliable

TETAP SYNC jika:
  - User butuh hasil langsung (< 200ms)
  - Operasi CRUD sederhana
  - Validasi yang harus blocking

================================================================
## POLA 202 ACCEPTED — TEMPLATE WAJIB
================================================================

FLOW:
```
Client → POST /api/v1/reports/generate
  → Server validasi input
  → Server buat job record (status: PENDING)
  → Server kirim job ke queue
  → Server return 202 Accepted + job ID
  → Client poll GET /api/v1/jobs/:id

Worker → Ambil job dari queue
  → Proses (generate report)
  → Update status: COMPLETED / FAILED
```

RESPONSE 202:
```json
{
  "data": {
    "jobId": "job-uuid-xxx",
    "status": "PENDING",
    "statusUrl": "/api/v1/jobs/job-uuid-xxx",
    "estimatedDuration": 30
  },
  "meta": { "requestId": "req-xxx" }
}
```

RESPONSE POLL (sedang proses):
```json
{
  "data": {
    "jobId": "job-uuid-xxx",
    "status": "PROCESSING",
    "progress": 65,
    "startedAt": "2026-04-18T12:00:00Z"
  }
}
```

RESPONSE POLL (selesai):
```json
{
  "data": {
    "jobId": "job-uuid-xxx",
    "status": "COMPLETED",
    "result": { "url": "/downloads/report-xxx.pdf" },
    "completedAt": "2026-04-18T12:00:30Z"
  }
}
```

JOB STATUS LIFECYCLE:
  PENDING → PROCESSING → COMPLETED
                       → FAILED → RETRYING → COMPLETED
                                            → DEAD (masuk DLQ)

================================================================
## IDEMPOTENCY — MENCEGAH DUPLIKASI
================================================================

MASALAH: Client retry → job dijalankan 2 kali
SOLUSI: Idempotency key

CARA KERJA:
  1. Client kirim header: `X-Idempotency-Key: idem-uuid-xxx`
  2. Server cek: apakah key ini sudah pernah diproses?
  3. Jika sudah → return hasil yang sama tanpa proses ulang
  4. Jika belum → proses dan simpan key + hasil

IMPLEMENTASI:
```javascript
async function ensureIdempotent(key, processFn) {
  // Cek apakah key sudah ada
  const existing = await redis.get(`idempotency:${key}`);
  if (existing) {
    return JSON.parse(existing);
  }

  // Proses dan simpan
  const result = await processFn();
  await redis.set(
    `idempotency:${key}`,
    JSON.stringify(result),
    'EX',
    86400 // TTL 24 jam
  );

  return result;
}
```

ATURAN:
  - Setiap job HARUS bisa dijalankan 2x dengan hasil yang sama
  - Idempotency key disimpan di Redis dengan TTL 24 jam
  - Key = hash dari (userId + action + payload essential fields)

================================================================
## RETRY POLICY — STRATEGI YANG BENAR
================================================================

EXPONENTIAL BACKOFF (default):
```
Attempt 1: delay 1 detik
Attempt 2: delay 2 detik
Attempt 3: delay 4 detik
Attempt 4: delay 8 detik
Attempt 5: delay 16 detik (maks)
→ Jika masih gagal → masuk Dead Letter Queue
```

KONFIGURASI:
```javascript
const RETRY_CONFIG = {
  maxAttempts: 5,
  initialDelay: 1000,
  maxDelay: 16000,
  backoffMultiplier: 2,
  retryableErrors: [
    'ECONNREFUSED',
    'ETIMEDOUT',
    'HTTP_502',
    'HTTP_503',
    'HTTP_429',
  ],
  nonRetryableErrors: [
    'VALIDATION_ERROR',
    'NOT_FOUND',
    'UNAUTHORIZED',
    'HTTP_400',
    'HTTP_422',
  ],
};
```

ATURAN RETRY:
  - HANYA retry untuk error transient (network, timeout, 5xx)
  - JANGAN retry untuk error bisnis (validation, 4xx)
  - SELALU gunakan exponential backoff (bukan fixed interval)
  - SELALU ada maxAttempts (jangan retry selamanya)
  - Catat setiap retry ke log (level: warn)

================================================================
## DEAD LETTER QUEUE (DLQ)
================================================================

TUJUAN: Menangkap job yang gagal setelah semua retry habis.

FLOW:
```
Queue Utama → Worker proses → Gagal → Retry (5x)
  → Masih gagal → Pindah ke DLQ
  → DLQ dimonitor manual / alert
  → Admin investigate → Fix → Replay dari DLQ
```

ATURAN DLQ:
  - Setiap queue WAJIB punya DLQ pasangannya
  - Job di DLQ WAJIB menyimpan:
    - Payload asli (untuk replay)
    - Error terakhir (untuk investigasi)
    - Jumlah attempt
    - Timestamp setiap attempt
  - DLQ WAJIB di-monitor (alert jika > 0 item)
  - Jangan auto-retry dari DLQ (investigasi dulu)

FORMAT DLQ ENTRY:
```json
{
  "originalJobId": "job-xxx",
  "payload": { "userId": "usr-xxx", "action": "sendEmail" },
  "attempts": 5,
  "lastError": {
    "name": "TimeoutError",
    "message": "SMTP server timeout after 30s"
  },
  "history": [
    { "attempt": 1, "at": "...", "error": "ECONNREFUSED" },
    { "attempt": 2, "at": "...", "error": "ECONNREFUSED" },
    { "attempt": 5, "at": "...", "error": "TimeoutError" }
  ],
  "deadAt": "2026-04-18T12:05:00Z"
}
```

================================================================
## WORKER BEST PRACTICES
================================================================

  1. Graceful shutdown — Selesaikan job yang sedang berjalan
  2. Concurrency limit — Jangan proses terlalu banyak sekaligus
  3. Timeout per job — Jangan biarkan job berjalan selamanya
  4. Health check — Worker juga perlu /health endpoint
  5. Idempotent — Setiap job harus aman di-retry
