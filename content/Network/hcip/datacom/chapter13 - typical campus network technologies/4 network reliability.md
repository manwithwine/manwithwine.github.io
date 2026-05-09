## VRRP

![[Pasted image 20260417164122.png]]

**The Virtual Router Redundancy Protocol (VRRP)** specifies an election protocol that dynamically assigns responsibility for a virtual router to VRRP routers on a LAN. It allows several routers on a subnet to use the same virtual IP address, with the physical routers representing a virtual logical router. If a gateway fails, VRRP selects a different gateway to forward traffic, thereby ensuring reliable communication.

If a gateway fails, VRRP selects a different gateway to forward traffic, thereby ensuring reliable communication.

- **Redundancy**: Multiple routing devices enabled with VRRP constitute a VRRP group and the VRRP group is used as the default gateway. When a single point of failure occurs, services are transmitted through the backup link. This reduces the possibility of network faults and ensures uninterrupted transmission of various services.
- **Load balancing**: VRRP enables multiple available routers to share the load more uniformly, reducing the traffic burden on the master.
- **Association**: VRRP can monitor faults on uplinks. When the upstream interface or uplink is faulty, the priority of the original master decreases, and an optimal backup becomes the master, ensuring proper traffic forwarding. Association between VRRP and BFD speeds up the active/standby switchover. To speed up the active/standby switchover in the VRRP group, configure a **BFD** session between the master and backup and associate the BFD session with the VRRP group. This is because BFD can fast detect faults. When the link between the master and backup becomes Down, the backup immediately switches to the master and takes over traffic.

## Overview of CSS/iStack

![[Pasted image 20260417164739.png]]

**Intelligent stack (iStack)** enables multiple stacking-capable switches to function as a single logical switch. iStack is applicable to Huawei fixed switches.
**A cluster switch system (CSS)** combines two clustering-capable switches into a single logical switch. A CSS is also called a cluster. CSS is applicable to Huawei modular switches.

![[Pasted image 20260417164914.png]]

Before a stack is set up, each switch is independent and has its own IP address and MAC address. You need to manage the switches separately. After a stack is set up, switches in the stack form a logical entity and can be managed and maintained using a single IP address. iStack technology **improves** forwarding performance and network reliability, and **simplifies** network management.

