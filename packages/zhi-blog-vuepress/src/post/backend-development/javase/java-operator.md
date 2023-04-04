---
title: Java_SE_第四讲：运算符
short_title: ''
description: 当有若干个变量参与运算时结果类型取决于这些变量中表示范围最大的那个变量类型。比如参与运算的变量中有整型int有双精度浮点型double有短整型short那么最后的结果类型就是double。inta=_intb=_doublec=(double)ab_上面的代码中a与b都是整型但是通过(double)a这种转换将a转换为一个匿名的变量该变量的类型是double但是要注意_a本身依旧是int类型而不是double类型这样(double)ab就是double类型除以int类型结果自然是double类型。取模运算
date: 2022-10-10 20:16:31
category:
  - 后端开发
  - JavaSE
tag:
  - 类型
  - 结果
  - 变量
  - 整型
  - 那么
  - 运算符
  - operator
article: true
timeline: false
---
1. 当有若干个变量参与运算时，结果类型取决于这些变量中表示范围最大的那个变量类型。
   比如，参与运算的变量中，有整型 int，有双精度浮点型 double，有短整型 short，那么
   最后的结果类型就是 double。
2. int a = 1;

   int b = 2;

   double c = (double)a / b;

   上面的代码中，a 与 b 都是整型，但是通过(double)a 这种转换将 a 转换为一个匿名的变量，该变量的类型是 double，但是要注意：a 本身依旧是 int 类型，而不是 double 类型，这样，(double)a / b 就是 double 类型除以 int 类型，结果自然是 double 类型。
3. 取模运算符：使用 % 表示。

   int a = 5;

   int b = 3;
4. int c = a % b;

   上面代码的运行结果是 2，因为 5 除以 3 结果是 1 余 2。
   取模的规律：取模的结果符号永远与被除数的符号相同

   int a = 5;

   int b = -3;

   int c = a % b;

   被除数是 5，那么取模的结果是 2

   int a = -5;

   int b = 3;

   int c = a % b;

   被除数是-5，那么取模的结果是-2。

> 文章更新历史
>
> 2022/05/08 fix:修改备注。