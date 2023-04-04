---
title: 基于SpringBoot整合Spring、Spring-MVC和Mybatis
short_title: ''
description: 基于SpringBoot整合Spring、Spring-MVC和Mybatis。IDEA->new->Project，创建一个Maven的webapp项目，选择
  org.apache.maven的webapp骨架。
date: 2022-05-28 14:59:53
category:
  - OA与工作流新思路
  - 新笔记
tag:
  - spring-mvc
  - spring
  - mybatis
  - spring-boot
article: true
timeline: false
---
## 基于SpringBoot整合Spring、Spring-MVC和Mybatis

### 创建新项目myoa

1. IDEA->new->Project，创建一个SpringBoot项目。

   ![image-20220506152354284](https://img1.terwer.space/20220506152354.png)

3. 培训pom.xml，在build节点添加下面内容，使得webapp的静态资源能访问

   ```xml
   <build>
       <plugins>
           <plugin>
               <groupId>org.springframework.boot</groupId>
               <artifactId>spring-boot-maven-plugin</artifactId>
           </plugin>
       </plugins>
       <!-- 添加访问静态资源文件 -->
       <!-- 代码的作用是让src/main/webapp在编译的时候在resoureces路径下也生成webapp的文件 -->
       <resources>
           <resource>
               <directory>src/main/webapp</directory>
               <targetPath>META-INF/resources</targetPath>
               <includes>
                   <include>**/**</include>
               </includes>
           </resource>
           <resource>
               <directory>src/main/resources</directory>
               <filtering>true</filtering>
           </resource>
       </resources>
   </build>
   ```

4. 查看运行结果

   ![image-20220506152314044](https://img1.terwer.space/20220506152314.png)

### 集成MyBatis

pom.xml加上MyBatis的依赖

```xml
<!-- MyBatis -->
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>2.2.2</version>
</dependency>
```

### 集成Spring

SpringBoot默认已经集成。

### 集成SpringMVC

```xml
<!-- Spring MVC -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

### 集成Logback，统一日志框架

SpringBoot默认已经集成，只需要添加配置文件即可，如果不添加，默认也能打印日志。

**logback.xml 极简配置，注意位置是在资源目录**

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

## 最终目录

![image-20220528152804340](https://img1.terwer.space/20220528152805.png)

## 本项目地址

[https://github.com/terwer/hoa/tree/myoaboot](https://github.com/terwer/hoa/tree/myoaboot)

## Kotlin版本

[https://github.com/terwer/hoa/tree/myoabootkt](https://github.com/terwer/hoa/tree/myoabootkt)