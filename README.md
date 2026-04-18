# 🦾 Ironman v6.1 — AI Skill: Fullstack · DevOps · AI/ML · UX/UI · PDCA · Evolution

> **1 skill. 19 domain. Zero switching.**  
> Brainstorming → fullstack dev → Docker → Kubernetes → SaaS platform → full observability → event-driven → network intelligence → AI/ML Ops → UX/UI (Taste) → PDCA Methodology → Self-Evolution (GEP) — semua dalam satu workflow.
> 
> 🇮🇩 **BAHASA PRIORITAS: INDONESIA**
> Agen secara sistematis akan selalu menjawab, mendokumentasikan, dan merancang dalam Bahasa Indonesia.

[![Version](https://img.shields.io/badge/version-6.1.0-blue)](https://github.com/hendrax5/ironman)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Law: Supreme v3.0](https://img.shields.io/badge/Law-Engineering%20Supreme%20v3.0-red)](ENGINEERING_LAW.md)

---

## ⚡ Install (1 command)

```bash
npx github:hendrax5/ironman
```

Installer otomatis melakukan:
1. **MemPalace MCP** — Clone, install dependensi, dan register sebagai MCP server
2. **Ironman Skill** — Deploy ke Antigravity, Claude Code, dan project-level `.agents/`
3. **Engineering Supreme Law** — Menyertakan `ENGINEERING_LAW.md` sebagai hukum wajib

### Manual Install

| Tool | Cara |
|------|------|
| **Antigravity** | `xcopy /E /I ironman "%USERPROFILE%\.gemini\antigravity\skills\ironman"` |
| **Claude Code (global)** | `cp -r ironman ~/.claude/skills/ironman` |
| **Claude Code (project)** | `cp -r ironman .claude/skills/ironman` |
| **Cursor / Windsurf** | `cat ironman/SKILL.md >> .cursorrules` |
| **Project (.agents)** | `cp -r ironman .agents/skills/ironman` |

---

## ⚖️ Engineering Supreme Law v3.0

> **BERLAKU UNTUK: semua code generation, semua agent, semua task.**
> Dokumen lengkap: [`ENGINEERING_LAW.md`](ENGINEERING_LAW.md)

### Tiga Hukum Utama (Tidak Boleh Dilanggar)

| # | Hukum | Deskripsi |
|---|-------|-----------|
| 1 | **Single Responsibility** | Satu modul = satu domain = satu alasan untuk berubah |
| 2 | **Dependency Inversion** | Bergantung pada abstraksi, bukan pada implementasi konkret |
| 3 | **Fault Isolation** | Gagal secara lokal. Satu modul tidak boleh meruntuhkan sistem |

### 20 Section Hukum

| Section | Topik | Inti Aturan |
|---------|-------|-------------|
| 0 | Tiga Hukum Utama | SRP, DIP, Fault Isolation |
| 1 | Workflow Law | `implementation_plan.md` WAJIB dibuat & disetujui sebelum coding |
| 2 | Maintainability | 300 baris/file, 30 baris/fungsi, 120 char/baris, 4 param max, 3 nesting max |
| 3 | Project Structure | Feature-first: `src/modules/`, `src/shared/`, `src/core/` |
| 4 | Architecture Layers | Controller → Service → Repository (one-way, strict) |
| 5 | Data Access | No `SELECT *`, pagination wajib, transaction di service layer |
| 6 | Validation | 3 layer: HTTP input → Business rule → DB constraint |
| 7 | Error Handling | Typed errors (`DomainError`, `NotFoundError`, dll.) + centralized mapping |
| 8 | API Design | Versioned REST (`/api/v1/`), konsisten response shape |
| 9 | Security | Blue Team mode, RBAC/ABAC, parameterized query only |
| 10 | Observability | Structured JSON logging, traceId propagation, log level ketat |
| 11 | Async Processing | Job idempotent, DLQ, 202 Accepted untuk long-running |
| 12 | Caching | Service layer, TTL eksplisit, namespace per modul |
| 13 | Testability | 70/20/10 pyramid, coverage minimum per layer |
| 14 | Configuration | Env var only, fail fast, `.env.example` wajib |
| 15 | Deployment | Docker, non-root, health checks, graceful shutdown |
| 16 | UI/UX | Glassmorphism, GSAP, dark mode, mobile-first |
| 17 | Self-Evolution (GEP) | Log kegagalan ke `events.jsonl`, ekstrak pola ke MemPalace |
| 18 | Hard Constraints | 19 larangan absolut (god class, empty catch, SELECT *, dll.) |
| 19 | Quality Gate | Checklist wajib sebelum task dianggap selesai |

### Hard Limits (Quick Reference)

```
Maks 300 baris/file          Maks 30 baris/fungsi
Maks 4 parameter/fungsi     Maks 3 level nesting
Maks 120 karakter/baris     Maks 10 public method/class
ZERO horizontal scroll      Plan WAJIB sebelum coding
```

---

## 🗺️ Domain Coverage (20 Domain)

| # | Domain | Cakupan |
|---|---------|---------| 
| 0 | 🧠 Brainstorming | Architecture decision, tech evaluation, network design thinking |
| 1 | 🖥️ Full-Stack Dev | Backend + Frontend + API + DB — any language |
| 2 | 🐳 Docker & Containers | Dockerfile, Compose, multi-stage, security hardening |
| 3 | 🌐 Network Multi-Vendor | Cisco, MikroTik, Juniper, Huawei, Palo Alto, Fortinet |
| 4 | 🤖 Network Automation | Python, Netmiko, NAPALM, Ansible, Scapy |
| 5 | 🔍 Network Monitoring | nmap, SNMP, NetFlow, Prometheus, Grafana |
| 6 | 🛡️ Network Security | Wireshark, tcpdump, firewall automation, IDS/IPS |
| 7 | 🔐 App Security | OWASP, auth, JWT, hardening, dependency audit |
| 8 | 🚀 CI/CD & Deploy | GitHub Actions, test gates, zero-downtime deploy |
| 9 | 🏗️ SaaS Platform | Tenant isolation, RBAC advanced (CASL/OPA), billing (Stripe), data engineering |
| 10 | 📡 Full Observability | OTel SDK, Tempo/Jaeger, Loki, live network map, alarm P1-P4, drill-down |
| 11 | ☸️ Kubernetes & Scaling | K8s manifests, HPA, PDB, Helm, Istio/Linkerd service mesh |
| 12 | 📨 Event-Driven Arch | Kafka, NATS JetStream, CloudEvents, event sourcing, DLQ |
| 13 | 🧠 Network Intelligence | gNMI streaming, correlation engine, NetFlow anomaly, DDoS detection, BGP Flowspec, RTBH, auto-remediation, IBN |
| 14 | 📋 Docker Compose Auto-Docs | Auto-generate compose + .env.example + README, health checks, backup scripts |
| 15 | 🤖 AI/ML Ops | Model serving (FastAPI/Triton), MLflow, training pipeline, GPU scheduling, data drift monitoring |
| 16 | 🎨 High-Agency UX/UI | Taste-Skill: Anti-generic UI, CSS hardware acceleration, strict typography, GSAP motion |
| 17 | 🔄 PDCA Vibecoding | Bkit: Plan-Do-Check-Act forced workflow, Living feature tree, architecture guard |
| 18 | 🧬 Self-Evolution (GEP) | Evolver: Log analysis, Gene & Capsule management, auditable evolution events |
| 19 | 🇮🇩 Language Enforcement | Wajib Bahasa Indonesia dalam seluruh proses penjelasan dan dokumentasi |

---

## 🚀 Contoh Penggunaan

```
# Brainstorming
"Brainstorm arsitektur untuk SaaS monitoring platform dengan 500 tenant"

# SaaS Platform
"Buatkan tenant isolation dengan Row-Level Security di PostgreSQL"
"Setup Stripe subscription dengan usage-based metering"

# Observability
"Setup OpenTelemetry SDK di FastAPI + forward ke Tempo dan Loki"
"Buat alarm routing P1-P4 di Alertmanager"
"Buat live network topology map dengan WebSocket + D3.js"

# Kubernetes
"Buat K8s deployment manifest production-ready dengan HPA dan PDB"
"Setup Istio canary deployment 10%/90%"

# Event-Driven Architecture
"Rancang Kafka topic topology untuk telemetry pipeline 100k events/sec"

# Network Intelligence
"Tulis gNMI subscriber untuk Cisco IOS-XR"
"Buat correlation engine: interface down + BGP drop → auto-remediate"
"Implementasi DDoS detector SYN flood + trigger RTBH via ExaBGP"

# Docker Compose Auto-Docs
"Buatkan docker-compose.yml lengkap dengan PostgreSQL, Redis, Grafana"
"Generate README section Docker Quick Start dengan default credentials table"

# AI/ML Ops
"Buatkan model serving API dengan FastAPI + PyTorch"
"Setup MLflow experiment tracking dengan PostgreSQL backend"
"Buat data drift monitor dengan KS-test per feature"
```

---

## 🔄 Product Lifecycle Pipeline

> Dokumen lengkap: [`PIPELINE.md`](PIPELINE.md)

```
[USER IDEA]
     ↓
FASE 1 — PRD Agent         → Menghasilkan: prd.md
     ↓
FASE 2 — UX/Flow Agent     → Menghasilkan: ux-flow.md
     ↓
FASE 3 — Task Breakdown    → Menghasilkan: task-breakdown.md
     ↓
FASE 4 — Ironman Dev       → Menghasilkan: source code + tests
     ↓
FASE 5 — QA Agent          → Menghasilkan: qa-report.md
     ↓
FASE 6 — Security & Deploy → Menghasilkan: deploy-report.md
     ↓
[PRODUCTION-READY] 🎉
```

**Aturan Pipeline:**
- Setiap fase menghasilkan artefak yang menjadi input fase berikutnya
- Dilarang loncat fase — harus berurutan
- Setiap fase punya Quality Gate yang harus passed sebelum lanjut

---

## 🧩 Platform Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      IRONMAN v6.1                               │
│              ⚖️ Engineering Supreme Law v3.0                    │
├──────────────┬──────────────┬───────────────────────────────────┤
│  PLATFORM    │  INFRA       │  NETWORK INTELLIGENCE             │
│              │              │                                   │
│ SaaS Layer   │ Kubernetes   │ Streaming Telemetry (gNMI)        │
│ Tenant ISO   │ Service Mesh │ Correlation Engine                │
│ RBAC Adv     │ HPA/PDB      │ NetFlow Anomaly Detection         │
│ Billing      │ Helm Charts  │ DDoS Detection + RTBH             │
│ Data Eng     │ EDA (Kafka)  │ BGP Flowspec                      │
│              │              │ Auto Remediation Engine            │
│              │              │ Intent-Based Networking            │
├──────────────┼──────────────┼───────────────────────────────────┤
│  AI/ML OPS   │  UX/UI TASTE │  PDCA & EVOLUTION                 │
│ Model Serve  │ Glassmorphism│ Plan-Do-Check-Act                 │
│ MLflow       │ GSAP Motion  │ GEP Self-Evolution                │
│ Drift Mon    │ Dark Mode    │ Gene & Capsule Store              │
│ GPU Sched    │ Mobile-First │ MemPalace Integration             │
├──────────────┴──────────────┴───────────────────────────────────┤
│                    OBSERVABILITY LAYER                           │
│    OTel SDK → Traces(Tempo) + Logs(Loki) + Metrics(Prometheus)  │
│    Live Network Map | Alarm P1-P4 | Drill-down | traceId        │
├─────────────────────────────────────────────────────────────────┤
│                 FOUNDATION DOMAINS (v1-v8)                       │
│    Fullstack | Docker | Network | Automation | Security | CI/CD  │
├─────────────────────────────────────────────────────────────────┤
│                   MEMORY & CONTEXT LAYER                         │
│    MemPalace MCP (Long-term Memory) | GEP Genes (Reusable)      │
├─────────────────────────────────────────────────────────────────┤
│                   AUTONOMY ENGINE v2.0                            │
│  Self-Planning | Arch Evolution | GEP MAX | Autonomous Loop     │
│  ★ Self-Optimizing: GENERATE → MULTI-STRATEGY → SCORE → SELECT  │
│  ★ Long-term Maintainability > Short-term Fix                    │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📁 Struktur Repositori

```
ironman/
├── SKILL.md                  ← Entry point skill utama (19 domain)
├── ENGINEERING_LAW.md        ← ⚖️ Engineering Supreme Law v3.0
├── PIPELINE.md               ← 🔄 Product Lifecycle Pipeline v1.0
├── AUTONOMY.md               ← 🧠 Autonomy Engine v1.0
├── README.md                 ← Dokumentasi ini
├── package.json              ← NPM package config
├── LICENSE                   ← MIT License
├── bin/
│   └── install.js            ← Installer otomatis (Skill + MemPalace MCP)
├── skills/
│   ├── prd-agent/
│   │   └── SKILL.md          ← 🧠 PRD Agent v2.0 (AI-First Dynamic PRD)
│   └── evolver/
│       └── SKILL.md          ← GEP Self-Evolution module
└── assets/
    └── gep/
        └── events.jsonl      ← Log evolusi & kegagalan
```

---

## 🔗 Ekosistem Terintegrasi

| Komponen | Fungsi | Auto-Install? |
|----------|--------|:---:|
| **Ironman Skill** | 19 domain engineering dalam satu file | ✅ |
| **Engineering Supreme Law** | 20 section hukum coding absolut | ✅ |
| **MemPalace MCP** | Long-term memory & knowledge graph untuk agen AI | ✅ |
| **Evolver (GEP)** | Self-evolution engine: belajar dari kegagalan | ✅ |
| **Product Pipeline** | 6 fase lifecycle: Idea → PRD → UX → Tasks → Dev → Deploy | ✅ |
| **PRD Agent v2.0** | AI-First Dynamic PRD: 7 modul, living document, auto-validate | ✅ |
| **Autonomy Engine v2.0** | 5 sistem: Self-Planning, Arch Evolution, GEP MAX, Auto Loop, **Self-Optimizing** | ✅ |
| **Prompt Master** | HTML tool untuk generate prompt High-Agency | Manual |

---

## 📦 Package Info

```json
{
  "name": "ironman",
  "version": "6.1.0"
}
```

## 📄 License

MIT © hendrax5
