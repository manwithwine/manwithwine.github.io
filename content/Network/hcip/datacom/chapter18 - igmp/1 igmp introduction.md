The multicast network needs to know **the locations of multicast group members** and **the multicast groups that the members join** so that the multicast network can forward multicast data to the members.

**How does the multicast network discover multicast group members?**

## Multicast Group Member Discovery

Static - bad choice
Dynamic - good choice - **IGMP**


## IGMP Overview

In the TCP/IP protocol suite, IGMP is responsible for managing IP multicast members. It **establishes** and **maintains** multicast group memberships between IP hosts and the multicast routers that are directly adjacent to the IP hosts.

IGMP **manages** multicast members through IGMP messages exchanged between multicast group members and multicast routers. IGMP messages are **encapsulated** in IP packets.

There are three versions of IGMP:
- **IGMPv1**
- **IGMPv2**
- **IGMPv3**

After exchanging IGMP messages with group members, multicast routers generate **IGMP routing entries** and **IGMP group entries.**

## IGMP Group Entries and Routing Entries

GMP generates IGMP routing entries and IGMP group entries, based on which multicast routing entries are generated

An **IGMP group entry** is created when an **IGMP Report message** is **received from a host**. This entry is used to **maintain** group joining information and instruct multicast routing protocols (such as PIM) to create a corresponding (*, G) entry. 

![[Pasted image 20260421145153.png]]

**IGMP routing entries** are used **to extend the outbound interfaces** of multicast routing entries.
![[Pasted image 20260421145318.png]]

## Basic Concepts of IGMPv1

IGMPv1 uses a **query-report** mechanism to manage multicast groups

The query-report mechanism is implemented through two types of messages:

1. **General Query message**: a message sent by a querier to all hosts and routers on the local shared network to discover the multicast groups that have members.
2. **Report message**: Hosts send **Report messages** to the querier to **request to join a multicast group** or **respond to Query messages.**
IGMP messages are multicast. Therefore, a multi-access network requires **only one multicast router** to send **Query messages**. This multicast router is called an **IGMP querier.**

## IGMPv1 Message Format

Both IGMPv1 General Query messages and Report messages are multicast messages with the destination address **224.0.0.1.** 

IGMPv1 General Query messages are similar to Report messages in format, including three major fields: *Version, Type, and Group Address*

## IGMPv1 Group Joining Mechanism
![[Pasted image 20260421150149.png]]

The group member (1-2 G1) whose timer expires first **sends a Report message** for the group.

IGMPv1 **does not have its own querier election mechanism**. Instead, it relies on the multicast routing protocol (PIM) to elect an IGMP querier.

IGMPv1 uses the timeout mechanism to monitor group leaving status, and group members leave a group in silent mode. Before the timer expires, multicast traffic is still forwarded by the multicast router.

IGMPv2
SSM
IGMPv3

## Differences Between IGMP Versions
![[Pasted image 20260421151820.png]]
