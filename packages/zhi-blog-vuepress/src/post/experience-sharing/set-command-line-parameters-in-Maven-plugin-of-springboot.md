---
title: 在SpringBoot的maven插件中设置命令行参数
short_title: ''
description: 怎么在SpringBoot的maven插件中设置命令行参数呢?
date: 2022-05-04 22:59:17
category:
  - 实用技巧
  - 经验分享
tag:
  - spring
  - boot
  - cli
  - cmd
  - command
article: true
timeline: false
---
怎么在SpringBoot的maven插件中设置命令行参数呢：

 `Spring Boot 2.2+` 的最新设置方式如下：

```bash
mvn spring-boot:run -Dspring-boot.run.arguments="args1 args2"
```

其他方式已经失效。