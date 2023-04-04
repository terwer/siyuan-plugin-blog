---
title: LinkedList源代码深入剖析
short_title: ''
description: 集合框架中的接口除了类集接口之外类集也是用comparatoriterator和listiterator接口。简单地说comparator接口定义了两个对象如何比较_iterator和listiterator接口枚举类集中的对象。为了在他们的使用中提供最大的灵活性类集接口允许对一些方法进行选择。可选择的方法使得使用者可以更改类集中的内容。支持这些方法额类集被称为可修改的（modifiable）。不允许修改其内容的类集被称为不可修改的（unmodifiable）。如果对一个不可修改发类集使用这些方法将引发一
date: 2022-10-23 20:05:20
category:
  - 后端开发
  - JavaSE
tag:
  - 方法
  - 元素
  - 调用
  - 集合
  - java
  - linkedlist
  - collection
article: true
timeline: false
---
## 集合框架中的接口

* 除了类集接口之外，类集也是用 Comparator ， Iterator 和 ListIterator 接口。
* 简单地说， Comparator 接口定义了两个对象如何比较；Iterator 和 ListIterator 接口枚举类集中的对象。
* 为了在他们的使用中提供最大的灵活性，类集接口允许对一些方法进行选择。可选择的方法使得使用者可以更改类集中的内容。支持这些方法额类集被称为可修改的（modifiable）。不允许修改其内容的类集被称为不可修改的（unmodifiable）。如果对一个不可修改发类集使用这些方法，将引发一个 UnsupportedOperationException 异常。 **所有内置的类集都是可修改的** 。
* 调用 `add()`​​​ 方法可以将对象加入类集，注意 add() 带一个 Object 类的参数。因为 Object 是所有类的超类，所以任何类型的对象都可以被存储在一个类集中。然而原始类型 **不行** 。例如，一个类集不能直接存储类型 int ，char ， double 等的值。如果想存储这些对象，也可以使用原始类型包装器。

  可以调用 `addAll()`​​​ 方法将一个类集的全部内容增加到另一个类集中。
* 可以通过调用 `remove()`​​​ 方法将一个对象删除。为了删除一组对象，可以调用 `removeAll()`​​​ 方法。调用 `retainAll()`​​​ 方法可以将除了一组指定的元素之外的所有元素删除。为了清空类集，可以调用 `clear()`​​​ 方法。
* 通过调用 `contains()`​​​ 方法可以确定一个类集中是否包含了一个指定的对象。
* 为了确定一个类集是否包含了另一个类集的全部元素，可以调用 `contsinsAll()`​​ 方法。
* 当一个类集是空的时候，可以通过调用 `isEmpty()`​​ 方法来予以确定。
* 调用 `size()`​​ 方法可以获得类集中当前元素的个数。
* ​`toArray()`​ 方法返回一个数组，这个数组包含了存储在调用类集中的元素。通过再类集合数组之间提供一条路径，可以充分利用这两者的优点。
* 一个更加重要的方法是 `iterator()`​ ，该方法对类集返回一个迭代程序。当使用一个类集框架时，迭代程序对于成功的编程来说是至关重要的。
* ​`Collection`​ ：集合层次中的根接口，JDK 没有提供这个接口的直接实现类。
* ​`Set`​ ：不能包含重复的元素。`SortedSet`​ 是一个按照升序排列元素的 `Set`​ 。
* ​`List`​ ：是一个有序的集合，可以包含重复的元素。提供了按照索引访问的方式。
* ​`Map`​ ：包含了 key-value 对。Map 不能包含重复的 key 。`SortedMap`​ 是一个按照升序排列 key 的 `Map`​ 。

## 集合框架中的实现类

