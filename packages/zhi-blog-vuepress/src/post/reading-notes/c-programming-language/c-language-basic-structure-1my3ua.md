---
title: C语言基本结构
short_title: ''
description: 第一个c语言程序#includemain(){printf(}保存文件为helloc编译cchelloc运行aout如下➜clangcodecchellochelloc___warning_typespecifiermissingdefaultstoint[wimplicitint]main(){^warninggenerated➜clangcodeaouthelloworld!分析#include包含有关标准库的信息main(){定义main函数不接受参数main函数的语句包含在花括号中printf(m
date: 2022-10-13 11:20:25
category:
  - C程序设计语言
  - 读书笔记
tag:
  - 第一个
  - 语言
  - 程序
  - c
  - cpp
article: true
timeline: false
---
## 第一个 C 语言程序

```c
#include <stdio.h>

main() {
    printf("Hello, World!\n");
}
```

保存文件为 `hello.c`

### 编译

```bash
cc hello.c
```

### 运行

```bash
./a.out
```

如下

```bash
➜  clangcode cc hello.c
hello.c:3:1: warning: type specifier missing, defaults to 'int' [-Wimplicit-int]
main() {
^
1 warning generated.
➜  clangcode ./a.out   
Hello, World!
```

### 分析

#include <stdio.h>                    // 包含有关标准库的信息

main() {                                  // 定义 main 函数，不接受参数，main 函数的语句包含在花括号中
    printf("Hello, World!\n");        // main 函数调用库函数 printf 打印字符序列，\n 代表换行符
}

## 总结

每一个 C 函数，都由变量和函数组成。

printf 不会自动换行，无论多少个 printf 语句。

```c
printf("hello,");
printf("world");
printf("\n");

// 打印结果如下
// hello,world
```

\n 只代表一个字符。

类似 \n 这样的字符为不能打印或者不可见字符提供了通用的扩展机制。

其他的换码序列还有：

```plaintext
制表符 \t
回退符 \b
双引号 \"
反斜杠本身 \\
```

注意：当输入的转义字符不受支持时，会原样输出，且编译和运行都不会报错。

## 实战

### VC6

下面三种写法在 Microsoft Visual C++ 6.0 都可以编译通过并执行成功。

最后一种虽然能运行通过，但是编译有警告 `warning C4508: 'main' : function should return a value; 'void' return type assumed`​，前两种写法都不会有警告。

```java
#include "stdafx.h"

int main(int argc, char* argv[]){
    printf("Hello World!\n");
    return 0;
}

//void main(){
//    printf("hello\n");
//}

//main(){
//    printf("hello\n");
//}

//void print1(){
//   printf("hello in fun\n");
//}

//main(){
//   print1();
//}
```

![](https://img1.terwer.space/api/public/20221021105811.png)​

## CMake

cmake 使用 c90 标准也能通过

```cmake
cmake_minimum_required(VERSION 3.23)
project(clangcode C)

set(CMAKE_C_STANDARD 90)

add_executable(clangcode hello.c)
```

![](https://img1.terwer.space/api/public/20221021110003.png)​