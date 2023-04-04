---
title: MyBatis常用注解及基本增删改查的注解实现
short_title: ''
description: mybatis的常用注解注解可以减少mapper文件的编写常用注解如下_@insert_实现新增@update_实现更新@delete_实现删除@select_实现查询@result_实现结果集封装@results_可以和@result一起使用封装多个结果集@one_实现一对一结果集封装@many_实现多对多结果集封装mybatis的增删改查数据库配置依旧保存不变jdbcproperties#新版驱动名称发生了改变#jdbcdriver=commysqljdbcdriverjdbcdriver=commy
date: 2022-08-30 17:12:42
category:
  - MyBatis
  - 后端开发
  - 开源框架
tag:
  - mybatis
  - annotation
  - framework
  - mybatis-13
article: true
timeline: false
---
## MyBatis 的常用注解

注解可以减少 Mapper 文件的编写，常用注解如下;

`@Insert`：实现新增

`@Update`：实现更新

`@Delete`：实现删除

`@Select`：实现查询

`@Result`：实现结果集封装

`@Results`：可以和@Result 一起使用，封装多个结果集

`@One`：实现一对一结果集封装

`@Many`：实现多对多结果集封装

## MyBatis 的增删改查

数据库配置依旧保存不变

jdbc.properties

```properties
# 新版驱动名称发生了改变
# jdbc.driver=com.mysql.jdbc.Driver
jdbc.driver=com.mysql.cj.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/test?characterEncoding=utf8&useSSL=false
jdbc.username=terwer
jdbc.password=123456
```

sqlMapConfig.xml

```xml
<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <!-- 加载外部的 propeties 文件 -->
    <properties resource="jdbc.properties"/>

    <settings>
        <!-- 输出日志 -->
        <setting name="logImpl" value="STDOUT_LOGGING" />
    </settings>

    <!-- 为实体的全限定类名取别名 -->
    <typeAliases>
        <!-- 给单独的实体起别名 -->
        <!-- <typeAlias type="com.terwergreen.pojo.User" alias="user"/> -->

        <!-- 批量起别名：改包下所有类本身的类名，不区分大小写 -->
        <package name="com.terwergreen.pojo"/> 
    </typeAliases>

    <!-- environments：运行环境 -->
    <environments default="development">
        <environment id="development">
            <!-- 当前事务交给 JDBC 管理 -->
            <transactionManager type="JDBC"></transactionManager>
            <!-- 当前使用 MyBatis 提供的连接池 -->
            <dataSource type="POOLED">
                <property name="driver" value="${jdbc.driver}"/>
                <property name="url" value="${jdbc.url}"/>
                <property name="username" value="${jdbc.username}"/>
                <property name="password" value="${jdbc.password}"/>
            </dataSource>
        </environment>
        <environment id="production">
            <transactionManager type="JDBC"></transactionManager>
            <dataSource type="POOLED">
                <property name="driver" value="${jdbc.driver}"/>
                <property name="url" value="${jdbc.url}"/>
                <property name="username" value="${jdbc.username}"/>
                <property name="password" value="${jdbc.password}"/>
            </dataSource>
        </environment>
    </environments>

    <!-- 引入映射配置文件 -->
    <mappers>
        <!--
        <mapper resource="OrderMapper.xml"/>
        -->
        <package name="com.terwergreen.mapper"/>
    </mappers>
</configuration>
```

User

<code-group>

<code-block title="Kotlin" active>

```kotlin
class User {
    var id: Int? = null
    var username: String? = null

    override fun toString(): String {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\''
                '}'
    }
}
```

</code-block>

<code-block title="Java">

```java
public class User {
    private Integer id;
    private String username;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\''
                '}';
    }
}
```

</code-block>

</code-group>

UserMapper

<code-group>

<code-block title="Kotlin" active>

