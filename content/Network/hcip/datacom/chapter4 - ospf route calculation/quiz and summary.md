#quiz
## $$Question$$

1. Which of the following link types are included in a Router-LSA? ( )
	- A. P2P
	- B. TransNet
	- C. StubNet
	- D. Vlink
2. (TorF) After the SPF algorithm is used to calculate routes, the OSPF routes that are considered as the optimal routes are added to the routing table of the router.
3. (TorF) A Network-summary-LSA can describe only one route. ( )
4. (Essay) How does OSPF prevent inter-area routing loops? 
5. Which of the following types of LSAs may be originated by an ABR? ( )
	- A. ASBR-summary-LSA
	- B. AS-external-LSA
	- C. Router-LSA
	- D. Network-summary-LSA
6. Which of the following routes has the highest priority for the same route prefix? ( )
	- A. Intra-area route
	- B. Inter-area route
	- C. Type 1 external route
	- D. Type 2 external route 
---
## $$Answer$$
1. ABCD
2. False
3. True
4. An OSPF network is partitioned into the backbone area and non-backbone areas. All non-backbone areas are directly connected to the backbone area, and there is only one backbone area. Non-backbone areas communicate with each other through the backbone area. In addition, the Type 3 LSAs from the backbone area do not return to the backbone area.
5. ABCD
6. A

---

#summary
## $$Summary$$
- 


