---
title: Struts2-3环境准备以及构建第一个Struts2-3的hello-word项目
short_title: ''
description: myeclipse下载myeclipse下载地址链接_https_panbaiducomsxabceuwgnlnthgniaamq请发邮件至youweics@com获取提取码以及破解教程struts下载https_archiveapacheorgdiststrutsstrutsallzip备用下载链接_https_panbaiducomsauftabecimgasgyhw请发邮件至youweics@com获取提取码注意_struts之后最低需要jdkmyeclipse只支持jdk因此只能用strutsto
date: 2022-10-24 21:44:05
category:
  - Struts2
  - 后端开发
tag:
  - 下载
  - 链接
  - struts2
  - myeclipse
  - hello-world
  - tomcat
  - jdk
  - java
article: true
timeline: false
---
## MyEclipse8.6 下载

MyEclipse8.6 下载地址链接: [https://pan.baidu.com/s/1XABCEUwg6NLNThgniAA1mQ](https://pan.baidu.com/s/1XABCEUwg6NLNThgniAA1mQ)，请发邮件至 youweics@163.com 获取提取码以及破解教程

## struts2.3 下载

[https://archive.apache.org/dist/struts/2.3.37/struts-2.3.37-all.zip](https://archive.apache.org/dist/struts/2.3.37/struts-2.3.37-all.zip)

备用下载链接: [https://pan.baidu.com/s/1au9ftAbE4CI3mgA8sg6yhw](https://pan.baidu.com/s/1au9ftAbE4CI3mgA8sg6yhw) ，请发邮件至 youweics@163.com 获取提取码

注意：struts2.5 之后最低需要 jdk7，myeclipse8.6 只支持 jdk1.6，因此只能用 struts2.3

## tomcat6 下载

[https://archive.apache.org/dist/tomcat/tomcat-6/v6.0.53/bin/apache-tomcat-6.0.53.zip](https://archive.apache.org/dist/tomcat/tomcat-6/v6.0.53/bin/apache-tomcat-6.0.53.zip)

备用链接: [https://pan.baidu.com/s/1eJwKUVouUgZLFTkTFAM_pg](https://pan.baidu.com/s/1eJwKUVouUgZLFTkTFAM_pg)，请发邮件至 youweics@163.com 获取提取码

## 开始第一个 Struts2.3 的 Hello World

1. 配置 MyEclipse 的 jdk，注意 jdk 选择 jdk1.6

   位置：

   Windows -> preferences -> Java -> Installed JREs

   ![](https://img1.terwer.space/api/public/20221025011834.png)​
2. 打开 myeclipse8.6，新建一个 Web project

   ![](https://img1.terwer.space/api/public/20221025011018.png)​

3. 复制 struts2.3 需要的 jar 包到 WEB-INF/lib 目录

   jar 包分别是：

   ```plaintext
   commons-fileupload-1.4.jar
   commons-io-2.2.jar
   commons-lang3-3.2.jar
   freemarker-2.3.28.jar
   javassist-3.11.0.GA.jar
   ognl-3.0.21.jar
   struts2-core-2.3.37.jar
   xwork-core-2.3.37.jar
   ```

   ![](https://img1.terwer.space/api/public/20221025011327.png)​

4. 配置 web.xml，添加 struts2 的过滤器

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <web-app version="2.5" 
   	xmlns="http://java.sun.com/xml/ns/javaee" 
   	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
   	xsi:schemaLocation="http://java.sun.com/xml/ns/javaee 
   	http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd">

   	<filter>
   		<filter-name>struts2</filter-name>
   		<filter-class>org.apache.struts2.dispatcher.ng.filter.StrutsPrepareAndExecuteFilter</filter-class>
   	</filter>

   	<filter-mapping>
   		<filter-name>struts2</filter-name>
   		<url-pattern>/*</url-pattern>
   	</filter-mapping>

   </web-app>
   ```

5. 在 src 目录添加 Action 处理逻辑

   ```java
   package space.terwer.struts2;

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

   	public String execute(){
   		return "success";
   	}
   }

   ```
6. 在 src 目录新建 struts.xml，配置 struts.xml，加上登录流程

   ```xml
   <?xml version="1.0" encoding="UTF-8" ?>
   <!DOCTYPE struts PUBLIC
   	"-//Apache Software Foundation//DTD Struts Configuration 2.3//EN"
   	"http://struts.apache.org/dtds/struts-2.3.dtd">

   <struts>

   	<package name="struts2" extends="struts-default">
   		<action name="login" class="space.terwer.struts2.LoginAction">
   			<result name="success">/result.jsp</result>
   		</action>
   	</package>

   </struts>
   ```
7. 新建登录页面 login.jsp，加上表单提交逻辑

   ```html
   <%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
   <%
   	String path = request.getContextPath();
   	String basePath = request.getScheme() + "://"
   			+ request.getServerName() + ":" + request.getServerPort()
   			+ path + "/";
   %>

   <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
   <html>
   	<head>
   		<base href="<%=basePath%>">

   		<title>My JSP 'login.jsp' starting page</title>

   		<meta http-equiv="pragma" content="no-cache">
   		<meta http-equiv="cache-control" content="no-cache">
   		<meta http-equiv="expires" content="0">
   		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
   		<meta http-equiv="description" content="This is my page">
   		<!--
   	<link rel="stylesheet" type="text/css" href="styles.css">
   	-->

   	</head>

   	<body>
   		<form action="login">
   			用户名：
   			<input type="text" name="username" />
   			<br />
   			密码：
   			<input type="password" name="password" />
   			<br />

   			<input type="submit" value="提交" />

   		</form>
   	</body>
   </html>
   ```
8. 添加结果页面 result.jsp

   ```html
   <%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
   <%
   	String path = request.getContextPath();
   	String basePath = request.getScheme() + "://"
   			+ request.getServerName() + ":" + request.getServerPort()
   			+ path + "/";
   %>

   <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
   <html>
   	<head>
   		<base href="<%=basePath%>">

   		<title>My JSP 'reault.jsp' starting page</title>

   		<meta http-equiv="pragma" content="no-cache">
   		<meta http-equiv="cache-control" content="no-cache">
   		<meta http-equiv="expires" content="0">
   		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
   		<meta http-equiv="description" content="This is my page">
   		<!--
   		<link rel="stylesheet" type="text/css" href="styles.css">
   		-->

   	</head>

   	<body>
   		用户名：${requestScope.username}
   		<br />
   		密码：${requestScope.password }
   	</body>
   </html>
   ```
9. 部署到 tomcat

   **添加tomcat到MyEclipse**

   Windows -> Preferences -> MyEclispe -> Tomcat -> Tomcat 6.x

   ![](https://img1.terwer.space/api/public/20221025013234.png)​

   **部署到tomcat**

   可以直接修改 tomcat 的 conf/server.xml，在 Host 节点加上部署代码：

   ```xml
   <Context path="/struts2" docBase="C:\Users\terwer\Documents\MyEclipse86Workspace\struts2\WebRoot" reloadable="true" />
   ```

10. 启动 tomcat

    ```plaintext
    2022-10-25 2:26:25 org.apache.catalina.core.AprLifecycleListener init
    信息: The APR based Apache Tomcat Native library which allows optimal performance in production environments was not found on the java.library.path: C:\Program Files\Java\jdk1.6.0_45\bin;C:\Software\apache-tomcat-6.0.53\bin
    2022-10-25 2:26:25 org.apache.coyote.http11.Http11Protocol init
    信息: Initializing Coyote HTTP/1.1 on http-8080
    2022-10-25 2:26:25 org.apache.catalina.startup.Catalina load
    信息: Initialization processed in 302 ms
    2022-10-25 2:26:25 org.apache.catalina.core.StandardService start
    信息: Starting service Catalina
    2022-10-25 2:26:25 org.apache.catalina.core.StandardEngine start
    信息: Starting Servlet Engine: Apache Tomcat/6.0.53
    2022-10-25 2:26:26 com.opensymphony.xwork2.util.logging.jdk.JdkLogger info
    信息: Parsing configuration file [struts-default.xml]
    2022-10-25 2:26:26 com.opensymphony.xwork2.util.logging.jdk.JdkLogger info
    信息: Unable to locate configuration files of the name struts-plugin.xml, skipping
    2022-10-25 2:26:26 com.opensymphony.xwork2.util.logging.jdk.JdkLogger info
    信息: Parsing configuration file [struts-plugin.xml]
    2022-10-25 2:26:26 com.opensymphony.xwork2.util.logging.jdk.JdkLogger info
    信息: Parsing configuration file [struts.xml]
    2022-10-25 2:26:26 com.opensymphony.xwork2.util.logging.jdk.JdkLogger info
    信息: Choosing bean (struts) for (com.opensymphony.xwork2.ObjectFactory)
    2022-10-25 2:26:26 com.opensymphony.xwork2.util.logging.jdk.JdkLogger info
    信息: Choosing bean (struts) for (com.opensymphony.xwork2.factory.ActionFactory)
    2022-10-25 2:26:26 com.opensymphony.xwork2.util.logging.jdk.JdkLogger info
    信息: Choosing bean (struts) for (com.opensymphony.xwork2.factory.ResultFactory)
    2022-10-25 2:26:26 com.opensymphony.xwork2.util.logging.jdk.JdkLogger info
    信息: Choosing bean (struts) for (com.opensymphony.xwork2.factory.ConverterFactory)
    2022-10-25 2:26:26 com.opensymphony.xwork2.util.logging.jdk.JdkLogger info
    信息: Choosing bean (struts) for (com.opensymphony.xwork2.factory.InterceptorFactory)
    2022-10-25 2:26:26 com.opensymphony.xwork2.util.logging.jdk.JdkLogger info
    信息: Choosing bean (struts) for (com.opensymphony.xwork2.factory.ValidatorFactory)
    2022-10-25 2:26:26 com.opensymphony.xwork2.util.logging.jdk.JdkLogger info
    信息: Choosing bean (struts) for (com.opensymphony.xwork2.factory.UnknownHandlerFactory)
    2022-10-25 2:26:26 com.opensymphony.xwork2.util.logging.jdk.JdkLogger info
    信息: Choosing bean (struts) for (com.opensymphony.xwork2.FileManagerFactory)
    2022-10-25 2:26:26 com.opensymphony.xwork2.util.logging.jdk.JdkLogger info
    信息: Choosing bean (struts) for (com.opensymphony.xwork2.conversion.impl.XWorkConverter)
    2022-10-25 2:26:26 com.opensymphony.xwork2.util.logging.jdk.JdkLogger info
    信息: Choosing bean (struts) for (com.opensymphony.xwork2.conversion.impl.CollectionConverter)
    2022-10-25 2:26:26 com.opensymphony.xwork2.util.logging.jdk.JdkLogger info
    信息: Choosing bean (struts) for (com.opensymphony.xwork2.conversion.impl.ArrayConverter)
    2022-10-25 2:26:26 com.opensymphony.xwork2.util.logging.jdk.JdkLogger info
    信息: Choosing bean (struts) for (com.opensymphony.xwork2.conversion.impl.DateConverter)
    2022-10-25 2:26:26 com.opensymphony.xwork2.util.logging.jdk.JdkLogger info
    信息: Choosing bean (struts) for (com.opensymphony.xwork2.conversion.impl.NumberConverter)
    2022-10-25 2:26:26 com.opensymphony.xwork2.util.logging.jdk.JdkLogger info
    信息: Choosing bean (struts) for (com.opensymphony.xwork2.conversion.impl.StringConverter)
    2022-10-25 2:26:26 com.opensymphony.xwork2.util.logging.jdk.JdkLogger info
    信息: Choosing bean (struts) for (com.opensymphony.xwork2.conversion.ConversionPropertiesProcessor)
    2022-10-25 2:26:26 com.opensymphony.xwork2.util.logging.jdk.JdkLogger info
    信息: Choosing bean (struts) for (com.opensymphony.xwork2.conversion.ConversionFileProcessor)
    2022-10-25 2:26:26 com.opensymphony.xwork2.util.logging.jdk.JdkLogger info
    信息: Choosing bean (struts) for (com.opensymphony.xwork2.conversion.ConversionAnnotationProcessor)
    2022-10-25 2:26:26 com.opensymphony.xwork2.util.logging.jdk.JdkLogger info
    信息: Choosing bean (struts) for (com.opensymphony.xwork2.conversion.TypeConverterCreator)
    2022-10-25 2:26:26 com.opensymphony.xwork2.util.logging.jdk.JdkLogger info
    信息: Choosing bean (struts) for (com.opensymphony.xwork2.conversion.TypeConverterHolder)
    2022-10-25 2:26:26 com.opensymphony.xwork2.util.logging.jdk.JdkLogger info
    信息: Choosing bean (struts) for (com.opensymphony.xwork2.TextProvider)
    2022-10-25 2:26:26 com.opensymphony.xwork2.util.logging.jdk.JdkLogger info
    信息: Choosing bean (struts) for (com.opensymphony.xwork2.LocaleProvider)
    2022-10-25 2:26:26 com.opensymphony.xwork2.util.logging.jdk.JdkLogger info
    信息: Choosing bean (struts) for (com.opensymphony.xwork2.ActionProxyFactory)
    2022-10-25 2:26:26 com.opensymphony.xwork2.util.logging.jdk.JdkLogger info
    信息: Choosing bean (struts) for (com.opensymphony.xwork2.conversion.ObjectTypeDeterminer)
    2022-10-25 2:26:26 com.opensymphony.xwork2.util.logging.jdk.JdkLogger info
    信息: Choosing bean (struts) for (org.apache.struts2.dispatcher.mapper.ActionMapper)
    2022-10-25 2:26:26 com.opensymphony.xwork2.util.logging.jdk.JdkLogger info
    信息: Choosing bean (jakarta) for (org.apache.struts2.dispatcher.multipart.MultiPartRequest)
    2022-10-25 2:26:26 com.opensymphony.xwork2.util.logging.jdk.JdkLogger info
    信息: Choosing bean (struts) for (org.apache.struts2.views.freemarker.FreemarkerManager)
    2022-10-25 2:26:26 com.opensymphony.xwork2.util.logging.jdk.JdkLogger info
    信息: Choosing bean (struts) for (org.apache.struts2.components.UrlRenderer)
    2022-10-25 2:26:26 com.opensymphony.xwork2.util.logging.jdk.JdkLogger info
    信息: Choosing bean (struts) for (com.opensymphony.xwork2.validator.ActionValidatorManager)
    2022-10-25 2:26:26 com.opensymphony.xwork2.util.logging.jdk.JdkLogger info
    信息: Choosing bean (struts) for (com.opensymphony.xwork2.util.ValueStackFactory)
    2022-10-25 2:26:26 com.opensymphony.xwork2.util.logging.jdk.JdkLogger info
    信息: Choosing bean (struts) for (com.opensymphony.xwork2.util.reflection.ReflectionProvider)
    2022-10-25 2:26:26 com.opensymphony.xwork2.util.logging.jdk.JdkLogger info
    信息: Choosing bean (struts) for (com.opensymphony.xwork2.util.reflection.ReflectionContextFactory)
    2022-10-25 2:26:26 com.opensymphony.xwork2.util.logging.jdk.JdkLogger info
    信息: Choosing bean (struts) for (com.opensymphony.xwork2.util.PatternMatcher)
    2022-10-25 2:26:26 com.opensymphony.xwork2.util.logging.jdk.JdkLogger info
    信息: Choosing bean (struts) for (org.apache.struts2.util.ContentTypeMatcher)
    2022-10-25 2:26:26 com.opensymphony.xwork2.util.logging.jdk.JdkLogger info
    信息: Choosing bean (struts) for (org.apache.struts2.dispatcher.StaticContentLoader)
    2022-10-25 2:26:26 com.opensymphony.xwork2.util.logging.jdk.JdkLogger info
    信息: Choosing bean (struts) for (com.opensymphony.xwork2.UnknownHandlerManager)
    2022-10-25 2:26:26 com.opensymphony.xwork2.util.logging.jdk.JdkLogger info
    信息: Choosing bean (struts) for (org.apache.struts2.views.util.UrlHelper)
    2022-10-25 2:26:26 com.opensymphony.xwork2.util.logging.jdk.JdkLogger info
    信息: Choosing bean (struts) for (com.opensymphony.xwork2.util.TextParser)
    2022-10-25 2:26:26 com.opensymphony.xwork2.util.logging.jdk.JdkLogger info
    信息: Choosing bean (struts) for (org.apache.struts2.dispatcher.DispatcherErrorHandler)
    2022-10-25 2:26:26 com.opensymphony.xwork2.util.logging.jdk.JdkLogger info
    信息: Choosing bean (struts) for (com.opensymphony.xwork2.security.ExcludedPatternsChecker)
    2022-10-25 2:26:26 com.opensymphony.xwork2.util.logging.jdk.JdkLogger info
    信息: Choosing bean (struts) for (com.opensymphony.xwork2.security.AcceptedPatternsChecker)
    2022-10-25 2:26:27 org.apache.catalina.startup.HostConfig deployDescriptor
    信息: Deploying configuration descriptor host-manager.xml
    2022-10-25 2:26:27 org.apache.catalina.startup.HostConfig deployDescriptor
    信息: Deploying configuration descriptor manager.xml
    2022-10-25 2:26:27 org.apache.catalina.startup.HostConfig deployDirectory
    信息: Deploying web application directory docs
    2022-10-25 2:26:27 org.apache.catalina.startup.HostConfig deployDirectory
    信息: Deploying web application directory examples
    2022-10-25 2:26:27 org.apache.catalina.core.ApplicationContext log
    信息: ContextListener: contextInitialized()
    2022-10-25 2:26:27 org.apache.catalina.core.ApplicationContext log
    信息: SessionListener: contextInitialized()
    2022-10-25 2:26:27 org.apache.catalina.startup.HostConfig deployDirectory
    信息: Deploying web application directory ROOT
    2022-10-25 2:26:27 org.apache.coyote.http11.Http11Protocol start
    信息: Starting Coyote HTTP/1.1 on http-8080
    2022-10-25 2:26:27 org.apache.jk.common.ChannelSocket init
    信息: JK: ajp13 listening on /0.0.0.0:8009
    2022-10-25 2:26:27 org.apache.jk.server.JkMain start
    信息: Jk running ID=0 time=0/16  config=null
    2022-10-25 2:26:27 org.apache.catalina.startup.Catalina start
    信息: Server startup in 1796 ms
    ```
11. 打开浏览器访问：`http://localhost:8080/struts2/login.jsp`​

    ![](https://img1.terwer.space/api/public/20221025012745.png)​

    输入用户名和密码测试：

    ![](https://img1.terwer.space/api/public/20221025012841.png)​

    结果如下：

    ![](https://img1.terwer.space/api/public/20221025012913.png)​

    大功告成。

‍