---
title: IDEA的大坑：src目录丢失Source Root标记就不会编译
short_title: ''
description: IDEA的大坑：src目录丢失Source Root标记就不会编译。如果由于某些原因，IDEA 源代码的 src 目录没有被标上 Source
  Root 标记，那么编译的时候是不会生成 class 文件的。
date: 2022-05-11 23:50:42
category:
  - 实用技巧
  - 经验分享
tag:
  - idea
  - src
  - source
article: true
timeline: false
---
:::tip 文章更新历史

2022/05/11 feat:初稿。

:::

如果由于某些原因，IDEA 源代码的 `src` 目录没有被标上` Source Root` 标记，那么编译的时候是不会生成 class 文件的。

这个问题搞了我好久终于找到了解决办法，重新加上标记即可。

**方法：**

在 src 目录点击邮件 Mark Directory as -> Source Root，重新编译即可。

![](https://img1.terwer.space/20220511200506.png)