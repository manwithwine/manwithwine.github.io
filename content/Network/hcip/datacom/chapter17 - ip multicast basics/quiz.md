#quiz
## $$Question$$

1. What is the range of IPv4 multicast addresses? ( )
	- A. 192.168.0.0–192.168.255.255 
	- B. 172.21.0.0–172.21.255.255 
	- C. 224.0.0.0–239.255.255.255 
	- D. 240.0.0.0–255.255.255.255
2. Multiple) Which of the following statements about the functions of RPF are true? ( )
	- A. It prevents duplicate multicast packets.
	- B. It accelerates multicast traffic forwarding
	- C. It prevents loops
---
## $$Answer$$
1. C 
	- The Internet Assigned Numbers Authority (IANA) allocates class D addresses for IPv4 multicast. An IPv4 address is 32 bits long, and the most significant 4 bits of a Class D IP address are 1110. Therefore, multicast IP addresses range from 224.0.0.0 to 239.255.255.255.
2. AC
---

#summary
## $$Summary$$
- Multicast is mainly used to solve the following problems when P2MP traffic is carried in unicast or broadcast mode:
	- When P2MP traffic is carried in unicast mode, with the increase of P2MP service terminals, the bandwidth consumption or the pressure on the source server may be too high
	- When P2MP traffic is carried in broadcast mode, although the problems accompanying P2MP traffic transmission in unicast mode do not occur, the security is low
- A multicast network consists of three parts: source end network, multicast forwarding network, and receiver end network
	- The multicast forwarding network is responsible for forwarding multicast data between multicast routers, but problems such as loops, sub-optimal paths, and duplicate packets may occur. These problems can be partially or completely solved through the RPF check. 


