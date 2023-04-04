---
title: Netty核心原理
short_title: ''
description: Netty提供异步的、基于事件驱动的网络应用程序框架，用于快速开发高性能、高可靠性的网络IO程序。
date: 2022-04-18 22:24:15
category:
  - 后端开发
  - 分布式
tag:
  - netty
  - nio
  - socket
article: true
timeline: false
---
Netty提供异步的、基于事件驱动的网络应用程序框架，用于快速开发高性能、高可靠性的网络IO程序。

<!-- more -->

## netty核心原理

### netty介绍

官网：[https://netty.io/](https://netty.io/)

#### 原生NIO存在的问题

1. NIO类库和API繁杂，使用麻烦。需要熟练掌握Selector、ServerSocketChannel、SocketChannel、ByteBuffer等。

2. 需要具备其他额外技能：要熟悉Java多线程编程，因为NIO涉及到Reactor模式，必须对多线程和网络编程非常熟悉，才能编写出高质量的NIO程序。

3. 开发工作量和难度非常大：例如客户端面临短线重连、网络闪断、半包读写、失败缓存、网络拥塞和异常流处理等。

4. JDK NIO的bug：臭名昭著的Epoll BUG，它会导致Selector空轮询，最终导致CPU100%。直到JDK1.7版本，该问题依然存在，没有被根本解决。

   > 在NIO中通过Selector轮询当前是否有IO事件。
   >
   > 根据JDK NIO api的描述，Selector的select()方法会一致阻塞，直到IO事件到达或者超时。但是在Linux平台上有时候会出现问题，在某些场景下select方法会直接返回，这就是臭名昭著的Epoll Bug。
   >
   > 这是一比较严重的Bug，它会导致线程陷入死循环，让CPU达到100%，极大的影响系统的可靠性，到目前为止，JDK还没有完全解决这个问题。

参考：[NIO的epoll空轮询bug](https://www.cnblogs.com/JAYIT/p/8241634.html)

#### 概述

Netty是由JBOSS提供的一款开源框架。

Netty提供异步的、基于事件驱动的网络应用程序框架，用于快速开发高性能、高可靠性的网络IO程序。

Netty是一个基于NIO的网络编程框架，使用NIO可以快速、简单的开发出一个网络应用，极大的简化了NIO的开发过程。

作为当前最流行的NIO框架，Netty在互联网领域、大数据分布式计算领域、游戏行业、通信行业，获得了广泛应用，知名的Elasticsearch、Dubbo等内部都采用了Netty框架。

![image-20220419113521663](https://img1.terwer.space/image-20220419113521663.png)

Netty的强大之处：零拷贝、可扩展事件模型，支持TCP、UDP、HTTP、WebSocket等协议，提供安全传输、压缩、大文件传输、编解码等。

Netty有以下优点：

1. 设计优雅，提供阻塞和非阻塞Socket，提供灵活可扩展的事件模型，提供高度可定制的线程模型。
2. 具备更高的性能和更大的吞吐量，使用零拷贝技术最小化不必要的内存复制，减少资源的消耗。
3. 提供安全传输特性。
4. 支持多种主流协议，预置多种编解码功能，支持用户开发私有协议。