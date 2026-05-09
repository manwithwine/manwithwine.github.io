#quiz
## $$Question$$

1. Multiple) Which of the following statements about the IP address in VRRP packets are true? ( )
	- A. The source IP address is the IP address of an interface on the master. 
	- B. The source IP address is the virtual IP address of the virtual router. 
	- C. The destination IP address is a broadcast IP address. 
	- D. The destination IP address is the IP address of the multicast group
2. (Multiple) Which statements about VRRP timers are true? ( )
	- A. The default interval for sending VRRP Advertisement packets is 1s. The interval for sending VRRP Advertisement packets associated with a VRRP router must be the same. 
	- B. If the preemption delay is set to 4s, the backup becomes the new master if it does not receive a VRRP Advertisement packet from the master within 4 seconds. 
	- C. Set the preemption delay to 4s and the interval for sending VRRP Advertisement packets to 2s. If the backup does not receive a VRRP Advertisement packet from the master within 6s, the backup becomes the new master. 
	- D. On a busy network, set the preemption delay to a large value to prevent VRRP flapping
---
## $$Answer$$
1. AD
2. AD
---

#summary
## $$Summary$$
- The VRRP priority is used to control VRRP master/backup election, and active/standby switchover and switchback. To ensure network stability, the preemption delay mechanism is designed for VRRP to reduce network flapping.
- VRRP can monitor the status of uplink interfaces to detect network faults and associate with VRRP to ensure network reliability. VRRP can also be bound to BFD sessions to implement fast convergence. In addition, VRRP can be used together with MSTP, which is a common networking solution in campus networks. 


