---
name: ironman
description: "This skill should be used when building complete production-grade applications requiring full-stack development, Docker/container orchestration, network engineering, and security hardening — all in one unified workflow. Activate when a project needs backend APIs, frontend UIs, Docker deployments, networking config, and security best practices together."
category: bundled
risk: safe
source: custom
tags: "[fullstack, docker, network, security, devops, backend, frontend, api, database, authentication, network-automation, multi-vendor, cisco, mikrotik, juniper, fortinet, palo-alto, monitoring, wireshark, netmiko, ansible, agnostic]"
date_added: "2026-03-20"
version: "3.0.0"
---

# 🦾 Ironman — Fullstack DevOps Security Engineer + Network Edition

> **1 skill. Semua domain. Zero switching.**
> Dari menulis kode, containerisasi Docker, konfigurasi jaringan multi-vendor, automasi network, hingga security hardening — semua ditangani di sini.

---

## 🗺️ Domain Coverage

| # | Domain | Cakupan Utama |
|---|---------|--------------|
| 1 | 🖥️ **Full-Stack Dev** | Backend + Frontend + API + DB — any language |
| 2 | 🐳 **Docker & Containers** | Dockerfile, Compose, Alpine, security hardening |
| 3 | 🌐 **Network Multi-Vendor** | Cisco, MikroTik, Juniper, Huawei, Palo Alto, Fortinet |
| 4 | 🤖 **Network Automation** | Python, Netmiko, NAPALM, Ansible, Scapy |
| 5 | 🔍 **Network Monitoring** | nmap, SNMP, NetFlow, Prometheus, Grafana |
| 6 | 🛡️ **Network Security** | Wireshark, tcpdump, firewall automation, IDS/IPS |
| 7 | 🔐 **App Security** | OWASP, auth, JWT, hardening, dependency audit |
| 8 | 🚀 **CI/CD & Deploy** | GitHub Actions, test gates, zero-downtime deploy |

### Routing Otomatis

| Kata kunci dalam permintaan | Domain aktif |
|---|---|
| `build`, `API`, `component`, `endpoint`, `UI` | Full-Stack Dev |
| `docker`, `dockerfile`, `compose`, `container` | Docker |
| `cisco`, `mikrotik`, `juniper`, `huawei`, `fortinet`, `palo alto`, `switch`, `router`, `firewall` | Network Multi-Vendor |
| `netmiko`, `ansible`, `automate`, `script network`, `napalm`, `paramiko` | Network Automation |
| `nmap`, `snmp`, `netflow`, `monitor`, `grafana`, `prometheus` | Network Monitoring |
| `wireshark`, `tcpdump`, `scapy`, `packet`, `intrusion`, `ids` | Network Security |
| `jwt`, `auth`, `owasp`, `vulnerability`, `audit`, `hardening` | App Security |
| `ci/cd`, `pipeline`, `deploy`, `github actions` | CI/CD |

---

## 1️⃣ Full-Stack Development

### Universal Architecture
```
Presentation  →  API Layer  →  Service Layer  →  Repository  →  Data Layer
 (UI/React)     (REST/gRPC)   (Business Logic)  (Data Access)  (DB/Cache/Queue)
```

### Backend Patterns
```python
# Python / FastAPI
@router.post("/items", response_model=ItemResponse, status_code=201)
async def create_item(data: CreateItemRequest, db: AsyncSession = Depends(get_db)):
    return await ItemService(ItemRepository(db)).create(data)
```
```typescript
// Node.js / TypeScript
async createItem(data: CreateItemDto): Promise<Item> {
  const exists = await this.repo.findBy({ name: data.name });
  if (exists) throw new ConflictError("Item exists");
  return this.repo.create(data);
}
```
```go
// Go
func (h *Handler) CreateItem(w http.ResponseWriter, r *http.Request) {
    var req CreateItemRequest
    json.NewDecoder(r.Body).Decode(&req)
    item, err := h.svc.Create(r.Context(), req)
    if err != nil { respondError(w, 500, err); return }
    respondJSON(w, 201, item)
}
```

### Frontend (Modern UI Rules)
```
✅ Design modern: gunakan system font atau Google Fonts (Inter/Plus Jakarta Sans)
✅ Color palette: harmonious, dark-mode ready, bukan plain red/blue/green
✅ Micro-animations: hover effects, smooth transitions (150-300ms)
✅ Glassmorphism / subtle gradients untuk komponen utama
✅ Responsive by default: mobile-first
✅ Loading skeleton, empty states, dan error states wajib ada
```

