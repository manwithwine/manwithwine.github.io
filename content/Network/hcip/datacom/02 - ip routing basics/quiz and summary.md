#quiz
## $$Question$$

1. (Single) If a router has the following four FIB entries, which route is used by the router to forward the IP packet with the destination IP address 10.0.1.1? ( ) 
	- A. 0.0.0.0/0
	- B. 10.0.0.0.0/16
	- C. 10.0.1.0/24
	- D. 10.0.2.0/24 
2. (Multiple) Which of the following statements about route import are false? ( ) 
	- A. In the OSPF process of a router, you can run the import-route command to import routes from other OSPF processes.
	- B. In the OSPF process of a router, you can run the import-route command to import static routes of the routing table.
	- C. On a router, to import routes from routing protocol X to routing protocol Y, you need to run the import-route command in the view of routing protocol X.
	- D. After the import-route command is run on a router and the direct route of GE0/0/1 is imported to OSPF, OSPF is activated on the interface and the interface periodically sends Hello packets. 
---
## $$Answer$$
1. C
2. CD
---

#summary
## $$Summary$$
- Different routing protocols have different working mechanisms, so multiple routes may be generated to the same destination network segment. A router selects the optimal route based on the **priority of the routing protocol and the route cost**, and adds the optimal route to the FIB table. The router **forwards** data according to the FIB table.

- On a large-scale network running multiple routing protocols, routes are advertised between routing protocols by importing routes. A large number of routes may be imported, and some low-performance devices cannot support the imported routes. Therefore, route control is required to implement on-demand route distribution. 


