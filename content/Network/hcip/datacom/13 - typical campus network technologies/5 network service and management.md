
## DHCP

![[Pasted image 20260417165209.png]]

DHCP dynamically configures and uniformly manages IP addresses of hosts. It simplifies network deployment and scale-out, even for small networks. 

DHCP enables a host to obtain an IP address dynamically, but does not specify an IP address for each host.

DHCP can allocate other configuration parameters, such as the boot file of a client, so that the client can obtain all the required configuration information by using only one message. 

DHCP is defined in **RFC 2131** and uses the client/server communication mode. A DHCP client requests configuration information from a DHCP server, and the DHCP server returns the configuration information allocated to the DHCP client.

**DHCP** supports dynamic and static IP address allocation.
- **Dynamic allocation**: DHCP allocates an IP address with a limited validity period (known as a lease) to a client. This mechanism applies to scenarios where hosts temporarily access the network and the number of idle IP addresses is less than the total number of hosts.
- **Static allocation**: DHCP allocates fixed IP addresses to clients as configured. Compared with manual IP address configuration, DHCP static allocation prevents manual configuration errors and enables unified maintenance and management. 

DHCPv4 offers the following benefits: 
- Reduced client configuration and maintenance costs
- Centralized management

## NTP

![[Pasted image 20260417165521.png]]

**NTP** is an application layer protocol belonging to the Transmission Control Protocol/Internet Protocol (TCP/IP) suite. 
NTP synchronizes time between time servers and clients. 
NTP implementation is based on IP and User Datagram Protocol (UDP). NTP packets are transmitted by UDP over port **123**.

## LLDP

**LLDP** is a standard Layer 2 topology discovery protocol defined in IEEE 802.1ab. 
**LLDP** collects local device information including the management IP address, device ID, and port ID and advertises the information to neighbors. Neighbors save the received information in their management information bases (MIBs). The NMS can use data in MIBs to query the link status.

## SNMP

![[Pasted image 20260417165840.png]]

## NETCONF/YANG

NETCONF provides a mechanism for communication between the NMS and network devices. 

A network administrator can use NETCONF to add, modify, or delete configurations of network devices, and obtain configurations and status of network devices. 

NETCONF is based on Extensible Markup Language (XML).

