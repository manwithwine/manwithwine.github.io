
## Basic Concepts

**Policy-based routing (PBR)** enables a network device to forward data based on not only the destination IP address of a packet, but also other elements such as the source IP address, source MAC address, destination MAC address, source port number, destination port number, and VLAN ID.

You can also use an ACL to match specific packets and deploy PBR based on the ACL.

*PBR policy has a higher priority than a traditional IP routing table in packet forwarding*

**Local PBR** takes effect for locally originated traffic, whereas **interface PBR** takes effect **only** for incoming traffic on an interface.

## Structure

![[Pasted image 20260417112619.png]]

PBR policy consists of multiple nodes, each of which consists of matching conditions (**conditional statements**) and actions (**executable statements**).

Each node can contain multiple conditional statements.

The relationship between multiple conditional statements in a node is **AND**, actions in the node can be executed **only** when all conditional statements are matched.

The relationship between multiple nodes is **OR**, PBR is executed based on node IDs in ascending order. The matching is stopped if the conditional statements of a node are matched.

### PBR vs Route Policy


| Item         | Operation Object    | Description                                                                                                                                                                            |
| ------------ | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Route-policy | Routing information | A route-policy is a set of methods used to filter routing information and set route attributes. A route-policy sets or controls routes to affect the forwarding paths of data packets. |
| PBR          | Data packet         | PBR directly processes data packets, matches concerned packets using multiple methods, and then discards the unwanted packets or forcibly forwards packets along a specified path.     |
