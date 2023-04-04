---
title: Struts2类型转换之单个对象深入研究
short_title: ''
description: 重要特性总结struts的类型转换对于个原生数据类型以及datestring等常见类型struts可以使内建的类型转换器实现自动的转换_但对于自定义的对象类型来说需要我们自己指定类型转换的方式即自定义类型转换器。对于自定义类型的转换器来说需要提供三个信息_action的名字action中待转换的属性名以及该属性对应的类型转换器。其中action的名字是通过属性文件的文件名​​来获得的action中待转换的属性名是通过属性文件中的key​​来获得的该属性对应的类型转换器是通过该key​​对应的value​​
date: 2022-10-30 20:43:11
category:
  - Struts2
  - 后端开发
tag:
  - 类型
  - 转换器
  - 类型转换
  - 属性
  - 转换
  - struts
  - struts2
  - type
  - type-converter
  - converter
article: true
timeline: false
---
## 重要特性总结

1. Struts2 的类型转换，对于 8 个原生数据类型以及 Date，String 等常见类型，Struts2 可以使内建的类型转换器实现自动的转换；但对于自定义的对象类型来说，需要我们自己指定类型转换的方式，即自定义类型转换器。
2. 对于自定义类型的转换器来说，需要提供三个信息：Action 的名字、Action 中待转换的属性名以及该属性对应的类型转换器。

   其中 Action 的名字是通过属性文件的 `文件名`​​ 来获得的、 Action 中待转换的属性名是通过属性文件中的 `key `​​ 来获得的，该属性对应的类型转换器是通过该 `key`​​ 对应的 `value`​​ 来获得的。

## StrutsTypeConverter

Base class for type converters used in Struts. This class provides two abstract methods that are used to convert both to and from strings -- the critical functionality that is core to Struts's type coversion system.

Type converters do not have to use this class. It is merely a helper base class, although it is recommended that you use this class as it provides the common type conversion contract required for all web-based type conversion.

There's a hook (fall back method) called **`performFallbackConversion`**​** of which could be used to perform some fallback conversion if** `convertValue`​ method of this failed. By default it just ask its super class (Ognl's DefaultTypeConverter) to do the conversion.

To allow the framework to recognize that a conversion error has occurred, throw an XWorkException or preferable a TypeConversionException.

## 使用 StrutsTypeConverter 进行类型转换实例

### 新建一个 test.jsp

```xml
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Struts2.3 converter</title>
</head>
<body>

	

	<form action="userAction.action">

		user info: <input type="text" name="user"/><br/>
		<input type="submit" value="submit"/>

	</form>

</body>
</html>
```

### 流程处理 Struts.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE struts PUBLIC
	"-//Apache Software Foundation//DTD Struts Configuration 2.3//EN"
	"http://struts.apache.org/dtds/struts-2.3.dtd">

<struts>

	<package name="struts2" extends="struts-default">
		<action name="userAction" class="space.terwer.struts23.UserAction">
			<result name="success">/output.jsp</result>
		</action>
	</package>

</struts>
```

### Action 处理类 UserAction

```java
package space.terwer.struts23;

import com.opensymphony.xwork2.ActionSupport;

import space.terwer.bean.User;

public class UserAction extends ActionSupport {
	private User user;

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public String execute() throws Exception {
		System.out.println("username:" + this.getUser().getUsername());
		System.out.println("password:" + this.getUser().getPassword());

		return SUCCESS;
	}
}
```

### 类型转换器 UserConverter2.java

```java
package space.terwer.converter;

import java.util.Map;

import org.apache.struts2.util.StrutsTypeConverter;

import space.terwer.bean.User;

public class UserConverter2 extends StrutsTypeConverter {

	@Override
	public Object convertFromString(Map context, String[] values, Class toClass) {
		String firstValue = values[0];

		String[] st = firstValue.split(";");

		String uername = st[0];
		String password = st[1];

		User user = new User();
		user.setUsername(uername);
		user.setPassword(password);

		return user;
	}

	@Override
	public String convertToString(Map context, Object o) {
		User user = (User) o;

		String username = user.getUsername();
		String password = user.getPassword();

		String userInfo = "Use StrutsTypeConverter converted from UserConverter2=>username: " + username
				+ ", password: " + password;
		return userInfo;
	}

}
```

### 类型转换配置 UserAction-conversion.properties

```properties
user=space.terwer.converter.UserConverter2
```

### 结果展示 output.jsp

```xml
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>  
  
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Struts2.3 converter result</title>
</head>
<body>
	<s:property value="user"/>
</body>
</html>
```

### 实际效果

![](https://img1.terwer.space/api/public/20221101225045.png)​

### 总结

可以使用 `Struts2`​ 框架自带的类型转换器 `StrutsTypeConverter`​ 简化类型转换代码的编写，`StrutsTypeConverter`​ 类继承于 `DefaultTypeConverter`​ 父类，并且提供了两个抽象方法： `convertFromString`​ 和 `convertToString`​ ，分别表示 **从页面额字符串转换为后台对象** 以及 **从后台对象转换为页面字符串** ，我们 **只需要实现这两个抽象方法即可实现类型转换** 。