---
title: 编译常量、ClassLoader类、系统类加载器深度探析
short_title: ''
description: 编译常量、ClassLoader类、系统类加载器深度探析
date: 2022-07-05 21:15:38
category:
  - JVM新思路
  - 新笔记
tag:
  - jvm
  - classloader
  - system
article: true
timeline: false
---
# 编译常量、ClassLoader类、系统类加载器深度探析

## 类的初始化

![image-20220705211544579](https://img1.terwer.space/20220705211550.png)

* 类的初始化步骤

![image-20220705213733318](https://img1.terwer.space/20220705213733.png)

* 类的初始化时机

![image-20220705213720887](https://img1.terwer.space/20220705213721.png)

例子：

```java
/**
 * @name: FinalTest
 * @author: terwer
 * @date: 2022-07-05 21:51
 **/
public class Test2 {
    public static void main(String[] args) {
        System.out.println(FinalTest.x);
    }
}

class FinalTest {
    public static final int x = 6 / 3;

    static {
        System.out.println("FinalTest static block");
    }
}
```

运行结果

![image-20220705224430483](https://img1.terwer.space/20220705224431.png)

```java
/**
 * @name: Test3
 * @author: terwer
 * @date: 2022-07-05 22:24
 **/
public class Test3 {
    public static void main(String[] args) {
        System.out.println(FinalTest2.x);
    }
}

class FinalTest2{
    public static final int x = new Random().nextInt(100);

    static {
        System.out.println("FinalTest2 static block");
    }
}
```

![image-20220705224458495](https://img1.terwer.space/20220705224459.png)

前面一个 x 是常量，编译时候可以确定，因此，不会初始化类。

后面一个 x 在编译阶段无法确定，运行阶段才能确定因此，会初始化类。

![image-20220705224752721](https://img1.terwer.space/20220705224753.png)

例子

```java
/**
 * @name: Test4
 * @author: terwer
 * @date: 2022-07-05 22:52
 **/
public class Test4 {
    static {
        System.out.println("Test4 static block");
    }

    public static void main(String[] args) {
        System.out.println(Child.b);
    }
}

class Parent {
    static int a = 3;

    static {
        System.out.println("Parent static block");
    }
}

class Child extends Parent {
    static int b = 4;

    static {
        System.out.println("Child static block");
    }
}

```

运行结果

![image-20220705230033478](https://img1.terwer.space/20220705230034.png)

例子

```java
/**
 * @name: Test5
 * @author: terwer
 * @date: 2022-07-05 23:02
 **/
public class Test5 {
    static {
        System.out.println("Test5 static block");
    }

    public static void main(String[] args) {
        Parent2 parent;

        System.out.println("-----------------");

        parent = new Parent2();

        System.out.println(Parent2.a);

        System.out.println(Child2.b);
    }
}
```

运行结果

![image-20220705231636865](https://img1.terwer.space/20220705231637.png)

程序中对子类的“主动使用”会导致父类被初始化，但是，对父类的主动使用并不会导致子类初始化（不可能说生成一个 Object 类的对象就导致系统中所有的子类都被初始化）。

![image-20220705232420092](https://img1.terwer.space/20220705232420.png)

例子

```java
/**
 * @name: Test6
 * @author: terwer
 * @date: 2022-07-05 23:27
 **/
public class Test6 {
    public static void main(String[] args) {
        System.out.println(Child3.a);

        Child3.dosomething();
    }
}

class Parent3 {
    static int a = 3;

    static {
        System.out.println("Parent3 static block");
    }

    static void dosomething() {
        System.out.println("do something");
    }
}

class Child3 extends Parent3 {
    static {
        System.out.println("Child3 static block");
    }
}
```

运行结果

![image-20220705233448532](https://img1.terwer.space/20220705233449.png)

![image-20220705233824150](https://img1.terwer.space/20220705233824.png)

例子

```java
/**
 * @name: Test7
 * @author: terwer
 * @date: 2022-07-05 23:45
 **/
public class Test7 {
    public static void main(String[] args) throws Exception {
        ClassLoader classLoader = ClassLoader.getSystemClassLoader();
        Class<?> clazz = classLoader.loadClass("com.terwergreen.classloader.C");
        System.out.println("-------------------");

        Class.forName("com.terwergreen.classloader.C");
    }
}

class C {
    static {
        System.out.println("Class C");
    }
}
```

运行效果

![image-20220705235208523](https://img1.terwer.space/20220705235209.png)