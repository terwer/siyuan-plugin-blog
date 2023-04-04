---
title: Struts2的类型转换
short_title: ''
description: 使用标签注意_struts使用标签库找不到uri_[strutstags]的taglib[s]问题解决新建loginjsp​文件内容如下_pageencoding=查看结果_​在action中使用actionsupport新增页面​loginjsp​pageencoding=​loginactionjava​packagespaceterwer_importorgapachecommonslangstringutils_importcomopensymphonyxworkactionsupport_pub
date: 2022-10-30 01:26:18
category:
  - Struts2
  - 后端开发
tag:
  - 使用
  - 标签
  - 注意
  - 转换
  - struts
  - struts2
  - taglib
  - convert
  - validate
article: true
timeline: false
---
## 使用标签

注意：[Struts2使用标签库找不到URI:[struts-tags]的taglib[s]问题解决](https://www.terwer.space/post/struts2-can-not-find-uri-strutstags-taglib-s-problem-solving-z1gd2lw.html)

新建 `login2.jsp`​ 文件，内容如下：

```xml
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Struts2.3 Login2</title>
</head>
<body>
	<s:form action="login">
		<s:textfield name="username" label="username"></s:textfield>
		<s:textfield name="password" label="password"></s:textfield>
		<s:submit label="submit"></s:submit>
	</s:form>
</body>
</html>
```

查看结果：

![](https://img1.terwer.space/api/public/20221030150148.png)​

## 在 Action 中使用 ActionSupport

### 新增页面

​`login3.jsp`​

```xml
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Struts2.3 Login3</title>
</head>
<body>
	<s:form action="login3">
		<s:textfield name="username" label="username"></s:textfield>
		<s:textfield name="password" label="password"></s:textfield>
		<s:submit label="submit"></s:submit>
	</s:form>
</body>
</html>
```

​`LoginAction3.java`​

```java
package space.terwer;

import org.apache.commons.lang3.StringUtils;

import com.opensymphony.xwork2.ActionSupport;

public class LoginAction3 extends ActionSupport{
	private String username;
	private String password;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public void validate() {
		if(StringUtils.isBlank(this.getUsername())) {
			this.addFieldError("username", "username required");
		}
		if(StringUtils.isBlank(this.getPassword())) {
			this.addFieldError("password", "password required");
		}
	}

	public String execute() {
		return "success";
	}
}
```

### 修改 struts.xml 添加校验跳转 input

​`struts.xml`​

```xml
<!-- 使用ActionSupport -->
<action name="login3" class="space.terwer.LoginAction3">
	<result name="success">/result.jsp</result>
	<result name="input">/login3.jsp</result>
</action>
```

### 效果

![](https://img1.terwer.space/api/public/20221030152838.png)​

## 业务验证

在 `LoginAction2.java`​ 的 `execute()`​ 方法添加验证逻辑

```java
public String execute() {
	if("hello".equals(this.getUsername().trim()) && "world".equals(this.getPassword().trim())){
		return "success";
	}

	this.addFieldError("username", "username or password error");
	return "failer";
}
```

在 `struts.xml`​ 加入跳转逻辑

```xml
<!-- 使用ActionSupport -->
<action name="login3" class="space.terwer.LoginAction3">
	<result name="success">/result.jsp</result>
	<result name="input">/login3.jsp</result>
	<result name="failer">/login3.jsp</result>
</action>
```

效果

![](https://img1.terwer.space/api/public/20221030153959.png)​

注意：`result.jsp`​ 里面的两种写法等价。

```xml
username:${requestScope.username}<br /> 
password:${requestScope.password }
```

```xml
username:<%=request.getParameter("username") %><br /> 
password:<%=request.getParameter("password") %>
```

## 类型转换深入

### 新建一个 input.jsp

```xml
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
  
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Struts2.3 convert test</title>
</head>
<body>

	<h3 style="color:red;">使用逗号将点的两个坐标分隔开</h3>
	<s:form action="pointConverter">
		<s:textfield name="point" label="point"></s:textfield>
		<s:textfield name="age" label="age"></s:textfield>
		<s:textfield name="username" label="username"></s:textfield>
		<s:textfield name="date" label="birthday"></s:textfield>
	
		<s:submit value="Submit"></s:submit>
	</s:form>
</body>
</html>
```

![](https://img1.terwer.space/api/public/20221030173954.png)​

### Point 对象

新建一个 `bean`​ 为 `Point.java`​

```java
package space.terwer.bean;

public class Point {
	private Integer x;
	private Integer y;

	public Integer getX() {
		return x;
	}

	public void setX(Integer x) {
		this.x = x;
	}

	public Integer getY() {
		return y;
	}

	public void setY(Integer y) {
		this.y = y;
	}
}

```

### OGNL 官网

[https://commons.apache.org/proper/commons-ognl/](https://commons.apache.org/proper/commons-ognl/)

新的官网

[https://github.com/apache/commons-ognl](https://github.com/apache/commons-ognl)

### 新建一个类型转换器类 PointConverter

```java
package space.terwer.converter;

import java.util.Map;

import ognl.DefaultTypeConverter;
import space.terwer.bean.Point;

public class PointConverter extends DefaultTypeConverter {

	@Override
	public Object convertValue(Map context, Object value, Class toType) {
		if (Point.class == toType) {
			Point point = new Point();

			String[] str = (String[]) value;
			String[] paramValues = str[0].split(",");

			Integer x = new Integer(paramValues[0]);
			Integer y = new Integer(paramValues[1]);

			point.setX(x);
			point.setY(y);

			return point;
		}

		if (String.class == toType) {
			Point point = (Point) value;

			int x = point.getX();
			int y = point.getY();

			String result = "[x=" + x + ", y=" + y + "]";

			return result;
		}

		return null;
	}

}
```

### 新建一个 PointAction 处理类

```java
package space.terwer.action;

import java.util.Date;

import com.opensymphony.xwork2.ActionSupport;

import space.terwer.bean.Point;

public class PointAction extends ActionSupport {
	private Point point;
	private Integer age;
	private String username;
	private Date date;

	public Point getPoint() {
		return point;
	}

	public void setPoint(Point point) {
		this.point = point;
	}

	public Integer getAge() {
		return age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	@Override
	public String execute() throws Exception {
		return SUCCESS;
	}
}
```

### struts.xml 添加处理流程配置：

```xml
<action name="pointConverter" class="space.terwer.action.PointAction">
	<result name="success">/output.jsp</result>
</action>
```

### 新增转换器配置

必须在当前 Action 同级目录新建 `Action类名-conversion.properties`​ ，例如：

```properties
PointAction-conversion.properties
```

内容为 `需要转换的属性名称`​ 和 `转换器全路径`​ ，例如本例子内容如下：

```properties
point=space.terwer.converter.PointConverter
```

重启服务器。

**特别指出：转换器文件前面必须是Action类名，后缀必须是：**

```properties
-conversion.properties
```

![](https://img1.terwer.space/api/public/20221030202115.png)​

### output.jsp 显示页面

```xml
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>  
  
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Point result</title>
</head>
<body>

	point:<s:property value="point" /><br/>
	age:<s:property value="age" /><br/>
	username:<s:property value="username" /><br/>
	date:<s:property value="date" />

</body>
</html>
```

### 查看效果

![](https://img1.terwer.space/api/public/20221030201629.png)​