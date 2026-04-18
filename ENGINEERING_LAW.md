================================================================
[ENGINEERING SUPREME LAW — MODULAR ARCHITECTURE POLICY]
Version: 3.0 — STRICT ENFORCEMENT, NO EXCEPTION
================================================================

BERLAKU UNTUK: semua code generation, semua agent, semua task.
Semua komentar, dokumentasi, dan penjelasan dalam BAHASA INDONESIA.
Syntax kode tetap menggunakan bahasa pemrograman aslinya.

================================================================
SECTION 0 — TIGA HUKUM UTAMA (TIDAK BOLEH DILANGGAR)
================================================================

HUKUM 1 — Satu modul = satu domain = satu alasan untuk berubah.
HUKUM 2 — Bergantung pada abstraksi, bukan pada implementasi konkret.
HUKUM 3 — Gagal secara lokal. Satu modul tidak boleh meruntuhkan sistem.

PRINSIP INTI:
Setiap modul harus bisa dipahami, diubah, ditest, dan di-deploy
secara MANDIRI tanpa menyentuh modul lain.

================================================================
SECTION 1 — WORKFLOW LAW (WAJIB SEBELUM CODING)
================================================================

URUTAN YANG TIDAK BOLEH DILANGGAR:

  LANGKAH 1 — Buat implementation_plan.md terlebih dahulu.
              Isi minimal:
              - Daftar modul yang akan dibuat/diubah
              - Dependency antar modul
              - Struktur file yang akan dibuat
              - Edge case yang sudah dipertimbangkan
              - Rencana test

  LANGKAH 2 — Tunggu plan disetujui.

  LANGKAH 3 — Baru mulai coding sesuai plan.

JIKA TIDAK ADA PLAN → STOP. BUAT PLAN DULU.
JIKA PLAN BELUM DISETUJUI → STOP. TUNGGU.

================================================================
SECTION 2 — MAINTAINABILITY & READABILITY LAW
================================================================

BATAS UKURAN — hard limit, refactor sebelum melampaui:
  - Maksimal 300 baris per file (tidak termasuk import dan type def)
  - Maksimal 30 baris per function body
  - Maksimal 4 parameter per function (gunakan options object jika lebih)
  - Maksimal 3 level nesting di dalam function body
  - Maksimal 10 public method per class
  - Maksimal 100 karakter per baris (hard limit 120 karakter)
  - ZERO HORIZONTAL SCROLL — tidak boleh ada yang harus scroll ke kanan

JIKA BATAS TERLAMPAUI:
→ WAJIB refactor sebelum lanjut
→ DILARANG melanjutkan ke step berikutnya

POLA YANG DIWAJIBKAN:
  - Gunakan Early Return Pattern untuk mengurangi nesting
  - Gunakan object destructuring untuk function dengan >2 parameter
  - Hindari deep if-else (maksimal nesting depth: 2–3)
  - Kode harus bisa dibaca tanpa penjelasan
  - Setiap function harus bisa dijelaskan dalam SATU kalimat

NAMING CONVENTION — konsisten di seluruh codebase:
  - File:      kebab-case             → user-profile.service.ts
  - Class:     PascalCase             → UserProfileService
  - Method:    camelCase              → getUserById()
  - Type/DTO:  PascalCase + suffix    → UserCreateDto, UserEntity
  - Enum:      PascalCase.UPPER       → UserStatus.ACTIVE
  - Konstanta: UPPER_SNAKE_CASE       → MAX_LOGIN_ATTEMPTS
  - Tabel DB:  snake_case             → user_sessions
  - Env var:   UPPER_SNAKE_CASE       → DATABASE_URL
  - Nama ambigu (data, info, temp, x, y) → DILARANG

================================================================
SECTION 3 — PROJECT STRUCTURE LAW
================================================================

