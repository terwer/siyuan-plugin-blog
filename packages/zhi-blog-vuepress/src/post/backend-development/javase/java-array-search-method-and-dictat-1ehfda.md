---
title: Java数组的查找方式及二分查找
short_title: ''
description: 数组查找publicclassarraysearchtest{publicstaticvoidmain(string[]args){int[]a=newint[]{}_intvalue=_intresult=search(a)_if(result){systemoutprintln(}else{systemoutprintln(}}publicstaticintsearch(int[]arrayintvalue){intindex=_for(inti=_ii){if(array[i]==value){in
date: 2022-10-18 22:26:59
category:
  - 后端开发
  - JavaSE
tag:
  - 查找
  - 数组
  - 二分
  - 必须
  - 有序
  - 二分查找
  - search
  - binary-search
article: true
timeline: false
---
1. 数组查找

    ```java
    public class ArraySearchTest {
        public static void main(String[] args) {
            int[] a = new int[]{1, 5, 6, 7, 10, 3, 9};
            int value = 9;

            int result = search(a, 9);

            if (result > 0) {
                System.out.println("找到了，索引为" + result);
            } else {
                System.out.println("未找到");
            }
        }

        public static int search(int[] array, int value) {
            int index = -1;
            for (int i = 0; i < array.length; i++) {
                if (array[i] == value) {
                    index = i;
                    break;
                }
            }
            return index;
        }
    }
    ```

2. 二分查找（Binary Search）：待查找的数组必须有序

    1,2,3,4,5,6,7,8,9

    10

    ```java
    public static int binarySearch(int[] array, int value) {
            int left = 0;
            int right = array.length - 1;
            int middle;

            while (left <= right) {
                middle = (left + right) / 2;

                for (int k = 0; k < array.length; k++) {
                    System.out.print(array[k]);
                    if (k == middle) {
                        System.out.print("#");
                    }
                    System.out.print(" ");
                }

                System.out.println();

                if (array[middle] == value) {
                    return middle;
                }

                if (value > array[middle]) {
                    left = middle + 1;
                }

                if (value < array[middle]) {
                    right = middle - 1;
                }
            }

            return -1;
        }
    ```

    效果

    ```java
    1 2 3 4 5
    1 2 3 4 5 6 7
    1 2 3 4 5 6 7 8
    1 2 3 4 5 6 7 8 9# 
    找到了，索引为8
    ```

3. 随机生成50个数字（整数），每个数字的范围是[10,50]，统计每个数字出现的次数以及出现次数最多的数字与它的个数 ，最后将每个数字及其出现次数打印出来，如果某个数字出现次数为 0，则不要打印它。打印时按照数字的升序排列。

    ```java
    import java.util.Random;

    /**
     * @name: WorkTest
     * @author: terwer
     * @date: 2022-10-19 00:10
     **/
    public class WorkTest {
        public static void main(String[] args) {
            int[] nums = new int[50];

            Random random = new Random();
            for (int i = 0; i < nums.length; i++) {
                nums[i] = 10 + random.nextInt(50 - 10 + 1);
            }


            for (int j = 10; j <= 50; j++) {
                int count = 0;
                for (int m = 0; m < nums.length; m++) {
                    if (nums[m] == j) {
                        count++;
                    }
                }

                if (count > 0) {
                    System.out.println(j + "出现的次数：" + count);
                }
            }


    //        for (int k = 0; k < nums.length; k++) {
    //            System.out.println(nums[k]);
    //        }
        }
    }
    ```

    更好的实现：

    ```java
    import java.util.Random;

    /**
     * @name: WorkTest
     * @author: terwer
     * @date: 2022-10-19 00:10
     **/
    public class WorkTest2 {
        public static void main(String[] args) {
            int[] count = new int[41];

            Random random = new Random();
            for (int i = 0; i < 50; i++) {
                int number = 10 + random.nextInt(50 - 10 + 1);
                System.out.println(number);
                count[number - 10]++;
            }


            for (int j = 0; j < count.length; j++) {
                if (count[j] == 0) {
                    continue;
                }

                System.out.println((10 + j) + "出现的次数：" + count[j]);
            }

            int max = count[0];
            int maxNum = 10;
            for (int k = 0; k < count.length; k++) {
                if (max < count[k]) {
                    max = count[k];
                }

                if (max == count[k]) {
                    maxNum = k + 10;
                    System.out.println(maxNum);
                }
            }
            System.out.println("最大的数字出现的次数：" + max);
        }
    }
    ```

‍