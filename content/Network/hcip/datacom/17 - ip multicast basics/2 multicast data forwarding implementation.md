
## Multicast Routing and RPF Check

Loops, sub-optimal routes, and duplicate packets may occur during multicast forwarding. To prevent these problems, in addition to the destination network and outbound interface, multicast source and inbound interface information needs to be added to multicast routing entries. Then a device **forwards** only the multicast data received from **the specified inbound interface**, preventing problems such as loops, **sub-optimal routes, and duplicate packets (partially solved)** during multicast forwarding.

---
---
---
### RPF

Это механизм, который проверяет: _«Если я получу пакет от источника S, пришедший через интерфейс I, то есть ли у меня в таблице маршрутизации маршрут обратно к этому источнику S, который указывает именно на этот интерфейс I?»_

**Как это работает (пошагово):**

1. Маршрутизатор получает пакет.
    
2. Он смотрит не на **Destination IP** (как обычно), а на **Source IP**.
    
3. Он лезет в свою таблицу маршрутизации (FIB) и ищет маршрут к этому Source IP.
    
4. **Логика проверки:**
    
    - **Если** маршрут к Source IP ведет **через ТОТ ЖЕ САМЫЙ интерфейс**, с которого пришел пакет -> **Пакет легитимен** (пропустить).
        
    - **Если** маршрут к Source IP ведет через _другой_ интерфейс -> **Пакет подозрительный** (отбросить).

Обычно это про **Multicast**.

### uRPF (Unicast RPF) — разновидности

В оборудовании Huawei (и Cisco/Juniper) есть три режима работы uRPF. Важно понимать разницу:

|Режим|Строгость проверки|Когда использовать|
|---|---|---|
|**Строгий режим (Strict)**|Маршрут к источнику ДОЛЖЕН указывать ТОЧНО на тот интерфейс, откуда пришел пакет.|Сети без асимметричного трафика (обычно LAN, ядро провайдера с P2P).|
|**Слабый режим (Loose)**|Достаточно, чтобы маршрут к источнику существовал _в принципе_ (через любой интерфейс).|Сети с асимметричной маршрутизацией (Интернет, MPLS VPN).|
|**Режим "Разрешить по умолчанию"**|Если маршрута к источнику нет, но есть маршрут по умолчанию (0.0.0.0/0) — пакет пропускается.|Край сети (PE, CPE), где клиент мог просто не отдать свои сети динамически.|
Обычно это про **защиту интерфейса**.

---
---
---


## RPF Route Selection Rules

RPF routes can be selected among unicast routes, MBGP routes, and multicast static routes. If a router has all these routes, it performs an RPF check on a multicast packet in the following way:

![[Pasted image 20260421142055.png]]

## Multicast Protocol Introduction

A multicast network needs to establish forwarding paths based on multiple multicast protocols.

- IGMP runs on the receiver end network and is used **to inform the multicast network of the locations of group members and the multicast groups that the members join.**
- Protocols working on the multicast forwarding network include PIM, MSDP, and MBGP.
	- PIM is mainly used to generate MDTs in an AS
	- MSDP (Multicast Source Discovery Protocol) is mainly used to help generate inter-AS MDTs.
	- MBGP is used to help perform RPF check on inter-AS multicast traffic.
![[Pasted image 20260421143002.png]]
