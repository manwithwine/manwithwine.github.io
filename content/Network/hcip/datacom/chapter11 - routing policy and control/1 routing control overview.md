Route control can be implemented using a route-policy. The route-policy is flexibly used in the following scenarios:
- **Controlling route advertisement**: A route-policy is used to filter the routes to be advertised so that a device advertises only the routes that match matching conditions.
- **Controlling route receipt**: A route-policy is used to filter the routes to be accepted so that a device accepts only the routes that match matching conditions
- **Controlling route import**: A route-policy is used to filter the routes to be imported so that a device imports only the routes that match matching conditions.

## Matching Tool:
### ACL

![[Pasted image 20260416182622.png]]

![[Pasted image 20260416182604.png]]

![[Pasted image 20260416182647.png]]

### Range of number for ACL 
Basic ACLs: Numbered **from 2000 to 2999.**  
Advanced ACLs: Numbered **from 3000 to 3999.**  
Layer 2 ACLs: Numbered **from** **4000 to 4999.**
User-defined ACLs: Numbered **from 5000 to 5999** 

**The matching stops once a rule is matched.** 
### IP Prefix List

![[Pasted image 20260416182840.png]]

![[Pasted image 20260416182852.png]]

## Policy Tool

### Filter-Policy

#### Filter-Policy Application in Distance-Vector Routing Protocols

 In distance-vector routing protocols, routing information is transmitted between devices. To filter such information, you can use filter-policies. The following figure shows the locations where the filter-policies take effect in the inbound and outbound directions.
 ![[Pasted image 20260416183047.png]]
#### Filter-Policy Application in Link-State Routing Protocols

In a link-state routing protocol, routing devices exchange LSAs, and then calculate entries in the routing table based on LSDB information summarized from the LSAs. A filter-policy, however, can filter routes but not LSAs.

![[Pasted image 20260416183149.png]]

**does not filter LSAs.**

### Route-Policy

A route-policy is a policy tool used to filter routes and set route attributes for the filtered routes

A route-policy consists of one or more nodes. Each node contains multiple if-match and apply clauses.

![[Pasted image 20260416183448.png]]

Route-policies use different matching conditions and modes to select routes and change route attributes.

![[Pasted image 20260416183514.png]]


page 492 
