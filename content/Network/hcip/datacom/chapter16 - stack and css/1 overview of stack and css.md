## Overview

![[Pasted image 20260420172456.png]]

Generally, **modular switches** set up a **CSS**, and **fixed switches** set up a **stack**. 

**Only two switches** are supported in a **CSS**. The stack and CSS can be used together with link aggregation to build a highly reliable and loop-free campus network.

## Architecture

![[Pasted image 20260420172851.png]]

By leveraging the stack or CSS technique, multiple independent switches are virtualized into a single logical switch. Generally, fixed switches at the access or aggregation layer set up a stack, and modular switches at the aggregation or core layer set up a CSS.

Eth-Trunks can be deployed between logical switches to achieve high reliability, **without the need** to deploy STP or VRRP.

## Advantages
- Stack and CSS effectively improve resource utilization, forwarding performance, and link bandwidth
- Stack and CSS simplify network planning and management.
- Stack and CSS greatly reduce the service interruption time.

