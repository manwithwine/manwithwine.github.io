#quiz
## $$Question$$

1. Which of the following special areas are defined by OSPF?
	- A. Stub Area
	- B. Totally Stub Area
	- C. Not-So-Stubby Area (NSSA)
	- D. Totally NSSA
2. What is the difference between a stub area and a totally stub area?
3. Which router is configured with the inter-area route summarization function? 
---
## $$Answer$$
1. ABCD
2. A stub area does not allow Type 4 and Type 5 LSAs, but allows Type 3 LSAs. A totally stub area does not allow Type 4 and Type 5 LSAs or Type 3 LSAs. It allows only Type 3 LSAs that carry default routes.
3. It is configured on the ABR.
---

#summary
## $$Summary$$
- Routers in the stub area reach the external network through the default route. Routers in the totally stub area reach the external network and the OSPF inter-area network through the default route. The routers in the NSSA and totally NSSA can import external routes.



