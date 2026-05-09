# BGP-сообщения и разбор пакетов

BGP использует 4 типа сообщений:

- OPEN
- UPDATE
- NOTIFICATION
- KEEPALIVE

Рассмотрим их форматы и примеры из Wireshark.

---

## Общий формат BGP-сообщения

| Поле             | Размер (байт) | Описание |
|------------------|--------------|--------|
| Marker          | 16           | 0xFF... для синхронизации |
| Length          | 2            | Общая длина (мин 19) |
| Type            | 1            | 1=OPEN, 2=UPDATE и т.д. |

> 💡 Marker всегда 16 байт `0xFFFF...`, используется как синхронизация потока.

---

## 1. OPEN-сообщение (Type 1)

Инициирует BGP-сессию.

### Формат:

| Поле               | Размер |
|--------------------|--------|
| Version            | 1 (обычно 4) |
| My Autonomous System | 2    |
| Hold Time          | 2 (секунды) |
| BGP Identifier     | 4 (router-id) |
| Optional Parameters Length | 1 |
| Optional Parameters | переменная |
---

## 2. UPDATE-сообщение (Type 2)

Основное сообщение — передача префиксов.

### Формат:

| Поле                     | Описание |
|--------------------------|--------|
| Unfeasible Routes Length | Длина списка удаляемых маршрутов |
| Withdrawn Routes         | Список префиксов для удаления |
| Total Path Attribute Length | Длина атрибутов |
| Path Attributes          | ORIGIN, AS_PATH и др. |
| Network Layer Reachability Information (NLRI) | Новые префиксы |

### Пример разбора

**Удаление маршрута:**
- Withdrawn Routes: `192.0.2.0/24`

**Добавление маршрута:**
- AS_PATH: `64500, 3356`
- NEXT_HOP: `10.0.0.2`
- NLRI: `203.0.113.0/24`

> 🧩 MP-BGP использует **MP_REACH_NLRI** и **MP_UNREACH_NLRI** для IPv6, VPN и др.

---

## 3. NOTIFICATION (Type 3)

Отправляется при ошибке. Примеры:

| Error Code       | Subcode           |
|------------------|-------------------|
| Message Header   | Connect not synchronized |
| OPEN Message     | Unsupported version |
| UPDATE Message   | Invalid AS_PATH |
| Hold Timer Expired | — |

Пример: `Error: 4 (Hold Timer Expired), Subcode: 0`

---

## 4. KEEPALIVE (Type 4)

- Длина 19 байт.
- Нет полезной нагрузки.
- Отправляется каждые **hold-time / 3**.

---

## Finite State Machine (FSM)

BGP-сессия проходит 6 состояний:

1. **Idle** — процесс запущен.
2. **Connect** — ожидание TCP.
3. **Active** — попытка подключения.
4. **OpenSent** — отправлен OPEN.
5. **OpenConfirm** — получен OPEN.
6. **Established** — обмен UPDATE.

> 🔄 Если ошибка — возвращается в Idle.

---