STRUKTUR FOLDER — feature-first, selalu:

  src/
  ├── modules/                    ← domain feature modules
  │   ├── user/
  │   │   ├── user.controller.ts
  │   │   ├── user.service.ts
  │   │   ├── user.repository.ts
  │   │   ├── user.schema.ts      ← DB schema / model
  │   │   ├── user.dto.ts         ← request/response shapes
  │   │   ├── user.errors.ts      ← domain-specific errors
  │   │   ├── user.types.ts       ← interfaces & types
  │   │   ├── user.spec.ts        ← unit tests
  │   │   └── index.ts            ← barrel export (public API)
  │   └── [domain-lain]/
  ├── shared/                     ← utility lintas modul, pure only
  │   ├── utils/                  ← pure functions, tanpa side effect
  │   ├── types/                  ← global shared types/interfaces
  │   ├── constants/              ← konstanta seluruh aplikasi
  │   └── decorators/             ← reusable decorators
  ├── core/                       ← infrastruktur dan wiring
  │   ├── config/                 ← env loader & validator
  │   ├── database/               ← koneksi DB, base repository
  │   ├── http/                   ← HTTP server bootstrap
  │   ├── queue/                  ← job queue setup
  │   ├── cache/                  ← cache client setup
  │   ├── logger/                 ← logger factory
  │   └── errors/                 ← base error classes
  └── main.ts                     ← entry point only, tanpa logic

================================================================
SECTION 4 — ARCHITECTURE & LAYER LAW
================================================================

ALUR WAJIB — satu arah, tidak boleh dibalik:
  Presentation → API (Controller) → Service → Repository → Data

ARAH DEPENDENCY — strict one-way:
  modules  → shared   (diizinkan)
  modules  → core     (diizinkan)
  shared   → modules  (DILARANG)
  core     → modules  (DILARANG)
  moduleA  → moduleB  (DILARANG — gunakan interface + event)

TANGGUNG JAWAB TIAP LAYER:

  CONTROLLER — batas HTTP, tidak lebih:
    Boleh:
      - Parse dan validasi request (via DTO + validation pipe)
      - Memanggil SATU service method
      - Memetakan hasil service ke HTTP response
      - Menangkap DomainError dan memetakannya ke HTTP status
    DILARANG:
      - Business logic atau kondisional domain
      - Akses langsung ke repository atau database
      - Memanggil lebih dari satu service dan menggabungkan hasilnya
      - Mengetahui struktur internal DB atau entity

  SERVICE — pemilik business logic:
    Boleh:
      - Orkestrasi operasi bisnis
      - Menegakkan business rule dan invariant
      - Memanggil repository
      - Emit domain event
      - Wrap operasi multi-repository dalam transaction
      - Memanggil service lain HANYA via interface (bukan concrete class)
    DILARANG:
      - Konsep HTTP (req, res, status code, header)
      - Konstruksi query langsung (itu tugas repository)
      - Memulai, commit, atau rollback transaction
      - Import concrete class dari modul lain secara langsung

  REPOSITORY — pemilik data access:
    Boleh:
      - Semua operasi baca/tulis DB untuk entity domain-nya sendiri
      - Konstruksi query, filter, sort, pagination
      - Mapping DB row/document ke domain entity type
    DILARANG:
      - Business logic atau validasi
      - Memulai, commit, atau rollback transaction
        (transaction boundary milik service layer)
      - Memanggil repository modul lain secara langsung
      - Memanggil service apapun

  DOMAIN ENTITY / MODEL:
    Boleh:
      - Menyimpan domain state
      - Computed property yang bermakna domain
        (contoh: order.isCancellable(), user.isActive())
    DILARANG:
      - DB call, HTTP call, atau I/O apapun

  DTO (Data Transfer Object):
    - DTO terpisah untuk setiap operasi: CreateUserDto, UpdateUserDto
    - DTO hanya berisi validation decorator, bukan logic
    - DILARANG reuse DTO sebagai DB entity atau domain model
    - DILARANG return raw DB entity ke client — selalu map ke response DTO

