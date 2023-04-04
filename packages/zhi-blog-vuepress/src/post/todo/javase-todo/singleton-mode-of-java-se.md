---
title: JavaSE之单例模式
short_title: ''
description: Java SE Lesson 3：单例模式
date: 2022-05-05 22:21:08
category:
  - TODO
  - JavaSE-TODO
tag: []
article: true
timeline: false
---
# Java SE Lesson 3：单例模式

1. 接口中声明的方法都是抽象方法，抽象方法都是 `public` 的。
2. 接口中也可以定义成员变量，**接口中的成员变量都是 `public`、`static`、`final`的**。
3. 一个类不能既是 `final` ，又是 `abstract` 的，因为 `abstract` 是定义一个方法上的约定，让子类去实现这种约定，而 `final` 明确说明该类不能被继承，两者矛盾。因此，一个类不能既是 `final` ，又是 `abstract` 的。
4. `Desgin Pattern`（设计模式）。单例模式（Singleton），表示一个类始终只会生成唯一的一个对象。
5. 

# 参考

《图解设计模式》