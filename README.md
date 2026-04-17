# 🦾 Ironman v6.1 — AI Skill: Fullstack · DevOps · AI/ML · UX/UI · PDCA · Evolution

> **1 skill. 19 domain. Zero switching.**  
> Brainstorming → fullstack dev → Docker → Kubernetes → SaaS platform → full observability → event-driven → network intelligence → AI/ML Ops → UX/UI (Taste) → PDCA Methodology → Self-Evolution (GEP) — semua dalam satu workflow.
> 
> 🇮🇩 **BAHASA PRIORITAS: INDONESIA**
> Agen secara sistematis akan selalu menjawab, mendokumentasikan, dan merancang dalam Bahasa Indonesia.

[![Version](https://img.shields.io/badge/version-6.1.0-blue)](https://github.com/hendrax5/ironman)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## ⚡ Install (1 command)

```bash
npx github:hendrax5/ironman
```

Installs to **Antigravity**, **Claude Code**, dan **project-level** `.agents/` secara otomatis.

### Manual Install

| Tool | Cara |
|------|------|
| **Antigravity** | `xcopy /E /I ironman "%USERPROFILE%\.gemini\antigravity\skills\ironman"` |
| **Claude Code (global)** | `cp -r ironman ~/.claude/skills/ironman` |
| **Claude Code (project)** | `cp -r ironman .claude/skills/ironman` |
| **Cursor / Windsurf** | `cat ironman/SKILL.md >> .cursorrules` |
| **Project (.agents)** | `cp -r ironman .agents/skills/ironman` |

---

## 🗺️ Domain Coverage

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
| 9 | 🏗️ **SaaS Platform** | Tenant isolation, RBAC advanced (CASL/OPA), billing (Stripe), data engineering |
| 10 | 📡 **Full Observability** | OTel SDK, Tempo/Jaeger, Loki, live network map, alarm P1-P4, drill-down |
| 11 | ☸️ **Kubernetes & Scaling** | K8s manifests, HPA, PDB, Helm, Istio/Linkerd service mesh |
| 12 | 📨 **Event-Driven Arch** | Kafka, NATS JetStream, CloudEvents, event sourcing, DLQ |
| 13 | 🧠 **Network Intelligence** | gNMI streaming, correlation engine, NetFlow anomaly, DDoS detection, BGP Flowspec, RTBH, auto-remediation engine, Intent-Based Networking |
| 14 | 📋 **Docker Compose Auto-Docs** | Auto-generate compose + .env.example + README (ports, creds, quick start), health checks, backup scripts |
| 15 | 🤖 **AI/ML Ops** | Model serving (FastAPI/Triton), MLflow experiment tracking, training pipeline, GPU scheduling, data drift monitoring |
| 16 | 🎨 **High-Agency UX/UI** | Taste-Skill integration: Anti-generic UI, CSS hardware acceleration, strict typography, GSAP motion |
| 17 | 🔄 **PDCA Vibecoding** | Bkit methodology: Plan-Do-Check-Act forced workflow, Living feature tree, architecture guard |
| 18 | 🧬 **Self-Evolution (GEP)**| Evolver integration: Log analysis, Gene & Capsule management, auditable evolution events |
| 19 | 🇮🇩 **Language Enforcement**| Wajib Bahasa Indonesia dalam seluruh proses penjelasan dan dokumentasi |

---

## 🚀 Usage Examples

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

# EDA
"Rancang Kafka topic topology untuk telemetry pipeline 100k events/sec"

# Network Intelligence
"Tulis gNMI subscriber untuk Cisco IOS-XR"
"Buat correlation engine: interface down + BGP drop → auto-remediate"
"Implementasi DDoS detector SYN flood + trigger RTBH via ExaBGP"
"Buat Auto Remediation engine: detect → decide → execute → verify"
"Compile intent YAML isolate-host ke Cisco CLI via IBN Engine"

# Docker Compose Auto-Docs
"Buatkan docker-compose.yml lengkap dengan PostgreSQL, Redis, Grafana + .env.example"
"Generate README section Docker Quick Start dengan default credentials table"
"Buat backup script database ke GitHub"

# AI/ML Ops
"Buatkan model serving API dengan FastAPI + PyTorch"
"Setup MLflow experiment tracking dengan PostgreSQL backend"
"Buat data drift monitor dengan KS-test per feature"
"Buatkan ML CI/CD pipeline: auto-train → validate → deploy"
```

---

## 🧩 Platform Intelligence Layers

```
┌─────────────────────────────────────────────────────────┐
│                   IRONMAN v6.1                          │
├──────────────┬──────────────┬──────────────────────────┤
│  PLATFORM    │  INFRA       │  NETWORK INTELLIGENCE    │
│              │              │                          │
│ SaaS Layer   │ Kubernetes   │ Streaming Telemetry      │
│ Tenant ISO   │ Service Mesh │ Correlation Engine       │
│ RBAC Adv     │ HPA/PDB      │ NetFlow Anomaly          │
│ Billing      │ Helm Charts  │ DDoS Detection           │
│ Data Eng     │ EDA (Kafka)  │ BGP Flowspec/RTBH        │
│              │              │ Auto Remediation         │
│              │              │ Intent-Based Networking  │
├──────────────┼──────────────┼──────────────────────────┤
│  AI/ML OPS   │  UX/UI TASTE │  PDCA & EVOLUTION        │
│ Model Serve  │ High-End UI  │ Plan-Do-Check-Act        │
│ MLflow       │ GSAP Motion  │ GEP Self-Evolution       │
│ Drift Mon    │ Typography   │ Gene & Capsule Store     │
├──────────────┴──────────────┴──────────────────────────┤
│              OBSERVABILITY LAYER                        │
│  OTel SDK → Traces(Tempo) + Logs(Loki) + Metrics(Prom) │
│  Live Network Map | Alarm P1-P4 | Drill-down           │
├─────────────────────────────────────────────────────────┤
│           FOUNDATION DOMAINS (v1-v8)                    │
│  Fullstack | Docker | Network | Automation | CI/CD      │
└─────────────────────────────────────────────────────────┘
```

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
