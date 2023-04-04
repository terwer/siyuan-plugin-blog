---
title: 分布式一致性协议之Raft协议
short_title: ''
description: 斯坦福大学的RamCloud项目中提出了易理解、易实现的分布式一致性复制协议Raft。C++、Java和Go都有对应的实现，Raft相对简洁。引入主节点、通过竞选确认主节点。节点；类型：follower、candidate和leader。
date: 2022-05-04 16:41:17
category:
  - 后端开发
  - 分布式
tag:
  - rpc
  - raft
article: true
timeline: false
---
### Raft协议

#### 什么是Raft协议

Paxos论证了一致性协议的可行性，但是不好懂，缺少必要的细节，工程实现难度高。广为人知的实现目前只zk的zab协议。

Paxos的出现为分布式的强一致性提供了很好的理论基础，但是paxos协议本身理解起来困难，实现复杂。

斯坦福大学的RamCloud项目中提出了易理解、易实现的分布式一致性复制协议Raft。C++、Java和Go都有对应的实现，Raft相对简洁。

引入主节点、通过竞选确认主节点。节点；类型：follower、candidate和leader。

leader会周期性的发送心跳包给follower。每个follower设置一个随机的竞选超时时间，一般为150~300ms，如果在这个时间内没有收到心跳包，就会变成candidate。进入竞选阶段，通过竞选阶段投票人多的成为leader。

![image-20220406235432501](https://img1.terwer.space/image-20220406235432501.png)

#### Raft相关概念

1. 节点状态
   - Leader（主节点）：接收client请求，写入本地后，同步到其他副本中
   - Follower（从节点）：从Leader中接收更新请求，然后写入本地日志文件。对客户端提供读请求
   - Candidate（候选节点）：如果Follower在一段时间内，没有接收到心跳，则判断Leader可能发生故障，发起主提议。节点状态从Follower变成Candidate状态，直到选主结束
2. termId：任期号，时间被划分为一个个任期，每次选举后产生一个新的termId，一个任期内只能有一个leader。
3. requestVote：请求投票，Candidate在选举过程中发起，收到多数派响应后成为leader。

#### 竞选阶段流程

http://thesecretlivesofdata.com/raft/

https://raft.github.io/

单节点不存在数据一致性问题，一个节点容易达成一致性。

![](https://img1.terwer.space/20220407-230906.png)

多个节点达成一致性

不同的状态

![image-20220407231520954](https://img1.terwer.space/image-20220407231520954.png)

竞选流程

![20220407-231357](https://img1.terwer.space/20220407-231357.png)

1. 最初阶段，只有Folllower，没有leader

   ![image-20220407231758641](https://img1.terwer.space/image-20220407231758641.png)

   FollowerA等待随机竞选超时之后，没收到leader发来的心跳包，进入竞选阶段。

   ![image-20220407232139502](https://img1.terwer.space/image-20220407232139502.png)

2. 此时A发送投票请求给其他节点

   ![image-20220407232653872](https://img1.terwer.space/image-20220407232653872.png)

3. 其他节点会对请求进行回复，如果超过一般节点进行了回复，那么该节点就会由candidate变成leader

   ![image-20220407232903317](https://img1.terwer.space/image-20220407232903317.png)

4. 之后leader会周期性的给follower发送心跳包，follower接收到心跳包，会重新开始计时

   ![image-20220407233135008](https://img1.terwer.space/image-20220407233135008.png)

#### leader节点宕机

![image-20220407233525012](https://img1.terwer.space/image-20220407233525012.png)



![image-20220407233608165](https://img1.terwer.space/image-20220407233608165.png)



![image-20220407233724576](https://img1.terwer.space/image-20220407233724576.png)



![image-20220407233814755](https://img1.terwer.space/image-20220407233814755.png)

#### 多个Candidate竞选

1. 如果有多个follower成为candidate，并且获得的票数相同，那么就需要重新进行投票。

![image-20220407233952703](https://img1.terwer.space/image-20220407233952703.png)

2. 当重新开始投票时，由于每个节点设置的随机竞选超时时间不同，因此再次出现多个candidate进行竞选并且获得相同票数的概率很低。

   ![image-20220407234630560](https://img1.terwer.space/image-20220407234630560.png)

   ![image-20220407234745473](https://img1.terwer.space/image-20220407234745473.png)

#### 日志复制

1. 来自客户端的修改都会传到leader。该修改还未提交，只是存在日志中

   ![image-20220407235012230](https://img1.terwer.space/image-20220407235012230.png)

2. leader把修改复制到所有follower

   ![image-20220407235217320](https://img1.terwer.space/image-20220407235217320.png)

3. leader会等待大多数follower都进行了修改，然后才将修改提交。

   ![image-20220408195907817](https://img1.terwer.space/image-20220408195907817.png)

4. leader通知所有follower，让他们进行修改，此时所有节点达成一致。

   ![image-20220408200024511](https://img1.terwer.space/image-20220408200024511.png)

5. 多次日志复制的情况

   ![image-20220408200143060](https://img1.terwer.space/image-20220408200143060.png)

![image-20220408200359398](https://img1.terwer.space/image-20220408200359398.png)



![image-20220408200441706](https://img1.terwer.space/image-20220408200441706.png)

#### 网络分区

面对网络分区，Raft也可以保持一致。

1. 初始状态下，B节点对其他节点发送心跳

   ![image-20220408231418452](https://img1.terwer.space/image-20220408231418452.png)

2. 当网络分区，出现网络分区的请求后，只能对A发送心跳，同时其他节点会再选出一个leader

   ![image-20220408231720682](https://img1.terwer.space/image-20220408231720682.png)

#### 网络分区情况的日志复制

网络分区数据复制也可以完成数据一致性

1. 不同分区写入数据不同

   ![image-20220409010415632](https://img1.terwer.space/image-20220409010415632.png)



2. 最终E节点termid最大，成为leader节点，同步节点数据，达成数据一致性

   ![image-20220409143241157](https://img1.terwer.space/image-20220409143241157.png)