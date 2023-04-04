---
title: 使用MyEclipse2022-1搭建Maven版本的Struts2-3项目
short_title: ''
description: myeclipse下载推荐直接到官网下载不要去其他地方下载避免一些被加载了病毒的安装包。备用下载与破解包下载_链接_https_panbaiducomsgplslejajhpqhrvwhig请发邮件至youweics@com获取提取码破解解压查看readmetxt搭建struts的maven版项目struts下载https_archiveapacheorgdiststrutsstrutsallzip备注_使用eclipse也可以。新建项目注意版本选择_javaee_webjdk_jstl_后面的tomca
date: 2022-10-25 14:45:46
category:
  - Struts2
  - 后端开发
tag:
  - 下载
  - 推荐
  - struts
  - struts2
  - struts2-3
  - web
  - j2ee
  - javaee
  - maven
  - myeclipse
article: true
timeline: false
---
## MyEclipse 2022.1

## 下载

 推荐直接到官网下载，不要去其他地方下载，避免一些被加载了病毒的安装包。

备用下载与破解包下载：

链接: [https://pan.baidu.com/s/1gPlSLEJa1jhpQhrvWhI3-g](https://pan.baidu.com/s/1gPlSLEJa1jhpQhrvWhI3-g) 请发邮件至 youweics@163.com 获取提取码

## 破解

解压查看 readme.txt

## 搭建 struts2.3 的 Maven 版项目

### struts 2.3.37 下载

[https://archive.apache.org/dist/struts/2.3.37/struts-2.3.37-all.zip](https://archive.apache.org/dist/struts/2.3.37/struts-2.3.37-all.zip)

备注：使用 Eclipse 2022.9 也可以。

### 新建项目

注意版本选择：

JavaEE：6，Web3.0

JDK：1.7

JSTL：1.2.1

后面的 Tomcat 我们使用 Tomcat7

**勾上Maven支持**

![](https://img1.terwer.space/api/public/20221030002220.png)​

### 配置 pom.xml

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<groupId>struts23m</groupId>
	<artifactId>struts23m</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<packaging>war</packaging>
	<name>struts23m</name>
	<description />
	<properties>
		<webVersion>3.0</webVersion>
		<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
	</properties>
	<dependencies>
		<dependency>
			<groupId>org.glassfish</groupId>
			<artifactId>bean-validator</artifactId>
			<version>3.0-JBoss-4.0.2</version>
			<scope>provided</scope>
		</dependency>
		<dependency>
			<groupId>org.glassfish</groupId>
			<artifactId>javax.enterprise.deploy</artifactId>
			<version>3.0.1</version>
			<scope>provided</scope>
		</dependency>
		<dependency>
			<groupId>org.glassfish</groupId>
			<artifactId>javax.jms</artifactId>
			<version>3.0.1</version>
			<scope>provided</scope>
		</dependency>
		<dependency>
			<groupId>org.glassfish</groupId>
			<artifactId>javax.management.j2ee</artifactId>
			<version>3.0.1</version>
			<scope>provided</scope>
		</dependency>
		<dependency>
			<groupId>org.eclipse.persistence</groupId>
			<artifactId>javax.persistence</artifactId>
			<version>2.0.0</version>
			<scope>provided</scope>
		</dependency>
		<dependency>
			<groupId>org.glassfish</groupId>
			<artifactId>javax.resource</artifactId>
			<version>3.0.1</version>
			<scope>provided</scope>
		</dependency>
		<dependency>
			<groupId>org.glassfish</groupId>
			<artifactId>javax.security.auth.message</artifactId>
			<version>3.0.1</version>
			<scope>provided</scope>
		</dependency>
		<dependency>
			<groupId>org.glassfish</groupId>
			<artifactId>javax.security.jacc</artifactId>
			<version>3.0.1</version>
			<scope>provided</scope>
		</dependency>
		<dependency>
			<groupId>org.glassfish</groupId>
			<artifactId>javax.servlet</artifactId>
			<version>3.0.1</version>
			<scope>provided</scope>
		</dependency>
		<dependency>
			<groupId>org.glassfish</groupId>
			<artifactId>javax.servlet.jsp</artifactId>
			<version>3.0.1</version>
			<scope>provided</scope>
		</dependency>
		<dependency>
			<groupId>org.glassfish</groupId>
			<artifactId>javax.servlet.jsp.jstl</artifactId>
			<version>3.0.1</version>
			<scope>provided</scope>
		</dependency>
		<dependency>
			<groupId>javax.xml.bind</groupId>
			<artifactId>jaxb-api-osgi</artifactId>
			<version>2.2.1</version>
			<scope>provided</scope>
		</dependency>
		<dependency>
			<groupId>javax.ws.rs</groupId>
			<artifactId>jsr311-api</artifactId>
			<version>1.1.1</version>
			<scope>provided</scope>
		</dependency>
		<dependency>
			<groupId>org.glassfish.web</groupId>
			<artifactId>jstl-impl</artifactId>
			<version>1.2</version>
			<scope>provided</scope>
		</dependency>
		<dependency>
			<groupId>javax.mail</groupId>
			<artifactId>mail</artifactId>
			<version>1.4.3</version>
			<scope>provided</scope>
		</dependency>
		<dependency>
			<groupId>javax.xml</groupId>
			<artifactId>webservices-api-osgi</artifactId>
			<version>2.0.1</version>
			<scope>provided</scope>
		</dependency>
		<dependency>
			<groupId>org.jboss.weld</groupId>
			<artifactId>weld-osgi-bundle</artifactId>
			<version>1.0.1-SP3</version>
			<scope>provided</scope>
		</dependency>
		<dependency>
			<groupId>org.glassfish.web</groupId>
			<artifactId>javax.servlet.jsp.jstl</artifactId>
			<version>1.2.1</version>
		</dependency>

		<!-- struts2 -->
		<dependency>
			<groupId>org.apache.struts</groupId>
			<artifactId>struts2-core</artifactId>
			<version>2.3.37</version>
		</dependency>
	</dependencies>
	<build>
		<plugins>
			<plugin>
				<artifactId>maven-compiler-plugin</artifactId>
				<version>2.3.2</version>
				<configuration>
					<source>1.7</source>
					<target>1.7</target>
				</configuration>
			</plugin>
			<plugin>
				<artifactId>maven-war-plugin</artifactId>
				<version>3.2.3</version>
				<configuration>
					<failOnMissingWebXml>false</failOnMissingWebXml>
				</configuration>
			</plugin>
		</plugins>
	</build>
</project>
```

### 登录页面 login.jsp

```xml
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Struts2.3 Login</title>
</head>
<body>
	<form action="login.action">
		username:<input type="text" name="username" /><br /> 
		password:<input type="password" name="password" /><br /> 
		<input type="submit" value="submit" />
	</form>
</body>
</html>
```

### struts.xml 流程处理

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE struts PUBLIC
	"-//Apache Software Foundation//DTD Struts Configuration 2.3//EN"
	"http://struts.apache.org/dtds/struts-2.3.dtd">

<struts>

	<package name="struts2" extends="struts-default">
		<action name="login" class="space.terwer.LoginAction">
			<result name="success">/result.jsp</result>
		</action>
	</package>

</struts>
```

### 登录逻辑处理类 LoginAction.java

```java
package space.terwer;

public class LoginAction {
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

	public String execute() {
		return "success";
	}
}
```

### 结果显示页面 result.jsp

```xml
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Struts2.3 Result</title>
</head>
<body>
	username:${requestScope.username}<br /> 
	password:${requestScope.password }
</body>
</html>
```

### 部署并启动Tomcat

**备注**

使用 `MyEclipse Tomcat9.0`​ 或者自己配置 `Tomcat7`​ 运行都可以。推荐使用前者，部署更便捷。成功启动可以看到类似下面的启动日志：

```plaintext
10月 30, 2022 1:23:52 上午 com.opensymphony.xwork2.util.logging.jdk.JdkLogger info
信息: Parsing configuration file [struts-default.xml]
10月 30, 2022 1:23:53 上午 com.opensymphony.xwork2.util.logging.jdk.JdkLogger info
信息: Unable to locate configuration files of the name struts-plugin.xml, skipping
10月 30, 2022 1:23:53 上午 com.opensymphony.xwork2.util.logging.jdk.JdkLogger info
信息: Parsing configuration file [struts-plugin.xml]
10月 30, 2022 1:23:53 上午 com.opensymphony.xwork2.util.logging.jdk.JdkLogger info
信息: Parsing configuration file [struts.xml]
```

页面效果：

![](https://img1.terwer.space/api/public/20221030010417.png)​