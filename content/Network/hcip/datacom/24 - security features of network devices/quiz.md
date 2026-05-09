#quiz
## $$Question$$

1. (TorF) STelnet is more secure than Telnet for remote login. This is because STelnet uses TCP encapsulation while Telnet uses UDP encapsulation. ( ) 
2. (TorF) Local attack defense includes CPU attack defense and attack source tracing. ( ) 
---
## $$Answer$$
1. False. *Both Telnet and STelnet actually use TCP, not UDP. The security difference comes from SSH encryption versus Telnet's plaintext transmission, not from the transport layer protocol.*
2. True
---

#summary
## $$Summary$$
- When performing security hardening on a device, take all possible dimensions into consideration, including the management plane, control plane, and forwarding plane. Based on the innate vulnerabilities of the device, assess network security risks and sort out the overall security architecture and security hardening policies for the device.
- Use secure protocols such as SSH and SFTP for device access and data transmission, unless the device does not support these. The CPU of a device is vulnerable to attacks. Therefore, local attack defense is of vital importance. 


