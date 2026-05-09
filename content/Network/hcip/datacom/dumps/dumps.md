source: https://free-braindumps.com/huawei/free-h12-821-v1-0-braindumps/page-23

1. Both MQC and PBR can be applied on device interfaces to filter received and sent packets or control packet forwarding paths.
```spoiler
## True
MQC (Modular QoS Command-Line Interface): Applied to interfaces for classifying and controlling traffic.
---
PBR (Policy-Based Routing): Used to influence packet forwarding based on policies rather than traditional routing tables.
---
Both MQC and PBR can be configured on device interfaces to filter incoming/outgoing packets or control their forwarding paths.
```
2. When two routers exchange LSDB information using DD packets, a master/slave relationship is formed first, the router with a larger router ID is the master, and determine the MS bit.
```spoiler
True
---
When OSPF routers exchange LSDBs using Database Description (DD) packets, they first establish a master-slave relationship. The router with the larger Router ID becomes the master, setting the MS (Master/Slave) bit in the DD packets. This hierarchical relationship ensures an orderly exchange of routing information .
```
3. A router performs a lookup in its FIB table for a packet. If the tunnel ID in the matching entry is 0, the packet needs to be forwarded through a tunnel, such as an MPLS tunnel.
```spoiler
## False
---
The question indicates that a router performs a lookup in its FIB table for a packet and determines that the tunnel ID in the matching entry is 0, suggesting that the packet needs to be forwarded through a tunnel such as an MPLS tunnel. However, this is a misunderstanding of the FIB functionality.  
  
FIB Table Overview  
The Forwarding Information Base (FIB) is used to make packet-forwarding decisions. Entries in the FIB include next-hop information, which can be directly linked to an interface or a tunnel.  
  
If the Tunnel ID is 0, it indicates that the packet is forwarded via a normal routing path and not through a tunnel.  
  
For MPLS or other tunnels, the Tunnel ID would have a non-zero value pointing to the associated tunnel.  
  
MPLS Tunnel Operation  
When a router forwards packets through an MPLS tunnel, a label-switched path (LSP) is set up. The FIB would reflect specific tunnel identifiers for packets that need such encapsulation.
```

4. On an OSPF network, one router with P2P as the network type is directly connected to another router with P2MP as the network type. If the Hello intervals on the two routers are changed to be the same, neighbor relationship establishment and LSDB synchronization are not affected.
```spoiler
False

---
---
The scenario describes a mismatch in OSPF network types between two connected routers: one set to Point-to-Point (P2P) and the other set to Point-to-Multipoint (P2MP).  
While aligning Hello intervals may seem sufficient for establishing an OSPF neighbor relationship, the fundamental mismatch in network types introduces issues.  
  
OSPF Network Types  
  
P2P: Assumes a direct connection with a single neighbor, uses faster convergence and simpler LSDB synchronization.  
  
P2MP: Supports multiple neighbors on a single interface, requiring different handling for DR/BDR roles and LSDB updates.  
  
Impact of Network Type Mismatch  
  
If Hello intervals are aligned, adjacency establishment might occur. However, mismatched network types affect neighbor role assignment and LSDB synchronization.  
  
P2P expects a direct link and would handle updates differently than P2MP, which assumes multiple neighbors. This leads to inconsistencies in route calculation and forwarding.
```
5. On an enterprise network, the directly connected interfaces of two OSPF routers are on different network segments and have different masks. To establish an OSPF neighbor relationship between the two interfaces, you can change their network types to which of the following?
```spoiler
Point-to-point
---
---
When OSPF routers have interfaces on different network segments with different subnet masks, the network type can be adjusted to establish adjacency. A point-to-point (P2P) network type eliminates the requirement for matching subnet masks by treating the link as directly connected without intermediate devices.  
--
P2P Network Characteristics  
--
OSPF treats the link as a direct connection between two routers.  
--
No DR/BDR election occurs, simplifying adjacency establishment.  
--
Subnet mask differences do not hinder neighbor relationships as the link is viewed as a logical tunnel.
```
6.
![[Pasted image 20260505123121.png]]
```spoiler
ABCD
```

