---
title: Struts1实现国际化
short_title: ''
description: Struts1实现国际化的方法。
date: 2022-05-07 20:57:08
category:
  - 实用技巧
  - 经验分享
tag:
  - struts1
article: true
timeline: false
---
## 添加国际化资源文件

在resource目录下新建国际化资源文件，格式 

```
ApplicationResources_en.properties
```

默认国际化文件为：ApplicationResources.properties

完成后如下：

![image-20220507210138306](https://img1.terwer.space/20220507210144.png)

所有资源文件里面的key要保持一致。

内容如下：

`ApplicationResources_zh.properties`

```properties
firstname=姓名zh
```

`ApplicationResources_en.properties`

```properties
firstname=firstname
```

## Struts1配置文件的配置

配置 `struts-config.xml` ，如下：

```xml
<!-- 国际化 -->
<message-resources parameter="ApplicationResources"/>
```

## jsp文件中国际化资源的使用

```html
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="bean" uri="http://struts.apache.org/tags-bean" %>
<bean:message key="firstname"></bean:message>
```

页面效果：

![image-20220507210540266](https://img1.terwer.space/20220507210540.png)

## 附录

Struts1的taglib参考：

[struts1标签库文档](https://people.apache.org/~germuska/struts-taglib/docs/tlddoc/)