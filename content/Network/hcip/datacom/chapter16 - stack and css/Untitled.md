#quiz
## $$Question$$

1. What are the differences between stack joining and stack merging?
2. What is the purpose of MAD? What will happen in the stack that fails in MAD competition?
3. What are the differences between CSS2 and traditional CSS? 
---
## $$Answer$$
1. In the stack joining scenario, a switch has been connected to a running stack through stack cables before being powered on. After the switch is powered on and starts, it becomes a slave switch since the stack already has a master switch. In the stack merging scenario, two stacks are connected through stack cables, and a new master switch is elected for the new stack and updates topology information. After a stack-enabled switch is powered on, it becomes a single- switch stack, with itself being the master switch. In this case, if this switch is connected to another stack through stack cables, the two stacks merge. This is a typical difference between stack merging and stack joining.
2. If a stack or CSS splits, more than one stack or CSS may use the same IP address and MAC address, which will cause entry conflicts on other network devices. MAD prevents this situation to ensure normal data forwarding. The stack that fails in the MAD competition shuts down all ports except the reserved ones on its member switches. This prevents IP and MAC address conflicts between stacks, thereby preventing entry conflicts on other network.
3. CSS2 supports 1+N backup of MPUs. That is, as long as one MPU on any member switch in a CSS is working and the control plane of the cluster is working normally, the data plane of the cluster can forward packets normally.
---

#summary
## $$Summary$$
- The stack and CSS techniques greatly simplify network deployment and management, implement fast deployment of highly reliable and loop-free campus networks, and greatly reduce the impact of network faults
- The MAD function can be configured to prevent forwarding exceptions caused by IP and MAC address conflicts between stacks. MAD can be implemented in direct or relay mode. Member switches in the stack that fails the MAD competition will shut down all physical ports except the reserved ones.
- To ensure packet forwarding efficiency, you are advised to configure local preferential forwarding when deploying Eth-Trunks in a stack or CSS
- CSS2 technology uses CSS cards on SFUs to set up a CSS, and supports the 1+N backup of MPUs by leveraging the forwarding-control separation architecture of switches


