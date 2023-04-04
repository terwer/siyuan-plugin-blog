---
title: 解决Tomcat8+设置allowLinking不生效问题
short_title: ''
description: 升级到tomcat版本后原先项目中的软连接目录都不好用了查了一下资料发现是配置发生了改变参考资料_https_tomcatapacheorgmigrationhtmlforexample_​tomcat​​tomcat​以上ps_tomcat​如果遇到设置allowlinking=​不生效解决办法与tomcat​一样。
date: 2022-10-31 21:23:24
category:
  - 经验分享
tag:
  - 升级
  - 版本
  - 原先
  - 项目
  - 连接
  - tomcat
  - tomcat7
  - tomcat8
  - tomcat85
  - tomcat9
article: true
timeline: false
---
升级到 tomcat8+ 版本后，原先项目中的软连接目录都不好用了，查了一下资料发现是配置发生了改变，

参考资料：[https://tomcat.apache.org/migration-8.html](https://tomcat.apache.org/migration-8.html)

For example:

​`Tomcat7`​

```xml
<!-- Tomcat7 -->
<Context docBase="/Users/terwer/workspace/test/WebContent" path="/test" reloadable="false" allowLinking="true">
</Context>
```

​`Tomcat8`​ 以上

```xml
<!-- Tomcat8 -->
<Context docBase="/Users/terwer/workspace/test/WebContent" path="/test" reloadable="false">   
      <Resources allowLinking="true" />
</Context>
```

PS：`Tomcat9`​ 如果遇到设置 `allowLinking="true"`​ 不生效，解决办法与 `Tomcat8`​ 一样。