### API Design
```
REST:  GET /api/v1/resources  →  POST  →  GET /:id  →  PATCH /:id  →  DELETE /:id
Response: { data: T, meta?: { page, total }, error?: { code, message } }
```

### Database Universal
```sql
-- Every table:
CREATE TABLE items (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ  -- soft delete
);
-- Always index: FKs + query columns
CREATE INDEX idx_items_created ON items(created_at DESC);
```

---

## 2️⃣ Docker & Containers (Lightweight)

### Multi-Stage Dockerfile (Universal)
```dockerfile
# deps
FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json .
RUN npm ci --only=production

# builder
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# runner (minimal, non-root)
FROM node:22-alpine AS runner
WORKDIR /app
RUN addgroup -S app && adduser -S app -G app
COPY --from=builder --chown=app:app /app/dist ./dist
USER app
HEALTHCHECK --interval=30s CMD wget -qO- http://localhost:3000/health || exit 1
EXPOSE 3000
CMD ["node", "dist/main.js"]
```

### Docker Compose (Production)
```yaml
services:
  app:
    build: { context: ., target: runner }
    restart: unless-stopped
    networks: [internal]
    depends_on:
      db: { condition: service_healthy }

  db:
    image: postgres:16-alpine
    volumes: [pgdata:/var/lib/postgresql/data]
    env_file: .env
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U $$POSTGRES_USER"]
      interval: 10s
      retries: 5
    networks: [internal]

  cache:
    image: redis:7-alpine
    command: redis-server --requirepass ${REDIS_PASSWORD}
    networks: [internal]

  proxy:
    image: nginx:alpine
    ports: ["80:80", "443:443"]
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./certs:/etc/ssl/certs:ro
    networks: [internal, external]

networks:
  internal: { driver: bridge, internal: true }
  external: { driver: bridge }
volumes:
  pgdata:
```

### Container Security (Always Apply)
```bash
USER nonroot                           # never root
--read-only                            # read-only FS
--cap-drop ALL                         # drop all capabilities
--security-opt no-new-privileges       # no privilege escalation
--memory 512m --cpus 1.0              # resource limits
trivy image <image>:latest             # scan before deploy
```

---

## 3️⃣ Network Engineering — Multi-Vendor

### Cisco IOS / IOS-XE / NX-OS
```
# Interface + VLAN
interface GigabitEthernet1/0/1
 switchport mode access
 switchport access vlan 100
 spanning-tree portfast
 no shutdown

# OSPF
router ospf 1
 network 10.0.0.0 0.0.0.255 area 0
 passive-interface GigabitEthernet0/0

# BGP
router bgp 65001
 neighbor 192.168.1.1 remote-as 65002
 address-family ipv4
  network 10.0.0.0 mask 255.255.255.0

# ACL
ip access-list extended BLOCK_TELNET
 deny tcp any any eq 23
 permit ip any any
interface G0/1
 ip access-group BLOCK_TELNET in

# Save
write memory
```

### MikroTik RouterOS
```
# Firewall rule
/ip firewall filter add chain=input protocol=tcp dst-port=22 src-address=10.0.0.0/8 action=accept
/ip firewall filter add chain=input action=drop comment="drop all"

# VLAN bridge
/interface vlan add interface=ether1 name=vlan100 vlan-id=100
/ip address add address=192.168.100.1/24 interface=vlan100

# OSPF
/routing ospf instance add name=default router-id=1.1.1.1
/routing ospf area add name=backbone instance=default area-id=0.0.0.0
/routing ospf interface-template add interfaces=ether1 area=backbone

# WireGuard VPN
/interface wireguard add name=wg0 listen-port=51820
/interface wireguard peers add interface=wg0 public-key="<KEY>" allowed-address=10.0.0.2/32

# Export config
/export compact
```

### Juniper JunOS
```
# Interface
set interfaces ge-0/0/0 unit 0 family inet address 10.0.0.1/24

# OSPF
set protocols ospf area 0.0.0.0 interface ge-0/0/0.0

# Firewall filter
set firewall filter BLOCK-TELNET term deny-telnet from protocol tcp
set firewall filter BLOCK-TELNET term deny-telnet from destination-port telnet
set firewall filter BLOCK-TELNET term deny-telnet then reject
set firewall filter BLOCK-TELNET term allow-all then accept

# Commit
commit confirmed 5
```

