---
title: Mybatis基本流程及配置文件解析
short_title: ''
description: mybatis基本流程利用resources工具类加载配置文件并转换成输入输出流利用解析的配置创建sqlsessionfactory工厂生产sqlsessionsqlsession调用方法mybatis配置文件分析sqlmapconfigxmlmybatis核心配置文件层级mybatis常用配置解析输出日志在sqlmapconfigxml添加如下配置_）environments标签事务管理器（transactionmanager）类型有两种_jdbc_直接使用jdbc的提交和回滚设置依赖于从数据源得到的链
date: 2022-08-30 10:52:07
category:
  - MyBatis
  - 后端开发
  - 开源框架
tag:
  - 配置
  - 事务
  - mybatis
  - config
  - cfg
  - mybatis-9
  - framework
article: true
timeline: false
---
## Mybatis基本流程

1、利用Resources工具类加载配置文件，并转换成输入输出流

2、利用解析的配置，创建SqlSessionFactory工厂

3、生产SqlSession

4、SqlSession调用方法

## Mybatis配置文件分析

### sqlMapConfig.xml

### MyBatis核心配置文件层级

![](https://img1.terwer.space/20220317110557.png)​

### MyBatis常用配置解析

输出日志，在sqlMapConfig.xml添加如下配置：

```xml
<settings>
  <!-- 输出日志 -->
  <setting name="logImpl" value="STDOUT_LOGGING" />
</settings>
```

1）environments标签

![](https://img1.terwer.space/20220317110917.png)​

事务管理器（ `transactionManager` ）类型有两种：

JDBC：直接使用JDBC的提交和回滚设置，依赖于从数据源得到的链接来管理事务的作用域

MANAGED：几乎不做事。不提交事务也不会回滚。让容器（例如JEE的应用服务器的上下文）来管理事务的整个生命周期。

默认情况下会关闭链接，然而一些容器不希望这样，需要配置 `closeConnection` 的属性为 `false` 来阻止它的默认关闭行为。

数据源（ `DataSource` ）有三种：

* UNPOOLED：每次请求都打开和关闭链接
* POOLED：采用连接池管理JDBC链接
* JNDI：为了配合EJB容器使用，容器可以集中在外部配置数据源，然后放置一个JNDI的上下文引用

2）mapper标签

作用是加载映射，加载方式有以下四种：

* 使用相对类路径的引用，例如：

  ```xml
  <mapper resource="org/mybatis/builder/AuthorMapper.xml" />
  ```
* 使用URL，例如：

  ```xml
  <Mappper url="file:///var/mapper/AuthorMapper.xml" />
  ```
* 使用接口实现类的全限定类名，例如：

  ```xml
  <mapper class="org.mybatis.builder.AuthorMapper" />
  ```
* 使用包名称，例如：

  ```xml
  <package name="org.mybatis.builder" />
  ```

3）Properties

习惯性将数据量配置信息单独配置在 `jdbc.properties` 文件中

```properties
jdbc.dirver=com.mysql.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/zdy_mybatis?characterEncoding=utf8
jdbc.username=root
jdbc.password=123456
```

```xml
<properties resource="jdbc.properties"/>
```

![](https://img1.terwer.space/20220317133052.png)​

**注意顺序：properties必须在最前面，否则会报如下错误**

![](https://img1.terwer.space/20220317133515.png)​

4）typeAliases标签

类型别名是为Java类设置一个短的名字。原来的类型配置如下：

```xml
<select id="findAll" resultType="com.terwergreen.pojo.User">
select * from user
</select>
```

![](https://img1.terwer.space/20220317135141.png)​

配置typeAliases，为 `com.terwergreen.pojo.User` 指定别名 `user`

```xml
<typeAliases>
    <typeAlias type="com.terwergreen.pojo.User" alias="user"/>
</typeAliases>
```

```xml
<select id="findAll" resultType="user">
select * from user
</select>
```

![](https://img1.terwer.space/20220317135454.png)​

上面是我们自定义的别名，Mybatis 默认已经为我们设置好了一些别名：

![](https://img1.terwer.space/20220317135848.png)​

如果实体类较多，上面方法不可取，可以使用指定包名的方式

```xml
<!-- 为实体的全限定类名取别名 -->
<typeAliases>
  <!-- 给单独的实体起别名 -->
  <!-- <typeAlias type="com.terwergreen.pojo.User" alias="user"/> -->
  <package name="com.terwergreen.pojo"/> 
</typeAliases>
```

批量起别名：该包下所有类本身的类名，**不区分大小写**

### mapper.xml

1)动态SQL

动态SQL语句概述

https://mybatis.org/mybatis-3/dynamic-sql.html

#### 动态SQL之 `<if>`

根据实体类的不用取值，使用不同的SQL进行查询

```xml
<!-- 多条件组合查询用户：if案例 -->
<select id="findByCondition" parameterType="user" resultType="user">
  select * from user where 1=1
  <if test="id!=null">
    and id=#{id}
  </if>
  <if test="username!=null">
    and username=#{username}
  </if>
</select>
```

#### 动态SQL之 `where`

```xml
<!-- 多条件组合查询用户：where案例 -->
<select id="findByConditionWhere" parameterType="user" resultType="user">
  select * from user
  <where>
    <if test="id!=null">
        and id=#{id}
    </if>
    <if test="username!=null">
        and username=#{username}
    </if>
  </where>
</select>
```

同时设置id和username之后，日志如下：

<code-group>

<code-block title="Kotlin" active>

```kotlin
/**
 * where测试
 *
 * @throws IOException
 */
@Test
@Throws(IOException::class)
fun test7() {
    val resourceAsStream = Resources.getResourceAsStream("sqlMapConfig.xml")
    val sqlSessionFactory = SqlSessionFactoryBuilder().build(resourceAsStream)
    val sqlSession = sqlSessionFactory.openSession()
    val userDao = sqlSession.getMapper(IUserDao::class.java)
    val user = User()
    user.id = 1
    user.username = "tyw"
    val userList = userDao.findByConditionWhere(user)
    for (user2 in userList) {
        println(user2)
    }
}
```

</code-block>

<code-block title="Java">

```java
 public void test7() throws IOException {
   InputStream resourceAsStream = Resources.getResourceAsStream("sqlMapConfig.xml");
   SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(resourceAsStream);

   SqlSession sqlSession = sqlSessionFactory.openSession();
   IUserDao userDao = sqlSession.getMapper(IUserDao.class);

   User user = new User();
   user.setId(1);
   user.setUsername("tyw");
   List<User> userList = userDao.findByConditionWhere(user);

   for (User user2 : userList) {
     System.out.println(user2);
   }
 }
```

</code-block>

</code-group>

```
==>  Preparing: select * from user WHERE id=? and username=? 
==> Parameters: 1(Integer), tyw(String)
<==    Columns: id, username
<==        Row: 1, tyw
<==      Total: 1
User{id=1, username='tyw'}
```

#### 动态SQL之 `foreach`

循环执行SQL的拼接动作。例如：`select * from user where id in(1,2,4)`

测试代码

<code-group>

<code-block title="Kotlin" active>

```kotlin
/**
 * foreach测试
 *
 * @throws IOException
 */
@Test
@Throws(IOException::class)
fun test8() {
    val resourceAsStream = Resources.getResourceAsStream("sqlMapConfig.xml")
    val sqlSessionFactory = SqlSessionFactoryBuilder().build(resourceAsStream)
    val sqlSession = sqlSessionFactory.openSession()
    val userDao = sqlSession.getMapper(IUserDao::class.java)
    val ids = arrayOf(1, 2, 4)
    val userList = userDao.findByIds(ids)
    for (user2 in userList) {
        println(user2)
    }
}
```

</code-block>

<code-block title="Java">

```java
public void test8() throws IOException {
  InputStream resourceAsStream = Resources.getResourceAsStream("sqlMapConfig.xml");
  SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(resourceAsStream);

  SqlSession sqlSession = sqlSessionFactory.openSession();
  IUserDao userDao = sqlSession.getMapper(IUserDao.class);

  Integer[] ids = new Integer[]{1, 2, 4};
  List<User> userList = userDao.findByIds(ids);

  for (User user2 : userList) {
    System.out.println(user2);
  }
}
```

</code-block>

</code-group>

配置如下

```xml
<!-- 多值查询：foerach案例 -->
<select id="findByIds" parameterType="list" resultType="user">
  select * from user
  <where>
    <foreach collection="array" open="id in (" close=")" item="id" separator=",">
      #{id}
    </foreach>
  </where>
</select>
```

日志如下：

```
==>  Preparing: select * from user WHERE id in ( ? , ? , ? ) 
==> Parameters: 1(Integer), 2(Integer), 4(Integer)
<==    Columns: id, username
<==        Row: 1, tyw
<==        Row: 2, 张月
<==        Row: 4, haha
<==      Total: 3
User{id=1, username='tyw'}
User{id=2, username='张月'}
User{id=4, username='haha'}
```

foreach各项的含义如下：

`<foreach>` 用于遍历几乎

* collection：要遍历的集合元素，不能带有#{}
* open：语句开始部分
* close：结束部分
* item：遍历的元素生成的变量名
* sperator：分隔符

#### SQL片段抽取

可以将重复sql抽取出来放在sql标签中，使用时候用include

```xml
<!-- 抽取sql片段简化编写 -->
<sql id="selectUser">select * from user</sql>
```

使用

```xml
<!-- 根据ID查询用户 -->
<select id="findById" parameterType="int" resultType="user">
    <include refid="selectUser"></include> where id=#{id}
</select>
```

测试：

<code-group>

<code-block title="Kotlin" active>

```kotlin
/**
 * sql抽取测试
 *
 * @throws IOException
 */
@Test
@Throws(IOException::class)
fun test9() {
    val resourceAsStream = Resources.getResourceAsStream("sqlMapConfig.xml")
    val sqlSessionFactory = SqlSessionFactoryBuilder().build(resourceAsStream)
    val sqlSession = sqlSessionFactory.openSession()
    val userDao = sqlSession.getMapper(IUserDao::class.java)
    val user2 = userDao.findById(1)
    println(user2)
}
```

</code-block>

<code-block title="Java">

```java
/**
 * sql抽取测试
 *
 * @throws IOException
 */
@Test
public void test9() throws IOException {
    InputStream resourceAsStream = Resources.getResourceAsStream("sqlMapConfig.xml");
    SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(resourceAsStream);

    SqlSession sqlSession = sqlSessionFactory.openSession();
    IUserDao userDao = sqlSession.getMapper(IUserDao.class);

    User user2 = userDao.findById(1);

    System.out.println(user2);
}
```

</code-block>

</code-group>

日志如下：

```
==>  Preparing: select * from user where id=?
==> Parameters: 1(Integer)
<==    Columns: id, username
<==        Row: 1, tyw
<==      Total: 1
User{id=1, username='tyw'}
```

> 文章更新历史  
> 2022-08-30 feat:初稿

‍