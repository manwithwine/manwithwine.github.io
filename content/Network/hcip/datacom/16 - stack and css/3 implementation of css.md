A cluster switch system (CSS) combines two clustering-capable switches into a single logical switch. A CSS is also called a cluster

CSS is used on **modular switches**
Stack is used on **fixed switches.**

![[Pasted image 20260421113302.png]]

## Basic Concepts

Switches in a CSS are CSS members. Every CSS member plays one the following roles:
- **Master switch**: manages the CSS. 
- **Standby switch**: acts as a backup to the master switch. 

**CSS ID**: uniquely identifies a CSS member.

**CSS link**: is dedicated to setting up a CSS for data communication between the CSS master and standby switches.

**CSS priority**: determines the role of a CSS member in role election. A larger value indicates a higher priority. CSS

## Physical Connections of a CSS

1. **Traditional CSS**: CSS cards on **MPUs** or service ports on **LPUs** are connected to set up a CSS.
2. **Cluster Switch System Generation 2 (CSS2)**: CSS cards on switch fabric units (**SFUs**) are connected to set up a CSS.

---
---
---

Вот главные преимущества CSS2 простыми словами:

1. **Беспрецедентная живучесть (1+N Backup)** 
    
    - **Проблема старого CSS:** Если в "ведомом" коммутаторе ломалась главная плата (мозг), он выключался, и кластер разваливался.
        
    - **Решение CSS2:** Теперь кластеру всё равно, в каком коммутаторе работает мозг. Пока жива хотя бы одна управляющая плата в _любом_ из двух корпусов, система продолжает работать. Демонстрировался эксперимент, где из кластера вынимали 3 платы из 4, и трафик шел без потерь
        
2. **Молниеносная скорость (Низкая задержка)**
    
    - Раньше пакетам приходилось идти через медленные интерфейсы. В CSS2 коммутаторы соединены "спина к спине" через сверхбыструю внутреннюю шину. Это дает минимальную задержку при передаче данных между корпусами (указано значение до 4 микросекунд)
        
3. **Простота сборки**
    
    - В CSS2 достаточно воткнуть кабель в нужный порт на плате коммутации, и кластер почти готов. В старых версиях настройка соединения через сервисные порты была технически сложнее