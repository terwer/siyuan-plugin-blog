---
title: Hibernate的关键API详解以及上手第一个Hibernate项目
short_title: ''
description: hibernate的关键api详解以及上手第一个hibernate项目在java中使用hibernate的步骤​开始hibernate开发​​上手第一个hibernate项目新建项目打开myeclipse新建一个web项目​​项目名称为hibernate配置使用默认（javajavaeejstl）点击finish完成即可。​​集成struts在pomxml​​加上struts的依赖我们使用struts的新版本struts​​webxml​加上对应的过滤器xmlns_xsi=xsi_schemalocati
date: 2022-10-19 23:14:54
category:
  - 后端开发
  - Hibernate
tag:
  - 使用
  - 步骤
  - 开始
  - 开发
  - hibernate
  - api
article: true
timeline: false
---
## 在 Java 中使用 Hibernate 的步骤

![](https://img1.terwer.space/api/public/20221019232220.png)​

## 开始 Hibernate 开发

![](https://img1.terwer.space/api/public/20221019232430.png)​

![](https://img1.terwer.space/api/public/20221019232559.png)​

## 上手第一个 Hibernate 项目

### 新建项目

打开 MyEclipse，新建一个 Web 项目

​![](https://img1.terwer.space/api/public/bc9c097e-8eec-4aca-9ab3-d4cf0946026f.jpeg)​

项目名称为 hibernate ，配置使用默认（Java8、Java EE8、JSTL1.2.4），点击 finish 完成即可。

​![](https://img1.terwer.space/api/public/20230102230055.png)​

### 集成 struts2

在 `pom.xml`​​ 加上 struts2 的依赖，我们使用 struts2 的新版本 `struts2.5.30`​

```xml
<!-- struts2 -->
<dependency>
	<groupId>org.apache.struts</groupId>
	<artifactId>struts2-core</artifactId>
	<version>2.5.30</version>
</dependency>
```

​`web.xml`​ 加上对应的过滤器

```xml
<web-app xmlns="http://java.sun.com/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://java.sun.com/xml/ns/javaee
	      http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd"
         version="3.0">
    <filter>
        <filter-name>struts2</filter-name>
        <filter-class>org.apache.struts2.dispatcher.filter.StrutsPrepareAndExecuteFilter</filter-class>
    </filter>

    <filter-mapping>
        <filter-name>struts2</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>
</web-app>
```

注意，上面是类似 struts2.3 的方法，其实还有更新的配置方法，下面的配置方法也可以：

```xml
<web-app xmlns="http://java.sun.com/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://java.sun.com/xml/ns/javaee
	      http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd"
         version="3.0">
    <filter>
        <filter-name>struts-prepare</filter-name>
        <filter-class>org.apache.struts2.dispatcher.filter.StrutsPrepareFilter</filter-class>
    </filter>

    <filter>
        <filter-name>struts-execute</filter-name>
        <filter-class>org.apache.struts2.dispatcher.filter.StrutsExecuteFilter</filter-class>
    </filter>

    <filter-mapping>
        <filter-name>struts-prepare</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>

    <filter-mapping>
        <filter-name>struts-execute</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>
</web-app>
```

新建一个 struts.xml 文件

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE struts PUBLIC
        "-//Apache Software Foundation//DTD Struts Configuration 2.5//EN"
        "http://struts.apache.org/dtds/struts-2.5.dtd">
<struts>
	<package name="hibernate" extends="struts-default">
	</package>
</struts>
```

### 集成 Hibernate5

我们使用最新版本 `Hibernate5.6.14.Final`​ 。

​`pom.xml`​​ 文件加上 `hibernate`​ 所需依赖

```xml
<!-- hibernate -->
<dependency>
	<groupId>org.hibernate</groupId>
	<artifactId>hibernate-core</artifactId>
	<version>5.6.14.Final</version>
</dependency>
```

新增 hibernate.cfg.xml 文件

```xml
<?xml version='1.0' encoding='utf-8'?>
<!DOCTYPE hibernate-configuration PUBLIC
        "-//Hibernate/Hibernate Configuration DTD//EN"
        "http://www.hibernate.org/dtd/hibernate-configuration-3.0.dtd">
<hibernate-configuration>
    <session-factory>
        <property name="connection.url">jdbc:mysql://localhost:3306/hibernate</property>
        <property name="connection.username">terwer</property>
        <property name="connection.password">123456</property>
        <property name="connection.driver_class">com.mysql.jdbc.Driver</property>
        <property name="dialect">org.hibernate.dialect.MySQL57Dialect</property>

        <property name="show_sql">true</property>

        <!-- DB schema will be updated if needed -->
        <property name="hibernate.hbm2ddl.auto">update</property>

        <!-- mapping -->
        <mapping resource="space/terwer/model/Person.hbm.xml"/>
    </session-factory>
</hibernate-configuration>
```

### 创建持久化类

​![](https://img1.terwer.space/api/public/20230103003758.png)​

在 `space.terwer.model`​ 包下面新建一个 `model`​

​`Person.java`​

```java
package space.terwer.model;

import java.util.Date;

/**
 * 人员
 *
 * @author terwer
 * @name Person
 * @date 2023-01-03 00:40
 **/
public class Person {
    private Integer id;
    private String name;
    private String password;
    private Integer age;
    private Date registerDate;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Date getRegisterDate() {
        return registerDate;
    }

    public void setRegisterDate(Date registerDate) {
        this.registerDate = registerDate;
    }
}
```

​`SessionFactory`​ 接口

​![](https://img1.terwer.space/api/public/20230103010458.png)​

Session 接口

​![](https://img1.terwer.space/api/public/20230103010733.png)​

### DTD

```xml
<?xml version="1.0"?>
<!DOCTYPE hibernate-mapping PUBLIC
        "-//Hibernate/Hibernate Mapping DTD 3.0//EN"
        "http://hibernate.sourceforge.net/hibernate-mapping-3.0.dtd" >
<hibernate-mapping>
</hibernate-mapping>
```

### Model 文件映射

​`person.hbm.xml`​

```xml
<!DOCTYPE hibernate-mapping PUBLIC
        "-//Hibernate/Hibernate Mapping DTD 3.0//EN"
        "http://www.hibernate.org/dtd/hibernate-mapping-3.0.dtd">
<hibernate-mapping>
    <class name="space.terwer.model.Person" table="person">
        <id name="id" column="id" type="integer">
            <generator class="increment"/>
        </id>
        <property name="username" column="username" type="string"/>
        <property name="password" column="password" type="string"/>
        <property name="age" column="age" type="integer"/>
        <property name="registerDate" column="registerDate" type="java.util.Date"/>
    </class>
</hibernate-mapping>
```

### Hibernate 操作工具类

​`HibernateUtil.java`​

```java
/**
 * Hibernate工具类
 *
 * @author terwer
 * @name HibernateUtil
 * @date 2023-01-03 01:03
 **/
public class HibernateUtil {
    private static SessionFactory sessionFactory;

    static {
        try {
            sessionFactory = new Configuration().configure().buildSessionFactory();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static Session openSession() {
        return sessionFactory.openSession();
    }

    public static void closeSession(Session session) {
        if (null != session) {
            session.close();
        }
    }
}
```

### Dao 层实现

```java
/**
 * PersonDAO实现类
 *
 * @author terwer
 * @name PersonDAOImpl
 * @date 2023-01-03 01:02
 **/
public class PersonDAOImpl implements IPersonDAO {
    @Override
    public void savePerson(Person person) {
        Session session = HibernateUtil.openSession();
        Transaction tx = session.beginTransaction();

        try {
            session.save(person);

            tx.commit();
        } catch (Exception e) {
            if (null != tx) {
                tx.rollback();
            }
            throw e;
        } finally {
            HibernateUtil.closeSession(session);
        }
    }
}
```

### Service 层实现

```java
public class PersonServiceImpl implements IPersonService {
    @Override
    public void savePerson(Person person) {
        IPersonDAO personDAO = new PersonDAOImpl();
        personDAO.savePerson(person);
    }
}
```

### Action 层实现

​`PersonAction.java`​

```java
/**
 * 人员处理
 *
 * @author terwer
 * @name PersonAction
 * @date 2023-01-03 00:55
 **/
public class PersonAction extends ActionSupport {
    private String username;
    private String password;
    private Integer age;

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

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String savePerson() throws Exception {
        Person person = new Person();
        person.setUsername(username);
        person.setPassword(password);
        person.setAge(age);

        person.setRegisterDate(new Date());

        IPersonService personService = new PersonServiceImpl();
        personService.savePerson(person);

        return SUCCESS;
    }
}
```

### 页面入口

​`register.jsp`​

```xml
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>register</title>
</head>
<body>
<form action="savePerson.action">
    username:<input type="text" name="username" size="20"/><br/>
    password:<input type="text" name="password" size="20"/><br/>
    age:<input type="text" name="age"/><br/>

    <input type="submit" value="submit"/>
</form>
</body>
</html>
```

运行结果

```plaintext
145  [main] INFO  org.eclipse.jetty.util.log - Logging initialized @273ms to org.eclipse.jetty.util.log.Slf4jLog 
WARNING: jetty-runner is deprecated.
         See Jetty Documentation for startup options
         https://www.eclipse.org/jetty/documentation/
174  [main] INFO  org.eclipse.jetty.runner.Runner - Runner 
323  [main] INFO  org.eclipse.jetty.server.Server - jetty-9.4.46.v20220331; built: 2022-03-31T16:38:08.030Z; git: bc17a0369a11ecf40bb92c839b9ef0a8ac50ea18; jvm 1.8.0_333-b02 
Connected to the target VM, address: '127.0.0.1:64891', transport: 'socket'
760  [main] INFO  o.e.j.a.AnnotationConfiguration - Scanning elapsed time=297ms 
868  [main] INFO  org.eclipse.jetty.server.session - DefaultSessionIdManager workerName=node0 
868  [main] INFO  org.eclipse.jetty.server.session - No SessionScavenger set, using defaults 
871  [main] INFO  org.eclipse.jetty.server.session - node0 Scavenging every 600000ms 
1413 [main] INFO  o.e.j.server.handler.ContextHandler - Started o.e.j.w.WebAppContext@6a6cb05c{/hibernate-idea,file:///Users/terwer/Documents/workspace/senior-java-engineer-road/p7-skill/framework/hibernate/hibernate-idea/src/main/webapp/,AVAILABLE}{file:///Users/terwer/Documents/workspace/senior-java-engineer-road/p7-skill/framework/hibernate/hibernate-idea/src/main/webapp/} 
1433 [main] INFO  o.e.jetty.server.AbstractConnector - Started ServerConnector@158d2680{HTTP/1.1, (http/1.1)}{0.0.0.0:8080} 
1433 [main] INFO  org.eclipse.jetty.server.Server - Started @1565ms 
8768 [qtp1318180415-33] INFO  org.hibernate.Version - HHH000412: Hibernate ORM core version 5.6.14.Final 
9106 [qtp1318180415-33] INFO  o.h.annotations.common.Version - HCANN000001: Hibernate Commons Annotations {5.1.2.Final} 
9624 [qtp1318180415-33] WARN  o.hibernate.orm.connections.pooling - HHH10001002: Using Hibernate built-in connection pool (not for production use!) 
9633 [qtp1318180415-33] INFO  o.hibernate.orm.connections.pooling - HHH10001005: using driver [com.mysql.jdbc.Driver] at URL [jdbc:mysql://localhost:3306/hibernate] 
9634 [qtp1318180415-33] INFO  o.hibernate.orm.connections.pooling - HHH10001001: Connection properties: {user=terwer, password=****} 
9634 [qtp1318180415-33] INFO  o.hibernate.orm.connections.pooling - HHH10001003: Autocommit mode: false 
9638 [qtp1318180415-33] INFO  o.h.e.j.c.i.DriverManagerConnectionProviderImpl - HHH000115: Hibernate connection pool size: 20 (min=1) 
Loading class `com.mysql.jdbc.Driver'. This is deprecated. The new driver class is `com.mysql.cj.jdbc.Driver'. The driver is automatically registered via the SPI and manual loading of the driver class is generally unnecessary.
10125 [qtp1318180415-33] INFO  org.hibernate.dialect.Dialect - HHH000400: Using dialect: org.hibernate.dialect.MySQL57Dialect 
10655 [qtp1318180415-33] INFO  o.hibernate.orm.connections.access - HHH10001501: Connection obtained from JdbcConnectionAccess [org.hibernate.engine.jdbc.env.internal.JdbcEnvironmentInitiator$ConnectionProviderJdbcConnectionAccess@4e90008] for (non-JTA) DDL execution was not in auto-commit mode; the Connection 'local transaction' will be committed and the Connection will be set into auto-commit mode. 
10700 [qtp1318180415-33] INFO  o.h.e.t.j.p.i.JtaPlatformInitiator - HHH000490: Using JtaPlatform implementation: [org.hibernate.engine.transaction.jta.platform.internal.NoJtaPlatform] 
Hibernate: select max(id) from person
Hibernate: insert into person (username, password, age, registerDate, id) values (?, ?, ?, ?, ?)
```

## 使用 IDEA 上手第一个 Hibernate 项目

请参考 003.使用IDEA搭建Struts2-5项目 。

在 `IDEA`​ 中，如果 `struts-default`​​ 提示不出来，可能需要以下步骤：

1、安装 `Struts2`​ 插件

2、选择 `Project Structure`​ -> 新增 `Facets`​ ，选择 `Struts 2`​ ，把对应的 xml 文件加进去

​![](https://img1.terwer.space/api/public/20230103001300.png)​

‍