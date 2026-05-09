- [[#BGP-4 Extensions|BGP-4 Extensions]]
	- [[#MP_REACH_NLRI|MP_REACH_NLRI]]
	- [[#MP_UNREACH_NLRI|MP_UNREACH_NLRI]]


# MP-BGP

As defined in RFC 4760 [RFC 4760](https://datatracker.ietf.org/doc/rfc4760/), MP-BGP is used to extend BGP-4 to allow BGP to carry multiple network layer protocols, such as IPv6, L3VPN, and EVPN. This extension has good backward compatibility. That is, an MP-BGP-capable router can interact with a router that supports only BGP-4.

![[Pasted image 20260416152635.png]]

## BGP-4 Extensions

BGP-4 has three IPv4-specific pieces of information: NEXT_HOP, AGGREGATOR, and IPv4 network layer reachable information (NLRI). To support multiple network layer protocols, BGP-4 has to provide the following abilities:
- Ability of associating network layer protocols with next-hop information
- Ability of associating network layer protocols with NLRIs

MP-BGP adds two new attributes: **MP_REACH_NLRI** and **MP_UNREACH_NLRI**, which are used to indicate reachable and unreachable destinations, respectively. The two attributes are optional non-transitive.

![[Pasted image 20260416160119.png]]

Dump view:
![[Pasted image 20260416160213.png]]

### MP_REACH_NLRI

MP_REACH_NLRI is carried in a BGP Update message and provides the following functions:
- Advertises reachable routes to BGP peers.
- Advertises the next-hop address of a reachable route to a BGP peer.

![[Pasted image 20260416160510.png]]

### MP_UNREACH_NLRI

MP_UNREACH_NLRI is carried in BGP Update messages to withdraw unreachable routes.

![[Pasted image 20260416160552.png]]


