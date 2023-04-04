---
title: Java字节码文件结构剖析
short_title: ''
description: Java字节码文件结构剖析。
date: 2022-06-05 21:18:45
category:
  - 新笔记
  - JVM进阶新思路
tag:
  - jvm
article: true
timeline: false
---
# Java字节码文件结构剖析

## javap

`javap MyTest1`

![image-20220605211957751](https://img1.terwer.space/20220605211957.png)

`javap -c MyTest1`

![image-20220605212012796](https://img1.terwer.space/20220605212013.png)

`javap -verbose MyTest1`


结果如下

```bash
➜  bytecode git:(master) ✗ javap -c MyTest1
警告: 文件 ./MyTest1.class 不包含类 MyTest1
Compiled from "MyTest1.java"
public class com.terwergreen.jvm.bytecode.MyTest1 {
  public com.terwergreen.jvm.bytecode.MyTest1();
    Code:
       0: aload_0
       1: invokespecial #1                  // Method java/lang/Object."<init>":()V
       4: aload_0
       5: iconst_1
       6: putfield      #2                  // Field a:I
       9: return
```

```bash
    public int getA();
        Code:
           0: aload_0
           1: getfield      #2                  // Field a:I
           4: ireturn

      public void setA(int);
        Code:
           0: aload_0
           1: iload_1
           2: putfield      #2                  // Field a:I
           5: return
    }
➜  bytecode git:(master) ✗ javap -verbose MyTest1
警告: 文件 ./MyTest1.class 不包含类 MyTest1
Classfile /Users/terwer/Documents/workspace/senior-java-engineer-road/p7-skill/jvm/jvm-demo/target/classes/com/terwergreen/jvm/bytecode/MyTest1.class
  Last modified 2022年3月2日; size 503 bytes
  MD5 checksum 9bb025ac2880ca6faf9ee236d4d947ae
  Compiled from "MyTest1.java"
public class com.terwergreen.jvm.bytecode.MyTest1
  minor version: 0
  major version: 51
  flags: (0x0021) ACC_PUBLIC, ACC_SUPER
  this_class: #3                          // com/terwergreen/jvm/bytecode/MyTest1
  super_class: #4                         // java/lang/Object
  interfaces: 0, fields: 1, methods: 3, attributes: 1
Constant pool:
   #1 = Methodref          #4.#20         // java/lang/Object."<init>":()V
   #2 = Fieldref           #3.#21         // com/terwergreen/jvm/bytecode/MyTest1.a:I
   #3 = Class              #22            // com/terwergreen/jvm/bytecode/MyTest1
   #4 = Class              #23            // java/lang/Object
   #5 = Utf8               a
   #6 = Utf8               I
   #7 = Utf8               <init>
   #8 = Utf8               ()V
   #9 = Utf8               Code
  #10 = Utf8               LineNumberTable
  #11 = Utf8               LocalVariableTable
  #12 = Utf8               this
  #13 = Utf8               Lcom/terwergreen/jvm/bytecode/MyTest1;
  #14 = Utf8               getA
  #15 = Utf8               ()I
  #16 = Utf8               setA
  #17 = Utf8               (I)V
  #18 = Utf8               SourceFile
  #19 = Utf8               MyTest1.java
  #20 = NameAndType        #7:#8          // "<init>":()V
  #21 = NameAndType        #5:#6          // a:I
  #22 = Utf8               com/terwergreen/jvm/bytecode/MyTest1
  #23 = Utf8               java/lang/Object
{
  public com.terwergreen.jvm.bytecode.MyTest1();
    descriptor: ()V
    flags: (0x0001) ACC_PUBLIC
    Code:
      stack=2, locals=1, args_size=1
         0: aload_0
         1: invokespecial #1                  // Method java/lang/Object."<init>":()V
         4: aload_0
         5: iconst_1
         6: putfield      #2                  // Field a:I
         9: return
      LineNumberTable:
        line 8: 0
        line 9: 4
      LocalVariableTable:
        Start  Length  Slot  Name   Signature
            0      10     0  this   Lcom/terwergreen/jvm/bytecode/MyTest1;

  public int getA();
    descriptor: ()I
    flags: (0x0001) ACC_PUBLIC
    Code:
      stack=1, locals=1, args_size=1
         0: aload_0
         1: getfield      #2                  // Field a:I
         4: ireturn
      LineNumberTable:
        line 12: 0
      LocalVariableTable:
        Start  Length  Slot  Name   Signature
            0       5     0  this   Lcom/terwergreen/jvm/bytecode/MyTest1;

public void setA(int);
    descriptor: (I)V
    flags: (0x0001) ACC_PUBLIC
    Code:
      stack=2, locals=2, args_size=2
         0: aload_0
         1: iload_1
         2: putfield      #2                  // Field a:I
         5: return
      LineNumberTable:
        line 16: 0
        line 17: 5
      LocalVariableTable:
        Start  Length  Slot  Name   Signature
            0       6     0  this   Lcom/terwergreen/jvm/bytecode/MyTest1;
            0       6     1     a   I
}
SourceFile: "MyTest1.java"
➜  bytecode git:(master) ✗ 
```