7. ![[Pasted image 20260505124619.png]]
```spoiler
B
--
The LS Age field in the LSA header tracks the age of an LSA. When the LS Age reaches its maximum value (3600 seconds), the LSA is marked for deletion. This ensures old or stale LSAs are removed from the network to maintain accurate routing information.
```

8. ![[Pasted image 20260505124729.png]]
```spoiler
Broadcast: Ethernet  
  
Point-to-Point (P2P): PPP, HDLC  
  
Point-to-Multipoint (P2MP): PPP  
  
Non-Broadcast Multi-Access (NBMA): Frame Relay
```
8. ![[Pasted image 20260505125735.png]]
```spoiler
False
--
If the number of RST BPDUs cached on the port is superior to the received RST BPDU, the port discards the received RST BPDU and immediately responds with the cached RST BPDU. This speeds up network convergence.
```
8. ![[Pasted image 20260505125909.png]]
   ```spoiler
   ABD
   
   ---
   Inter-area Ip route changes DOESNOT affect!
   ```
   9. ![[Pasted image 20260505130943.png]]
```spoiler
False!
--
OSPF не preemptive, то есть если появляется новый роутер с высоким приоритетом, то он не выбирается сразу. В ISIS же выирается сразу и происходит флудинг LSP.
```
10. 
![[Pasted image 20260505131934.png]]
```spoiler
A,B,C
--
LSP ID Format: The LSP ID uniquely identifies each LSP and ensures accurate routing information. It comprises the following components:  
  --
System ID (C): A 6-byte identifier assigned to each router, derived from the router's NET (Network Entity Title). This identifier ensures unique identification of routers within the IS-IS domain.  
  --
Pseudonode ID (B): Assigned when a router acts as a Designated Intermediate System (DIS) on a broadcast network. It differentiates LSPs generated by the DIS from other routers.  
  --
LSP Number (A): A 1-byte field indicating the sequence number of the LSP. It helps distinguish multiple LSPs generated by the same router for the same level.
--
IS Type (D) is not part of the LSP ID itself. It is a field within the IS-IS PDU that indicates the type of Intermediate System (Level-1, Level-2, or both) but does not contribute to the composition of the LSP ID.
```
11. ![[Pasted image 20260505144258.png]]
```spoiler
AB
```
12. ![[Pasted image 20260505144448.png]]
```spoiler
True\/

Non-clients must establish fully meshed IBGP connections with all other non-clients and the RR because IBGP rules prohibit route propagation between non-clients without a direct connection.
```
13. ![[Pasted image 20260505144612.png]]
```spoiler
C
```
14. ![[Pasted image 20260505144755.png]]
```spoiler
## A

--
When an export routing policy is modified, BGP does not automatically resend affected routes. Manual intervention, such as a clear ip bgp command, is required to resend Update messages reflecting the new policy.  
  
Incorrect Options  
  ---
B . IGP routes can also be advertised into BGP using redistribution, not just the network command.  
  --
C . A router can be configured with multiple BGP processes using different AS numbers (multi- instance BGP).  
  --
D . Open messages carry additional parameters such as AS number, Hold Time, and Router ID, not just the header.
```
15. During BGP route summarization configuration, which keyword can be used to suppress all specific routes so that only the summary route is advertised?

	- aggregate-address
	- suppress-map
	- summary-only
	- suppress-spec-map
  Непонятно, на сайте - 4 вариант, но как-будто больше подходит первый

