---
title: Netty线程模型
short_title: ''
description: Netty的设计主要基于主从Reactor的多线程模式，并做了一定的改进。
date: 2022-05-04 15:27:07
category:
  - 后端开发
  - 分布式
tag:
  - reactor
  - netty
article: true
timeline: false
---
#### Netty线程模型

Netty的设计主要基于主从Reactor的多线程模式，并做了一定的改进。

1. 简单版Netty模型

   ![image-20220419225802316](https://img1.terwer.space/image-20220419225802316.png)

   - BossGroup线程维护Selector，ServerSocketChannel注册到Selector上，只关注连接请求处理事件（主Reactor）
   - 当接收到来自客户端的连接请求事件时，通过ServerSocketChannel的accept方法获得对应的SocketChannel，并封装成NIOSocketChannel注册到WorkerGroup中的Selector，每个Selector运行在一个线程中（从Selector）
   - 当WorkerGroup中的Selector监听到对应的IO事件后，就调用对应的handler进行处理

2. 进阶版Netty模型

   ![image-20220419231353965](https://img1.terwer.space/image-20220419231353965.png)

   - 有两组线程池：BossGroup和WorkerGroup，BossGroup中的线程专门负责和客户端建立连接，WorkerGroup中的线程专门负责连接上的读写
   - BossGroup和WorkerGroup含有多个不断循环的执行事件处理的线程，每个线程包含一个Selector，用于监听注册在它上面的Channel
   - 每个BossGroup中的线程循环执行以下三个步骤
     - 轮询注册在其上的ServerSocketChannel的accept事件，OP_ACCEPT事件
     - 处理accept事件，与客户端建立连接，生成一个NIOSocketChannel，并将其注册到WorkerGroup中某个线程的Selector上
     - 以此循环处理任务队列中的下一个事件
   - 每个WorkerGroup中的线程循环执行以下三个步骤：
     - 轮询注册在其上的NIOSocketChannel的read/write事件，OP_READ/OP_WRITE事件
     - 在对应的NIOSocketChannel上处理read/write事件
     - 以此循环处理任务队列中的下一个事件

3. 详细版Netty模型

   ![image-20220419233502608](https://img1.terwer.space/image-20220419233502608.png)

   - Netty抽象出两组线程池：BossGroup和WorkerGroup，也可以叫BossNioEventLoopGroup和WorkerNioEventLoopGroup。

     每个线程池都有NioEventLoop线程。

     BossGroup中的线程专门负责和客户端建立连接，WorkerGroup中的线程专门负责处理连接上的读写。

     BossGroup和WorkerGroup的类型都是NioEventLoopGroup。

   - NioEventLoopGroup相当于一个事件循环组，这个组中含有多个事件循环，每个事件循环就是一个NioEventLoop。

   - NioEventLoop表示一个不断循环的执行事件处理的线程，每个NioEventLoop都包含一个Selector，用于监听注册在其上的socket连接（Channel）。

   - NioEventLoopGroup可以包含多个线程，即含有多个NioEventLoop。

   - 每个BossNioEventLoop循环执行以下三个步骤

     - select：轮询注册在其上的ServerSocketChannel的accept事件，OP_ACCEPT事件
     - processSelectedKeys：处理accept事件，与客户端建立连接，生成一个NIOSocketChannel，并将其注册到WorkerNioEventLoop的Selector上
     - runAllTasks：以此循环处理任务队列中的其他任务

   - 每个WorkerNioEventLoop循环执行以下三个步骤

     - select：轮询注册在其上的NIOSocketChannel的read/write事件，OP_READ/OP_WRITE事件
     - processSelectedKeys：在对应的NIOSocketChannel上处理read/write事件
     - runAllTasks：以此循环处理任务队列中的其他任务

   - 在以上两个processSelectedKeys步骤中，会使用Pipline（管道），Pipline中引用了Channel。

     通过Pipline可以获取对应的Channel，Pipline中维护了很多处理器（拦截处理器、过滤处理器、自定义处理器等）。