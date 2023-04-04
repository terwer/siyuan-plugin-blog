---
title: Java_SE_Lesson_3：接口、单例模式、包与访问控制
short_title: ''
description: 接口中所声明的方法都是抽象方法。接口中的方法都是public​的。接口中也可以定义成员变量。接口中的成员变量都是publicfinalstatic的。一个类不能既是final又是abstract的。因为abstract的主要目的是啥定义一种约定让子类去实现这种约定而final表示该类不能被继承。这样abstract希望该类可以被继承而final明确说明该类不能被继承两者矛盾。因此一个类不能既是final的又是abstract的。desginpattern（设计模式）。单例模式（singleton）publ
date: 2022-09-30 20:42:53
category:
  - 后端开发
  - JavaSE
tag:
  - 接口
  - 方法
  - 成员
  - 变量
  - 声明
article: true
timeline: false
---
1. 接口中所声明的方法都是抽象方法。接口中的方法都是 `public`​ 的。
2. 接口中也可以定义成员变量。接口中的成员变量都是 `public` ， `final` ， `static` 的。
3. 一个类不能既是 final 又是 abstract 的。因为 abstract 的主要目的是啥定义一种约定，让子类去实现这种约定，而 final 表示该类不能被继承。

   这样 abstract 希望该类可以被继承而 final 明确说明该类不能被继承，两者矛盾。

   因此一个类不能既是 final 的又是 abstract 的。

4. Desgin Pattern（设计模式）。

   单例模式（Singleton）

   ```java
   public class SingletonTest {
       public static void main(String[] args) {
           Singleton s1 = Singleton.getInstance();
           Singleton s2 = Singleton.getInstance();

           System.out.println(s1 == s2);
       }
   }

   class Singleton {
       private static Singleton singleton = new Singleton();

       private Singleton() {
       }

       public static Singleton getInstance() {
           return singleton;
       }
   }
   ```

或者

```java
public class SingletonTest {
    public static void main(String[] args) {
        Singleton s1 = Singleton.getInstance();
        Singleton s2 = Singleton.getInstance();

        System.out.println(s1 == s2);
    }
}

class Singleton {
    private static Singleton singleton;

    private Singleton() {
    }

    public static Singleton getInstance() {
        if (null == singleton) {
            singleton = new Singleton();
        }
        return singleton;
    }
}
```

注意：方式二，在多线程的时候，可能会出现线程不安全，不是单例的情况。

5. 包（`package`）

用于将完成不同功能的类分门别类，放在不同的目录（包）下。

包命名规则：将公司域名反转作为包名。

www.terwer.space，包名：space.terwer

对于包名：每个字母都是小写。

如果定义类的时候，没有使用 package，那么 Java 认为我们的包位于默认的包里面（default package）。

6. 编译带有 package 声明的 java 源文件有两种方式

   a）直接编译，然后根据类中所定义的包名，逐一手工建立目录结构，最后将生成的 class 文件拷贝该目录（较麻烦，很少使用）。

   b）使用编译参数 `-d`​ ，方式为 `javac -d . 源文件.java` ，这样编译后，编译器会自动帮我们建立好包对应的目录结构。

7. 有两个报名。分别是 aa.bb.cc 与 aa.bb.cc.dd，那么我们称后者为前者的子包。

8. 导入（`import`​）：将使用 package 分离的各个类导入回来，让编译器能够找到所需的类。

9. import 的语法：`import space.terwer.PackageTest;`​

10. `import space.terwer.*` ，博士导入 space.terwer 包下面的所有类。

11. `import aa.bb.*`​​​​​​ 并不会导入 aa.bb.cc 包下面的类。

    这样写：

    ```java
    import aa.bb.*;
    import aa.bb.cc,*;
    ```
12. 关于 package、import、class 的顺序问题：

    a）首先要定义包（package），可选

    b）接下来使用 import 进行导入，可选

    c）然后才是 class 或者 interface 的定义。
13. 如果两个类在同一个包下面，那么不需要导入，直接使用即可。
14. 访问修饰符（access modifier）

    1）public（公共的）：被 public 修饰的属性和方法可以被所有类访问。

    2）protected（受保护的）：被 protected 修饰的属性和方法可以在类内部、相同包以及该类额子类所访问。

    3）private（私有的）：被 private 修饰的属性和方法只能在定义该属性和方法的类的内部使用。

    4）默认（不加访问修饰符）：在类内部以及相同包下面的类所使用。
15. instanceof：判断某个对象是否是某个类的实例。用法：

    `引用名 instanceof 类名（接口名）`，返回一个 boolean 值。
16. `People people = new Man();`
17. `System.out.println(people instanceof People);// 结果为true`

    因为 Man 是 People 的子类，因此 Man 可以看做是 People 的实例。

> 文章更新历史
>
> 2022-10-10 feat:初稿。

‍