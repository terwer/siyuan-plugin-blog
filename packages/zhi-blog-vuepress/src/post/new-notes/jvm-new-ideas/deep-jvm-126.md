---
title: 深入详解JVM之类加载器深度剖析、根、扩展及系统类加载器
short_title: ''
description: 深入详解JVM
date: 2022-05-05 22:25:21
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
# 深入详解JVM之类加载器深度剖析、根、扩展及系统类加载器

> **文章更新历史**
>
> 2022/05/05 feat:初稿。
>

## 类加载器（`ClassLoader`）

## JVM 提供了三种类加载器

* 根类加载器（**使用 C++ 编写，程序员无法在 Java 代码中使用他们**）

* 扩展类加载器（使用 Java 代码实现）

* 应用类加载器（系统加载器），使用 Java 实现

3、用户自定义的类加载器都是 `java.lang.Classloader` 的子类

**例子：**

```java
 /**
  * @name: MyTest1
  * @author: terwer
  * @date: 2022-03-07 00:45
  **/
 public class MyTest1 {
     public static void main(String[] args) throws Exception {
         Class clazz = Class.forName("java.lang.String");
         System.out.println(clazz.getClassLoader());
 
         Class clazz2 = Class.forName("com.terwergreen.classloader.C");
         System.out.println(clazz2.getClassLoader());
     }
 }
 
 class C{
 
 }
```

