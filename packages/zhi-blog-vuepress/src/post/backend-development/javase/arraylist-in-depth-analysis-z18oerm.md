---
title: ArrayList深入分析
short_title: ''
description: 基本方法使用由tostring()​方法提供的默认的转换显示类集的内容tostring()​方法是从abstractcollection()​继承下来的。对于例子来说足够但是通常情况下会重写此方法。publicclassarraylisttest{publicstaticvoidmain(string[]args){arraylistarraylist=newarraylist()_arraylistadd(arraylistadd(arraylistadd(arraylistadd(​strings=(
date: 2022-10-21 22:28:48
category:
  - 后端开发
  - JavaSE
tag:
  - 结果
  - 包装
  - 操作
  - 转换
  - 基本
  - arraylist
  - deep
  - analysis
article: true
timeline: false
---
## 基本方法

使用由 `toString()`​ 方法提供的默认的转换显示类集的内容，`toString()`​ 方法是从 `AbstractCollection()`​ 继承下来的。对于例子来说足够，但是通常情况下会重写此方法。

```java
 public class ArrayListTest1 {
   public static void main(String[] args) {
     ArrayList arrayList = new ArrayList();
     arrayList.add("hello");
     arrayList.add("world");
     arrayList.add("world");
     arrayList.add("welcome");
 ​
     String s1 = (String) arrayList.get(0);
     String s2 = (String) arrayList.get(1);
     String s3 = (String) arrayList.get(2);
     String s4 = (String) arrayList.get(3);
 ​
     System.out.println(s1);
     System.out.println(s2);
     System.out.println(s3);
     System.out.println(s4);
 ​
     System.out.println("-------------");
     for (int i = 0; i < arrayList.size(); i++) {
       System.out.println(arrayList.get(i));
     }
 ​
     // arrayList.clear();
     // System.out.println(arrayList.size());
     // System.out.println(arrayList.isEmpty());
 ​
     arrayList.remove(0);
 ​
     System.out.println("-------------");
     for (int i = 0; i < arrayList.size(); i++) {
       System.out.println(arrayList.get(i));
     }
 ​
     arrayList.remove("welcome");
     System.out.println("-------------");
     for (int i = 0; i < arrayList.size(); i++) {
       System.out.println(arrayList.get(i));
     }
 ​
     System.out.println("-----------------");
 ​
     arrayList.add("aaa");
     arrayList.add("bbb");
 ​
     System.out.println(arrayList.indexOf("world"));
     System.out.println(arrayList.lastIndexOf("world"));
     System.out.println(arrayList.indexOf("aaa"));
   }
 }
```

**结果**

```java
 hello
 world
 world
 welcome
 -------------
 hello
 world
 world
 welcome
 -------------
 world
 world
 welcome
 -------------
 world
 world
 -----------------
 0
 1
 2
```

## 包装类与原生数据类型测试

```java
 public class ArrayListTest2 {
   public static void main(String[] args) {
     ArrayList list = new ArrayList();
     list.add("hello");
     list.add(new Integer(2));
   
     String str = (String)list.get(0);
     Integer in = (Integer)list.get(1);
     // String str2 = (String)list.get(1);
   
     System.out.println(str);
     System.out.println(in.intValue());
     // System.err.println(str2);
   }
 ​
 }
```

**结果**

```plaintext
 hello
 2
```

## 包装类型的遍历与操作

```java
 public class ArrayListTest3 {
 ​
   public static void main(String[] args) {
     ArrayList list = new ArrayList();
 ​
     list.add(new Integer(3));
     list.add(new Integer(4));
     list.add(new Integer(5));
     list.add(new Integer(6));
 ​
     int sum = 0;
     for (int i = 0; i < list.size(); i++) {
       Integer item = (Integer) list.get(i);
       sum += item.intValue();
     }
 ​
     System.out.println(sum);
   }
 }
```

**结果**

```plaintext
 18
```

## 从数组列表（ArrayList）获得数组（Array）

* 当使用 ArrayList 时，有事想要获得一个实际的数组，这个数组包含了列表的内容。可以通过调用 `toArray()`​ 来实现它。

  下面是几个为什么可能想讲类集转换成为数组的原因：

  * 对于特定的操作，可以获得更快的处理时间
  * 为了给方法传递数组，而方法不必重载去接收类集
  * 为了将新的基于类集的程序与不认识类集的老程序集成

* `Arrays.asList()`​

  返回一个受指定数组支持的固定大小的列表。（对返回列表的更改会 “直写” 到数组）。此方法同 `Collection.toArray()`​ 一起，充当了基于数组的 API 与基于 Collection 额 API 之间的桥梁

```java
 public class ArrayListTest4 {
 ​
   public static void main(String[] args) {
     ArrayList list = new ArrayList();
 ​
     list.add(new Integer(1));
     list.add(new Integer(2));
     list.add(new Integer(3));
     list.add(new Integer(4));
     list.add(new Integer(5));
     list.add(new Integer(6));
 ​
     /**
      * 不能将Object[]转换为Integer[]
      */
 ​
     // 这个地方会报错，类型转换异常
     // Integer[] in = (Integer[]) list.toArray();
     // for (int i = 0; i < in.length; i++) {
     // Integer integer = in[i];
     // System.out.println(integer.intValue());
     // }
 ​
     Object[] in = list.toArray();
     for (int i = 0; i < in.length; i++) {
       Integer integer = (Integer) in[i];
       System.out.println(integer.intValue());
     }
   }
 ​
 }
```

**结果**

```plaintext
 1
 2
 3
 4
 5
 6
```

## ArrayList 操作自定义对象

```java
 public class ArrayListTest5 {
 ​
   public static void main(String[] args) {
     ArrayList list = new ArrayList();
     list.add(new Point(2, 3));
     list.add(new Point(2, 2));
     list.add(list);
     list.add(new Point(4, 4));
 ​
 ​
     // for (int i = 0; i < list.size(); i++) {
     //  System.out.println((Point) list.get(i));
     // }
   
     System.out.println(list.toString());
   }
 ​
 }
 ​
 class Point {
   int x;
   int y;
 ​
   public Point(int x, int y) {
     this.x = x;
     this.y = y;
   }
 ​
   public String toString() {
     return "x=" + this.x + ",y=" + this.y;
   }
 ​
 }
```

**结果**

```plaintext
 [x=2,y=3, x=2,y=2, (this Collection), x=4,y=4]
```

## 需要注意的几点

1. **集合中存放的依然是对象的引用而不是对象本身。**
2. **ArrayList 底层使用数组实现，在 JDK1.6，当使用不带参数的构造方法生成 ArrayList 对象时，实际上会在底层生成一个长度为 10 的 Object 类型数组。**

   ```java
    /**
    * Constructs an empty list with an initial capacity of ten.
    */
    public ArrayList() {
        this(10);
    }
   ```

   **注意：从 Java7 开始，已经不是在构造方法初始化为 10，而是在 add 方法检测，然后调用 grow 方法初始化为 10。Java7-Java17 都改变了这个策略。**

   **Java17 沿用了这一策略。不是在初始化里面初始化的 10，而是在 add 的时候检测到不够才初始化的 10。Java17 源码分析如下：**

   ```java
    private static final int DEFAULT_CAPACITY = 10;
    private static final Object[] DEFAULTCAPACITY_EMPTY_ELEMENTDATA = {};
    ​
    public ArrayList() {
        this.elementData = DEFAULTCAPACITY_EMPTY_ELEMENTDATA;
    }
    ​
    public boolean add(E e) {
        modCount++;
        add(e, elementData, size);
        return true;
    }
    ​
    private void add(E e, Object[] elementData, int s) {
        if (s == elementData.length)
            elementData = grow();
        elementData[s] = e;
        size = s + 1;
    }
    ​
    private Object[] grow() {
        return grow(size + 1);
    }
    ​
    private Object[] grow(int minCapacity) {
        int oldCapacity = elementData.length;
        if (oldCapacity > 0 || elementData != DEFAULTCAPACITY_EMPTY_ELEMENTDATA) {
            int newCapacity = ArraysSupport.newLength(oldCapacity,
              minCapacity - oldCapacity, /* minimum growth */
                oldCapacity >> 1           /* preferred growth */);
      return elementData = Arrays.copyOf(elementData, newCapacity);
        } else {
            return elementData = new Object[Math.max(DEFAULT_CAPACITY, minCapacity)];
        }
    }
   ```
3. ​`add`​​ 方法剖析
   **在 JDK1.6 中，如果增加的元素个数超过了 10 个，那么 ArrayList 底层会生成一个数组，长度为原来数组的 ****1.5倍+1** ，然后将原数组的内容复制到新数据当中，并且后续增加的内容会方法哦新数组当中。JDK7 以后该规则有所变化，长度是原来数组的 **1.5倍** 。当新数组无法容纳增加的元素时，重复该过程。

   ```java
    public boolean add(E e) {
        ensureCapacity(size + 1);  // Increments modCount!!
        elementData[size++] = e;
        return true;
    }
   ```

   **不够扩展 1.5 倍**

   ```java
    public void ensureCapacity(int minCapacity) {
      modCount++;
      int oldCapacity = elementData.length;
      if (minCapacity > oldCapacity) {
          Object oldData[] = elementData;
          int newCapacity = (oldCapacity * 3)/2 + 1;
            if (newCapacity < minCapacity)
        newCapacity = minCapacity;
              // minCapacity is usually close to size, so this is a win:
              elementData = Arrays.copyOf(elementData, newCapacity);
      }
    }
   ```

   ![](https://img1.terwer.space/api/public/20221022183622.png)​

   **注意：Java7 以后增长的方式更加优雅，是用 位运算 计算的，效率更高。**

   [https://stackoverflow.com/a/52355461/4037224](https://stackoverflow.com/a/52355461/4037224)

   **例如，Java17 的实现如下：**

   ```java
    private Object[] grow(int minCapacity) {
      int oldCapacity = elementData.length;
      if (oldCapacity > 0 || elementData != DEFAULTCAPACITY_EMPTY_ELEMENTDATA) {
        int newCapacity = ArraysSupport.newLength(oldCapacity,
            minCapacity - oldCapacity, /* minimum growth */
            oldCapacity >> 1           /* preferred growth */);
        return elementData = Arrays.copyOf(elementData, newCapacity);
      } else {
        return elementData = new Object[Math.max(DEFAULT_CAPACITY, minCapacity)];
      }
    }
   ```

   **在线版代码查看：**​[https://github.dev/openjdk/jdk/blob/jdk-17+35/src/java.base/share/classes/java/util/ArrayList.java#L234](https://github.dev/openjdk/jdk/blob/jdk-17+35/src/java.base/share/classes/java/util/ArrayList.java#L234)

   ![](https://img1.terwer.space/api/public/20221022180435.png)​
4. **对于 ArrayList 元素的删除操作，需要将被删除元素的后续元素向前移动，代价较高。**
5. **集合当中只能防止对象的引用，无法放置原生数据类型，在 JDK1.5 以前，我们需要使用原生数据类型的包装类才能加入到集合当中。**
6. **集合当中放置的都是  Object 类型， 因此取出来的也是 Object 类型，因此必须要使用强制类型转换将其转换为真正的类型（放置进去的类型）。**

## 生成 javadoc

**eclipse 点击 project-&gt;Generate javadoc**

![](https://img1.terwer.space/api/public/20221022110958.png)​

**解决Eclipse生成的注释文档中文乱码问题**

**给 javadoc.exe 加上编码参数就 OK。**

**具体的：**

**在 Eclipse 里 export 选 JavaDoc，在向导的最后一页的 **`Extra JavaDoc Options`​​ 里填上参数即可。

**比如项目采用的是 UTF－8 的编码就填：**​`-encoding UTF-8 -charset UTF-8`​​

![](https://img1.terwer.space/api/public/20221022111624.png)​

**效果**

![](https://img1.terwer.space/api/public/20221022111856.png)​