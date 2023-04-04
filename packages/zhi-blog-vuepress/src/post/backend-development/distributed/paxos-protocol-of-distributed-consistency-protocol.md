---
title: 分布式一致性协议之Paxos协议
short_title: ''
description: Paxos协议说的是Paxos算法，Paxos算法是基于消息传递且具有高容错性的一致性算法，是目前公认的解决分布式一致性问题最有效的算法之一。
date: 2022-05-04 16:41:07
category:
  - 后端开发
  - 分布式
tag:
  - rpc
  - paxos
article: true
timeline: false
---
### Paxos协议

#### 什么是Paxos

Paxos协议说的是Paxos算法，Paxos算法是基于消息传递且具有高容错性的一致性算法，是目前公认的解决分布式一致性问题最有效的算法之一。

为描述Paxos算法，Lamport（Leslie Lamport）虚拟了一个叫做Paxos的[希腊城邦](https://zh.wikipedia.org/wiki/希臘城邦)，这个岛按照议会民主制的政治模式制订法律，但是没有人愿意将自己的全部时间和精力放在这种事情上。所以无论是议员，议长或者传递纸条的服务员都不能承诺别人需要时一定会出现，也无法承诺批准决议或者传递消息的时间。但是这里假设没有[拜占庭将军问题](https://zh.wikipedia.org/wiki/拜占庭将军问题)（Byzantine failure，即虽然有可能一个消息被传递了两次，但是绝对不会出现错误的消息）；只要等待足够的时间，消息就会被传到。另外，Paxos岛上的议员是不会反对其他议员提出的决议的。

Paxos自问世以来，持续垄断了分布式一致性算法，Paxos这个名词几乎等同于分布式一致性。

Google的很多大型分布式系统都采用Paxos算法来解决分布式一致性问题，如Clubby，MegaStore以及Spanner等。

开源的Zookeeper、MySQL5.7推出的用来解决传统主从复制的MySQL Group Replication等纷纷采用Paxos解决分布式一致性问题。

Paxos最大的特点是难，不仅难以理解，更难以实现。

Google Clubby的作者Mike  Burrows说过，这个世界上只有一种一次性算法，那就是Pacos，其他的都是残次品。

参考

https://www.youtube.com/watch?v=d7nAGI_NZPk

#### Paxos解决了什么问题

![image-20220402215128541](https://img1.terwer.space/image-20220402215128541.png)

在常见的分布式系统中，总会发生机器宕机或者网络异常（包括消息的延迟、丢失、重复、乱序还有网络分区）。

Paxos算法需要解决的问题是，如何在一个可能发生上述异常的系统中，快速且正确的在集群内部，对某个数据的值达成一致。并且保证不论发生以上任何异常，都不会破坏整个系统的一致性。

这个某个数据值，并不是狭义上的某个数，他可以是一条日志，也可以是一条命令（Command）。根据应用场景不同，某个数据的值有不同的含义。

之前讲的2PC和3PC可以在一定程度上保证数据一致性。但是没有完全解决的是协调者宕机的问题。

![image-20220402220433578](https://img1.terwer.space/image-20220402220433578.png)

#### 如何解决2PC和3PC的问题？

引入多个协调者

![image-20220402220547900](https://img1.terwer.space/image-20220402220547900.png)

引入主协调者，以他的命令为主

![image-20220402220644972](https://img1.terwer.space/image-20220402220644972.png)

**引入多个协调者，然后又引入主协调中就是一个简单的Paxos算法**

**Paxos的版本有；Basic Paxos、Multi Paxos、Fast-Paxos**，具体落地的有Raft和ZK的ZAB协议。

![image-20220402220944082](https://img1.terwer.space/image-20220402220944082.png)

Raft论文：https://docs.qq.com/doc/DY0VxSkVGWHFYSlZJ

参考：https://zhuanlan.zhihu.com/p/91288179

Raft和ZAB的区别

https://www.zhihu.com/question/28242561

#### Basic Paxos的相关概念

1. 角色介绍

   - Client：客户端

     客户端向分布式系统发起请求，并等待响应。例如，对分布式文件系统的写请求。

   - Proposer：提案发起者

     提案者提倡客户端请求，试图税负Acceptor对此达成一致，并在发生冲突时充当协调者以推动协议向前发展

   - Acceptor：决策者，可批准提案

     Accrptor可以接收提案，并进行投票，投票结果是否通过以多数派为准。如果某个提案被选定，那么改提案里面的value就被选定

   - Learner：最终决策的学习者

     学习者充当该协议的复制因素（不参与投票）

2. 决策模型

   ![image-20220406203951268](https://img1.terwer.space/image-20220406203951268.png) 


3. Basic paxos的执行流程

   basic paxos的执行流程分为四个步骤

   - prepare

     proposer提出一个议案，编号为N，次N大于这个proposer之前提出的所有议案的编号，请求acceptor的多数人接收这个议案

   - promise

     如果编号N大于此acceptor之前接收的所有议案编号则接收，否则拒绝

   - accept

     如果达到多数派，则proposer接收accept请求，此请求包含提案编号和对应的内容

   - accepted

     如果此acceptor在此期间没有接收到任何大于N的提案，则接收次提案内容，否则忽略

#### Basic paxos的流程图

1. 无障碍paxos

   ![image-20220406222101652](https://img1.terwer.space/image-20220406222101652.png)

2. Acceptor失败时的paxos

   在下图中，多数派中的一个Acceptor发生故障，多数派大小变为2。在这种情况下，Basic paxos协议仍然成功。

   ![image-20220406225318453](https://img1.terwer.space/image-20220406225318453.png)

3. Prposer失败时的paxos

   proposer在提出议案后，在达成议案之前失败。

   传送到Acceptor的时候失败了，这个时候需要选出新的proposer，paxos协议仍然能够成功。

   ![image-20220406225858679](https://img1.terwer.space/image-20220406225858679.png)

4. 多个提案者发生冲突时的paxos

   极端情况是每个proposer都进行提案，导致paxos的活锁问题

   ![image-20220406230517011](https://img1.terwer.space/image-20220406230517011.png)

   **活锁问题的解决：在每个proposer提交的时候随机加一个等待时间**

#### Multi-Paxos的流程图

主要为了解决basic paxos的问题。

流程复杂，实现困难，效率低下（达成一致性需要两轮rpc）。

将流程拆分为选举和复制。

1. 第一次流程-确认leader

   ![image-20220406231535698](https://img1.terwer.space/image-20220406231535698.png)

2. 第二次流程-直接由Leader确认

   ![image-20220406232055509](https://img1.terwer.space/image-20220406232055509.png)

#### Multi-paxos角色重叠流程图

multi-paxos在实施的时候，会把proposer、acceptor和learner合并成一个橘色，叫做服务器，因此只剩下客户端和服务器。

![image-20220406232526831](https://img1.terwer.space/image-20220406232526831.png)