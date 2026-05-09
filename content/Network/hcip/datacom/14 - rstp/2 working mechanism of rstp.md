
## RSTP Topology Convergence Process

1. After RSTP is enabled on a switch, the switch considers itself as the root bridge and sends RST BPDUs. All ports are designated ports and are in Discarding state. 
![[Pasted image 20260420123759.png]]
2. The uplink quickly enters the Forwarding state through the P/A mechanism.
	- After receiving a superior RST BPDU, SW2 considers that SW1 is the root bridge and the port on SW2 becomes the root port instead of the designated port. Then SW2 stops sending RST BPDUs.
	- The port on SW1 enters the Discarding state and sends RST BPDUs with the Proposal bit set to 1. After receiving the BPDU, SW2 **blocks all ports except the edge port**. This process is called **synchronization**.
	- After ports on SW2 synchronize information, the root port enters the Forwarding state and sends an RST BPDU with the Agreement bit set to 1 to SW1. After SW1 receives the BPDU, the designated port immediately enters the **Forwarding** state.
![[Pasted image 20260420123909.png]]

3. The interconnection port of the downlink starts a new round of P/A negotiation.
	- The downlink port of SW2 is configured as the designated port and continuously sends RST BPDUs with the Proposal bit set to 1.
	- After receiving the BPDU, the downlink port of SW3 finds that the received BPDU **is not the optimal one**. Therefore, SW3 ignores the received BPDU and does not send an RST BPDU with the Agreement bit set to 1.
	- The downlink interface of SW2 does not receive any response packet with the Agreement bit set to 1. SW2 enters the Forwarding state after **two intervals** of the Forward Delay timer.

When RSTP/STP runs on a VLAN-based network, **all VLANs** on a local area network (LAN) use the same spanning tree. The blocked link does not carry any traffic, and traffic **cannot** be load balanced among VLANs. As a result, the link bandwidth usage and device resource usage are low.