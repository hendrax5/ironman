================================================================
[IRONMAN PRODUCT LIFECYCLE PIPELINE]
Version: 1.0 — FROM IDEA TO PRODUCTION
================================================================

BERLAKU UNTUK: semua proyek baru dan fitur baru.
Pipeline ini WAJIB diikuti secara berurutan. Dilarang loncat fase.

================================================================
OVERVIEW — 6 FASE BERURUTAN
================================================================

  [USER IDEA]
       ↓
  FASE 1 — PRD AGENT (Discovery & Requirements)
       ↓
  FASE 2 — UX / FLOW AGENT (Desain & Alur)
       ↓
  FASE 3 — TASK BREAKDOWN (Dekomposisi & Planning)
       ↓
  FASE 4 — IRONMAN DEV (Implementasi)
       ↓
  FASE 5 — QA AGENT (Testing & Validasi)
       ↓
  FASE 6 — SECURITY & DEPLOY (Hardening & Rilis)
       ↓
  [PRODUCTION-READY]

ATURAN UTAMA:
  - Setiap fase menghasilkan ARTEFAK yang menjadi INPUT fase berikutnya.
  - Dilarang memulai fase berikutnya tanpa artefak fase sebelumnya.
  - Semua artefak ditulis dalam Bahasa Indonesia.
  - Gunakan MemPalace untuk menyimpan keputusan penting lintas fase.

================================================================
FASE 1 — PRD AGENT (Discovery & Requirements)
================================================================

TUJUAN: Mengubah ide mentah menjadi dokumen kebutuhan yang jelas.

INPUT:
  - Ide atau masalah dari user (bisa berupa kalimat sederhana)

PROSES:
  1. Klarifikasi masalah dengan pertanyaan terstruktur:
     - Siapa target pengguna?
     - Masalah apa yang diselesaikan?
     - Apa metrik keberhasilan?
     - Apa batasan teknis dan bisnis?

  2. Analisis kompetitor dan pendekatan yang sudah ada

  3. Definisikan scope:
     - Fitur MVP (Minimum Viable Product)
     - Fitur fase 2 (nice-to-have)
     - Fitur yang BUKAN scope (out-of-scope)

  4. Tulis PRD (Product Requirements Document)

ARTEFAK OUTPUT — prd.md:
  # PRD: [Nama Produk/Fitur]

  ## Ringkasan Eksekutif
  [1-2 paragraf: apa, untuk siapa, mengapa]

  ## Masalah & Peluang
  - Masalah utama yang diselesaikan
  - Dampak jika tidak diselesaikan

  ## Target Pengguna
  - Persona 1: [deskripsi]
  - Persona 2: [deskripsi]

  ## Fitur & Requirements
  ### MVP (Fase 1)
  - [F-001] Fitur A — deskripsi, prioritas: TINGGI
  - [F-002] Fitur B — deskripsi, prioritas: TINGGI

  ### Fase 2
  - [F-010] Fitur X — deskripsi, prioritas: SEDANG

  ### Out of Scope
  - [Fitur yang sengaja TIDAK dimasukkan + alasan]

  ## Metrik Keberhasilan
  - KPI 1: [target terukur]
  - KPI 2: [target terukur]

  ## Batasan & Asumsi
  - Teknis: [stack, infrastruktur]
  - Bisnis: [budget, timeline]

  ## Risiko
  - [R-001] Risiko A — mitigasi: [strategi]

QUALITY GATE FASE 1:
  [ ] PRD memiliki minimal 3 fitur MVP yang terukur
  [ ] Target pengguna terdefinisi dengan jelas
  [ ] Out-of-scope terdokumentasi
  [ ] Metrik keberhasilan bisa diukur (bukan subjektif)
  [ ] User sudah review dan setuju dengan PRD

JIKA BELUM PASSED → REVISI PRD. DILARANG LANJUT KE FASE 2.

================================================================
FASE 2 — UX / FLOW AGENT (Desain & Alur)
================================================================

TUJUAN: Menerjemahkan PRD menjadi alur pengguna dan desain visual.

