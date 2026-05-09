- [[#Basic|Basic]]
- [[#Routing Loop Prevention in RR Scenarios|Routing Loop Prevention in RR Scenarios]]
	- [[#Originator ID|Originator ID]]
	- [[#Cluster List|Cluster List]]

## Basic

An RR reflects learned routes so that IBGP routes are advertised within an AS without establishing full-mesh IBGP connections.

When an RR receives BGP routes:

- If the RR learns an IBGP route from a non-client peer, the RR reflects the route **to all clients.**
- If the RR learns an IBGP route from its client, the RR reflects the route to **all non-clients and all clients except the client that sends the IBGP route.**
- If a route is learned from an EBGP peer, the route is advertised to **all clients and non- client IBGP peers.** 
- An RR reflects only the **optimal** BGP routes that it uses.

![[Pasted image 20260416143559.png]]
![[Pasted image 20260416143609.png]]

- "Sending" refers to traditional BGP route transmission (scenario where the RR does not exist).
- "Reflection" refers to route transmission performed by an RR in compliance with route reflection rules. The RR inserts special path attributes into the reflected routes.

When reflecting routes, the RR **does not modify** the following BGP path attributes: **Next_Hop, AS_Path, Local_Preference, and MED**!!!! 
If the RR modifies these attributes, routing loops may occur.

## Routing Loop Prevention in RR Scenarios

RR deployment breaks the split horizon rule, which may cause routing loops. To prevent routing loops, the RR adds two special path attributes to BGP routes:
- Originator_ID
- Cluster_List

### Originator ID

![[Pasted image 20260416145510.png]]

When reflecting a BGP route, an RR adds the **Originator_ID** attribute to the reflected route. The Originator_ID attribute value is the router ID of the BGP router that advertises the route in the local AS.

If multiple RRs exist in an AS, the **Originator_ID** attribute is created by the first RR and is **not changed** by subsequent RRs (if any).

When a BGP router receives an IBGP route with the **Originator_ID** attribute and the **Originator_ID** attribute value **is the same as its router ID**, the BGP router **ignores** the route update.

### Cluster List

Each cluster has a unique cluster ID (Cluster_ID, which is the BGP router ID of an RR by default).
Before an RR reflects a route, the RR places the local Cluster_ID on top of the Cluster_List

When an RR receives a BGP route carrying the Cluster_list attribute and the Cluster_ID of the RR is contained in the Cluster_List attribute, the RR considers that a loop occurs for the route and **ignores** the route update.

![[Pasted image 20260416145910.png]]

