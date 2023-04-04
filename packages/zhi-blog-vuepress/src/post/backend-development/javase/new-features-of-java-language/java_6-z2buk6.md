---
title: Java_6
short_title: ''
description: 代号为mustang。版本发布于年月日sun把原本的名称“jse”改为“javase”然后再从版本号中去掉“”[]而开发者内部编号仍然是。[]这个版本是根据jsr（点击查看归档页面）开发的。在发展阶段新版本大约每一周都会发布一些功能增强和漏洞的修复。beta版本在年月和月发布也就是为什么年月日变成最终的版本。主要特性本版本包含的主要更改_[][]支持旧的winx版本下降_非正式地javaupdate是java的最后一个显示为在这些版本的windows上工作的版本。这被认为是因为在update版本中的主要更
date: 2022-10-07 19:24:10
category:
  - Java语言新特性
  - 后端开发
  - JavaSE
tag:
  - 版本
  - 支持
  - 发布
  - 集成
  - 主要
  - jdk
  - jdk1.6
  - java6
  - java
  - javase
article: true
timeline: false
---
代号为 **Mustang** 。版本发布于 2006 年 12 月 11 日，Sun 把原本的名称“J2SE”改为“ **Java SE** ”，然后再从版本号中去掉“.0” [[23]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-naming-23) ，而开发者内部编号仍然是 1.6.0。 [[24]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-version_6-24) 这个版本是根据 [JSR 270](http://www.jcp.org/en/jsr/detail?id=270)（[点击查看归档页面](https://web.archive.org/web/20210125121053/http://www.jcp.org/en/jsr/detail?id=270)）开发的。

在发展阶段，新版本大约每一周都会发布一些功能增强和漏洞的修复。Beta 版本在 2006 年 2 月和 6 月发布，也就是为什么 2006 年 12 月 11 日变成最终的版本。

## 主要特性

本版本包含的主要更改： [[25]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-pr16-25) [[26]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-ch16-26)

* 支持旧的 Win9x 版本下降；非正式地，Java 6 Update 7 是 Java 的最后一个显示为在这些版本的 Windows 上工作的版本。 这被认为是因为在 Update 10 版本中的主要更改。
* 脚本语言支持（Scripting Language Support）（JSR 223）：用于与脚本语言紧密集成的通用 API，以及内置的 Mozilla JavaScript Rhino 集成。
* 核心平台 [[27]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-lobby-27)  [[28]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-weblog-28) 和 Swing 性能显著的改进。
* 透过 [JAX-WS](https://zh.wikipedia.org/wiki/JAX-WS "JAX-WS") 改善的网络服务支持(JSR 224).
* 支持 [JDBC](https://zh.wikipedia.org/wiki/Java%E6%95%B0%E6%8D%AE%E5%BA%93%E8%BF%9E%E6%8E%A5 "Java数据库连接") 4.0 ([JSR 221](https://zh.wikipedia.org/wiki/Java%E6%95%B0%E6%8D%AE%E5%BA%93%E8%BF%9E%E6%8E%A5 "Java数据库连接")).
* Java 编译器 API (JSR 199)：允许 Java 程序以写程序的方式选择和调用 Java 编译器的 API。
* 将 JAXB 升级到版本 2.0：包括 StAX 解析器的集成。
* 支持 pluggable [annotations](https://zh.wikipedia.org/wiki/Java%E6%B3%A8%E8%A7%A3 "Java注解") (JSR 269).[[29]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-29)

  参考：[插件化注解处理API](https://www.cnblogs.com/throwable/p/9139908.html)​
* 改善许多 [GUI](https://zh.wikipedia.org/wiki/%E5%9B%BE%E5%BD%A2%E7%94%A8%E6%88%B7%E7%95%8C%E9%9D%A2 "图形用户界面")，像是 SwingWorker 在 API 中的集成，表格排序和筛选，以及真正的 Swing 双缓冲（消除模糊区域效果）。
* Desktop 类和 SystemTray 类

  在 JDK1.6 中,AWT 新增加了两个类：Desktop 和 SystemTray。

  前者可以用来打开系统默认浏览器浏览指定的 URL,打开系统默认邮件客户端给指定的邮箱发邮件,用默认应用程序打开或编辑文件(比如,用记事本打开以 txt 为后缀名的文件),用系统默认的打印机打印文档。
* 包含 [JVM](https://zh.wikipedia.org/wiki/Java%E8%99%9A%E6%8B%9F%E6%9C%BA "Java虚拟机") 改善：同步和编译器性能优化，新算法和对现有垃圾收集算法的升级以及应用程序启动性能。[[谁说的？]](https://zh.wikipedia.org/wiki/Wikipedia:%E4%B8%8D%E8%A6%81%E6%A8%A1%E6%A3%B1%E4%B8%A4%E5%8F%AF "Wikipedia:不要模棱两可")
* 轻量级 Http Server API

  JDK1.6 提供了一个简单的 Http Server API,据此我们可以构建自己的嵌入式 Http Server,它支持 Http 和 Https 协议,提供了 HTTP1.1 的部分实现,没有被实现的那部分可以通过扩展已有的 Http Server API 来实现,程序员自己实现 HttpHandler 接口,HttpServer 会调用 HttpHandler 实现类的回调方法来处理客户端请求,在这 里,我们把一个 Http 请求和它的响应称为一个交换,包装成 HttpExchange 类,HttpServer 负责将 HttpExchange 传给 HttpHandler 实现类的回调方法。
* 用 Console 开发控制台程序

  JDK1.6 中提供了 java.io.Console 类专用来访问基于字符的控制台设备。你的程序如果要与 Windows 下的 cmd 或者 Linux 下的 Terminal 交互,就可以用 Console 类代劳。 但我们不总是能得到可用的 Console,一个 JVM 是否有可用的 Console 依赖于底层平台和 JVM 如何被调用。如果 JVM 是在交互式命令行(比如 Windows 的 cmd)中启动的,并且输入输出没有重定向到另外的地方,那么就可以得到一个可用的 Console 实例。
* Common Annotations

  Common annotations 原本是 Java EE 5.0(JSR 244)规范的一部分,现在 SUN 把它的一部分放到了 Java SE 6.0 中。

  随着 Annotation 元数据功能(JSR 175)加入到 Java SE 5.0 里面,很多 Java 技术(比如 EJB,Web Services)都会用 Annotation 部分代替 XML 文件来配置运行参数（或者说是支持声明式编程,如 EJB 的声明式事务）,如果这些技术为通用 目的都单独定义了自己的 Annotations,显然有点重复建设。为其他相关的 Java 技术定义一套公共的 Annotation 是有价值的,可以避免 重复建设的同时,也保证 Java SE 和 Java EE 各种技术的一致性。

Java 6 可以安装到在 64 位（Core 2 Duo 和更高版本）处理器机器上运行的 Mac OS X 10.5（Leopard）。[[30]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-30) 运行 Mac OS X 10.6（Snow Leopard）的 32 位和 64 位机器也支持 Java 6。

Java 6 在 2013 年 2 月到了它支持生命周期的尾声，此时所有公开更新（包括安全更新）都计划停止。 [[31]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-31) [[32]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-32) Oracle 在 2013 年 3 月和 4 月发布了另外两个对 Java 6 的更新，修补了一些安全漏洞。 [[33]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-33) [[34]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-34)

## Java 6 更新

JAVA 6发布后，Sun和后来的Oracle，发布了几个更新，而不更改任何公开的API，增强了最终用户的可用性或固定的漏洞。Oracle曾声明，自2016 年1月，JAVA 6和其它更旧的版本已无法从Oracle下载 [[35]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-ReferenceC-35) ；但在此之后，Oracle于其官网重新提供各个旧版本的下载（需要登录Oracle帐户） [[36]](https://zh.wikipedia.org/zh-cn/Java%E7%89%88%E6%9C%AC%E6%AD%B7%E5%8F%B2#cite_note-old-download-36) 。

|版本|发布日期|重点|
| :------------------------| :----------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|Java SE 6|2006-12-23|此版本在Web服务、脚本和数据库，可插入的注解、安全性以及质量、兼容性和稳定性等领域增强了许多功能。 现在也正式支持JConsole。 已增加对Java DB的支持。|
|Java SE 6 Update 1|2007-05-07||
|Java SE 6 Update 2|2007-07-03||
|Java SE 6 Update 3|2007-10-03||
|Java SE 6 Update 4|2008-01-14|HotSpot VM 10|
|Java SE 6 Update 5|2008-03-05|消除了几个安全漏洞。 现在包括了来自AOL、DigiCert和TrustCenter的新的根证书。|
|Java SE 6 Update 6|2008-04-16|引入了对臭名昭彰的Xlib / XCB锁定断言问题的解决方法。 当以LoginContext使用Kerberos认证时内存泄漏的问题已被修复。 其它几个漏洞已修复。|
|Java SE 6 Update 7[37]||非正式记载的，Java SE 6 Update 7（1.6.0.7）显示为在Win9x系列操作系统上工作的Java的最后一个版本[来源请求]|
|Java SE 6 Update 10[38]|2008-10-15|HotSpot VM 11. 此更新的主要更改包括：Java部署工具包（Java Deployment Toolkit），为一组JavaScript函数，用于简化applet和Java Web Start应用程序的部署。[39]Java Kernel，一个小小的安装程序，只包含最常用的JRE类别。 其它包需要时再自己下载。加强更新器。增强版本控制和pack200的支持：不再需要服务端支持。[40]Java Quick Starter，用来加强冷却启动时间。改进了Windows上的Java2D图形基本组件的表现，使用Direct3D和硬件加速。新的 Swing look and feel ，名为 Nimbus ，创建在 synth 基础之上。[41]下一代的Java插件：applet现在已可在个别的程序中运行，并支持Web Start应用程序的许多功能。[42]|
|Java SE 6 Update 11[43]|2008-12-03|13个安全性漏洞修正[44]|
|Java SE 6 Update 12[45]|2008-12-12|没有安全性修复；64位的Java插件（仅适用于64位的网页浏览器）；支持Windows Server 2008；图形和JavaFX应用程序的性能改进|
|Java SE 6 Update 13[46]|2009-03-24|7个安全性漏洞修复，稍作修改JNDI访问LDAP中的Java对象，JMX变更（createMBeanunregisterMBean），添加了4个新的根证书|
|Java SE 6 Update 14[47]|2009-05-28|HotSpot VM 14. 此版本包括对JIT编译器的大量性能更新，用于64位机器的压缩指针，以及对G1（Garbage First）低暂停的垃圾回收器的支持。[48][49]-XX:+DoEscapeAnalysis 选项直接指向HotSpot JIT compiler以使用escape analysis来决定本地端对象是否可以被分配到stack上而不是heap里[50]一些开发人员已经注意到这个版本中引入的一个问题，它导致调试器似乎是随意地错过断点（breakpoints）。[51] Sun有一个相应的漏洞，也是一个追踪问题。 解决方法适用于客户端和服务端的虚拟机。[52] 使用 -XX:+UseParallelGC 选项将可以避免错误。另一个解决方案是降版到update 13，或是升级到update 16。|
|Java SE 6 Update 15|2009-08-04|加入了patch-in-place 功能[53]|
|Java SE 6 Update 16|2009-08-11|修复了update 14中导致调试器错过断点的问题。[54]|
|Java SE 6 Update 17[55]|2009-11-04|安全修复；两个新的根证书|
|Java SE 6 Update 18[56]|2010-01-13|没有安全性漏洞修复；Hotspot VM 16；支持Ubuntu 8.04 LTS桌面版、SLES 11、Windows 7、Red Hat Enterprise Linux 5.3、Firefox 3.6、VisualVM 1.2；更新过的Java DB；许多性能改进|
|Java SE 6 Update 19[57]|2010-03-30|安全性漏洞修复；根证书更动：加入七个新的，删除三个，五个替换为更强的签署算法；对TLS重新谈判攻击的临时修补|
|Java SE 6 Update 20[58]|2010-04-15|2个安全性漏洞修补|
|Java SE 6 Update 21[59]|2010-07-07|没有安全性漏洞修复；Hotspot VM 17；支持 Red Hat Enterprise Linux 5.4和5.5、Oracle Enterprise Linux 4.8, 5.4, 5.5、Google Chrome 4与客制读取进度指示器（Customized Loading Progress Indicators）；VisualVM 1.2.2|
|Java SE 6 Update 22[60]|2010-10-12|29个安全性漏洞修补; 支持RFC 5746|
|Java SE 6 Update 23[61]|2010-12-08|没有安全性漏洞修复；Hotspot VM 19；对由右至左的语言有更好的支持|
|Java SE 6 Update 24[62]|2011-02-15|21个安全性漏洞修补；更新 Java DB|
|Java SE 6 Update 25|2011-03-21|没有安全性漏洞修复；Hotspot VM 20；支持 Internet Explorer 9、Firefox 4和Chrome 10；改善BigDecimal；包含“分层”编译在服务器虚拟机以激活它来跟客户端需拟机一样的快速开启，当达到更好的尖峰表现性能（这个功能要激活 -server 和 -XX:+TieredCompilation 指令选项）[63]|
|Java SE 6 Update 26[64]|2011-06-07|17新的安全性漏洞修补；[65] 最新的版本能够和Windows Vista SP1兼容|
|Java SE 6 Update 27[66]|2011-08-16|没有安全性漏洞修复；给Firefox 5的新证书|
|Java SE 6 Update 29[67]|2011-10-18|20个安全性漏洞修补；其它许多种漏洞的修补[68]|
|Java SE 6 Update 30[69]|2011-12-12|没有安全性漏洞修复；修补SSL回归在Update 29；支持Red Hat Enterprise Linux 6|
|Java SE 6 Update 31[70]|2012-02-14|14个安全性漏洞修补和一个漏洞修复；最新的版本能够够可靠的在Windows 2000上工作[71]|
|JAVA SE 6 Update 32[72]|2012-04-26|没有安全性漏洞修复；其它许多种漏洞的修补|
|Java SE 6 Update 33[73]|2012-06-12|14个安全性漏洞修补, 改善VM配置文件的读取|
|Java SE 6 Update 34[74]|2012-08-14|没有安全性漏洞修复；其它许多种漏洞的修补|
|Java SE 6 Update 35[75]|2012-08-30|包含一个深度的安全修补|
|Java SE 6 Update 37[76]|2012-10-16|30个安全性漏洞修补|
|Java SE 6 Update 38[77]|2012-12-11|其它许多种漏洞的修补[78]|
|Java SE 6 Update 39[79]|2013-02-01|50个安全性漏洞修补|
|Java SE 6 Update 41[80]|2013-02-19|5个安全性漏洞修补|
|Java SE 6 Update 43[81]|2013-03-04|2个安全性漏洞修补|
|Java SE 6 Update 45[82]|2013-04-16|42个安全性漏洞修补；[83] 其它的一些改变； 最后的公开更新。[84] 自2016年1月起，Java 6（或更早的版本）没办法再从Oracle下载|
|Java SE 6 Update 51[85]|2013-06-18|不公开，只能透过Java SE支持计划和在Apple Update for OS X Snow Leopard、Lion 和 Mountain Lion 中；最多达到40个安全性漏洞修复[86]|
|Java SE 6 Update 65[87]|2013-10-15|不公开，只能透过Java SE支持计划和在Apple Update for OS X Snow Leopard、Lion 和 Mountain Lion 中；最少11个重要的安全性漏洞修复[88]|
|Java SE 6 Update 71[89]|2014-01-14|不公开下载；33个漏洞修复[90]|
|Java SE 6 Update 75[91]|2014-04-15|不公开，只能透过Java SE支持计划和Solaris 10的Recommended Patchset Cluster no. #54 提供；25个安全性漏洞修复[92]|
|Java SE 6 Update 81[93]|2014-07-15|不公开，只能透过Java SE支持计划和Solaris 10的Recommended Patchset Cluster 提供；11个安全性漏洞修复[94]|
|Java SE 6 Update 85[95]|2014-10-16|不公开，只能透过Java SE支持计划和Solaris 10的Recommended Patchset Cluster 提供；18个安全性漏洞修复[96]|
|Java SE 6 Update 91[97]|2015-01-21|Linux x64和Windows i586的版本可在Java SE 6参考实现中使用。[98] 其他版本只能透过Java SE支持计划和Solaris 10的Recommended Patchset Cluster 提供；15个安全性漏洞修复[99]|
|Java SE 6 Update 95|2015-04-14|不公开，只能透过Java SE支持计划和Solaris 10的Recommended Patchset Cluster 提供；14个安全性漏洞修复[100]|
|Java SE 6 Update 101|2015-07-15|不公开，只能透过Java SE支持计划和Solaris 10的Recommended Patchset Cluster 提供；18个安全性漏洞修复。[101] 给IE 10和11的证书在1.6.0_101版本中被引入|
|Java SE 6 Update 105|2015-10-20|不公开，只能透过Java SE支持计划和Solaris 10的Recommended Patchset Cluster 提供；17个安全性漏洞修复[102]|
|Java SE 6 Update 111|2016-01-20|不公开，只能透过Java SE支持计划和Solaris 10的Recommended Patchset Cluster 提供；17个安全性漏洞修复[103]|
|Java SE 6 Update 113|2016-02-05|不公开，只能透过Java SE支持计划和Solaris 10的Recommended Patchset Cluster 提供；1个安全性漏洞修复[104]|
|Java SE 6 Update 115|2016-04-21|不公开，只能透过Java SE支持计划和Solaris 10的Recommended Patchset Cluster 提供；8个安全性漏洞修复[105]|
|Java SE 6 Update 121|2016-07-19|不公开，只能透过Java SE支持计划和Solaris 10的Recommended Patchset Cluster 提供；15个安全性漏洞修复[106]|
|Java SE 6 Update 131|2016-10-18|不公开，只能透过Java SE支持计划和Solaris 10的Recommended Patchset Cluster 提供；12个安全性漏洞修复[107]|

## Java 6 下载

[https://www.oracle.com/java/technologies/javase-java-archive-javase6-downloads.html](https://www.oracle.com/java/technologies/javase-java-archive-javase6-downloads.html)

Windows版JDK1.6百度网盘下载链接: [https://pan.baidu.com/s/1aMAlGWV1mJBVb4lIp0O7rg](https://pan.baidu.com/s/1aMAlGWV1mJBVb4lIp0O7rg) 请发邮件至 youweics@163.com 获取提取码