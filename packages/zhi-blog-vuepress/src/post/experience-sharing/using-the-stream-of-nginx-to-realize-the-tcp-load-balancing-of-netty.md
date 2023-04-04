---
title: 利用Nginx的stream实现Netty的TCP负载均衡
short_title: ''
description: 随着设备连接数增多，单台服务器支撑的TCP长连接数有限，这个时候程序架构就需要改变，一般都会采取横向扩展，增加多台服务器程序。怎么将TCP长连接均衡的路由到不同的服务器，这个时候就需要实现负载均衡了。
date: 2022-05-04 23:05:33
category:
  - 实用技巧
  - 经验分享
tag:
  - netty
  - nginx
  - load
  - banance
  - tcp
article: true
timeline: false
---
随着设备连接数增多，单台服务器支撑的TCP长连接数有限，这个时候程序架构就需要改变，一般都会采取横向扩展，增加多台服务器程序。怎么将TCP长连接均衡的路由到不同的服务器，这个时候就需要实现负载均衡了。

<!-- more -->

## 两种不同的场景和方案

两种应用场景是：

1. 客户端实现比较简单，所有客户端都会连接同一个ip域名和端口。客户端不会去请求可用服务器列表，然后去根据具列表选择不同的服务器。比如说一些DTU等硬件设备或者因为前期没有考虑负载均衡而导致的遗留老项目。

   **解决方案：**

   在目标服务器上做TCP负载均衡，转发到不同的服务器上，但是这种方案需要解决负载均衡服务器的单点故障。例如可以通过Nginx开启TCP负载均衡功能来实现。

2. 客户端本身就实现了请求可用服务器列表，然后根据列表去连接不同的服务器。

    **解决方案**

   解决方案比较多，例如可以通过 `Zookeeper` 、`SpringCloud` 等来实现。

## 方案一：Nginx实现负载均衡

1. 安装Nginx

2. 修改nginx.conf添加负载均衡配置

   参考：[http://nginx.org/en/docs/stream/ngx_stream_core_module.html](http://nginx.org/en/docs/stream/ngx_stream_core_module.html)

   配置如下：

   ```
   worker_processes  1;
   
   events {
       worker_connections  1024;
   }
   
   #tcp load balance
   stream{
       # 更多更详细的参数，查看文档或网络
       upstream netty_test{
           server 127.0.0.1:9991 weight=1;
           server 127.0.0.1:9992 weight=1;
       }
   
       server{
           listen 9999;
           proxy_pass netty_test;
       }
   }
   ```

3. 连接测试

   启动两个netty服务器程序，在生产环境中会部署到不同的服务器，这里测试，在同一台PC上启动两个netty程序,端口分别为 `9991` 和`9992`。

   使用客户端连接 `127.0.0.1:9999` ，当建立多个连接时，客户端会被平均路由到 `127.0.0.1:9991` 和 `9992` 两个server。

   ![image-20220504231718582](https://img1.terwer.space/image-20220504231718582.png)

   

   ![image-20220504231740884](https://img1.terwer.space/image-20220504231740884.png)