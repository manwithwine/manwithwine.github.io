## WLAN and Main NEs

**WLAN** is a network that uses high-frequency (2.4 GHz or 5 GHz) signals such as radio waves, lasers, and infrared rays to replace the traditional media used for transmission on a wired LAN.
![[Pasted image 20260417151550.png]]

AC - Access controller
AP - Access point

## Network Architecture Overview
![[Pasted image 20260417161844.png]]

### AP

The AP can switch flexibly among the Fat, Fit, and cloud modes based on the network plan.


| Fat AP                                                                                                                                                                                                                                                                                         | Fit AP                                                                                                                                                                                                                                                                                                                                                  | Cloud AP                                                                                                                                                                                                                                                                    |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| applies to home WLANs. <br><br>**A Fat AP** works independently and requires separate configurations. It provides only simple functions and is cost- effective. The Fat AP independently implements functions such as user access, authentication, data security, service forwarding, and QoS. | applies to medium- and large-sized enterprises. <br><br>**Fit APs** are managed and configured by the AC in a unified manner, provide various functions, and have high requirements on network maintenance personnel's skills. Fit APs must work with a AC for user access, AP going-online, authentication, routing, AP management, security, and QoS. | applies to small- and medium-sized enterprises. <br><br>**Cloud APs** are managed and configured by a cloud management platform in a unified manner, provide various functions, support plug-and-play, and have low requirements on network maintenance personnel's skills. |

## AC + Fit AP Architecture

![[Pasted image 20260417162734.png]]

Control And Provisioning of Wireless Access Points (**CAPWAP**): defines how to manage and configure APs. That is, a AC manages and controls APs in a centralized manner through CAPWAP tunnels.

With CAPWAP, APs automatically discover the AC, the AC authenticates the APs, and the APs obtain the software package and the initial and dynamic configurations from the AC. CAPWAP tunnels are established between the AC and APs.

CAPWAP tunnels include control (UDP-port **5246**) and data (UDP-port **5247**) tunnels.

**The control tunnel** is used to transmit control packets (also called management packets, which are used by the AC to manage and control APs). 
**The data tunnel** is used to transmit data packets. The CAPWAP tunnels allow for Datagram Transport Layer Security (**DTLS**) encryption, so that transmitted packets are more secure. Allows APs to exchange data sent by STAs with the AC through CAPWAP tunnels when the tunnel forwarding mode is used.