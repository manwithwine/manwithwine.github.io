
OSPF areas are classified into the following types:
1. **Transit area:** carries traffic originated from and destined for the local area as well as traffic whose source and destination IP addresses do not belong to the local area, for example, traffic in area 0.
2. **Stub area**: carries only the traffic initiated by and destined for the local area, for example, traffic in areas 1 and 2.

## Stub Area

The Area Border Router (ABR) in a stub area **does not advertise the received AS external routes to the stub area**, which significantly decreases the LSDB and routing table sizes of routers in the stub area.

To ensure the reachability of AS external routes, the ABR generates **a default route (carried by Type 3 LSAs)** and advertises the route to non-ABRs in the stub area.

Note the following when configuring a stub area:
- A backbone area cannot be configured as a stub area.
- Stub area attributes need to be configured on all the routers in the area that needs to be configured as a stub area.
- AS external routes cannot be imported or received within a stub area.
- A virtual link cannot pass through a stub area.
![[Pasted image 20260415103247.png]]

## Totally Stub Area

A totally stub area **does not allow AS external routes or inter-area routes to be advertised within the area**.

Other routers except the ABR in a totally stub area **use default routes (carried by Type 3 LSAs)** delivered by the ABR to each other areas and AS external network.

==The difference between the stub area and the totally stub area is that **no-summary is specified on the ABR for the totally stub area**.==

![[Pasted image 20260415103449.png]]

#Question 
Почему в Totally Stub Area параметр no-summary нужен только на ABR девайсах, а на no-ABR девайсах - нет?

#Answer 
Параметр **`no-summary`** нужен **только на ABR** (Area Border Router), потому что именно ABR решает, какие типы LSA отправлять в область. Не-ABR устройства просто "подчиняются" правилам, установленным ABR.
Внутренний маршрутизатор просто объявляет себя как "Stub-маршрутизатор" (**устанавливает бит E=0 в Hello**) и принимает правила, установленные ABR.

