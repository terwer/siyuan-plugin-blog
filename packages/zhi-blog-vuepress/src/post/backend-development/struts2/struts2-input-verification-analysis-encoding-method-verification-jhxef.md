---
title: Struts2输入校验剖析之编码方式校验
short_title: ''
description: struts提供了两种校验方式。使用编码方式进行校验新建registerjsp页面pageencoding=%username_password_repassword_age_birthday_geaduation_%username_password_repassword_age_birthday_geaduation_%%流程处理的actionpackagespaceterwerstruts_importjavautilcalendar_importjavautildate_importcomopen
date: 2022-11-02 21:17:29
category:
  - Struts2
  - 后端开发
tag:
  - 方法
  - 错误
  - 集合
  - 校验
  - 进行
  - struts2
  - struts
  - code
  - validate
article: true
timeline: false
---
Struts2 提供了两种校验方式。

## 使用编码方式进行校验

### 新建 register.jsp 页面

```xml
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Register</title>
</head>
<body>
	<h2 style="color:blue;">用户注册</h2>

	<s:actionerror cssStyle="color:red;" />

	----------------------------------------------------------------------

	<%--
	<form action="register.action">
		username: <input type="text" name="username" size="20" /><br/>
		password: <input type="password" name="password" size="20" /><br/>
		repassword: <input type="password" name="repassword" size="20" /><br/>
		age: <input type="text" name="age" size="20" /><br/>
		birthday: <input type="text" name="birthday" size="20"/><br/>
		geaduation: <input type="text" name="graduation" size="20"/><br/>
	
		<input type="submit" value="submit"/>
	</form>
	 --%>

	<s:fielderror cssStyle="color:blue;"></s:fielderror>
	<s:form action="register" theme="simple">
		username:<s:textfield name="username" label="username"></s:textfield><br/>
		password: <s:password name="password" label="password"></s:password><br/>
		repassword: <s:password name="repassword" label="repassword"></s:password><br/>
		age: <s:textfield name="age" label="age"></s:textfield><br/>
		birthday: <s:textfield name="birthday" label="birthday"></s:textfield><br/>
		geaduation: <s:textfield name="graduation" label="graduation"></s:textfield><br/>
	
		<s:submit value="submit"></s:submit>
	</s:form>

	<%--
	<s:form action="register">
		<s:textfield name="username" label="username"></s:textfield>
		<s:password name="password" label="password"></s:password>
		<s:password name="repassword" label="repassword"></s:password>
		<s:textfield name="age" label="age"></s:textfield>
		<s:textfield name="birthday" label="birthday"></s:textfield>
		<s:textfield name="graduation" label="graduation"></s:textfield>
	
		<s:submit value="submit"></s:submit>
	</s:form>
	--%>
</body>
</html>
```

### 流程处理的 Action

