---
title: 解决一个maven的site命令报错问题
short_title: ''
description: 新建的maven的Spring Boot项目一致保存 org.apache.maven.doxia.siterenderer.DocumentContent
  not found。
date: 2022-06-16 22:47:57
category:
  - 实用技巧
  - 经验分享
tag:
  - mvn
  - site
  - error
article: true
timeline: false
---
新建的 `maven` 的 `Spring Boot` 项目一致保存 `org.apache.maven.doxia.siterenderer.DocumentContent not found` 。

升级 `Spring Boot` 也没用，最终修改插件依赖解决。

```xml
<!-- site -->
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-site-plugin</artifactId>
    <version>3.7</version>
    <dependencies>
        <dependency>
            <groupId>org.apache.maven.doxia</groupId>
            <artifactId>doxia-site-renderer</artifactId>
            <version>1.8</version>
        </dependency>
    </dependencies>
</plugin>
```

:::warning

注意：Spring Boot2.7.0才有用，低版本不保证能用

:::