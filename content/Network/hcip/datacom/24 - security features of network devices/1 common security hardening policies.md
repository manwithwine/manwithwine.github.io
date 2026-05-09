## Basic

**Common security hardening policies on network devices include the following:**
- Disabling unused services and ports
- Discarding insecure access channels 
- Access control based on trusted paths 
- Local attack defense 

![[Pasted image 20260428135205.png]]

## SSH Protocol Structure
![[Pasted image 20260428135301.png]]
SSH uses the following types of algorithms:
- MAC algorithms for data integrity protection, such as HMAC-MD5 and HMAC-MD5-96
- Data encryption algorithms, such as 3DES-CBC, AES128-CBC, and DES-CBC
- Key exchange algorithm used to generate session keys, such as diffle- hellman-group-exchange-sha1
- Host public key algorithm used for digital signature and authentication, such as RSA and DSA

## URPF

Unicast Reverse Path Forwarding (URPF) can be classified into strict URPF and loose URPF, and the mode in which matching the default route is allowed can be configured. During the URPF check, the device checks whether source IP addresses of packets are valid based on the routing table.

---
### Strict Mode

If a packet matches a specific route and the inbound interface of the packet is the same as the outbound interface of the route, the packet is allowed to pass. Otherwise, the packet is discarded.

### Loose Mode

if a packet matches a specific route, the packet is allowed to pass. Otherwise, the packet is discarded. In this mode, the interface is not checked. By default, the device does not match packets with the default route. You can configure the device to match packets with the default route.

---

Matching the default route must work with strict URPF. When a packet matches a specific route or the default route and the inbound interface of the packet is the same as the outbound interface of the matched route, the packet is allowed to pass. Otherwise, the packet is discarded. Matching the default route cannot be configured with loose URPF because attack defense cannot be achieved in this way. Loose URPF and strict URPF are mutually exclusive.


## CPU Attack Defense

Network devices employ four-level security mechanisms to protect their security:
- **Level 1:** filter invalid packets sent to the CPU by using blacklists. 
- **Level 2:** Use Control Plane Committed Access Rate (CPCAR) to rate-limit the packets sent to the CPU based on the protocol type, preventing excess packets of a protocol from being sent to the CPU.
- **Level 3:** schedule packets sent to the CPU based on the protocol priority to ensure that packets with higher protocol priorities are preferentially processed. 
- **Level 4:** uniformly rate-limit all packets sent to the CPU and randomly discard the excess packets to ensure CPU security.

Command examples:
![[Pasted image 20260428140223.png]]

![[Pasted image 20260428140231.png]]

