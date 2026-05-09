
**VRRP** groups several routers into a virtual router. If one of routers fails, traffic can be switched to another router, ensuring service continuity and reliability.

## Concept

⚫ **VRRP router:** A router running VRRP, such as R1 and R2. VRRP is configured on interfaces of routers and works based on interfaces. 
⚫ **Virtual router ID (VRID):** A VRRP group consists of multiple routers (interfaces) that work together and are identified by the same VRID. Routers in the same VRRP group exchange VRRP packets and form a virtual router. Only one master router can exist in a VRRP group.

![[Pasted image 20260430143245.png]]

![[Pasted image 20260430143316.png]]

![[Pasted image 20260430143342.png]]

The priority value ranges from 0 to 255. A **larger** value indicates a **higher** priority. If the values are the same, the interface IP addresses are compared. The interface with the largest IP address is preferred.

##  Packet Format

VRRP has only one packet type — **Advertisement** packets. Advertisement packets are **multicast** packets and can be transmitted only in the same broadcast domain. The destination multicast address of Advertisement packets is 224.0.0.18.

![[Pasted image 20260430143459.png]]

## Timers

- ADVER_INTERVAL timer: specifies the interval at which the master router sends VRRP Advertisement packets. The default value is 1s.
- MASTER_DOWN timer: indicates that the backup router preempts the Master state after the MASTER_DOWN timer expires. The MASTER_DOWN timer is calculated as follows: 
	- MASTER_DOWN = (3\*ADVER_INTERVAL) + Skew_time (offset time) 
	- Skew_Time = (256 – Priority)/256 

## State Machine

The VRRP state machine has three states: **Initialize, Master, and Backup.**
![[Pasted image 20260430143654.png]]

VRRP preemption mode:
- **Preemption mode** (enabled **by default**): If the backup is enabled with the preemption function, it immediately switches to the Master state when detecting that the priority of the master is lower than its own priority.
- **Non-preemption mode**: If the preemption function is disabled on the backup, the backup remains in Backup state until the master fails even when detecting that the priority of the master is lower than that of the backup.

## Load Balancing

![[Pasted image 20260430144011.png]]

VRRP can **monitor** the status of the uplink interface. When a device **detects** a fault on the uplink interface or link, the device **reduces** the VRRP priority. This ensures that the backup with a normal uplink can be elected as the Master to forward packets. 

If BFD turned on and detects fault, then **no need to wait** for MASTER_DOWN timer to expire.

![[Pasted image 20260430144306.png]]