### Palo Alto PAN-OS
```
# Security policy
set rulebase security rules ALLOW-WEB from trust
set rulebase security rules ALLOW-WEB to untrust
set rulebase security rules ALLOW-WEB application [web-browsing ssl]
set rulebase security rules ALLOW-WEB action allow
set rulebase security rules ALLOW-WEB profile-setting profiles vulnerability strict

# NAT
set rulebase nat rules SRC-NAT source-translation dynamic-ip-and-port interface-address ip {}

# Commit
commit
```

### Fortinet FortiGate
```
# Firewall policy
config firewall policy
  edit 1
    set name "LAN-to-WAN"
    set srcintf "internal"
    set dstintf "wan1"
    set srcaddr "all"
    set dstaddr "all"
    set action accept
    set schedule "always"
    set service "ALL"
    set nat enable
  next
end

# SD-WAN
config system sdwan
  set status enable
  config members
    edit 1
      set interface "wan1"
      set gateway 1.2.3.1
    next
  end
end
```

### Huawei VRP
```
# Interface
interface GigabitEthernet0/0/1
 ip address 10.0.0.1 255.255.255.0
 undo shutdown

# OSPF
ospf 1 router-id 1.1.1.1
 area 0.0.0.0
  network 10.0.0.0 0.0.0.255

# ACL
acl 3001
 rule 5 deny tcp destination-port eq telnet
 rule 100 permit ip
interface GigabitEthernet0/0/1
 traffic-filter inbound acl 3001

# Save
save
```

---

## 4️⃣ Network Automation

### Python — Netmiko (Multi-Vendor SSH)
```python
from netmiko import ConnectHandler

devices = [
    {"device_type": "cisco_ios",     "host": "192.168.1.1", "username": "admin", "password": "secret"},
    {"device_type": "mikrotik_routeros", "host": "192.168.1.2", "username": "admin", "password": "secret"},
    {"device_type": "juniper_junos", "host": "192.168.1.3", "username": "admin", "password": "secret"},
    {"device_type": "fortinet",      "host": "192.168.1.4", "username": "admin", "password": "secret"},
    {"device_type": "paloalto_panos","host": "192.168.1.5", "username": "admin", "password": "secret"},
]

def run_command(device: dict, command: str) -> str:
    with ConnectHandler(**device) as conn:
        return conn.send_command(command)

# Parallel execution across all devices
from concurrent.futures import ThreadPoolExecutor
with ThreadPoolExecutor(max_workers=10) as ex:
    results = list(ex.map(lambda d: run_command(d, "show version"), devices))
```

### Python — NAPALM (Unified API)
```python
from napalm import get_network_driver

driver = get_network_driver("ios")   # ios | junos | eos | nxos | fortios
device = driver("10.0.0.1", "admin", "secret")
device.open()

# Get structured data
facts    = device.get_facts()
bgp      = device.get_bgp_neighbors()
arp      = device.get_arp_table()
lldp     = device.get_lldp_neighbors()
ifaces   = device.get_interfaces()

# Push config
device.load_merge_candidate(config="interface Loopback0\n ip address 1.1.1.1 255.255.255.255\n")
device.compare_config()   # diff before commit
device.commit_config()
device.close()
```

### Ansible — Network Playbook
```yaml
---
- name: Configure Network Devices
  hosts: all
  gather_facts: no
  tasks:
    - name: Backup config
      cisco.ios.ios_config:
        backup: yes
      when: ansible_network_os == "cisco.ios.ios"

    - name: Configure OSPF (Cisco)
      cisco.ios.ios_ospf_interfaces:
        config:
          - name: GigabitEthernet1
            address_family:
              - afi: ipv4
                cost: 10

    - name: Configure VLAN (MikroTik)
      community.routeros.api:
        hostname: "{{ inventory_hostname }}"
        username: admin
        password: "{{ ansible_password }}"
        path: interface vlan
        add:
          name: vlan100
          interface: ether1
          vlan-id: 100
      when: ansible_network_os == "routeros"
```

### Scapy — Packet Crafting & Analysis
```python
from scapy.all import *

# Packet sniffer
def analyze(pkt):
    if pkt.haslayer(IP) and pkt.haslayer(TCP):
        print(f"{pkt[IP].src}:{pkt[TCP].sport} → {pkt[IP].dst}:{pkt[TCP].dport}")

sniff(iface="eth0", filter="tcp", prn=analyze, store=False)

# Custom packet
pkt = IP(dst="10.0.0.1") / TCP(dport=80, flags="S")
resp = sr1(pkt, timeout=1)

# Port scanner
def scan(target, ports):
    syn = [IP(dst=target)/TCP(dport=p, flags="S") for p in ports]
    ans, _ = sr(syn, timeout=2, verbose=0)
    return [r.dport for s, r in ans if r.haslayer(TCP) and r[TCP].flags == 0x12]
```

