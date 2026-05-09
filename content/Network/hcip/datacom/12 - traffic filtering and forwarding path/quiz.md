#quiz
## $$Question$$

1. What is the difference between local PBR and interface PBR? 
2. When MQC is used to filter traffic, what is the difference between the ACL matching a traffic classifier and the ACL invoked by traffic-filter? 
---
## $$Answer$$
1. Local PBR takes effect for locally originated traffic, whereas interface PBR takes effect only for incoming traffic on an interface.
2. In an ACL invoked by MQC, permit and deny indicate whether traffic is matched, instead of the action of permitting or denying traffic. In an ACL invoked by traffic-filter, permit and deny indicate the actions of permitting or denying traffic.
---

#summary
## $$Summary$$
- MQC supports multiple flexible traffic matching modes and executable actions, and can be invoked in multiple views. MQC can be used to implement PBR and traffic filtering

[[pbr vs mqc vs traffic filtering]] 



