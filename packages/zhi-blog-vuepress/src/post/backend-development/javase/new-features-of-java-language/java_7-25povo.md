---
title: Java_7
short_title: ''
description: java（代号dolphin​[]）是一个重大的更新在年月日亮相[]并在年月日开放给开发者使用。[]发展时期被分类成十三个重要阶段最后一个阶段在年月日完成。[][]平均来看每个里程碑各有个版本（就是一般包括的功能增强和漏洞修复）。在openjdk项目中的功能清单（点击查看归档页面）中列出了很多的改变。jdk版本从jdk后年才发布原因是中间经历了sun公司被收购。大体发布历程是_年月sun开始开发jdkmilestone。年月sun在devoxx大会上宣布将闭包特性加入jdk并将jdk的发布日期推迟到年底。
date: 2022-10-07 19:56:58
category:
  - Java语言新特性
  - 后端开发
  - JavaSE
tag:
  - 支持
  - 发布
  - jdk
  - jdk7
  - java7
  - java
  - javase
article: true
timeline: false
---
JAVA 7 （代号 **Dolphin**​[[108]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-JDK7-108) ） 是一个重大的更新，在 2011 年 7 月 7 日亮相 [[109]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-109) ，并在 2011 年 7 月 28 日开放给开发者使用。 [[110]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-110) 发展时期被分类成十三个重要阶段，最后一个阶段在 2011 年 6 月 6 日完成。 [[111]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-111)  [[112]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-112) 平均来看，每个里程碑各有 8 个版本（就是一般包括的功能增强和漏洞修复） 。在 [OpenJDK 7 项目中的功能清单](http://openjdk.java.net/projects/jdk7/features/)（[点击查看归档页面](https://web.archive.org/web/20120211102104/http://openjdk.java.net/projects/jdk7/features/)）中列出了很多的改变。

JDK7 版本从 JDK6 后 5 年才发布，原因是中间经历了 Sun 公司被收购。大体发布历程是：

2009 年 1 月, Sun 开始开发 JDK7 Milestone 1。

2009 年 11 月，Sun 在 Devoxx 2009 大会上宣布将闭包特性加入 JDK7，并将 JDK7 的发布日期推迟到 2010 年底。

2010 年 4 月，Oracle 收购 Sun。

2010 年 9 月，Mark Reinhold 在 JavaOne 大会上宣布 JDK7 将砍去 Lambda、Jigsaw 和部分 Coin 新特性并于 2011 年中发布，其余部分的新特性将于 2012 年底同 JDK8 一同发布。

2010 年 10 月，IBM 宣布加入 OpenJDK，将与 Oracle 合作共同开发 JDK。此后，Apple 和 SAP 也陆续加入 OpenJDK 社区。

2011 年 7 月 28 日，Oracle 正式发布 JDK7，并指定 OpenJDK7 为参考实现。

## 主要特性

在 Java 7 中新增的功能包括：[[113]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-113)

* [JVM](https://zh.wikipedia.org/wiki/JVM "JVM") 本身对[动态语言](https://zh.wikipedia.org/wiki/%E5%8A%A8%E6%80%81%E8%AF%AD%E8%A8%80 "动态语言")的支持：新的 `invokedynamic` 字节码指令（[JSR-292](http://jcp.org/en/jsr/detail?id=292)（[点击查看归档页面](https://web.archive.org/web/20201220200733/http://jcp.org/en/jsr/detail?id=292)）），与多语言虚拟机（Multi Language Virtual Machine）原型
* 64 位指针压缩 [[114]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-114) （Java 6 中可以使用 XX:+UseCompressedOops 开启）[[115]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-115)
* 一些语言方面的小改变（在 Coin 项目下的一个小群体）：[[116]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-116)
* 在 switch 中使用字符串类型[[117]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-117)
* try 语句中的自动资源管理[[118]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-118)
* 针对泛型实例的创建而改善的[类型推论](https://zh.wikipedia.org/wiki/%E9%A1%9E%E5%9E%8B%E6%8E%A8%E8%AB%96 "类型推论")，被称为钻石操作符 `<>`​[[119]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-119)
* 简化了 varargs 方法的声明[[120]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-120)
* 二进制整数字面值[[121]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-121)
* 允许在数值字面值中加入下划线[[122]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-122)
* 允许在一个 catch 中捕捉多个类型的异常，并使用改进的类型检查重新抛出异常[[123]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-123)
* JSR 166 下的并发实用工具[[124]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-124)
* 新的文件 [I/O](https://zh.wikipedia.org/wiki/I/O "I/O") 程序库 (JSR 203 定义) 增加多重文件的支持、文件原始资料和符号链接。新的包为：java.nio.file、java.nio.file.attribute 和 java.nio.file.spi [[125]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-125) [[126]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-126)
* 使用 Timsort 来为集合与数组排序，取代[归并排序](https://zh.wikipedia.org/wiki/%E5%BD%92%E5%B9%B6%E6%8E%92%E5%BA%8F "归并排序")
* 对[椭圆曲线加密](https://zh.wikipedia.org/wiki/%E6%A4%AD%E5%9C%86%E6%9B%B2%E7%BA%BF%E5%AF%86%E7%A0%81%E5%AD%A6 "椭圆曲线密码学")算法增加标准库级别的支持
* 一个给 Java 2D 的 XRender 传递途径，改进了现代 [GPUs](https://zh.wikipedia.org/wiki/%E5%9C%96%E5%BD%A2%E8%99%95%E7%90%86%E5%99%A8 "图形处理器") 特有的功能的处理
* 用于图形功能的新平台 API（最初在版本 6u10 中的实现为不支持的 API）[[127]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-127)
* 增强了对新网络通信协议（包括 SCTP 和 Sockets Direct Protocol）的标准库级别的支持
* 更新对 [XML](https://zh.wikipedia.org/wiki/XML "XML") 和 [Unicode](https://zh.wikipedia.org/wiki/Unicode "Unicode") 的支持，以符合最新标准
* Java 部署规则集[[128]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-128)

Lambda（Java 对[匿名函数](https://zh.wikipedia.org/wiki/%E5%8C%BF%E5%90%8D%E5%87%BD%E6%95%B0 "匿名函数")的实现）、Jigsaw（Java 对[模块化](https://zh.wikipedia.org/wiki/%E6%A8%A1%E7%B5%84_(%E7%A8%8B%E5%BC%8F%E8%A8%AD%E8%A8%88)) "模块 (程序设计)")的实现），以及其它一些 Coin 项目中的内容在 Java 7 里被放弃，而转为 Java 8 一部分（其中 Jigsaw 直至 Java 9 才得到实现）。[[129]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-JavaOne2011Keynote-129)

从 2012 年 4 月开始，Java 7 一直是 java.com 的默认下载版本，直到 Java 8 发布。[[130]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-Java7AutoUpdate-130)

## Java 7 更新

Oracle 在每季度发布 Java 7 家族每季的公开更新，至 2015 年 4 月产品支持生命周期 [[131]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-131) 结束时停止。[[132]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-132)

|版本|发布日期|重点|
| :-----------------------| :--------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|Java SE 7[133]|2011-07-28|初始版本；HotSpot VM 21|
|Java SE 7 Update 1[134]|2011-10-18|20 个安全漏洞修补；其它漏洞修补|
|Java SE 7 Update 2[135]|2011-12-12|没有安全漏洞修补；HotSpot VM 22；可靠性和性能改进；支持 Solaris 11 和 Firefox 5 之后的版本；JavaFX 包含 Java SE JDK, 改善了网页部属的应用程序。|
|Java SE 7 Update 3[136]|2012-02-14|14 个安全漏洞修补[137]|
|Java SE 7 Update 4[138]|2012-04-26|没有安全漏洞修补；HotSpot VM 23; JDK 支持 Mac OS X|
|Java SE 7 Update 5[139]|2012-06-12|14 个安全漏洞修补[140]|
|Java SE 7 Update 6[141]|2012-08-14|JavaFX 和 Java Access Bridge 被包含在 Java SE JDK 和 JRE 安装里面, JavaFX 支持触屏和触摸板, JavaFX 支持 Linux, JDK 和 JRE 支持 Mac OS X, JDK 在 ARM 上支持 Linux [142]|
|Java SE 7 Update 7[143]|2012-08-30|4 个安全漏洞修补[144]|
|Java SE 7 Update 9[145]|2012-10-16|30 个安全漏洞修补[146]|
|Java SE 7 Update 10[147]|2012-12-11|新的安全性功能，像是禁用任何 Java 应用程序在浏览器中运行的能力，以及当 JRE 处于不安全状况时发出警告的新对话框，另外也有一些漏洞修复|
|Java SE 7 Update 11[148]|2013-01-13|Olson Data 2012i；修复了在安装了 JavaFX 的独立版本的系统上插件注册问题, CVE-2013-0422 的安全修复；[149] Java applet 和 Web 启动应用程序的默认安全级别已从“中”增加到“高”|
|Java SE 7 Update 13[150]|2013-02-01|50 个安全漏洞修补|
|Java SE 7 Update 15[151]|2013-02-19|5 个安全漏洞修补|
|Java SE 7 Update 17[152]|2013-03-04|2 个安全漏洞修补|
|Java SE 7 Update 21[153]|2013-04-16|许多的改变，包括 42 个安全漏洞修补, 新的不包含插件的服务器 JRE , 以及以 ARM 架构运行的 Linux 上的  JDK|
|Java SE 7 Update 25[154]|2013-06-18|许多的改变，包括 40 个安全漏洞修补[155]|
|Java SE 7 Update 40[156]|2013-09-10|621 个漏洞修补；[157] 新的安全性功能, hardfloat ARM, Java 任务控制（Java Mission Control） 5.2 和 Retina Display 支持[158]|
|Java SE 7 Update 45[159]|2013-10-15|51 个安全漏洞修补；[160] 防止 Java 应用程序在未经授权时的重新分发；恢复安全提示；JAXP 变化；TimeZone.setDefault 的更改|
|Java SE 7 Update 51[161]|2014-01-14|36 个安全漏洞修补； 屏蔽没有表明身份的 JAVA 小程序（如远程控制台－Java Applet－IBM IMM 卡、HP iLO 卡），即使警告对话框中有“将在下一版本中被屏蔽”，[162][163] 17 个漏洞修补|
|Java SE 7 Update 55[164]|2014-04-15|37 个安全漏洞修补；[165] 19 个漏洞修补[166]|
|Java SE 7 Update 60[167]|2014-05-28|Java Mission Control 5.3[168]，130 个漏洞修补[169]|
|Java SE 7 Update 65[170]|2014-07-15|18 个漏洞修补[171]|
|Java SE 7 Update 67[172]|2014-08-04|1 个漏洞修补[173]|
|Java SE 7 Update 71[174]|2014-10-14|16 个漏洞修补[175]|
|Java SE 7 Update 72[176]|2014-10-14|与 Update 71 相同的发布日期，作为 Java SE 7 的相对应补丁集更新（Patch Set Update，PSU）；[177] 36 个漏洞修补[178]|
|Java SE 7 Update 75[179]|2015-01-20|12 个漏洞修补；[180] SSLv3 默认为禁用|
|Java SE 7 Update 76[181]|2015-01-20|与 Update 75 相同的发布日期，作为 Java SE 7 的相对应补丁集更新（Patch Set Update，PSU）； 97 个漏洞修补[182]|
|Java SE 7 Update 79[183]|2015-04-14|21 个安全漏洞修补；6 个漏洞修补[184]|
|Java SE 7 Update 80[185]|2015-04-14|Java 7 的最后一个公开版本；与 Update 79 相同的发布日期，作为 Java SE 7 的相对应补丁集更新（Patch Set Update，PSU）；104 个漏洞修补[186]|
|Java SE 7 Update 85|2015-07-15|不公开，只能透过 Java SE 支持计划和 Solaris 10 的 Recommended Patchset Cluster 提供；25 个安全漏洞修补|
|Java SE 7 Update 91|2015-10-20|不公开，只能透过 Java SE 支持计划和 Solaris 10 的 Recommended Patchset Cluster 提供；20 个安全漏洞修补|
|Java SE 7 Update 95|2016-01-19|不公开，只能透过 Java SE 支持计划和 Solaris 10 的 Recommended Patchset Cluster 提供；8 个安全漏洞修补[103]|
|Java SE 7 Update 97|2016-02-05|不公开，只能透过 Java SE 支持计划和 Solaris 10 的 Recommended Patchset Cluster 提供；1 个安全漏洞修补[104]|
|Java SE 7 Update 99|2016-03-23|不公开，只能透过 Java SE 支持计划和 Solaris 10 的 Recommended Patchset Cluster 提供；1 个安全漏洞修补[187]|
|Java SE 7 Update 101|2016-04-18|不公开，只能透过 Java SE 支持计划和 Solaris 10 的 Recommended Patchset Cluster 提供；9 个安全漏洞修补|
|Java SE 7 Update 111|2016-07-19|不公开，只能透过 Java SE 支持计划和 Solaris 10 的 Recommended Patchset Cluster 提供；36 个安全漏洞修补|
|Java SE 7 Update 121|2016-10-18|不公开，只能透过 Java SE 支持计划和 Solaris 10 的 Recommended Patchset Cluster 提供；32 个安全漏洞修补|

## 参考

[Java 7 新特性](https://www.wdbyte.com/2020/01/jdk/jdk7-start/)

## Java 7 下载

[https://www.oracle.com/java/technologies/javase/javase7-archive-downloads.html](https://www.oracle.com/java/technologies/javase/javase7-archive-downloads.html)