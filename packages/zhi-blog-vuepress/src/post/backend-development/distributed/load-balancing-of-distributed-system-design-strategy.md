---
title: 分布式系统设计策略之负载均衡
short_title: ''
description: 使用多台服务器共同分担计算任务，将网络请求与计算分配到集群可用的不同服务器节点上，从而达到高可用性以及良好的操作体验。
date: 2022-05-04 17:11:40
category:
  - 后端开发
  - 分布式
tag:
  - load
  - banance
article: true
timeline: false
---
### 负载均衡

使用多台服务器共同分担计算任务，将网络请求与计算分配到集群可用的不同服务器节点上，从而达到高可用性以及良好的操作体验。

![image-20220411213300347](https://img1.terwer.space/image-20220411213300347.png)

Client1、Client2、Client3通过负载均衡分配到不同的节点上。

负载均衡有硬件解决方案，也有软件解决方案。硬件解决方案有著名的F5，软件有LVS、HAProxy、Nginx等。

LVS：[https://www.cnblogs.com/liwei0526vip/p/6370103.html](https://www.cnblogs.com/liwei0526vip/p/6370103.html)

HAProxy：[http://www.haproxy.org/](http://www.haproxy.org/)

以Nginx为例，负载均衡一般有以下6中策略：

| 方式               | 说明                                                         |
| ------------------ | ------------------------------------------------------------ |
| 轮询               | 默认方式，每个请求按照时间顺序逐一分配到后端服务器           |
| weight             | 权重方式，在轮询基础上，指定轮询的几率，权重越大，接收的请求越多 |
| ip_hash            | 根据ip分配方式，相同的客户端一直发送到相同的服务器，可以保证Session |
| least_conn         | 最少连接方式，把请求转发到请求书较少的后端服务器             |
| fail（第三方）     | 响应时间方式，根据服务端响应时间分配请求，响应时间短的优先分配 |
| url_hash（第三方） | 根据URL分配方式，按照URL的hash结果分配请求，使得同一个url定向到同一个后端服务器 |