**VRF**, also called **VPN instance**, is a virtualization technology. 
Multiple VPN instances are created on a physical device. Each VPN instance has its own **interfaces**, **a routing table, and routing protocol processes.**

A VRF is a logical unit on a physical device. Each logical unit is called a VPN instance, and instances are isolated on the routing plane. VRF implementation is as follows:
1. Create an instance and bind each involved Layer 3 interface (physical interface, sub-interface, or VLANIF interface) to the instance. 
2. (Optional) Configure a routing protocol or static route and bind it to the VPN instance. 
3. A VPN instance routing table is created using information about the interfaces and routing protocols bound to the instance. Then data is forwarded using entries contained in the instance routing table, and instance isolation is implemented.

