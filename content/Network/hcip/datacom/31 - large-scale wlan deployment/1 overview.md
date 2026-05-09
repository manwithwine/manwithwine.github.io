## WLAN Networking Solution
![[Pasted image 20260430151609.png]]

## Key Technologies on a Large-Scale WLAN
![[Pasted image 20260430151650.png]]

## VLAN pool
![[Pasted image 20260507165120.png]]

Even assignment algorithm: assigns STAs to different VLANs according to the order in which STAs go online. When STAs go offline and online again, their VLANs and IP addresses may easily change. 

Hash assignment algorithm: assigns STAs to VLANs based on the hash result of their MAC addresses. VLANs and IP addresses remain unchanged for STAs. However, the number of users in each VLAN is uneven.

![[Pasted image 20260507165156.png]]
1. **A STA accesses a VAP.**
2. **The VAP is bound to a VLAN pool.**
3. **The VLAN pool assigns a VLAN based on the specified algorithm.**
4. **The STA is allowed to access through the assigned VLAN.**

Virtual access point (**VAP**): A physical AP can be virtualized into multiple VAPs, each of which provides the same functions as the physical AP. You can create different VAPs on an AP to provide the wireless access service for different user groups.