# Типы BGP-сеансов

BGP поддерживает несколько типов сессий для разных целей.

---

## eBGP (External BGP)

- Между **разными AS**.
- По умолчанию TTL=1 (защита от подделки).
- Изменяет AS_PATH (добавляет свой AS).
- Изменяет NEXT_HOP (на себя).
- Передаётся по **непосредственному подключению** (физически или логически через loopback + multihop).

> 🔐 Для безопасности — используй `ebgp-multihop` только когда нужно.

---

## iBGP (Internal BGP)

- Между роутерами **внутри одной AS**.
- TTL не уменьшается.
- **AS_PATH не изменяется**.
- **NEXT_HOP не изменяется** по умолчанию → нужен IGP или `next-hop-self`.

### Ограничения iBGP

- **Не транслирует** маршруты между iBGP-соседями (нет "iBGP split horizon").
- Требует **full mesh** или альтернативы.

> ❗ Каждый iBGP-сусед должен "увидеть" маршрут от eBGP-соседа.

---

## Масштабирование iBGP: Route Reflectors

**Route Reflector (RR)** позволяет избежать full mesh.
```aiignore
   [ RR ]
  /   |   \
[C1] [C2] [C3]
```




- RR получает маршрут от клиента → отправляет другим клиентам.
- Обязательные атрибуты:
  - `ORIGINATOR_ID` — router-id источника.
  - `CLUSTER_LIST` — список cluster.

> ✅ Поддерживается всеми вендорами: Cisco, Juniper, Nokia, FRR и др.

---

## Confederations

Подразделяет большую AS на под-AS, используя **внутренний eBGP**.

```text
AS 64500:
  Sub-AS: 64501, 64502, 64503
```
- Внутри sub-AS — iBGP или RR.
- Между sub-AS — eBGP (но видно как iBGP внешним).

⚠️ Сложнее в настройке, но скрывает внутреннюю структуру.

## Логическая сессия (Loopback)
BGP-сессия часто идёт между loopback-интерфейсами:

- Высокая доступность.
- Независимость от физического интерфейса.
```aiignore
R1:
 neighbor 10.0.0.2 remote-as 64500
 neighbor 10.0.0.2 update-source loopback0

R2:
 neighbor 10.0.0.1 remote-as 64500
 neighbor 10.0.0.1 update-source loopback0
```

Требуется IGP для достижения loopback.

## Multihop eBGP
Иногда eBGP не на прямом линке:
```aiignore
R1 (AS1) — SW — R2 (AS2)
```
Настройка:
```aiignore
# Cisco
neighbor X.X.X.X ebgp-multihop 2

# Juniper
multipath multiple-as;
peer-as 64500;
local-address 10.0.0.1;
🔐 Используй GTSM (Generalized TTL Security) для защиты.
```
