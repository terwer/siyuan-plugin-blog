---
title: Java_9
short_title: ''
description: 在年的javaone中oracle讨论了一些他们希望在年于java中发布的功能。[]java应当对千兆级堆拥有更好的支持同时能够更好地集成本机代码且拥有新的垃圾收集器g和能够自我调节的jvm。[]年初java的发布被重新定为年月_年月时发布日期又被拖延至年月_[]后来又因java执行委员会对jigsaw项目实现的分歧而最终定为年月日在此期间oracle回应了部分疑问并对一些重要的技术问题进行了修正。在年月的最后几天jcp对拟议的模块系统方案达成了共识。主要特性jsr_在jigsaw项目中将jdk模块化（参
date: 2022-10-07 20:40:56
category:
  - Java语言新特性
  - 后端开发
  - JavaSE
tag:
  - 发布
  - 一个
  - 实现
  - 模块
  - java
  - jdk
  - java9
  - jdk9
  - javase
  - 年月日
article: true
timeline: false
---
在 2011 年的 JavaOne 中，Oracle 讨论了一些他们希望在 2016 年于 Java 9 中发布的功能。 [[232]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-232) Java 9 应当对千兆级堆拥有更好的支持，同时能够更好地集成本机代码，且拥有新的垃圾收集器 G1 和能够自我调节的 JVM。 [[233]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-233) 2016 年初，Java 9 的发布被重新定为 2017 年 3 月；2017 年 3 月时，发布日期又被拖延至 2017 年 7 月； [[234]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-234) 后来又因 Java 执行委员会对 Jigsaw 项目实现的分歧而最终定为 2017 年 9 月 21 日，在此期间 Oracle 回应了部分疑问，并对一些重要的技术问题进行了修正。在 2017 年 6 月的最后几天，JCP 对拟议的模块系统方案达成了共识。

## 主要特性

* JSR 376：在 Jigsaw 项目中将 JDK 模块化（参见 [Java平台模块系统](https://zh.wikipedia.org/w/index.php?title=Java%E5%B9%B3%E5%8F%B0%E6%A8%A1%E5%9D%97%E7%B3%BB%E7%BB%9F&action=edit&redlink=1 "Java平台模块系统（页面不存在）")条目） [[235]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-Jigsaw-235)  [[236]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-236) [[237]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-237)

  参考 [Java 9 模块化编程](https://segmentfault.com/a/1190000037559624)
* JEP 222：jshell：Java Shell（一个 Java [交互式顶层构件](https://zh.wikipedia.org/wiki/%E8%AF%BB%E5%8F%96%EF%B9%A3%E6%B1%82%E5%80%BC%EF%B9%A3%E8%BE%93%E5%87%BA%E5%BE%AA%E7%8E%AF "读取﹣求值﹣输出循环")） [[238]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-238) [[239]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-239)
* JEP 295：AOT 编译（通过 Graal VM 实现）[[240]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-240)

  参考

  [AOT 编译器](https://www.ibm.com/docs/zh/sdk-java-technology/7?topic=components-aot-compiler)​

  [对比JIT和AOT，各自有什么优点与缺点?](https://www.zhihu.com/question/23874627)​
* JEP 268：XML Catalogs[[241]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-241)

  参考 [XML Catalog API](https://docs.oracle.com/javase/9/core/xml-catalog-api1.htm#JSCOR-GUID-96D2C9AC-641A-4BDB-BB08-9FA04358A6F4)
* JEP 266：更多的并发更新。 [[242]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-242) 包含响应式流的 Java 实现，及其部分替代品 `java.util.concurrent.Flow`。

  参考 [Java 9 揭秘](https://www.cnblogs.com/IcanFixIt/p/7245377.html)
* JEP 193：变量句柄：定义一个标准方法来调用 `java.util.concurrent.atomic` 和 `sun.misc.Unsafe` 操作的等价物。

  参考 [Java 9 变量句柄-VarHandle](https://www.cnblogs.com/loveLands/articles/14018768.html)
* JEP 282：jlink：Java 链接器。该工具可以为模块生成一个包含了其所有依赖项的自定义运行时映像，同时允许生成一个包括运行它的 JVM 的可执行文件，。

  参考 [在Java 9中使用JLink的目的是什么](https://www.cainiaojc.com/note/qa03zx.html)
* JavaDB 被移出 JDK
* JEP 263：高 [DPI](https://zh.wikipedia.org/wiki/%E6%AF%8F%E8%8B%B1%E5%AF%B8%E5%83%8F%E7%B4%A0 "每英寸像素") 图像：自动缩放与尺寸自适应。

Java 9 的首个发布候选版于 2017 年 8 月 9 日发布，首个稳定版于 2017 年 9 月 21 日发布。

## Java 9 更新

|版本|发布日期|亮点|
| :-------------| :--------: | :-----------------------------------------|
|Java SE 9[[243]](https://zh.wikipedia.org/zh-cn/Java版本歷史#cite_note-243)|2017-09-21|初始版本|
|Java SE 9.0.1[[244]](https://zh.wikipedia.org/zh-cn/Java版本歷史#cite_note-244)|2017-10-17|安全性修补和严重漏洞修补|
|Java SE 9.0.4[[245]](https://zh.wikipedia.org/zh-cn/Java版本歷史#cite_note-245)|2018-01-16|JDK 9 的最终版本。安全性修补和严重漏洞修补|

## 参考

[Java 9 新特性](https://www.wdbyte.com/2020/02/jdk/jdk9-feature/)

## Java 9 下载

[https://www.oracle.com/java/technologies/javase/javase9-archive-downloads.html](https://www.oracle.com/java/technologies/javase/javase9-archive-downloads.html)