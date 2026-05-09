
## Overview

**Modular QoS command line interface (MQC)** groups the data flows that have the same characteristics and provides the same service for a group of data flows. MQC can also provide different services for the data flows of different classes. 

MQC involves three entities:
- traffic classifier
- traffic behavior
- traffic policy
 
MQC traffic behaviors support packet redirection. Therefore, MQC can be used to implement IP unicast policy-based routing.

![[Pasted image 20260417113453.png]]

### Traffic Classifier

**A traffic classifier** defines a group of traffic matching rules to classify packets. This figure illustrates the matching items supported by a traffic classifier.
![[Pasted image 20260417113523.png]]

The relationship between rules in a traffic classifier can be AND or OR. The default relationship is AND.
- **AND**: If a traffic classifier contains ACL rules, packets must match one ACL rule and all non-ACL rules. If a traffic classifier does not contain ACL rules, packets must match all non-ACL rules.
- **OR**: If a packet matches a rule in a traffic classifier, the device considers that the packet matches the traffic classifier.

### Traffic Behavior

**A traffic behavior** defines the actions to be performed, including packet filtering, priority re-marking, redirection, and traffic statistics collection.

![[Pasted image 20260417113724.png]]

### Traffic Policy

**A traffic policy** can be invoked on an interface

**A traffic policy** defines the inbound and outbound directions. A traffic behavior in the traffic policy matches incoming or outgoing packets, and is performed on the matched packets.

==`Different from a PBR policy which can be invoked only on Layer 3 interfaces, a traffic policy can be invoked on both Layer 2 and Layer 3 interfaces.`==

![[Pasted image 20260417114319.png]]

