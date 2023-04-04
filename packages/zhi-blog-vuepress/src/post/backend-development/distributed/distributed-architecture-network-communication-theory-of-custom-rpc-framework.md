---
title: 自定义RPC框架之分布式架构网络通信理论
short_title: ''
description: 本文阐述了自定义rpc框架需要知道理论，并探索了rpc框架需要解决的问题，并且进行了传统的RMI方式的实现。
date: 2022-04-16 22:45:15
category:
  - 后端开发
  - 分布式
tag:
  - rpc
  - rmi
article: true
timeline: false
---
本文阐述了自定义rpc框架需要知道理论，并探索了rpc框架需要解决的问题，并且进行了传统的RMI方式的实现。

<!-- more -->

# 自定义RPC框架之分布式架构网络通信理论

> 2022/03/14 校对完成
>
> 文章更新历史
>
> 2022/03/14 初稿。
>
> 2022/03/25 修复图片问题。

## 分布式架构网络通信

分布式的基础问题是远程服务是怎么通讯的。

`java` 领域有很多可实现远程通讯的技术，例如：`RMI` 、`Hessian` 、`SOAP` 、`ESB` 和 `JMS` 等。

### 远程通讯技术

#### RMI

JDK的RMI文档：[https://docs.oracle.com/javase/8/docs/technotes/guides/rmi/](https://docs.oracle.com/javase/8/docs/technotes/guides/rmi/)

#### Hessian 

Hessian官网：[http://hessian.caucho.com/](http://hessian.caucho.com/)

#### SOAP

SOAP：[https://zh.wikipedia.org/wiki/%E7%AE%80%E5%8D%95%E5%AF%B9%E8%B1%A1%E8%AE%BF%E9%97%AE%E5%8D%8F%E8%AE%AE](https://zh.wikipedia.org/wiki/%E7%AE%80%E5%8D%95%E5%AF%B9%E8%B1%A1%E8%AE%BF%E9%97%AE%E5%8D%8F%E8%AE%AE)

- WSDL WS-* are language-agnostic.

- JAX-WS are Java standard to build web service.

- [Apache CXF](http://cxf.apache.org/docs/why-cxf.html) and [Apache Axis 2](http://axis.apache.org/axis2/java/core/) are two implementations of JAX-WS. They also offer JAX-RS implementations so that you can build Restful services.

- CXF has better integration with Spring, and Camel([camel-cxf](http://camel.apache.org/components.html)). And Axis 2 seems not have a active release.

- [https://github.com/eclipse-ee4j/jersey](https://github.com/eclipse-ee4j/jersey)

- [https://cxf.apache.org/index.html](https://cxf.apache.org/index.html)

- [https://github.com/apache/axis-axis2-java-core](https://github.com/apache/axis-axis2-java-core)

#### ESB

ESB：[https://zh.wikipedia.org/wiki/%E4%BC%81%E4%B8%9A%E6%9C%8D%E5%8A%A1%E6%80%BB%E7%BA%BF](https://zh.wikipedia.org/wiki/%E4%BC%81%E4%B8%9A%E6%9C%8D%E5%8A%A1%E6%80%BB%E7%BA%BF)

- Spring Integration：[https://spring.io/projects/spring-integration](https://spring.io/projects/spring-integration)

- Mule ESB：[https://www.mulesoft.com/resources/esb/what-mule-esb](https://www.mulesoft.com/resources/esb/what-mule-esb)

- Apache Camel：[https://camel.apache.org/](https://camel.apache.org/)

#### JMS

JMS：[https://www.oracle.com/java/technologies/java-message-service.html](https://www.oracle.com/java/technologies/java-message-service.html)

[https://spring.io/guides/gs/messaging-jms/](https://spring.io/guides/gs/messaging-jms/)

- Spring JMS is the Spring abstraction over the JMS API.
- JMS is just an API; you need a physical broker to actually do messaging.
- ActiveMQ is not a framework, it is an open-source JMS broker that supports the actual persistence and delivery of messages.
- Spring JMS can be used with any JMS broker, including ActiveMQ. Each broker provides its own JMS API client jar.
- RabbitMQ is not a native JMS broker; its native protocol is AMQP 0.9.1; it does, however, provide a JMS API client that can be used with Spring JMS, but Spring AMQP is the preferred library for talking to RabbitMQ because it provides much more functionality than is available over JMS.
- There are lots of examples for using Spring JMS on the internet.
- The simplest way to get started is with Spring Boot and `@JmsListener`.

### 基本原理

从网络通信的底层去看，通信要做的事情就是把流从一台计算机传输到另外一台计算机。使用传输协议和网络IO实现，传输协议比较知名的如 `TCP` 、`UDP` 等。

`TCP` 和 `UDP` 都是在基于 `socket` 的概念上为某类应用场景扩展出来的传输层协议。

网络 `IO` 主要由 `bio` 、`nio`、`aio`，所有的分布式都是基于这个原理实现的。

### 什么是RPC

rpc全称是 `remote procedure call` ，既远程过程调用。借助 `RPC` 可以做到像本地调用一样调用远程服务，是一种进程间的通信方式。

`RPC` 不是一个具体的技术，而是指整个网络调用的过程。

下面展示的是本地调用和远程调用的示例：

例如有A服务器部署了一个应用，B服务器也部署了一个应用，现在A服务器上的应用想要调用B服务器上的应用的方法，由于，两个应用不在同一个服务器，因此不在同一个内存空间，无法实现直接调用，需要通过网络来表达调用的语义和传达调用的数据。

<img src="https://img1.terwer.space/16467573463113.jpg" style="zoom:50%;" />

<img src="https://img1.terwer.space/16467573463123.jpg" style="zoom:50%;" />

### RPC架构

一个完整的RPC架构包含四个完整的组件，分表是Client，Client Stub，Server和Server Stub。Stub可以理解为存根。

* 客户端（Client），服务的调用方。
* 客户端存根（Client Stub），存放服务端的地址消息，将客户端的请求打包成网络消息，通过网络远程发送给服务方。
* 服务端（Server），真正的服务端提供者。
* 服务端存根（Sever Stub），接收客户端发送过来的消息，将消息解包，并调用本地方法。

<img src="https://img1.terwer.space/16467573463136.png" style="zoom:50%;" />



<img src="https://img1.terwer.space/16467573463152.png" style="zoom:50%;" />

1、客户端以本地方式调用服务

2、客户端存根接收到调用之后，将方法参数组装成能进行网络传输的消息体，消息体序列化为二进制

3、客户端通过`socket`将消息发送到服务端

4、服务端存根接收到消息之后进行解码，将消息对象反序列化

5、服务端存根根据解码结果调用本地服务

6、服务处理

7、本地服务执行并将结果返回给服务端存根

8、服务端存根将返回结果打包成消息，将结果消息对象序列化

9、服务端通过socket将消息发送到客户端

10、客户端存根接收到消息并进行解码，将消息对象反序列化

11、客户端得到最终结果

RPC的目标是只保留1、6、11，将其他的细节全部封装起来。

注意：不管是什么类型的数据，在输出过程中都要转换成二进制流，而接收方需要将二进制流恢复为对象。

Java中常见的RPC框架有Hessian、gRPC、Dubbo等，核心模块都是通讯和序列化

[https://github.com/grpc/grpc-java](https://github.com/grpc/grpc-java)

### RMI

Java的RMI指的是 `Remote Method Invocation`，一种实现远程过程调用（RPC）的API，能直接传输序列化后的Java对象。它的实现依赖于JVM，因此它能支撑一个JVM到另外一个JVM的调用。

<img src="https://img1.terwer.space/16467573463168.jpg" style="zoom:50%;" />


1、客户端从远程服务器的注册表中查询并获取远程对象的引用。

2、桩对象与远程对象有相同的接口和方法列表，当客户端调用远程对象时候，实际上是由桩对象代理完成。

3、远程引用层将桩的本地引用转换为服务器上对象的远程引用，再将调用层传递给传输层，由传输层通过TCP协议发起调用。

4、在服务端，传输层监听入站链接，收到客户端的远程调用之后，将引用转发到上层的远程引用层；

服务端的远程引用层将客户端发送的远程引用转换为本地虚拟机的引用，再将请求传递给骨架；

骨架读取参数，将请求传递给服务器，由服务器进行实际的方法调用。

5、如果远程方法调用之后有返回值，服务器将结果沿着 "骨架->远程引用层->传输层" 向下传递。

6、客户端的传输层接收到返回值之后，又沿着 "传输层->远程引用层->桩" 向上传递，并最终将结果传递给客户端程序。

### RMI实例需求分析

1、服务端提供根据ID查询用户的方法

2、客户端调用服务端方法，并返回用户对象

3、要求使用RMI进行远程通讯

#### 服务端实现

```java
/**
 * RMI服务端
 *
 * @name: RMIServer
 * @author: terwer
 * @date: 2022-03-06 02:01
 **/
public class RMIServer {
    public static void main(String[] args) {
        try {
            // 1.注册Registry实例，绑定端口
            Registry registry = LocateRegistry.createRegistry(9998);
            // 2.创建远程对象
            IUserService userService = new UserServiceImpl();
            // 3.将远程对象注册到RMI服务器（既服务端注册表）
            registry.rebind("userService", userService);

            System.out.println("RMI服务端启动成功");
        } catch (RemoteException e) {
            e.printStackTrace();
        }
    }
}
```

#### 客户端实现

```java
/**
 * RMI客户端
 *
 * @name: RMIClient
 * @author: terwer
 * @date: 2022-03-06 19:25
 **/
public class RMIClient {
    public static void main(String[] args) throws RemoteException, NotBoundException {
        // 1、获取Registry实例
        Registry registry = LocateRegistry.getRegistry("127.0.0.1", 9998);
        // 2、通过Registry查找远程对象
        IUserService userService = (IUserService) registry.lookup("userService");
        User user = userService.getUserById(1);
        System.out.println("userName = " + user.getName());
    }
}
```

#### 效果预览

<img src="https://img1.terwer.space/16467573463195.png" alt="image-20220306193226744" style="zoom:50%;" />

<img src="https://img1.terwer.space/16467573463236.png" alt="image-20220306193244530" style="zoom:50%;" />