# 🦾 Ironman — AI Skill for Network Engineers

> **1 skill. Semua domain. Zero switching.**
> Dari menulis kode, containerisasi Docker, konfigurasi jaringan multi-vendor, automasi network, hingga security hardening — semua ditangani dalam satu skill.

---

## 🗺️ Domain Coverage

| # | Domain | Cakupan |
|---|---------|---------|
| 1 | 🖥️ Full-Stack Dev | Python, Node.js, Go, REST API, Database — agnostik |
| 2 | 🐳 Docker & Containers | Multi-stage build, Alpine, non-root, resource limits |
| 3 | 🌐 Multi-Vendor Network | **Cisco · MikroTik · Juniper · Huawei · Palo Alto · Fortinet** |
| 4 | 🤖 Network Automation | Netmiko, NAPALM, Ansible, Scapy, parallel SSH |
| 5 | 🔍 Network Monitoring | nmap, SNMP, NetFlow, Prometheus, Grafana |
| 6 | 🛡️ Network Security Tools | tcpdump, Wireshark/tshark, firewall automation |
| 7 | 🔐 App Security | OWASP Top 10, security by default, hardening |
| 8 | 🚀 CI/CD Pipeline | GitHub Actions: test → scan → build → deploy |

---

## ⚡ Karakteristik

- 🪶 **Ringan** — Skill ringkas, infrastruktur selalu Alpine/lightweight
- 💪 **Powerful** — Routing otomatis ke domain yang tepat berdasarkan konteks
- 🔐 **Aman** — Security by default, tidak perlu diminta eksplisit
- 🌐 **Multi-Vendor** — Cisco IOS/NX-OS, MikroTik RouterOS, Juniper JunOS, Palo Alto PAN-OS, FortiGate, Huawei VRP
- 🎨 **Modern** — Output app/UI mengikuti design system 2025+

---

## 🔧 Cara Install

### Antigravity
```bash
# Copy folder ke skills directory
xcopy /E /I ironman "%USERPROFILE%\.gemini\antigravity\skills\ironman"
```

### Claude Code
```bash
# Project-level
mkdir -p .claude/skills/ironman
cp ironman/SKILL.md .claude/skills/ironman/

# Global
mkdir -p ~/.claude/skills/ironman
cp ironman/SKILL.md ~/.claude/skills/ironman/
```

### Cursor / Windsurf
```bash
cat ironman/SKILL.md >> .cursorrules
# atau
cat ironman/SKILL.md >> .windsurfrules
```

### Semua tool via .agents
```bash
mkdir -p .agents/skills/ironman
cp ironman/SKILL.md .agents/skills/ironman/
```

---

## 💡 Contoh Penggunaan

```
"Buatkan Python script menggunakan Netmiko untuk backup config semua router Cisco"
"Setup monitoring dengan Prometheus + Grafana untuk jaringan saya"
"Buatkan firewall rule MikroTik untuk block port telnet di semua interface"
"Buat REST API dengan Docker Alpine dan CI/CD pipeline"
"Scan network 192.168.0.0/24 dan generate laporan inventory device"
```

---

## 📋 Workflow

```
1. DESIGN    → Architecture, entities, API, network topology
2. CODE      → Backend + Frontend + DB (any language)
3. CONTAINER → Multi-stage Dockerfile + Compose (Alpine)
4. NETWORK   → Multi-vendor config + segmentation
5. AUTOMATE  → Netmiko/NAPALM/Ansible scripts
6. MONITOR   → nmap + SNMP + Prometheus + Grafana
7. SECURE    → OWASP + hardening + dependency scan
8. DEPLOY    → CI/CD: test → scan → build → push → deploy
```

---

## 📄 License

MIT — Free to use, modify, and distribute.
