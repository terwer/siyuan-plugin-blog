---
title: 架构设计基本原则之里式替换原则（LSP）
short_title: ''
description: 里式替换阐述了继承的原则，可描述为：子类可以扩展父类的功能，但是不能改变父类原有的功能。
date: 2022-05-04 17:51:20
category:
  - 后端开发
  - 分布式
tag:
  - arch
  - desgin
  - lsp
article: true
timeline: false
---
## 里式替换原则（LSP）

> `LSP` , `Liskov Substitution Principle` , 里氏替换原则

### 里氏替换原则的定义

里式替换阐述了继承的原则，可描述为：子类可以扩展父类的功能，但是不能改变父类原有的功能。

[https://zhuanlan.zhihu.com/p/268574641](https://zhuanlan.zhihu.com/p/268574641)

### 里式替换的作用

1. 里式替换是实现开闭原则的重要方式之一。
2. 克服了继承中重写父类造成的可复用性变差的特点。
3. 他是总动作正确性的保证。类的扩展不会给系统带来新的错误，降低了代码出错的可能性。
4. 加强程序的健壮性。提高了兼容性、可维护性和可获展性，降低了需求变更带来的风险。

### 里氏替换原则的实现方法

里式替换的定义总结：

1. 子类可以实现父类的抽象方法，但是不能覆盖父类的非抽象方法

   ![image-20220415183112900](https://img1.terwer.space/image-20220415183112900.png)

   ```java
   /**
    * @name: C
    * @author: terwer
    * @date: 2022-04-15 18:27
    **/
   public class C {
       public int func(int p1, int p2) {
           return p1 + p2;
       }
   }
   
   /**
    * @name: C1
    * @author: terwer
    * @date: 2022-04-15 18:28
    **/
   public class C1 extends C {
       @Override
       public int func(int p1, int p2) {
           return p2 - p1;
       }
   }
   
   /**
    * @name: Client
    * @author: terwer
    * @date: 2022-04-15 18:28
    **/
   public class Client {
       public static void main(String[] args) {
           C c = new C1();
           int result = c.func(1, 2);
           System.out.println("1+2=" + result);
       }
   }
   
   ```

   运行结果：1+2=1

   ![image-20220415183403799](https://img1.terwer.space/image-20220415183403799.png)

2. 子类可以增加自己特有的方法

   ![image-20220415183752542](https://img1.terwer.space/image-20220415183752542.png)

   ```java
   /**
    * @name: C2
    * @author: terwer
    * @date: 2022-04-15 18:35
    **/
   public class C2 extends C {
       public int func2(int p1, int p2) {
           return p2 - p1;
       }
   }
   
   /**
    * @name: Client
    * @author: terwer
    * @date: 2022-04-15 18:28
    **/
   public class Client {
       public static void main(String[] args) {
           C2 c2 = new C2();
           int result1 = c2.func(1, 2);
           System.out.println("1+2=" + result1);
           int result2 = c2.func2(1, 2);
           System.out.println("2-1=" + result2);
       }
   }
   ```

   运行结果：

   1+2=3
   2-1=1

   ![image-20220415183912878](https://img1.terwer.space/image-20220415183912878.png)