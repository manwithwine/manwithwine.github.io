# NDP

**NDP** (RFC 4861) — это ключевой протокол IPv6, заменяющий ARP, DHCP (частично) и ICMP-функции из IPv4.\
Работает через ICMPv6 и использует multicast для эффективного обнаружения соседей.

## Основные функции NDP

| Функция                      | Аналог в IPv4              | Как работает в IPv6?                                                 |
|:-----------------------------|:---------------------------|:---------------------------------------------------------------------|
| Разрешение MAC-адресов       | ARP                        | Neighbor Solicitation/Advertisement (через Solicited-Node Multicast) |
| Обнаружение маршрутизаторов  | DHCP + Router Solicitation | Router Solicitation/Advertisement                                    |
| Автоконфигурация адресов     | DHCP                       | SLAAC (Stateless Address Autoconfiguration)                          |
| Обнаружение дубликатов (DAD) | Нет аналога                | Neighbor Solicitation с :: как source                                |
| Перенаправление маршрутов    | ICMP Redirect              | ICMPv6 Redirect                                                      |

## Типы сообщений ICMPv6 в NDP

| Сообщение                   | Тип ICMPv6 | Назначение                                      |
|:----------------------------|:-----------|:------------------------------------------------|
| Router Solicitation (RS)    | 133        | Запрос информации о маршрутизаторах             |
| Router Advertisement (RA)   | 134        | Рассылка параметров сети (префикс, MTU, DHCPv6) |
| Neighbor Solicitation (NS)  | 135        | Поиск MAC по IPv6 (аналог ARP)                  |
| Neighbor Advertisement (NA) | 136        | Ответ с MAC-адресом                             |
| Redirect                    | 137        | Указание оптимального маршрута                  |

Про [NS/NA](3-Multicast.md#пример-процедуры-выяснения-mac-адреса-соседа-в-ipv6) и [DAD](3-Multicast.md#как-работает-dad)

### RS

**Отправляется на**: ff02::2 (все маршрутизаторы)
**Основные поля**:
- Source Address: Link-local адрес хоста (или ::, если адрес ещё не назначен). 
- Destination Address: ff02::2. 
- ICMPv6 Options:
  - Source Link-Layer Address (если есть): MAC-адрес отправителя (опционально).

Назначение:
Хост запрашивает у маршрутизаторов информацию о сети (**префиксы, параметры DHCPv6, MTU**).

### RA

**Отправляется на**: ff02::1 (все хосты) или unicast (в ответ на RS).
**Основные поля**:
- Current Hop Limit: Рекомендуемый TTL для исходящих пакетов (обычно 64). 
- Flags (1 байт):
  - M (Managed): 1 = Использовать DHCPv6 для адресов. 
  - O (Other): 1 = DHCPv6 для других параметров (DNS, NTP). 
  - Router Lifetime: Время (в секундах), на протяжении которого маршрутизатор считается default gateway.
- Reachable Time: Время, в течение которого хост считает соседей доступными.
- Retrans Timer: Таймер повторной отправки NS. 
- ICMPv6 Options:
  - Source Link-Layer Address: MAC маршрутизатора. 
  - Prefix Information: Сетевые префиксы для SLAAC (например, 2001:db8::/64). 
  - MTU: Рекомендуемый размер MTU. 
  - Route Information: Дополнительные маршруты.

#### Флаги:

| M (Managed) | O (Other) | Режим конфигурации                 |
|:------------|:----------|:-----------------------------------|
| 0           | 0         | Только SLAAC                       | 
| 0           | 1         | SLAAC + DHCPv6 (Stateless)         | 
| 1           | 0         | Только DHCPv6 (Stateful)           | 
| 1           | 1         | DHCPv6 (Stateful + доп. параметры) | 


### Redirect

**Отправляется на**: Unicast (конкретному хосту).
**Основные поля**:
- Target Address: Лучший next-hop для цели (например, другой маршрутизатор). 
- Destination Address: IPv6-адрес цели, для которой нужно изменить маршрут. 
- ICMPv6 Options:
  - Target Link-Layer Address: MAC next-hop. 
  - Redirected Header: Первые 1280 байт оригинального пакета.

**Пример сценария**:

1. Хост отправляет пакет на 2001:db8::99 через маршрутизатор R1. 
2. R1 обнаруживает, что оптимальный путь — через R2. 
3. R1 отправляет Redirect хосту:
```
Target Address: fe80::1 (R2)  
Destination Address: 2001:db8::99  
Target MAC: 00:11:22:33:44:55  
```

## Безопасность (SEcure Neighbor Discovery, SEND)

Защита от спуфинга через:

- Cryptographically Generated Addresses (CGA). 
- RSA-подписи в NA/NS.