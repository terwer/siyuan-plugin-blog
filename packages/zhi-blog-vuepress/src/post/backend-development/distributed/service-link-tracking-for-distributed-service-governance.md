---
title: 分布式服务治理之服务链路追踪
short_title: ''
description: 分布式微服务架构上是通过业务来划分服务的，通过Rest调用对外暴露一个接口，可能需要很多服务协同才能完成这个接口的功能。
date: 2022-05-04 17:31:48
category:
  - 后端开发
  - 分布式
tag:
  - rpc
  - service
  - link
  - tracking
article: true
timeline: false
---
### 服务链路追踪

##### 什么是服务链路追踪

分布式微服务架构上是通过业务来划分服务的，通过Rest调用对外暴露一个接口，可能需要很多服务协同才能完成这个接口的功能。

如果链路上任何一个服务出现问题或者出现网络超时，都会导致接口调用失败。随着业务的扩张，接口调用会越来越复杂。

![image-20220412151845220](https://img1.terwer.space/image-20220412151845220.png)

极端情况：

![image-20220412151924192](https://img1.terwer.space/image-20220412151924192.png)

分布式链路追踪（Distributed Tracing），也叫分布式链路跟踪，分布式跟踪，分布式追踪等，指的是将一次分布式请求还原成调用链路。

显示的是后端一次分布式请求的调用情况，比如各个节点上的耗时、请求具体到达了那些机器、每个服务节点的请求状态等等。

##### 链路追踪具备的功能

1. 快速故障定位

   通过调用链追踪，一次请求的逻辑轨迹可以完整的展示处理。开发中可以在业务日志中添加调用链路ID，可以通过调用链加上业务日志快速定位排查错误信息。

   ![image-20220412152736619](https://img1.terwer.space/image-20220412152736619.png)

2. 各个调用环节的性能分析

   在调用链的各个环节，分别添加调用时延，可以分析系统性能瓶劲，有针对性的进行性能优化。

   通过分析各个环节的平均时延，QPS等信息，可以找到系统的薄弱环节，对模板进行调整。

   ![image-20220412154336064](https://img1.terwer.space/image-20220412154336064.png)

3. 数据分析

   调用链绑定业务后，通过查看每条业务数据对应的链路信息，可以得到用户的行为路径，经过了哪些服务器上的哪些服务，进行汇总分析。

4. 生成服务调用拓扑图

   通过可视化分布式系统的模块，和他们之间的相互联系，来理解系统拓扑。

   点击节点会展示模块的详情，比如当前的状态和请求数量。

##### 链路跟踪设计原则

1. 设计目标

   - 低侵入性，应用透明
   - 低损耗
   - 大范围部署，扩展性

2. 埋点和生成日志

   埋点即系统在当前节点的上下文信息，可以分为客户端埋点、服务端埋点，以及客户端和服务端双向型埋点。埋点日志通常包含以下内容：

   traceId、RPCId、调用的开始时间、调用类型、协议类型、调用方ip和端口，请求的服务名等信息，调用耗时、调用结果、异常信息、消息报文等。

3. 抓取和存储日志

   一般采用离线+实时的方法去存储日志，主要是分布式日志的采集。典型的方案是Flume结合Kafka。

4. 分析和统计调用链数据

   首先按照traceId汇总日志，然后按照rpcId对调用链进行顺序整理。调用链不要求100%准确，允许部分日志丢失。

5. 计算和展示

   汇总到各个调用链的日志之后，可以有针对性的进行业务线的分析。

   需要对具体的日志进行整理，进一步储存在HBase或者关系型数据库中，进行可视化查询。

##### 链路跟踪trace模型

trace调用模型，有以下几个概念：

![image-20220412160143642](https://img1.terwer.space/image-20220412160143642.png)

Client && Server：

对于跨服务的一次调用，请求发起方为client，服务提供方为server，关系如下：

![image-20220412160401367](https://img1.terwer.space/image-20220412160401367.png)

**链路跟踪的系统实现**

Google的Dapper：[https://github.com/bigbully/Dapper-translation](https://github.com/bigbully/Dapper-translation)

Twitter的zipkin：[https://github.com/openzipkin/zipkin](https://github.com/openzipkin/zipkin)

淘宝的鹰眼：[https://www.infoq.cn/article/kmpztgjqs7vjc5vkvcr2](https://www.infoq.cn/article/kmpztgjqs7vjc5vkvcr2)

新浪的Watchman：[https://www.infoq.cn/article/weibo-watchman](https://www.infoq.cn/article/weibo-watchman)

京东的Hydra：[https://github.com/odenny/hydra](https://github.com/odenny/hydra)