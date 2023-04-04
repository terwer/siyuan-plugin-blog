---
title: Struts2类型转换之批量类型转换
short_title: ''
description: 输入页面inputjsppageencoding=userinfo_userinfo_userinfo_userinfo_流程跳转strutsxml!doctypestrutspublic业务处理action类useractionpackagespaceterwerstruts_importjavautillist_importcomopensymphonyxworkactionsupport_importspaceterwerbeanuser_publicclassuseractionextendsac
date: 2022-11-01 23:17:26
category:
  - Struts2
  - 后端开发
tag:
  - 输入
  - 流程
  - 跳转
  - 业务
  - 处理
  - 类型转换
  - 批量
  - multi
article: true
timeline: false
---
## 输入页面 input2.jsp

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

	

	<form action="userAction2.action">

		user info 1: <input type="text" name="user"/><br/>
		user info 2: <input type="text" name="user"/><br/>
		user info 3: <input type="text" name="user"/><br/>
		user info 4: <input type="text" name="user"/><br/>
	
		<input type="submit" value="submit"/>

	</form>

</body>
</html>
```

## 流程跳转 struts.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE struts PUBLIC
	"-//Apache Software Foundation//DTD Struts Configuration 2.3//EN"
	"http://struts.apache.org/dtds/struts-2.3.dtd">

<struts>

	<package name="struts2" extends="struts-default">
		<action name="userAction2" class="space.terwer.struts23.UserAction2">
			<result name="success">/output2.jsp</result>
		</action>
	</package>

</struts>
```

## 业务处理 Action 类 UserAction2

```java
package space.terwer.struts23;

import java.util.List;

import com.opensymphony.xwork2.ActionSupport;

import space.terwer.bean.User;

public class UserAction2 extends ActionSupport {

	private List<User> user;

	public List<User> getUser() {
		return user;
	}

	public void setUser(List<User> user) {
		this.user = user;
	}

	@Override
	public String execute() throws Exception {
		for (User u : this.getUser()) {
			System.out.println(u.getUsername() + "," + u.getPassword());
		}

		return SUCCESS;
	}

}
```

## 类型转换器 UserAction2-conversion.properties

```properties
user=space.terwer.converter.UserConverter3
```

```java
package space.terwer.converter;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;

import org.apache.struts2.util.StrutsTypeConverter;

import space.terwer.bean.User;

public class UserConverter3 extends StrutsTypeConverter {

	@Override
	public Object convertFromString(Map context, String[] values, Class toClass) {
		List<User> list = new ArrayList<>();

		for (String value : values) {
			StringTokenizer st = new StringTokenizer(value, ";");

			User user = new User();

			String username = st.nextToken();
			String pasword = st.nextToken();

			user.setUsername(username);
			user.setPassword(pasword);

			list.add(user);
		}

		return list;
	}

	@Override
	public String convertToString(Map context, Object o) {
		List<User> list = (List) o;

		StringBuilder sb = new StringBuilder();
		sb.append("[");

		for (int i = 0; i < list.size(); i++) {
			User user = list.get(i);
			sb.append("{username=" + user.getUsername());
			sb.append(",password=" + user.getPassword());
			sb.append("}");

			if (i < list.size() - 1) {
				sb.append(",");
			}
		}
		sb.append("]");

		return sb.toString();
	}

}
```

## 输出结果 output2.jsp

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

## 效果

![](https://img1.terwer.space/api/public/20221102001308.png)​

![](https://img1.terwer.space/api/public/20221102001353.png)​

大功告成。与单个不一样的地方只在于把对象换成了 `List`​ ，其他的类似。

‍