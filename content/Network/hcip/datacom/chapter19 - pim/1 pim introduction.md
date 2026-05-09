- [[#Multicast Protocol Review|Multicast Protocol Review]]
- [[#Basics of PIM|Basics of PIM]]
	- [[#PIM Modes|PIM Modes]]

## Multicast Protocol Review

IGMP runs on the receiver end network and is used to inform the multicast network of the locations of group members and the multicast groups that the members join.

Protocols working on the multicast forwarding network include PIM, MSDP, and MBGP.
- **PIM** is mainly used to generate MDTs in an AS.
- **MSDP** is mainly used to help generate **inter**-AS MDTs.
- **MBGP** is used to help perform RPF check on **inter**-AS multicast traffic.

## Basics of PIM

**PIM** is a multicast routing solution that performs a reverse path forwarding (RPF) check on multicast packets based on the unicast routing table, creates multicast routing entries if multicast packets pass the RPF check, and forwards the multicast packets using multicast routing entries. PIM is termed protocol-independent because it is not dependent on any particular unicast routing protocol for topology discovery.

### PIM Modes
1. PIM-Dense Mode (**PIM-DM**)
2. PIM-Sparse Mode (**PIM-SM**):
	1. PIM-SM (**ASM**): sets up an MDT for any-source multicast (ASM).
	2. PIM-SM (**SSM**): sets up an MDT for source-specific multicast (SSM). 

The **PIM-DM** mode is mainly used on a multicast network with a small number of densely distributed group members. The basic idea of establishing an MDT in this mode is "flooding-prune". That is, multicast traffic is flooded **on the entire network**, and then the paths without group members are pruned to form an MDT. 

The **PIM-SM** mode is mainly used on a multicast network with a large number of sparsely distributed group members. To establish an MDT in this mode, information about group members needs to be collected first. The PIM-SM mode **does not flood** multicast packets on **the entire network** and has little impact on the live network. Therefore, the PIM-SM mode is usually used on the live network. 

## Classification of MDTs

An MDT with the multicast source as the root and group members as leaves is referred to as a shortest path tree (**SPT**). SPTs are used in both PIM-DM and PIM-SM.
![[Pasted image 20260422123516.png]]

An MDT with a **rendezvous point (RP)** as the root and group members as leaves is referred to as an **RPT**. RPTs are used in PIM- SM.![[Pasted image 20260422123634.png]]

## PIM Routing Entries

There are two types of routing entries on a PIM network:
1. (S, G) routing entries are mainly used to establish SPTs on a PIM-DM or PIM-SM network.
2. (\*, G) routing entries are mainly used to establish RPTs on a PIM-SM network.

	S indicates a specific multicast source, G indicates a specific multicast group, and * indicates any multicast source.
	
	If a matching (S, G) entry exists, the router forwards the packet according to the (S, G) entry.
	
	If no matching (S, G) entry exists but a matching (\*, G) entry exists, the router creates an (S, G) entry based on the (\*, G) entry, and forwards the packet according to the (S, G) entry.


The Flag field in the PIM routing table is described as follows:
![[Pasted image 20260422131227.png]]

```
Multicast routing entries can be generated only based on PIM (S, G) routing entries. PIM (*, G) entries do not contain inbound interface information, and as a result, no multicast routing entries can be generated accordingly.
```

