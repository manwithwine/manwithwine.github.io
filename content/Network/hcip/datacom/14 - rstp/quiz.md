#quiz
## $$Question$$

1. Which of the following are RSTP port states? ( )
	- A. Idle 
	- B. Discarding 
	- C. Forwarding 
	- D. Learning
2. RSTP root protection must be configured on the root port of the device.
---
## $$Answer$$
1. BCD
2. False. Must be configured on Designated ports of device
---

#summary
## $$Summary$$
- STP prevents loops on a LAN. Devices running STP exchange information with one another to discover loops on the network, and block certain ports to eliminate loops. With the growth in scale of LANs, STP has become an important protocol for a LAN.
- Based on STP, RSTP has many improvements and greatly speeds up network convergence
- This document describes seven improvements of RSTP compared with STP, including the port role, port status, BPDU format, BPDU processing mode, fast convergence mechanism, topology change mechanism, and four protection features
- **When RSTP/STP runs on a VLAN-based network, all VLANs on a local area network (LAN) use the same spanning tree. The blocked link does not carry any traffic, and traffic cannot be load balanced among VLANs. As a result, the link bandwidth usage and device resource usage are low.**