```kotlin
interface UserMapper {
    @Select("select * from user")
    fun findAll(): List<User?>?

    @Insert("insert into user(username) values(#{username})")
    fun add(user: User?)

    @Update("update user set username=#{username} where id=#{id}")
    fun update(user: User?)

    @Delete("delete from user where id=#{id}")
    fun delete(id: Int?)
}
```

</code-block>

<code-block title="Java">

```java
/**
 * 用户映射
 *
 * @name: UserMapper
 * @author: terwer
 * @date: 2022-05-25 13:27
 **/
public interface UserMapper {
    @Select("select * from user")
    List<User> findAll();

    @Insert("insert into user(username) values(#{username})")
    void add(User user);

    @Update("update user set username=#{username} where id=#{id}")
    void update(User user);

    @Delete("delete from user where id=#{id}")
    void delete(Integer id);
}
```

</code-block>

</code-group>

结果测试

</code-group>

UserMapper

<code-group>

<code-block title="Kotlin" active>

```kotlin
class UserMapperTest {
    private var userMapper: UserMapper? = null
    private var sqlSession: SqlSession? = null
    @Before
    @Throws(Exception::class)
    fun before() {
        println("before...")
        val resourceAsStream = Resources.getResourceAsStream("sqlMapConfig.xml")
        val sqlSessionFactory = SqlSessionFactoryBuilder().build(resourceAsStream)
        sqlSession = sqlSessionFactory.openSession()
        userMapper = sqlSession?.getMapper(UserMapper::class.java)
    }

    @Test
    fun testFindAll() {
        val all = userMapper!!.findAll()
        for (user in all) {
            println(user)
        }
    }

    @Test
    @Throws(IOException::class)
    fun add() {
        val user = User()
        user.username = "测试3"
        userMapper!!.add(user)

        // 这里一定要加，否则不会提交事务
        sqlSession!!.commit(true)
    }

    @Test
    fun update() {
        val user = User()
        user.id = 3
        user.username = "测试11"
        userMapper!!.update(user)

        // 这里一定要加，否则不会提交事务
        sqlSession!!.commit(true)
    }

    @Test
    fun delete() {
        userMapper!!.delete(3)

        // 这里一定要加，否则不会提交事务
        sqlSession!!.commit(true)
    }
}
```

</code-block>

<code-block title="Java">

```java
public class UserMapperTest {

    private UserMapper userMapper;
    private SqlSession sqlSession;

    @Before
    public void before() throws Exception {
        System.out.println("before...");
        InputStream resourceAsStream = Resources.getResourceAsStream("sqlMapConfig.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(resourceAsStream);
        sqlSession = sqlSessionFactory.openSession();
        userMapper = sqlSession.getMapper(UserMapper.class);
    }

    @Test
    public void testFindAll() {
        List<User> all = userMapper.findAll();
        for (User user : all) {
            System.out.println(user);
        }
    }

    @Test
    public void add() throws IOException {
        User user = new User();
        user.setUsername("测试3");
        userMapper.add(user);

        // 这里一定要加，否则不会提交事务
        sqlSession.commit(true);
    }

    @Test
    public void update() {
        User user = new User();
        user.setId(3);
        user.setUsername("测试11");
        userMapper.update(user);

        // 这里一定要加，否则不会提交事务
        sqlSession.commit(true);
    }

    @Test
    public void delete() {
        userMapper.delete(3);

        // 这里一定要加，否则不会提交事务
        sqlSession.commit(true);
    }
}
```

</code-block>

</code-group>

注意：默认不会自动提交事务，可以手动设置SqlSession，也可以在创建SqlSession的时候指定自动提交事务。

```java
// sqlSession = sqlSessionFactory.openSession();
// 这样也是可以的，这样的话后面就不用每次都设置了
sqlSession = sqlSessionFactory.openSession(true);
```

## 本文代码地址

[mybatis-annotation](https://github.com/terwer/senior-java-engineer-road/tree/mybatis-annotation)

> 文章更新历史
>
> 2022-08-30 feat:初稿
>