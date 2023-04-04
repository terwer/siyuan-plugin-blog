---
title: Struts1.3.10,Hibernate5.6.8.Final,Spring5.3.19整合
short_title: ''
description: Struts1.3.10,Hibernate5.6.8.Final,Spring5.3.19整合。IDEA->new->Project，创建一个Maven的webapp项目，选择
  org.apache.maven的webapp骨架。
date: 2022-05-06 01:39:39
category:
  - OA与工作流新思路
  - 新笔记
tag:
  - struts
  - struts1
  - hibernate
  - spring
article: true
timeline: false
---
## Struts1.3.10,Hibernate5.6.8.Final,Spring5.3.19 整合

### 创建新项目 hoa

1. **IDEA->new->Project，创建一个 Maven 的 webapp 项目，选择 org.apache.maven 的 webapp 骨架。**
   **注意 JDK 设置为 1.8**
2. **配置 Jetty runner**
   **安装 Jetty Runner 插件：直接在 IDEA 的 plugins 里面搜索 Jetty Runner 安装即可。**
   **Mavn 仓库的 Jetty Runner 坐标**
   ```xml
    <!-- jetty runner -->
    <!-- 11需要jdk11，9.4支持jdk8 -->
    <!--
    <dependency>
        <groupId>org.eclipse.jetty</groupId>
        <artifactId>jetty-runner</artifactId>
        <version>11.0.9</version>
    </dependency>
    -->
    <dependency>
        <groupId>org.eclipse.jetty</groupId>
        <artifactId>jetty-runner</artifactId>
        <version>9.4.46.v20220331</version>
        <scope>provided</scope>
    </dependency>
   ```

   **点击 Add Configuration，点击加号，找到 Jetty Runner**
   **Jetty 选择 **`9.4.46.v20220331` ，注意：11 需要 jdk11，9.4 支持 jdk1.8
   **设置 Jetty Runner 文件目录：**`/Users/terwer/.m2/repository/org/eclipse/jetty/jetty-runner/9.4.46.v20220331/jetty-runner-9.4.46.v20220331.jar`
   **注意设置好项目目录：**`/Users/terwer/Documents/workspace/hoa/s1oa/src/main/webapp`
   **类路径：**`/Users/terwer/Documents/workspace/hoa/s1oa/target/classes`
   **还有上下文：**`/s1oa`
   **端口：**`8880`
   **模块选择：**`s1oa`
   ![image-20220507100615254](https://img1.terwer.space/20220507100615.png)
3. **查看运行结果**
   ![image-20220506021103461](https://img1.terwer.space/20220506021621.png)

### 集成 Hibernate

**pom.xml 加上 hibernate 的依赖**

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

**在 webapp 的 WEB-INF 目录创建 applicationContext.xml**

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

**web.xml 加上 listener**

```xml
 <!-- Spring -->
 <listener>
     <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
 </listener>
```

**看启动日志，如下图说明 Spring 集成成功：**

![image-20220506111112872](https://img1.terwer.space/20220506111113.png)

### 集成 Struts1

```xml
<!-- struts -->
<dependency>
    <groupId>org.apache.struts</groupId>
    <artifactId>struts-core</artifactId>
    <version>1.3.10</version>
</dependency>

<!-- struts taglib -->
<dependency>
    <groupId>org.apache.struts</groupId>
    <artifactId>struts-taglib</artifactId>
    <version>1.3.10</version>
</dependency>
```

**struts-config.xml**

```xml
<?xml version="1.0"?>
<!DOCTYPE struts-config PUBLIC
        "-//Apache Software Foundation//DTD Struts Configuration 1.3//EN"
        "http://jakarta.apache.org/struts/dtds/struts-config_1_3.dtd">

<struts-config>
    <form-beans>
    </form-beans>

    <action-mappings>
    </action-mappings>
</struts-config>
```

### 集成 Logback，统一日志框架

1. **pom.xml 加上日志转换依赖**

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
2. **logback.xml 极简配置，注意位置是在资源目录**

   ```xml
   <configuration>
       <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">　　　　
           <encoder>　　　　　　　　
               <pattern>%-4relative [%thread] %-5level %logger{35} - %msg %n</pattern>　　　
           </encoder>
       </appender>
   
       <!-- jetty -->
       <logger name="org.eclipse.jetty" level="ERROR"/>
   
       <root level="INFO">　　　
           <appender-ref ref="STDOUT"/>　
       </root>
   </configuration>
   ```

### 最终目录

![](https://img1.terwer.space/20220528141534.png)

## 本项目地址

[https://github.com/terwer/hoa/tree/s1oa](https://github.com/terwer/hoa/tree/s1oa)