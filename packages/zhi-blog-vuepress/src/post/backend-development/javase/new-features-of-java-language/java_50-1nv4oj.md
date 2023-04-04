---
title: J2SE_5-0
short_title: ''
description: java从版本开始加入许多新特性是java历史中修改最大的版本java​。代号为tiger。这个在年月日发布的版本原本以编号也就是仍然使用内部版本编号。这个数字辈改变是为了“更好地反映成熟度稳定性可扩展性和jse的安全水准”。这个版本是在jsr底下被开发。jse在年月日进入其即将停止公开更新的期间_年月日正式不公开开放更新。oracle客户直到年月都能透过付费的方式获取更新。[]tiger增加了若干个重要的新语言功能。[][]泛型（generics）_为集合提供编译期间（静态）类型安全且不须为大多数类型转
date: 2022-10-06 21:19:42
category:
  - Java语言新特性
  - 后端开发
  - JavaSE
tag:
  - 版本
  - 类型
  - jdk
  - jdk1.5
  - java5
  - java
  - javase
article: true
timeline: false
---
Java 从版本 5 开始，加入许多新特性，是 Java 历史中修改最大的版本 **[Java](https://zh.wikipedia.org/wiki/Java_5.0)**​**[5.0](https://zh.wikipedia.org/wiki/Java_5.0)** 。

代号为 **Tiger** 。这个在 2004 年 9 月 30 日发布的版本原本以 1.5 编号，也就是仍然使用内部版本编号。这个数字辈改变是为了“更好地反映成熟度、稳定性、可扩展性和 J2SE 的安全水准”。这个版本是在 JSR 176 底下被开发。

J2SE 5.0 在 2008 年 4 月 8 日进入其即将停止公开更新的期间；2009 年 11 月 3 日正式不公开开放更新。Oracle 客户直到 2015 年 5 月都能透过付费的方式获取更新 。 [[15]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-15)

Tiger 增加了若干个重要的新语言功能。 [[16]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-pr15-16) [[17]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-ch15-17)

* [泛型](https://zh.wikipedia.org/wiki/%E6%B3%9B%E5%9E%8B "泛型")（Generics）： 为集合提供编译期间 （静态） 类型安全，且不须为大多数类型转换 （类型转换） （规范在 JSR 14）
* 元数据（[Metadata](https://zh.wikipedia.org/wiki/%E5%85%83%E6%95%B0%E6%8D%AE "元数据")）： 也称作[注解](https://zh.wikipedia.org/wiki/Java%E6%B3%A8%E8%A7%A3 "Java注解")。让语言结构（像是类别和方法）能够用额外的资料标记，可以由元数据意识工具处理（规范在 JSR 175）
* 自动封装与解封装： 在基本的资料类型（如 `int`）和基本的的外覆类别 （如 `Integer`） 之间能够自动转换 （规范在 JSR 201）
* 枚举（Enumerations）： 以 `enum` 关键字创造出一种类型安全，有排序值的清单（如 Day.MONDAY、 Day.TUESDAY 等）；以前这只能透过非类型安全的恒定整数或自行撰写的类别来达成 （类型安全的枚举模式） （规范在 JSR 201）
* 可变参数函数（Varargs）：方法的最后一个参数现在可以用一个类型名称加上三个点宣告（如：`void drawtext(String... lines)`）；在调用代码中，类型中参数里任何的数字可以被使用，而它们再放在一个数组来传递给方法，或是其它的调用代码可以传递那个类型的数组
* 增强的 [for](https://zh.wikipedia.org/wiki/Foreach%E5%BE%AA%E7%8E%AF
  ) 循环：`for` 循环的语法被用特别的语法扩展了，适用于数组或 [Iterable](http://download.oracle.com/javase/7/docs/api/java/lang/Iterable.html
  )，用于迭代每个成员，如基本的 [Collection](http://download.oracle.com/javase/7/docs/api/java/util/Collection.html
  ) 类别 (规范在 JSR 201)
* 线程池，改进多线程 Java 程序的执行语义

  Java5 中，对 Java 线程的类库做了大量的扩展，其中线程池就是 Java5 的新特征之一，除了线程池之外，还有很多多线程相关的内容，为多线程的编程带来了极大便利。为了编写高效稳定可靠的多线程程序，线程部分的新增内容显得尤为重要。

  线程池的基本思想还是一种对象池的思想，开辟一块内存空间，里面存放了众多（未死亡）的线程，池中线程执行调度由池管理器来处理。当有线程任务时，从池中取一个，执行完成后线程对象归池，这样可以避免反复创建线程对象所带来的性能开销，节省了系统的资源。

  多线程和线程池的系列博文参考：[多线程并发和线程池](https://blog.csdn.net/j080624/article/category/6441177)
* 新的 Java 存储器模型改善了复杂性、 有效性和以前的规格性能[[18]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-jsr-133-18)
* 静态导入

另外也有以下这些对于基本程序库的改善：

* 自动给 [RMI](https://zh.wikipedia.org/wiki/Java%E8%BF%9C%E7%A8%8B%E6%96%B9%E6%B3%95%E8%B0%83%E7%94%A8 "Java远程方法调用") 产生[桩](https://zh.wikipedia.org/wiki/%E6%A1%A9_(%E8%AE%A1%E7%AE%97%E6%9C%BA)) "桩 (计算机)")模块
* [Swing](https://zh.wikipedia.org/wiki/Swing_(Java)) "Swing (Java)")：新的接口外观，叫做 synth
* 异步实用工具 在 [java.util.concurrent](http://java.sun.com/j2se/1.5.0/docs/api/java/util/concurrent/package-summary.html) （[点击查看归档页面](https://web.archive.org/web/20090804195831/http://java.sun.com/j2se/1.5.0/docs/api/java/util/concurrent/package-summary.html)） 包中[[19]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-19)
* Scanner 类别来解析来自各式各样的输入和缓冲

Java 5 是 Java 的最后一个正式支持 Microsoft Windows 98 和 Windows ME 的版本 [[20]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-20) ，而 Windows Vista 是 J2SE 5 在 2009 年 10 月的 Java 5 生命周期之前支持的 Windows 的最新版本。

Java 5 Update 5（1.5.0_05）是 Java 在 Windows 95（装了 Internet Explorer 5.5 的）和 Windows NT 4.0 上运行的最后一个版本。[[21]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-21)

Java 5 最初出现在 Mac OS X 10.4 （Tiger），到了 Mac OS X 10.5 （Leopard）时成为了默认的 Java 版本。

### 版本控制系统的改变

此版本推出了 JAVA 语言中，一个新的版本控制系统，而旧版本控制系统仍然可以在开发者资源库中继续使用。

> Both version numbers "1.5.0" and "5.0" are used to identify this release of the Java 2 Platform Standard Edition. Version "5.0" is the product version, while "1.5.0" is the developer version. The number "5.0" is used to better reflect the level of maturity, stability, scalability and security of the J2SE.
>
> ——[Version 1.5.0 or 5.0?](http://docs.oracle.com/javase/1.5.0/docs/relnotes/version-5.0.html)​[[22]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-22)

这种对应关系持续维持到以后的版本 (Java 6 = JDK 1.6, Java 7 = JDK 1.7, 以此类推)。

## Java 5 更新

|版本|发布日期|重点|
| -------------------| ----------| -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|Java SE 5|2004-10-4|Metadata、泛型类型、对基础类型自动封装和自动解封装、 加强 for 循环、 枚举的类型、 静态类别导入，格式化 I/O、 varargs 和并发的实用工具。改进的启动时间和存储器占用量。在多个正在运行的 JVM 之间共享的只读资料。 远程监控和管理。一个新的 JVM 配置 API。过程化的堆栈版本追踪。支持对 XML 1.1 的名字空间、 XML 架构、 SAX 2.0.2，DOM 级别 3，与 XSLT 1.1 快速的 XLSTC 的编译器。Unicode 4.0 支持。|
|Java SE 5 Update 1|2004-12-25|50 个漏洞修复|
|Java SE 5 Update 2|2005-03-16|一些中断的修复。程序现在以较定制的方式编译。日历漏洞修复和其它漏洞修复。|
|Java SE 5 Update 3|2005-05-03|这个版本修复了一些漏洞，包含在 Linux Mozilla 外挂的中断。|
|Java SE 5 Update 4|2005-07-04|在这个版本中，J2SE 对于 64 位 Windows 的支持从候选版本中脱颖而出。这个版本在 AMD64/EM64T 64 位模式运行用 Windows Server 2003 x64 版本的机器。|
|Java SE 5 Update 5|2005-09-18|修复了一些漏洞以及表现增强。对 Windows 95 和 Windows NT 4.0 最后的更新。|
|Java SE 5 Update 6|2005-12-07|在这个版本之前，Java 小程序或应用程序可以决定想要运行的 JRE 版本，但从这个更新之后就不再是这样了。所有的程序都用最新版本的 JRE 运行。|
|Java SE 5 Update 7|2006-05-29|修复了几个漏洞并提高性能。|
|Java SE 5 Update 8|2006-08-13|修复了一些漏洞以及提高了性能。|
|Java SE 5 Update 9|2006-11-12|这个版本修复了一些小回归。|
|Java SE 5 Update 10|2006-12-22|添加了由 Linux 2.6 支持的 epoll I/O 事件通知工具的实现。 许多漏洞被修复。|
|Java SE 5 Update 11|2007-03-08|修复了几个漏洞并提高了性能。|
|Java SE 5 Update 12|2007-06-11||
|Java SE 5 Update 13|2007-10-05|Java Web Start 中与本地文件访问相关的多个安全漏洞已修复。 修复了允许绕过网络进入限制的 JRE 中的安全漏洞。 修复其他几个安全问题和小错误。|
|Java SE 5 Update 14|||
|Java SE 5 Update 15|2008-03-06|修复因缓冲堆超出边界而导致的几个崩溃漏洞以及其他一些小漏洞。 现在来自 AOL，DigiCert 和 TrustCenter 的新的[根证书](https://zh.wikipedia.org/wiki/%E6%A0%B9%E8%AF%81%E4%B9%A6 "根证书")已经被包含在内。|
|Java SE 5 Update 16|2008-07-23|此版本修复了几个安全漏洞，例如 DoS 漏洞，缓冲器溢出和其他可能导致崩溃的漏洞，或是会给程序访问某些系统资源。 这些漏洞位于 Java Web Start，Java 管理扩展组件（Java Management Extensions，JMX）管理代理以及用于处理 XML 资料的函数中。|
|Java SE 5 Update 17|2008-12-03|更新了 UTF-8 字符集，实现以处理非最短形式的 UTF-8 字节序列，从而引入了与以前版本不兼容的问题。 添加了新的根证书。 许多漏洞被修复。|
|Java SE 5 Update 18|2009-03-25|几个安全上的问题已解决。 稍微修改了在 LDAP 目录中访问 Java 对象的行为的 JNDI 功能。 增加了五个新的根证书。 许多漏洞被修复。|
|Java SE 5 Update 19|2009-05-29|为多个系统配置增加支持。 增加了服务标签（Service Tag）支持。 许多漏洞被修复，包括几个崩溃和存储器泄漏。|
|Java SE 5 Update 20|2009-08-06|解决了几个安全漏洞，例如不受信任的小程序的潜在系统访问，以及图像处理和 Unpack200 中的整数溢出。 添加了几个新的根证书。 许多其它小漏洞已修复。|
|Java SE 5 Update 21|2009-09-09|许多小漏洞被修复。|
|Java SE 5 Update 22|2009-11-04|此版本标记 Java 5 的 End Of Service Life（EOSL），并且是其最终的公开版本。 在报告 Sun Alerts 269868、270474、270475 和 270476 中的几个安全漏洞已修复。 其他几个漏洞已修复。 此外，还增加了两个新的根证书。|

## Java 5.0 下载

[https://www.oracle.com/java/technologies/java-archive-javase5-downloads.html](https://www.oracle.com/java/technologies/java-archive-javase5-downloads.html)

‍