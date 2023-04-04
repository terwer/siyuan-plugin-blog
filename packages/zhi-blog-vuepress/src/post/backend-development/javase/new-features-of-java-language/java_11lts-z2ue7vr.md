---
title: Java_11-LTS
short_title: ''
description: jdk于年月日发布[]。java为什么重要？java是继java之后的第二个lts（longtermsupport）版本。自java起oraclejdk将不再免费提供商业用途。您可以在开发阶段使用它但要在商业上使用它则需要购买许可证。java是最后一个可以下载的免费oraclejdk。oracle从年月开始就停止了对java的支持。您需要支付更多的支持费用。如果不这样做虽然您可以继续使用它但不会获得任何补丁安全更新。自java起oracle将不再为任何单个java版本提供免费的长期支持（lts）。尽管or
date: 2022-10-07 21:58:55
category:
  - Java语言新特性
  - 后端开发
  - JavaSE
tag:
  - 修补
  - 安全性
  - 漏洞
  - 功能
  - 发布
  - jdk
  - jdk11
  - java
  - java11
  - javase
article: true
timeline: false
---
JDK 11 于 2018 年 9 月 25 日发布 [[249]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-249) 。

## Java 11 为什么重要？

Java 11 是继 Java 8 之后的第二个 LTS（long-term support）版本。 **自 Java 11 起，Oracle JDK 将不再免费提供商业用途** 。

您可以在开发阶段使用它，但要在商业上使用它，则需要购买许可证。

Java 10 是最后一个可以下载的免费 Oracle JDK。

Oracle 从 2019 年 1 月开始就停止了对 Java 8 的支持。您需要支付更多的支持费用。

如果不这样做，虽然您可以继续使用它，但不会获得任何补丁/ 安全更新。

> 自 Java 11 起，Oracle 将不再为任何单个 Java 版本提供免费的长期支持（LTS）。

尽管 Oracle JDK 不再免费，但是您始终可以从 Oracle 或其他提供商（例如 AdoptOpenJDK，Azul，IBM，Red Hat 等..）下载 [Open JDK](https://openjdk.java.net/) 构建。

## 什么是 LTS Module

从 2017 年开始，Oracle 和 Java 社区宣布了向 Java 的新 6 个月节奏的转变。它已迁移到 Oracle Java SE 产品的长期支持（LTS）模型。

LTS 版本的产品将提供 Oracle 的首要和持续的支持，目标是每三年一次。

每个 Java 版本都以一两个主要特性为模型，这些特性驱动了版本的发布。任何障碍都会推迟发布和上市时间。Jigsaw 项目就是 Java 9 的一个主要特性，它多次推迟了发布日期，并且发布时间被推迟了超过 `1.5` 年。6 个月一版的发车节奏将让特性紧随。发布的列车每 6 个月有一个时间表。赶上这列火车的特征会被留下，否则他们就等下一班火车。

## Oracle JDK 与 Open JDK

为了对开发人员更加友好，Oracle & Java 社区现在将 OpenJDK 二进制文件作为主要 JDK 进行推广。

这与早期的 JDK 二进制文件是由 Oracle 专有并由 Oracle 许可的模式相比，很大程度上减轻了人们的负担，因为 Oracle 对重新发布有各种限制。

然而，Oracle 将继续生产他们的 JDK，但仅限于长期支持版本。这是朝着对云和容器更友好的方向迈出的一步，因为开放 JDK 二进制文件可以作为容器的一部分分发。

Open JDK 的二进制文件每 6 个月发布一次，而 Oracle JDK 的二进制文件每 3 年发布一次（LTS 版本）。

## 主要特性

Java 11 包含如下更新：

* JEP 181：针对嵌套成员的访问控制
* JEP 309：动态类文件常量
* JEP 315：利用 Aarch64 的特有架构改进其上的性能
* JEP 318：Epsilon：无操作垃圾收集器
* JEP 320：移除 Java EE 和 CORBA 模块
* JEP 321：HTTP Client
* JEP 323：lambda 参数的局部变量语法
* JEP 324：支持 Curve25519 和 Curve 448 密钥
* JEP 327：Unicode 10
* JEP 328：添加 Java 飞行记录器（JFR），其用于创建性能分析记录
* JEP 329：ChaCha20 和 Poly1305 加密算法
* JEP 330：运行单文件源码程序
* JEP 331：低开销堆分析
* JEP 332：支持 TLS 1.3
* JEP 333：添加 ZGC（一个可扩展的低延迟垃圾收集器）
* JEP 335：弃用 Nashorn JavaScript 引擎
* JEP 336：弃用 Pack200 相关的工具及 API

## Java 11 更新

|版本|发布日期|重点|
| :-------------------| :--------: | :---------------------------------------------------------------------------|
|Java SE 11[250]|2018-09-25|初始版本|
|Java SE 11.0.1[251]|2018-10-16|安全性修补和漏洞修补|
|Java SE 11.0.2[252]|2019-01-15|安全性修补和漏洞修补|
|Java SE 11.0.3[253]|2019-04-16|新功能，安全性修补和漏洞修补|
|Java SE 11.0.4[254]|2019-07-16|新功能，安全性修补和漏洞修补；HotSpot 现在可以正确地侦测 Windows Server 2019|
|Java SE 11.0.5[255]|2019-10-15|新功能，安全性修补和漏洞修补|
|Java SE 11.0.6[256]|2020-01-14|新功能，安全性修补和漏洞修补|
|Java SE 11.0.7[257]|2020-04-14|新功能，安全性修补和漏洞修补|
|Java SE 11.0.8[258]|2020-07-14|新功能，安全性修补和漏洞修补|
|Java SE 11.0.9[259]|2020-10-20|新功能，安全性修补和漏洞修补|
|Java SE 11.0.10[260]|2021-01-19|新功能，安全性修补和漏洞修补|
|Java SE 11.0.11[261]|2021-04-20|新功能，安全性修补和漏洞修补|

## 参考

[https://www.wdbyte.com/2020/03/jdk/jdk11-feature/](https://www.wdbyte.com/2020/03/jdk/jdk11-feature/)

[https://www.cnblogs.com/wmyskxz/p/13544669.html](https://www.cnblogs.com/wmyskxz/p/13544669.html)

## Java 11 下载

### Oracle 下载

[https://www.oracle.com/java/technologies/javase/jdk11-archive-downloads.html](https://www.oracle.com/java/technologies/javase/jdk11-archive-downloads.html)

### adoptium 下载

[https://adoptium.net/zh-CN/temurin/releases/?version=11](https://adoptium.net/zh-CN/temurin/releases/?version=11)

### amazon corretto 下载

[https://docs.aws.amazon.com/corretto/latest/corretto-11-ug/downloads-list.html](https://docs.aws.amazon.com/corretto/latest/corretto-11-ug/downloads-list.html)

‍