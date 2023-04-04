---
title: Reactor模型
short_title: ''
description: 通过一个或者多个输入传递给服务器的模式，服务端程序处理传入的多个请求，并将他们同步分派到处理线程，Reactor模式也叫Dispatch模式。
date: 2022-05-04 15:25:48
category:
  - 后端开发
  - 分布式
tag:
  - io
  - reactor
article: true
timeline: false
---
#### Reactor模型

通过一个或者多个输入传递给服务器的模式，服务端程序处理传入的多个请求，并将他们同步分派到处理线程，Reactor模式也叫Dispatch模式。

Reactor模式使用IO复用监听事件，分发给某个线程（进程），这是网络服务器高并发处理的关键。

1. 单Reactor单线程

   ![image-20220419181815189](https://img1.terwer.space/image-20220419181815189.png)

   - Selector可以实现应用程序通过一个阻塞对象监听多路连接请求
   - Reactor对象通过Selector监控客户端请求事件，收到事件后通过Dispatch进行分发
   - 如果是建立连接请求事件，则由Acceptor通过Accept处理连接请求，然后创建一个handler处理连接完成后的后续业务逻辑
   - Handler会完成Read->业务处理->Send的完整业务流程

   优点：

   模型简单，没有多线程、进程通信、竞争的问题，全部都在一个线程完成。

   缺点

   1. 性能问题

      只有一个线程，无法发挥多核CPU的性能。Handler在处理某个连接上的业务时，整个线程无法处理其他连接事件，容易造成性能瓶劲

   2. 可靠性问题

      线程意外终止或者陷入死循环，会导致整个通信模块不可用，不能接收和处理消息，造成节点故障。

2. 单Reactor多线程

   ![image-20220419212849627](https://img1.terwer.space/image-20220419212849627.png)

   - Reactor对象通过Selector监控客户端请求事件，收到时间后通过Dispatch进行分发
   - 如果建立连接请求，则由Acceptor通过Accept处理请求
   - 如果不是连接请求，则由Reactor分发，调用连接对应的handler进行处理
   - handler只负责响应事件，不做具体的业务处理，通过read读取数据后，会分发给后面的worker线程池的某个线程进行处理
   - worder线程池会分配独立线程完成真正的业务，并将结果返回给handler
   - handler收到响应后，通过send将结果返回给client

   优点

   可以充分利用多核CPU的处理能力

   缺点

   多线程数据共享和访问复杂。

   reactor处理所有事件的监听和响应，在单线程运行，在高并发场景容易出现性能瓶劲

3. 主从Reactor多线程

   ![image-20220419213713256](https://img1.terwer.space/image-20220419213713256.png)

   - Reactor主线程MainReactor对象通过select监听客户端事件，收到事件后，通过Acceptor处理客户端连接事件。

   - 当Acceptor处理完客户端连接事件之后（与客户端建立好socket连接），MainReactor将连接分配给SubReactor。

     MainReactor只负责监听客户端连接请求，和客户端建立连接之后，交由SubReactor监听后面的IO事件。

   - SubReactor将连接加入到自己的连接队列，进行监听，并创建handler对各种事件进行处理。

   - handler通过read从连接中读取数据，将请求数据分发给worker线程，进行业务处理。

   - worder线程池分别独立的线程进行真正的业务处理，并将处理结果返回给handler。

     handler通过send向客户端发送数据。

   - 一个MainReactor可以对应多个SubReactor，即一个MainReactor线程可以对应多个SubReactor线程。

   优点

   1. MainReactor线程与SubReactor线程数据交互简单，职责明确，MainReactor线程只需要接收新连接，SubReactor完成后续的线程处理
   2. MainReactor线程与SubReactor线程数据交互简单，MainReactor线程只需要把新连接传递给SubReactor，SubReactor无需返回数据
   3. 多个SubReactor能够应对高并发的需求

   缺点

   编程复杂度高。

   由于优点明显，多个项目广泛使用。例如Nginx、Mencached、Netty等。

   这种模式也叫做服务器的1+M+N模式，即该模式开发包含1个（或者多个，1代表相对较少）服务器+M个连接建立的线程+N个业务处理线程。

   这是业界成熟的服务器设计模式。

1. -