# 🦾 Contributing to Ironman Skill

> Context file untuk siapapun (atau AI agent) yang mau develop/update Ironman skill.

## Quick Start

```bash
git clone https://github.com/hendrax5/ironman.git
cd ironman
```

---

## File Structure

```
ironman/
├── SKILL.md            ← Konten utama (14 domain, ~800 lines)
├── README.md           ← Public docs + architecture diagram
├── package.json        ← Version, keywords, npm metadata
├── CONTRIBUTING.md     ← File ini
└── bin/
    └── install.js      ← npx installer → 3 target (antigravity, claude, agents)
```

---

## SKILL.md Format

SKILL.md menggunakan YAML frontmatter + markdown:

```yaml
---
name: ironman
description: "..."
version: "4.0.0"
---
```

### Domain Structure (saat ini 14 domain, #0–#13):

```
## 🧠 DOMAIN 0: BRAINSTORMING & ARCHITECTURE
## 🖥️ DOMAIN 1: FULL-STACK DEVELOPMENT
## 🐳 DOMAIN 2: DOCKER & CONTAINERS
## 🌐 DOMAIN 3: NETWORK — MULTI-VENDOR
## 🤖 DOMAIN 4: NETWORK — AUTOMATION
## 🔍 DOMAIN 5: NETWORK — MONITORING
## 🛡️ DOMAIN 6: NETWORK — SECURITY
## 🔐 DOMAIN 7: APPLICATION SECURITY
## 🚀 DOMAIN 8: CI/CD & DEPLOYMENT
## 🏗️ DOMAIN 9: SAAS PLATFORM ENGINEERING
## 📡 DOMAIN 10: FULL OBSERVABILITY STACK
## ☸️ DOMAIN 11: KUBERNETES & SCALING
## 📨 DOMAIN 12: EVENT-DRIVEN ARCHITECTURE
## 🧠 DOMAIN 13: NETWORK INTELLIGENCE & AUTO-REMEDIATION
```

### Setiap domain berisi:
1. **Rules** — numbered list, format imperative
2. **Code templates** — production-ready snippets dalam fenced code blocks
3. **Trigger keywords** — kata kunci yang mengaktifkan domain

---

## Cara Menambah Domain Baru

1. **Tambahkan section** di `SKILL.md` setelah domain terakhir:
   ```markdown
   ## 🔮 DOMAIN 14: [NAMA DOMAIN]

   **Rules:**
   1. Rule pertama...
   2. Rule kedua...

   **Code template:**
   ```python
   # production-ready snippet
   ```
   ```

2. **Update frontmatter** — bump version:
   ```yaml
   version: "4.1.0"  # atau 5.0.0 untuk major
   ```

3. **Update `README.md`** — tambah baris di tabel domain

4. **Update `package.json`** — bump `"version"`

5. **Update `bin/install.js`** — bump banner version string (line 23)

---

## Cara Update Domain Existing

1. Edit section yang relevan di `SKILL.md`
2. Bump **patch** version (misal 4.0.0 → 4.0.1)
3. Commit + push

---

## Versioning

| Perubahan | Bump |
|-----------|------|
| Typo, minor fix | Patch (4.0.**1**) |
| Tambah sub-section / expand template | Minor (4.**1**.0) |
| Tambah domain baru / restructure | Major (**5**.0.0) |

**File yang harus di-bump bersamaan:**
- `SKILL.md` frontmatter → `version: "x.y.z"`
- `package.json` → `"version": "x.y.z"`
- `bin/install.js` → banner text `Installer vX.Y`

---

## Commit Convention

```
feat: deskripsi perubahan       ← fitur baru / domain baru
fix: deskripsi perbaikan        ← bugfix / typo
docs: update README             ← docs only
refactor: restructure domain X  ← refactor tanpa fitur baru
```

---

## Deploy / Publish

```bash
git add -A
git commit -m "feat: v4.1.0 - deskripsi perubahan"
git push origin main
```

User di PC lain upgrade via:
```bash
npx github:hendrax5/ironman
```

---

## Domain Ideas (Belum Diimplementasi)

Ide untuk versi mendatang:
- AI/ML Ops (model serving, MLflow, feature store)
- Database Optimization (PostgreSQL tuning, Redis patterns)
- API Gateway & Rate Limiting
- Chaos Engineering (Litmus, Chaos Monkey)
- Cost Optimization (FinOps, cloud cost analysis)
- Zero Trust Architecture

---

## Version History

| Version | Perubahan |
|---------|-----------|
| v1.0 | 7 domain dasar |
| v2.0 | + automation, monitoring, CI/CD |
| v3.0 | + brainstorming mode, npx installer |
| v3.1 | + brainstorming framework, README rewrite |
| **v4.0** | **+6 domain: SaaS, Observability, K8s, EDA, Network Intelligence** |
