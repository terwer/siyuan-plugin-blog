---
title: Java_SE之Object类详解
short_title: ''
description: 相等性的比较（==）对于原生数据类型比较的是左右两边的值是否相等对于引用类型来说比较的是左右两边的引用是否指向同一个对象或者说左右两边的引用地址是否相同。javalangobject类javalang包在使用时无需显式导入编译时由编译器帮助我们导入。api（applicationprogramminginterface）应用编程接口。tostring当打印引用时实际上会打印引入所指对象的tostring()方法的返回值。因为每个类都直接或者间接的继承自object而object类中定义了tostring(
date: 2022-10-12 20:51:24
category:
  - 后端开发
  - JavaSE
tag:
  - 引用
  - 进制
  - 比较
  - 左右
  - 两边
  - 对象
article: true
timeline: false
---
## 相等性的比较（==）

* 对于原生数据类型，比较的是左右两边的值是否相等
* 对于引用类型来说，比较的是左右两边的引用是否指向同一个对象，或者说左右两边的引用地址是否相同。

## java.lang.Object 类

`java.lang` 包在使用时无需显式导入，编译时由编译器帮助我们导入。

## API（Application Programming Interface）

应用编程接口。

## toString

当打印引用时，实际上会打印引入所指对象的 toString() 方法的返回值。因为每个类都直接或者间接的继承自 Object ，而 Object 类中定义了 toString() 方法，因此，每个类都有 toString() 这个方法。

例子：

```java
public class ObjectTest {
    public static void main(String[] args) {
        Object object = new Object();

        System.out.println(object);
        System.out.println(object.toString());

        String str = "aaa";
        System.out.println(str);
        System.out.println(str.toString());

        Student student = new Student();
        System.out.println(student);
        System.out.println(student.toString());
    }
}

class Student {
    public String toString() {
        return "Hello World";
    }
}
```

结果：

```plaintext
java.lang.Object@2c8d66b2
java.lang.Object@2c8d66b2
aaa
aaa
Hello World
Hello World
```

## 进制的表示

关于进制的表示：

16进制，逢16进一，16进制的数字包括：0~9，A,B,C,D,E,F

例子：

```java
int v16 = 0xAB2F;
System.out.println(v16);

int result = 10 * (int) Math.pow(16, 3) + 11 * (int) Math.pow(16, 2) + 2 * 16 + 15;
System.out.println(result);

// 43823
// 43823
```

## equals

 看看官方文档

Indicates whether some other object is "equal to" this one.

The equals method implements an equivalence relation on **non-null**​ object references:

* It is reflexive: for any non-null reference value x, x.equals(x) should return true.

* It is symmetric: for any non-null reference values x and y, x.equals(y) should return true if and only if y.equals(x) returns true.

* It is transitive: for any non-null reference values x, y, and z, if x.equals(y) returns true and y.equals(z) returns true, then x.equals(z) should return true.

* It is consistent: for any non-null reference values x and y, multiple invocations of x.equals(y) consistently return true or consistently return false, provided no information used in equals comparisons on the objects is modified.

* For any non-null reference value x, x.equals(null) should return false.

The equals method for class Object implements the most discriminating possible equivalence relation on objects; that is, for any non-null reference values x and y, this method returns true if and only if x and y refer to the same object (x == y has the value true).  

Note that it is generally necessary to override the hashCode method whenever this method is overridden, so as to maintain the general contract for the hashCode method, which states that equal objects must have equal hash codes.  

Params:  
obj – the reference object with which to compare.  

Returns:  
true if this object is the same as the obj argument; false otherwise.

equals方法，定义在 Object 类中，因此 Java 中的每个类都具有该方法，对于 Object 类的 equals() 方法来说，它是判断调用 equals 方法的引用与传进来的引用是否一致，即这两个引用是否指向的是同一个对象。

对于 `Object` 类的 `equals` 方法来说，它等价于 `==` 。

对于 `String` 类的 `equals` 方法来说，它是判断当前字符串与传进来的字符串内容是否一致。

对于 `String`​ 对象的相等性来说，请使用 `equals` 方法，而不要使用 `==` 。

‍