---
title: Struts2自定义方法最佳实践
short_title: ''
description: 自定义方法实现在strutsxml配置method并且在对应的action实现对应方法即可。strutsxmlactionpublicstringmyexecute()throwsexception{systemoutprintln(returnsuccess_}效果​自定义方法的缺点参数耦合逻辑混乱。自定义方法的优点一个action可以处理多种不同的逻辑。最佳实现struts支持自定义方法即在strutsxml的action元素内定义method属性属性值即为待执行的方法。其中该方法的声明要与execu
date: 2022-11-02 20:49:49
category:
  - Struts2
  - 后端开发
tag:
  - 方法
  - 自定义
  - 实现
  - 对应
  - 逻辑
  - struts
  - struts2
  - custom
  - method
article: true
timeline: false
---
## 自定义方法实现

在 struts.xml 配置 method ，并且在对应的 Action 实现对应方法即可。

struts.xml

```properties
<action name="login2" class="space.terwer.struts23.LoginAction2" method="myExecute">
	<result name="success">/result2.jsp</result>
</action>
```

Action

```properties
public String myExecute() throws Exception {
	System.out.println("myExecute called");
	return SUCCESS;
}
```

效果

![](https://img1.terwer.space/api/public/20221102210803.png)​

## 自定义方法的缺点

参数耦合，逻辑混乱。

## 自定义方法的优点

一个 Action 可以处理多种不同的逻辑。

## 最佳实现

Struts2 支持自定义方法，即在 struts.xml 的 Action 元素内定义 method 属性，属性值即为待执行的方法。其中，该方法的声明要与 execute 保持一致。 **（不推荐）这种方式容易导致 Action 方法混乱。**

‍