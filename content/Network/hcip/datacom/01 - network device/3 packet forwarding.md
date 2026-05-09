- [[#Types of packets|Types of packets]]
- [[#Proccessing of Service Packets|Proccessing of Service Packets]]
- [[#Processing of Protocol Packets|Processing of Protocol Packets]]

![[Pasted image 20260413125559.png]]

## Types of packets

1. **Service packets** - device only forwards service packets from one interface to another interface based on forwarding entries.
2. **Protocol packets** - after receiving protocol packets (such as ARP, OSPF, and BGP packets), the device sends the packets to the control plane for processing. For example, the ARP packets are sent to the control plane for processing. After determining whether to respond to the ARP packets, the device determines whether to learn the source MAC address and source IP address in the ARP packets.
## Proccessing of Service Packets

1. After service packets enter the uplink LPU from an interface, they are sent to the SFU through the internal bus of the modular switch. The SFU sends the service packets to the downlink LPU for processing and then sends them out from the interface.
![[Pasted image 20260413130209.png]]

2. When a packet enters an LPU, the device determines the outbound interface of the packet based on the forwarding entry (such as the IP routing table and MAC address table). For a modular switch, the downlink LPU needs to be determined. When the packet reaches the SFU, the outbound interface and downlink LPU are specified. Therefore, the forwarding entry is queried on the uplink LPU
![[Pasted image 20260413130244.png]]

#Question ==Both the MPU and LPU have CPUs and provide the control plane function. Are forwarding entries stored and queried on the MPU or LPU?==
#Answer *Forwaring entries stored and queried on the LPU.*

Forwarding entries are stored on the LPU. After packets enter the LPU, the LPU directly queries the packets, improving the packet forwarding efficiency. Forwarding entries are stored on all LPUs, causing high resource usage on the control plane.

![[Pasted image 20260413132518.png]]

Conclusion:
**Service packets** of high-end devices are not processed by the CPU of the #MPU, and forwarding information is queried by the #LPU.

The forwarding information on the #LPU does not exist in forwarding entries (such as the IP routing table and MAC address table) of the #MPU. After generating forwarding entries, the #MPU generates corresponding forwarding information and delivers the information to the #LPU.

![[Pasted image 20260413132645.png]]

## Processing of Protocol Packets

Protocol packets received by a device, such as OSPF packets, IS-IS packets, BGP packets, ARP packets, STP BPDUs, and ICMP Request packets, need to be processed by the control plane of the device. That is, these packets are sent to the CPU of the MPU for processing.
![[Pasted image 20260413133041.png]]

**1. Обработка служебных сообщений**

> _После получения служебных пакетов центральный процессор (MPU) обрабатывает их. Если нужно ответить, управляющая плата формирует ответ._

- **Суть:** Когда приходит специальное служебное сообщение (например, запрос «кто такой 192.168.1.1?»), его изучает **главный мозг** устройства — центральный процессор (MPU). Если ответить нужно именно «мозгу», он сам формирует ответ. Простые данные (видео с YouTube) «мозг» не обрабатывает.

**2. Защита процессора от перегрузки**

> _Мощность процессора MPU ограничена. Если на него послать слишком много служебных пакетов, он зависнет и не сможет отвечать вовремя. Поэтому скорость отправки таких пакетов на процессор по умолчанию ограничена._

- **Суть:** У «мозга» слабое железо по сравнению с чипами для пересылки данных. Если хакеры или вирус забросают устройство миллионом служебных запросов в секунду, процессор упадет в обморок и устройство перестанет слушаться команд. Поэтому стоит защита — **ограничение скорости** (rate-limit), чтобы поток мусора не задавил главный процессор.

**3. Как устройство понимает, что пакет нужно отдать «мозгу», а не гнать дальше в порт**

> *Когда чип пересылки (PFE/NP/ASIC) разбирает пакет, он смотрит на заголовки второго уровня или IP-адрес получателя. Если это специальный протокол (ARP, IS-IS, LLDP и т.д.) или адрес из диапазона 224.0.0.1–224.0.0.255 (зарезервировано для служебных нужд маршрутизации), такой пакет не нужно пересылать по таблице маршрутизации дальше в сеть. Его нужно отдать процессору.*

- **Суть:** Это описание **фильтра**.
    
    - Если пришло видео (обычные данные) — гоним дальше.
    - Если пришел адрес **224.0.0.5** (это говорит протокол OSPF для маршрутизаторов) — **стоп!** Дальше в интернет не слать, это внутренний служебный разговор для самого устройства. Отдать «мозгу».

**4. Особый путь для некоторых протоколов (BGP)**

> _Обычно пакет заходит на входную плату (LPU), уходит на матрицу коммутации (SFU), а потом на выходную плату. Но для служебных пакетов типа BGP, которые идут на сам маршрутизатор, ответ такой: «Номер выходной платы тот же, что и у входной платы, а выходной интерфейс — это процессор». То есть пакет физически никуда через SFU на другие платы не уходит, а поднимается на процессор на той же самой плате._

- **Суть:** Устройство большое, модульное (много плат с портами). Автор объясняет маршрут пакета внутри коробки.
    
    - **Обычный трафик:** Зашел в плату №1 → прошел через фабрику коммутации → вышел из платы №5.
    - **Служебный пакет (BGP):** Зашел в плату №1 → пошел на «мозг» той же платы №1. Он **не пересекает** центральную фабрику (SFU). Это экономит ресурсы и ускоряет работу.

**5. Короткий итог**

> _Для протоколов, которые можно распознать по заголовку или IP, входная плата отправляет их прямиком в процессор._

- **Суть:** Резюме пункта 4 — если пакет адресован самому устройству, дальше входной платы он никуда не идет, а сразу попадает в процессор.


