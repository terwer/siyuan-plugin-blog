---
title: 深入详解JVM之类加载器深度剖析
short_title: ''
description: 类加载器深入解析与阶段分解。
date: 2022-05-05 22:15:55
category:
  - JVM新思路
  - 新笔记
tag:
  - jvm
  - class
  - classloader
article: true
timeline: false
---
# 深入详解JVM之类加载器深度剖析

> **文章更新历史**
>
> 2022/06/26 feat:修复文章图片错误。
>
> 2022/05/05 feat:初稿。

- [深入详解JVM之类加载器深度剖析](#深入详解jvm之类加载器深度剖析)
  - [ClassLoader（类加载器）](#classloader（类加载器）)
    - [Java程序的生命周期](#java程序的生命周期)
    - [类的加载、连接与初始化](#类的加载、连接与初始化)
    - [Java对类的使用方式](#java对类的使用方式)
  - [类的加载](#类的加载)
    - [加载类的方式](#加载类的方式)
  - [PS：有用的小技巧](#ps：有用的小技巧)

##  ClassLoader（类加载器）

### Java程序的生命周期

![image-20220626123220184](https://img1.terwer.space/20220626123226.png)

### 类的加载、连接与初始化

![image-20220626124731014](https://img1.terwer.space/20220626124731.png)

![image-20220626124837013](https://img1.terwer.space/20220626124837.png)

### Java对类的使用方式

![image-20220626124937155](https://img1.terwer.space/20220626124937.png)

![image-20220626125020486](https://img1.terwer.space/20220626125020.png)

![image-20220626125104599](https://img1.terwer.space/20220626125104.png)

## 类的加载

![image-20220626125149863](https://img1.terwer.space/20220626125150.png)

### 加载类的方式

![image-20220626125247742](https://img1.terwer.space/20220626125248.png)

![image-20220626125326468](https://img1.terwer.space/20220626125326.png)

## PS：有用的小技巧

解决防盗链问题。默认cnblogs图片引用会出现403

https://stevenocean.github.io/2021/01/29/minio-image-serve.html

图片参数看这里

https://images.weserv.nl/docs/quick-reference.html