---
title: Netty入门与异步模型
short_title: ''
description: 本文通过一个Netty入门案例来阐述Netty的异步模型。
date: 2022-04-21 21:21:40
category:
  - 后端开发
  - 分布式
tag:
  - netty
  - async
article: true
timeline: false
---
本文通过一个Netty入门案例来阐述Netty的异步模型。

<!-- more -->

### netty入门案例

Netty是由JBOSS提供的一个开源框架，它的Maven坐标如下：

```xml
<dependency>
    <groupId>io.netty</groupId>
    <artifactId>netty-all</artifactId>
    <version>4.1.76.Final</version>
</dependency>
```

#### Netty服务端编写

- 服务端实现步骤

1. 创建bossGroup线程组: 处理网络事件--连接事件
2. 创建workerGroup线程组: 处理网络事件--读写事件 
3. 创建服务端启动助手
4. 设置bossGroup线程组和workerGroup线程组
5. 设置服务端通道实现为NIO
6. 参数设置
7. 创建一个通道初始化对象
8. 向pipeline中添加自定义业务处理handler
9. 启动服务端并绑定端口,同时将异步改为同步
10. 关闭通道和关闭连接池

- 代码实现

  ```java
  /**
   * Netty服务端
   *
   * @name: NettyServer
   * @author: terwer
   * @date: 2022-04-21 14:41
   **/
  public class NettyServer {
      public static void main(String[] args) throws InterruptedException {
          // 1. 创建bossGroup线程组: 处理网络事件--连接事件，默认是2*处理器线程数目
          NioEventLoopGroup bossGroup = new NioEventLoopGroup(1);
          // 2. 创建workerGroup线程组: 处理网络事件--读写事件,默认是2*处理器线程数目
          NioEventLoopGroup workerGroup = new NioEventLoopGroup();
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
                          ch.pipeline().addLast(new NettyServerHandler());
                      }
                  });
          // 9. 启动服务端并绑定端口,同时将异步改为同步
          ChannelFuture channelFuture = serverBootstrap.bind(9999).sync();
          System.out.println("服务器启动成功");
  
          // 10. 关闭通道和关闭连接池(不是真正关闭，只是设置为关闭状态)
          channelFuture.channel().closeFuture().sync();
          bossGroup.shutdownGracefully();
          workerGroup.shutdownGracefully();
      }
  }
  ```

#### 自定义服务端Handler

```java
/**
 * @name: NettyServerHandler
 * @author: terwer
 * @date: 2022-04-21 14:56
 **/
public class NettyServerHandler implements ChannelInboundHandler {
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
    }

    /**
     * 通道读取完成事件
     *
     * @param ctx
     * @throws Exception
     */
    @Override
    public void channelReadComplete(ChannelHandlerContext ctx) throws Exception {
        ctx.writeAndFlush(Unpooled.copiedBuffer("你好，我是Netty服务端。", CharsetUtil.UTF_8));
    }

    /**
     * 发生异常事件
     *
     * @param ctx
     * @param throwable
     * @throws Exception
     */
    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
        cause.printStackTrace();
        ctx.close();
    }

    /**
     * 通道就绪事件
     *
     * @param ctx
     * @throws Exception
     */
    @Override
    public void channelActive(ChannelHandlerContext ctx) throws Exception {

    }

    @Override
    public void channelRegistered(ChannelHandlerContext ctx) throws Exception {

    }

    @Override
    public void channelUnregistered(ChannelHandlerContext ctx) throws Exception {

    }

    @Override
    public void channelInactive(ChannelHandlerContext ctx) throws Exception {

    }

    @Override
    public void userEventTriggered(ChannelHandlerContext ctx, Object msg) throws Exception {

    }

    @Override
    public void channelWritabilityChanged(ChannelHandlerContext ctx) throws Exception {

    }

    @Override
    public void handlerAdded(ChannelHandlerContext ctx) throws Exception {

    }

    @Override
    public void handlerRemoved(ChannelHandlerContext ctx) throws Exception {

    }
}
```

#### Netty客户端编写

- 客户端实现步骤

  1. 创建线程组
  2. 创建客户端启动助手
  3. 设置线程组
  4. 设置客户端通道实现为NIO
  5. 创建一个通道初始化对象
  6. 向pipeline中添加自定义业务处理handler
  7. 启动客户端,等待连接服务端,同时将异步改为同步 
  8. 关闭通道和关闭连接池

