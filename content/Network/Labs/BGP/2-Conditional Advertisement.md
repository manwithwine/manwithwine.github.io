# Conditional Advertisement

[russo-bgp-iol](https://ccie-sp.gitbook.io/ccie-spv5.1-labs/labs/bgp/conditional-advertisement)

В чем задача:
1. Анонсировать дефолт от R4 и R5 в сторону R6.
2. R6 должен предпочитать деофолт через R4.
3. Настроить R6 так, чтобы он анонсил IPv4/v6 лупбеки адреса в сторону R5, если дефолт через R4 пропал.

Решение:
1. Анонсировать дефолт просто - в нужной AF на нужного соседа добавить команду - default-originate
2. Я не понял, каким образом это сдела создатель лабы, я просто добавил префикс лист с пермитом на дефолт, дальше через роут-мапу - set weight 500 на R4 соседа.
3. Тут вступает в игру функционал Conditional Advertisement (non-exist-map или exist-map):
```aiignore
При использовании non-exist-map префикс объявляется только при невыполнении условия роут=мапы. 
При использовании exist-map префикс объявляется только при выполнении условия роут-мапы.
```
То есть получаем:
```aiignore
# пермитим дефолт
ip prefix-list V4_DEFAULT permit 0.0.0.0/0
!
# пермитим лупбук, который нужно анонсировать
ip prefix-list V4_ADVERTISE permit 192.0.2.6/32 
!
# создаем комьюнити, который будем вешать на R4
ip community-list standard R4_DEFAULT permit 65006:4
!
# создаем роутмапы
route-map V4_DEFAULT_VIA_R4
 match ip addr prefix V4_DEFAULT
 match community R4_DEFAULT
!
route-map V4_ADVERTISE
 match ip addr prefix V4_ADVERTISE 
!
router bgp 65006
 add ipv4
  # анонсируй роут-мапу с лупбеком в сторону R5, если не выполняется условие роутмапы с дефолтом через R4
  neighbor 10.5.6.5 advertise-map V4_ADVERTISE non-exist-map V4_DEFAULT_VIA_R4
```

