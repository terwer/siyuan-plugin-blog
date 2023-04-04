---
title: 冒泡排序、交换排序与快速排序
short_title: ''
description: 冒泡排序思路_比如_结果_publicclassbubblesort{publicstaticvoidmain(string[]args){int[]a=newint[]{}_for(inti=_ii){systemoutprint(a[i]}systemoutprintln()_bubblesort(a)_systemoutprintln()_systemoutprintln(for(intj=_jj){systemoutprint(a[j]}}publicstaticvoidbubblesort(in
date: 2022-10-18 22:25:06
category:
  - 后端开发
  - JavaSE
tag:
  - 序列
  - 个数
  - 哨兵
  - 比较
  - 交换
  - 冒泡排序
  - 交换排序
  - 快速排序
  - bubble-sort
  - quick-sort
article: true
timeline: false
---
1. 冒泡排序

   思路：

   比如：3，5，6，2，4，7

   结果：2，3，4，5，6，7

   ```java
   public class BubbleSort {
       public static void main(String[] args) {
           int[] a = new int[]{3, 5, 6, 2, 4, 7};

           for (int i = 0; i < a.length; i++) {
               System.out.print(a[i] + " ");
           }
           System.out.println();

           bubbleSort(a);

           System.out.println();
           System.out.println("-------------------");

           for (int j = 0; j < a.length; j++) {
               System.out.print(a[j] + " ");
           }
       }

       public static void bubbleSort(int[] a) {
           for (int i = 0; i < a.length - 1; i++) {
               System.out.println("第" + (i) + "次比较");

               for (int j = 0; j < a.length - i - 1; j++) {
                   System.out.println("第" + (j) + "个数与第" + (j + 1) + "个数比较");
                   if (a[j] > a[j + 1]) {
                       int temp = a[j];
                       a[j] = a[j + 1];
                       a[j + 1] = temp;
                       System.out.println("交换大小");
                   }
               }

               for (int k = 0; k < a.length; k++) {
                   System.out.print(a[k] + " ");
               }
               System.out.println();
               System.out.println("====================");
           }
       }
   }
   ```
   结果

   ```plaintext
   3 5 6 2 4 7 
   第0次比较
   第0个数与第1个数比较
   第1个数与第2个数比较
   第2个数与第3个数比较
   交换大小
   第3个数与第4个数比较
   交换大小
   第4个数与第5个数比较
   3 5 2 4 6 7 
   ====================
   第1次比较
   第0个数与第1个数比较
   第1个数与第2个数比较
   交换大小
   第2个数与第3个数比较
   交换大小
   第3个数与第4个数比较
   3 2 4 5 6 7 
   ====================
   第2次比较
   第0个数与第1个数比较
   交换大小
   第1个数与第2个数比较
   第2个数与第3个数比较
   2 3 4 5 6 7 
   ====================
   第3次比较
   第0个数与第1个数比较
   第1个数与第2个数比较
   2 3 4 5 6 7 
   ====================
   第4次比较
   第0个数与第1个数比较
   2 3 4 5 6 7 
   ====================

   -------------------
   2 3 4 5 6 7 
   ```
   动画

   ​`https://visualgo.net/zh/sorting?slide=6-5`​​

   简记

   $i => 0 \to length - 1$

   $j => 0 \to length - i - 1$

   $=> swap({a_j},{a_{j + 1}})$
2. 交换排序

   所谓交换，是指根据序列中两个关键字比较的结果来对换这两个关键字在序列中的位置。交换排序本文介绍两种，冒泡排序（bubble sort）和快速排序。
3. 快速排序

   假设我们现在对“6 1 2 7 9 3 4 5 10 8”这个 10 个数进行排序。首先在这个序列中随便找一个数作为基准数。选取第一个数 6 作为基准数。在这个序列中,将所有比基准数大的数放在 6 的右边，比基准数小的数放在 6 的左边，类似下面这种排列：
   3 1 2 5 4 6 9 7 10 8
   在初始状态下，数字 6 在序列的第 1 位。我们的目标是将 6 挪到序列中间的某个位置，假设这个位置是 k。现在就需要寻找这个 k，并且以第 k 位为分界点，左边的数都小于等于 6，右边的数都大于等于 6。

   ## **快速排序**

   方法其实很简单：分别从初始序列“6 1 2 7 9 3 4 5 10 8”两端开始“探测”。先从右往左找一个小于 6 的数，再从左往右找一个大于 6 的数，然后交换他们。这里可以用两个变量 i 和 j，分别指向序列最左边和最右边。我们为这两个变量起个好听的名字“哨兵 i”和“哨兵 j”。刚开始的时候让哨兵 i 指向序列的最左边（即 i=1），指向数字 6。让哨兵 j 指向序列的最右边（即=10），指向数字。

     
   ​![](https://img1.terwer.space/api/public/20221018234720.png)​

     
   首先哨兵 j 开始出动。因为此处设置的基准数是最左边的数，所以需要让哨兵 j 先出动，这一点非常重要（请自己想一想为什么）。哨兵 j 一步一步地向左挪动（即 j–），直到找到一个小于 6 的数停下来。接下来哨兵 i 再一步一步向右挪动（即 i++），直到找到一个数大于 6 的数停下来。最后哨兵 j 停在了数字 5 面前，哨兵 i 停在了数字 7 面前。

   ​  
   现在交换哨兵 i 和哨兵 j 所指向的元素的值。交换之后的序列如下：6 1 2 5 9 3 4 7 10 8

   ![](https://img1.terwer.space/api/public/20221018235119.png)​

   ![](https://img1.terwer.space/api/public/20221018235204.png)​

   ​  
   到此，第一次交换结束。接下来开始哨兵 j 继续向左挪动（再友情提醒，每次必须是哨兵 j 先出发）。他发现了 4（比基准数 6 要小，满足要求）之后停了下来。哨兵 i 也继续向右挪动的，他发现了 9（比基准数 6 要大，满足要求）之后停了下来。此时再次进行交换，交换之后的序列如下：

   6 1 2 5 4 3 9 7 10 8

   ![](https://img1.terwer.space/api/public/20221018235546.png)

   ![](https://img1.terwer.space/api/public/20221018235616.png)​

   第二次交换结束，“探测”继续。哨兵 j 继续向左挪动，他发现了 3（比基准数 6 要小，满足要求）之后又停了下来。哨兵 i 继续向右移动，糟啦！此时哨兵 i 和哨兵 j 相遇了，哨兵 i 和哨兵 j 都走到 3 面前。说明此时“探测”结束。我们将基准数 6 和 3 进行交换。交换之后的序列如下：

   3 1 2 5 4 6 9 7 10 8

   ![](https://img1.terwer.space/api/public/20221018235740.png)​

   ![](https://img1.terwer.space/api/public/20221018235804.png)​

   ![](https://img1.terwer.space/api/public/20221018235822.png)​  
   ​  
   到此第一轮“探测”真正结束。此时以基准数 6 为分界点，6 左边的数都小于等于 6，6 右边的数都大于等于 6。回顾一下刚才的过程，其实哨兵 j 的使命就是要找小于基准数的数，而哨兵 i 的使命就是要找大于基准数的数，直到 i 和 j 碰头为止。  
   OK，解释完毕。现在基准数 6 已经归位，它正好处在序列的第 6 位。此时我们已经将原来的序列，以 6 为分界点拆分成了两个序列，左边的序列是“3 1 2 5 4”，右边的序列是“9 7 10 8”。接下来还需要分别处理这两个序列。因为 6 左边和右边的序列目前都还是很混乱的。不过不要紧，我们已经掌握了方法，接下来只要模拟刚才的方法分别处理 6 左边和右边的序列即可。现在先来处理 6 左边的序列现吧。

   左边的序列是“3 1 2 5 4”。请将这个序列以 3 为基准数进行调整，使得 3 左边的数都小于等于 3，3 右边的数都大于等于 3。好了开始动笔吧

   如果你模拟的没有错，调整完毕之后的序列的顺序应该是：

   2 1 3 5 4

   OK，现在 3 已经归位。接下来需要处理 3 左边的序列“2 1”和右边的序列“5 4”。对序列“2 1”以 2 为基准数进行调整，处理完毕之后的序列为“1 2”，到此 2 已经归位。序列“1”只有一个数，也不需要进行任何处理。至此我们对序列“2 1”已全部处理完毕，得到序列是“1 2”。序列“5 4”的处理也仿照此方法，最后得到的序列如下：

   1 2 3 4 5 6 9 7 10 8

   对于序列“9 7 10 8”也模拟刚才的过程，直到不可拆分出新的子序列为止。最终将会得到这样的序列，如下

   1 2 3 4 5 6 7 8 9 10  
   到此，排序完全结束。细心的同学可能已经发现，快速排序的每一轮处理其实就是将这一轮的基准数归位，直到所有的数都归位为止，排序就结束了。下面上个霸气的图来描述下整个算法的处理过程。

   ![](https://img1.terwer.space/api/public/20221019000050.png)  

   ```java

   import java.util.Arrays;

   /**
    * @name: QuickSort
    * @author: terwer
    * @date: 2022-10-19 00:01
    **/

   public class QuickSort {
       public static void main(String[] args) {
           int[] nums = {11, 24, 5, 32, 50, 34, 54, 76};
           System.out.println("快速排序前:" + Arrays.toString(nums));
           quickSort(nums, 0, nums.length - 1);
           System.out.println("快速排序后:" + Arrays.toString(nums));
       }

       public static void quickSort(int[] nums, int start, int end) {
           if (start > end) return;
           int i, j, base;
           i = start;
           j = end;
           base = nums[start];
           while (i < j) {
               while (i < j && nums[j] >= base) j--;
               while (i < j && nums[i] <= base) i++;
               if (i < j) {
                   swap(nums, i, j);
               }
           }
           swap(nums, start, i);
           quickSort(nums, start, j - 1);
           quickSort(nums, j + 1, end);
       }

       public static void swap(int[] nums, int left, int right) {
           int temp = nums[left];
           nums[left] = nums[right];
           nums[right] = temp;
       }
   }
   ```