![img](https://img1.terwer.space/20220626130746.png)

jdk 文档

A class loader is an object that is responsible for loading classes. The class ClassLoader is an abstract class. Given the binary name of a class, a class loader should attempt to locate or generate data that constitutes a definition for the class. A typical strategy is to transform the name into a file name and then read a "class file" of that name from a file system.
Every Class object contains a reference to the ClassLoader that defined it.

Class objects for array classes are not created by class loaders, but are created automatically as required by the Java runtime. The class loader for an array class, as returned by Class.getClassLoader() is the same as the class loader for its element type; if the element type is a primitive type, then the array class has no class loader.
Applications implement subclasses of ClassLoader in order to extend the manner in which the Java virtual machine dynamically loads classes.

Class loaders may typically be used by security managers to indicate security domains.
In addition to loading classes, a class loader is also responsible for locating resources. A resource is some data (a ".class" file, configuration data, or an image for example) that is identified with an abstract '/'-separated path name. Resources are typically packaged with an application or library so that they can be located by code in the application or library. In some cases, the resources are included so that they can be located by other libraries.

The ClassLoader class uses a delegation model to search for classes and resources. Each instance of ClassLoader has an associated parent class loader. When requested to find a class or resource, a ClassLoader instance will usually delegate the search for the class or resource to its parent class loader before attempting to find the class or resource itself.

Class loaders that support concurrent loading of classes are known as parallel capable class loaders and are required to register themselves at their class initialization time by invoking the ClassLoader.registerAsParallelCapable method. Note that the ClassLoader class is registered as parallel capable by default. However, its subclasses still need to register themselves if they are parallel capable. In environments in which the delegation model is not strictly hierarchical, class loaders need to be parallel capable, otherwise class loading can lead to deadlocks because the loader lock is held for the duration of the class loading process (see loadClass methods).

Run-time Built-in Class Loaders

The Java run-time has the following built-in class loaders:

**Bootstrap class loader.**

It is the virtual machine's built-in class loader, typically represented as null, and does not have a parent.

**Platform class loader.**

 All platform classes are visible to the platform class loader that can be used as the parent of a ClassLoader instance. Platform classes include Java SE platform APIs, their implementation classes and JDK-specific run-time classes that are defined by the platform class loader or its ancestors.

To allow for upgrading/overriding of modules defined to the platform class loader, and where upgraded modules read modules defined to class loaders other than the platform class loader and its ancestors, then the platform class loader may have to delegate to other class loaders, the application class loader for example. In other words, classes in named modules defined to class loaders other than the platform class loader and its ancestors may be visible to the platform class loader.

**System class loader.**

It is also known as application class loader and is distinct from the platform class loader. The system class loader is typically used to define classes on the application class path, module path, and JDK-specific tools. The platform class loader is a parent or an ancestor of the system class loader that all platform classes are visible to it.

Normally, the Java virtual machine loads classes from the local file system in a platform-dependent manner. However, some classes may not originate from a file; they may originate from other sources, such as the network, or they could be constructed by an application. The method defineClass converts an array of bytes into an instance of class Class. Instances of this newly defined class can be created using Class.newInstance.

The methods and constructors of objects created by a class loader may reference other classes. To determine the class(es) referred to, the Java virtual machine invokes the loadClass method of the class loader that originally created the class.

For example, an application could create a network class loader to download class files from a server. Sample code might look like:

​    ClassLoader loader = new NetworkClassLoader(host, port);
​    Object main = loader.loadClass("Main", true).newInstance();
​         . . .

The network class loader subclass must define the methods findClass and loadClassData to load a class from the network. Once it has downloaded the bytes that make up the class, it should use the method defineClass to create a class instance. A sample implementation is:

```java
class NetworkClassLoader extends ClassLoader {
   	 String host;
   	 int port;
  
	  	public Class findClass(String name) {
          byte[] b = loadClassData(name);
          return defineClass(name, b, 0, b.length);
      }
 
      private byte[] loadClassData(String name) {
          // load the class data from the connection
           . . .
      }
  }
```

Binary names
Any class name provided as a String parameter to methods in ClassLoader must be a binary name as defined by The Java™ Language Specification.
Examples of valid class names include:

```
"java.lang.String"
"javax.swing.JSpinner$DefaultEditor"
"java.security.KeyStore$Builder$FileBuilder$1"
"java.net.URLClassLoader$3$1"
```

Any package name provided as a String parameter to methods in ClassLoader must be either the empty string (denoting an unnamed package) or a fully qualified name as defined by The Java™ Language Specification.
Since:
1.0
revised
9
spec
JPMS

## 类的加载

* 类加载器**并不需要**等到某个类被“首次使用”才去加载它。
* JVM 规范允许类加载器在预料到某个类将要被使用的时候预先加载它，如果预先加载中遇到了.class 文件缺失或者遇到错误，类加载器必须在程序首次主动使用该类时候才去报告错误（`LinkageError错误`）。
* 如果这个类一直没有被程序**主动使用**，那么类加载器不会报告错误。

## 类的验证

类被加载后，进入连接阶段。连接是将已经读入到内存的类的二进制数据合并到虚拟机运行时环境中去。

## 类的验证的内容

* 类文件的结构检查
* 语义检查
* 字节码验证
* 二进制兼容性验证

![image-20220703123423971](https://img1.terwer.space/20220703123424.png)

## 类的准备

![](https://img1.terwer.space/20220703212752.png)

## 类的解析

![image-20220703212922675](https://img1.terwer.space/20220703212923.png)

![image-20220703213703929](https://img1.terwer.space/20220703213704.png)

## 类的初始化

![image-20220703213857934](https://img1.terwer.space/20220703213858.png)

## 案例

```java
package com.terwergreen.classloader;

/**
 * 类的加载案例
 *
 * @name: MyTest
 * @author: terwer
 * @date: 2022-07-03 21:48
 **/
public class MyTest {
    public static void main(String[] args) {
        Singleton singleton = Singleton.getInstance();
        System.out.println("counter1=" + singleton.counter1);
        System.out.println("counter2=" + singleton.counter2);
    }
}

class Singleton {
    // 这样会输出
    // counter1=1
    // counter2=0
    private static Singleton singleton = new Singleton();
    public static int counter1;
    public static int counter2 = 0;
    // 这样会输出
    // counter1=1
    // counter2=1
    // private static Singleton singleton = new Singleton();

    private Singleton() {
        counter1++;
        counter2++;
    }

    public static Singleton getInstance() {
        return singleton;
    }
}
```