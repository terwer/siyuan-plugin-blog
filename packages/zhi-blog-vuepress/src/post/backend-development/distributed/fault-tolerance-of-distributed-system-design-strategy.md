---
title: 分布式系统设计策略之容错性
short_title: ''
description: 容错处理保障了分布式系统环境下相应系统高可用和健壮性。
date: 2022-05-04 17:11:32
category:
  - 后端开发
  - 分布式
tag:
  - error
  - tolerant
article: true
timeline: false
---
### 容错性

容错就是IT系统对错误的包容能力。

容错处理保障了分布式系统环境下相应系统高可用和健壮性。

常见的案例是对于 `缓存穿透` 问题的解决方案。

![image-20220411211453419](https://img1.terwer.space/image-20220411211453419.png)

解决办法

1. 临时存放null值
2. 使用布隆过滤器

![image-20220411212437909](https://img1.terwer.space/image-20220411212437909.png)

[https://baike.baidu.com/item/%E5%B8%83%E9%9A%86%E8%BF%87%E6%BB%A4%E5%99%A8/5384697?fr=aladdin](https://baike.baidu.com/item/%E5%B8%83%E9%9A%86%E8%BF%87%E6%BB%A4%E5%99%A8/5384697?fr=aladdin)