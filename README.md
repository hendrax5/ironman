# 🦾 Ironman v4.0 — AI Skill: Fullstack · DevOps · Network Intelligence Platform

> **1 skill. 14 domain. Zero switching.**  
> Brainstorming → fullstack dev → Docker → Kubernetes → SaaS platform → full observability → event-driven → network intelligence (DDoS/BGP Flowspec/RTBH/auto-remediation) — semua dalam satu workflow.

[![Version](https://img.shields.io/badge/version-4.0.0-blue)](https://github.com/hendrax5/ironman)
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
```

---

## 🧩 Platform Intelligence Layers

```
┌─────────────────────────────────────────────────────────┐
│                   IRONMAN v4.0                          │
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
  "version": "4.0.0"
}
```

## 📄 License

MIT © hendrax5
