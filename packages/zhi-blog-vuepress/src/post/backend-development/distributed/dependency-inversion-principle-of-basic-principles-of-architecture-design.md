---
title: 架构设计基本原则之依赖倒置原则（DIP）
short_title: ''
description: 原始定义：高层模块不要依赖低层模块，两种都应该依赖抽象。抽象不应该依赖细节，细节应该依赖抽象。
date: 2022-05-04 17:51:25
category:
  - 后端开发
  - 分布式
tag:
  - arch
  - desgin
  - dip
article: true
timeline: false
---
## 依赖倒置原则（DIP）

> `DIP`, `Dependence Inversion Principle` , 依赖倒置原则

### 依赖倒置原则的定义

原始定义：高层模块不要依赖低层模块，两种都应该依赖抽象。抽象不应该依赖细节，细节应该依赖抽象。

核心思想是：**要面向接口编程，不要面向实现编程**。

### 依赖倒置原则的作用

1. 降低类之间的耦合性
2. 提高系统的稳定性
3. 减少并行开发引起的风险
4. 提高代码的可读性和可维护性

### 依赖倒置原则的实现方法

顾客购物程序实例：

- 反应“顾客类”与“商店类”的关系。商店类有 `sell` 方法，顾客通过该方法进行购物。

  深圳店的购物可以这么写：

  ```java
  /**
   * 顾客
   *
   * @name: Customer
   * @author: terwer
   * @date: 2022-04-15 22:42
   **/
  public class Customer {
      public void shoping(ShenzhenShop shop) {
          System.out.println(shop.sell());
      }
  }
  ```

- 上面设计存在缺陷，加入新加入广州门店，上面的代码就不能复用了。需要修改代码：

  ```java
  /**
   * 顾客
   *
   * @name: Customer
   * @author: terwer
   * @date: 2022-04-15 22:42
   **/
  public class Customer {
      public void shoping(GuangzhouShop shop) {
          System.out.println(shop.sell());
      }
  }
  ```

- 顾客每换一次门店，就要修改一次代码，违背了开闭原则。

  存在问题的原因：顾客类设计的时候同商店类绑定了，违背了依赖倒置原则。

  ```java
  public class Customer {
      public void shoping(Shop shop) {
          System.out.println(shop.sell());
      }
  }
  ```

  ![image-20220416011909346](https://img1.terwer.space/image-20220416011909346.png)