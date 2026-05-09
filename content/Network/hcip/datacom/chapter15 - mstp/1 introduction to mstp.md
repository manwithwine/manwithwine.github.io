- [[#Overview of MSTP|Overview of MSTP]]
- [[#Basic Concepts|Basic Concepts]]
	- [[#MST Region|MST Region]]
	- [[#MSTI|MSTI]]
	- [[#CST|CST]]
	- [[#IST|IST]]
	- [[#CIST|CIST]]
	- [[#SST|SST]]
	- [[#CIST Root, Regional Root, Master Bridge|CIST Root, Regional Root, Master Bridge]]
		- [[#CIST root|CIST root]]
		- [[#Regional root|Regional root]]
		- [[#Master bridge|Master bridge]]
	- [[#MSTP Port Roles|MSTP Port Roles]]
	- [[#MSTP Port States|MSTP Port States]]
	- [[#MST BPDUs|MST BPDUs]]
- [[#Working Mechanism of MSTP|Working Mechanism of MSTP]]
	- [[#Basic|Basic]]
	- [[#CIST Calculation|CIST Calculation]]
	- [[#MSTI Calculation|MSTI Calculation]]

## Overview of MSTP

**MSTP** maps one or more VLANs to a Multiple Spanning Tree Instance (**MSTI**), and then calculates the spanning tree based on the MSTI. The VLANs mapped to the same MSTI share the same spanning tree.
![[Pasted image 20260420131451.png]]

- The spanning tree corresponding to MSTI 1 uses SW1 as the root bridge to forward packets of VLAN 1 to VLAN 10.
- The spanning tree corresponding to MSTI 2 uses SW2 as the root bridge to forward packets of VLAN 11 to VLAN 20.
- Packets of different VLANs are forwarded along different paths, implementing load balancing.
*The spanning tree runs based on MSTIs instead of VLANs.*

## Basic Concepts

### MST Region

MSTP divides a switching network into multiple Multiple Spanning Tree (MST) regions, each of which has multiple spanning trees that are independent of each other.

**An MSTP network contains one or more MST regions, and each MST region contains one or more MSTIs.**

The switches in one MST region all share the following characteristics:
- MSTP-enabled
- Same region name
- Same VLAN-MSTI mappings
- Same MSTP revision level

### MSTI

An MST region can contain multiple spanning trees, each of which is called an **MSTI**.

**MSTIs** are identified by IDs. The value ranges from *0 to 4094* on Huawei devices.

Each **MST** region has a VLAN mapping table. The VLAN mapping table maps VLANs to **MSTIs**.

*MSTI 0 exists by default. By default, all VLANs on Huawei switches are mapped to MSTI 0.*

*Each VLAN can be mapped to only one MSTI* 🔼

### CST
*Common Spanning Tree (CST)* connects **all** MST regions on a switching network.
The CST is calculated using a spanning tree protocol, with each MST region being considered as a **single** node.

### IST
*Internal Spanning Tree (IST)* resides within an MST region.
An IST is a special MSTI with an MSTI ID of 0.

### CIST
*Common and Internal Spanning Tree (CIST)* connects all the switches on a switching network and is calculated using a spanning tree protocol.

### SST
*Single Spanning Tree (SST)* - a switch running a spanning tree protocol **belongs to only one spanning tree.**
An MST region has only one switch.

### CIST Root, Regional Root, Master Bridge

#### CIST root
The CIST root is the root bridge of the CIST.
#### Regional root
Regional roots are classified into IST and MSTI regional roots.
The switches that are closest to the CIST root are IST regional roots, for example, SW2, SW3, and SW4 in the figure
An MSTI regional root is the root of the MSTI.
#### Master bridge
The master bridge is the switch closest to the CIST root in a region, for example, SW1, SW2, SW3, and SW4 in the figure. If the CIST root is in an MST region, the CIST root is the master bridge of the region.

![[Pasted image 20260420144840.png]]

### MSTP Port Roles
Root port, designated port, alternate port, backup port, master port, regional edge port, and edge port.

![[Pasted image 20260420153434.png]]

Except edge ports, all ports participate in MSTP calculation.
*A port can play different roles in different MSTIs.*

![[Pasted image 20260420153453.png]]
![[Pasted image 20260420153506.png]]

### MSTP Port States
- **Forwarding**: A port in this state can send and receive BPDUs. It can also forward user traffic and learns MAC addresses.
- **Learning**: A port in this state can send and receive BPDUs. It learns MAC addresses but cannot forward user traffic.
- **Discarding**: A port in this state only receives BPDUs. It does not forward user traffic or learn MAC addresses.

![[Pasted image 20260420151440.png]]

### MST BPDUs
![[Pasted image 20260420151546.png]]
![[Pasted image 20260420151553.png]]

## Working Mechanism of MSTP

### Basic

MSTP can divide the entire Layer 2 network into multiple MST regions. The CST is calculated between regions, and the IST is generated in each region. The CST and ISTs constitute the CIST of the entire switching device network.

```
### 1. "MSTP can divide the entire Layer 2 network into multiple MST regions"

Коммутаторы группируются в регионы на основе трёх одинаковых параметров:

- Имя региона (Region Name).
    
- Номер ревизии (Revision Number).
    
- Таблица маппинга VLAN-ов на инстансы (VLAN-to-Instance Mapping).  
    Только при совпадении этих трёх полей коммутаторы считают, что находятся в одном регионе.
    

### 2. "The CST is calculated between regions"
 
CST (Common Spanning Tree) — это **внешнее** дерево.

- Для CST **целый регион** выглядит как **один виртуальный коммутатор** (Virtual Bridge).
    
- CST строит дерево между этими виртуальными мостами и отдельными свитчами, работающими по старому STP/RSTP. Это гарантирует, что между регионами не возникнет глобальной петли.
    
- **Важное уточнение:** CST не видит, что творится внутри региона, и не управляет VLAN-ами по отдельности.
    

### 3. "The IST is generated in each region"

IST (Internal Spanning Tree, **MSTI 0**) — это **внутреннее** дерево региона.

- Оно существует всегда, даже если вы не создали ни одного пользовательского инстанса (MSTI 1, 2...).
    
- **Критическая функция IST:** Он служит транспортным каналом для передачи BPDU внутри региона, а также обрабатывает все VLAN-ы, которые вы явно не привязали к другим MSTI.
    

### 4. "The CST and ISTs constitute the CIST"

CIST (Common and Internal Spanning Tree) — это сборная солянка. Если представить сеть как папку на компьютере, то путь к файлу будет выглядеть так:

**CIST = CST (путь между папками-регионами) + IST (путь внутри папки-региона)**

Когда пакет BPDU проходит через границу региона, MSTP модифицирует поле стоимости:

- **Внутри региона:** Учитывается **Internal Path Cost** (стоимость пути внутри).
    
- **Выход из региона:** Внешняя стоимость пути (External Path Cost) увеличивается на стоимость выхода.
```

Both the CIST and MSTIs are calculated based on **vectors**, carried in MST BPDUs. Devices exchange MST BPDUs to calculate the CIST and MSTIs.

- Vectors used in CIST calculation:
	- {**Root ID**, **external root path cost**, regional root ID, internal root path cost, designated switch ID, designated port ID, receiving port ID }
- Vectors used in MSTI calculation:
	- {Regional root ID, internal root path cost, designated switch ID, designated port ID, receiving port ID}
- The preceding vectors are listed in descending order of priority from left to right. 
*A smaller vector has a higher priority.*


### CIST Calculation

After comparing the vectors, the switch with the **highest** priority on the entire network is selected **as the CIST root.**

MSTP **calculates an IST** for each MST region, treats each MST region as **a single device**, and **calculates a CST** to interconnect MST regions. The CST and ISTs form a CIST for the entire network.
![[Pasted image 20260420154714.png]]

### MSTI Calculation
In an MST region, MSTP independently calculates an MSTI for each VLAN based on mappings between VLANs and MSTIs

The calculation process is similar to that used by STP to calculate a spanning tree.
![[Pasted image 20260420154749.png]]



*MSTP can recognize RSTP BPDUs and, conversely, RSTP can recognize MSTP BPDUs. However, MSTP and STP cannot recognize each other's BPDUs. To enable devices running different spanning tree protocols to interwork with each other, interfaces of an MSTP-enabled switch connected to devices running STP automatically transition to STP mode; other interfaces continue to work in MSTP mode.*