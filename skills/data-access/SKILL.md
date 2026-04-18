---
name: data-access
description: "Standar data access — transaction boundary, repository pattern, query optimization, dan migration strategy."
version: "1.0.0"
---

# 🗄️ Data Access Skill — Transaction, Repository & Query

> Melengkapi Engineering Supreme Law Section 5.
> Skill ini mendefinisikan TRANSACTION BOUNDARY dan pola data access.

================================================================
## TRANSACTION BOUNDARY — ATURAN PALING PENTING
================================================================

★ TRANSACTION ADA DI SERVICE LAYER — BUKAN DI REPOSITORY ★

ALASAN:
  - Repository hanya tahu 1 entity
  - Transaction sering melibatkan > 1 entity
  - Service layer yang tahu business logic lintas entity
  - Jika transaction di repository → tidak bisa compose

BENAR ✅:
```javascript
// services/order.service.js
async function createOrder({ userId, items }) {
  // Transaction di-wrap di SERVICE
  return prisma.$transaction(async (tx) => {
    // 1. Buat order
    const order = await orderRepo.create(tx, {
      userId,
      status: 'PENDING',
    });

    // 2. Buat order items
    await orderItemRepo.createMany(tx, items.map((item) => ({
      orderId: order.id,
      productId: item.productId,
      quantity: item.quantity,
    })));

    // 3. Kurangi stok
    for (const item of items) {
      await productRepo.decrementStock(
        tx,
        item.productId,
        item.quantity
      );
    }

    return order;
  });
}
```

SALAH ❌:
```javascript
// repository/order.repository.js
// JANGAN wrap transaction di repository
async function createWithItems(data) {
  return prisma.$transaction(async (tx) => {
    // ❌ Repository seharusnya tidak tahu tentang items
    // ❌ Tidak bisa di-reuse di konteks lain
  });
}
```

================================================================
## REPOSITORY PATTERN — TEMPLATE
================================================================

ATURAN:
  - Satu repository = satu entity/tabel
  - Repository HANYA berisi operasi database
  - DILARANG business logic di repository
  - Repository menerima `tx` (transaction client) sebagai parameter

TEMPLATE:
```javascript
// repositories/user.repository.js

class UserRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  // tx = transaction client (opsional)
  _db(tx) {
    return tx || this.prisma;
  }

  async findById(id, tx) {
    return this._db(tx).user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email, tx) {
    return this._db(tx).user.findUnique({
      where: { email },
    });
  }

  async findMany({ page = 1, limit = 20, filter = {} }, tx) {
    const skip = (page - 1) * limit;
    const where = this._buildWhere(filter);

    const [data, total] = await Promise.all([
      this._db(tx).user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
          // DILARANG select semua: select: undefined
        },
      }),
      this._db(tx).user.count({ where }),
    ]);

    return { data, total, page, limit };
  }

  async create(data, tx) {
    return this._db(tx).user.create({ data });
  }

  async update(id, data, tx) {
    return this._db(tx).user.update({
      where: { id },
      data,
    });
  }

  async softDelete(id, tx) {
    return this._db(tx).user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  _buildWhere(filter) {
    const where = { deletedAt: null };
    if (filter.role) where.role = filter.role;
    if (filter.search) {
      where.OR = [
        { name: { contains: filter.search, mode: 'insensitive' } },
        { email: { contains: filter.search, mode: 'insensitive' } },
      ];
    }
    return where;
  }
}

module.exports = { UserRepository };
```

================================================================
## QUERY OPTIMIZATION — ATURAN WAJIB
================================================================

1. DILARANG SELECT * (gunakan select eksplisit):
   ❌ prisma.user.findMany()
   ✅ prisma.user.findMany({ select: { id: true, name: true } })

2. WAJIB PAGINATION untuk semua list endpoint:
   ❌ prisma.user.findMany({ where })
   ✅ prisma.user.findMany({ where, skip, take: limit })

3. WAJIB INDEX untuk kolom di WHERE/JOIN/ORDER BY:
   ```prisma
   model Product {
     id        String @id @default(uuid())
     name      String
     category  String
     status    String
     createdAt DateTime @default(now())

     @@index([category])
     @@index([status])
     @@index([createdAt])
     @@index([category, status])  // composite index
   }
   ```

4. HINDARI N+1 QUERY:
   ❌ Loop yang query di setiap iterasi:
   ```javascript
   for (const order of orders) {
     order.items = await prisma.orderItem.findMany({
       where: { orderId: order.id }
     });
   }
   ```

   ✅ Gunakan include atau batched query:
   ```javascript
   const orders = await prisma.order.findMany({
     include: { items: true },
   });
   ```

5. GUNAKAN EXPLAIN ANALYZE sebelum deploy:
   ```sql
   EXPLAIN ANALYZE
   SELECT * FROM products
   WHERE category = 'electronics' AND status = 'active'
   ORDER BY created_at DESC
   LIMIT 20;
   ```
   Pastikan: Seq Scan TIDAK muncul untuk tabel > 10k rows.

================================================================
## MIGRATION STRATEGY
================================================================

ATURAN:
  1. Migration HARUS reversible (up + down)
  2. DILARANG mengubah kolom existing di migration yang sama
     dengan menambah data baru (pisah migration)
  3. Rename kolom = 3 langkah:
     a. Migration 1: Tambah kolom baru
     b. Deploy: Kode support kedua kolom
     c. Migration 2: Hapus kolom lama
  4. DILARANG DROP TABLE di production tanpa backup
  5. Setiap migration diberi nama deskriptif:
     ✅ 20260418_add_status_to_orders
     ❌ migration_001

================================================================
## SOFT DELETE — STANDAR
================================================================

ATURAN:
  - Gunakan soft delete (deletedAt) untuk data bisnis penting
  - Hard delete hanya untuk data teknis (logs, cache, temporary)
  - SEMUA query WAJIB filter: WHERE deletedAt IS NULL
  - Implementasi di repository layer (bukan di service)

```prisma
model User {
  id        String    @id @default(uuid())
  name      String
  email     String    @unique
  deletedAt DateTime? // null = aktif, ada tanggal = soft deleted

  @@index([deletedAt])
}
```
