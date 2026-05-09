#quiz
## $$Question$$

1. When a BGP route received from an EBGP peer is advertised to an IBGP peer, how does the EBGP peer change the value of the Next_Hop attribute to its own source address?
2. (TorF) If the preceding three rules are the same, BGP compares the AS_Path attribute values. If the AS_Path attribute values are the same, BGP compares the AS numbers. ( ) 
---
## $$Answer$$
1. The peer **next-hop-local** command is executed to set the Next-Hop attribute as the source address for peer relationship setup.
2. False
---

#summary
## $$Summary$$
- BGP selects optimal routes based on path attributes. This allows BGP to select optimal routes based on path attributes in different scenarios
- BGP defines a set of detailed optimal path selection algorithms, which enable routers to select the optimal path in any complex and highly redundant network environment.
- BGP route selection rules are frequently used in practice and need to be mastered. 


