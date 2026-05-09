## Basic rules for establishing an IS-IS neighbor relationship

- Only neighboring routers of the same level can set up the neighbor relationship with each other.
- Level-1 routers must have the same area IDs. 
- Network types of IS-IS interfaces on both ends of a link must be consistent.
- IP addresses of IS-IS interfaces on both ends of a link must be on the same network segment by default.

The establishment of IS- IS neighbor relationships is not related to IP addresses.

## IIH

**IIHs** are used to set up and maintain neighbor relationships. Among them,

**Level-1 LAN IIHs** apply to the Level-1 routers on broadcast LANs; 
**Level-2 LAN IIHs** apply to the Level-2 routers on broadcast LANs; 
**P2P IIHs** apply to non-broadcast networks

Level-1:
![[Pasted image 20260415153515.png]]

P2P:
![[Pasted image 20260415154050.png]]


## DIS and Pseudonode

In a broadcast network, IS-IS needs to elect a **DIS** from all the routers

**DISs** are used to create and update pseudonodes and generate LSPs of pseudonodes to describe available network devices. 
**The pseudonode** is used to simulate a virtual node on the broadcast network and is not an actual router. In IS-IS, a pseudonode is identified by the system ID of the DIS and Circuit ID (its value is not 0).

![[Pasted image 20260415153632.png]]


*для себя*
![[Pasted image 20260417125203.png]]
**Псевдоузел — это не замена DIS, это продукт работы DIS. Это функция, а не дублер.**

![[Pasted image 20260417125423.png]]

## DIS in IS-IS and DR in OSPF

Level-1 and Level-2 DISs are elected separately. You can configure different priorities for DISs of different levels. 

DIS election rules are as follows:
- The router with **the highest priority** is elected as the DIS.
- If there are multiple routers with the same highest priority on a broadcast network, the one with **the highest MAC** address is chosen.

The interval for the DIS to send IIHs is one third of the interval for a common router. This ensures that the faulty DIS can be quickly discovered.

DIS election in IS-IS differs from designated router (DR) election in OSPF:
- On an IS-IS broadcast network, the router with **priority 0** also **takes part** in DIS election. In OSPF, the router with priority 0 **does not take part** in DR election.
- In IS-IS, when a new router that is qualified for being a DIS connects to a broadcast network, the router **is elected as the new DIS** and the previous pseudonode is deleted. This causes a new flooding of LSPs. In OSPF, when a new router connects to a network, **it is not** immediately elected as the DR even if it has the highest DR priority.
- On an IS-IS broadcast network, **routers (including non-DIS routers)** of the same level on a network segment set up neighbor relationships. In OSPF, routers set up neighbor relationships **with only the DR and backup designated router (BDR).** 

## LSP

LSPs are used to **exchange link state information.** 

There are two types of LSPs: Level-1 and Level-2 LSPs. A Level-1 router transmits Level-1 LSPs; a Level-2 router transmits Level-2 LSPs; and a Level-1-2 router can transmit both Level-1 and Level-2 LSPs.

Level-1 and Level-2 LSPs have the same format.
![[Pasted image 20260415154205.png]]

## CSNP

A CSNP contains **the summary of all LSPs in the LSDB of a router**. The router determines whether to synchronize its LSDB by exchanging CSNPs.
- On a **broadcast network**, CSNPs are sent by a DIS periodically (at a default interval of 10 seconds). 
- On a **P2P** link, CSNPs are sent only during initial establishment of a neighbor relationship.
![[Pasted image 20260415154742.png]]

## PSNP

Unlike a CSNP, a PSNP contains only the summary of some LSPs.
- When the LSDB is not synchronized, the PSNP is used to request the neighbor to send a new LSP.
- On a P2P network, when an LSP is received, a PSNP is used to acknowledge the received LSP.

![[Pasted image 20260415154830.png]]

## LSP Synchronization on a Broadcast Network

![[Pasted image 20260415155034.png]]

## LSP Synchronization on a P2P Network

![[Pasted image 20260415155048.png]]


All routers in the IS-IS routing domain can generate LSPs. The following events trigger the generation of a new LSP: 
- The neighbor is Up or Down. 
- The related interface goes Up or Down.
- The imported IP routes change. 
- Inter-area IP routes change.
- The interface is assigned a new metric value. 
- LSPs are updated periodically (update interval: 15 minutes).

## IS-IS Authentication Types

Based on the types of packets, authentication is classified as follows:
- **Interface authentication**: is configured in the interface view to authenticate Level-1 and Level-2 IS-to-IS Hello PDUs (IIHs).
- **Area authentication**: is configured in the IS-IS process view to authenticate Level-1 CSNPs, PSNPs, and LSPs.
- **Routing domain authentication**: is configured in the IS-IS process view to authenticate Level-2 CSNPS, PSNPs, and LSPs.

Based on the authentication modes of packets, authentication is classified into the following types:
- **Cleartext authentication**: is a simple authentication mode in which passwords are directly added to packets. This mode provides the lowest password security among all the authentication modes listed here.
- **MD5 authentication**: uses the MD5 algorithm to encrypt a password before adding the password to the packet, which improves password security.
- **Keychain authentication**: further improves network security with configurable key chain that changes with time.
- **HMAC-SHA256 authentication**: uses the HMAC-SHA256 algorithm to encrypt a password before adding the password to the packet, which improves password security. 