KOMUNIKASI LINTAS MODUL — hanya dua pola yang diizinkan:

  POLA A — Dependency Inversion (sinkron, untuk data yang dibutuhkan):
    1. Definisikan interface di modul KONSUMEN
    2. Daftarkan implementasi via DI container
    3. Konsumen bergantung pada interface, bukan concrete class
    Contoh:
      // di order/order.types.ts
      export interface IUserProvider {
        findById(id: string): Promise<UserSnapshot>
      }
      // DI container menghubungkan UserService → IUserProvider

  POLA B — Domain Event (asinkron, untuk side effect):
    1. Publisher emit typed domain event, tidak tahu siapa subscriber
    2. Subscriber mendaftarkan handler secara independen
    3. Event payload adalah plain immutable data object
    Contoh:
      publisher:  eventBus.emit('user.created', { userId, email })
      subscriber: eventBus.on('user.created', handler)

  SELAIN DUA POLA INI → HARD VIOLATION

================================================================
SECTION 5 — DATA ACCESS LAW
================================================================

ATURAN QUERY:
  - Semua akses DB hanya lewat repository layer — tanpa pengecualian
  - Pilih hanya kolom yang dibutuhkan (dilarang SELECT *)
  - Hindari N+1: gunakan eager loading atau batched query untuk relasi
  - Semua endpoint list WAJIB implementasi pagination (cursor atau offset)
  - Tambahkan index DB untuk setiap kolom di WHERE, JOIN, ORDER BY
  - Gunakan EXPLAIN ANALYZE di development untuk query penting

ATURAN TRANSACTION:
  - Service layer yang memiliki transaction boundary
  - Jika service method mengubah lebih dari satu aggregate,
    WAJIB wrap dalam satu transaction
  - Repository aware terhadap transaction, tapi tidak pernah memulainya
  - Transaction harus se-singkat mungkin
  - DILARANG melakukan HTTP call eksternal di dalam open transaction

MIGRASI:
  - Semua perubahan schema via migration file — dilarang ubah schema manual
  - Migration file immutable setelah merge ke main
  - Setiap migration harus reversible (sertakan method down())
  - Penamaan: YYYYMMDDHHMMSS_deskripsi_perubahan

================================================================
SECTION 6 — VALIDATION LAW
================================================================

TIGA LAYER VALIDASI — masing-masing punya peran berbeda:

  LAYER 1 — HTTP input (Controller/DTO level):
    - Validasi shape request, required fields, tipe data, format
    - Tolak request malformed sebelum mencapai service
    - Return 400 Bad Request dengan detail error per field

  LAYER 2 — Business rule (Service level):
    - Validasi terhadap state domain (contoh: "email sudah dipakai")
    - Validasi constraint lintas entity
    - Throw DomainError (bukan HTTP error) jika gagal

  LAYER 3 — DB constraint (Database level):
    - Unique constraint, foreign key, not-null sebagai jaring pengaman
    - JANGAN andalkan DB constraint sebagai SATU-SATUNYA validasi

  ATURAN: Jangan duplikasi validasi antar layer.
  Setiap layer hanya validasi apa yang HANYA bisa diketahuinya.

================================================================
SECTION 7 — ERROR HANDLING LAW
================================================================

TAKSONOMI ERROR — gunakan tipe yang tepat untuk layer yang tepat:

  class AppError extends Error {
    constructor(
      public readonly code: string,      // konstanta machine-readable
      message: string,                   // deskripsi human-readable
      public readonly statusHint?: number
    ) { super(message) }
  }

  class DomainError    extends AppError {}  // pelanggaran business rule
  class NotFoundError  extends DomainError {} // entity tidak ditemukan
  class ConflictError  extends DomainError {} // konflik state
  class ValidationError extends AppError {}   // input tidak valid
  class InfraError     extends AppError {}    // DB/queue/network gagal
  class UnauthorizedError extends AppError {} // autentikasi gagal
  class ForbiddenError    extends AppError {} // otorisasi gagal

PEMETAAN HTTP ERROR (di centralized error handler, bukan di controller):
  DomainError       → 422 Unprocessable Entity
  NotFoundError     → 404 Not Found
  ConflictError     → 409 Conflict
  ValidationError   → 400 Bad Request
  UnauthorizedError → 401 Unauthorized
  ForbiddenError    → 403 Forbidden
  InfraError        → 503 Service Unavailable
  Unknown           → 500 Internal Server Error (jangan expose detail)

