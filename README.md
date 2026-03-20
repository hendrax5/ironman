# 🦾 Ironman — AI Skill: Fullstack DevOps Security Engineer + Network Edition

> **1 skill. Semua domain. Dari ideasi sampai deploy.**  
> Brainstorming arsitektur → fullstack dev → Docker → multi-vendor networking → automation → monitoring → security hardening — semua dalam satu workflow.

[![Version](https://img.shields.io/badge/version-3.1.0-blue)](https://github.com/hendrax5/ironman)
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
| 0 | 🧠 **Brainstorming** | Architecture decision, network design, tech stack eval, problem decomposition |
| 1 | 🖥️ **Full-Stack Dev** | Python, Node.js, Go, REST API, Database — language agnostic |
| 2 | 🐳 **Docker & Containers** | Multi-stage build, Alpine, non-root, resource limits |
| 3 | 🌐 **Network Multi-Vendor** | **Cisco · MikroTik · Juniper · Huawei · Palo Alto · Fortinet** |
| 4 | 🤖 **Network Automation** | Netmiko, NAPALM, Ansible, Scapy, parallel SSH |
| 5 | 🔍 **Network Monitoring** | nmap, SNMP, NetFlow, Prometheus, Grafana |
| 6 | 🛡️ **Network Security** | tcpdump, Wireshark/tshark, firewall automation, IDS/IPS |
| 7 | 🔐 **App Security** | OWASP Top 10, security by default, dependency audit |
| 8 | 🚀 **CI/CD Pipeline** | GitHub Actions: test → scan → build → deploy |

---

## 🧠 Brainstorming Mode (NEW in v3.1.0)

Aktif otomatis saat kamu mengatakan:

```
"Mana yang lebih baik antara X dan Y?"
"Desain topologi jaringan untuk..."
"Apa stack yang cocok untuk use case ini?"
"Saya tidak tahu harus mulai dari mana"
"Pilih vendor mana yang cocok?"
"Bantu saya rencanakan arsitektur..."
```

**4 Framework tersedia:**

| Framework | Deskripsi |
|-----------|-----------|
| 🏗️ Architecture Decision | Konteks → Trade-off → Rekomendasi → Next step |
| 🌐 Network Design Thinking | Topologi, segmentasi VLAN, routing, vendor fit, HA |
| 📊 Tech Stack Evaluation | Tabel perbandingan multi-kriteria + winner |
| 🔍 Problem Decomposition | Root cause, scope, milestone, risk, quick win |

---

## 💡 Contoh Penggunaan

```
# Brainstorming
"Saya ingin build monitoring jaringan, mana yang lebih baik: PRTG, Zabbix, atau Prometheus+Grafana?"
"Desain topologi untuk kantor 3 lantai dengan server room terpisah"
"Pakai Ansible atau Netmiko untuk automasi 50 router Cisco?"

# Network Automation
"Backup config semua router Cisco pakai Netmiko"
"Buat Ansible playbook untuk deploy VLAN ke semua switch"

# Fullstack + Docker
"Buat REST API Python + Dockerfile Alpine + docker-compose dengan PostgreSQL"
"Setup CI/CD GitHub Actions dengan trivy scan sebelum deploy"

# Network Security
"Buat script Python untuk monitor traffic mencurigakan pakai Scapy"
"Setup Prometheus + Grafana untuk monitoring SNMP jaringan saya"
```

---

## 📋 Full Workflow

```
0. BRAINSTORM → Ideasi arsitektur, evaluasi stack, desain topologi, problem decomp
1. DESIGN     → Architecture, entities, API contracts, network topology
2. CODE       → Backend + Frontend + DB migrations (any language)
3. CONTAINER  → Multi-stage Dockerfile + Compose (Alpine/lightweight)
4. NETWORK    → Multi-vendor config + segmentation + Nginx SSL proxy
5. AUTOMATE   → Netmiko/NAPALM/Ansible scripts untuk network tasks
6. MONITOR    → nmap + SNMP + Prometheus + Grafana dashboard
7. SECURE     → OWASP checklist + container hardening + dependency scan
8. DEPLOY     → CI/CD: test → scan → build → push → deploy
```

---

## ⚙️ Karakteristik

| | |
|---|---|
| 🪶 **Ringan** | Infrastruktur selalu Alpine/lightweight |
| 🔀 **Auto-routing** | Deteksi domain otomatis dari konteks |
| 🔐 **Secure by default** | Security tanpa perlu diminta eksplisit |
| 🌐 **Multi-vendor** | Cisco, MikroTik, Juniper, Palo Alto, Fortinet, Huawei |
| 🧠 **Brainstorm-ready** | Ideasi → implementasi dalam 1 skill |

---

## 📄 License

MIT — Free to use, modify, and distribute.
