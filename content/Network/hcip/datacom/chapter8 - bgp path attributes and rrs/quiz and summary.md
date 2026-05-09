#quiz
## $$Question$$

1. (Single) What is the type of the AS_Path attribute? ( )
	- A. Optional transitive 
	- B. Optional non-transitive 
	- C. Well-known mandatory 
	- D. Well-known discretionary
2. What is the function of MED? Can the MED be transmitted across ASs?
3. Which path attributes are used by an RR to prevent routing loops? 
---
## $$Answer$$
1. C
2. When the local AS has multiple ingresses, the MED can be used to determine the path through which other ASs enter the local AS. The MED is an optional non-transitive attribute and cannot be transmitted across ASs.
3. Originator_ID and Cluster_ID
---

#summary
## $$Summary$$
- BGP carries various path attributes when advertising routes. These attributes describe route characteristics and affect BGP route selection in some scenarios
- BGP path attributes are classified into well-known and optional attributes. All BGP routers must identify well-known attribute. Optional attributes do not need to be identified by all BGP routers.
- To solve the problem of IBGP split horizon, you can use full-mesh IBGP connections. However, a large number of IBGP peer relationships need to be maintained. You can deploy RRs to reduce the number of IBGP peer relationships.
- To prevent routing loops during RR deployment , BGP adds two path attributes: Originator_ID and Cluster_ID. 


