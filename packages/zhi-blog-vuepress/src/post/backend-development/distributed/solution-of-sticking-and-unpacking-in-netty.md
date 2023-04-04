---
title: Netty高级进阶之Netty中的粘包和拆包的解决方案
short_title: ''
description: 粘包和拆包是TCP网络编程中不可避免的，无论是服务端和客户端，当读取或发送消息时，都需要考虑TCP底层的粘包/拆包机制。
date: 2022-04-27 02:13:37
category:
  - 后端开发
  - 分布式
tag:
  - netty
  - bag
article: true
timeline: false
---
本文阐述了Netty中常见的粘包和拆包问题，并深入分析了常用的解决方案。

<!-- more -->

# Netty高级进阶之Netty中的粘包和拆包的解决方案

## 粘包和拆包简介

粘包和拆包是TCP网络编程中不可避免的，无论是服务端和客户端，当读取或发送消息时，都需要考虑TCP底层的粘包/拆包机制。

TCP是个流协议，流，就是没有界限的一组数据。

TCP底层并不了解上层业务数据的具体含义它会根据TCP的缓冲区的实际情况进行包的拆分。在业务上认为，一个完整的包可能会被TCP拆分成多个包进行发送，也有可能把多个小包封装成一个大的数据包发送，这就是TCP的粘包和拆包问题。

如图，假设客户端发送了两个数据包D1和D2给服务端，由于服务器一次读取到的字节数是不确定的，所以可能存在4种情况：

1. 服务器两次读到了两个独立的数据包，分别是D1和D2，没有粘包和拆包

   ![image-20220502205307893](https://img1.terwer.space/image-20220502205307893.png)

2. 服务器一次读到了两个数据包，D1和D2粘在一起，就是TCP**粘包**

   ![image-20220502205335162](https://img1.terwer.space/image-20220502205335162.png)

3. 如果D2 的数据包比较大，服务端分两次读到了两个数据包，第一次读取到了完整的D1包和D2包的部分内容，第二次读取到了D2包的剩余内容，就是TCP**拆包**

   ![image-20220502205358020](https://img1.terwer.space/image-20220502205358020.png)

4. 如果D1、D2包都很大，服务端分多次才能将D1和D2读取完全，期间可能发生多次拆包

   ![image-20220502205420569](https://img1.terwer.space/image-20220502205420569.png)

## TCP粘包和拆包产生的原因

数据从发送方到接收方需要经过操作系统得到缓冲区，造成粘包和拆包的主要原因就是这个缓冲区。

粘包可以理解为缓冲区的数据堆积，导致多个请求粘在一起，拆包可以理解为发送的数据大于缓冲区，进行拆分处理。

## 粘包和拆包的代码演示

1. 粘包

   - 客户端

     ```java
     /**
      * 通道就绪事件
      *
      * @param ctx
      * @throws Exception
      */
     @Override
     public void channelActive(ChannelHandlerContext ctx) throws Exception {
         for (int i = 0; i < 10; i++) {
             ctx.writeAndFlush(Unpooled.copiedBuffer("你好,我是Netty客户端" + i, CharsetUtil.UTF_8));
         }
     }
     ```

   - 服务端

     ```java
     /**
      * 通道读取事件
      *
      * @param ctx
      * @param msg
      * @throws Exception
      */
     @Override
     public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
         ByteBuf byteBuf = (ByteBuf) msg;
         System.out.println("客户端发过来的消息：" + byteBuf.toString(CharsetUtil.UTF_8));
         System.out.println("读取次数：" + (++count));
     }
     ```

   - 运行结果

     ![image-20220502214233739](https://img1.terwer.space/image-20220502214233739.png)

     

     ![image-20220502214303600](https://img1.terwer.space/image-20220502214303600.png)

     **服务端一次读取了客户端发送过来的消息，应该读取10次， 因此发生粘包。**

2. 拆包

   - 客户端

     ```java
     /**
      * 通道就绪事件
      *
      * @param ctx
      * @throws Exception
      */
     @Override
     public void channelActive(ChannelHandlerContext ctx) throws Exception {
         // 一次发送102400字节数据
         char[] chars = new char[102400];
         Arrays.fill(chars, 0, 102399, 'a');
         for (int i = 0; i < 10; i++) {
             ctx.writeAndFlush(Unpooled.copiedBuffer(chars, CharsetUtil.UTF_8));
         }
     }
     ```

   - 服务端

     ```java
     /**
      * 通道读取事件
      *
      * @param ctx
      * @param msg
      * @throws Exception
      */
     @Override
     public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
         ByteBuf byteBuf = (ByteBuf) msg;
         // System.out.println("客户端发过来的消息：" + byteBuf.toString(CharsetUtil.UTF_8));
         System.out.println("读取的长度：" + byteBuf.readableBytes());
         System.out.println("读取次数：" + (++count));
     }
     ```

   - 运行结果

     ![image-20220502214643017](https://img1.terwer.space/image-20220502214643017.png)

      ![image-20220502214109440](https://img1.terwer.space/image-20220502214109440.png)

     **客户端发送的数据比较大时，读取了18次，应该读取10次，因此发生了拆包**

## 粘包和拆包的解决方案

1. 业内的解决方案

   底层的TCP无法理解上层的业务数据，因此底层是无法解决粘包与拆包的。

   只能通过上层协议栈的设计来解决，目前业内主流的解决方案如下：

   - 消息长度固定，累计读取到长度和为定长LEN的报文之后，就认为读取到了一个完整的信息
   - 将换行符作为消息结束符
   - 将特殊分隔符作为消息结束标志，回车换行符就是特殊的结束分隔符
   - 通过在消息头中定义长度字段来标识消息的长度

2. Netty的解决方案

   Netty提供了4中解码器来解决，分别如下：

   - 固定长度的拆包器 `FixedLengthFrameDecoder` ， 每个应用层数据包的拆分都是固定长度大小

   - 行拆包器 `LineBasedFrameDecoder` ，每个应用层数据包，都以换行符作为分隔符，进行分割拆分

   - 分隔符拆包器 `DelimiterBasedFrameDecoder` ，每个应用层数据包，都通过自定义分隔符，进行分割拆分

   - 基于数据包长度的拆包器，`LengthFieldBasedFrameDecoder` 将应用层数据包的长度，作为接收端应用层数据包的拆分依据。

     按照应用层数据包的大小，进行拆包。

     这个拆包器有个要求，应用层协议包含数据包长度。

3. 代码实现

   - LineBasedFrameDcoder解码器

     ```java
     // 添加解码器，解决粘包问题
     ch.pipeline().addLast(new LineBasedFrameDecoder(2048));
     ```

     ```java
     ctx.writeAndFlush(Unpooled.copiedBuffer("你好,我是Netty客户端" + i + "\n", CharsetUtil.UTF_8));
     ```

   - DelimiterBasedFrameDecoder解码器

     ```java
     ByteBuf byteBuf =
     Unpooled.copiedBuffer("$".getBytes(StandardCharsets.UTF_8));
     ch.pipeline().addLast(new DelimiterBasedFrameDecoder(2048, byteBuf));
     ```

     ```java
     ctx.writeAndFlush(Unpooled.copiedBuffer("你好呀,我是Netty客户端"+i+"$", CharsetUtil.UTF_8));
     ```

## 本文源码地址

[netty-sticking-unpacking](https://github.com/terwer/senior-java-engineer-road/tree/master/p7-skill/rpc/netty-demo/src/main/java/com/terwergreen)