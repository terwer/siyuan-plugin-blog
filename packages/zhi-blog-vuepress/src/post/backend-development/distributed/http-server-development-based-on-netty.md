---
title: Netty高级进阶之基于Netty的HTTP服务器开发
short_title: ''
description: 本通过实战演练，学习了如何基于Netty开发一个HTTP服务器。
date: 2022-04-27 02:10:49
category:
  - 后端开发
  - 分布式
tag:
  - netty
  - http
  - server
article: true
timeline: false
---
本通过实战演练，学习了如何基于Netty开发一个HTTP服务器。

<!-- more -->

# Netty高级进阶之基于Netty的HTTP服务器开发

## 介绍

Netty的HTTP协议栈可靠性高，性能优异。相对于传统的Tomcat、Jetty等服务器，它更加轻量级和小巧，灵活性和定制型也更好。

![image-20220429004617744](https://img1.terwer.space/image-20220429004617744.png)

## 功能需求

1. Netty服务器在8080端口监听
2. 浏览器发出请求”http://localhost:8080“
3. 服务器回复消息给客户端”你好，我是Netty服务器“，并对特定请求资源进行过滤

## 服务端代码实现

1. NettyHttpServer

   ```java
   /**
    * HTTP服务端
    *
    * @name: NettyHttpServer
    * @author: terwer
    * @date: 2022-04-27 22:23
    **/
   public class NettyHttpServer {
       private int port;
   
       public NettyHttpServer(int port) {
           this.port = port;
       }
   
       public void run() throws InterruptedException {
           NioEventLoopGroup bossGroup = null;
           NioEventLoopGroup workerGroup = null;
           try {
               // 1. 创建bossGroup线程组: 处理网络事件--连接事件，默认是2*处理器线程数目
               bossGroup = new NioEventLoopGroup(1);
               // 2. 创建workerGroup线程组: 处理网络事件--读写事件,默认是2*处理器线程数目
               workerGroup = new NioEventLoopGroup();
               // 3. 创建服务端启动助手
               ServerBootstrap serverBootstrap = new ServerBootstrap();
               // 4. 设置bossGroup线程组和workerGroup线程组
               serverBootstrap.group(bossGroup, workerGroup)
                       .channel(NioServerSocketChannel.class)
                       .option(ChannelOption.SO_BACKLOG, 128)  // 5. 设置服务端通道实现为NIO
                       .childOption(ChannelOption.SO_KEEPALIVE, Boolean.TRUE)  // 6. 参数设置，设置活跃状态，child是设置workerGroup
                       .childHandler(new ChannelInitializer<SocketChannel>() { // 7. 创建一个通道初始化对象
                           @Override
                           protected void initChannel(SocketChannel ch) throws Exception {
                               // 8. 向pipeline中添加自定义业务处理handler
                               // 自定义处理类
                               ch.pipeline().addLast(new HttpServerCodec());
                               ch.pipeline().addLast(new NettyHttpServerHandler());
                           }
                       });
               // 9. 启动服务端并绑定端口,同时将异步改为同步
               ChannelFuture channelFuture = serverBootstrap.bind(port).sync();
               System.out.println("HTTP服务器启动成功");
   
               channelFuture.addListener(new ChannelFutureListener() {
                   @Override
                   public void operationComplete(ChannelFuture future) throws Exception {
                       if (future.isSuccess()) {
                           System.out.println("端口绑定成功!");
                       } else {
                           System.out.println("端口绑定失败!");
                       }
                   }
               });
   
               // 10. 关闭通道和关闭连接池(不是真正关闭，只是设置为关闭状态)
               channelFuture.channel().closeFuture().sync();
           } finally {
               bossGroup.shutdownGracefully();
               workerGroup.shutdownGracefully();
           }
       }
   
       public static void main(String[] args) throws InterruptedException {
           new NettyHttpServer(8080).run();
       }
   }
   ```

2. HTTP处理类

   ```java
   /**
    * HTTP处理类
    *
    * @name: NettyHttpServerHandler
    * @author: terwer
    * @date: 2022-04-29 01:07
    **/
   public class NettyHttpServerHandler extends SimpleChannelInboundHandler<HttpObject> {
   
       /**
        * 读取就绪事件
        *
        * @param ctx
        * @param msg
        * @throws Exception
        */
       @Override
       protected void channelRead0(ChannelHandlerContext ctx, HttpObject msg) throws Exception {
           // 1.判断是否是HTTP请求
           if (msg instanceof HttpRequest) {
               DefaultHttpRequest request = (DefaultHttpRequest) msg;
               System.out.println("浏览器请求路径：" + request.uri());
   
               // 2.响应浏览器
               ByteBuf byteBuf = Unpooled.copiedBuffer("<h1>你好，我是Netty服务端</h1>", CharsetUtil.UTF_8);
               DefaultFullHttpResponse response = new DefaultFullHttpResponse(HttpVersion.HTTP_1_1, HttpResponseStatus.OK, byteBuf);
               response.headers().set(HttpHeaderNames.CONTENT_TYPE, "text/html;charset=utf-8");
               response.headers().set(HttpHeaderNames.CONTENT_LENGTH, byteBuf.readableBytes());
   
               ctx.writeAndFlush(response);
           }
       }
   }
   ```

3. 运行效果

   ![image-20220429014229299](https://img1.terwer.space/image-20220429014229299.png)

   

   ![image-20220429012901268](https://img1.terwer.space/image-20220429012901268.png)

4. 过滤掉图标

   ```java
   // 图标不响应
   if("/favicon.ico".equals(request.uri())){
       System.out.println("图标不处理");
       return;
   }
   ```

   ![image-20220429013259492](https://img1.terwer.space/image-20220429013259492.png)