---
title: NIO编程及其三大核心原理
short_title: ''
description: Java NIO，全称为java non-blocking IO，是指JDK提供得到新API。从JDK1.4开始，Java提供了一系列改进的输入/输出的新特性，被统称为NIO（New
  IO），是同步非阻塞的。
date: 2022-05-04 14:35:45
category:
  - 后端开发
  - 分布式
tag:
  - nio
article: true
timeline: false
---
## nio编程

### NIO介绍

Java NIO，全称为 `java non-blocking IO` ，是指JDK提供得到新API。从JDK1.4开始，Java提供了一系列改进的输入/输出的新特性，被统称为NIO（New IO），是同步非阻塞的。

1. NIO有三大核心部分，Channel（通道），Buffer（缓冲区），Selector（选择器）。

2. NIO是面向缓冲区编程。

   数据读取到一个缓冲区中，需要时可以再缓冲区前后移动，增加了处理过程中的灵活性，使用它可以提供非阻塞式的高伸缩网络。

3. Java NIO的非阻塞模式，使一个线程从通道发送或者读取数据，但是它仅能得到目前可用的数据。如果目前没有数据可用时，就什么都不会获取，而不是保持线程阻塞。所以只至数据变的可用之前，该线程可以继续做其他事情。

   非阻塞写也是这样，一个线程请求写入一些数据到某个通道，但是不需要等待它完全写入，这个线程可以去做别的事情。

   通俗理解：NIO可以做到用一个线程来处理多个操作。

   假设有10000个请求过来，根据实际情况，可以分配50或者100个线程来处理。而不是像之前阻塞IO那样，必须分配10000个线程。

### NIO和BIO的比较

1. BIO以流的方式处理数据，NIO以缓冲区方式处理数据，缓冲区I/O效率比流I/O效率高很多。

2. BIO是阻塞的，NIO是非阻塞的

3. BIO基于字节流和字符流进行操作，NIO基于Channel（通道）和Buffer（缓冲区）进行操作，数据总是从通道读取到缓冲区，或者从缓冲区写入通道。

   Selector（选择器）用于监听多个通道的事件（连接请求、数据到达等），因此单个线程可以监听多个客户端通道。

### NIO三大核心原理示意图

NIO的Selector、Channel、Buffer的关系

![image-20220418160840098](https://img1.terwer.space/image-20220418160840098.png)

1. 每个Channel都会对应一个Buffer

2. Selector对应一个线程，一个线程对应多个Channel（连接）

3. 每个Channel都注册到选择器上

4. Selector不断轮询查看Channel上的事件，事件是Channel（通道）的重要概念

5. Selector会根据不同的事件完成不同的操作

6. Buffer是一个内存块，底层是一个数组

7. 数据的读取和写入都是通过Buffer。

   跟BIO有区别，BIO中，要么是输入流，要么是输出流，不能是双向的。

   NIO的Buffer可读可写，Channel是双向的。