RESPONSE SHAPE ERROR — konsisten di semua endpoint:
  {
    "error": {
      "code":    "USER_NOT_FOUND",
      "message": "User tidak ditemukan",
      "details": [...]            // opsional: field-level error
    },
    "requestId": "uuid"           // selalu sertakan untuk tracing
  }

ATURAN:
  - Service throw typed error, controller tidak pernah throw HTTP error
  - DILARANG swallow error secara diam-diam (empty catch block = forbidden)
  - DILARANG expose stack trace, internal path, atau DB error ke client
  - Setiap unhandled promise rejection WAJIB ditangkap di app level
  - Kegagalan layanan eksternal WAJIB di-wrap dalam InfraError

================================================================
SECTION 8 — API DESIGN LAW
================================================================

STRUKTUR URL:
  - Semua API diberi versi: /api/v1/resource
  - Resource menggunakan plural noun: /users, /orders, /products
  - Nested resource maksimal 2 level: /users/:id/orders
  - Aksi yang tidak map ke CRUD gunakan sub-resource verb:
    POST /orders/:id/cancel   (bukan GET /cancelOrder)

HTTP METHOD:
  GET    → baca, idempotent, tanpa side effect
  POST   → buat atau trigger aksi
  PUT    → replace penuh (idempotent)
  PATCH  → update sebagian (idempotent)
  DELETE → hapus (idempotent)

RESPONSE SHAPE — konsisten di semua endpoint:

  Single resource:
  { "data": { ...resource }, "meta": {} }

  Collection:
  { "data": [...], "meta": { "total": n, "page": n, "limit": n } }

  Tanpa konten:
  HTTP 204, body kosong

VERSIONING:
  - Breaking change WAJIB buat versi baru (v1 → v2)
  - Dilarang modifikasi contract versi yang sudah ada
  - Tambahan non-breaking (field opsional baru) boleh di tempat yang sama
  - Versi lama di-deprecate dengan Sunset header sebelum dihapus

================================================================
SECTION 9 — SECURITY LAW (BLUE TEAM MODE)
================================================================

ASUMSI DASAR: sistem sedang dalam kondisi diserang.
Semua input dari luar adalah tidak terpercaya.

INPUT SECURITY:
  - Validasi dan sanitasi SEMUA input eksternal sebelum diproses
  - Whitelist field yang diizinkan — jangan pass raw request body ke DB
  - Parameterized query only — dilarang string concatenation SQL/NoSQL

AUTENTIKASI:
  - Ditegakkan di middleware/gateway level, sebelum mencapai controller
  - Controller menerima objek identity yang sudah terverifikasi dan bertype
  - Dilarang re-validasi token di dalam service atau repository

OTORISASI:
  - Permission check terjadi di service layer entry point
  - Gunakan RBAC atau ABAC secara konsisten — dilarang if/else ad-hoc
  - Controller DILARANG mengandung logic permission apapun
  - Service WAJIB cek otorisasi sebelum mutasi state apapun

SECRETS & CONFIG:
  - Secret HANYA di environment variable — dilarang di kode atau komentar
  - Validasi semua env var yang dibutuhkan saat aplikasi startup
  - Aplikasi WAJIB fail fast dengan error deskriptif jika config wajib hilang
  - DILARANG log secret, token, password, atau PII
  - Rotasi secret tanpa perubahan kode (dilarang hardcoded fallback)

JIKA VULNERABILITY DITEMUKAN:
→ BLOCK deployment
→ WAJIB diperbaiki sebelum lanjut

================================================================
SECTION 10 — OBSERVABILITY LAW
================================================================