![](https://img1.terwer.space/api/public/20221023211650.png)​

## List 接口

* ​`List`​​​ 接口扩展了 `Colection`​​​ 并声明存储一系列元素的类集的特性。使用一个基于零的下表，元素可以通过他们在列表中的位置被插入和访问。一个列表可以包含重复元素。
* 除了由 `Collection`​​​ 定义的方法之外，List 还定义了一些它自己的方法。再次注意当类集不能被修改时，其中分几种方法引发 UnsupportedOperationException 异常。当一个对象与另一个不兼容，例如当企图将一个不兼容的对象加入一个类集当中时，将产生 ClassCastException 异常。
* 对于由 `Collection`​​​ 定义的 `add()`​​​ 和 `addAll()`​​​ 方法，List 增加了方法 `add(int, Object)`​​​ 和 `addAll(int, Collection)`​​​。这些方法在指定的下标处插入元素。由 `Collection`​​​ 定义的 `add()`​​​ 和 `addAll()`​​​ 方法的语义也被 List 改变了，以便他们 **在列表的尾部增加元素** 。
* 为了获得在指定位置存储的对象，可以用对象的下标调用 `get()`​ 方法，为了给元素赋值，可以调用 `set()`​ 方法，指定被改变对象的下表。调用 `indexOf()`​ 和 `lastIndexOf()`​ 可以得到一个对象的下标。
* 通过调用 `subList()`​ 方法，可以获得列表的一个指定了开始下标和结束下标的子列表。`subList()`​ 方法使得列表处理十分方便。

## Set 接口

* 集合接口定义了一个集合。它扩展了 `Collection`​ 并说明了不允许重复元素的类集的特性。因此，如果试图将重复元素加到集合中时，add() 方法将返回 false 。它本身并没有定义任何的附加方法。

## SortedSet 接口

* ​`SortedSet`​ 接口扩展了 `Set`​ 并说明了按照升序排列的集合的特性。当没有项包含在集合中时，其中的几种方法引发 NoSuchElementException 异常。当对象与调用集合中的元素不兼容时，引发 ClassCastException 异常。如果试图使用 null 对象，二集合不允许 null 时，引发 NullPointerException 异常。
* ​`SortedSet`​ 定义了几种方法，使得对集合的处理更加方便。调用 `first()`​ 方法，可以获得集合中的第一个对象。调用 `last()`​ 方法，可以获得集合中的最后一个元素。调用 `subset()`​ 方法，可以获得排序集合的一个指定了第一个和最后一个对象子集合。如果需要得到从集合的第一个元素开始的一个子集合。可以使用 `headSet()`​ 方法。如果需要获得集合尾部的一个子集合，可以使用 `tailSet()`​ 方法。

## Collection 类

* 类集接口的标准类一些提供了完整的可使用的工具，另一些是抽象的，提供主框架工具，最为创建具体类集的起始点。

## ArrayList

* ​`ArrayList`​​​ ：我们可以将其看做是能够自动增长容量的数组。
* 利用 `ArrayList`​​​ 的 `toArray()`​​​ 返回一个数组。
* ​`Arrays.asList()`​​​ 返回一个列表。
* 迭代器（Iterator）给我们提供了一种通用的方式来访问集合中的元素。
* ​`ArrayList`​ 继承自 `AbstractList`​ 并实现了 `List`​ 接口。

  ​`ArrayList`​ 支持可随需要增长的动态数组。在 Java 中，标准数组是定长的。在数组被创建后，它们不能被加长或者缩短，这意味着必须事先知道需要定义多大的数组。为了解决这个问题，类集框架定义了 `ArrayList`​ 。 **本质上，ArrayList 是对象引用的一个变长数组** 。也就是说，`ArrayList`​ 可以动态地增加或者减小其大小。`ArrayList`​ 以一个原始大小被创建，当超过了它的大小，类集自动增大。当对象被删除后，数组可以缩小。
* ​`ArrayList`​ 有如下的构造函数

  * ​`ArrayList()`​
  * `ArrayList(Collection c)`​
  * `ArrayList(int capacity`​
  * 第一个构造函数建立一个空的数组列表。
  * 第二个构造函数建立一个数组列表，该数组列表由类集 `c`​ 中的元素初始化。
  * 第三个构造函数建立一个数组列表，该数组有指定的初始容量（capacity）。容量是用于存储元素的基本数组的大小。当元素被追加到数组列表上时，容量会自动增加。

* 尽管当对象被存储在 `ArrayList()`​​ 对象中时，其容量会自动增加。仍然可以通过 `ensureCapacity()`​​ 方法来人工地增加 `ArrayList`​​ 的容量。

  如果事先知道将在当前能够容纳的类集中存储许多项时，可能会这么做。

  在开始时，一次性增加它的容量，可以避免后面的再分配。因为再分配比较花时间，避免不必要的处理可以改善性能。
* ​`ensureCapacity()`​ 方法如下

  * ​`void ensureCapacity(int cap)`​ ，这里，cap 是新的容量

* 相反的，如果想要减小在 `ArrayList`​ 对象之下的数组的大小，以便它有真正正好容纳当前项的大小，可以调用 `trimToSize()`​ 方法。该方法如下：

  ​`void trimToSize()`​

## LinkedList

* ​`LinkedList`​ 类继承自 `AbstractSequentialList`​ 并实现了 `List`​ 接口。他提供了一个 链表 数据结构。

  它具有两个狗在函数，说明如下：

  * `LinkedList()`​
  * `LinkedList(Collection c)`​
  * 第一个构造函数建立一个空的链表
  * 第二个构造函数建立一个链表，该链表由类集 c 中的元素初始化。

* 除了它继承的方法之外，`LinkedList`​ 类本身还定义了一些有用的方法，这些方法主要用于操作和访问列表。

  使用 `addFirst()`​ 方法可以在列表头增加元素；使用 `addLast()`​ 可以在列表的尾部增加元素。

  它们的形式如下：

  * `void addFirst(Object obj)`​
  * `void addLast(Object obj)`​
  * 这里，obj 是被增加的项

* 调用 `getFirst()`​ 方法可以获得第一个元素。调用 `getLast()`​ 可以获得最后一个元素。

  它们的形式如下：

  * `Object getFirst()`​
  * `Object getLast()`​

* 为了删除第一个元素，可以使用 `removeFirst()`​​ 方法；为了删除最后一个元素，可以调用 `removeLast()`​​ 方法。

  他们的形式如下：

  * ​`Object removeFirst()`​​​
  * ​`Object removeLast()`​​​
  * 示例 1

    ```java
    import java.util.LinkedList;

    public class LinkedListTest1 {

    	public static void main(String[] args) {
    		LinkedList list = new LinkedList();

    		list.add("F");
    		list.add("B");
    		list.add("D");
    		list.add("E");
    		list.add("C");

    		list.addLast("Z");
    		list.addFirst("A");

    		list.add(1, "A2");

    		System.out.println("最初的集合：" + list);

    		list.remove("F");
    		list.remove(2);

    		System.out.println("变化之后的集合：" + list);

    		Object value = list.get(2);
    		list.set(2, (String)value + "changed");

    		System.out.println("最后的集合：" + list);

    	}
    }
    ```

    因为 `LinkedList`​​ 实现 `List`​​ 接口，调用 `add(Object)`​​ 将项目追加到列表的尾部，如同 `addLast()`​​ 方法所做的那样。

    使用 `add()`​​ 方法的 `add(int, Object)`​​ 形式，插入项目到指定的位置，例如上面例子的 `add(1, "A2")`​​

    注意如何通过调用 `get()`​​ 和 `set()`​​ 方法而使得 `LinkedList`​​ 中的第三个元素发生了改变。为了获得一个元素的当前值，通过 `get()`​​ 方法传递存储元素的下标值。为了对这个下标位置赋一个新值，通过 `set()`​​ 传递对应的下标和新值。
  * 运行结果

    ```plaintext
    最初的集合：[A, A2, F, B, D, E, C, Z]
    变化之后的集合：[A, A2, D, E, C, Z]
    最后的集合：[A, A2, Dchanged, E, C, Z]
    ```

* ​`LinkedList `​​ ​是采用双向循环列表实现的。
* 利用 LinkedList 实现栈(stack)、队列 (queue)、双向队列(double-ended queue )。