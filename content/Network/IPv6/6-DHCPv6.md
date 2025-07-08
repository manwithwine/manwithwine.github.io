# DHCPv6

**DHCPv6 (Dynamic Host Configuration Protocol for IPv6)** — это протокол для динамического назначения IPv6-адресов и сетевых параметров.\
В отличие от [SLAAC](5-SLAAC.md), он предоставляет полный контроль над конфигурацией сети.

Использует UDP порт 546/547

## Типы DHCPv6
- **Stateful** - выдаёт IPv6-адреса + дополнительные параметры (DNS, NTP)
- **Stateless** - выдаёт только параметры (DNS, NTP), адреса — через SLAAC

## Сообщения DHCPv6
| Тип | Название            | Назначение                                 | Когда используется? |
|:----|:--------------------|:-------------------------------------------|:--------------------|
| 1   | Solicit             | Поиск DHCPv6-серверов                      | Stateful/Stateless  |
| 2   | Advertise           | Ответ сервера на Solicit                   | Stateful/Stateless  |
| 3   | Request             | Запрос конфигурации                        | Stateful            |
| 4   | Confirm             | Проверка актуальности адреса               | Stateful            |
| 5   | Renew               | Продление аренды                           | Stateful            |
| 6   | Rebind              | Повторный запрос при недоступности сервера | Stateful            |
| 7   | Reply               | Ответ сервера на запросы                   | Stateful/Stateless  |
| 8   | Release             | Освобождение адреса                        | Stateful            |
| 9   | Decline             | Отказ от адреса (дубликат)                 | Stateful            |
| 10  | Reconfigure         | Уведомление сервером клиента об изменениях | Только Stateful     |
| 11  | Information-Request | Запрос параметров (без адреса)             | Только Stateless    |
| 12  | Relay-Forward       | Пересылка запроса через relay-agent        | Для ретрансляции    |
| 13  | Relay-Reply         | Ответ через relay-agent                    | Для ретрансляции    |

Вспоминаем [флаги](4-NDP.md#флаги) в RA сообщении.

### Процесс работы Stateful DHCPv6
- Хост отправляет Solicit на ff02::1:2 (все DHCPv6-серверы/агенты).
- Сервер отвечает Advertise (если может предоставить конфигурацию).
- Хост выбирает сервер и отправляет Request.
- Сервер подтверждает выделение адреса через Reply.

### Процесс работы Stateless DHCPv6
- Хост получает RA с флагом O=1.
- Отправляет Information-Request (тип 11) на сервер.
- Сервер отвечает Reply с параметрами.

## Параметры DHCPv6

| Код | Параметр                   | Описание                                         |
|-----|----------------------------|--------------------------------------------------|
| 1   | Client Identifier          | DUID клиента                                     |
| 2   | Server Identifier          | DUID сервера                                     |
| 5   | IA_NA                      | Identity Association for Non-temporary Addresses |
| 23  | DNS Recursive Name Server  | Адреса DNS-серверов                              |
| 24  | Domain Search List         | Список доменов для поиска                        |

### DUID (DHCP Unique Identifier)

Идентификатор устройства в DHCPv6.\
Форматы:

- DUID-LLT: Link-Layer + Time (наиболее распространён):
  - **DUID-Type** (1): Фиксированное значение 0x0001 для DUID-LLT.
  - **Hardware Type**: Аналог ARP-типа (например, 0x0001 для Ethernet).
  - **Time**: UNIX-время (секунды с 01.01.2000) генерации DUID.
  - **Link-Layer Address**: MAC-адрес интерфейса.
    - **Time** _предотвращает конфликты DUID при:_
        - _Смене MAC-адреса._
        - _Переносе конфигурации на другой сервер._
    - **Hardware Type** _обеспечивает совместимость с разными интерфейсами (Ethernet, Wi-Fi, PPP)._
- DUID-LL: Только MAC-адрес 
- DUID-EN: Vendor-based
- DUID-UUID: 128-битный UUID (VM)


### Отличия от DHCPv4
| Параметр          | DHCPv4          | DHCPv6          |
|:------------------|:----------------|:----------------|
| Транспорт         | UDP 67/68       | UDP 546/547     |
| Multicast         | Нет             | ff02::1:2       |
| Stateless         | Нет             | Есть            |
| Идентификация     | MAC             | DUID            |


