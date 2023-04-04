---
title: ClassLoader类源代码深度剖析及类的卸载机制详解
short_title: ''
description: classloader类源代码深度剖析及类的卸载机制详解类的卸载​反射突破命名空间不同不能调用的限制​​上面一个object转换为sample会报classnotfoundexception下面通过反射调用的可以正常打印结果。反射可以突破不同命名空间的类不能相互访问的限制。由用户自定义的类加载器是可以被卸载的。​​​​​
date: 2022-08-22 22:21:24
category:
  - JVM新思路
  - 新笔记
tag:
  - 卸载
  - 反射
  - 可以
  - 突破
  - 命名
article: true
timeline: false
---
## 类的卸载

![](https://img1.terwergreen.com/api/public/20220822222439.png)​

反射突破命名空间不同不能调用的限制

![](https://img1.terwergreen.com/api/public/20220822224032.png)​

![](https://img1.terwergreen.com/api/public/20220822223920.png)​

**上面一个 object 转换为 Sample 会报 Class Not Found Exception，下面通过反射调用的可以正常打印结果。**

反射可以突破不同命名空间的类不能相互访问的限制。

由用户自定义的类加载器是可以被卸载的。

![](https://img1.terwergreen.com/api/public/20220823003411.png)​

![](https://img1.terwergreen.com/api/public/20220823004518.png)​

![](https://img1.terwergreen.com/api/public/20220823004434.png)​

![](https://img1.terwergreen.com/api/public/20220823004634.png)​

![](https://img1.terwergreen.com/api/public/20220823005001.png)​