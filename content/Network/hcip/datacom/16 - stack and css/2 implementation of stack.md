## Basic

3 roles:
- **Master switch**: manages the stack. A stack has only one master switch.
- **Standby switch**: is the backup of the master switch. A stack has only one standby switch. If the master switch fails, the standby switch takes over all services from the master switch and assumes the master role.
- **Slave switch**: forwards service traffic. A stack may have multiple slave switches. The more slave switches in a stack, the higher forwarding performance the stack can provide. Apart from the master and standby switches, all the other member switches are slave switches. If the standby switch becomes unavailable, a slave switch assumes the standby role.
![[Pasted image 20260420173625.png]]

## Stack ID

A stack ID identifies a stack member and is the slot ID of the member. Each stack member must have a unique stack ID in the stack.

You are advised to configure stack IDs for stack members before setting up a stack. Otherwise will be a conflict when new member joins.

![[Pasted image 20260420173815.png]]

## Logical Stack Port

Logical stack ports are logical ports used to set up a stack between switches. Each switch supports **two** logical stack ports: stack-port n/1 and stack-port n/2, where **n** indicates the stack ID of a member switch.

Stack member ports of a logical stack port (stack-port n/1) on one switch must be connected to stack member ports of a logical stack port (stack-port m/2) on another switch.

![[Pasted image 20260420181940.png]]

If devices more - logic the same:
![[Pasted image 20260420182729.png]]

## Stack Setup

![[Pasted image 20260420182811.png]]

### Topologies

![[Pasted image 20260420183207.png]]

### Master Switch Election
1. The switch that starts **first** becomes the **master** switch. The master election timeout interval is 20 seconds. The startup process may take different lengths of time on different member switches. When stack member switches are powered on or restart, some member switches may not participate in the first master election.
2. If multiple switches complete startup at the same time, the switch with the **highest** **stack priority** becomes the master switch.
3. If multiple switches complete startup at the same time and have the same stack priority, the switch with the **smallest** **MAC address** becomes the master switch.

### Standby Switch Election
1. The switch with the **highest** stack priority becomes the standby switch.
2. If the switches have the same stack priority, the one with the **smallest** MAC address becomes the standby switch.

### Software Version and Config File Sync
1. Automatic software loading: If the standby and slave switches are running a different software version from that of the master switch, they download the system software of the master switch, restart with the new system software, and rejoin the stack. Member switches must have compatible software versions with one another to set up a stack.
2. Configuration file synchronization: The standby and slave switches download and apply the configuration files of the master switch. This enables member switches to work like a single switch and ensures that other switches continue working normally if the master switch fails.


## Stack Split
![[Pasted image 20260421110308.png]]

### Problems Caused by a Stack Split
All member switches in a stack use the same IP address (VLANIF interface address) and MAC address (stack MAC address). After a stack splits, more than one stack may use the same IP address and MAC address. To prevent this situation, a mechanism is required to check for IP address and MAC address collision after a split.

A stack communicates with other network devices as one device using a unique MAC address. This MAC address is known as the stack MAC address.

Generally, the stack MAC address is the MAC address of the master switch. As such, if the master switch is unavailable or leaves the stack, the stack MAC address will be changed **10 minutes** later by default. That is, the MAC addresses of the two new stacks are the same within 10 minutes. 

## MAD

**Multi-active detection (MAD)** is a stack split detection protocol. If a stack splits due to a link failure, MAD provides split detection, multi-active handling, and fault recovery mechanisms to minimize the impact of a stack split on services.

MAD can be implemented in **direct** or **relay** mode. Direct and relay modes **cannot be** both configured in the same stack.

The new stacks send MAD packets over a **MAD link** (an ordinary cable, which is manually configured as a MAD link) for competition. The stack that fails in the competition **shuts down all physical ports** (except the manually configured reserved ports) on its member switches to prevent IP or MAC address conflicts. 

**In direct mode**, stack members use directly connected ordinary cables as dedicated MAD links.
![[Pasted image 20260421112317.png]]

**In relay mode,** MAD relay detection is configured on an Eth-Trunk interface in the stack, and the MAD detection function is enabled on an agent.
![[Pasted image 20260421112347.png]]

## Stack Upgrade

- **Intelligent upgrade**: When a stack is set up or a new switch is added to the stack, standby and slave switches or the switch automatically synchronizes the system software with the master switch.
- **Traditional upgrade**: similar to an ordinary device upgrade. You need to specify the startup system software on the master switch and restart the entire stack to upgrade the software of member switches. This process will cause lengthy service interruptions.
- **Smooth upgrade**: A stack is divided into an active area and a backup area. Member switches in the two areas are upgraded in turn. The uplinks and downlinks of the stack work in redundancy mode, and the active and standby links are in the active and backup areas, respectively. In this way, services are not interrupted during the upgrade.

## Local Preferential Forwarding

To improve the **forwarding efficiency** and **reduce the load on stack cables**, you can enable the local preferential forwarding function on a switch. 

This function **allows** traffic reaching the local switch to be preferentially forwarded through a local interface. If the local device has no outbound interface or all outbound interfaces fail, traffic is forwarded through an interface on the other member switch.
![[Pasted image 20260421114812.png]]
