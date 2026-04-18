---
name: schema-migration
description: "Aturan migrasi database — zero downtime, immutability, dan format file."
version: "1.0.0"
---

> Melengkapi Engineering Supreme Law Section 5.

================================================================
## NAMING CONVENTION
================================================================
Format: `YYYYMMDDHHMMSS_deskripsi_singkat.{sql|py|ts}`

Contoh: `20260418120000_add_user_status_column.sql`

================================================================
## MIGRATION TYPES & RULES
================================================================
1. **Schema Migration (DDL):** Buat tabel, tambah kolom, buat index.
2. **Data Migration (DML):** Backfill data. HARUS di file migrasi terpisah dari DDL.
3. **Destructive Migration:** Drop kolom/tabel. HARUS dilakukan paling akhir (Expand-Contract).

================================================================
## ZERO-DOWNTIME PATTERN (EXPAND-CONTRACT)
================================================================
Jika ingin mengubah nama kolom dari `first_name` ke `full_name`:

- **Tahap 1 (Expand):** Tambahkan kolom `full_name` baru (nullable). Jangan hapus yang lama.
- **Tahap 2 (Migrate):** Aplikasi menulis ke KEDUA kolom, tapi membaca dari yang lama. Backfill data lama.
- **Tahap 3 (Transition):** Aplikasi membaca dan menulis HANYA dari kolom baru.
- **Tahap 4 (Contract):** Hapus kolom `first_name` lama.

================================================================
## RAW SQL TEMPLATES
================================================================
Setiap migrasi wajib bisa dijalankan ulang tanpa error (idempotent).

```sql
-- UP
ALTER TABLE users ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'active';
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_users_status ON users(status);

-- DOWN
DROP INDEX IF EXISTS idx_users_status;
ALTER TABLE users DROP COLUMN IF EXISTS status;
```
*(Catatan: `CONCURRENTLY` penting agar tabel tidak ter-lock saat pembuatan index)*

================================================================
## ALEMBIC TEMPLATE (PYTHON)
================================================================
```python
"""add user status column

Revision ID: a1b2c3d4e5f6
Revises: 9z8y7x6w5v4u
Create Date: 2026-04-18 12:00:00.000000
"""
from alembic import op
import sqlalchemy as sa

def upgrade():
    op.add_column('users', sa.Column('status', sa.String(20), server_default='active'))
    op.create_index('idx_users_status', 'users', ['status'])

def downgrade():
    op.drop_index('idx_users_status', table_name='users')
    op.drop_column('users', 'status')
```

================================================================
## HARD RULES
================================================================
- [ ] DILARANG mengubah file migrasi yang sudah di-merge ke branch `main`. Buat file migrasi baru untuk perbaikan.
- [ ] DILARANG melakukan `DROP TABLE` atau `DROP COLUMN` secara langsung tanpa melewati fase Expand-Contract.
- [ ] Semua migrasi HARUS bisa di-rollback (wajib ada method `down()` / `downgrade()`).
- [ ] DILARANG memodifikasi enum type (`ALTER TYPE`) langsung di Postgres lama, buat type baru dan update.
