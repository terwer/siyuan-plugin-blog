---
title: Netty高级进阶之基于Netty的群聊天室案例
short_title: ''
description: 本文通过实战演练，学习了如何使用Netty开发一个群聊天室。
date: 2022-04-27 02:07:51
category:
  - 后端开发
  - 分布式
tag:
  - netty
  - chat
  - group
  - case
article: true
timeline: false
---
本文通过实战演练，学习了如何使用Netty开发一个群聊天室。

<!-- more -->

# Netty高级进阶之基于Netty的群聊天室案例

案例**要求**

1. 编写一个 Netty 群聊系统，实现服务器端和客户端之间的数据简单通讯
2. 实现多人群聊
3. 服务器端:可以监测用户上线，离线，并实现消息转发功能
4. 客户端:可以发送消息给其它所有用户，同时可以接受其它用户发送的消息

## 聊天室服务端编写

1. 服务端

   ```java
   /**
    * 聊天室服务端
    *
    * @name: NettyChatServer
    * @author: terwer
    * @date: 2022-04-27 22:23
    **/
   public class NettyChatServer {
       private int port;
   
       public NettyChatServer(int port) {
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
                               // 添加编码器
                               ch.pipeline().addLast(new StringDecoder());
                               ch.pipeline().addLast(new StringEncoder());
                               // 自定义处理类
                               ch.pipeline().addLast(new NettyChatServerHandler());
                           }
                       });
               // 9. 启动服务端并绑定端口,同时将异步改为同步
               ChannelFuture channelFuture = serverBootstrap.bind(port).sync();
               System.out.println("群聊天室服务器启动成功");
   
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
           new NettyChatServer(9998).run();
       }
   }
   ```

2. 服务端业务处理类

   ```java
   /**
    * Netty聊天室业务处理类
    *
    * @name: NettyChatServerHandler
    * @author: terwer
    * @date: 2022-04-27 22:31
    **/
   public class NettyChatServerHandler extends SimpleChannelInboundHandler<String> {
       public static List<Channel> channelList = new ArrayList<>();
   
       /**
        * 通道就绪事件
        *
        * @param ctx
        * @throws Exception
        */
       @Override
       public void channelActive(ChannelHandlerContext ctx) throws Exception {
           Channel channel = ctx.channel();
           // 有客户端连接时，将通道放入集合
           channelList.add(channel);
           System.out.println("【服务端】：" + channel.remoteAddress().toString().substring(1) + "上   线。");
       }
   
       /**
        * 通道未就绪
        *
        * @param ctx
        * @throws Exception
        */
       @Override
       public void channelInactive(ChannelHandlerContext ctx) throws Exception {
           // channel下线
           Channel channel = ctx.channel();
           // 客户端连接端口，移除连接
           channelList.remove(channel);
           System.out.println("【" + channel.remoteAddress().toString().substring(1) + "】下线。");
       }
   
       /**
        * 通道读取事件
        *
        * @param ctx
        * @param msg
        * @throws Exception
        */
       @Override
       protected void channelRead0(ChannelHandlerContext ctx, String msg) throws Exception {
           // 当前发送消息的通道
           Channel channel = ctx.channel();
           for (Channel channel1 : channelList) {
               // 排除自身通道
               if (channel != channel1) {
                   channel1.writeAndFlush("【" + channel.remoteAddress().toString().substring(1) + "】说：" + msg);
               }
           }
       }
   
       /**
        * 异常处理事件
        *
        * @param ctx
        * @param cause
        * @throws Exception
        */
       @Override
       public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
           cause.printStackTrace();
           Channel channel = ctx.channel();
           System.out.println("【" + channel.remoteAddress().toString().substring(1) + "】发送异常。");
           // 移除
           channelList.remove(channel);
       }
   }
   ```

## 聊天室客户端编写

1. 聊天室客户端

   ```java
   /**
    * 聊天室客户端
    *
    * @name: NettyChatClient
    * @author: terwer
    * @date: 2022-04-27 23:41
    **/
   public class NettyChatClient {
       private String ip;
       private int port;
   
       public NettyChatClient(String ip, int port) {
           this.ip = ip;
           this.port = port;
       }
   
       public void run() throws InterruptedException {
           NioEventLoopGroup group = null;
           try {
               // 1. 创建线程组
               group = new NioEventLoopGroup();
               // 2. 创建客户端启动助手
               Bootstrap bootstrap = new Bootstrap();
               // 3. 设置线程组
               bootstrap.group(group)
                       .channel(NioSocketChannel.class)
                       .handler(new ChannelInitializer<SocketChannel>() { // 4. 设置客户端通道实现为NIO
                           @Override
                           protected void initChannel(SocketChannel ch) throws Exception { // 5. 创建一个通道初始化对象
                               // 6. 向pipeline中添加自定义业务处理handler
                               //添加编解码器
                               ch.pipeline().addLast(new StringDecoder());
                               ch.pipeline().addLast(new StringEncoder());
                               // 添加客户端处理类
                               ch.pipeline().addLast(new NettyChatClientHandler());
                           }
                       });
               // 7. 启动客户端,等待连接服务端,同时将异步改为同步
               ChannelFuture channelFuture = bootstrap.connect(ip, port).sync();
               Channel channel = channelFuture.channel();
               System.out.println("--------" + channel.localAddress().toString().substring(1) + "--------");
   
               Scanner scanner = new Scanner(System.in);
               while (scanner.hasNextLine()) {
                   String nextLine = scanner.nextLine();
                   // 向服务端发送消息
                   channel.writeAndFlush(nextLine);
               }
   
               // 8. 关闭通道和关闭连接池
               channelFuture.channel().closeFuture().sync();
           } finally {
               group.shutdownGracefully();
           }
       }
   
       public static void main(String[] args) throws InterruptedException {
           new NettyChatClient("127.0.0.1", 9998).run();
       }
   }
   ```

2. 客户端业务处理类

   ```java
   /**
    * 聊天室客户端业务处理类
    *
    * @name: NettyChatClientHandler
    * @author: terwer
    * @date: 2022-04-27 23:45
    **/
   public class NettyChatClientHandler extends SimpleChannelInboundHandler<String> {
       /**
        * 通道读取事件
        *
        * @param ctx
        * @param msg
        * @throws Exception
        */
       @Override
       protected void channelRead0(ChannelHandlerContext ctx, String msg) throws Exception {
           System.out.println(msg);
       }
   }
   ```

## 运行效果

![image-20220428000626813](https://img1.terwer.space/image-20220428000626813.png)



![image-20220428000645018](https://img1.terwer.space/image-20220428000645018.png)



![image-20220428000707355](https://img1.terwer.space/image-20220428000707355.png)