- [Control Plane](#Control%20Plane)
- [Data = Forwarding Plane](#Data%20=%20Forwarding%20Plane)
- [Monitoring Plane](#Monitoring%20Plane)


## Control Plane

Control plane of a device consists of the #MPU and the management unit of the #LPU. 

- The control and management plane provides control and management functions for the system and is the core of the entire system. 
- The control plane provides functions such as protocol processing, service processing, route calculation, forwarding control, service scheduling, traffic statistics collection, and system security. 
- The control plane of a switch is used to control and manage the running of all network protocols. 
- The control plane provides various network information and forwarding entries required by the data plane for data processing and forwarding.
## Data = Forwarding Plane

The forwarding plane consists of #SFUs and #LPUs.

An #LPU has a forwarding plane engine (FPE), which is essentially a switching chip that implements switching between interfaces on the LPU.

The data plane is responsible for high-speed processing and non-blocking switching of data packets. It encapsulates or decapsulates packets, forwards IPv4/IPv6/MPLS packets, performs QoS and scheduling, completes inner high-speed switching, and collects statistics.
## Monitoring Plane

The monitoring plane consists of the monitoring units of #MPUs and #LPUs. Some modular switches have independent centralized monitoring units (CMUs).

The monitoring plane monitors the ambient environment to ensure the secure and stable operation of the system. It detects voltage levels, controls system power-on and power-off, monitors the temperature, and controls fan modules. If a unit fails, the monitoring plane isolates the faulty unit promptly so that the other units remain
unaffected.