LOGGING — structured JSON wajib, dilarang plain text di production:

  Field wajib di SETIAP log entry:
  {
    "timestamp":  "ISO-8601",
    "level":      "error|warn|info|debug",
    "traceId":    "uuid — propagasi dari header X-Trace-Id",
    "spanId":     "uuid — unik per operasi",
    "module":     "user-service",
    "message":    "deskripsi human-readable dalam Bahasa Indonesia",
    "context":    { ...data relevan yang tidak sensitif }
  }

LOG LEVEL — penggunaan ketat:
  ERROR — sistem tidak bisa lanjut, butuh perhatian segera
          (unhandled exception, DB down, config hilang)
  WARN  — masalah recoverable, state terdegradasi
  INFO  — business event normal (user dibuat, order ditempatkan)
  DEBUG — detail developer, dinonaktifkan di production

TITIK LOG WAJIB:
  - Setiap HTTP request masuk: method, path, statusCode, durationMs
  - Setiap HTTP call keluar: method, url, statusCode, durationMs
  - Setiap domain event yang di-emit dan diterima
  - Setiap error yang di-throw, dengan konteks lengkap
  - Startup dan shutdown aplikasi

TRACING:
  - Generate X-Trace-Id di API gateway jika belum ada
  - Propagasi traceId melalui SEMUA operasi async, event, dan queue
  - Sertakan traceId di semua error response ke client

DILARANG DI LOG:
  - Password, token, API key, secret
  - PII lengkap (masking: email → us***@gmail.com)
  - Data pembayaran atau kartu
  - Request body endpoint autentikasi

LOG AKTIVITAS MENCURIGAKAN:
  - Setiap percobaan login gagal berulang
  - Akses ke resource yang tidak diotorisasi
  - Request rate yang abnormal
  - Input yang terdeteksi sebagai injection attempt

================================================================
SECTION 11 — ASYNC & BACKGROUND PROCESSING LAW
================================================================

KAPAN HARUS PAKAI QUEUE:
  - Operasi > 500ms (kirim email, proses gambar, generate laporan)
  - Operasi harus survive server restart (pembayaran, side effect kritis)
  - Operasi adalah side effect dari aksi utama (fire and forget)
  - Fan-out ke banyak consumer (domain event → N handler)

ATURAN QUEUE:
  - Job WAJIB idempotent — aman untuk di-retry saat gagal
  - Job WAJIB punya idempotency key unik untuk cegah duplikasi
  - Definisikan retry policy secara eksplisit: max attempt, backoff
  - Definisikan dead-letter queue untuk job yang habis retry-nya
  - Job payload adalah plain serializable data — bukan class instance
  - DILARANG menaruh secret atau PII sensitif di job payload

OPERASI LONG-RUNNING:
  - API return 202 Accepted + job ID segera
  - Client poll /jobs/:id untuk status atau terima webhook
  - DILARANG blokir HTTP response menunggu operasi async selesai

================================================================
SECTION 12 — CACHING LAW
================================================================

ATURAN CACHE:
  - Cache di service layer, bukan di repository
  - Definisikan TTL eksplisit untuk setiap cache entry
  - Definisikan strategi invalidasi cache sebelum implementasi
  - Cache key harus deterministik dan di-namespace per modul:
    Format: {module}:{entity}:{id} → user:profile:abc123
  - DILARANG cache data sensitif (token, password, PII)
  - Cache MISS harus transparan — hasil sama dengan cache HIT
  - Data read-heavy, jarang berubah = kandidat cache yang baik
  - Data write-heavy, real-time = hindari caching

================================================================
SECTION 13 — TESTABILITY LAW
================================================================

TEST PYRAMID — tulis dalam rasio ini:
  70% Unit test         (cepat, terisolasi, mock semua I/O)
  20% Integration test  (DB nyata di test container, mock HTTP eksternal)
  10% E2E test          (full stack, hanya critical user flow)

ATURAN UNIT TEST:
  - Setiap service method WAJIB punya minimal satu unit test
  - Setiap domain entity method WAJIB punya minimal satu unit test
  - Setiap error path WAJIB punya test case tersendiri
  - Gunakan mock untuk: repository, API eksternal, event bus, queue
  - DILARANG gunakan DB, filesystem, atau network nyata di unit test
  - Test harus deterministik — data random harus pakai seeded faker
  - File test berada di folder yang sama dengan file yang ditest

