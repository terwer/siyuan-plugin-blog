---
title: Java_SE_第七讲：流程控制续
short_title: ''
description: java中的循环控制语句一共有种分别是whiledo…while以及for循环。while循环形式为_while(布尔表达式){待执行的代码}do…while循环新式为_do{待执行的代码}while(布尔表达式)_while与do…while之间的区别_如果布尔表达式的第一次判断就为false那么while循环一次也不执行_do…while循环则会执行一次。如果布尔表达式第一次判断为true那么while循环与do…while循环等价。for循环（使用最多的一种循环）形式为_for(变量初始化_条件判断
date: 2022-10-10 20:44:47
category:
  - 后端开发
  - JavaSE
tag:
  - 循环
  - 执行
  - 判断
  - 代码
  - 布尔
  - flow
  - control
  - continue
  - javase
article: true
timeline: false
---
1. Java 中的循环控制语句一共有 3 种，分别是 `while`，`do… while` 以及 `for` 循环。
2. while 循环，形式为：

   ```java
   while(布尔表达式)    {  
   //待执行的代码   
   }
   ```
3. do…while 循环，新式为：

   ```java
   do{  
   //待执行的代码    
   } while(布尔表达式);
   ```
4. while 与 do…while 之间的区别：

   如果布尔表达式的第一次判断就为 false，那么 while 循环一次也不执行；do…while 循环则会执行一次。如果布尔表达式第一次判断为 true，那么 while 循环与 do…while 循环等价。
5. for 循环（使用最多的一种循环），形式为：

   ```java
   for(变量初始化; 条件判断; 步进) {  
   //待执行的代码    
   }
   ```

   for 循环的执行过程：

   1） 执行变量初始化。

   2） 执行条件判断。如果条件判断结果为假，那么退出 for 循环，开始执行循环后面的代码；如果条件判断为真，执行 for 循环里面的代码。

   3） 执行步进。

   4） 重复步骤 2。

> 文章更新历史
>
> 2022/05/08 fix:修改备注。