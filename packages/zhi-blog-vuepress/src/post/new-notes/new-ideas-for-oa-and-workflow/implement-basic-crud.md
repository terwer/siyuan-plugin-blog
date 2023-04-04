---
title: SSH框架整合续之实现基本的增删改查
short_title: ''
description: SSH框架整合续之实现基本的增删改查。IDEA->new->Project，创建一个Maven的webapp项目，选择 org.apache.maven的webapp骨架。
date: 2022-05-28 15:40:55
category:
  - OA与工作流新思路
  - 新笔记
tag:
  - spring
  - struts
  - hibernate
article: true
timeline: false
---
:::tip

注意：本文以 struts2 版本为例，其他项目架构类似。

:::

## 数据库准备

```sql
-- 创建数据库
create database hoa default character set utf8mb4 collate utf8mb4_general_ci;
use hoa;
```

## 配置 DAO 层

### 数据源、session 工厂、事务等

```xml
<!-- 数据源 -->
<bean id="dataSource" class="org.apache.commons.dbcp2.BasicDataSource">
    <property name="driverClassName" value="com.mysql.jdbc.Driver"></property>
    <property name="url" value="jdbc:mysql://localhost:3306/hoa?useSSL=false"></property>
    <property name="username" value="root"></property>
    <property name="password" value="123456"></property>
    <property name="maxTotal" value="100"></property>
    <property name="maxIdle" value="30"></property>
    <property name="defaultAutoCommit" value="true"></property>
</bean>

<!-- session工厂 -->
<bean id="sessionFactory" class="org.springframework.orm.hibernate5.LocalSessionFactoryBean">
    <property name="dataSource" ref="dataSource"></property>
    <property name="hibernateProperties">
        <props>
            <prop key="hibernate.dialect">org.hibernate.dialect.MySQL57Dialect</prop>
            <prop key="hibernate.hbm2ddl.auto">update</prop>
            <prop key="hibernate.show_sql">true</prop>
        </props>
    </property>
    <property name="mappingLocations">
        <list>
            <value>classpath:/com/terwergreen/hoa/bean/*.hbm.xml</value>
        </list>
    </property>
</bean>

<!-- 事务管理器 -->
<bean id="transactionManager" class="org.springframework.orm.hibernate5.HibernateTransactionManager">
    <property name="sessionFactory" ref="sessionFactory"/>
</bean>

<!-- 开启事务控制的注解支持，配置 Annotation 驱动，扫描@Transactional注解的类定义事务  -->
<tx:annotation-driven transaction-manager="transactionManager" proxy-target-class="true"/>
```

## 配置 service 和 action

```xml
<!-- 业务bean分层依赖 -->
<bean id="userDao" class="com.terwergreen.hoa.dao.impl.UserDaoImpl" scope="singleton">
    <property name="sessionFactory" ref="sessionFactory"></property>
</bean>

<bean id="userService" class="com.terwergreen.hoa.service.impl.UserServiceImpl" scope="prototype">
    <property name="userDao" ref="userDao"></property>
</bean>

<bean id="saveUserAction" class="com.terwergreen.hoa.action.user.SaveUserAction" scope="prototype">
    <property name="userService" ref="userService"></property>
</bean>

<bean id="listUserAction" class="com.terwergreen.hoa.action.user.ListUserAction" scope="prototype">
    <property name="userService" ref="userService"></property>
</bean>
```

### 用户模型

```java
/**
 * 用户模型
 *
 * @name: User
 * @author: terwer
 * @date: 2022-05-06 20:54
 **/
public class User {
    private Integer id;
    private String firstname;
    private String lastname;
    private Integer age;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }
}
```

### User.hbm.xml

```java
<?xml version="1.0"?>
<!DOCTYPE hibernate-mapping PUBLIC
        "-//Hibernate/Hibernate Mapping DTD 3.0//EN"
        "http://www.hibernate.org/dtd/hibernate-mapping-3.0.dtd">

<hibernate-mapping package="com.terwergreen.hoa.bean">
    <class name="User" table="user" >
        <id name="id" type="java.lang.Integer">
            <generator class="increment"></generator>
        </id>
        <property name="firstname" type="java.lang.String" column="firstname" length="50"></property>
        <property name="lastname" type="java.lang.String" column="lastname" length="50"></property>
        <property name="age" type="java.lang.Integer" column="age"></property>
    </class>
</hibernate-mapping>
```

### UserDao

```java
/**
 * @name: UserDao
 * @author: terwer
 * @date: 2022-05-06 21:44
 **/
public interface UserDao {
    void saveUser(User user);

    void removeUser(User user);

    User getUserById(Integer id);

    List<User> findAllUsers();

    void updateUser(User user);
}
```

### User 的 DAO 实现

```java
/**
 * @name: UserDaoImpl
 * @author: terwer
 * @date: 2022-05-06 21:47
 **/
public class UserDaoImpl extends HibernateDaoSupport implements UserDao {
    @Override
    public void saveUser(User user) {
        this.getHibernateTemplate().save(user);
    }

    @Override
    public void removeUser(User user) {
        this.getHibernateTemplate().delete(user);
    }

    @Override
    public User getUserById(Integer id) {
        User user = this.getHibernateTemplate().get(User.class, id);
        return user;
    }

    @Override
    public List<User> findAllUsers() {
        String hql = "from User user order by user.id desc";
        return (List<User>) this.getHibernateTemplate().find(hql);
    }

    @Override
    public void updateUser(User user) {
        this.getHibernateTemplate().update(user);
    }
}
```

