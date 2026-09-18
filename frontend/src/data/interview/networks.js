/**
 * 50 High-Value Computer Networks Interview Questions
 */

export const NETWORKS_QUESTIONS = [
  {
    id: 1,
    question: "What are the 7 layers of the OSI Model and what are their primary functions?",
    category: "OSI & TCP/IP Models",
    difficulty: "Easy",
    explanation: "1) **Physical**: Bit-level transmission over physical media (cables, radio). 2) **Data Link**: Node-to-node frame transfer, MAC addressing, error detection (Ethernet, Wi-Fi). 3) **Network**: Logical routing of packets across networks, IP addressing (IPv4, IPv6, ICMP). 4) **Transport**: End-to-end process-to-process delivery, flow/congestion control, port numbers (TCP, UDP). 5) **Session**: Manages and terminates communication sessions. 6) **Presentation**: Data formatting, encryption, compression (TLS, JPEG). 7) **Application**: User-facing network protocols (HTTP, DNS, SMTP, SSH)."
  },
  {
    id: 2,
    question: "How does the TCP 3-Way Handshake work and what occurs during connection termination?",
    category: "Transport Layer",
    difficulty: "Medium",
    explanation: "**Connection Establishment (3-Way)**: 1) Client sends `SYN` with initial sequence number `seq=x`. 2) Server replies with `SYN-ACK` (`seq=y`, `ack=x+1`). 3) Client sends `ACK` (`ack=y+1`). **Connection Termination (4-Way)**: 1) Client sends `FIN`. 2) Server sends `ACK`. 3) Server finishes pending data and sends its own `FIN`. 4) Client sends `ACK` and enters `TIME_WAIT` (typically 2MSL = 60-120s) to ensure the server received the final ACK."
  },
  {
    id: 3,
    question: "What is the difference between TCP and UDP?",
    category: "Transport Layer",
    difficulty: "Easy",
    explanation: "**TCP**: Connection-oriented, reliable (guarantees packet delivery via retransmissions and acknowledgements), preserves ordered byte-stream, includes congestion/flow control, higher header overhead (20-60 bytes). **UDP**: Connectionless, unreliable (fire-and-forget; packets may drop or arrive out of order), zero connection handshake latency, lightweight 8-byte header, optimal for real-time video streaming, gaming, and DNS."
  },
  {
    id: 4,
    question: "What is the complete step-by-step process of what happens when you type a URL into a browser and press Enter?",
    category: "Web & DNS",
    difficulty: "Hard",
    explanation: "1) Browser checks local DNS cache (browser, OS, router, recursive resolver). 2) DNS query resolves IP via Root, TLD (.com), and Authoritative servers. 3) Browser establishes TCP connection (3-way handshake) with server IP. 4) TLS Handshake negotiates encryption keys and certificates. 5) Browser sends HTTP GET request. 6) Server processes request and returns HTTP response (HTML). 7) Browser parses HTML, builds DOM and CSSOM trees, executes JavaScript, requests sub-resources (images, stylesheets), and renders pixels onto the screen."
  },
  {
    id: 5,
    question: "How does the Domain Name System (DNS) resolution process work (Iterative vs Recursive queries)?",
    category: "Web & DNS",
    difficulty: "Medium",
    explanation: "The client asks the local **Recursive Resolver** (ISP / 8.8.8.8). The resolver makes **Iterative queries**: 1) Asks **Root DNS Server** (`.`), which points to the **TLD Server** (`.com`). 2) Asks TLD server, which points to the domain's **Authoritative DNS Server** (`ns1.example.com`). 3) Authoritative server returns the A/AAAA record (IP address), which the resolver caches and returns to the client."
  },
  {
    id: 6,
    question: "What are the differences between HTTP/1.1, HTTP/2, and HTTP/3 (QUIC)?",
    category: "Application Layer Protocols",
    difficulty: "Hard",
    explanation: "**HTTP/1.1**: Text-based, persistent connections, suffers from Head-of-Line (HoL) blocking on single TCP sockets. **HTTP/2**: Binary protocol, single TCP connection with multiplexed concurrent streams, header compression (HPACK), and server push. **HTTP/3**: Replaces TCP with **QUIC over UDP**, eliminating TCP HoL blocking at packet drop level and providing zero-RTT connection re-establishment."
  },
  {
    id: 7,
    question: "How does the TLS/HTTPS Handshake (TLS 1.2 vs TLS 1.3) encrypt communication?",
    category: "Security & Encryption",
    difficulty: "Hard",
    explanation: "In **TLS 1.2** (2 roundtrips): Client/Server exchange random numbers, server presents SSL certificate, parties exchange premaster secret via RSA/Diffie-Hellman, and derive symmetric session keys. In **TLS 1.3** (1 roundtrip / 0-RTT): Elliptic Curve Diffie-Hellman (ECDHE) key shares are sent immediately in `ClientHello`, cutting handshake latency in half and eliminating insecure legacy ciphers."
  },
  {
    id: 8,
    question: "What is TCP Flow Control (Sliding Window) vs Congestion Control?",
    category: "Transport Layer",
    difficulty: "Hard",
    explanation: "**Flow Control**: Prevents the sender from overwhelming the *receiver's buffer* (the receiver advertises available window size `rwnd` in TCP headers). **Congestion Control**: Prevents the sender from overwhelming the *underlying network infrastructure* (sender maintains congestion window `cwnd` using Slow Start, Congestion Avoidance, Fast Retransmit, and Fast Recovery algorithms like Cubic/BBR)."
  },
  {
    id: 9,
    question: "What is the difference between IPv4 and IPv6 and why was IPv6 created?",
    category: "Network Layer & Routing",
    difficulty: "Easy",
    explanation: "**IPv4**: 32-bit addresses (`4.3 billion` total addresses, e.g. `192.168.1.1`), exhausted globally. **IPv6**: 128-bit addresses (`3.4 * 10^38` addresses, e.g. `2001:0db8::8a2e:0370:7334`), eliminating NAT requirements, providing built-in IPsec, and streamlining router packet header processing."
  },
  {
    id: 10,
    question: "What is NAT (Network Address Translation) and what is CGNAT?",
    category: "Network Layer & Routing",
    difficulty: "Medium",
    explanation: "NAT maps private non-routable local IP addresses (`192.168.x.x`, `10.x.x.x`) to a single public routable IP using port mapping (PAT / NAT Overload) in routers. **Carrier-Grade NAT (CGNAT)** is large-scale NAT performed by ISPs to share limited IPv4 addresses across thousands of residential customers."
  },
  {
    id: 11,
    question: "What is the Address Resolution Protocol (ARP) and what is ARP Poisoning (Spoofing)?",
    category: "Data Link Layer",
    difficulty: "Medium",
    explanation: "ARP maps a known Network Layer logical IP address to a physical Data Link MAC address on the local subnet via broadcast `ARP Request`. **ARP Spoofing**: An attacker sends forged gratuitous ARP replies associating their MAC address with the default gateway IP, intercepting local network traffic in a Man-in-the-Middle (MitM) attack."
  },
  {
    id: 12,
    question: "What is DHCP (Dynamic Host Configuration Protocol) and the DORA process?",
    category: "Application Layer Protocols",
    difficulty: "Easy",
    explanation: "DHCP automatically assigns IP addresses, subnet masks, default gateways, and DNS servers to devices. The 4-step DORA process: 1) **Discover** (client broadcasts request), 2) **Offer** (DHCP server offers IP), 3) **Request** (client formally requests the offered IP), 4) **Acknowledge** (server commits lease and confirms)."
  },
  {
    id: 13,
    question: "What is CIDR (Classless Inter-Domain Routing) and Subnet Masking?",
    category: "Network Layer & Routing",
    difficulty: "Medium",
    explanation: "CIDR notation (`192.168.1.0/24`) replaces rigid Class A/B/C networks. The `/24` prefix specifies that the first 24 bits represent the Network ID (`255.255.255.0`), leaving 8 bits for Host IDs (`2^8 - 2 = 254` usable host addresses, subtracting network and broadcast addresses)."
  },
  {
    id: 14,
    question: "What is a Denial of Service (DoS) and Distributed Denial of Service (DDoS) attack (SYN Flood)?",
    category: "Security & Encryption",
    difficulty: "Medium",
    explanation: "A **SYN Flood** sends thousands of spoofed TCP `SYN` packets without completing the 3-way handshake, exhausting the server's half-open connection backlog queue (SYN queue). Mitigated using **SYN Cookies** (encoding connection state cryptographically into the initial sequence number without allocating memory until the final ACK arrives) and Anycast CDN scrubbing networks (Cloudflare)."
  },
  {
    id: 15,
    question: "What is the difference between Symmetric Encryption and Asymmetric Encryption?",
    category: "Security & Encryption",
    difficulty: "Easy",
    explanation: "**Symmetric Encryption** (AES, ChaCha20) uses the *same single secret key* for both encryption and decryption (very fast, used for bulk data transfer). **Asymmetric Encryption** (RSA, ECC) uses a *mathematically linked key pair* (Public Key for encryption/verification, Private Key for decryption/signing), used in TLS handshakes and SSH authentication."
  },
  {
    id: 16,
    question: "What is WebSocket Protocol and how does the HTTP Upgrade Handshake work?",
    category: "Application Layer Protocols",
    difficulty: "Medium",
    explanation: "WebSockets provide full-duplex, bidirectional, low-latency persistent TCP communication. It begins with an HTTP GET request containing headers `Upgrade: websocket` and `Connection: Upgrade`. The server responds with `HTTP/101 Switching Protocols`, transforming the socket into a binary/text framed WebSocket stream."
  },
  {
    id: 17,
    question: "What is BGP (Border Gateway Protocol) and what is BGP Hijacking?",
    category: "Network Layer & Routing",
    difficulty: "Hard",
    explanation: "BGP is the routing protocol of the global Internet that routes traffic between Autonomous Systems (AS networks/ISPs) based on path vector policies. **BGP Hijacking** occurs when a rogue AS announces ownership of IP address prefixes it does not own, causing global Internet routers to redirect legitimate traffic to the attacker."
  },
  {
    id: 18,
    question: "What is ICMP (Internet Control Message Protocol) and how do `ping` and `traceroute` work?",
    category: "Network Layer & Routing",
    difficulty: "Medium",
    explanation: "ICMP transmits network error and diagnostic messages. `ping` sends `ICMP Echo Request` and measures time until `ICMP Echo Reply`. `traceroute` sends packets with incrementing **TTL (Time-To-Live)** values (`TTL=1, 2, 3...`); each intermediate router decrements TTL, drops packet at TTL=0, and returns an `ICMP Time Exceeded` packet with its IP address."
  },
  {
    id: 19,
    question: "What is MTU (Maximum Transmission Unit) and IP Packet Fragmentation?",
    category: "Network Layer & Routing",
    difficulty: "Medium",
    explanation: "MTU is the largest size packet (in bytes) that can be transmitted over a network link without fragmentation (standard Ethernet MTU is **1500 bytes**). If a packet exceeds the link MTU and the `Don't Fragment (DF)` bit is not set, routers split the packet into smaller fragments, reassembled at the destination IP layer."
  },
  {
    id: 20,
    question: "What is Anycast Routing and how does it power Global CDNs and DNS?",
    category: "Network Layer & Routing",
    difficulty: "Hard",
    explanation: "Anycast assigns the **same IP address** to multiple physical servers distributed globally. BGP automatically routes client packets to the topologically closest server node on the Internet, providing automatic geo-load balancing, DDoS mitigation, and low latency for DNS (8.8.8.8) and CDNs (Cloudflare, Fastly)."
  },
  {
    id: 21,
    question: "What is the difference between Forward Proxy and Reverse Proxy?",
    category: "Web & DNS",
    difficulty: "Easy",
    explanation: "A **Forward Proxy** sits in front of *clients*, intercepting outbound requests to hide client IP, bypass firewalls, or enforce corporate web filters. A **Reverse Proxy** (Nginx, HAProxy) sits in front of *backend web servers*, intercepting inbound requests to handle SSL termination, caching, and load balancing across server instances."
  },
  {
    id: 22,
    question: "What is the difference between Layer 4 (L4) and Layer 7 (L7) Load Balancing?",
    category: "Web & DNS",
    difficulty: "Medium",
    explanation: "**Layer 4 (Transport)**: Routes packets based purely on IP address and TCP/UDP port without inspecting application payload (extremely fast, high throughput, zero content awareness). **Layer 7 (Application)**: Terminates TLS and inspects HTTP headers, cookies, and URL paths (`/api` vs `/static`), allowing intelligent path routing and cookie-based sticky sessions."
  },
  {
    id: 23,
    question: "What is SSH (Secure Shell) and how does Public Key Authentication work?",
    category: "Security & Encryption",
    difficulty: "Medium",
    explanation: "SSH is an encrypted network protocol for remote server administration (Port 22). In public key auth: client has private key, server stores public key in `~/.ssh/authorized_keys`. The server generates a random challenge, encrypts it with the public key; client decrypts with private key and sends signature back to prove identity without transmitting passwords."
  },
  {
    id: 24,
    question: "What is a Man-in-the-Middle (MitM) Attack and how do Digital Certificates / PKI prevent it?",
    category: "Security & Encryption",
    difficulty: "Medium",
    explanation: "An attacker intercepts and alters communications between client and server. Prevented by **Public Key Infrastructure (PKI)** and **Certificate Authorities (CAs)**: browsers have trusted root CA certificates that cryptographically verify the server's domain identity and public key signature in its X.509 SSL certificate."
  },
  {
    id: 25,
    question: "What is the difference between Unicast, Broadcast, Multicast, and Anycast?",
    category: "Network Layer & Routing",
    difficulty: "Easy",
    explanation: "**Unicast**: One-to-One transmission (single sender to single receiver). **Broadcast**: One-to-All transmission across the local subnet. **Multicast**: One-to-Many transmission to a registered group of interested receivers (video conferencing, IGMP). **Anycast**: One-to-Closest (routed to nearest single node sharing the IP)."
  },
  {
    id: 26,
    question: "What is the purpose of the `TIME_WAIT` state in TCP connection closing?",
    category: "Transport Layer",
    difficulty: "Hard",
    explanation: "When a socket initiates an active close, it stays in `TIME_WAIT` for 2MSL (Maximum Segment Lifetime, ~60s) to: 1) Ensure the final `ACK` is received by the remote server (resending ACK if the server retransmits `FIN`), and 2) Allow all lingering delayed duplicate packets from the connection to expire in the network before port reuse."
  },
  {
    id: 27,
    question: "What is the Nagle's Algorithm and `TCP_NODELAY` socket option?",
    category: "Transport Layer",
    difficulty: "Hard",
    explanation: "Nagle's algorithm bundles small outgoing packets together until a full TCP segment (MSS) is accumulated or an ACK for previous data arrives, reducing small packet header overhead on slow links. In real-time apps (multiplayer games, interactive SSH), developers disable it using `TCP_NODELAY` to send small packets immediately without delay."
  },
  {
    id: 28,
    question: "What is Silly Window Syndrome in TCP?",
    category: "Transport Layer",
    difficulty: "Hard",
    explanation: "Occurs when either the sender produces tiny chunks of data or the receiver's application consumes data slowly, advertising tiny 1-byte receive window updates. This causes high network overhead as 40 bytes of TCP/IP headers are transmitted for 1 byte of payload, solved by Clark's solution and delayed ACKs."
  },
  {
    id: 29,
    question: "What is a VPN (Virtual Private Network) and how do IPsec and WireGuard work?",
    category: "Security & Encryption",
    difficulty: "Medium",
    explanation: "A VPN creates an encrypted tunnel across a public network by encapsulating and encrypting original IP packets inside new outer IP packets (Tunnel Mode). **WireGuard** is a modern, high-speed VPN protocol using state-of-the-art cryptography (Noise protocol, Curve25519, ChaCha20-Poly1305) with fewer than 4,000 lines of code."
  },
  {
    id: 30,
    question: "What is DNS Over HTTPS (DoH) and DNS Over TLS (DoT)?",
    category: "Web & DNS",
    difficulty: "Medium",
    explanation: "Standard DNS sends plain-text queries over UDP port 53, allowing ISPs and eavesdroppers to spy on visited domain names. **DoT** (port 853) and **DoH** (port 443 over HTTPS) encrypt DNS queries with TLS, protecting user privacy and preventing DNS spoofing."
  },
  {
    id: 31,
    question: "What is a MAC Address vs an IP Address?",
    category: "Data Link Layer",
    difficulty: "Easy",
    explanation: "A **MAC Address** is a 48-bit physical hardware identifier burned into the Network Interface Card (NIC) for local subnet communication (Layer 2). An **IP Address** is a logical, hierarchical address assigned by network configuration for routing packets across global networks (Layer 3)."
  },
  {
    id: 32,
    question: "What is a Switch vs a Router vs a Hub?",
    category: "OSI & TCP/IP Models",
    difficulty: "Easy",
    explanation: "**Hub (Layer 1)**: Dumb repeater; broadcasts incoming bits to all connected ports (high collisions). **Switch (Layer 2)**: Maintains a MAC address table and forwards frames *only to the specific destination port*. **Router (Layer 3)**: Routes IP packets between *different networks and subnets* based on IP routing tables."
  },
  {
    id: 33,
    question: "What is VLAN (Virtual Local Area Network) and 802.1Q Tagging?",
    category: "Data Link Layer",
    difficulty: "Medium",
    explanation: "VLANs logically segment a single physical switch into multiple isolated broadcast domains for security and traffic management. **802.1Q tagging** inserts a 4-byte VLAN ID header into Ethernet frames across trunk links connecting switches."
  },
  {
    id: 34,
    question: "What is Spanning Tree Protocol (STP) in Layer 2 networks?",
    category: "Data Link Layer",
    difficulty: "Hard",
    explanation: "STP prevents **Broadcast Storms** and bridge loops in networks with redundant physical switch links by building a loop-free logical topology and selectively placing redundant switch ports into a blocking/standby state."
  },
  {
    id: 35,
    question: "What is the difference between Intra-domain Routing (OSPF/RIP) and Inter-domain Routing (BGP)?",
    category: "Network Layer & Routing",
    difficulty: "Hard",
    explanation: "**Intra-domain (IGP)**: Operates *within* a single autonomous system (OSPF uses Dijkstra link-state; RIP uses distance-vector hop counts). **Inter-domain (EGP)**: Operates *between* independent autonomous systems globally (BGP uses path-vector policy routing)."
  },
  {
    id: 36,
    question: "What is HTTP Keep-Alive (Persistent Connections)?",
    category: "Application Layer Protocols",
    difficulty: "Easy",
    explanation: "`Connection: keep-alive` allows a single underlying TCP connection to be reused for multiple subsequent HTTP requests/responses, avoiding the latency and CPU overhead of repeated 3-way TCP handshakes."
  },
  {
    id: 37,
    question: "What is CDN (Content Delivery Network) and Edge Caching?",
    category: "Web & DNS",
    difficulty: "Easy",
    explanation: "A geographically distributed network of proxy servers (Edge Points of Presence - PoPs) that cache static assets (images, CSS, JS, videos) close to end-users, drastically reducing origin server load and reducing Time-to-First-Byte (TTFB) latency."
  },
  {
    id: 38,
    question: "What is SSL/TLS Certificate Revocation (CRL vs OCSP vs OCSP Stapling)?",
    category: "Security & Encryption",
    difficulty: "Hard",
    explanation: "**CRL**: Download entire list of revoked certificates from CA (slow, bandwidth heavy). **OCSP**: Browser queries CA server in real-time for certificate validity (slows down initial page load and leaks browsing history to CA). **OCSP Stapling**: The web server queries the CA periodically and 'staples' a timestamped, CA-signed OCSP response directly to its TLS handshake."
  },
  {
    id: 39,
    question: "What is NAT Traversal (STUN, TURN, ICE) in WebRTC?",
    category: "Application Layer Protocols",
    difficulty: "Hard",
    explanation: "Used to establish peer-to-peer audio/video connections through NATs and firewalls: **STUN** discovers the public IP/port of a peer. If symmetric NAT blocks direct P2P, **TURN** acts as a relay server forwarding media packets. **ICE** orchestrates the best candidate connection."
  },
  {
    id: 40,
    question: "What is DNSSEC (DNS Security Extensions)?",
    category: "Web & DNS",
    difficulty: "Hard",
    explanation: "DNSSEC adds cryptographic digital signatures to DNS records (`RRSIG`, `DNSKEY`), creating a chain of trust back to the Root zone that allows DNS resolvers to verify that query responses have not been forged or poisoned in transit."
  },
  {
    id: 41,
    question: "What is the difference between TCP SYN Cookie and SYN Cache?",
    category: "Transport Layer",
    difficulty: "Hard",
    explanation: "Both defend against SYN Floods: **SYN Cache** uses a bounded global hash table with minimized state entries per connection. **SYN Cookie** is completely stateless on the server: it hashes client IP/port and timestamp into the initial 32-bit TCP Sequence number, requiring zero server memory allocation until the client's final ACK arrives."
  },
  {
    id: 42,
    question: "What is TCP Selective Acknowledgement (SACK)?",
    category: "Transport Layer",
    difficulty: "Medium",
    explanation: "Standard TCP cumulative ACK only reports the contiguous bytes received; if one packet in a window drops, the sender must retransmit all subsequent packets. **SACK** enables the receiver to report non-contiguous packet blocks received, allowing the sender to retransmit *only the specific missing packets*."
  },
  {
    id: 43,
    question: "What is Port Forwarding in NAT routers?",
    category: "Network Layer & Routing",
    difficulty: "Easy",
    explanation: "Configures a router's NAT table to redirect all incoming external traffic arriving on a specific public port (e.g. port 80) to a designated private local IP address and port inside the local network."
  },
  {
    id: 44,
    question: "What is the difference between Half-Duplex and Full-Duplex communication?",
    category: "Physical & Data Link",
    difficulty: "Easy",
    explanation: "**Half-Duplex**: Data can transmit in both directions, but *only one direction at a time* (walkie-talkie, legacy shared hubs using CSMA/CD). **Full-Duplex**: Data can transmit in *both directions simultaneously* (modern switched Ethernet, telephones)."
  },
  {
    id: 45,
    question: "What is CSMA/CD vs CSMA/CA?",
    category: "Data Link Layer",
    difficulty: "Medium",
    explanation: "**CSMA/CD (Carrier Sense Multiple Access with Collision Detection)**: Used in wired Ethernet; listens before sending, detects collisions during transmission, aborts and backs off with exponential delay. **CSMA/CA (Collision Avoidance)**: Used in wireless Wi-Fi (802.11) where collision detection is physically impossible; reserves channel using RTS/CTS frames before sending."
  },
  {
    id: 46,
    question: "What is the difference between In-Band and Out-of-Band Network Management?",
    category: "OSI & TCP/IP Models",
    difficulty: "Medium",
    explanation: "**In-Band**: Network management and control traffic (SSH, SNMP) travels over the same primary production network channels as user data. **Out-of-Band (OOB)**: Management traffic travels over a dedicated, physically isolated management network or serial console (IPMI/iLO), ensuring access even during network outages."
  },
  {
    id: 47,
    question: "What is ALPN (Application-Layer Protocol Negotiation) in TLS?",
    category: "Security & Encryption",
    difficulty: "Hard",
    explanation: "A TLS extension where the client and server negotiate which application protocol to use (e.g. `h2` for HTTP/2 vs `http/1.1`) inside the initial TLS handshake, eliminating extra roundtrips before starting application traffic."
  },
  {
    id: 48,
    question: "What is TCP Fast Open (TFO)?",
    category: "Transport Layer",
    difficulty: "Hard",
    explanation: "Allows data to be enclosed directly within the initial TCP `SYN` packet for clients that previously connected to the server, authenticating via a cryptographic TFO cookie to eliminate the 1-RTT handshake delay on repeat connections."
  },
  {
    id: 49,
    question: "What is the difference between Latency, Bandwidth, and Throughput?",
    category: "Transport Layer",
    difficulty: "Easy",
    explanation: "**Bandwidth**: Maximum theoretical data transfer capacity of the link (e.g., 1 Gbps pipe size). **Throughput**: Actual rate of successful data delivered end-to-end per second. **Latency**: Time delay required for a single packet to travel from source to destination (RTT ping time)."
  },
  {
    id: 50,
    question: "What is Zero-Copy networking in operating system sockets (`sendfile()` system call)?",
    category: "Transport Layer",
    difficulty: "Hard",
    explanation: "Standard socket transfers copy data: `Disk -> OS Buffer -> User RAM -> Socket Buffer -> NIC`. **Zero-Copy (`sendfile`)** transfers data directly from the OS page cache to the Network Interface Card (NIC) buffer via DMA (Direct Memory Access), bypassing CPU memory copies and context switches for high-performance web servers (Nginx, Kafka)."
  }
];
