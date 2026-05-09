
## MPLS Overview

![[Pasted image 20260416163239.png]]

Multiprotocol Label Switching (MPLS) is located between the data link layer and the network layer in the TCP/IP protocol stack. 
An MPLS header is added between the two layers. Packets are forwarded based on the MPLS header. The MPLS header is also called the MPLS label.

MPLS replaces IP forwarding with label switching to implement label-based rapid forwarding.

## Traditional L2VPN

Virtual private LAN service (VPLS) is an Ethernet-based L2VPN technology. VPLS provides services similar to LAN services on an MPLS network and allows users to access the network from different locations.

Traditional L2VPN services, such as VPLS, provide Layer 2 connections between remote sites. An L2VPN network is built and functions like a Layer 2 switch to transparently transmit Ethernet packets. 

n a traditional L2VPN, remote MAC addresses are learned through ARP broadcast flooding, and therefore, PEs need to carry broadcast traffic. Broadcast consumes a large amount of interface bandwidth, which is a **typical issue of traditional L2VPN**.

VPLS **does not** support all-active access or load balancing and implements slow fault convergence.

## EVPN

EVPN was first defined in [RFC 7432](https://datatracker.ietf.org/doc/rfc7432/). 
EVPN introduces the control plane to better control MAC address learning.

EVPN uses MP-BGP on the control plane and supports MPLS label switched paths (LSPs) or IP/Generic Routing Encapsulation (GRE) tunneling on the data plane.

![[Pasted image 20260416164058.png]]


## Advantages of EVPN

EVPN introduces the control plane to learn MAC and IP addresses to guide data forwarding, implementing forwarding-control separation. 

EVPN resolves typical problems in traditional L2VPNs and offers more benefits, such as **active-active, rapid convergence, and simplified O&M.**
![[Pasted image 20260416163921.png]]

## EVPN NLRI
![[Pasted image 20260416163947.png]]

EVPN NLRI is a new extension to MP-BGP. It is included in MP_REACH_NLRI. For the EVPN NLRI, the AFI is 25 and the SAFI is 70.

EVPN Route Types - [[evpn route types]]

![[Pasted image 20260416164041.png]]

EVPN can be widely used in all enterprise scenarios, such as SD-WAN, campus networks, data centers, and WANs. In data centers and campus networks, EVPN and VXLAN are used together to construct a service overlay network. In SD-WAN scenarios, EVPN and IPsec are used together to build enterprise branch interconnection networks. On a WAN, EVPN can be used with various underlying tunneling and label technologies, such as MPLS, Segment Routing (SR), VPLS, and virtual private wire service (VPWS).
![[Pasted image 20260416164820.png]]
DC:
![[Pasted image 20260416164844.png|DC]]
Campus:
![[Pasted image 20260416164941.png]]
SD-WAN:
![[Pasted image 20260416164959.png]]
