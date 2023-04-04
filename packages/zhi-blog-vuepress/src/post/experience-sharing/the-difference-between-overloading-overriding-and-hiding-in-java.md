---
title: Java的重载、覆盖和隐藏的区别
short_title: ''
date: 2022-05-01 20:57:53
category:
  - 实用技巧
  - 经验分享
tag:
  - java
  - javase
  - override
  - overload
  - hide
article: true
timeline: false
---
# Java的重载、覆盖和隐藏的区别

**重载**：方法名相同，但参数不同的多个同名函数。

发生在子类于父类之间，是指在子类与父类之间或在同一类中定义具有相同的方法名，访问权限等的方发。

区别在于返回类型或参数列表。

注意：

1. 参数不同的意思是参数类型、参数个数、参数顺序至少有一个不同

2. 返回值和异常以及访问修饰符，不能作为重载的条件(因为对于匿名调用，会出现歧义，eg:void a ()和int a() ，如果调用a()，出现歧义)

3. main方法也是可以被重载的



**覆盖**：子类重写父类的方法，要求方法名和参数类型完全一样(参数不能是子类)，返回值和异常比父类小或者相同(即为父类的子类)，访问修饰符比父类大或者相同。

两同两小一大


发生在子类与父类的之间，指在在子类中声明一个和父类具有相同的方法名，参数列表，返回值，访问权限等的方法，即在子类中重新编写方法实现的功能。

覆盖不同于静态方发的隐藏，父类中被隐藏的方法在子类中完全不可用，而父类中被覆盖的方法在子类中可以通过其他方式被引用。

注意：

1. 子类实例方法不能覆盖父类的静态方法；

2. 子类的静态方法也不能覆盖父类的实例方法(编译时报错)，总结为方法不能交叉覆盖



隐藏：父类和子类拥有相同名字的属性或者方法时，父类的同名的属性或者方法形式上不见了，实际是还是存在的。


隐藏现象发生在子类和父类之间，隐藏是针对父类中成员变量和静态方法而言。

当子类声明与父类中成员变量具有相同的变量名的变量时，则实现了对父类中成员变量的隐藏；

当子类声明了与父类中的静态成员方法具有相同的方法名，参数列表和相同的返回值时，则实现了对父类中静态方法的隐藏。

注意：

1. 当发生隐藏的时候，声明类型是什么类，就调用对应类的属性或者方法，而不会发生动态绑定
2.  方法隐藏只有一种形式，就是父类和子类存在相同的静态方法
3.  属性只能被隐藏，不能被覆盖
4. 子类实例变量/静态变量可以隐藏父类的实例/静态变量，总结为变量可以交叉隐藏



隐藏和覆盖的区别：

- 被隐藏的属性，在子类被强制转换成父类后，访问的是父类中的属性
- 被覆盖的方法，在子类被强制转换成父类后，调用的还是子类自身的方法
- 因为覆盖是动态绑定，是受RTTI(run time type identification，运行时类型检查)约束的，隐藏不受RTTI约束，总结为RTTI只针对覆盖，不针对隐藏



特殊情况：

1. final修饰的属性可以被隐藏，但是不能被赋值，即不能用=来赋值，网上说final属性不能被修改，这个说法不准确，因为对于引用类型的变量用final修饰后，它只是不能被指向其他对象，但是可以改它自身的值，可以用ArrayList测试，final属性可以在运行的时候进行初始化，但是不能不出现初始化语句

2. final修饰的方法不能被覆盖，可以被重载

3. final修饰的类不能被继承

4. private 方法隐式添加了final



案例：

SuperClass

```java
/**
 * @name: SuperClass
 * @author: terwer
 * @date: 2022-05-01 21:04
 **/
public class SuperClass {
    public static int i = 1;
    public int j = 2;
    public final int k = 3;

    public static void method1() {
        System.out.println("SuperClass Method1");
    }

    public void method2() {
        System.out.println("SuperClass Method2");
    }

    public final void method3() {
        System.out.println("SuperClass Method3");
    }
}
```

SubClass

```java
/**
 * @name: SubClass
 * @author: terwer
 * @date: 2022-05-01 21:04
 **/
public class SubClass extends SuperClass {
    // 无论是不是static，都能隐藏父类的变量i
    public static int i = 2;
    public static int j = 1;
    // 无论是不是final，都能隐藏父类的变量k
    public final int k = 4;

    public static void method1() {
        System.out.println("SubClass Method1");
    }

    public void method2() {
        System.out.println("SubClass Method2");
    }
}
```

Main

```java
/**
 * 主函数入口
 *
 * @author terwer
 * @version 1.0
 **/
public class Main {
    public static void main(String[] args) {

        SuperClass sc = new SubClass();
        System.out.println("i = " + sc.i);
        System.out.println("j = " + sc.j);
        System.out.println("k = " + sc.k);

        sc.method1();//静态方法只能被隐藏
        sc.method2();

        SubClass subc = new SubClass();
        System.out.println("i = " + subc.i);
        System.out.println("j = " + subc.j);
        System.out.println("k = " + subc.k);

        subc.method1();
        subc.method2();
    }
}
```

运行结果：

```
i = 1
j = 2
k = 3
SuperClass Method1
SubClass Method2
i = 2
j = 1
k = 4
SubClass Method1
SubClass Method2
```

![image-20220501211657825](https://img1.terwer.space/image-20220501211657825.png)

[override-hidden-demo](https://github.com/terwer/senior-java-engineer-road/tree/master/p7-skill/javase/ssyjavase/lesson23/override-hidden-demo/src/main/java/com/terwergreen)