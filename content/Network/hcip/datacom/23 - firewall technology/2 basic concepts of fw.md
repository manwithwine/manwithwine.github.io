## Security Zone

A security zone is a set of networks connected through interfaces. Users in a zone have the same security attributes

## Default Security Zones

**Four** security zones have been created on Huawei firewalls: 
- **Untrusted** - defines an insecure network, such as the Internet.
- **DMZ** - defines the zone where internal network servers reside. Internal network servers are frequently accessed by external network devices but cannot proactively access the external network, which causes huge security risks. These servers are deployed in a DMZ with a lower level than a trusted zone but a higher level than an untrusted zone.
- **Trusted** - defines the zone where internal network terminals reside.
- **Local Zones** - is a device itself, including interfaces on the device. All packets constructed on and proactively sent from the device are regarded as packet sent from the local zone; the packets to be responded and processed by the device (including the packets to be detected or directly forwarded) are regarded as packets received in the local zone. Configurations of the local zone cannot be changed, for example, interfaces cannot be added to the local zone.

Security zones have the following characteristics: 
![[Pasted image 20260427172604.png]]

## Security Policy Composition
![[Pasted image 20260428094646.png]]

## Session Table

**A session table** is used to record the connection status of protocols such as TCP, UDP, and ICMP. It is an important basis for a firewall to forward packets.

 The session table is used for maintaining the connection status. To forward TCP, UDP, and ICMP packets, the firewall must look up the session table for the connection status and then process the packets accordingly.

## Problems of Multi-Channel Protocols on a Firewall

If a strict unidirectional security policy is configured on a firewall, the firewall allows **only** unidirectional access. As a result, some special protocols, such as FTP, cannot work.

To solve this: ASPF and Server Map

## ASPF and Server Map

**The Application Specific Packet Filter (ASPF)** is also called status-based packet filtering. It can automatically **detect** application-layer information of certain packets and **define** corresponding permit rules according to application-layer information. That is, a server map is generated.

The server map also records the connection status similar to that in the session table. The server map is equivalent to a simplified session table and is generated before actual traffic arrives. When the traffic reaches the firewall, the firewall generates a session table based on the server map and forwards the traffic.

ASPF is enabled to solve the multi-channel protocol problem. It is a method of generating a server map. 

The relationship between a server map and a session table:
- A server map records key information about application-layer data. If a packet matches the server map, the security policy is invalid for the packet.
- A session table represents the connection status of two communication parties.
- The server map does not represent the current connection status. It predicts subsequent packets based on the analysis of an existing connection.
- When receiving a packet, a firewall first checks whether the packet matches the session table.
- If not, the firewall checks whether the packet matches the server map.
- The security policy is invalid for the packet matching the server map.
- Then the firewall creates a session table for the packet matching the server map.
![[Pasted image 20260428134459.png]]





