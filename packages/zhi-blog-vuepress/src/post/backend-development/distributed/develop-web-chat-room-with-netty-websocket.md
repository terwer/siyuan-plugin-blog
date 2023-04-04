---
title: Netty高级进阶之基于Netty的Websocket开发网页聊天室
short_title: ''
description: 本通过实战演练，学习了如何基于Netty的websocket开发一个网页聊天室。
date: 2022-04-27 02:12:26
category:
  - 后端开发
  - 分布式
tag:
  - netty
  - websocket
  - chat
  - web
article: true
timeline: false
---
本通过实战演练，学习了如何基于Netty的websocket开发一个网页聊天室。

<!-- more -->

# Netty高级进阶之基于Netty的Websocket开发网页聊天室

## Webdocket简介

Websockt是一种在单个TCP连接上进行全双工通信的协议。

Websocket使客户端和服务端的数据交互变得简单，**允许服务器主动向客户端推送数据**。

在Websocket API中，客户端只需要与服务器完成一次握手，两者之间就可以创建持久性的连接，并进行双向数据传输。

他的应用场景如下：

- 社交订阅
- 协同编辑/编程
- 股票基金报价
- 体育实况更新
- 多媒体聊天
- 在线教育

## Websocket和HTTP的区别

HTTP协议是应用层的协议，是基于TCP协议的。

HTTP协议必须经过三次握手才能发送消息。

HTTP连接分为短连接和长链接。短连接是每次都要经过三次握手才能发送消息。就是说每一个request对应一个response。长连接在一定期限内保持TCP连接不断开。

客户端与服务器通信，必须由客户端先发起，然后服务端返回结果。客户端是主动的，服务端是被动的。

客户端想要实时获取服务端的消息，就要不断发送长连接到服务端。



Websocket实现了多路复用，它是全双工通信。在Websocket协议下，服务端和客户端可以同时发送消息。

建立了Websocket连接之后，服务端可以主动给客户端发送消息。信息中不必带有header的部分信息，与HTTP长连接通信对比，**这种方式降低了服务器的压力，信息当中也减少了多余的信息**。

## 导入基础环境

