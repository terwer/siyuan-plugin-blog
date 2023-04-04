---
title: 类加载器的父亲委托机制深度详解
short_title: ''
description: 类加载器的父亲委托机制深度详解
date: 2022-07-06 19:45:48
category:
  - JVM新思路
  - 新笔记
tag:
  - jvm
  - classloader
  - parent
  - delegate
article: true
timeline: false
---
# 类加载器的父亲委托机制深度详解

## 类加载器

![image-20220706194726101](https://img1.terwer.space/20220706194731.png)

## 类加载器的父亲委托机制

类加载器的父亲委托机制（Parent Delegation）

父子加载器不是继承关系，子加载器不一定要继承父加载器。

![image-20220706195823325](https://img1.terwer.space/20220706195823.png)

![image-20220706212124825](https://img1.terwer.space/20220706212125.png)

![image-20220706212210421](https://img1.terwer.space/20220706212210.png)

![image-20220706212259027](https://img1.terwer.space/20220706212259.png)

![image-20220706212442004](https://img1.terwer.space/20220706212442.png)

![image-20220706212633194](https://img1.terwer.space/20220706212633.png)

![image-20220706213517416](https://img1.terwer.space/20220706213517.png)

定义类加载器：如果某个类加载器能够加载一个类，那么该加载器称为**定义类加载器**，定义类加载器及其所有子类加载器都称做**初始类加载器**。

![image-20220706214111381](https://img1.terwer.space/20220706214111.png)

![image-20220706214146757](https://img1.terwer.space/20220706214147.png)

![image-20220706214455660](https://img1.terwer.space/20220706214456.png)

当生成一个自定义的类加载器的实例时，如果没有指定它的父加载器，那么系统类加载器将成为该类加载器的父类加载器。

![image-20220706215219081](https://img1.terwer.space/20220706215219.png)

![image-20220706221248345](https://img1.terwer.space/20220706221248.png)

## 类加载器的命名空间

![image-20220706221533110](https://img1.terwer.space/20220706221533.png)

## 运行时包

![image-20220706221931248](https://img1.terwer.space/20220706221931.png)

## 创建用户自定义的类加载器

![image-20220706222307454](https://img1.terwer.space/20220706222307.png)