INPUT:
  - prd.md dari Fase 1

PROSES:
  1. Buat User Flow Diagram:
     - Petakan setiap fitur MVP ke langkah-langkah pengguna
     - Identifikasi happy path dan error path
     - Tentukan titik keputusan (decision point)

  2. Buat Wireframe / Mockup:
     - Gunakan standar Taste-Skill (Glassmorphism, GSAP, dark mode)
     - Pastikan mobile-first responsive
     - Definisikan komponen yang bisa di-reuse

  3. Definisikan State & Interaksi:
     - Loading state, empty state, error state per halaman
     - Transisi antar halaman
     - Micro-interactions untuk UX premium

ARTEFAK OUTPUT — ux-flow.md:
  # UX Flow: [Nama Produk/Fitur]

  ## Sitemap
  - / (Landing)
  - /dashboard (Halaman utama setelah login)
  - /[fitur-a] (Detail fitur A)

  ## User Flow per Fitur
  ### [F-001] Fitur A
  ```
  User masuk → Klik tombol X → Form muncul (modal/drawer)
    → Isi data → Validasi → Submit
    → Sukses: Toast + redirect ke dashboard
    → Gagal: Error inline per field
  ```

  ## Komponen yang Dibutuhkan
  - DataTable (sortable, filterable, paginated)
  - Modal / Side-Drawer
  - Form dengan validasi real-time
  - Toast notification

  ## Design Decisions
  - Layout: Bento Grid untuk dashboard
  - Navigasi: Sidebar fixed + breadcrumb
  - Warna: [palette yang dipilih]
  - Font: Inter / Plus Jakarta Sans

QUALITY GATE FASE 2:
  [ ] Setiap fitur MVP punya user flow yang terdokumentasi
  [ ] Happy path dan error path terdefinisi
  [ ] Komponen UI teridentifikasi dan bisa di-reuse
  [ ] Desain mengikuti standar Taste-Skill (bukan generic)
  [ ] User sudah review dan setuju dengan flow

JIKA BELUM PASSED → REVISI FLOW. DILARANG LANJUT KE FASE 3.

================================================================
FASE 3 — TASK BREAKDOWN (Dekomposisi & Planning)
================================================================

TUJUAN: Memecah fitur menjadi task-task kecil yang bisa
        dikerjakan per sesi AI tanpa melebihi context window.

INPUT:
  - prd.md dari Fase 1
  - ux-flow.md dari Fase 2

PROSES:
  1. Dekomposisi setiap fitur MVP menjadi sub-tasks:
     - Setiap task HARUS bisa diselesaikan dalam 1 sesi
     - Setiap task HARUS punya kriteria selesai yang jelas
     - Estimasi kompleksitas: S (kecil), M (sedang), L (besar)

  2. Tentukan urutan dependensi:
     - Task mana yang harus selesai duluan?
     - Task mana yang bisa paralel?

  3. Buat implementation_plan.md (sesuai Engineering Supreme Law):
     - Daftar modul yang akan dibuat
     - Dependency antar modul
     - Struktur file
     - Edge case
     - Rencana test

ARTEFAK OUTPUT — task-breakdown.md:
  # Task Breakdown: [Nama Produk/Fitur]

  ## Fase 1: Foundation (HARUS DULUAN)
  - [ ] [T-001] Setup project structure (S)
        → Buat folder sesuai Section 3 Engineering Law
  - [ ] [T-002] Setup database schema & migration (M)
        → Definisikan entity, relasi, index
  - [ ] [T-003] Setup error handling & logger (S)
        → Implementasi Section 7 & 10 Engineering Law

  ## Fase 2: Core Features
  - [ ] [T-004] [F-001] Backend: User Service (M)
        → Depends on: T-001, T-002
        → Service + Repository + Unit Test
  - [ ] [T-005] [F-001] Frontend: User Page (M)
        → Depends on: T-004
        → Komponen + API integration
  - [ ] [T-006] [F-002] Backend: Order Service (L)
        → Depends on: T-004

  ## Fase 3: Integration & Polish
  - [ ] [T-010] Integration test semua endpoint (M)
  - [ ] [T-011] UI polish & micro-animation (S)
  - [ ] [T-012] Docker Compose setup (S)

