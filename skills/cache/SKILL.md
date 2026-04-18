---
name: cache-strategy
description: "Standar implementasi cache — strategi TTL, pola akses, namespace, dan aturan invalidation."
version: "1.0.0"
---

> Melengkapi Engineering Supreme Law Section 12.

================================================================
## NAMESPACE CONVENTION
================================================================
Format WAJIB: `{module}:{entity}:{id}:{modifier}`

Contoh Benar:
- `user:profile:abc123`
- `order:detail:ord456`
- `product:list:page:1`

================================================================
## TTL STRATEGY MATRIX
================================================================
Semua cache WAJIB memiliki TTL. DILARANG ada cache abadi (eternal cache).

| Tipe Data | Contoh | Recommended TTL | Alasan |
|-----------|--------|-----------------|--------|
| Session/Token | Auth token | 15 - 60 menit | Keamanan, force re-auth jika bocor |
| Master Data | Kota, kategori | 24 jam | Sangat jarang berubah |
| User Profile | Nama, avatar | 1 - 6 jam | Agak sering berubah, tidak kritis |
| Dashboard/Agg | Stats harian | 5 - 15 menit | Berat dihitung, toleransi stale data |
| Real-time Data | Stock, saldo | DILARANG CACHE | Source of truth harus selalu DB |

================================================================
## CACHE PATTERNS (PYTHON/REDIS)
================================================================

### 1. Cache-Aside (Lazy Loading) - Default
```python
async def get_user_profile(user_id: str) -> dict:
    key = f"user:profile:{user_id}"
    
    # 1. Coba baca dari cache
    cached = await redis.get(key)
    if cached:
        return json.loads(cached)
        
    # 2. Jika miss, baca dari DB
    db_data = await repo.get_user(user_id)
    if not db_data:
        raise NotFoundError()
        
    # 3. Tulis ke cache dengan TTL
    await redis.set(key, json.dumps(db_data), ex=3600) # 1 jam
    return db_data
```

### 2. Write-Through (Konsistensi Tinggi)
```python
async def update_user_profile(user_id: str, data: dict):
    key = f"user:profile:{user_id}"
    
    # 1. Update DB di dalam transaksi
    await repo.update_user(user_id, data)
    
    # 2. Update cache agar selalu sinkron
    await redis.set(key, json.dumps(data), ex=3600)
```

### 3. Stampede Protection (Probabilistic Early Refresh)
Gunakan untuk data berat yang sering diakses agar saat TTL habis, tidak semua request menghantam DB bersamaan.
```python
# Pseudo-code
if ttl_remaining(key) < (beta * random() * compute_time):
    trigger_background_refresh()
return cached_data
```

================================================================
## CACHE INVALIDATION RULES
================================================================
1. **Explicit Delete:** Saat data di-update/delete, hapus key terkait: `await redis.delete(key)`
2. **Prefix Invalidation:** Hapus semua item dalam satu kategori menggunakan scan (bukan keys *).
   `SCAN 0 MATCH product:list:*`
3. **Event-Driven:** Gunakan domain event (`user.updated`) untuk men-trigger cache invalidation di subscriber.

================================================================
## HARD RULES
================================================================
- [ ] DILARANG menggunakan cache tanpa TTL (kecuali queue).
- [ ] DILARANG menggunakan `KEYS *` di production, selalu gunakan `SCAN`.
- [ ] DILARANG menyimpan PII sensitif (password hash, kartu kredit) di cache biasa.
- [ ] Cache MISS harus transparan dan aplikasi harus tetap berfungsi lambat namun aman.
