---
title: Struts2类型转换之全局类型转换
short_title: ''
description: 概述全局类型转换。在src​目录下新建xworkconversionproperties​该文件的内容是待转换的类=转换器名字即_spaceterwerbeanuser=spaceterwerconverteruserconverter实例在src​目录新建一个xworkconversionproperties​文件spaceterwerbeanuser=spaceterwerconverteruserconverter其他配置保持不变。‍
date: 2022-11-02 20:34:50
category:
  - Struts2
  - 后端开发
tag:
  - 目录
  - 新建
  - 文件
  - 概述
  - 全局
  - 类型
  - 转换
  - converter
  - global
article: true
timeline: false
---
## 概述

全局类型转换。在 `src`​ 目录下新建 `xwork-conversion.properties`​ ，该文件的内容是 **待转换的类=转换器名字** ，即：

```properties
space.terwer.bean.User=space.terwer.converter.UserConverter2
```

## 实例

### 在 `src`​ 目录新建一个 `xwork-conversion.properties`​ 文件

```properties
space.terwer.bean.User=space.terwer.converter.UserConverter2
```

其他配置保持不变。

‍