16. BGP is generally applied to complex networks where routes change frequently. Frequent route flapping consumes a large number of bandwidth and CPU resources, and even affects the normal operation of the network. This is an unavoidable problem that cannot be solved in BGP.
```spoiler
False
---
While route flapping is a concern in large-scale networks, BGP employs mechanisms such as Route Dampening to mitigate its impact. Route dampening suppresses frequently flapping routes for a period of time to reduce resource consumption and network instability.  
  --
Therefore, it is incorrect to state that the issue cannot be resolved in BGP.
```
17. The Next_Hop attribute in BGP records the next hop of a route. Similar to the next hop in an IGP, the Next_Hop attribute in BGP must be the IP address of a peer interface.
```spoiler
Unlike IGP, the Next_Hop attribute in BGP does not necessarily have to be the IP address of a peer interface. For example, in multi-hop BGP configurations, the Next_Hop can point to a different router or interface within the network.
```
18. 
A BGP device receives a route carrying an unknown attribute from a peer but does not know whether other devices need the attribute. In this case, the BGP device retains this attribute when advertising the route to other peers.  
Which of the following attributes is of this type?
	- Community
	- AS.Path
	- MED
	- OriginatorID
```spoiler
A
```
19. Which of the following type of ACLs are numbered from 4000 to 4999?
```spoiler
Basic ACLs: Numbered from 2000 to 2999.  
  --
Advanced ACLs: Numbered from 3000 to 3999.  
  --
Layer 2 ACLs: Numbered from 4000 to 4999.
  --
User-defined ACLs: Numbered from 5000 to 5999 
```
20. An IP prefix list is a common matching tool used in routing policies.  
Which of the following cannot be configured as matching conditions in an IP prefix list on a Huawei router?

	- Port number
	- Mask
	- Action
	- Index
```spoiler
A
--
An IP prefix list matches based on:  
  --
Mask: Specifies the subnet mask length.  

Action: Specifies whether to permit or deny.  
  
Index: Orders the rules within the prefix list.  
  --
Port numbers are not applicable as matching conditions in an IP prefix list.
```
21. ![[Pasted image 20260505155150.png]]
```spoiler
1. RPC comparison

2. Peer BID comparison

3. Peer PID comparison

4. Local PID comparison
```
[[1 introduction to rstp]]

22. Compared with RSTP, which of the following port roles are added to MSTP?
	- Backup port
	- Master port
	- Edge port
	- Regional edge port
```spoiler
BD
```
23. On an RSTP network, if a port receives an RST BPDU and finds that its buffered RST BPDU is superior to the received RST BPDU, the port discards the received RST BPDU without responding.
```spoiler
False
--
Discards and immediately responds with the cashed RST BPDU
```
24. An edge port is a new port role added to RSTP to overcome the disadvantages of STP.  Which of the following statements is false about this port role?
	- The port does not participate in RSTP calculation.
	- The port can directly enter the Forwarding state from the Discarding state.
	- After receiving a configuration BPDU, the port is still in the Forwarding state.
	- The Up and Down states of the port do not cause network topology changes.
```spoiler
C - After receiving a configuration BPDU, the port is still in the Forwarding state.
```
25. Based on IGMP snooping, IGMP snooping proxy enables a switch to act as a substitute for an upstream Layer 3 device to send IGMP Query messages to downstream hosts, and also to act as a substitute for downstream hosts to send IGMP Report/Leave messages to an upstream device. As such, this function conserves bandwidth between the upstream device and the local device.
```spoiler
True /

IGMP snooping proxy allows the switch to substitute for upstream Layer 3 devices and downstream hosts, reducing unnecessary bandwidth consumption by consolidating IGMP messages.
```
26. In a PIM (Protocol Independent Multicast) network, which type of routing entries are used to set up multicast forwarding and are applicable to both PIM-DM and PIM-SM networks?
	- (S, G)
	- (P, G)
	- (T, G)
	- (S, P, T)
```spoiler
(S,G)
```
27. ![[Pasted image 20260505161033.png]]
```spoiler
IGMP
PIM
IGMP Snooping
```
28. Without a prior version check, an engineer configures IGMP snooping on a device and the version of IGMP snooping is earlier than the IGMP versions on user hosts. In this case, which of the following situations will occur?
	- Users cannot receive multicast data because the device forwards received IGMP Report messages only to router ports and does not generate group member ports or forwarding entries.
	- Users cannot receive multicast data, but the device generates forwarding entries after receiving IGMP Report messages.
	- The IGMP snooping version of the device is automatically degraded, and users can receive multicast data properly.
	- The IGMP versions of the hosts are automatically upgraded, and users can receive multicast data properly.