```java
package space.terwer.struts23;

import java.util.Calendar;
import java.util.Date;

import com.opensymphony.xwork2.ActionSupport;

public class RegisterAction extends ActionSupport {
	private String username;
	private String password;
	private String repassword;
	private Integer age;
	private Date birthday;
	private Date graduation;

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

	public String getRepassword() {
		return repassword;
	}

	public void setRepassword(String repassword) {
		this.repassword = repassword;
	}

	public Integer getAge() {
		return age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	public Date getGraduation() {
		return graduation;
	}

	public void setGraduation(Date graduation) {
		this.graduation = graduation;
	}

	@Override
	public void validate() {
		// System.out.println("validate incoked");

		if (null == this.getUsername() || this.getUsername().length() < 4 || this.getUsername().length() > 6) {
			this.addActionError("username invalid");
		
			this.addFieldError("username", "username invalid in field");
			this.addFieldError("username", "username invalid in field2");
		}

		if (null == this.getPassword() || this.getPassword().length() < 4 || this.getPassword().length() > 6) {
			this.addActionError("password invalid");
		} else if (null == this.getRepassword() || this.getRepassword().length() < 4
				|| this.getRepassword().length() > 6) {
			this.addActionError("repassword invalid");
		} else if (!this.getPassword().equals(this.getRepassword())) {
			this.addActionError("the passwords not same");
		}

		if (this.getAge() < 10 || this.getAge() > 50) {
			this.addActionError("age invalid");
		}

		if (null == this.getBirthday()) {
			this.addActionError("birthday invalid");
		}

		if (null == this.getGraduation()) {
			this.addActionError("graduation invalid");
		}

		if (null != this.getBirthday() && null != this.getGraduation()) {
			Calendar c1 = Calendar.getInstance();
			c1.setTime(this.getBirthday());

			Calendar c2 = Calendar.getInstance();
			c2.setTime(this.getGraduation());

			if (c1.after(c2)) {
				this.addActionError("birthday should be before graduation");
			}
		}

		// 注意：这样不行
		// this.getFieldErrors().clear();
		// this.getActionErrors().clear();
	
		// 下面的代码可以直接清空错误，直接跳转
		// this.clearFieldErrors();
		// this.clearActionErrors();
	
		System.out.println("error cleared");
	}

	@Override
	public String execute() throws Exception {
		// System.out.println("execute invoked");
		return SUCCESS;
	}
}
```

### 流程处理 struts.xml

```xml
<action name="register" class="space.terwer.struts23.RegisterAction">
	<result name="success">/registerResult.jsp</result>
	<result name="input">/register.jsp</result>
</action>
```

### 结果页面 registerResult.jsp

```xml
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>  
  
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Register result</title>
</head>
<body>
	username: <s:property value="username"/><br/>
	password: <s:property value="password"/><br/>
	age: <s:property value="age"/><br/>
	birthday: <s:property value="birthday"/><br/>
	graduation: <s:property value="graduation"/><br/>
</body>
</html>
```

### 效果

![](https://img1.terwer.space/api/public/20221102230216.png)​

加入字段校验之后

![](https://img1.terwer.space/api/public/20221102233817.png)​

### 总结

1. 执行流程：然后进行输入校验（执行 `validate`​ 方法）

   1. 首先进行类转换
   2. 然后进行输入校验（执行 `validate`​ 方法）
   3. 如果在上述过程中出现了任何错误，都不会再去执行 `execute`​ 方法，页面会转向 `struts.xml`​ 该 `Action`​ 的名为 `input`​ 的 `result`​ 所对应的页面。

2. ​`ActionSupport`​​​ 类的 `addActionError()`​​​ 方法的视线：首先创建一个 `ArrayList`​​​ 对象，然后将错误消息添加到该 `ArrayList`​​​ 对象中。
3. 当调用 `getActionErrors()`​ 方法返回 `Action`​ 级别的错误信息列表时，返回的实际上是集合的一个副本，而非原集合中的元素，因此对集合副本调用 clear() 方法清除的依旧是副本中的元素而非原集合中的元素，此时原集合中的元素没有受到任何影响。

   如果需要清空，可以调用

   注意：清空错误的方法不能使用 `clearActionErrors()`​ ，这个操作的是错误对象列表。

   ```java
   // 注意：这样不行
   this.getFieldErrors().clear();
   this.getActionErrors().clear();
   ```

   必须使用

   ```java
   // 下面的代码可以直接清空错误，直接跳转
   this.clearFieldErrors();
   this.clearActionErrors();
   ```

   ![](https://img1.terwer.space/api/public/20221103001240.png)​

10. ​`FieldError`​ 级别的错误信息底层是用 `LinkedHashMap`​ 实现的，该 `Map`​ 的 `key`​ 是 `String`​ 类型， `value`​ 是 `List<String>`​ 类型，这表示一个 `Field Name`​ 可以对应多条错误信息，这些错误信息都放置在 `List<String>`​ 集合中。