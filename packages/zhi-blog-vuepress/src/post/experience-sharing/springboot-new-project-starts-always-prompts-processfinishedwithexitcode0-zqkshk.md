---
title: Spring-Boot新项目启动总是提示：Process-finished-with-exit-code-0
short_title: ''
description: 可能原因端口冲突检查端口号缺少web启动依赖我的是第个原因。注意加入之后要刷新maven。后记推荐一个自动管理springboot的starter的插件很好用_editstartershttps_pluginsjetbrainscomplugineditstarters‍
date: 2022-09-15 23:51:55
category:
  - 经验分享
tag:
  - 端口
  - 冲突
  - spring
  - spring-boot
  - exit
  - 退出
article: true
timeline: false
---
## 可能原因

1.端口冲突检查端口号

2.缺少 web 启动依赖

```xml
<!-- web -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

我的是第 2 个原因。

注意加入之后，要刷新 maven。

## 后记

推荐一个自动管理 SpringBoot 的 starter 的插件，很好用：

**EditStarters**

[https://plugins.jetbrains.com/plugin/11543-editstarters](https://plugins.jetbrains.com/plugin/11543-editstarters)

‍