---
name: api-design
description: "Standar desain API — response shape, versioning, URL convention, pagination, dan error response yang konsisten untuk semua endpoint."
version: "1.0.0"
---

# 🌐 API Design Skill — Standar Endpoint Konsisten

> Melengkapi Engineering Supreme Law Section 8.
> Skill ini berisi TEMPLATE KONKRET yang bisa langsung diterapkan.

================================================================
## RESPONSE SHAPE — WAJIB UNTUK SEMUA ENDPOINT
================================================================

SUKSES (single item):
```json
{
  "data": {
    "id": "uuid-xxx",
    "name": "Contoh",
    "createdAt": "2026-04-18T12:00:00Z"
  },
  "meta": {
    "requestId": "req-uuid-xxx",
    "timestamp": "2026-04-18T12:00:00Z"
  }
}
```

SUKSES (list/collection):
```json
{
  "data": [
    { "id": "uuid-1", "name": "Item 1" },
    { "id": "uuid-2", "name": "Item 2" }
  ],
  "meta": {
    "requestId": "req-uuid-xxx",
    "timestamp": "2026-04-18T12:00:00Z",
    "pagination": {
      "page": 1,
      "limit": 20,
      "totalItems": 150,
      "totalPages": 8
    }
  }
}
```

ERROR:
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email tidak valid",
    "details": [
      {
        "field": "email",
        "message": "Format email salah",
        "value": "bukan-email"
      }
    ]
  },
  "meta": {
    "requestId": "req-uuid-xxx",
    "timestamp": "2026-04-18T12:00:00Z"
  }
}
```

ATURAN RESPONSE:
  - SELALU ada wrapper: `data` atau `error` — TIDAK PERNAH keduanya
  - SELALU ada `meta.requestId` untuk traceability
  - DILARANG mengembalikan object tanpa wrapper
  - DILARANG mencampur `data` dan `error` di satu response

================================================================
## URL CONVENTION
================================================================

FORMAT: /api/v{version}/{resource}

ATURAN:
  - Resource dalam bentuk PLURAL: /users, /products, /orders
  - Gunakan kebab-case: /access-cards, /audit-logs (bukan camelCase)
  - Nested resource maks 2 level: /users/:id/orders
  - DILARANG > 2 level: /users/:id/orders/:id/items ← SALAH
    → Gunakan: /order-items?orderId=xxx

CONTOH LENGKAP:
```
GET    /api/v1/users              ← List (dengan pagination)
GET    /api/v1/users/:id          ← Detail
POST   /api/v1/users              ← Create
PUT    /api/v1/users/:id          ← Full update
PATCH  /api/v1/users/:id          ← Partial update
DELETE /api/v1/users/:id          ← Soft delete

GET    /api/v1/users/:id/orders   ← Nested (maks 2 level)

POST   /api/v1/auth/login         ← Action (verb allowed untuk RPC-style)
POST   /api/v1/reports/generate   ← Action
```

================================================================
## VERSIONING
================================================================

STRATEGI: URL-based versioning (/api/v1/, /api/v2/)

ATURAN:
  - Versi WAJIB ada di URL path (bukan header)
  - Default selalu v1 untuk proyek baru
  - BUAT v2 hanya jika ada breaking change
  - Maintain v1 minimal 6 bulan setelah v2 rilis
  - Dokumentasikan breaking changes di CHANGELOG.md

================================================================
## PAGINATION — WAJIB UNTUK SEMUA LIST ENDPOINT
================================================================

QUERY PARAMS STANDAR:
```
GET /api/v1/products?page=1&limit=20&sort=createdAt&order=desc
```

PARAMETER:
  - page: Nomor halaman (default: 1, min: 1)
  - limit: Item per halaman (default: 20, max: 100)
  - sort: Field untuk sorting (default: createdAt)
  - order: asc atau desc (default: desc)

DILARANG:
  - Endpoint list tanpa pagination
  - Limit > 100 (gunakan cursor-based untuk data besar)
  - Mengembalikan semua data tanpa batasan

================================================================
## FILTER & SEARCH
================================================================

FILTER:
```
GET /api/v1/products?status=active&category=electronics
```

SEARCH (full-text):
```
GET /api/v1/products?q=laptop+gaming
```

FILTER RANGE:
```
GET /api/v1/orders?createdAfter=2026-01-01&createdBefore=2026-12-31
```

================================================================
## HTTP STATUS CODE — REFERENSI CEPAT
================================================================

SUKSES:
  200 OK          ← GET, PUT, PATCH, DELETE berhasil
  201 Created     ← POST berhasil (resource baru dibuat)
  202 Accepted    ← Async job diterima, belum selesai
  204 No Content  ← DELETE berhasil, tidak ada body

CLIENT ERROR:
  400 Bad Request    ← Input tidak valid (format salah)
  401 Unauthorized   ← Belum login / token expired
  403 Forbidden      ← Login tapi tidak punya akses
  404 Not Found      ← Resource tidak ditemukan
  409 Conflict       ← Duplikasi atau race condition
  422 Unprocessable  ← Input valid tapi melanggar business rule

SERVER ERROR:
  500 Internal       ← Bug di server (jangan expose detail)
  502 Bad Gateway    ← Upstream service down
  503 Unavailable    ← Server overloaded / maintenance

DILARANG:
  - Mengembalikan 200 untuk error (anti-pattern)
  - Mengembalikan 500 untuk validation error
  - Menggunakan status code custom (gunakan error.code di body)
