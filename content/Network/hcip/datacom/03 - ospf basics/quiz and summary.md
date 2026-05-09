#quiz
## $$Question$$
1. (Single) Which of the following packets is used by OSPF to maintain neighbor relationships? ( )
	- A. Hello
	- B. Database Description
	- C. LSR
	- D. LSU
2. (Multiple) Which of the following network types are supported by OSPF? ( )
	- A. P2P network
	- B. P2MP network
	- C. Broadcast network
	- D. NBMA network 
---
## $$Answer$$
1. A
2. ABCD
---

#summary
## $$Summary$$
- This chapter describes basic OSPF concepts, including the router ID, area, and cost. Routers running OSPF send link state information to each other to calculate the topology and routes.

- This course describes the process of establishing OSPF neighbor relationships and adjacencies. On an MA network, the DR and BDR need to be elected. There are five types of OSPF packets. All packets have the same packet header format. An OSPF router periodically sends Hello packets to discover and maintain neighbor relationships, and uses DD, LSR, LSU, and LSAck packets to synchronize LSDBs. Finally, this course introduces the simple configuration of a single OSPF area.


