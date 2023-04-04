---
title: 分布式架构服务调用
short_title: ''
description: 和传统单体架构相比，分布式多了一个远程服务之间的通信，不管soa还是微服务，本质都是对业务服务的提炼和复用。
date: 2022-05-04 17:08:29
category:
  - 后端开发
  - 分布式
tag:
  - rpc
  - service
  - call
article: true
timeline: false
---
## 分布式架构服务调用

### 服务调用

和传统单体架构相比，分布式多了一个远程服务之间的通信，不管soa还是微服务，本质都是对业务服务的提炼和复用。

远程服务之间的调用，才是实现分布式的关键因素。

![image-20220411220220544](https://img1.terwer.space/image-20220411220220544.png)

### 实现方式

#### HTTP通信协议的框架

1. HttpURLConnection

   [https://docs.oracle.com/javase/8/docs/api/java/net/HttpURLConnection.html](https://docs.oracle.com/javase/8/docs/api/java/net/HttpURLConnection.html)

   java原生的HttpURLConnection是基于http协议的，支持get，post，put，delete等各种请求方式，最常用的是get和post

2. Apache Common HttpClient

   [https://hc.apache.org/](https://hc.apache.org/)

   HttpClient是Apache Common的子项目，可以提供高效的、最新的、功能丰富的支持http协议的客户端编程工具包，并且支持http协议的最新版本。

   - 实现了所有的http方法，get，post，put，delete等
   - 支持https协议
   - 支持代理服务器

   备注：熔断机制探索。

3. OKhttp3

   [https://github.com/square/okhttp](https://github.com/square/okhttp)

   OKhttp是主流的网络请求开源框架，用于替代HttpURLConnection和Apache HttpClient。

   - 支持http2.0，对一台机器的请求共享一个socket
   - 采用连接池技术，可以有效的减少请求数量
   - 无缝集成gzip压缩
   - 支持Respose Cache，避免重复请求
   - 域名多ip支持

4. RestTemplate

   [https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/web/client/RestTemplate.html](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/web/client/RestTemplate.html)

   Spring RestTemplate是Spring提供的访问Rest服务的客户端。

   RestTemplate提供了多种便捷访问http服务的方法，能够大大提高客户端的效率，很多第三方都是用RestTemplate提供服务，例如Android。

   - 面向URL组件，必须依赖主机+端口+URI
   - RestTemplate不依赖于服务接口，仅关注Rest响应内容
   - Spring Cloud Feign

#### RPC框架

1. Java RMI

   Java RMI（Remote Method  Invocation）是一种基于Java的远程方法调用技术，是java 持有的一种RPC实现。

   ![image-20220411224754951](https://img1.terwer.space/image-20220411224754951.png)

2. Hessian

   Hessian是一个轻量级的remoting onhttp工具，使用简单的方法提供了RMI功能，相比WebService，Hessian更加简单、快捷。采用的是二进制RPC协议，因为采用的二进制协议，因此它更适合于发送二进制数据。

   ![image-20220411225103011](https://img1.terwer.space/image-20220411225103011.png)

3. Dubbo

   Dubbo是阿里开源的高性能的RPC框架，使应用可以通过高性能的RPC实现服务的输入和输出功能，可以和Spring框架无缝集成。

   Dubbo是一款高性能、轻量级的RPC框架，主要提供三大核心能力：面向接口的远程方法调用、智能容错和负载均衡，以及服务的自动注册与发现。

   ![image-20220411225808449](https://img1.terwer.space/image-20220411225808449.png)

4. gRPC

   gRPC是Google公司开源的一款高性能的远程过程调用（RPC）框架，可以再任何环境运行。

   该框架提供了负载均衡、跟踪、智能监控、身份验证等功能，可以实现系统之间的高效连接。

   ![image-20220411230203277](https://img1.terwer.space/image-20220411230203277.png)

### 跨域调用

#### 跨域

在分布式系统中，调用其他系统，可能出现跨域问题。

跨域的实质是浏览器的一种保护处理。

如果产生了跨域，服务器在返回结果时候会被浏览器拦截（请求是正常发起的，只是浏览器进行了拦截），导致响应内容不可用。

可能产生跨域的情况有以下几种：

| 当前页面URL              | 被请求页面的URL                 | 是否跨域 | 原因                         |
| ------------------------ | ------------------------------- | -------- | ---------------------------- |
| http://www.test.com      | http://www.test.com/index.html  | 否       | 同源（协议，域名，端口相同） |
| http://www.test.com      | Https://www.test.com/index.html | 跨域     | 协议不同（http/https）       |
| http://www.test.com      | http://www.baidu.com            | 跨域     | 主域名不同（test/baidu）     |
| http://www.test.com      | http://sub.test.com             | 跨域     | 子域名不同（www/sub）        |
| http://www.test.com:8080 | http://www.test.com:8090        | 跨域     | 端口号不同（8080/8090）      |

#### 跨域解决方案

1. 使用jsonp解决跨域问题

   缺点：不支持post请求，代码书写复杂

2. 使用HttpClient内部转发

3. 设置响应头允许跨域

   respose.setHeader("Access-Control-Allow-Origin", "*");

4. 基于Nginx搭建企业级API网关

5. 使用zuul搭建微服务API网关

   zuul是Spring Cloud的微服务网关。

   网关：一个网络 整体系统中，前置门户入口。

   请求首先经过网关，进行路径的路由，定位到具体的服务节点上。

   可以使用zuul过滤器的请求转发来解决跨域问题。