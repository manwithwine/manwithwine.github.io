## TCP/IP Model

![[Pasted image 20260417130022.png]]

## Overview of Layer 2 Switching
![[Pasted image 20260417130200.png]]

![[Pasted image 20260417130212.png]]

## VLAN

Virtual Local Area Network (VLAN) technology logically divides a physical LAN into multiple broadcast domains, each of which is called a VLAN. 

All devices in a VLAN belong to the same broadcast domain. Different VLANs belong to different broadcast domains. 

Devices in a VLAN can directly communicate with each other, whereas devices in different VLANs cannot communicate directly.

Services in different VLANs are isolated from each other. Devices in different VLANs communicate with each other through Layer 3 devices. Generally, a VLAN is a logical subnet.

Members of a VLAN are allocated based on interfaces of a switch. Generally, an interface of a switch is added to a specified VLAN. In this case, the device connected to the interface is added to the VLAN.

### Access Interface

Frame receiving
![[Pasted image 20260417142321.png]]

Frame sending
![[Pasted image 20260417142338.png]]


### Trunk Interface

Frame receiving
![[Pasted image 20260417142231.png]]

Frame sending
![[Pasted image 20260417142239.png]]

### Hybrid Interface

Frame receiving
![[Pasted image 20260417142754.png]]

Frame sending
![[Pasted image 20260417142805.png]]

*When a trunk interface sends a data frame, the switch removes the tag of the data frame only when the VLAN ID of the data frame is the same as the PVID of the interface. In addition, data frames of other VLANs sent by the interface carry tags. A hybrid interface sends data frames in a different way from a trunk interface. You can run commands to configure a hybrid interface to send untagged data frames of a certain VLAN or some VLANs.*

## VLAN Assignment Methods

![[Pasted image 20260417142920.png]]

## Inter-VLAN Communication

![[Pasted image 20260417143011.png]]

