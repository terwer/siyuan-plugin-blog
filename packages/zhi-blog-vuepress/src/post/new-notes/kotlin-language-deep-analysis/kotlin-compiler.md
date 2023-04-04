---
title: Kotlin编译器
short_title: ''
description: Kotlin 编译器。
date: 2022-05-27 23:03:00
category:
  - 新笔记
  - Kotlin语言深度解析
tag:
  - kt
  - kotlin
article: true
timeline: false
---
# Kotlin编译器

## 安装并配置Kotlin编译器

在线体验

[https://play.kotlinlang.org/](https://play.kotlinlang.org/)

下载地址：

[https://github.com/JetBrains/kotlin/releases/tag/v1.6.21](https://github.com/JetBrains/kotlin/releases/tag/v1.6.21)

最新版本是 `1.6.21`

解压

```bash
unzip kotlin-compiler-1.6.21.zip
```

设置环境变量

```bash
# kotlin
export KOTLIN_HOME=/code/kotlin-compiler-1.6.21/kotlinc
export PATH=$KOTLIN_HOME/bin:$PATH
```

验证

```bash
kotlinc -version
```

```bash
➜  ~ kotlinc -version
info: kotlinc-jvm 1.6.21 (JRE 11.0.12+8-LTS-237)
```

## 使用 vim 和 Kotlin 编译器编写 Kotlin 版的 Hello World

```bash
cd ~/Desktop

vim 
```