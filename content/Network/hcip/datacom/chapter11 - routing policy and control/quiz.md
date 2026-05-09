#quiz
## $$Question$$

1. What are the functions of export filter-policies in OSPF and BGP?
2. What is the logical relationship between nodes in a route-policy? What is the logical relationship between multiple conditional statements on a node? 
---
## $$Answer$$
1. In OSPF, the export filter-policy is used to filter the routes to be imported from other routing protocols to OSPF. In BGP, the export filter-policy is used to filter routes to be advertised.
2. The logical relationship between nodes is OR, and the logical relationship between conditional statements is AND.
---

#summary
## $$Summary$$
- To control the advertisement and receipt of routes, use a tool to obtain routes. The most common tools are ACL and IP prefix list.
- Both filter-policies and route-policies can be used to filter routes to be accepted or advertised. Note that the use of filter-policies in link-state routing protocols cannot filter link state information, but affects only the local routing table.
- Before a device accepts or advertises routes, the device can use a route-policy to flexibly modify route attributes to meet route control requirements. 


