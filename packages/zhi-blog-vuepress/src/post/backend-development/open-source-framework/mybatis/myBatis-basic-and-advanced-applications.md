---
title: MyBatis的基本介绍及优势
short_title: ''
description: mybatis的历史由来mybatis原本是apache软件基金会的一个开源项目叫做ibatis年这个项目由apache迁移到了googlecode管理才改名为mybatis年又迁移到了github。ibatis一词来源于internet和abatis的组合是一个由clintonbegin在年发起的开放源代码项目。mybatis简介mybatis是一个基于orm的半自动轻量级的持久层框架。支持定制化sql存储过程和高级映射。mybatis几乎避免了所有的jdbc代码和手动设置参数与获取结果集。mybati
date: 2022-08-29 23:59:51
category:
  - MyBatis
  - 后端开发
  - 开源框架
tag:
  - mybatis
  - framework
  - basic
  - mybatis-6
article: true
timeline: false
---
## MyBatis 的历史由来

`Mybatis` 原本是 Apache 软件基金会的一个开源项目叫做 `iBatis` ，2010 年这个项目由 Apache 迁移到了 google code 管理才改名为 Mybatis，2013 年又迁移到了 GitHub。

`iBatis` 一词来源于 `internet` 和 `abatis` 的组合,是一个由 Clinton Begin 在 2001 年发起的开放源代码项目。

## Mybatis 简介

**Mybatis 是一个基于 ORM 的半自动轻量级的持久层框架。** 支持定制化 SQL、存储过程和高级映射。

Mybatis 几乎避免了所有的 JDBC 代码和手动设置参数与获取结果集。MyBatis 可以使用简单的 xml 或者注解来配置将映射 `类` 、 `接口` 和 POJO（Plain Old Java Object，普通老式 Java 对象）映射为数据库的记录。

## ORM

ORM：`Object/Relation Mapping` 对象/关系映射

ORM 思想：将数据库中的关系数据表映射为 JAVA 中的对象，把对数据表的操作转换为对对象的操作，实现面向对象编程。因此 ORM 的目的是使得开发人员以面向对象的思想来操作数据库

## Mybatis VS Hibernate

Mybatis 是一个优秀的持久层框架（Dao 层框架），它是对 JDBC 的封装，使得开发者只需要关注 Sql 语句（业务）本身即可，无需开发者处理加载驱动、获取连接、创建 Statement 等繁琐的过程。

Hibernate 框架是一个全自动的 ORM 持久层框架，只需要编写 POJO，在 xml 中定义好 Pojo 属性和数据表字段的映射/对应关系，就可以在 java 中实现类似 insert(User)的操作。Sql 语句都不用写。但是因为性能等问题，市场占有率越来越低。

Mybatis 是目前比较流行的 Dao 层框架。

## MyBatis 的优势

MyBatis 是一个半自动的持久层框架。对开发人员，核心 SQL 还是需要自己编写，SQL 和编码分开，功能边界清晰，一个专注业务，一个专注数据。

> 文章更新历史
>
> 2022/05/08 feat:调整目录结构。
>