---

## 5️⃣ Network Monitoring

### nmap — Discovery & Scanning
```bash
# Host discovery
nmap -sn 192.168.0.0/24

# Full service scan
nmap -sV -sC -O -p- 192.168.1.1 -oN scan.txt

# Vuln scripts
nmap --script vuln 192.168.1.1

# Fast top-ports
nmap -F --open 192.168.0.0/24
```

### SNMP Polling
```python
from pysnmp.hlapi import *

OIDs = {
    "sysDescr":     "1.3.6.1.2.1.1.1.0",
    "ifInOctets":   "1.3.6.1.2.1.2.2.1.10",
    "ifOutOctets":  "1.3.6.1.2.1.2.2.1.16",
    "cpuLoad":      "1.3.6.1.4.1.9.2.1.58.0",  # Cisco
}

def snmp_get(host: str, community: str, oid: str):
    for (err_ind, err_status, err_idx, var_binds) in getCmd(
        SnmpEngine(),
        CommunityData(community),
        UdpTransportTarget((host, 161)),
        ContextData(),
        ObjectType(ObjectIdentity(oid))
    ):
        if not err_ind and not err_status:
            return var_binds[0][1].prettyPrint()
```

### Prometheus + Grafana Stack
```yaml
# docker-compose monitoring
services:
  prometheus:
    image: prom/prometheus:latest
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    ports: ["9090:9090"]

  node-exporter:
    image: prom/node-exporter:latest
    network_mode: host
    pid: host

  snmp-exporter:
    image: prom/snmp-exporter:latest
    volumes:
      - ./snmp.yml:/etc/snmp_exporter/snmp.yml
    ports: ["9116:9116"]

  grafana:
    image: grafana/grafana:latest
    ports: ["3000:3000"]
    volumes:
      - grafana_data:/var/lib/grafana
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=${GRAFANA_PASSWORD}
```

---

## 6️⃣ Network Security Tools

### Wireshark / tcpdump
```bash
# Capture to file
tcpdump -i eth0 -w capture.pcap

# Filter specific traffic
tcpdump -i eth0 'tcp port 443 and host 10.0.0.1'
tcpdump -i eth0 'icmp or arp'

# Read capture
tcpdump -r capture.pcap -n

# tshark (CLI Wireshark)
tshark -r capture.pcap -T fields -e ip.src -e ip.dst -e tcp.dstport
tshark -r capture.pcap -Y "http.request.method==POST"
```

### Firewall Automation Script
```python
import subprocess
from typing import Literal

def manage_rule(
    action: Literal["add", "remove"],
    direction: Literal["in", "out"],
    protocol: str,
    port: int,
    src_ip: str = "any"
):
    """Cross-platform firewall rule manager (iptables/ufw)"""
    flag = "-A" if action == "add" else "-D"
    chain = "INPUT" if direction == "in" else "OUTPUT"
    cmd = ["iptables", flag, chain, "-p", protocol]
    if src_ip != "any":
        cmd += ["-s", src_ip]
    cmd += ["--dport", str(port), "-j", "ACCEPT"]
    subprocess.run(cmd, check=True)
    print(f"{'Added' if action == 'add' else 'Removed'} rule: {direction} {protocol}:{port} from {src_ip}")
```

### Network Inventory Automation
```python
import json
from netmiko import ConnectHandler
from napalm import get_network_driver

def collect_inventory(devices: list[dict]) -> list[dict]:
    """Collect device facts from multi-vendor devices"""
    inventory = []
    for dev in devices:
        driver = get_network_driver(dev["os"])
        conn = driver(dev["host"], dev["user"], dev["password"])
        conn.open()
        facts = conn.get_facts()
        interfaces = conn.get_interfaces()
        inventory.append({
            "host": dev["host"],
            "vendor": facts["vendor"],
            "model": facts["model"],
            "version": facts["os_version"],
            "hostname": facts["hostname"],
            "uptime": facts["uptime"],
            "interface_count": len(interfaces),
        })
        conn.close()
    return inventory

# Export to JSON / CSV
with open("inventory.json", "w") as f:
    json.dump(collect_inventory(devices), f, indent=2)
```

---

## 7️⃣ Application Security

