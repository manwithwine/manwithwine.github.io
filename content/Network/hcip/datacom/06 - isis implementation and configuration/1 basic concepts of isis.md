![[Pasted image 20260415115601.png]]

**==CLNP doesn't use IP addresses. It useses address of NSAP (Network Service Access Point) format.**==

```
Example:
49.0001.0000.0000.0001.00
```

IS-IS is a link-state routing protocol. IS-IS is similar to OSPF in many aspects. For example, directly connected devices running IS-IS discover each other by sending Hello packets, establish adjacencies, and exchange link-state information.

A NET includes the following elements: 
	▫ CLNP: is similar to the IP protocol in TCP/IP. 
	▫ IS-IS: is similar to OSPF in TCP/IP. 
	▫ ES-IS: is similar to ARP or ICMP in TCP/IP.

End system (ES): is similar to a host on the IP network.
ES-IS: End System to Intermediate System

## NSAP

The network service access point (NSAP) is an address defined by the OSI to locate resources. It provides interfaces between the network layer and upper-layer applications. The NSAP is composed of the initial domain part (IDP) and the domain specific part (DSP)

![[Pasted image 20260415115940.png]]

The IDP is similar to the network ID in an IP address. It is defined by the ISO and consists of the authority and format identifier (AFI) and the initial domain identifier (IDI). The AFI indicates the address allocation authority and address format, and the IDI identifies a domain.

The DSP is similar to the subnet ID and host address in an IP address. The DSP consists of the High Order DSP (HODSP), system ID, and NSAP Selector (SEL). The HODSP is used to divide areas, the system ID identifies a host, and the SEL indicates the service type.

## Differences Between Area Division of IS-IS and OSPF

IS-IS uses a two-level hierarchy in an AS: backbone area and non- backbone area.
	▫ **Level-1** routers are deployed in non-backbone areas. 
	▫ **Level-2** and **Level-1-2** routers are deployed in the backbone area. 

Each non-backbone area connects to the backbone area through a Level- 1-2 router. 

In the figure, the backbone area contains all the routers in area 49.002 and Level-1-2 routers in other areas.

![[Pasted image 20260415120153.png]]

The two types of topologies show the differences between IS-IS and OSPF:
- In IS-IS, each router belongs **to only one area.** In OSPF, different interfaces of a router may belong to different areas.
- In IS-IS, **no area** is defined as the **backbone** area. In OSPF, area 0 is defined as the backbone area.
- In IS-IS, Level-1 and Level-2 routes are calculated using the SPF algorithm to generate the shortest path tree (SPT). In OSPF, the SPF algorithm is used **only** in the same area, and inter-area routes are forwarded by the backbone area.

## IS-IS Router Types

### Level-1 router

A Level-1 router is an **internal** router in an IS-IS area. It establishes Level-1 neighbor relationships **with only Level-1 and Level-1-2** routers in the same area. A Level-1 router **cannot establish** the neighbor relationship with a **Level-2 router.**

A Level-1 router maintains only the Level-1 LSDB, which contains only the routing information **of the local area**. The Level-1 router must access the IS-IS backbone area through a Level-1-2 router to access other areas.

### Level-2 router

Level-2 routers are **IS-IS backbone routers**. They can establish neighbor relationships with **Level-2 routers or Level-1-2** routers in the same area or different areas. A Level-2 router maintains a Level- 2 LSDB that **contains all routing information** of the IS-IS domain.

All Level-2 routers form the backbone network of the routing domain. They establish Level-2 neighbor relationships and are responsible **for inter-area** communication. Level-2 routers in the routing domain **must be physically contiguous to ensure the continuity of the backbone network.**

### Level-1-2 router

Similar to an ABR in OSPF, a Level-1-2 router is also a part of the IS-IS backbone network.

A Level-1-2 router maintains **two LSDBs**: a Level-1 LSDB and a Level-2 LSDB. The Level-1 LSDB saves for **intra-area** routing and the Level-2 LSDB saves for **inter-area** routing.

When IS-IS is configured on a Huawei router, the router type is **Level-1-2** by default.

## Network Types Supported by IS-IS

IS-IS automatically determines the default network type of an interface based on the data link layer encapsulation type of the interface. IS-IS supports the following network types:
- Broadcast: such as Ethernet.
- Point-to-point (P2P): such as PPP and HDLC
- For a Non-Broadcast Multi-Access (NBMA) network, you should configure its sub-interfaces as P2P interfaces.

## IS-IS Cost