ATURAN DEKOMPOSISI:
  - Satu task = maksimal 300 baris kode baru
  - Satu task = maksimal 3 file yang diubah
  - Jika task terlalu besar → pecah lagi
  - Setiap task HARUS menghasilkan kode yang bisa jalan
    (tidak boleh ada task yang menghasilkan "setengah fitur")

QUALITY GATE FASE 3:
  [ ] Setiap fitur MVP terpecah menjadi task berukuran S atau M
  [ ] Dependency antar task terdokumentasi
  [ ] implementation_plan.md sudah dibuat
  [ ] Tidak ada task berukuran L tanpa dipecah lebih lanjut
  [ ] User sudah review dan setuju dengan breakdown

JIKA BELUM PASSED → REVISI BREAKDOWN. DILARANG LANJUT KE FASE 4.

================================================================
FASE 4 — IRONMAN DEV (Implementasi)
================================================================

TUJUAN: Menulis kode sesuai task breakdown dengan kepatuhan penuh
        pada Engineering Supreme Law v3.0.

INPUT:
  - task-breakdown.md dari Fase 3
  - implementation_plan.md dari Fase 3

PROSES:
  1. Ambil task berikutnya dari breakdown (urut berdasarkan dependensi)
  2. Baca Engineering Supreme Law sebelum mulai
  3. Implementasi sesuai plan:
     - Patuhi semua hard limit (300 baris/file, 30 baris/fungsi, dll.)
     - Gunakan layered architecture (Controller → Service → Repository)
     - Tulis unit test bersamaan dengan kode
  4. Self-review: jalankan Quality Gate Section 19
  5. Tandai task selesai, lanjut ke task berikutnya

ATURAN:
  - Satu sesi AI = satu task dari breakdown
  - Jika task ternyata lebih besar dari perkiraan → STOP
    → Pecah menjadi sub-task dulu
    → Update task-breakdown.md
  - Simpan keputusan arsitektur ke MemPalace
  - Catat kegagalan ke assets/gep/events.jsonl

QUALITY GATE FASE 4 (per task):
  [ ] Kode mematuhi semua Section di Engineering Law
  [ ] Unit test ditulis dan passing
  [ ] Tidak ada horizontal scroll (maks 120 char)
  [ ] Tidak ada business logic di controller
  [ ] Nama variabel/fungsi deskriptif (bukan ambigu)

================================================================
FASE 5 — QA AGENT (Testing & Validasi)
================================================================

TUJUAN: Memastikan semua fitur bekerja sesuai PRD dan tidak ada regresi.

INPUT:
  - Kode hasil Fase 4
  - prd.md sebagai referensi acceptance criteria

PROSES:
  1. Verifikasi test pyramid:
     - 70% Unit test (sudah ditulis di Fase 4)
     - 20% Integration test (test dengan DB nyata via container)
     - 10% E2E test (critical user flow saja)

  2. Cek coverage minimum:
     - Service layer: ≥ 85%
     - Domain entity: ≥ 90%
     - Repository: ≥ 70%
     - Controller: ≥ 60%

  3. Validasi terhadap PRD:
     - Setiap fitur MVP [F-xxx] punya test yang membuktikan ia berfungsi
     - Setiap error path punya test case

  4. Performance baseline:
     - API response time < 200ms untuk operasi CRUD standar
     - Tidak ada N+1 query

ARTEFAK OUTPUT — qa-report.md:
  # QA Report: [Nama Produk/Fitur]

  ## Coverage
  | Layer       | Target | Aktual | Status |
  |-------------|--------|--------|--------|
  | Service     | 85%    | ??%    | ✅/❌  |
  | Entity      | 90%    | ??%    | ✅/❌  |
  | Repository  | 70%    | ??%    | ✅/❌  |
  | Controller  | 60%    | ??%    | ✅/❌  |

  ## Fitur MVP Validation
  | Fitur   | Happy Path | Error Path | Status |
  |---------|------------|------------|--------|
  | [F-001] | ✅         | ✅         | PASS   |
  | [F-002] | ✅         | ❌         | FAIL   |

  ## Bugs Ditemukan
  - [BUG-001] Deskripsi — Severity: HIGH — Status: FIXED