### UserService

```java
/**
 * 用户业务接口
 *
 * @name: UserService
 * @author: terwer
 * @date: 2022-05-06 22:00
 **/
public interface UserService {
    List<User> findAll();

    void saveUser(User user);

    void deleteUser(User user);

    User findById(Integer id);

    void updateUser(User user);
}
```

UserService 的实现

```java
/**
 * 用户业务实现类
 *
 * @name: UserServiceImpl
 * @author: terwer
 * @date: 2022-05-06 22:02
 **/
public class UserServiceImpl implements UserService {

    private UserDao userDao;

    @Override
    public List<User> findAll() {
        return userDao.findAllUsers();
    }

    public UserDao getUserDao() {
        return userDao;
    }

    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }

    @Transactional(readOnly = false)
    @Override
    public void saveUser(User user) {
        userDao.saveUser(user);
    }

    @Override
    public void deleteUser(User user) {
        userDao.removeUser(user);
    }

    @Override
    public User findById(Integer id) {
        return userDao.getUserById(id);
    }

    @Override
    public void updateUser(User user) {
        userDao.updateUser(user);
    }
}
```

### ListUserAction

```java
/**
 * 展示用户信息
 *
 * @name: ListUserAction
 * @author: terwer
 * @date: 2022-05-07 01:05
 **/
public class ListUserAction extends ActionSupport {
    private UserService userService;

    public UserService getUserService() {
        return userService;
    }

    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @Override
    public String execute() throws Exception {
        ActionContext context = ActionContext.getContext();
        Map request = (Map) context.get("request");

        List<User> userList = userService.findAll();
        request.put("userList", userList);

        return SUCCESS;
    }
}
```

### SaveUserAction

```java
/**
 * 用户Action
 *
 * @name: SaveUserAction
 * @author: terwer
 * @date: 2022-05-06 21:05
 **/
public class SaveUserAction extends ActionSupport {
    private static final Logger logger = LoggerFactory.getLogger(SaveUserAction.class);

    private User user;
    private UserService userService;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public UserService getUserService() {
        return userService;
    }

    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @Override
    public String execute() {
        try {
            logger.info("开始保存用户");
            userService.saveUser(user);
        } catch (Exception e) {
            logger.error("保存用户出错：", e);
        }

        return SUCCESS;
    }
}
```

## 配置 struts.xml

```java
<!DOCTYPE struts PUBLIC
        "-//Apache Software Foundation//DTD Struts Configuration 2.5//EN"
        "http://struts.apache.org/dtds/struts-2.5.dtd">

<struts>
    <!--
    <constant name="struts.ui.theme" value="simple" />
    <constant name="struts.ui.templateDir" value="template" />
    <constant name="struts.ui.templateSuffix" value="ftl" />
    -->
    <!-- 国际化
    <constant name="struts.custom.i18n.resources" value="globalMessages"/>
    -->

    <package name="user" extends="struts-default">
        <!--
        <default-action-ref name="index"/>
        <action name="index">
            <result name="success">/index.jsp</result>
        </action>
        -->

        <action name="saveUser" class="saveUserAction">
            <result name="success" type="redirect">listUser.action</result>
            <!---
            <result name="input" type="redirect">/saveUser.jsp</result>
            -->
        </action>
        <action name="listUser" class="listUserAction">
            <result name="success">/listUser.jsp</result>
        </action>
    </package>
</struts>
```

## 国际化

### 配置 struts.properties

```properties
struts.custom.i18n.resources=globalMessages
```

### 新建资源文件

```properties
#Fri May 06 21:28:47 CST 2022
age=年龄
firstname=姓名
lastname=昵称
```

```properties
#Fri May 06 21:28:47 CST 2022
age=age
firstname=firstname
lastname=lastname
```

![image-20220528162042574](https://img1.terwer.space/20220528162043.png)

### 使用

```properties
<s:form action="saveUser">
    <s:textfield name="user.firstname" label="%{getText('firstname')}"></s:textfield>
    <s:textfield name="user.lastname" label="%{getText('lastname')}"></s:textfield>
    <s:textfield name="user.age" label="%{getText('age')}"></s:textfield>

    <s:submit value="提交"></s:submit>
</s:form>
```

## 注意

如果实现 struts 的 tag 报错情况，可以去 jar 包里面拷贝到 WEB-INF 目录

![image-20220528162527155](https://img1.terwer.space/20220528162527.png)

使用之前要加上标签声明

```properties
<%@ taglib prefix="s" uri="/struts-tags" %>
```

tag 文件路径（解压 stuts-core.jar 就可以看到）

可以先在.m2 对应路径拷贝 jar 包到临时目录，然后修为 zip，并解压

![image-20220528162835878](https://img1.terwer.space/20220528162836.png)

```bash
cd /mytemp
mkdir struts2-core-2.5.30
mv struts2-core-2.5.30.zip ./struts2-core-2.5.30
cd struts2-core-2.5.30

unzip struts2-core-2.5.30.zip
rm struts2-core-2.5.30.zip
```

在 META-INF 目录下可以找到

![image-20220528164426480](https://img1.terwer.space/20220528164426.png)