IS-IS uses the cost as the route metric. A smaller cost indicates a better path.
The default cost is 10 regardless of the interface bandwidth.

The costs of IS-IS interfaces can be determined in the following modes (in descending order of priority): 
	 Interface cost: configured for a specified interface. 
	 Global cost: configured for all interfaces. 
	 Automatically calculated cost: automatically calculated based on the interface bandwidth.



In ISO 10589, the maximum metric value of an IS-IS interface can only be 63 and the IS-IS cost type is **narrow**. 
A small range of metrics cannot meet the requirements on large-scale networks. 

s defined in RFC 3784, the cost of an IS- IS interface can be extended to 16777215. In this case, the IS-IS cost type is **wide**.

By default, the cost type of Huawei routers is **narrow**.

The following lists the TLVs used in narrow mode:
- TLV 128 (IP Internal Reachability TLV): carries IS-IS routes in a routing domain.
- TLV 130 (IP External Reachability TLV): carries IS-IS routes outside a routing domain. 
- TLV 2 (IS Neighbors TLV): carries neighbor information.

The following lists the TLVs used in wide mode:
- TLV 135 (Extended IP Reachability TLV): replaces the earlier IP reachability TLV and carries IS-IS routing information. This TLV expands the route metric and carries sub-TLVs.
- TLV 22 (IS Extended Neighbors TLV): carries neighbor information.

## Packet Format

 IS-IS packets are encapsulated in frames at the data link layer.
 
 A protocol data unit (*PDU*) consists of an IS-IS header and variable length fields.
 
 The IS-IS header can be further classified into the common header and specific header. For all PDUs, the common headers are the same, but the dedicated headers vary according to the PDU type.
![[Pasted image 20260415152041.png]]

Main fields:
- Intradomain Routing Protocol Discriminator: The fixed value is 0x83.
- Length Indicator: indicates the length of the IS-IS header (including the common header and dedicated header), in bytes.
- Version/Protocol ID Extension: The fixed value is 0x01.
- System ID Length: indicates the length of the system ID in the NSAP or NET. If it is set to 0, the system ID has 6 bytes.
- R (Reserved): The fixed value is 0.
- Version: The fixed value is 0x01.
- Maximum Area Address: indicates the maximum number of the addresses of supported areas. An integer value ranging from 1 to 254 indicates the maximum number of area addresses allowed by an IS-IS process. The default value 0 indicates that the IS-IS process supports a maximum of three area addresses.

## PDU Types

IS-IS PDUs are classified into four types:
- IS-IS Hello PDUs (IIH)
- Link state PDUs (LSPs)
- Complete Sequence Number PDUs (CSNPs)
- Partial Sequence Number PDU (PSNPs)

**IIHs**: are used to set up and maintain neighbor relationships. Among them, Level-1 LAN IIHs apply to the Level-1 routers on broadcast LANs; Level-2 LAN IIHs apply to the Level-2 routers on broadcast LANs; and P2P IIHs apply to non-broadcast networks.

**LSPs**: are used to exchange link-state information. There are two types of LSPs: Level-1 and Level-2 LSPs.

**SNPs**: describe the LSPs in all or some databases to help synchronize and maintain all LSDBs. SNPs are classified into CSNPs and PSNPs, which can be further classified into Level-1 CSNPs, Level-2 CSNPs, Level-1 PSNPs, and Level-2 PSNPs.

![[Pasted image 20260415152446.png]]

## Common IS-IS TLVs

A TLV is a data structure that consists of the Type, Length, and Value fields.

| TLV Type | Name                                      | PDU Type      |
| -------- | ----------------------------------------- | ------------- |
| 1        | Area Addresses                            | IIH, LSP      |
| **2**    | **IS Neighbors (LSP)**                    | **LSP**       |
| 4        | Partition Designated Level2 IS            | L2 LSP        |
| 6        | IS Neighbors (MAC Address)                | LAN IIH       |
| 7        | IS Neighbors (SNPA Address)               | LAN IIH       |
| 8        | Padding                                   | IIH           |
| 9        | LSP Entries                               | SNP           |
| 10       | Authentication Information                | IIH, LSP, SNP |
| **128**  | **IP Internal Reachability Information**  | **LSP**       |
| 129      | Protocols Supported                       | IIH, LSP      |
| **130**  | **IP External Reachability Information**  | **LSP**       |
| 131      | Inter-Domain Routing Protocol Information | L2 LSP        |
| **132**  | **IP Interface Address**                  | **IIH, LSP**  |