COVERAGE MINIMUM:
  - Service layer:    minimal 85% line coverage
  - Domain entity:    minimal 90% line coverage
  - Repository layer: minimal 70% line coverage
  - Controller:       minimal 60% line coverage

PENAMAAN TEST:
  describe('UserService') {
    describe('createUser') {
      it('harus membuat user dan emit event user.created')
      it('harus throw ConflictError jika email sudah ada')
      it('harus throw ValidationError jika email tidak valid')
    }
  }

================================================================
SECTION 14 — CONFIGURATION LAW
================================================================

ATURAN CONFIG:
  - Semua config dari environment variable — dilarang dari file
    yang di-commit ke source control
  - Semua env var divalidasi dan diberikan type saat startup aplikasi
  - Aplikasi WAJIB fail fast dengan error deskriptif jika var wajib hilang
  - DILARANG gunakan process.env langsung di dalam modul — inject config
  - Config object read-only setelah inisialisasi
  - Sediakan .env.example dengan semua key yang dibutuhkan (tanpa value asli)

POLA AKSES CONFIG:
  BENAR:   constructor(@Inject(CONFIG) private config: AppConfig)
  SALAH:   const url = process.env.DATABASE_URL (di dalam modul)

================================================================
SECTION 15 — DEPLOYMENT LAW
================================================================

CONTAINER:
  - Setiap service WAJIB punya Dockerfile
  - Multi-stage build untuk meminimalkan ukuran image final
  - Aplikasi berjalan sebagai non-root user di dalam container
  - Satu proses per container — dilarang supervisor atau pm2 dalam Docker
  - Container WAJIB stateless — dilarang simpan state di local filesystem
  - Semua state disimpan di luar (DB, object storage, cache cluster)
  - Multi-service WAJIB gunakan docker-compose
  - Harus bisa dijalankan dengan: docker-compose up
  - Dilarang ada kode yang environment-specific di dalam source

HEALTH CHECK:
  - GET /health/live   → 200 jika proses berjalan
  - GET /health/ready  → 200 hanya jika semua koneksi up
                         (DB, cache, queue — fail jika salah satu down)
  - Kedua endpoint dikecualikan dari auth middleware
  - Kedua endpoint dikecualikan dari rate limiting

GRACEFUL SHUTDOWN:
  - Handle SIGTERM: berhenti menerima request baru
  - Selesaikan in-flight request sebelum tutup (drain, max 30 detik)
  - Tutup koneksi DB, queue secara bersih
  - Exit code 0 untuk shutdown bersih, non-zero untuk error

================================================================
SECTION 16 — UI/UX LAW (untuk project dengan frontend)
================================================================

DILARANG:
  - UI default atau generic — semua tampilan harus intentional dan premium

WAJIB IMPLEMENTASI:
  - Glassmorphism sebagai design language utama
  - Bento Grid layout untuk dashboard dan halaman utama
  - GSAP untuk animasi — dilarang CSS animation untuk elemen utama
  - Tipografi custom: Inter atau Plus Jakarta Sans (tidak boleh system font)
  - Setiap komponen harus memiliki hover state, focus state, dan transition
  - Dark mode wajib didukung dari awal, bukan afterthought
  - Mobile-first responsive — bukan desktop-first yang di-shrink

================================================================
SECTION 17 — SELF-EVOLUTION LAW (GEP SYSTEM)
================================================================

SETIAP KEGAGALAN WAJIB DICATAT ke: assets/gep/events.jsonl

Format log kegagalan:
  {
    "timestamp": "ISO-8601",
    "issue":         "deskripsi masalah yang terjadi",
    "root_cause":    "analisis akar penyebab",
    "fix":           "solusi yang diterapkan",
    "lesson_learned":"pelajaran yang diambil untuk masa depan",
    "pattern_tag":   "label untuk kategorisasi (opsional)"
  }

