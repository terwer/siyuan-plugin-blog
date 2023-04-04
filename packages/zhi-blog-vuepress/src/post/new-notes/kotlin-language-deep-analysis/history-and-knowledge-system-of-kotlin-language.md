---
title: Kotlin语言的历史与知识体系
short_title: ''
description: Kotlin语言的历史与知识体系。
date: 2022-05-07 22:20:22
category:
  - 新笔记
  - Kotlin语言深度解析
tag:
  - kotlin
  - jvm
  - lang
article: true
timeline: false
---
# Kotlin语言的历史与知识体系

## 来源

类似Apple的Swift

[https://developer.apple.com/swift/](https://developer.apple.com/swift/)

jvm平台上的语言

[https://www.oracle.com/technical-resources/articles/java/architect-languages.html](https://www.oracle.com/technical-resources/articles/java/architect-languages.html)

被认定为Android开发的官方语言

[https://developer.android.com/kotlin](https://developer.android.com/kotlin)

## 学习边界

重点和核心：Kotlin语言本身

不学什么：Android开发、后端（Server端）的开发

Kotlin能做什么：Android、后端（Spring5原生支持）、浏览器应用开发

## Kotlin官网

[https://kotlinlang.org/](https://kotlinlang.org/)

## 知识体系

- 基础语法详解
- 包、函数、变量、表达式、控制语句实例
- 基本类型、跳转详解
- Kotlin中的类与对象
- 类与继承、属性与字段详解
- 可见性实例剖析
- 扩展详解
- 数据类与密封类详解
- Kotlin泛型详解
- when关键字作用解析
- open、final与abstract关键字详解
- 对象的构建过程详解
- Any类型作用解析
- Kotlin反射详解
- 对象表达式与声明
- 函数与高阶函数解析
- Kotlin内联函数详解
- Kotlin Lambda表达式详解
- Kotlin函数式编程与Kotlin函数式编程对比
- Kotlin类型检查与类型转换解析
- 空安全的实现与Optional
- 异常与注解
- Kotlin枚举详解
- 嵌套类与匿名类
- Kotlin集合深入解析
- 不变集合与可变集合
- 运算符重载分析
- Java与Kotlin互操作
- 协程与Kotlin协程剖析

## 入门级demo

新建一个kotlin项目kotlin-demo，然后新建一个kotlin file，名字叫 `hello.kt` ：

```kotlin
package test

import java.util.function.Consumer

fun main(args: Array<String>){
    println("hello")

    println("--------------")
    var list: List<String> = listOf("aaa", "bbb", "ccc")

    for (str in list){
        println(str)
    }

    println("---------------")

    list.forEach(Consumer { println(it) })

    println("--------------")

    list.forEach(System.out::println)
}
```

运行效果：

![image-20220508115321136](https://img1.terwer.space/20220508115321.png)

## 参考

Kotlin全栈开发

[https://segmentfault.com/a/1190000037644424](https://segmentfault.com/a/1190000037644424)