QUALITY GATE FASE 5:
  [ ] Semua coverage minimum terpenuhi
  [ ] Semua fitur MVP validated (happy + error path)
  [ ] Tidak ada bug severity HIGH yang belum fixed
  [ ] Tidak ada N+1 query
  [ ] Semua test passing

JIKA BELUM PASSED → KEMBALI KE FASE 4 UNTUK FIX. DILARANG DEPLOY.

================================================================
FASE 6 — SECURITY & DEPLOY (Hardening & Rilis)
================================================================

TUJUAN: Memastikan aplikasi aman dan siap production.

INPUT:
  - Kode yang sudah lolos QA dari Fase 5

PROSES — SECURITY CHECKLIST:
  1. Input validation:
     [ ] Semua input disanitasi
     [ ] Parameterized query (tidak ada string concat SQL)
     [ ] Whitelist field yang diizinkan

  2. Authentication & Authorization:
     [ ] Auth di middleware level
     [ ] RBAC/ABAC konsisten
     [ ] Tidak ada endpoint tanpa auth (kecuali health check)

  3. Secrets & Config:
     [ ] Semua secret di env var
     [ ] .env.example tersedia tanpa value asli
     [ ] Tidak ada secret di log atau error message

  4. Dependency audit:
     [ ] npm audit / pip-audit — tidak ada vulnerability HIGH/CRITICAL
     [ ] Semua dependency terpinned ke versi spesifik

PROSES — DEPLOYMENT CHECKLIST:
  1. Container:
     [ ] Dockerfile multi-stage, non-root user
     [ ] docker-compose.yml lengkap
     [ ] docker-compose up berjalan tanpa error

  2. Health checks:
     [ ] GET /health/live → 200
     [ ] GET /health/ready → 200 (cek DB, cache, queue)

  3. Observability:
     [ ] Structured JSON logging aktif
     [ ] traceId di-propagasi
     [ ] Error response menyertakan requestId

  4. Graceful shutdown:
     [ ] SIGTERM ditangani
     [ ] In-flight request diselesaikan (drain max 30s)

ARTEFAK OUTPUT — deploy-report.md:
  # Deploy Report: [Nama Produk/Fitur]

  ## Security Audit
  - Vulnerability: 0 HIGH, 0 CRITICAL
  - Auth coverage: 100% endpoint
  - Secret exposure: NONE

  ## Deployment Status
  - Docker build: ✅ SUCCESS
  - docker-compose up: ✅ SUCCESS
  - Health check: ✅ PASSING
  - Graceful shutdown: ✅ VERIFIED

  ## Production URL
  - [URL jika sudah di-deploy]

QUALITY GATE FASE 6:
  [ ] Semua security checklist passed
  [ ] Semua deployment checklist passed
  [ ] docker-compose up berjalan clean
  [ ] Health check responding
  [ ] Tidak ada secret yang ter-expose

JIKA SEMUA PASSED → 🎉 PRODUCTION-READY

================================================================
RINGKASAN ARTEFAK PER FASE
================================================================

  Fase 1 → prd.md
  Fase 2 → ux-flow.md
  Fase 3 → task-breakdown.md + implementation_plan.md
  Fase 4 → source code + unit tests
  Fase 5 → qa-report.md
  Fase 6 → deploy-report.md

Semua artefak disimpan di root proyek atau folder docs/.
Keputusan penting disimpan ke MemPalace untuk referensi lintas sesi.
Kegagalan dicatat ke assets/gep/events.jsonl untuk evolusi.

================================================================
END OF IRONMAN PRODUCT LIFECYCLE PIPELINE v1.0
================================================================
