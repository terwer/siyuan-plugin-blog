---
title: IDEA自定义Maven的archetype
short_title: ''
description: 在创建maven的项目时我们发现了一个很不方便的问题就是每次创建maven的工程的时候都需要选择一个骨架但是每个骨架都需要删除一部分东西才行这样的话实在是太不方便了。为什么要自定义archetype在创建maven的项目时我们发现了一个很不方便的问题就是每次创建maven的工程的时候都需要选择一个骨架但是每个骨架都需要删除一部分东西才行在平时开发中如果是分布式项目有可能会频繁创建子项目每次都要删除不要的文件然后拷贝我们要的文件例如弹簧配置webxml中配置等。这样做不仅会浪费大量时间拷贝和删除文件也容易导
date: 2023-02-22 21:27:11
category:
  - 经验分享
tag:
  - 骨架
  - 创建
  - idea
  - maven
  - archetype
article: true
timeline: false
---
在创建 Maven 的项目时我们发现了一个很不方便的问题，就是每次创建 Maven 的工程的时候，都需要选择一个骨架，但是每个骨架都需要删除一部分东西才行，这样的话实在是太不方便了。

## 为什么要自定义 archetype

在创建 Maven 的项目时我们发现了一个很不方便的问题，就是每次创建 Maven 的工程的时候，都需要选择一个骨架，但是每个骨架都需要删除一部分东西才行，在平时开发中，如果是分布式项目，有可能会频繁创建子项目，每次都要删除不要的文件然后拷贝我们要的文件，例如弹簧配置，web.xml 中配置等。这样做不仅会浪费大量时间，拷贝和删除文件也容易导致错误的发生，比如漏拷某文件。

## Archetype maven 项目的组成

一个典型的 Archetype Maven 项目主要包括如下几个部分：

* pom.xml：Archetype 自身的 POM。
* src/main/resources/archetype-resources/pom.xml：基于该 Archetype 生成项目的 POM 原型。
* src/main/resources/META-INF/maven/archetype-metadata.xml：Archetype 的描述符文件。
* src/main/resources/archetype-resources/**：其他需要包含在 Archetype 中的内容。

## 创建自己的骨架结构

要创建 Maven 的模板，首先你要创建一个 Maven 的项目，然后再以这个项目作为模板。

### 创建 maven 工程

首先创建一个 Maven 的工程，名字叫 maven-template-java-simple

选择骨架

<div>
<img src="https://img1.terwer.space/20220314105651.jpeg" style="zoom:50%;" />
</div>

### 骨架创建

在 maven-template-java-simple 根目录执行

```
mvn archetype:create-from-project
```

报错解决

```
mvn archetype:create-from-project报错The specified user settings file does not exist
```

[https://www.cnblogs.com/chmod/p/15489910.html](https://www.cnblogs.com/chmod/p/15489910.html)

执行完毕之后，会出现一个编译之后新的 maven 工程（target 文件夹），如下图:

<div>
<img src="https://img1.terwer.space/20220314105712.jpeg" style="zoom:50%;" />
</div>

### 骨架安装

安装对应骨架项目

先进入骨架项目的 pom 文件目录：

```
cd target/generated-sources/archetype
```

执行安装：

```
mvn clean install
```

我们的骨架项目坐标如下：

```xml
<groupId>com.terwergreen</groupId>
<artifactId>maven-template-java-simple-archetype</artifactId>
<version>1.0.0</version>
<packaging>maven-archetype</packaging>
```

至此，骨架项目安装成功。

## 使用自己创建的自定义骨架

创建新的 Maven 工程，选择自定义骨架

### 添加骨架

创建新的 maven 工程，选择 Add Archetype,填写刚才添加的骨架工程坐标,点击 OK，这是会生成一个新的骨架选项。

```
groupId com.terwergreen
artifactId maven-template-java-simple-archetype
version 1.0.0
```

<div>
<img src="https://img1.terwer.space/20220314105749.jpeg" style="zoom:50%;" />
</div>

选中新创建的骨架，点击下一步创建新的 Maven 的项目如下，这是新建的测试项目：

<div>
<img src="https://img1.terwer.space/20220314105803.jpeg" style="zoom:50%;" />
</div>

<div>
<img src="https://img1.terwer.space/20220314105811.jpeg" style="zoom:50%;" />
</div>

<div>
<img src="https://img1.terwer.space/20220314105835.jpeg" style="zoom:50%;" />
</div>

<div>
<img src="https://img1.terwer.space/20220314105849.jpeg" style="zoom:50%;" />
</div>

以后再创建类似的 Maven 的项目时，就可以快速新建的 Maven 项目而不用改来改去了。是不是很方便呢？

PS:删除自定义 archetype

```
cd /Users/terwer/Library/Caches/JetBrains/IntelliJIdea2021.3/Maven/Indices
```

然后编辑 `UserArchetypes.xml`​ 文件即可。注意：修改文件之后需要重启 IDEA。

**手动添加的方法：**

## 解决添加失效问题（IDEA2022.1 以下版本有效，不包括 IDEA2022.1）

```bash
cd ~/Library/Caches/JetBrains
```

找到对应版本目录，例如

```bash
cd /Users/terwer/Library/Caches/JetBrains/IntelliJIdea2021.3/Maven/Indices
```

然后新建一个 `UserArchetypes.xml`​ 文件，内容如下：

```xml
<archetypes>
    <archetype groupId="com.terwergreen" artifactId="maven-template-java-simple-archetype" version="1.0.3" />
</archetypes>
```

重启 IDEA 就可以了。

## IDEA 2022.1 的变化

IDEA2022 在 `Add`​ 完成之后，下次新建需要切换 Catalog 到 `Default Local`​，然后才能在 `Archetype`​ 中选择到。

​![image-20220421135052088](https://img1.terwer.space/image-20220421135052088.png)​

## IDEA 2022.3 注意事项

IDEA2022.3 需要自己填写下面的内容：

​![](https://static.terwergreen.com/test/202302222136384.png)​

## 最新可用源码

[https://github.com/terwer/maven-template-java-simple](https://github.com/terwer/maven-template-java-simple)

> 2022/03/14 验证通过
>
> ‍
>
> 文章更新历史
>
> 2022/03/03 初稿。
>
> 2022/04/21 兼容 IDEA 2022.1 。提供使用的新方法。
>
> 2023/02/22 兼容 IDEA 2033.3 。