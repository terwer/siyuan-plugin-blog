---
title: 架构设计基本原则知识扩展
short_title: ''
description: SOLID（单一功能、开闭原则、里氏替换、接口隔离以及依赖反转）是由罗伯特·C·马丁在21世纪早期 引入的记忆术首字母缩略字，指代了面向对象编程和面向对象设计的五个基本原则。
  当这些原则被一起应用时，它们使得一个程序员开发一个容易进行软件维护和扩展的系统变得更加可能。
date: 2022-05-04 17:51:30
category:
  - 后端开发
  - 分布式
tag:
  - arch
  - desgin
  - lod
  - crp
  - composite
  - reuse
article: true
timeline: false
---
# 架构设计基本原则知识扩展

## SOLID原则

前五种统一称为SOLID原则

SOLID（单一功能、开闭原则、里氏替换、接口隔离以及依赖反转）是由罗伯特·C·马丁在21世纪早期 引入的记忆术首字母缩略字，指代了面向对象编程和面向对象设计的五个基本原则。 当这些原则被一起应用时，它们使得一个程序员开发一个容易进行软件维护和扩展的系统变得更加可能。

[https://en.wikipedia.org/wiki/SOLID](https://en.wikipedia.org/wiki/SOLID)

## 迪米特原则（LOD）

> `LOD`, `Law of Demeter`, 迪米特原则 or `LKP`, `Least Knowledge Principle`, 最少知识原则

参考 

[https://www.cnblogs.com/gaochundong/p/least_knowledge_principle.html](https://www.cnblogs.com/gaochundong/p/least_knowledge_principle.html)

### 迪米特法则的定义

软件实体之间无需直接通信，那么就不应该发生直接相互调用，可以通过第三方转发该调用。其目的是降低耦合性，提高模块的独立性。

### 迪米特法则的优点

限制软件实体间通信的宽度和深度，优点如下：

1. 降低了软件之间的耦合，提高了模块的独立性
2. 提高了类可复用性和系统额可扩展性

### 迪米特法则的实现方法

迪米特法则强调两点：

1. 从依赖的角度来说，只依赖该依赖的对象。
2. 从被依赖这来说，只暴露该暴露的方法。

明星和经纪人案例实例

![image-20220416013406846](https://img1.terwer.space/image-20220416013406846.png)

```java
/**
 * 经纪人
 *
 * @name: Agent
 * @author: terwer
 * @date: 2022-04-16 01:37
 **/
public class Agent {
    private Star myStar;
    private Fans myFans;
    private Company myCompany;

    public void setStar(Star myStar) {
        this.myStar = myStar;
    }

    public void setFans(Fans myFans) {
        this.myFans = myFans;
    }

    public void setCompany(Company myCompany) {
        this.myCompany = myCompany;
    }

    public void meeting() {
        System.out.println(myFans.getName() + "与明星" + myStar.getName() + "见面了。");
    }

    public void business() {
        System.out.println(myCompany.getName() + "与明星" + myStar.getName() + "洽淡业务。");
    }
}

/**
 * 公司
 *
 * @name: Company
 * @author: terwer
 * @date: 2022-04-16 02:08
 **/
public class Company {
    private String name;

    Company(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}

/**
 * 粉丝
 *
 * @name: Fans
 * @author: terwer
 * @date: 2022-04-16 02:07
 **/
public class Fans {
    private String name;

    Fans(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}

/**
 * 明星
 *
 * @name: Star
 * @author: terwer
 * @date: 2022-04-16 02:06
 **/
//明星
public class Star {
    private String name;

    Star(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}

public class Main {
    public static void main(String[] args) {
        Agent agent = new Agent();
        agent.setStar(new Star("小马"));
        agent.setFans(new Fans("粉丝小李"));
        agent.setCompany(new Company("中国传媒有限公司"));
        agent.meeting();
        agent.business();
    }
}
```

## 合成复用原则

### 合成复用原则的定义

合成复用原则（Composite Reuse Principle，CRP）,又叫组合/聚合复用原则（Composite/Aggregate Reuse Principle,CARP）。

要求软件复用时候，尽量先用组合和聚合关系，其次才考虑使用继承关系来实现。

如果使用继承，必须严格遵守里氏替换原则。

合成复用原则和里氏替换原则是相辅相成的，两者都是开闭原则的具体实现规范。

### 合成复用原则的重要性

类的复用分为继承复用和合成复用两种，继承复用简单易实现，但是有缺点：

1. 继承复用破坏了类的封装性。
2. 子类与父类耦合度高。
3. 限制了复用的灵活性。

采用合成复用原则，可以将已有对象纳入到新对象中，成为新对象的一部分，新对象调用已有对象功能，有以下优点：

1. 维持了类的封装性。
2. 新旧类的耦合度低。
3. 复用灵活性高

### 复用合成原则的实现

以汽车管理程序为例：

需求：汽车按照动力源分为汽油汽车、电动汽车。按颜色划分为白色汽车、黑色汽车等。它们可能产生以下组合：

![image-20220416095553638](https://img1.terwer.space/image-20220416095553638.png)

可以看到，采用继承会产生很多的子类，并且新增动力源和颜色都要修改代码违背了开闭原则。

采用组合模式可以很好的解决：

![image-20220416095947434](https://img1.terwer.space/image-20220416095947434.png)

Aaa