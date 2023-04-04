---
title: MyBatis缓存的概念
short_title: ''
description: 缓存回顾缓存就是内存中的数据常常来自对数据库查询结果的保存。使用缓存可以避免频繁与数据库交互进而提高响应速度。mybatis对缓存的支持mybatis也提供了对缓存的支持分为一级缓存和二级缓存。可以用下面的图来理解_​一级缓存是sqlsession级别的缓存。在操作数据库时需要构造sqlsession对象在对象中有一个hashmap的数据结构用于存储缓存数据。不同的sqlsession之间缓存的数据区域（hashmap）是不同的。二级缓存是mapper级别的缓存。多个sqlsession操作同一个mapp
date: 2022-09-06 00:31:03
category:
  - MyBatis
  - 后端开发
  - 开源框架
tag:
  - 缓存
  - 二级缓存
  - 数据库
  - 数据
  - mybatis
  - 一级缓存
article: true
timeline: false
---
## 缓存回顾

缓存就是内存中的数据，常常来自对数据库查询结果的保存。

使用缓存可以避免频繁与数据库交互，进而提高响应速度。

## MyBatis 对缓存的支持

MyBatis 也提供了对缓存的支持，分为 `一级缓存` 和 `二级缓存`。可以用下面的图来理解：

![](https://img1.terwer.space/api/public/20220906003601.png)​

1. 一级缓存是 SqlSession 级别的缓存。在操作数据库时，需要构造 SqlSession 对象，在对象中有一个 HashMap 的数据结构用于存储缓存数据。不同的 SqlSession 之间缓存的数据区域（HashMap）是不同的。
2. 二级缓存是 Mapper 级别的缓存。多个 SqlSession 操作同一个 Mapper 的 sql 语句，多个 SqlSession 可以共用二级缓存，二级缓存是跨 SqlSession 的。

> 文章更新历史  
> 2022-09-06 feat:初稿
>