```spoiler
A
--
If the IGMP snooping version on the device is earlier than the IGMP version on user hosts, the device may fail to parse IGMP Report messages correctly. As a result, the device forwards these messages only to router ports without generating group member ports or forwarding entries.  
  
Consequently, users cannot receive multicast data.
```
29. ![[Pasted image 20260505161945.png]]
```spoiler
B
```
30. ![[Pasted image 20260505162155.png]]
```spoiler
By default, Huawei firewalls create security zones such as Trust, Untrust, and Local. The DMZ (Demilitarized Zone) is a security zone explicitly created by users. A DMZ is used to isolate an internal network from the external one, providing an additional layer of security by placing public-facing services (e.g., web servers) in this intermediary zone. This setup ensures that if a public-facing service is compromised, the internal network remains secure. Huawei Firewall configuration steps confirm this zoning principle, making DMZ creation an explicit user-driven action .
```
31. An enterprise administrator wants to configure single-hop BFD to implement fast detection of direct links.  
Which of the following configurations are mandatory?
	- Configure the remote discriminator of a BFD session.
	- Configure the local discriminator of a BFD session.
	- Configure a multicast IP address for BFD.
	- Enable BFD globally.
```spoiler
ABD
--
Mandatory Configurations for Single-Hop BFD:  
  
A . Configure the remote discriminator of a BFD session:  
The remote discriminator is used to uniquely identify the BFD session at the remote end. This is essential for session establishment.  
B . Configure the local discriminator of a BFD session:  
The local discriminator uniquely identifies the BFD session at the local end. This is required to establish a BFD session.  
D . Enable BFD globally:  
BFD must be enabled globally on the router for the protocol to operate and for session configurations to take effect.  
  
Optional Configuration:  
C . Configure a multicast IP address for BFD:  
This is not required for single-hop BFD, as it operates over direct links using unicast communication. Multicast is used in other scenarios, like multi-hop BFD.  
  
Conclusion:  
The correct configurations for single-hop BFD are A, B, and D.
```
32. In VRRP networking, if VRRP is not configured to track an uplink interface and the uplink interface or link of the master device in a VRRP group fails, no switchover will be triggered. As a result, a traffic blackhole occurs.
```spoiler
True
--
If VRRP is not configured to track uplink interfaces, a failure in the master device's uplink or link will not trigger a switchover, resulting in a traffic blackhole. The VRRP mechanism relies on interface tracking to monitor connectivity and ensure role transitions upon faults. Without this configuration, no failover occurs, and traffic directed toward the master device is lost .
```
33. In inter-AC roaming scenarios, an AC can function as the mobility server of multiple mobility groups, but can be added only to one mobility group.
```spoiler
True
--
In inter-AC roaming scenarios, an AC (Access Controller) can serve as the mobility server for multiple mobility groups, enabling it to manage roaming among multiple groups. However, an AC can only belong to one specific mobility group. This constraint ensures that mobility management remains streamlined and avoids conflicts. Huawei WLAN mobility configuration guides validate this setup .
```
34. A large shopping mall configures a VLAN pool to prevent network performance deterioration caused by potentially large broadcast domains. A network engineer runs the display vlan pool name STA command to check information about the VLAN pool. The following command output is displayed:  
**<AC\> display vlan pool name STA** 
    Name : STA 
    Total : 2 
    Assignment: hash 
    Threshold Notify Count: 3 
    Threshold Notify time(min): 3 
    VLAN ID : 2 4  
Which of the following statements are true?
	- The VLANs with the IDs of 2 and 4 are added to the VLAN pool.
	- The total number of VLAN pools is 2.
	- The name of the VLAN pool is STA.
	- The VLAN pool uses the even VLAN assignment algorithm.