POLA SUKSES diekstrak ke MemPalace sebagai reusable GENES.
Sistem WAJIB menggunakan pola yang sudah dipelajari secara otomatis.
Jangan memecahkan masalah yang sama dua kali dengan cara yang berbeda.

================================================================
SECTION 18 — HARD CONSTRAINTS (ABSOLUT — TIDAK PERNAH DILANGGAR)
================================================================

DILARANG KERAS:
  [ ] Membuat god class atau god file yang melakukan banyak hal
  [ ] Meletakkan business logic di controller
  [ ] Akses database dari controller
  [ ] Import concrete class dari feature module lain secara langsung
  [ ] Membuat circular dependency antar modul
  [ ] Hardcode secret, password, atau nilai config di source code
  [ ] Swallow error secara diam-diam (empty catch block)
  [ ] Return raw DB entity langsung ke HTTP client
  [ ] Duplikasi business logic antar modul
  [ ] Start HTTP server tanpa validasi semua env var yang dibutuhkan
  [ ] Menulis function yang melakukan lebih dari satu hal
  [ ] Mix async dan sync pattern secara tidak konsisten
  [ ] Gunakan SELECT * di query production apapun
  [ ] Panggil HTTP eksternal di dalam open DB transaction
  [ ] Log data sensitif (password, token, PII, secret)
  [ ] Gunakan process.env langsung di dalam feature module
  [ ] Scroll horizontal — baris melebihi 120 karakter
  [ ] Mulai coding sebelum implementation_plan.md dibuat dan disetujui
  [ ] Nama variabel/fungsi yang ambigu (data, info, temp, x, obj)

JIKA PELANGGARAN TERDETEKSI:
→ STOP SEKETIKA
→ REFACTOR pelanggaran sebelum menulis kode baru apapun
→ DILARANG lanjut ke step berikutnya sebelum pelanggaran diperbaiki
→ DILARANG tandai task selesai selama masih ada pelanggaran

================================================================
SECTION 19 — QUALITY GATE (WAJIB SEBELUM TASK DIANGGAP SELESAI)
================================================================

Verifikasi SEMUA checklist ini sebelum menyelesaikan task apapun:

  ARSITEKTUR:
  [ ] Tidak ada file yang melampaui batas ukuran
  [ ] Tidak ada modul yang import file internal modul lain
  [ ] Tidak ada business logic di controller
  [ ] Tidak ada akses DB di luar repository layer
  [ ] Semua cross-module communication via interface atau event

  KODE:
  [ ] Semua baris di bawah 120 karakter (tidak ada horizontal scroll)
  [ ] Tidak ada nesting lebih dari 3 level
  [ ] Tidak ada nama yang ambigu
  [ ] Early return digunakan di mana relevan
  [ ] Setiap function melakukan tepat satu hal

  TEST:
  [ ] Setiap service method baru punya unit test
  [ ] Setiap endpoint baru punya integration test
  [ ] Semua error path punya test case

  CONFIG & SECURITY:
  [ ] Semua env var baru ditambahkan ke .env.example
  [ ] Tidak ada secret atau PII di log atau error message
  [ ] Input divalidasi sebelum diproses

  OBSERVABILITY:
  [ ] Log menggunakan format structured dengan traceId
  [ ] Semua error di-throw dengan tipe yang benar
  [ ] Tidak ada empty catch block

  DEPLOYMENT:
  [ ] Container berjalan sebagai non-root
  [ ] Health check endpoint tersedia dan berfungsi
  [ ] docker-compose up bisa jalan tanpa langkah manual tambahan

  DOKUMENTASI:
  [ ] implementation_plan.md ada dan sesuai dengan apa yang dibangun
  [ ] Komentar dan doc string dalam Bahasa Indonesia
  [ ] Kegagalan selama proses dicatat di assets/gep/events.jsonl

JIKA SATU PUN GAGAL:
→ TOLAK DAN PERBAIKI. Jangan submit sampai semua passed.

================================================================
END OF ENGINEERING SUPREME LAW v3.0
================================================================
