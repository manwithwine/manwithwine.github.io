## IPsec
### IPsec Overview

IPsec VPN is usually deployed between egress devices of an enterprise. Through encryption and authentication, IPsec VPN implements various functions, such as data origin authentication data encryption, data integrity protection, and anti-replay
![[Pasted image 20260429124109.png]]

IPsec uses two security protocols, **AH** and **ESP**, to transmit and encapsulate data and provide security services, such as authentication and encryption.

- The security functions provided by AH and ESP depend on the authentication and encryption algorithms used by these protocols.
- AH supports only authentication but not encryption. ESP supports both authentication and encryption.
- Keys are required by the security protocol that provides security services, such as authentication or encryption.

There are **two** key exchange modes:
- **Out-of-band shared key**: Static encryption and verification key are manually configured on the transmit and receive devices. Both parties maintain key consistency through out-of-band sharing (for example, by phone or email). The disadvantages of this mode are that poor scalability is provided and that the workload of configuring keys on a P2MP network doubles. In addition, this mode makes it difficult to change keys periodically to improve network security.
- **Automatic key negotiation through IKE**: IKE is built based on the framework defined by the Internet security association (SA) and the key management protocol ISAKMP. IKE uses the DH algorithm to securely distribute keys on insecure networks. This mode is easy to configure and has good scalability, especially on large-scale dynamic networks. In addition, both communication parties exchange key exchange materials to calculate the shared key. Even if a third party intercepts all exchanged data used to calculate the key, the real key cannot be calculated.

### IPsec Principles
![[Pasted image 20260429154735.png]]

**An SA** is uniquely identified by a triplet, which consists of a security parameter index (SPI), destination IP address, and security protocol ID (AH or ESP). The SPI is a 32-bit value generated to uniquely identify an SA, and is transmitted in an AH header and an ESP header. When manually configuring the SA, you have to manually specify the SPI value. When the SA is generated through IKE negotiation, the SPI is randomly generated.

An SA is a unidirectional logical connection. Therefore, at least two SAs must be established to protect data flows in opposite directions.

IKEv1 negotiation **phase 1** is to establish an IKE SA. After an IKE SA is established, all ISAKMP messages exchanged between IKE peers are encrypted and authenticated. This secure tunnel ensures that IKEv1 negotiation in phase 2 can be performed securely. An IKE SA is a bidirectional logical connection. Only one IKE SA is established between two IPsec peers.

IKEv1 negotiation **phase 2** is to establish an IPsec SA for secure data transmission and derive a key for data transmission. In this phase, the key generated in phase 1 of IKEv1 negotiation is used to authenticate the integrity and identity of ISAKMP messages and encrypt these messages, securing the message exchange.

Successful IKE negotiation indicates that a bidirectional IPsec tunnel has been established. You can define an IPsec interested flow using an ACL or an IPsec profile. All data that matches the characteristics of the interested flow is forwarded to the IPsec tunnel for processing.

*Interested flows: data flows that need to be protected by IPsec.*

detailed -> [[ipsec]]

## GRE

### Basic

**GRE** is a Layer 3 VPN encapsulation technology. GRE encapsulates packets of certain network layer protocols, such as Internetwork Packet Exchange (IPX), IPv4, and IPv6, so that the encapsulated packets can be transmitted over another network, for example, an IPv4 network. This solves the problem of packet transmission over heterogeneous networks

![[Pasted image 20260429155034.png]]

**GRE** can also encapsulate multicast packets. Dynamic routing protocols use multicast packets. Therefore, **GRE** is often used in scenarios where multicast routing data needs to be transmitted. This is where GRE's name comes from.

### GRE Principles

GRE consists of three parts: passenger protocol, encapsulation protocol, and transport protocol. 
- A passenger protocol refers to an original network protocol for data transmission.
- An encapsulation protocol encapsulates the packets of the passenger protocol so that the original packets can be transmitted on the new network.
- A transport protocol transmits an encapsulated packet on the new network.

## GRE over IPsec

GRE does not support encryption or authentication, and GRE data transmission cannot be secured.

The major disadvantage of IPsec is that it supports only the IP protocols and does not support multicast.

![[Pasted image 20260430125106.png]]

## L2TP Overview

### Basics

**L2TP** is a virtual private dial-up network (**VPDN**) tunneling protocol that extends point-to-point (P2P) applications. L2TP provides access services for employees on business trips or enterprise branches to remotely access intranet resources

An L2TP network consists of L2TP access concentrators (**LACs**) and L2TP network servers (**LNSs**).
![[Pasted image 20260430125205.png]]

An **LAC** is a device that can process PPP and L2TP packets. The LAC establishes an L2TP tunnel with the LNS. The types of devices function as the LAC vary according to the networking environment. For instance, a gateway or terminal can function as the LAC. The LAC can initiate the establishment of multiple L2TP tunnels to isolate data flows.

The **LNS** is the peer of the LAC, and an L2TP tunnel is established between them. The LNS is located on the border between the private and public networks of the enterprise headquarters and is usually the gateway of the enterprise headquarters.


### Messages

The L2TP protocol uses two types of messages: control and data messages, which are transmitted between the LAC and LNS. 
- Control messages are used to establish, maintain, and tear down L2TP tunnels and session connections. 
- Data messages are used to encapsulate PPP data frames and are transmitted over tunnels.
![[Pasted image 20260430125430.png]]

### Working Process
![[Pasted image 20260430125506.png]]

## L2TP over IPsec

## MPLS VPN
[[mpls]]