```spoiler
AC
--
The command output confirms that the VLANs with IDs 2 and 4 are part of the VLAN pool named "STA." The VLAN pool concept is used to allocate VLANs dynamically to devices or subnets, which reduces broadcast domain size and improves network efficiency. The total number of VLAN pools is unrelated to this output, and the assignment algorithm (hash or even) is not explicitly mentioned in the output. Huawei VLAN pool management references align with this analysis.
```
35. STAs stay on different subnets before and after Layer 3 roaming. To enable the STAs to access the original network after roaming, network engineers need to configure user traffic to be forwarded to the original subnet over a CAPWAP tunnel.
```spoiler
True
--
In Layer 3 roaming scenarios, STAs (stations) remain on different subnets before and after roaming. To ensure that user traffic reaches the original subnet, it must be tunneled back over a CAPWAP tunnel. This technique prevents disruptions in communication and enables seamless roaming. Huawei's Layer 3 roaming design guidelines emphasize the use of CAPWAP tunnels for user traffic forwarding
```
36. Which of the following statements about the forwarding plane of a switch is false?
	- Provides high-speed and non-blocking data channels.
	- Can encapsulate and decapsulate packets.
	- Can collect packet statistics.
	- Consists of main control boards and interface boards.
```spoiler
D
--
The forwarding plane of a switch consists of data forwarding hardware, such as line cards or forwarding engines, and is responsible for tasks like encapsulating/decapsulating packets, providing high-speed data channels, and collecting packet statistics. However, main control boards are part of the control plane, not the forwarding plane. This distinction ensures a separation of data forwarding and control functionalities .
```
37. Which of the following statement regarding the display ospf peer command output is true?
```
<Huawei/>display ospf peer
OSPF Process 1 with Router ID 10.1.1.2
Neighbors
Area 0.0.0.0 interface 10.1.1.2(GigabitEthernet1/0/0)'s neighbors
Router ID:10.1.1.1 Address: 10.1.1.1
State: Full Mode:Nbr is Slave Priority: 1
DR: 10.1.1.1 BDR: None MTU: 0
Dead timer due in 38 sec
Retrans timer interval: 5
Neighbor is up for 00:00:04
Authentication Sequence: [0]
```
- Address: 10.1,1.1 Indicates that the local interface address is 10.1.1.1.
- Through negotiation during DD packet exchange, the local end becomes the slave.
- Router ID indicates that the local router ID Is 10.1.1.1.
- The DR address is 10.1.1.1
```spoiler
D
--
```
38. Which of the following statements regarding different LSA types is false?
	- LS Request packets contain only LS Type, LS ID, and Advertising Router.
	- LS Ack packets contain complete LSA information.
	- DD packets contain only LSA summary information, including LS Type, LS ID, Advertising Router, and LS Sequence Number.
	- LS Update packets contain complete LSA information.
```spoiler
B
--
LS Ack (Link State Acknowledgment) packets are used to acknowledge received LSAs and do not contain complete LSA information. Instead, they contain only the headers of LSAs being acknowledged. This contrasts with LS Update packets, which carry full LSA details. The misunderstanding of LS Ack functionality makes this statement false .
```
39. Which of the following statements regarding OSPF route summarization is false?
	- OSPF supports two route summarization modes: ABR summarization and ASBR summarization.
	- Any router in OSPF can summarize routes.
	- Route summarization is the process of summarizing routes with the same prefix into one route and then advertising only the summarized route to other areas.
	- Route summarization can reduce routing information, decrease the routing table size, and improve router performance.
