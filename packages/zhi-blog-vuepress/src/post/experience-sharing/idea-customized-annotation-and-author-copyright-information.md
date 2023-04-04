---
title: IDEA自定义生成注释与作者版权信息
short_title: ''
description: 生成类注释打开preferenceseditorclass在此添加的话你每次创建类的时候会弹两次框第二次是让你输入description的内容了代码如下{description}@name_{name}@author_{user}@date_{year}{month}{day}{hour}_{minute}接口(interface)枚举(enum)注解(annotation)的注释同理。生成效果idea中其他类的查看效果备注_为什么不用下面的格式_因为下面的格式在另一个类无法查看注释。@name_{nam
date: 2022-07-05 21:47:39
category:
  - 经验分享
tag:
  - author
  - 注释
  - 方法
  - 模板
  - 生成
  - 添加
article: true
timeline: false
---
## 生成类注释

1、打开 Preferences

2、Editor -> File and Code Templates -> Files -> Class

在此添加的话你每次创建类的时候会弹两次框，第二次是让你输入 description 的内容了

代码如下

```java
/**
 * ${description}
 *
 * @name: ${NAME}
 * @author: ${USER}
 * @date: ${YEAR}-${MONTH}-${DAY} ${HOUR}:${MINUTE}
 **/
```

接口(Interface)、枚举(Enum)、注解(Annotation)的注释同理。  生成效果

![img](https://img1.terwergreen.com/20220705214622.jpeg)

IDEA 中其他类的查看效果

![img](https://img1.terwergreen.com/20220705214711.jpeg)

* 备注：为什么不用下面的格式：因为下面的格式在另一个类无法查看注释。

```java
/**
* @name: ${NAME}
* @description: ${description}
* @author: ${USER}
* @date: ${YEAR}-${MONTH}-${DAY} ${HOUR}:${MINUTE}
**/
```

PS:其实还有更好的办法，直接添加到 File Header 里面。

![image-20220705215735838](https://img1.terwergreen.com/20220705215736.png)

## 生成方法注释

打开 Preferences

Editor -> Live Templates -> 点击右边加号为自己添加一个 Templates Group -> 然后选中自己的 Group 再次点击加号添加 Live Templates

新建模板：命名为 c

因为 IDEA 生成注释的默认方式是：/*+ 模板名 + 快捷键（比如若设置模板名为 c 快捷键用 Tab，则生成方式为 `/*c+Tab` ），如果不采用这样的生成方式 IDEA 中没有内容的方法将不可用，例如获取方法参数的 methodParameters(）、获取方法返回值的 methodReturnType(）

```java

 * @description: $description$
 * @param: $params$
 * @return: $returns$
 * @author: $user$
 * @date: $date$
 */
```

> 文章更新历史
>
> 2022/07/05 feat:提供更好的办法，直接添加到 file header 里面。

‍