### Security by Default Checklist
```markdown
Auth:
  ✅ Passwords: bcrypt/argon2, cost ≥ 12
  ✅ JWT: RS256/ES256, short TTL (15m access / 7d refresh)
  ✅ Refresh token rotation + server-side revocation
  ✅ MFA untuk akses admin

Input:
  ✅ Schema validation semua input (Zod / Pydantic / class-validator)
  ✅ Parameterized query ONLY — no string concat SQL
  ✅ File upload: validasi MIME + extension + magic bytes

Transport:
  ✅ HTTPS only, TLS 1.2+
  ✅ HSTS: max-age=63072000
  ✅ CSP, X-Frame-Options DENY, X-Content-Type-Options nosniff

Infrastructure:
  ✅ Container non-root + read-only FS
  ✅ Secrets via env var / vault — tidak di code / image
  ✅ Dependency scan: npm audit / pip-audit / trivy
  ✅ Rate limiting: per IP + per user
```

### OWASP Top 10 Quick Reference
```
A01 Broken Access Control → validate ownership every request, deny by default
A02 Cryptographic Failures → TLS everywhere, bcrypt passwords, no MD5/SHA1
A03 Injection → parameterized queries, input schema validation
A05 Security Misconfiguration → disable debug in prod, security headers
A06 Vulnerable Components → Renovate/Dependabot + Trivy in CI
A07 Auth Failures → token rotation, short TTL, secure cookies
A09 Logging Failures → log auth events, NEVER log tokens/passwords/PII
```

---

## 8️⃣ CI/CD Pipeline

```yaml
name: CI/CD
on:
  push: { branches: [main] }
  pull_request: { branches: [main] }

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: |
          npm ci && npm run lint && npm run test:ci
          npm audit --audit-level=high

  build-scan-push:
    needs: quality
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: docker/setup-buildx-action@v3
      - run: docker build -t app:${{ github.sha }} .
      - uses: aquasecurity/trivy-action@master
        with:
          image-ref: app:${{ github.sha }}
          severity: CRITICAL,HIGH
          exit-code: 1
      - if: github.ref == 'refs/heads/main'
        run: |
          docker tag app:${{ github.sha }} ghcr.io/${{ github.repository }}:latest
          docker push ghcr.io/${{ github.repository }}:latest

  deploy:
    needs: build-scan-push
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - run: echo "Deploy → VPS/K8s/Render/Fly.io"
```

---

## ⚡ Quick Reference Commands

```bash
# Docker
docker compose up -d --build          # start all
docker compose logs -f app            # watch logs
docker stats                          # resource usage
trivy image app:latest                # security scan

# Network — Discovery
nmap -sn 192.168.0.0/24              # host discovery
nmap -sV -O 192.168.1.1              # service + OS detect
arp-scan --localnet                   # ARP discovery

# Network — Capture & Analysis
tcpdump -i eth0 -w cap.pcap          # capture
tcpdump -r cap.pcap 'tcp port 80'    # read + filter
tshark -r cap.pcap -Y "dns"          # DNS queries only

# Network — Connectivity
ping -c 4 8.8.8.8                    # basic test
traceroute 8.8.8.8                   # path trace
mtr 8.8.8.8                          # continuous trace
curl -Ik https://example.com         # HTTP headers + SSL

# SSL
openssl s_client -connect host:443   # test SSL
openssl x509 -in cert.pem -noout -dates  # cert expiry

# Misc
ss -tulpn                            # open ports
netstat -rn                          # routing table
ip route show                        # Linux routing
```

---

## 🔄 Full Workflow

```
1. DESIGN    → Architecture, entities, API contracts, network topology
2. CODE      → Backend + Frontend + DB migrations (any language)
3. CONTAINER → Multi-stage Dockerfile + Compose (lightweight/Alpine)
4. NETWORK   → Nginx SSL proxy + segmentation + multi-vendor config
5. AUTOMATE  → Netmiko/NAPALM/Ansible scripts untuk network tasks
6. MONITOR   → nmap + SNMP + Prometheus + Grafana dashboard
7. SECURE    → OWASP checklist + container hardening + dependency scan
8. DEPLOY    → CI/CD pipeline: test → scan → build → push → deploy
```

---

## When to Use This Skill

Panggil skill ini untuk **apapun** yang berkaitan dengan:
building apps, Docker, network configuration (multi-vendor), network automation, packet analysis, monitoring, security audit, atau CI/CD — satu skill untuk seluruh lifecycle development dan network engineering.