```spoiler
B
--
Route summarization in OSPF is restricted to specific routers: Area Border Routers (ABRs) and Autonomous System Boundary Routers (ASBRs). These devices perform summarization to reduce routing table size and minimize advertised routing information between areas or across AS boundaries. Regular routers cannot perform route summarization, making this statement false .
```
40. ![[Pasted image 20260506162332.png]]
41. ![[Pasted image 20260506162458.png]]
42. ![[Pasted image 20260506162750.png]]
43. ![[Pasted image 20260506173850.png]]
```spoiler
D
```
44. ![[Pasted image 20260506174002.png]]
```spoiler
A
```
45. ![[Pasted image 20260506174248.png]]
```spoiler
C
```
46. ![[Pasted image 20260506174709.png]]
```spoiler
C
```
47. ![[Pasted image 20260506175007.png]]
```spoiler
Originator ID is a BGP attribute used in Route Reflector (RR) topologies to prevent routing loops. It stores the Router ID of the original router that first advertised the route.  
RTA (Router ID 1.1.1.1) originates the route 10.1.1.0/24 and sends it to RTB (RR).  
RTB reflects the route to RTC without modifying the Originator ID.  --
RTC further reflects the route to RTD, still keeping the Originator ID = 1.1.1.1.  
RTD receives the route, and since the Originator ID is never changed by RRs, it remains 1.1.1.1 (RTA’s Router ID).  
Thus, RTD receives the BGP route with the Originator ID set to 1.1.1.1.
```
48. ![[Pasted image 20260506175433.png]]
```spoiler
C
```
49. ![[Pasted image 20260506180256.png]]
```spoiler
ABD
```
50. ![[Pasted image 20260506180713.png]]
```spoiler
AD
```
51. ![[Pasted image 20260507100318.png]]
```spoiler
B
```
52. When a routing policy is used to filter routes, which of the following route prefixes will be denied by the IP prefix below?
*ip ip-prefix aa index 10 permit 1.1.1.1 24 greater-equal 26 less-equal 32*

	A. 1.1.1.1/26
	B. 1.1.1.2/16
	C. 1.1.1.1/32
	D. 1.1.1.1/24
```spoiler
BD
```
53. ![[Pasted image 20260507101451.png]]
```spoiler
D
```
54. Preferences of routing protocols determine the sequence In which a router selects a route among routes to the same destination /earned through different routing protocols.
```spoiler
true
```
55. ![[Pasted image 20260507101946.png]]
```spoiler
BC
```
56. 
![[Pasted image 20260507120354.png]]
```spoiler
C
```
57. 
![[Pasted image 20260507120500.png]]
```spoiler
AB
```
58. 
![[Pasted image 20260507122009.png]]
```spoiler
B
--
потому что все порты в DESI 
```
59. 
![[Pasted image 20260507122846.png]]
```spoiler
A
--
The information provided indicates that the configured query interval is 60 seconds, which applies to general queries. Group-specific queries are sent at a shorter interval, usually derived from the maximum response time. Therefore, the statement about a 60-second interval for group-specific queries is false. Other statements regarding maximum response time (10s), IP address, and IGMP version (V2) are correct .
```
60. ![[Pasted image 20260507123022.png]]
```spoiler
AC
```
61. 
    ![[Pasted image 20260507123156.png]]
```spoiler
BCD
--
Gateaway address назначается через RA
```
62. 
    ![[Pasted image 20260507153545.png]]
```spoiler
C
```
63. 
![[Pasted image 20260507154120.png]]
64. 
The Interface IP address and VRRP virtual IP address can be the same. ToF?
```spoiler
True
```
65. 
    ![[Pasted image 20260507161516.png]]
```spoiler
Правильный ответ — **4784**.

Как указано в результатах поиска, для single-hop BFD (односкачкового) используется UDP-порт **3784**, а для multi-hop BFD (многоскачкового) — UDP-порт **4784**
```

66. 
![[Pasted image 20260507161701.png]]
67. 
![[Pasted image 20260507164157.png]]
```spoiler
In dual-link MSB networking with load balancing, the new AP will connect to the AC with the lower number of connected APs. In this case, AC2 has only 20 connected APs, while AC1 has 100.  
Therefore, the new AP will connect to AC2 .
```
68. 
![[Pasted image 20260507164506.png]]
```spoiler
C
--
20x3=60
```
69. 
    
![[Pasted image 20260507165520.png]]
```spoiler
1. **A STA accesses a VAP.**
2. **The VAP is bound to a VLAN pool.**
3. **The VLAN pool assigns a VLAN based on the specified algorithm.**
4. **The STA is allowed to access through the assigned VLAN.**
```
70. 
    ![[Pasted image 20260508112826.png]]
```spoiler
ABC
```
71. 

![[Pasted image 20260508112927.png]]

```spoiler
BC
--
BSS - когда у тебя одна AP (SSID)
ESS - когда множество AP с одинаковой (SSID)
```
