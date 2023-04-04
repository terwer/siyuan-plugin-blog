---
title: Spring-MVC-5-3-19,MyBatis3-5-9,Spring5-3-19整合
short_title: ''
description: Spring-MVC-5-3-19,MyBatis3-5-9,Spring5-3-19整合。IDEA->new->Project，创建一个Maven的webapp项目，选择
  org.apache.maven的webapp骨架。
date: 2022-05-28 14:21:31
category:
  - OA与工作流新思路
  - 新笔记
tag:
  - spring
  - mybatis
  - spring-mvc
article: true
timeline: false
---
## Spring-MVC-5-3-19,MyBatis3-5-9,Spring5-3-19 整合

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

### 集成 MyBatis

```xml
<!-- MyBatis -->
<dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis</artifactId>
    <version>3.5.9</version>
</dependency>

<!-- Dbcp2 -->
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-dbcp2</artifactId>
    <version>2.9.0</version>
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

### 集成 SpringMVC

```xml
<!-- Spring webmvc-->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-webmvc</artifactId>
    <version>5.3.19</version>
</dependency>
```

web.xml

```xml
<web-app xmlns="http://java.sun.com/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://java.sun.com/xml/ns/javaee
	      http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd"
         version="3.0">

    <display-name>hoa</display-name>

    <!--
    1、Spring 框架解决字符串编码问题：过滤器 CharacterEncodingFilter（filter-name）
    2、在web.xml配置监听器ContextLoaderListener（listener-class）
    ContextLoaderListener的作用就是启动Web容器时，自动装配ApplicationContext的配置信息。因为它实现了ServletContextListener这个接口，在web.xml配置这个监听器，启动容器时，就会默认执行它实现的方法。
    3、部署applicationContext的xml文件：contextConfigLocation（context-param下的param-name）
    4、DispatcherServlet是前置控制器，配置在web.xml文件中的。拦截匹配的请求，Servlet拦截匹配规则要自已定义，把拦截下来的请求，依据某某规则分发到目标Controller(我们写的Action)来处理。
    DispatcherServlet（servlet-name、servlet-class、init-param、param-name(contextConfigLocation)、param-value）
    在DispatcherServlet的初始化过程中，框架会在web应用的 WEB-INF文件夹下寻找名为[servlet-name]-servlet.xml 的配置文件，生成文件中定义的bean
    -->

    <!--
    在Spring框架中是如何解决从页面传来的字符串的编码问题的呢？
    Spring框架给我们提供过滤器CharacterEncodingFilter
    这个过滤器就是针对于每次浏览器请求进行过滤的，然后再其之上添加了父类没有的功能即处理字符编码。
    其中encoding用来设置编码格式，forceEncoding用来设置是否理会 request.getCharacterEncoding()方法，设置为true则强制覆盖之前的编码格式。
    -->
    <filter>
        <filter-name>characterEncodingFilter</filter-name>
        <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
        <init-param>
            <param-name>encoding</param-name>
            <param-value>UTF-8</param-value>
        </init-param>
        <init-param>
            <param-name>forceEncoding</param-name>
            <param-value>true</param-value>
        </init-param>
    </filter>
    <filter-mapping>
        <filter-name>characterEncodingFilter</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>

    <!--
    项目中使用Spring 时，applicationContext.xml配置文件中并没有BeanFactory，要想在业务层中的class 文件中直接引用Spring容器管理的bean可通过以下方式-->
    <!--1、在web.xml配置监听器ContextLoaderListener-->
    <!--ContextLoaderListener的作用就是启动Web容器时，自动装配ApplicationContext的配置信息。因为它实现了ServletContextListener这个接口，在web.xml配置这个监听器，启动容器时，就会默认执行它实现的方法。
    在ContextLoaderListener中关联了ContextLoader这个类，所以整个加载配置过程由ContextLoader来完成。
    它的API说明
    第一段说明ContextLoader可以由 ContextLoaderListener和ContextLoaderServlet生成。
    如果查看ContextLoaderServlet的API，可以看到它也关联了ContextLoader这个类而且它实现了HttpServlet这个接口
    第二段，ContextLoader创建的是 XmlWebApplicationContext这样一个类，它实现的接口是WebApplicationContext->ConfigurableWebApplicationContext->ApplicationContext->
    BeanFactory这样一来spring中的所有bean都由这个类来创建
    IUploaddatafileManager uploadmanager = (IUploaddatafileManager)    ContextLoaderListener.getCurrentWebApplicationContext().getBean("uploadManager");
     -->
    <listener>
        <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
    </listener>

    <!--2、部署applicationContext的xml文件-->
    <!--如果在web.xml中不写任何参数配置信息，默认的路径是"/WEB-INF/applicationContext.xml，
    在WEB-INF目录下创建的xml文件的名称必须是applicationContext.xml。
    如果是要自定义文件名可以在web.xml里加入contextConfigLocation这个context参数：
    在<param-value> </param-value>里指定相应的xml文件名，如果有多个xml文件，可以写在一起并以“,”号分隔。
    也可以这样applicationContext-*.xml采用通配符，比如这那个目录下有applicationContext-ibatis-base.xml，
    applicationContext-action.xml，applicationContext-ibatis-dao.xml等文件，都会一同被载入。
    在ContextLoaderListener中关联了ContextLoader这个类，所以整个加载配置过程由ContextLoader来完成。-->
    <context-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>classpath:applicationContext.xml</param-value>
    </context-param>

    <!--如果你的DispatcherServlet拦截"/"，为了实现REST风格，拦截了所有的请求，那么同时对*.js,*.jpg等静态文件的访问也就被拦截了。-->
    <!--方案一：激活Tomcat的defaultServlet来处理静态文件-->
    <!--要写在DispatcherServlet的前面， 让 defaultServlet先拦截请求，这样请求就不会进入Spring了，我想性能是最好的吧。-->
    <servlet-mapping>
        <servlet-name>default</servlet-name>
        <url-pattern>*.css</url-pattern>
    </servlet-mapping>
    <servlet-mapping>
        <servlet-name>default</servlet-name>
        <url-pattern>*.swf</url-pattern>
    </servlet-mapping>
    <servlet-mapping>
        <servlet-name>default</servlet-name>
        <url-pattern>*.gif</url-pattern>
    </servlet-mapping>
    <servlet-mapping>
        <servlet-name>default</servlet-name>
        <url-pattern>*.jpg</url-pattern>
    </servlet-mapping>
    <servlet-mapping>
        <servlet-name>default</servlet-name>
        <url-pattern>*.png</url-pattern>
    </servlet-mapping>
    <servlet-mapping>
        <servlet-name>default</servlet-name>
        <url-pattern>*.js</url-pattern>
    </servlet-mapping>
    <servlet-mapping>
        <servlet-name>default</servlet-name>
        <url-pattern>*.html</url-pattern>
    </servlet-mapping>
    <servlet-mapping>
        <servlet-name>default</servlet-name>
        <url-pattern>*.xml</url-pattern>
    </servlet-mapping>
    <servlet-mapping>
        <servlet-name>default</servlet-name>
        <url-pattern>*.json</url-pattern>
    </servlet-mapping>
    <servlet-mapping>
        <servlet-name>default</servlet-name>
        <url-pattern>*.map</url-pattern>
    </servlet-mapping>
    <!-- 使用Spring MVC,配置DispatcherServlet是第一步。DispatcherServlet是一个Servlet,,所以可以配置多个DispatcherServlet-->
    <!-- DispatcherServlet是前置控制器，配置在web.xml文件中的。拦截匹配的请求，Servlet拦截匹配规则要自已定义，把拦截下来的请求，依据某某规则分发到目标Controller(我们写的Action)来处理。-->
    <servlet>
        <servlet-name>DispatcherServlet</servlet-name>
        <!-- 在DispatcherServlet的初始化过程中，框架会在web应用的 WEB-INF文件夹下寻找名为[servlet-name]-servlet.xml 的配置文件，生成文件中定义的bean。-->
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <!-- 指明了配置文件的文件名，不使用默认配置文件名，而使用dispatcher-servlet.xml配置文件。-->
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <!-- 其中<param-value>**.xml</param-value> 这里可以使用多种写法 -->
            <!-- 1、不写,使用默认值:/WEB-INF/<servlet-name>-servlet.xml -->
            <!-- 2、<param-value>/WEB-INF/classes/dispatcher-servlet.xml</param-value> -->
            <!-- 3、<param-value>classpath*:dispatcher-servlet.xml</param-value> -->
            <!-- 4、多个值用逗号分隔-->
            <param-value>classpath:dispatcher-servlet.xml</param-value>
        </init-param>
        <!-- 是启动顺序，让这个Servlet随Servlet容器一起启动。-->
        <load-on-startup>1</load-on-startup>
    </servlet>
    <servlet-mapping>
        <!-- 这个Servlet的名字是dispatcher，可以有多个DispatcherServlet，是通过名字来区分的。每一个DispatcherServlet有自己的WebApplicationContext上下文对象。同时保存的ServletContext中和Request对象中. -->
        <!-- ApplicationContext是Spring的核心，Context我们通常解释为上下文环境，我想用“容器”来表述它更容易理解一些，ApplicationContext则是“应用的容器”了:P，Spring把Bean放在这个容器中，在需要的时候，用getBean方法取出 -->
        <servlet-name>DispatcherServlet</servlet-name>
        <!-- Servlet拦截匹配规则可以自已定义，当映射为@RequestMapping("/user/add")时，为例,拦截哪种URL合适？ -->
        <!-- 1、拦截*.do、*.htm， 例如：/user/add.do,这是最传统的方式，最简单也最实用。不会导致静态文件（jpg,js,css）被拦截。 -->
        <!-- 2、拦截/，例如：/user/add,可以实现现在很流行的REST风格。很多互联网类型的应用很喜欢这种风格的URL。弊端：会导致静态文件（jpg,js,css）被拦截后不能正常显示。 -->
        <url-pattern>/</url-pattern> <!--会拦截URL中带“/”的请求。-->
    </servlet-mapping>

    <welcome-file-list>
        <!-- 指定欢迎页面 -->
        <welcome-file>index.html</welcome-file>
    </welcome-file-list>
    <error-page>
        <!-- 当系统出现404错误，跳转到页面nopage.html -->
        <error-code>404</error-code>
        <location>/errorpage/nopage.html</location>
    </error-page>
    <error-page>
        <!-- 当系统出现java.lang.NullPointerException，跳转到页面error.html -->
        <exception-type>java.lang.NullPointerException</exception-type>
        <location>/errorpage/error.html</location>
    </error-page>
    <session-config>
        <!-- 会话超时配置，单位分钟 -->
        <session-timeout>360</session-timeout>
    </session-config>
</web-app>
```

dispatcher-servlet.xml

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="
    http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
    http://www.springframework.org/schema/context
    http://www.springframework.org/schema/context/spring-context-3.0.xsd">

    <context:component-scan base-package="com.terwergreen.hoa"/>

    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
        <property name="prefix">
            <value>/WEB-INF/views/</value>
        </property>
        <property name="suffix">
            <value>.jsp</value>
        </property>
    </bean>
</beans>
```


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
   
       <root level="INFO">　　　
           <appender-ref ref="STDOUT"/>　
       </root>
   </configuration>
   ```

### 最终目录

![image-20220528150924649](https://img1.terwer.space/20220528150926.png)

## 本项目地址

[https://github.com/terwer/hoa/tree/myoa](https://github.com/terwer/hoa/tree/myoa)