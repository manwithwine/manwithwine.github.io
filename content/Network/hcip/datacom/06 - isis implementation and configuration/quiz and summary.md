#quiz
## $$Question$$

1. (Multiple) Which of the following statements about OSPF and IS-IS are true? ( )
	- A. Both OSPF and IS-IS are link-state routing protocols.
	- B. OSPF supports only IP networks, whereas Integrated IS-IS supports CLNP and IP networks.
	- C. OSPF uses area 0 to identify the backbone area.
	- D. The IS-IS backbone area consists of Level-2 and Level-1-2 routers.
2. (Multiple) Which of the following statements about Level-1 routers are true? ( )
	- A. A Level-1 router can establish neighbor relationships only with IS-IS routers in the same area.
	- B. A Level-1 router can establish a neighbor relationship with a Level-2 router in the same area.
	- C. By default, a Level-1 router can reach the destination outside an area only through the default route.
	- D. The LSDB of a Level-1 router contains only Level-1 LSPs. 
---
## $$Answer$$
1. ABCD
2. ACD
---

#summary
## $$Summary$$
- Each IS-IS router has at least one NET. IS-IS uses a hierarchical architecture. All Level-2 and Level-1-2 routers form a backbone area, and Level-1 routers in the same area form a common area. IS-IS packets are classified into four types: IIH, CSNP, PSNP, and LSP.
- A Level-1 router maintains only the LSDB of the area. A Level-1 route reaches the destination outside the area through the closest Level-1-2 router. To prevent sub-optimal paths, you can configure route leaking on the Level-1-2 router
- IS-IS supports interface authentication, area authentication, and routing domain authentication
- Both IS-IS and OSPF are link-state routing protocols and need to maintain LSDBs. As the network scale expands, a large LSDB degrades the overall performance of routers. Therefore, for the two routing protocols, multi-area network design is required for larger-scale networking. 