- 代码实现

  ```java
  /**
   * Netty客户端
   *
   * @name: NettyClient
   * @author: terwer
   * @date: 2022-04-21 15:04
   **/
  public class NettyClient {
      public static void main(String[] args) throws InterruptedException {
          // 1. 创建线程组
          NioEventLoopGroup group = new NioEventLoopGroup();
          // 2. 创建客户端启动助手
          Bootstrap bootstrap = new Bootstrap();
          // 3. 设置线程组
          bootstrap.group(group)
                  .channel(NioSocketChannel.class)
                  .handler(new ChannelInitializer<SocketChannel>() { // 4. 设置客户端通道实现为NIO
                      @Override
                      protected void initChannel(SocketChannel ch) throws Exception { // 5. 创建一个通道初始化对象
                          // 6. 向pipeline中添加自定义业务处理handler
                          ch.pipeline().addLast(new NettyClientHandler());
                      }
                  });
          // 7. 启动客户端,等待连接服务端,同时将异步改为同步
          ChannelFuture channelFuture = bootstrap.connect(new InetSocketAddress("127.0.0.1", 9999)).sync();
          // 8. 关闭通道和关闭连接池
          channelFuture.channel().closeFuture().sync();
  
          group.shutdownGracefully();
      }
  }
  ```

**自定义客户端Handler**

```java
/**
 * @name: NettyClientHandler
 * @author: terwer
 * @date: 2022-04-21 20:44
 **/
public class NettyClientHandler implements ChannelInboundHandler {

    /**
     * 通道就绪事件
     *
     * @param ctx
     * @throws Exception
     */
    @Override
    public void channelActive(ChannelHandlerContext ctx) throws Exception {
        ctx.writeAndFlush(Unpooled.copiedBuffer("你好，我是客户端。", CharsetUtil.UTF_8));
    }

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
        System.out.println("服务端发来的消息：" + byteBuf.toString(CharsetUtil.UTF_8));
    }

    /**
     * 通道读取完成事件
     *
     * @param ctx
     * @throws Exception
     */
    @Override
    public void channelReadComplete(ChannelHandlerContext ctx) throws Exception {
    }

    /**
     * 发生异常事件
     *
     * @param ctx
     * @param cause
     * @throws Exception
     */
    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
        cause.printStackTrace();
        ctx.close();
    }

    @Override
    public void channelRegistered(ChannelHandlerContext ctx) throws Exception {

    }

    @Override
    public void channelUnregistered(ChannelHandlerContext ctx) throws Exception {

    }

    @Override
    public void channelInactive(ChannelHandlerContext ctx) throws Exception {

    }

    @Override
    public void userEventTriggered(ChannelHandlerContext ctx, Object msg) throws Exception {

    }

    @Override
    public void channelWritabilityChanged(ChannelHandlerContext ctx) throws Exception {

    }

    @Override
    public void handlerAdded(ChannelHandlerContext ctx) throws Exception {

    }

    @Override
    public void handlerRemoved(ChannelHandlerContext ctx) throws Exception {

    }
}
```

### netty异步模型

#### 基本介绍

当一个异步过程调用发出后，调用者不能立刻得到结果。实际处理这个调用的组件在调用完成后，通过状态、通知和回调来通知调用者。

![image-20220421205936962](https://img1.terwer.space/image-20220421205936962.png)

![image-20220421210005980](https://img1.terwer.space/image-20220421210005980.png)

NIO中的I/O操作都是异步的，包括Bind、Write、Connect等操作都会简单的返回一个ChannelFuture。

调用者不能立即获得结果，而是通过Future-Listener机制，用户可以方便的主动获取或者通过通知机制获得IO操作结果。

Netty的异步模型建立在future和callback之上。callback就是回调。

future的核心思想是：

假设一个方法fun，计算过程可能非常耗时，等待fun返回显然是不合适的。可以在调用fun的时候，立马返回一个future，后续可以通过future去监控方法fun的处理过程，就是Future-Listener机制。

#### Future和Future-Listener机制

1. Future

   表示异步的执行结果，可以通过它提供的方法检测任务是否完成。ChannelFuture是它的一个子接口，可以添加监听器，当监听事件发生时，就会通知到监听器。

   当Future对象刚刚创建时，处于非完成状态，调用者可以通过返回的ChannelFuture来获取操作执行的状态，注册监听函数来执行完成后的操作。

   常用方法有：

   - sync()：阻塞等待程序结果返回

   - isDone()：判断当前操作是否完成

   - isSuccess()：判断已完成操作是否成功

   - getCause()：获取操作失败原因

   - isCanceled()：判断当前操作是否取消

   - addListener()：注册监听器，当操作已完成时（isDone方法返回完成），会通知指定监听器。

     如果Future对象已完成，则通知指定监听器。

2. Future-Listener机制

   给Future添加监听器，监听操作结果：

   代码实现：

   ```java
   ChannelFuture channelFuture = serverBootstrap.bind(9999).sync();
   System.out.println("服务器启动成功");
   
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
   ```

   ```java
   ChannelFuture channelFuture = ctx.writeAndFlush(Unpooled.copiedBuffer("你好,我是Netty客户端", CharsetUtil.UTF_8));
   channelFuture.addListener(new ChannelFutureListener() {
       @Override
       public void operationComplete(ChannelFuture future) throws Exception {
           if (future.isSuccess()) {
               System.out.println("数据发送成功.");
           } else {
               System.out.println("数据发送失败.");
           }
       }
   });
   ```