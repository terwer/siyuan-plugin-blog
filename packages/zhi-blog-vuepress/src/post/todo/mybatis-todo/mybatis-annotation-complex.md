---
title: MyBatis 注解开发
short_title: ''
description: MyBatis 注解开发。
date: 2022-05-25 00:31:34
category:
  - TODO
  - Mybatis-TODO
tag:
  - mybatis
  - annotation
article: true
timeline: false
---
# MyBatis 注解实现复杂映射开发

## 复杂注解说明

之前的复杂映射开发我们是通过在 xml 配置文件配置实现的，但是比较繁琐。

实用注解开发之后，我们可以使用 @Results 注解、@Result 注解、@One 注解、@Many 注解组合来实现复杂映射的配置。

| 注解     | 说明                                                         |
| -------- | ------------------------------------------------------------ |
| @Results | 代替的是 `<ResultMap>` 标签，该注解可以实现单个@Result注解，也可以使用@Result集合。 |
|          | 使用格式：`@Results({@Result(), @Result()})` ,  `@Results(@Result())` |
| @Result  |                                                              |
| @One     |                                                              |
| @Many    |                                                              |

## 一对一开发

## 一对多开发

## 多对多开发



## 本文代码地址