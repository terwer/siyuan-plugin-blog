---
title: Struts2-3的独有特性与StrutsPrepareAndExecute过滤器源码分析
short_title: ''
description: action后缀​action​会自动加上action​例如和效果一样。​其他类型转换loginaction新增两个属性privateintegerage_privatedatedate_publicintegergetage(){returnage_}publicvoidsetage(integerage){thisage=age_}publicdategetdate(){returndate_}publicvoidsetdate(datedate){thisdate=date_}loginjsp年龄_
date: 2022-10-25 00:06:54
category:
  - Struts2
  - 后端开发
tag:
  - 执行
  - 之后
  - 对应
  - 请求
  - struts
  - struts2
  - filter
  - 过滤器
  - 启动流程
article: true
timeline: false
---
## action 后缀

​`action`​ 会自动加上 `.action`​ ，例如

```html
<form action="login">
</form>
```

和

```html
<form action="login.action">
</form>
```

效果一样。

![](https://img1.terwer.space/api/public/20221025014003.png)​

## 其他类型转换

LoginAction 新增两个属性

```java
private Integer age;
private Date date;

public Integer getAge() {
	return age;
}

public void setAge(Integer age) {
	this.age = age;
}

public Date getDate() {
	return date;
}

public void setDate(Date date) {
	this.date = date;
}
```

login.jsp

```html
年龄：<input type="text" name="age" /><br />
日期：<input type="text" name="date" /><br />
```

result.jsp

```html
年龄：${requestScope.age }<br />
日期：${requestScope.date }<br />
```

效果

![](https://img1.terwer.space/api/public/20221030171421.png)​

## Struts2 的基本执行流程

1. 用户浏览器输入入口页面地址。例如：[http://localhost:8080/struts23/login.jsp]()
2. 输入表单信息之后，点击提交，通过 form 的 action，进行对应跳转。

   ```html
   <form action="login.action">
   ```
3. 我们这里是 login，那么，就会去 struts.xml 寻找 name="login" 的 action 节点

   ```xml
   <package name="struts2" extends="struts-default">
   	<action name="login" class="space.terwer.struts23.LoginAction">
   		<result name="success">/result.jsp</result>
   	</action>
   </package>
   ```

   找到之后，实例化 class 配置的 Action 处理类。

   然后执行对应的 setXXX 方法进行属性赋值，接着执行 Action 里面的 execute 方法：

   ```java
   public String execute() {
   	return "success";
   }
   ```

4. 执行完成之后，根据返回值去 struts.xml 找到对应的跳转视图，我们这里是 result.jsp，然后显示最终结果。

   ![](https://img1.terwer.space/api/public/20221030172553.png)​

**注意：Struts2 每次请求都会生成一个 Action 的对象。这与 Servlet 不同，Servlet 是每个请求共享一个对象，Struts2 的 Action 是每次请求都生成一个新对象。**

Struts1 的处理方式与 Servlet 类似。

‍