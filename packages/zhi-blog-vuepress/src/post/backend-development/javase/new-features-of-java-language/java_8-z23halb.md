---
title: Java_8-LTS
short_title: ''
description: java于年月日发布[][]包含了一些原本被项目在java却延迟的功能。[]这些功能改进在jdkenhancementproposals(jeps)的指导下得到了集成。[]主要特性jsrjep_lambda项目[]中提供的语言级匿名函数支持（官方称为lambda表达式非官方亦称闭包)）_添加默认方法（虚拟扩展组件方法）[][][]以允许在不破坏兼容性的情况下向现有接口中新增方法。java社群中曾经有过针对是否要加入lambda表达式支持的辩论。稍后sun公司宣布lambda表达式将会包含在java中并请社
date: 2022-10-07 20:21:18
category:
  - Java语言新特性
  - 后端开发
  - JavaSE
tag:
  - 方法
  - 默认
  - 支持
  - 表达式
  - jdk
  - jdk8
  - java
  - java8
  - javase
  - 项目
article: true
timeline: false
---
Java 8 于 2014 年 3 月 18 日发布， [[188]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-Java_8-188) [[189]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-189) 包含了一些原本被项目在 Java 7 却延迟的功能。[[190]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-190)

这些功能改进在 JDK Enhancement Proposals (JEPs) 的指导下得到了集成。[[191]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-191)

## 主要特性

