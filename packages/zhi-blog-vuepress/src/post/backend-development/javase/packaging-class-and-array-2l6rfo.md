---
title: 包装类与数组
short_title: ''
description: 包装类（wrapperclass）。针对原生数据类型的包装。包装类（个）都位于javalang​包下。java中的个包装类分别是_byteshortintegerlongfloatdoublecharacterboolean。他们的使用方式都是一样的可以实现原生数据类型和包装类额双向转换。数组（array）_相同类型数据的集合叫做数组。如何定义数组_type[]变量名=newtype[数组中元素的个数]_按照下列方式定义长度为的数组_int[]a=newint[]_或者inta[]=newint[]_数组
date: 2022-10-17 22:29:22
category:
  - 后端开发
  - JavaSE
tag:
  - 数组
  - 包装
  - 二维
  - 使用
  - 定义
  - 类
  - class
  - array
article: true
timeline: false
---
1. 包装类（Wrapper Class）。

   针对原生数据类型的包装。 包装类（8 个）都位于 `java.lang`​ 包下。

   java 中的 8 个包装类分别是：Byte，Short，Integer，Long，Float，Double，Character，Boolean。

   他们的使用方式都是一样的，可以实现原生数据类型和包装类额双向转换。

2. 数组（Array）：**相同类型** 数据的集合叫做数组。
3. 如何定义数组：

   ```java
   type[] 变量名 = new type[数组中元素的个数 ]; 
   ```

   按照下列方式定义长度为 10 的数组：

   ```java
   int[] a = new int[10]; // 或者
   int a[] = new int[10];
   ```

4. 数组中的元素索引是从 0 开始的。对于数组来说，最大的索引 == 数组的长度 - 1 。
5. 定义数组的第三种方式：

   ```java
   type[] 变量名 = new type[]{逗号分隔的初始化值列表}
   ```

6. Java 中的每个数组都有一个 length 属性，他表示数组的长度。

   length 属性是 public，final，int 的。数组长度一旦确定，就不能改变大小。

<iframe width="800" height="500" frameborder="0" src="https://pythontutor.com/iframe-embed.html#code=public%20class%20YourClassNameHere%20%7B%0A%20%20%20%20public%20static%20void%20main%28String%5B%5D%20args%29%20%7B%0A%20%20%20%20%20%20%20%20int%5B%5D%20a%20%3D%20new%20int%5B4%5D%3B%0A%20%20%20%20%20%20%20%20System.out.println%28a%5B0%5D%29%3B%0A%20%20%20%20%7D%0A%7D&amp;codeDivHeight=400&amp;codeDivWidth=350&amp;cumulative=false&amp;curInstr=4&amp;heapPrimitives=nevernest&amp;origin=opt-frontend.js&amp;py=java&amp;rawInputLstJSON=%5B%5D&amp;textReferences=false" data-src="https://pythontutor.com/iframe-embed.html#code=public%20class%20YourClassNameHere%20%7B%0A%20%20%20%20public%20static%20void%20main%28String%5B%5D%20args%29%20%7B%0A%20%20%20%20%20%20%20%20int%5B%5D%20a%20%3D%20new%20int%5B4%5D%3B%0A%20%20%20%20%20%20%20%20System.out.println%28a%5B0%5D%29%3B%0A%20%20%20%20%7D%0A%7D&amp;codeDivHeight=400&amp;codeDivWidth=350&amp;cumulative=false&amp;curInstr=4&amp;heapPrimitives=nevernest&amp;origin=opt-frontend.js&amp;py=java&amp;rawInputLstJSON=%5B%5D&amp;textReferences=false"></iframe>

7. 两个数组的比较不能使用 `==`​ ，也不能使用 `equals`​ ，要使用 `Arrays.equals`​ 。

   ```java
   int[] a = {1, 2, 3};
   int[] b = {1, 2, 3};
   System.out.println(a==b);
   System.out.println(a.equals(b));
   System.out.println(Arrays.equals(a, b));

   // false
   // false
   // true
   ```

8. ​`int a[] = new int[10]`​ ，其中 a 是一个引用。它指向了上次的数组对象的首地址，数组中每个元素都是 int 类型，其中仅放数据值本身。

    ![](https://img1.terwer.space/api/public/20221018001418.png)​

9. 下列代码的内存布局

    ```java
    Person[] p = new Person[3];

    p[0] = new Person(10);
    p[1] = new Person(20);
    p[2] = new Person(30);
    ```

    ![](https://img1.terwer.space/api/public/20221018005721.png)​

10. 二维数组。二维数组是一种平面的二维结构，本质上是数组的数组。

     例如下列数组，实际的存储

     ```java
     int[][] i = new int[2][3];

     System.out.println(i instanceof Object);
     System.out.println(i[0] instanceof Object);
     System.out.println(i[0] instanceof int[]);

     // true
     // true
     // true
     ```

     ![](https://img1.terwer.space/api/public/20221018011456.png)​
11. 二维数组中初始化为偶数

     ```java
     int idx = 0;
     for (int k = 0; k < 2; k++) {
         for (int j = 0; j < 3; j++) {
             i[k][j] = 2 * (idx + 1);
             idx++;
         }
     }

     for (int[] ints : i) {
         for (int anInt : ints) {
             System.out.println(anInt);
         }
     }
     ```

     如图：

     ![](https://img1.terwer.space/api/public/20221018013632.png)​

12. 二维数组的定义和初始化

     ```java
     /*
     int[][] a = new int[3][];
     a[0] = new int[2];
     a[1] = new int[3];
     a[2] = new int[1];
     */

     // int[][] a = new int[][3];

     int[][] a = new int[][]{{1, 2, 3}, {4, 5}};

     for (int[] ints : a) {
         for (int anInt : ints) {
             System.out.print(anInt + " ");
         }
         System.out.println();
     }

     // 1 2 3 
     // 4 5 
     ```

12. Arrays

     Arrays.equals
13. System.arrayCopy
14. 三维数组。type[][][] a = new type[2][3][4]