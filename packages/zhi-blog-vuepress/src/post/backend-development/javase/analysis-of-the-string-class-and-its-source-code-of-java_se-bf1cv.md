---
title: Java_SE之String类及其源代码剖析
short_title: ''
description: 字符串特性​string​​是常量其对象一旦创建就无法改变。当使用​​​拼接字符串时会生成新的string​​​对象而不是向原有的string​​​对象追加内容。查看字节码javapjavapccomterwergreenstrstringnewtestjava源代码publicclassstringnewtest{publicstaticvoidmain(string[]args){stringstr=newstring(}}字节码_➜javasetestgit_(master)✗javapcconst
date: 2022-10-15 20:26:52
category:
  - 后端开发
  - JavaSE
tag:
  - 对象
  - 字符串
  - 字节
  - 特性
  - 常量
  - string
article: true
timeline: false
---
## 字符串特性

1. ​`String`​​ 是常量，其对象一旦创建就无法改变。
2. 当使用 `+`​​​ 拼接字符串时，会生成新的 `String`​​​ 对象，而不是向原有的 `String`​​​ 对象追加内容。

## 查看字节码

### javap

```bash
javap -c com.terwergreen.str.StringNewTest
```

java 源代码

```java
public class StringNewTest {
    public static void main(String[] args) {
        String str = new String("abc");
    }
}
```

字节码：

```bash
➜  javase-test git:(master) ✗ javap -c -constants com.terwergreen.str.StringNewTest
Compiled from "StringNewTest.java"
public class com.terwergreen.str.StringNewTest {
  public com.terwergreen.str.StringNewTest();
    Code:
       0: aload_0
       1: invokespecial #8                  // Method java/lang/Object."<init>":()V
       4: return

  public static void main(java.lang.String[]);
    Code:
       0: new           #16                 // class java/lang/String
       3: ldc           #18                 // String abc
       5: invokespecial #20                 // Method java/lang/String."<init>":(Ljava/lang/String;)V
       8: return
}
```

### idea

选中 `.class`​ 文件，`View->Show bytecode`​

## 字符串池

String Pool（字符串池）

1. ​`String s = "aaa";`​​ 采用字面值的方式赋值

   1. 查找 Spring Pool 中是否存在 "aaa" 这个对象，如果不存在，则在 Spring Pool 中创建一个 "aaa" 对象，然后将 Spring Pool 中的这个 "aaa" 对象的地址返回来，赋给变量 s ，这样 s 会指向 String Pool 中的这个 "aaa" 字符串对象。
   2. 如果存在，则不创建任何对象，直接将 Spring pool 中的这个 "aaa" 对象地址返回来，赋给 s 引用。

2. String s = new String("aaa");

    1. 首先在 String Pool 中查找有没有 "aaa" 这个字符串对象，如果有，则不在 String Pool 中再去创建 "aaa" 这个对象了，直接在堆中（heap）创建一个 "aaa" 字符串对象，然后将堆中的这个 "aaa" 字符串对象返回来，付给 s 引用，导致 s 指向了堆中创建的这个 "aaa" 字符串对象。
    2. 如果没有，则首先在 String Pool 中创建一个 "aaa" 对象，然后再在堆中（heap）创建一个 "aaa" 对象，然后将堆中的这个 "aaa" 对象返回来，付给 s 引用，导致 s 指向了堆中所创建的这个 "aaa" 对象。

## intern

参考

[https://docs.oracle.com/javase/specs/jls/se8/html/jls-3.html#jls-3.10](https://docs.oracle.com/javase/specs/jls/se8/html/jls-3.html#jls-3.10)

[https://docs.oracle.com/javase/specs/jls/se17/html/jls-3.html#jls-StringLiteral](https://docs.oracle.com/javase/specs/jls/se17/html/jls-3.html#jls-StringLiteral)

## 参考

各个版本的 JDK 文档下载地址

**Links to JDK documentation**

|Java SE|Download|Web|Other|
| ------------| ---------------------| -----| -------|
|[19](https://en.wikipedia.org/wiki/Java_version_history#Java_19) (current)|[Downloads page](https://www.oracle.com/java/technologies/javase-jdk19-doc-downloads.html)|[Javadoc](https://docs.oracle.com/en/java/javase/19/docs/api/index.html)|[Doc home](https://docs.oracle.com/en/java/javase/19/)|
|[18](https://en.wikipedia.org/wiki/Java_version_history#Java_17)|[Downloads page](https://www.oracle.com/java/technologies/javase-jdk18-doc-downloads.html)|[Javadoc](https://docs.oracle.com/en/java/javase/18/docs/api/index.html)|[Doc home](https://docs.oracle.com/en/java/javase/18/)|
|[17](https://en.wikipedia.org/wiki/Java_version_history#Java_17) ([LTS](https://en.wikipedia.org/wiki/Long-term_support))|[Downloads page](https://www.oracle.com/java/technologies/javase-jdk17-doc-downloads.html)|[Javadoc](https://docs.oracle.com/en/java/javase/17/docs/api/index.html)|[Doc home](https://docs.oracle.com/en/java/javase/17/)|
|[16](https://en.wikipedia.org/wiki/Java_version_history#Java_16)|no longer available|[Javadoc](https://docs.oracle.com/en/java/javase/16/docs/api/index.html)|[Doc home](https://docs.oracle.com/en/java/javase/16/)|
|[15](https://en.wikipedia.org/wiki/Java_version_history#Java_15)|no longer available|[Javadoc](https://docs.oracle.com/en/java/javase/15/docs/api/index.html)|[Doc home](https://docs.oracle.com/en/java/javase/15/)|
|[14](https://en.wikipedia.org/wiki/Java_version_history#Java_14)|no longer available|[Javadoc](https://docs.oracle.com/en/java/javase/14/docs/api/index.html)|[Doc home](https://docs.oracle.com/en/java/javase/14/)|
|[13](https://en.wikipedia.org/wiki/Java_version_history#Java_13)|no longer available|[Javadoc](https://docs.oracle.com/en/java/javase/13/docs/api/index.html)|[Doc home](https://docs.oracle.com/en/java/javase/13/)|
|[12](https://en.wikipedia.org/wiki/Java_version_history#Java_12)|no longer available|[Javadoc](https://docs.oracle.com/en/java/javase/12/docs/api/index.html)|[Doc home](https://docs.oracle.com/en/java/javase/12/)|
|[11](https://en.wikipedia.org/wiki/Java_version_history#Java_11) ([LTS](https://en.wikipedia.org/wiki/Long-term_support))|[Downloads page](https://www.oracle.com/java/technologies/javase-jdk11-doc-downloads.html)|[Javadoc](https://docs.oracle.com/en/java/javase/11/docs/api/index.html)|[Doc home](http://docs.oracle.com/javase/11/docs/)|
|[10](https://en.wikipedia.org/wiki/Java_version_history#Java_10)|no longer available|[Javadoc](https://docs.oracle.com/javase/10/docs/api/overview-summary.html)|[Doc home](https://docs.oracle.com/javase/10/)|
|[9](https://en.wikipedia.org/wiki/Java_version_history#Java_9)|no longer available|[Javadoc](https://docs.oracle.com/javase/9/docs/api/overview-summary.html)|[Doc home](https://docs.oracle.com/javase/9/)|
|[8](https://en.wikipedia.org/wiki/Java_version_history#Java_8) ([LTS](https://en.wikipedia.org/wiki/Long-term_support))|[Downloads page](https://www.oracle.com/java/technologies/javase-jdk8-doc-downloads.html)|[Javadoc](https://docs.oracle.com/javase/8/docs/api/index.html)|[Platform home](https://docs.oracle.com/javase/8/)<br />[Doc home](https://docs.oracle.com/javase/8/docs/)<br />|
|[7](https://en.wikipedia.org/wiki/Java_version_history#Java_7)|no longer available|[Javadoc](https://docs.oracle.com/javase/7/docs/api/overview-summary.html)|[Doc home](https://docs.oracle.com/javase/7/docs/)|
|[6](https://en.wikipedia.org/wiki/Java_version_history#Java_6)|no longer available|[Javadoc](https://docs.oracle.com/javase/6/docs/api/overview-summary.html)|[Doc home](https://docs.oracle.com/javase/6/docs/)|

By the way, a [history of Java SE versions](https://en.wikipedia.org/wiki/Java_version_history).

历史版本

[https://javadoc.allimant.org/](https://javadoc.allimant.org/)

‍