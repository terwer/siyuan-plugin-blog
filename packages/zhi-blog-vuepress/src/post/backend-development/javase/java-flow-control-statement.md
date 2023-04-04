---
title: Java_SE_第六讲：流程控制语句
short_title: ''
description: 条件运算符（三元表达式）其形式为_typed=a?b_c_​具体化形式为_intd=轻量级的文本编辑器_ultraediteditplusvivimgvim流程控制语句if的用法为_第一种形式_if(布尔表达式){待执行的代码}第二种形式_if(布尔表达式){待执行的代码}else{待执行的代码}第三种形式_javaif(布尔表达式){待执行的代码}elseif(布尔表达式){待执行的代码}elseif(布尔表达式){待执行的代码}else{待执行的代码}switch语句使用形式为_javaswitch(
date: 2022-10-10 20:33:56
category:
  - 后端开发
  - JavaSE
tag:
  - 执行
  - 代码
  - 表达式
  - 形式
  - 布尔
  - flow
  - control
  - statement
article: true
timeline: false
---
1. 条件运算符（三元表达式），其形式为：

   `type d = a ? b : c;  `​

   具体化形式为：

   `int d = 2 < 1 ? 3 : 4;`
2. 轻量级的文本编辑器：UltraEdit 、Editplus 、vi 、vim 、gvim
3. 流程控制语句 if 的用法为：

第一种形式：

```java
if(布尔表达式) { 
//待执行的代码 
}
```

第二种形式：

```java
if(布尔表达式) { 
//待执行的代码 
} else { 
//待执行的代码 
}
```

第三种形式：

```java
java if(布尔表达式) { 
//待执行的代码 
} else if(布尔表达式) { 
//待执行的代码 
} else if(布尔表达式) { 
//待执行的代码 
} else { 
//待执行的代码 
}
```

4.switch 语句，使用形式为：

```java
java switch(变量) {//此处的变量类型就目前所学内容来看，只能为4 种类型： byte, short, int, char。 
case  常量 1: //待执行的代码 
  break; 
case  常量 2: //待执行的代码 
  break; 
case  常量 3: //待执行的代码
  break; 
default： //待执行的代码 
}
```

虽然 case 语句中的 break 是可选的， 但在绝大多数情况下， 如果没有 break，程序的逻 辑就会发生错误，因此， 通常情况下都需要加上 break。

> 文章更新历史
>
> 2022/05/08 fix:修改备注。