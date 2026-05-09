## What Is a Firewall?

In the communications field, a firewall is a **security device**. It is used to protect a network area against attacks and intrusions from another network area. It is usually deployed at a network border, such as the enterprise Internet egress, enterprise internal service border, and data center border.

![[Pasted image 20260427171046.png]]

Router defends on **LFU** lvl🥈
FW defends on **SFU** lvl🥇


**A Demilitarized Zone (DMZ)** is originally a military term, referring to a partially controlled area between a military control area and a public area. A DMZ configured on a firewall is logically and physically separated from internal and external networks. In an enterprise, it is usually used to accommodate servers.

## Firewall Development History

![[Pasted image 20260427171917.png]]

### Stateful inspection firewalls

**Stateful inspection firewalls** are introduced based on packet filtering technology. It considers correlation between packets and detects the connection status but not a single packet.

**The stateful inspection firewall** detects the first data packet of a connection to determine the status of the connection. Subsequent data packets are forwarded or blocked based on the status of the connection.

*The NGFW is also a stateful inspection firewall. The NGFW greatly improves content security and processing performance.*

### AIFW

The **AIFW** is a next-generation firewall that integrates AI technology. It further improves the security protection capability and performance of the firewall by using AI algorithms or AI chips

Huawei **AIFW** has built-in core detection engine (**CDE**) — malicious file detection engine, deception sensor, APT inspection engine (**AIE**), and probe. It can interwork with the sandbox and Huawei Cybersecurity Intelligence System (**CIS**) — big data analytics platform for detection, building an intelligent defense system.

