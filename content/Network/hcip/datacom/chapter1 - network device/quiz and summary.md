#quiz
## $$Question$$

1. (Single) Which of the following modules on a modular switch is responsible for running routing protocols and generating and maintaining routing tables? ( ) 
	- A. LPU 
	- B. SFU 
	- C. MPU 
	- D. SPU 
2. (Essay) When forwarding service packets, does a high-end modular switch query forwarding entries from the MPU? 
---
## $$Answer$$
1. C
2. No. The high-end modular switch delivers forwarding information to the LPU, and the LPU directly forwards packets without querying forwarding entries from the MPU.
---

#summary
## $$Summary$$
- Each network device has an independent control plane, forwarding plane, and monitoring plane. The control plane is responsible for protocol processing, route calculation, and service scheduling, and the forwarding plane is responsible for data forwarding to implement packet exchange between service modules. The monitoring plane monitors the ambient environment to ensure the secure and stable operation of the system. 

- On a high-end modular switch, each plane has different boards installed. LPUs and SFUs implement functions of the forwarding plane, MPUs implement functions of the control plane, and CMUs implement functions of the monitoring plane. 

- High-end modular switches use hardware-based forwarding. Packets are directly forwarded by LPUs, without participation of the control plane. Therefore, the packet forwarding efficiency is high

