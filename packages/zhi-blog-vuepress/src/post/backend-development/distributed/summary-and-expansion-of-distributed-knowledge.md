---
title: 分布式架构知识拓展与总结
short_title: ''
description: 本文对分布式架构知识进行了拓展与总结，并对架构演进的历程进行了回顾。
date: 2022-05-04 15:58:49
category:
  - 后端开发
  - 分布式
tag:
  - summary
  - rpc
article: true
timeline: false
---
## 架构的演进历程

![image-20220504160316706](https://img1.terwer.space/image-20220504160316706.png)

## 分布式理论

### CAP理论

![image-20220504203039453](https://img1.terwer.space/image-20220504203039453.png)

正常情况，写入A1，同步到A2，这样的话，A1和A2都能读取到最新的数据。



但是网络如果不可靠

![image-20220504203142983](https://img1.terwer.space/image-20220504203142983.png)

A1和A2会变成两个子网



![image-20220504203356840](https://img1.terwer.space/image-20220504203356840.png)

保证A和P

![image-20220504203532493](https://img1.terwer.space/image-20220504203532493.png)



保证C和P

![image-20220504203635977](https://img1.terwer.space/image-20220504203635977.png)

redis属于AP



实际应该考虑的是数据同步测时延。

### PACELC理论

![image-20220504204143076](https://img1.terwer.space/image-20220504204143076.png)

### BASE理论

![image-20220504204427962](https://img1.terwer.space/image-20220504204427962.png)

![image-20220504204802646](https://img1.terwer.space/image-20220504204802646.png)

![image-20220504205222887](https://img1.terwer.space/image-20220504205222887.png)

![image-20220504205604773](https://img1.terwer.space/image-20220504205604773.png)

微服务不适合ZK

![image-20220504205632243](https://img1.terwer.space/image-20220504205632243.png)

Eureka和Nacos比较好

![image-20220504205812526](https://img1.terwer.space/image-20220504205812526.png)

## 分布式一致性协议

 2PC、3PC、TCC

[分布式事务（2PC 3PC TCC 最终一致性）](https://juejin.cn/post/6912462666187407367)

## 分布式系统设计策略

![image-20220504212121968](https://img1.terwer.space/image-20220504212121968.png)



![image-20220504212350566](https://img1.terwer.space/image-20220504212350566.png)



高可用SLA

![image-20220504213203488](https://img1.terwer.space/image-20220504213203488.png)

gRPC

[thrift](https://github.com/apache/thrift)