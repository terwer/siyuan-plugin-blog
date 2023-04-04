---
title: Struts2.5.30,Hibernate5.6.8.Final,Spring5.3.19整合
short_title: ''
description: Struts2.5.30,Hibernate5.6.8.Final,Spring5.3.19整合。IDEA->new->Project，创建一个Maven的webapp项目，选择
  org.apache.maven的webapp骨架。
date: 2022-05-06 01:39:39
category:
  - OA与工作流新思路
  - 新笔记
tag:
  - struts2
  - hibernate
  - spring
article: true
timeline: false
---
## Struts2.5.30,Hibernate5.6.8.Final,Spring5.3.19 整合

### 创建新项目 hoa

1. IDEA->new->Project，创建一个 Maven 的 webapp 项目，选择 org.apache.maven 的 webapp 骨架。

   注意 JDK 设置为 1.8
2. 配置 Jetty runner

   安装 Jetty Runner 插件：直接在 IDEA 的 plugins 里面搜索 Jetty Runner 安装即可。

   点击 Add Configuration，点击加号，找到 Jetty Runner

   Jetty 选择 `9.4.46.v20220331` ，注意：11 需要 jdk11，9.4 支持 jdk1.8

   设置 Jetty Runner 文件目录：`/Users/terwer/.m2/repository/org/eclipse/jetty/jetty-runner/9.4.46.v20220331/jetty-runner-9.4.46.v20220331.jar`

   注意设置好项目目录：`/Users/terwer/Documents/workspace/hoa/src/main/webapp`

   类路径：`/Users/terwer/Documents/workspace/hoa/target/classes`

   还有上下文：`/hoa`

   端口：`8880`

   模块选择：`hoa`

   ![image-20220506111525278](https://img1.terwer.space/20220506111525.png)
3. 查看运行结果

   ![image-20220506021103461](https://img1.terwer.space/20220506021621.png)

### 集成 Hibernate

pom.xml 加上 hibernate 的依赖

```xml
<!-- hibernate -->
<dependency>
    <groupId>org.hibernate</groupId>
    <artifactId>hibernate-core</artifactId>
    <version>5.6.8.Final</version>
</dependency>

<!-- Spring ORM -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-orm</artifactId>
    <version>5.3.19</version>
</dependency>

<!-- Dbcp2 -->
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-dbcp2</artifactId>
    <version>2.9.0</version>
</dependency>

<!-- javax persistence -->
<dependency>
    <groupId>org.eclipse.persistence</groupId>
    <artifactId>javax.persistence</artifactId>
    <version>2.2.1</version>
</dependency>

<!-- MySQL -->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>5.1.49</version>
</dependency>
```

### 集成 Spring

```xml
<!-- Spring -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
    <version>5.3.19</version>
</dependency>

<!-- Spring web-->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-web</artifactId>
    <version>5.3.19</version>
</dependency>
```

在 webapp 的 WEB-INF 目录创建 applicationContext.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:tx="http://www.springframework.org/schema/tx"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
       http://www.springframework.org/schema/tx
       http://www.springframework.org/schema/tx/spring-tx.xsd">

</beans>
```

web.xml 加上 listener

```xml
<!-- Spring -->
<listener>
    <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
</listener>
```

看启动日志，如下图说明 Spring 集成成功：

![image-20220506111112872](https://img1.terwer.space/20220506111113.png)

### 集成 struts2

1. Pom.xml 加上 struts2 的依赖

   ```xml
   <!-- struts2 -->
   <dependency>
       <groupId>org.apache.struts</groupId>
       <artifactId>struts2-core</artifactId>
       <version>2.5.30</version>
   </dependency>
   
   <!-- struts2 + spring -->
   <dependency>
     <groupId>org.apache.struts</groupId>
     <artifactId>struts2-spring-plugin</artifactId>
     <version>2.5.30</version>
   </dependency>
   ```
2. 自定义一个过滤器 HoaStartupFilter，继承 StrutsPrepareAndExecuteFilter

   ```java
   /**
    * 自定义过滤器
    *
    * @name: HoaStartupFilter
    * @author: terwer
    * @date: 2022-05-06 10:06
    **/
   public class HoaStartupFilter extends StrutsPrepareAndExecuteFilter {
       private static final Logger logger = LoggerFactory.getLogger(HoaStartupFilter.class);
   
       @Override
       public void init(FilterConfig filterConfig) throws ServletException {
           super.init(filterConfig);
           logger.info("struts2 inited");
       }
   
       @Override
       public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
           super.doFilter(servletRequest, servletResponse, filterChain);
       }
   
       @Override
       public void destroy() {
           super.destroy();
           logger.info("hoa stoped");
       }
   }
   ```
3. web.xml 加上 struts2 的过滤器

   ```xml
   <!-- Struts2 -->
   <filter>
       <filter-name>hoa</filter-name>
       <filter-class>com.terwergreen.hoa.filter.HoaStartupFilter</filter-class>
   </filter>
   <filter-mapping>
       <filter-name>hoa</filter-name>
       <url-pattern>/*</url-pattern>
   </filter-mapping>
   ```
4. 创建 struts.xml，注意目录是在资源目录

   ```xml
   <!DOCTYPE struts PUBLIC
           "-//Apache Software Foundation//DTD Struts Configuration 2.5//EN"
           "http://struts.apache.org/dtds/struts-2.5.dtd">
   
   <struts>
   </struts>
   ```
5. 启动验证：

   ![image-20220506112252277](https://img1.terwer.space/20220506112252.png)

### 集成 Logback，统一日志框架

1. pom.xml 加上日志转换依赖

   ```xml
   <!-- Logback -->
   <dependency>
       <groupId>ch.qos.logback</groupId>
       <artifactId>logback-classic</artifactId>
       <version>1.2.10</version>
       <scope>compile</scope>
   </dependency>
   <dependency>
       <groupId>ch.qos.logback</groupId>
       <artifactId>logback-core</artifactId>
       <version>1.2.10</version>
       <scope>compile</scope>
   </dependency>
   <dependency>
       <groupId>org.slf4j</groupId>
       <artifactId>slf4j-api</artifactId>
       <version>1.7.33</version>
   </dependency>
   <dependency>
       <groupId>org.slf4j</groupId>
       <artifactId>jul-to-slf4j</artifactId>
       <version>1.7.33</version>
   </dependency>
   <dependency>
       <groupId>org.slf4j</groupId>
       <artifactId>jcl-over-slf4j</artifactId>
       <version>1.7.33</version>
   </dependency>
   <dependency>
       <groupId>org.slf4j</groupId>
       <artifactId>log4j-over-slf4j</artifactId>
       <version>1.7.33</version>
   </dependency>
   <dependency>
       <groupId>org.apache.logging.log4j</groupId>
       <artifactId>log4j-to-slf4j</artifactId>
       <version>2.17.2</version>
   </dependency>
   ```
2. logback.xml 极简配置，注意位置是在资源目录

   ```xml
   <configuration>
       <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">　　　　
           <encoder>　　　　　　　　
               <pattern>%-4relative [%thread] %-5level %logger{35} - %msg %n</pattern>　　　
           </encoder>
       </appender>
   
       <!-- jetty -->
       <logger name="org.eclipse.jetty" level="ERROR"/>
       <!-- struts2 -->
       <logger name="com.opensymphony.xwork2" level="INFO"/>
   
       <root level="INFO">　　　
           <appender-ref ref="STDOUT"/>　
       </root>
   </configuration>
   ```

### 最终目录

![image-20220506112420080](https://img1.terwer.space/20220506112420.png)

## 本项目地址

[https://github.com/terwer/hoa](https://github.com/terwer/hoa)