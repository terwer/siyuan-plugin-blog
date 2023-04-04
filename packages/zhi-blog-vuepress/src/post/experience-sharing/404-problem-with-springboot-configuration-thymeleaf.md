---
title: 关于Springboot配置thymeleaf的404问题
short_title: ''
date: 2022-04-30 23:42:57
category:
  - 实用技巧
  - 经验分享
tag:
  - error
  - '404'
  - springboot
  - thymeleaf
article: true
timeline: false
---
## 问题

我的yaml配置

```
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

controller目录结构

![image-20220430234546959](https://img1.terwer.space/image-20220430234546959.png)

## 原因

其实是一个非常简单的错误，找了半天。

我么默认创建的Springboot项目Application启动入口类目录是在项目包下面的。**如果我们创建的controller不是项目包的子包的话，那么自动扫描就不会扫码controller类，从而导致conroller无法注册，访问肯定就404了。**

## 解决

调整controller包的位置，使它位于Application所在包的子包下面即可。

![image-20220430235031452](https://img1.terwer.space/image-20220430235031452.png)

这样问题就解决了。