When multiple routes to the same destination network segment exist, BGP selects routes in the following sequence:
1. Discards the route whose next hop is unreachable.
```
2. Prefers the route with the largest Preferred-Value attribute value. (Huawei Only)
3. Prefers the route with the largest Local_Preference value.
  
  ↑ A larger value indicates a better route.
```
4. Prefers the locally originated BGP route, which takes precedence over the route learned from a peer. The locally summarized route, automatically summarized route, route learned by using the network command, route learned by using the import-route command, and route learned from a peer are in descending order of priority.
```
5. Prefers the route with the shortest AS_Path.
6. Prefers the route with the optimal Origin. The routes with Origin attributes of IGP, EGP, and Incomplete are in descending order of priority.
7. Prefers the route with the lowest MED.
8. Prefers routes learned from EBGP peers to routes learned from IBGP peers.
9. Prefers the route with the smallest IGP metric to the next hop.
10. Prefers the route with the shortest Cluster_List length.
11. Prefers the route advertised by the device with the smallest router ID (Originator_ID).
12. Prefers the route learned from the peer with the smallest IP address.
   
  ↓ A smaller value indicates a better route. 
  If the preceding eight attributes are the same, routes work in load balancing mode.  
```

## Conditions for Load Balancing Among Equal-Cost BGP Routes

⚫ The Preferred-Value attribute values are the same. 
⚫ The Local_Preference attribute values are the same. 
⚫ All the routes are summarized or non-summarized routes. 
⚫ The length of the AS_Path attribute are the same. 
⚫ Origin types (IGP, EGP, or incomplete) are the same. 
⚫ The MED attribute values are the same. 
⚫ All the routes are EBGP or IBGP routes. 
⚫ The IGP metric values within an AS are the same. 
⚫ AS_Path attribute values are the same.

## Configuring BGP Load Balancing

```
bgp 200
	maximum load-balancing ibgp 2
```

display RIB:
```
display ip routing-table
```

display BGP routing table:
```
display bgp routing-table
```