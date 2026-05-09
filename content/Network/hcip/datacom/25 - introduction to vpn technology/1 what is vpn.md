• IPsec: Internet Protocol Security 
• GRE: Generic Routing Encapsulation 
• L2TP: Layer 2 Tunneling Protocol. 
• MPLS: Multiprotocol Label Switching

## Overview
A VPN is constructed on a public network using a VPN technology. VPN users transmit private network traffic on the virtual network, implementing secure and reliable connections without changing the current network status

![[Pasted image 20260428140727.png]]

## VPN Classification
### Based on Construction Organization
- Leasing a carrier's VPN leased line to build an enterprise VPN
	- The most common scenario is leasing carriers' **MPLS VPN** private lines.
- Self-built enterprise VPN network
	- Enterprise VPN networks are established based on Internet and **include the IPsec VPN, L2TP VPN, and Secure Sockets Layer (SSL) VPN.**

### Based on Networking Modes
- Remote access VPN
	- This mode applies to VPN dial-up access of employees on business trips. Employees can access enterprise intranet resources through the VPN anywhere they can access the Internet. **Such VPNs usually include the L2TP VPN and SSL VPN.**
- LAN-to-LAN VPN (site-to-site VPN)
	- It is applicable to the interconnection of LANs of two geographically dispersed divisions of a company. **Such VPNs usually include the MPLS VPN and IPsec VPN.**

### Based on Network Layers 
![[Pasted image 20260428141038.png]]

## Key VPN Technology

The VPN technology is to use a tunneling technology to encapsulate packets, and establish a dedicated data transmission channel over a VPN backbone network to implement secure packet transmission

The VPN gateways on both ends establish a point-to-point virtual communication tunnel by encapsulating and decapsulating original packets.

**Identity authentication**, **data encryption**, and **authentication technologies** can effectively ensure the security of VPN networks and data.

**Identity authentication:** This function can be used in remote VPN access scenarios. The VPN gateway authenticates user identities to ensure that only authorized users can access the network. It can also be used by VPN gateways to authenticate each other's identity.

**Data encryption**: The clear text data is encrypted into ciphertext. Even if the data is intercepted by hackers, the hackers cannot obtain information in the data.

**Data verification**: The data verification technology is used to check the integrity and authenticity of packets and discard the packets that are forged and tampered with. 

![[Pasted image 20260429122350.png]]