* JSR 335，JEP 126：Lambda 项目 [[192]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-192) 中提供的语言级[匿名函数](https://zh.wikipedia.org/wiki/%E5%8C%BF%E5%90%8D%E5%87%BD%E6%95%B0 "匿名函数")支持（官方称为 lambda 表达式，非官方亦称[闭包](https://zh.wikipedia.org/wiki/%E9%97%AD%E5%8C%85_(%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%A7%91%E5%AD%A6)) "闭包 (计算机科学)")）；添加默认方法（虚拟扩展组件方法） [[193]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-goetz_interface_evolution-193)  [[194]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-194) [[195]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-195) ，以允许在不破坏兼容性的情况下向现有接口中新增方法。

  Java 社群中曾经有过针对是否要加入 lambda 表达式支持的辩论。稍后 Sun 公司宣布 lambda 表达式将会包含在 Java 中，并请社群协助改善该特性。支持 lambda 表达式使得针对流中元素的函数式操作成为可能，由此可以实现由 MapReduce 启发的函数式集合操作。默认方法允许 API 作者添加新的方法到现有接口上，而不会破坏旧的代码中。默认方法还使得多重继承的行为 （不是状态）成为可能，但默认方法的设计意图并非在此。
* JSR 223，JEP 174：Nashorn 项目，一个 JavaScript 运行时，它允许开发人员在应用程序中嵌入 JavaScript 代码
* JSR 308，JEP 104：在 Java 类型上的注解[[196]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-196)
* 无符号整数算术[[197]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-197)
* JSR 337，JEP 120：重复注解[[198]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-198)
* JSR 310，JEP 150：日期和时间 API [[199]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-199) ，基于 Joda-Time 日期时间处理库的实现。
* JEP 178：静态链接 JNI 程序库[[200]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-200)
* JEP 153：执行 [JavaFX](https://zh.wikipedia.org/wiki/JavaFX "JavaFX") 应用程序（直接执行 JavaFX 的应用程序的 JAR 包）[[201]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-201)
* JEP 122：移除了虚拟机内存管理中的永久世代[[202]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-202)

Java 8 不再支持 [Windows XP[203]](https://zh.wikipedia.org/wiki/Windows_XP "Windows XP") ，但 JDK 8 第 25 版更新仍然可以在 Windows XP 安装和运行。[[204]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-204) 先前 JDK 8 的更新版本可以在 XP 中运行，但必须通过强制解压安装程序来进行安装。

2014 年 10 月后，Java 8 成为官方网站上默认的下载版本。[[205]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-205)

## Java 8 更新

|版本|发布日期|重点|
| :------------------------| :--------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|Java SE 8|2014-03-18|初始版本|
|Java SE 8 Update 5[206]|2014-04-15|使用“*”在 Caller-Allowable-Codebase 属性中; 11 个漏洞的修补|
|Java SE 8 Update 11[207]|2014-07-15|Java 依赖性分析工具（Java Dependency Analysis Tool）; Java 控制台选项以禁用赞助者; JAR 文件属性 – Entry-Point; JAXP 处理限制属性 – maxElementDepth; 18 个安全性漏洞修补,[208] 15 个漏洞修补|
|Java SE 8 Update 20[209]|2014-08-19|669 个漏洞修补，[210] JMC 5.4, 字符串重复数据删除（默认为不激活）|
|Java SE 8 Update 25[211]|2014-10-14|10 个漏洞修补|
|Java SE 8 Update 31[212]|2015-01-19|26 个漏洞修补; SSLv3 默认为禁用|
|Java SE 8 Update 40[213]|2015-03-03|645 个漏洞修补[214] 加入“存储器压力”的概念来协助指出有多少的系统存储器还能够使用（低压 = 高存储器, 高压 = 低存储器）|
|Java SE 8 Update 45[215]|2015-04-14|13 个漏洞修补|
|Java SE 8 Update 51[216]|2015-07-14|增加对 WIndows 平台的原生沙盒的支持（默认为禁用）; 另外还有 25 个安全性修补,14 个漏洞修补|
|Java SE 8 Update 60[217]|2015-08-18|480 个漏洞修补[218]|
|Java SE 8 Update 65[219]|2015-10-20|25 个安全性修补, 3 个漏洞修补|
|Java SE 8 Update 66[220]|2015-11-16|15 个漏洞修补|
|Java SE 8 Update 71[221]|2016-01-19|8 个安全性修补, 5 个漏洞修补[222]|
|Java SE 8 Update 72|2016-01-19|8 个安全性修补, 5 个漏洞修补, 许多的增强|
|Java SE 8 Update 73[223]|2016-02-03|1 个安全性修补|
|Java SE 8 Update 74[224]|2016-02-03|1 个安全性修补|
|Java SE 8 Update 77[225]|2016-03-23|1 个安全性修补|
|Java SE 8 Update 91[226]|2016-04-19|9 个安全性修补, 4 个漏洞修补和增强|
|Java SE 8 Update 92[227]|2016-04-19|来自 8u91 的安全性和漏洞修补, 再加上 76 个额外的漏洞消补; 推出 ExitOnOutOfMemoryError 和 CrashOnOutOfMemoryError 标签|
|Java SE 8 Update 101[228]|2016-07-19|来自 8u92 的安全性和漏洞修补, 再加上 9 个额外的漏洞消补|
|Java SE 8 Update 102[229]|2016-07-19|来自 8u101 的安全性和漏洞修补, 再加上 118 个额外的漏洞消补|
|Java SE 8 Update 111[230]|2016-10-18|安全性修补和 9 个漏洞修补|
|Java SE 8 Update 112[231]|2016-10-18|新增功能和 139 个漏洞修补在 8u111|

## 参考

[Java 8 新特性](https://www.wdbyte.com/java8/comparator/)

## Java 8 下载

### Oracle 下载

[https://www.oracle.com/java/technologies/javase/javase8u211-later-archive-downloads.html](https://www.oracle.com/java/technologies/javase/javase8u211-later-archive-downloads.html)

### adoptium 下载

[https://adoptium.net/zh-CN/temurin/releases/?version=8](https://adoptium.net/zh-CN/temurin/releases/?version=8)

### Amazon corretto 下载

[https://docs.aws.amazon.com/corretto/latest/corretto-8-ug/downloads-list.html](https://docs.aws.amazon.com/corretto/latest/corretto-8-ug/downloads-list.html)

‍