1. 新建netty-springboot项目

   ![image-20220430225632849](https://img1.terwer.space/image-20220430225632849.png)

2. 导入依赖模块

   ```xml
   <dependencies>
       <!-- 模板引擎 -->
       <dependency>
           <groupId>org.springframework.boot</groupId>
           <artifactId>spring-boot-starter-thymeleaf</artifactId>
       </dependency>
       <!-- web模块 -->
       <dependency>
           <groupId>org.springframework.boot</groupId>
           <artifactId>spring-boot-starter-web</artifactId>
       </dependency>
   
       <dependency>
           <groupId>org.projectlombok</groupId>
           <artifactId>lombok</artifactId>
           <optional>true</optional>
       </dependency>
       <dependency>
           <groupId>org.springframework.boot</groupId>
           <artifactId>spring-boot-starter-test</artifactId>
           <scope>test</scope>
       </dependency>
   </dependencies>
   ```

3. 导入静态资源

   ![image-20220430230249496](https://img1.terwer.space/image-20220430230249496.png)

4. 配置yaml

   ```yaml
   server:
     port: 8080
   resources:
     static-locations:
       - classpath:/static/
   spring:
     thymeleaf:
       cache: false
       checktemplatelocation: true
       enabled: true
       encoding: UTF-8
       mode: HTML
       prefix: classpath:/templates/
       suffix: .html
   ```

关于Springboot整合thymeleaf的404问题，参考：

[/post/404-problem-with-springboot-configuration-thymeleaf.html](/post/404-problem-with-springboot-configuration-thymeleaf.html)

## 代码实现

### 服务端开发

1. 添加Netty相关依赖

   ```xml
   <!--引入netty依赖 -->
   <dependency>
       <groupId>io.netty</groupId>
       <artifactId>netty-all</artifactId>
   </dependency>
   ```

2. Netty相关配置

   ```yaml
   netty:
     port: 8081
     ip: 127.0.0.1
     path: /chat
   ```

3. Netty配置类

   ```java
   /**
    * Netty配置类
    *
    * @name: NettyConfig
    * @author: terwer
    * @date: 2022-05-01 00:04
    **/
   @Component
   @Data
   @ConfigurationProperties(prefix = "netty")
   public class NettyConfig {
       // netty监听端口
       private int port;
       // webdocket访问路径
       private String path;
   }
   ```

4. Netty的WebsocketServer开发

   ```java
   /**
    * Netty的Websocket服务器
    *
    * @name: NettyWebsocketServer
    * @author: terwer
    * @date: 2022-05-01 00:11
    **/
   @Component
   public class NettyWebsocketServer implements Runnable {
       @Autowired
       private NettyConfig nettyConfig;
       @Autowired
       private WebsocketChannelInit websocketChannelInit;
   
       private NioEventLoopGroup bossGroup = new NioEventLoopGroup(1);
       private NioEventLoopGroup workerGroup = new NioEventLoopGroup();
   
       @Override
       public void run() {
           try {
               // 1.创建服务端启动助手
               ServerBootstrap serverBootstrap = new ServerBootstrap();
               // 2.设置线程组
               serverBootstrap.group(bossGroup, workerGroup);
               // 3.设置参数
               serverBootstrap.channel(NioServerSocketChannel.class)
                       .handler(new LoggingHandler(LogLevel.DEBUG))
                       .childHandler(websocketChannelInit);
               // 4.启动服务端
               ChannelFuture channelFuture = serverBootstrap.bind(nettyConfig.getPort()).sync();
               System.out.println("------Netty服务端启动成功------");
               channelFuture.channel().closeFuture().sync();
           } catch (InterruptedException e) {
               e.printStackTrace();
               bossGroup.shutdownGracefully();
               workerGroup.shutdownGracefully();
               throw new RuntimeException(e);
           } finally {
               bossGroup.shutdownGracefully();
               workerGroup.shutdownGracefully();
           }
       }
   
       /**
        * 关闭资源-容器销毁时候关闭
        */
       @PreDestroy
       public void close() {
           bossGroup.shutdownGracefully();
           workerGroup.shutdownGracefully();
       }
   }
   ```

5. 通道初始化对象

   ````java
   /**
    * 通道初始化对象
    *
    * @name: WebsocketChannelInit
    * @author: terwer
    * @date: 2022-05-01 23:11
    **/
   @Component
   public class WebsocketChannelInit extends ChannelInitializer {
   
       @Autowired
       private NettyConfig nettyConfig;
   
       @Autowired
       private WebsocketHandler websocketHandler;
   
       @Override
       protected void initChannel(Channel channel) throws Exception {
           ChannelPipeline pipeline = channel.pipeline();
   
           // 对HTTP协议的支持
           pipeline.addLast(new HttpServerCodec());
   
           // 对大数据流的支持
           pipeline.addLast(new ChunkedWriteHandler());
   
           // post请求分为三个部分：request line/request header/message body
           // 对POST请求的支持，将多个信息转化成单一的request/response对象
           pipeline.addLast(new HttpObjectAggregator(8000));
   
           // 对WebSocket协议的支持
           // 将http协议升级为ws协议
           pipeline.addLast(new WebSocketServerProtocolHandler(nettyConfig.getPath()));
   
           // 自定义处理handler
           pipeline.addLast(websocketHandler);
       }
   }
   ````

6. 处理对象

   ```java
   /**
    * 自定义Websocket处理类
    * Websocket数据以帧的形式进行处理
    * 需要设置通道共享
    *
    * @name: WebsocketHandler
    * @author: terwer
    * @date: 2022-05-01 23:21
    **/
   @Component
   @ChannelHandler.Sharable
   public class WebsocketHandler extends SimpleChannelInboundHandler<TextWebSocketFrame> {
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
           System.out.println("有新的链接");
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
           System.out.println("连接断开");
       }
   
       /**
        * 通道读取事件
        *
        * @param ctx
        * @param textWebSocketFrame
        * @throws Exception
        */
       @Override
       protected void channelRead0(ChannelHandlerContext ctx, TextWebSocketFrame textWebSocketFrame) throws Exception {
           String msg = textWebSocketFrame.text();
           System.out.println("接收到消息：" + msg);
           // 当前发送消息的通道
           Channel channel = ctx.channel();
           for (Channel channel1 : channelList) {
               // 排除自身通道
               if (channel != channel1) {
                   channel1.writeAndFlush(new TextWebSocketFrame(msg));
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
           System.out.println("消息发送异常。");
           // 移除
           channelList.remove(channel);
       }
   }
   ```

   **注意：处理类需要设置成共享的**

7. 启动类

   ```java
   @SpringBootApplication
   public class NettySpringbootApplication implements CommandLineRunner {
   
       @Autowired
       private NettyWebsocketServer nettyWebsocketServer;
   
       public static void main(String[] args) {
           SpringApplication.run(NettySpringbootApplication.class, args);
       }
   
       @Override
       public void run(String... args) throws Exception {
           new Thread(nettyWebsocketServer).start();
       }
   }
   ```

### 前端js开发

   - 建立连接

     ```javascript
     var ws = new WebSocket("ws://localhost:8081/chat");
     ws.onopen = function () {
       console.log("连接成功")
     }
     ```

   - 发送消息

     ```javascript
     function sendMsg() {
         var message = $("#my_test").val();
         $("#msg_list").append(`<li class="active"}>
                                   <div class="main self">
                                       <div class="text">` + message + `</div>
                                   </div>
                               </li>`);
         $("#my_test").val('');
     
         //发送消息
         message = username + ":" + message;
         ws.send(message);
         // 置底
         setBottom();
     }
     ```

   - 接收消息

     ```javascript
     ws.onmessage = function (evt) {
         showMessage(evt.data);
     }
     
     function showMessage(message) {
         // 张三:你好
         var str = message.split(":");
         $("#msg_list").append(`<li class="active"}>
                                   <div class="main">
                                     <img class="avatar" width="30" height="30" src="/img/user.png">
                                     <div>
                                         <div class="user_name">${str[0]}</div>
                                         <div class="text">${str[1]}</div>
                                     </div>                       
                                    </div>
                               </li>`);
         // 置底
         setBottom();
     }
     ```

   - 关闭与错误处理

     ```javascript
     ws.onclose = function (){
         console.log("连接关闭")
     }
     
     ws.onerror = function (){
         console.log("连接异常")
     }
     ```


## 运行效果

![image-20220502001145851](https://img1.terwer.space/image-20220502001145851.png)



![image-20220502001159603](../../../../../../../Library/Application Support/typora-user-images/image-20220502001159603.png)



![image-20220502001220081](https://img1.terwer.space/image-20220502001220081.png)