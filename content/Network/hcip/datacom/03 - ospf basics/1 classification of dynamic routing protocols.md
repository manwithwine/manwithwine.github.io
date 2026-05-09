- [Classes of Dynamic Routing Protocols](#Classes%20of%20Dynamic%20Routing%20Protocols)
- [Distance-Vector Routing Protocol](#Distance-Vector%20Routing%20Protocol)
- [Link State Routing Protocol](#Link%20State%20Routing%20Protocol)
	- [LSA Flooding](#LSA%20Flooding)
	- [LSDB Maintenance](#LSDB%20Maintenance)
	- [SPF Calculation](#SPF%20Calculation)
	- [Routing Table Generation](#Routing%20Table%20Generation)
	- [Summary of Link State Routing Protocols](#Summary%20of%20Link%20State%20Routing%20Protocols)

## Classes of Dynamic Routing Protocols

1. by AS:
	1. IGP (RIP, OSPF, ISIS)
	2. EGP (BGP)
2. by working mechanisms and algorithms
	1. Distance-Vector Routing Protocols (RIP)
	2. Link-State Routing Protocols (OSPF, ISIS)
	3. Path-Vector (BGP)


## Distance-Vector Routing Protocol

A router running a distance-vector routing protocol periodically floods its routing table. Through route exchange, each router learns routes from neighboring routers, loads the routes to its routing table, and then advertises the routes to other neighboring routers.

All routers on a network **do not know the network topology**. They **only know the direction to a destination network segment and the cost.**
![[Pasted image 20260413152842.png]]

## Link State Routing Protocol

### LSA Flooding

A link-state routing protocol **advertises the link state but not routing information.**

Routers running link-state routing protocols **establish neighbor relationships and then exchange Link State Advertisements (LSAs)**
![[Pasted image 20260413152943.png]]

*Each router generates a link state advertisement (LSA) that describes the status of its directly connected interface, including the interface cost and the relationship between the router and its neighboring router.*

### LSDB Maintenance

**Each router generates LSAs and adds the received LSAs to its own link state database (LSDB).** Routers parse the LSAs stored in their LSDBs to obtain the network topology
![[Pasted image 20260413153109.png]]

### SPF Calculation

Each router uses the **Shortest Path First (SPF)** algorithm to calculate routes based on the LSDB. Each router calculates a loop-free tree with itself as the root and the shortest path. With the tree, the router knows the optimal paths to all network segments.

### Routing Table Generation

A router installs the calculated optimal path to its routing table.
![[Pasted image 20260413153233.png]]

### Summary of Link State Routing Protocols

A link state routing protocol involves four steps: 

```
Step 1: Establish a neighbor relationship between neighboring routers. 
Step 2: Exchange link state information and synchronize LSDBs between neighbors.
Step 3: Calculate the optimal path.
Step 4: Generate routing entries according to the shortest path tree and load the routing entries to the routing table.
```