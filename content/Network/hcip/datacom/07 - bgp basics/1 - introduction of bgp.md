
- [[#AS|AS]]
- [[#BGP|BGP]]
- [[#BGP Peer Relationship|BGP Peer Relationship]]
- [[#BGP Message Types|BGP Message Types]]
- [[#BGP Message Format|BGP Message Format]]
	- [[#Header Format|Header Format]]
	- [[#Open|Open]]
	- [[#Update|Update]]
	- [[#Notification|Notification]]
	- [[#Keepalive|Keepalive]]
	- [[#Route-refresh|Route-refresh]]
- [[#BGP State Machine|BGP State Machine]]
- [[#Advertisement Rule|Advertisement Rule]]


## AS

An AS is a collection of devices that are managed by the same organization and use the same route selection policy.

In 16-bit format, AS numbers 64512-65534 are private ones. 
In 32-bit format, AS numbers 4200000000-4294967294 are private ones.

## BGP

BGP is a **path vector protocol** that allows devices between ASs to communicate and selects optimal routes. 

BGP-1 (defined in RFC 1105), BGP-2 (defined in RFC 1163), and BGP-3 (defined in RFC 1267) are three earlier versions of BGP. **BGP-4** (defined in RFC 1771) has been used since 1994. Since 2006, unicast IPv4 networks have been using BGP-4 defined in RFC 4271, and other networks (such as IPv6 networks) have been using Multiprotocol BGP (MP- BGP) defined in RFC 4760.

BGP has the following characteristics:
- BGP uses TCP (port 179) as the transport layer protocol and triggers route updates instead of periodic route updates.
- BGP transmits **only routing information**, but does not expose topology information in an AS.
- BGP can carry a large amount of routing information and support large-scale networks.
- BGP provides various routing policies to flexibly select routes and instruct peers to advertise routes based on routing policies
- BGP supports MPLS/VPN applications and transmits VPN routes.
- BGP offers route summarization and route dampening functions to prevent route flapping, enhancing network stability.

![[Pasted image 20260415163744.png]]

Each BGP route carries multiple path attributes. Different from IS-IS and OSPF that use costs to select paths, BGP selects paths based on **path attributes**. Therefore, BGP is easy to operate and allows you to select the most appropriate path control mode in different scenarios.

## BGP Peer Relationship

Different from OSPF and IS-IS, BGP sessions are established based on TCP. The two routers that establish a BGP peer relationship do not need to be directly connected.

BGP has two types of peer relationships:
- **External BGP (EBGP)**: BGP peer relationship between BGP routers in different ASs To establish an EBGP peer relationship between two routers.
- **Internal BGP (IBGP)**: BGP peer relationship between BGP routers in the same AS.

![[Pasted image 20260415164016.png]]

## BGP Message Types

![[Pasted image 20260415164131.png]]

There are **5 types of BGP messages.** Different types of messages have the same header.

| Name          | Function                                                                                                                                                             | Usage Scenario                                                                                                                                                                           |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Open          | Negotiate BGP peer parameters and establish peer relationships.                                                                                                      | After a BGP TCP connection is established, Open messages are sent.                                                                                                                       |
| Update        | Send BGP route update.                                                                                                                                               | After a BGP peer relationship is established and routes need to be sent or routes change, Update messages are sent.                                                                      |
| Notification  | Report error information and terminate the peer relationship.                                                                                                        | When detecting an error during BGP running, the local BGP router sends a Notification message to notify the peer of the error.                                                           |
| Keepalive     | Indicate that the peer relationship is established and the BGP peer relationship is maintained.                                                                      | After receiving a Keepalive message from the peer, the BGP router sets the peer relationship status to Established and periodically sends Keepalive messages to maintain the connection. |
| Route-refresh | Request the peer to retransmit routes if routing policies are changed. Only the BGP devices supporting route-refresh can send and respond to Route-refresh messages. | When the routing policy changes, Route-refresh messages are sent to trigger the peer to re-advertise routes.                                                                             |

## BGP Message Format

### Header Format

- **Marker**: is used to check whether synchronization information of BGP peers is complete and for BGP authentication. It has 16 bytes. If authentication is not used, all bits are set to 1 (all FFs in hexadecimal notation).
- **Length**: indicates the total length of a BGP message (including the packet header), in bytes. It has 2 bytes.
- **Type**: indicates the type of BGP messages. It has 1 byte. The value ranges from 1 to 5, indicating Open, Update, Notification, Keepalive, and Route-refresh messages.
![[Pasted image 20260415171004.png]]

### Open

The Open message is the **first** message sent after a TCP connection is established. It is used to establish a connection between BGP peers.
![[Pasted image 20260415171056.png]]

- **Version**: indicates the BGP version number. For BGPv4, the value is 4.
- **My AS**: indicates the local AS number. By comparing AS numbers of the two ends, you can determine whether the peer end and the local end are in the same AS.
- **Hold Time**: indicates the holding time. BGP peers need to negotiate the holding time and keep it consistent when establishing a peer relationship. If a router does not receive any Keepalive or Update message from its peer within the holding time, the BGP connection is considered as disconnected.
- **BGP Identifier**: indicates the router ID of a BGP router. The field is in IP address format and identifies a BGP router.

### Update

Update messages are used to transmit routing information between peers. Update messages can be used to advertise and withdraw routes.

An Update message can advertise a type of routes with the same path attributes, which are placed in Network Layer Reachability Information (NLRI) fields. In addition, the Update message can carry multiple unreachable routes, which are stored in the Withdrawn Routes field.

![[Pasted image 20260415171317.png]]

- **Withdrawn routes**: indicates the list of unreachable routes.
- **Path attributes**: indicates the list of all path attributes related to NLRI. Each path attribute consists of a Type-Length-Value (TLV).
- **NLRI**: indicates the prefix and prefix length of a reachable route.

###  Notification

When BGP detects an error (may occur during or after the establishment of a peer relationship), BGP sends a **Notification** message to the peer to notify the peer of the error cause. Then the BGP connection is interrupted immediately.
![[Pasted image 20260415171503.png]]

- **Error Code and Error Subcode**: are used to notify the peer of the specific error type.
- **Data**: is used to describe the detailed error content. The length is variable.

### Keepalive

After receiving a Keepalive message from the peer, the BGP router sets the peer relationship status to **Established** and periodically sends **Keepalive** messages to maintain the connection.
The Keepalive message **only** contains the packet header without any other fields.

### Route-refresh

**Route-refresh** messages are used to request the peer to resend routing information of a specified address family. In most cases, after the local end modifies a routing policy, the peer sends Update messages again. Then the local end recalculates BGP routes according to the new routing policy.
![[Pasted image 20260415171706.png]]

- Address Family Identifier (AFI): identifies an address family, for example, IPv4.
- Res.: is reserved. The 8 bits must be set to 0. 
- Subsequent Address Family Identifier (SAFI): indicates the sub-address family identifier.
## BGP State Machine

| Peer Status | Usage                                                                                                                                                                                                                                      |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Idle        | Prepare TCP connections and monitor remote peers. When enabling BGP, prepare sufficient resources.                                                                                                                                         |
| Connect     | A TCP connection is being set up. Authentication is completed during the TCP connection setup. If the TCP connection fails to be established, the local end enters the Active state and attempts to establish a TCP connection repeatedly. |
| Active      | The TCP connection fails to be set up and the local end attempts to establish a TCP connection repeatedly.                                                                                                                                 |
| OpenSent    | After the TCP connection is established, the local end sends an Open packet carrying parameters to negotiate the establishment of the peer.                                                                                                |
| OpenConfirm | After the parameter and capability negotiation succeeds, the local end sends a Keepalive message and waits for the Keepalive message from the peer end.                                                                                    |
| Established | The local end has received the Keepalive message from the peer. The capabilities of the two ends are the same after negotiation. The local end starts to use the Update message to advertise routing information.                          |

![[Pasted image 20260415172006.png]]

## Advertisement Rule

After BGP generates BGP routes using the **network**, **import-route**, or **aggregate** command, **BGP sends Update messages** carrying the BGP routes to the peer.

BGP routes are advertised according to the following rules:
- Only the optimal and valid routes (that is, **the next-hop address is reachable**) are advertised.
- The routes obtained from EBGP peers are **advertised** to all BGP peers.
- **IBGP split horizon**: The routes obtained from IBGP peers are not advertised to IBGP peers.
- When a router learns a BGP route (IBGP route) from its IBGP peer, the router **cannot** use this route or advertise this route to its EBGP peer unless the router learns this route from an IGP. In this situation, IBGP routes and IGP routes need to be **synchronized**. Route synchronization is used to prevent BGP routing blackholes.
