---
title: MyBatis的基本使用
short_title: ''
description: 快速入门mybatis的官网_https_mybatisorgmybatismybatis的开发步骤添加mybatis的坐标创建user数据表createtable`user`(`id`int()notnullauto_increment`username`varchar()defaultnull`password`varchar()defaultnullprimarykey(`id`))engine=innodbauto_increment=defaultcharset=utfmb_insertinto
date: 2022-08-30 00:29:58
category:
  - MyBatis
  - 后端开发
  - 开源框架
tag:
  - mybatis
  - basic
  - use
  - framework
  - mybatis-8
article: true
timeline: false
---
## 快速入门

Mybatis的官网：[https://mybatis.org/mybatis-3/](https://mybatis.org/mybatis-3/)

## MyBatis的开发步骤

### 添加MyBatis的坐标

```xml
<properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <maven.compiler.encoding>UTF-8</maven.compiler.encoding>
    <java.version>1.8</java.version>
    <maven.compiler.source>1.8</maven.compiler.source>
    <maven.compiler.target>1.8</maven.compiler.target>
</properties>

<dependencies>
    <!--mybatis坐标-->
    <dependency>
        <groupId>org.mybatis</groupId>
        <artifactId>mybatis</artifactId>
        <version>3.4.5</version>
    </dependency>
    <!--mysql驱动坐标-->
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>5.1.6</version>
        <scope>runtime</scope>
    </dependency>
    <!--单元测试坐标-->
    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.12</version>
        <scope>test</scope>
    </dependency>
    <!--⽇志坐标-->
    <dependency>
        <groupId>log4j</groupId>
        <artifactId>log4j</artifactId>
        <version>1.2.12</version>
    </dependency>
</dependencies>
```

### 创建user数据表

```sql
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

INSERT INTO `user` VALUES ('1', '小唐', '123');
INSERT INTO `user` VALUES ('2', '小张', '456');
INSERT INTO `user` VALUES ('3', '小雨', '789');
```

### 编写User实体类

<code-group>

<code-block title="Kotlin" active>

```kotlin
/**
 * 用户信息
 *
 * @name: User
 * @author: terwer
 * @date: 2022-05-08 11:32
 */
class User {
    var id: Int? = null
    var username: String? = null
    override fun toString(): String {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                '}'
    }
}
```

</code-block>

<code-block title="Java">

```java
/**
 * 用户信息
 *
 * @name: User
 * @author: terwer
 * @date: 2022-03-15 11:32
 **/
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
                ", username='" + username + '\'' +
                '}';
    }
}
```

</code-block>

</code-group>

### 编写映射⽂件UserMapper.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="user">
    <select id="findAll" resultType="com.test.pojo.User">
        select * from user
    </select>
</mapper>
```

### 编写核⼼⽂件SqlMapConfig.xml

```xml
<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
"http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <environments default="development">
        <environment id="development">
            <!-- 当前事务交给JDBC -->
            <transactionManager type="JDBC"></transactionManager>
            <!-- 当前只用MyBatis提供的连接池 -->
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://localhost:3306/zdy_mybatis"/>
                <property name="username" value="root"/>
                <property name="password" value="123456"/>
            </dataSource>
        </environment>
    </environments>

    <mappers>
        <mapper resource="UserMapper.xml"/>
    </mappers>
</configuration>
```

### 编写测试类

<code-group>

<code-block title="Kotlin" active>

```kotlin
@Test
@Throws(IOException::class)
fun test1() {
    val resourceAsStream = Resources.getResourceAsStream("sqlMapConfig.xml")
    val sqlSessionFactory = SqlSessionFactoryBuilder().build(resourceAsStream)
    val sqlSession = sqlSessionFactory.openSession()
    val userList = sqlSession.selectList<User>("user.findAll")
    for (user in userList) {
        println(user)
    }

    // 关闭资源
    sqlSession.close()
}
```

</code-block>

<code-block title="Java">

```java
@Test
public void test1() throws IOException {
    InputStream resourceAsStream = Resources.getResourceAsStream("sqlMapConfig.xml");
    SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(resourceAsStream);

    SqlSession sqlSession = sqlSessionFactory.openSession();
    List<User> userList = sqlSession.selectList("user.findAll");
    for (User user : userList) {
        System.out.println(user);
    }

    // 关闭资源
    sqlSession.close();
}
```

</code-block>

</code-group>

运行结果

![](https://img1.terwer.space/20220315123042.png)​

!乱码解决

修改url为

```
jdbc:mysql://localhost:3306/zdy_mybatis?characterEncoding=utf8
```

效果

![](https://img1.terwer.space/20220315123048.png)​

完善，添加新增方法

```xml
<!-- 添加用户
parameterType：参数类型
-->
<insert id="saveUser" parameterType="com.terwergreen.pojo.User">
insert into user(id, username) values(#{id}, #{username})
</insert>
```

![](https://img1.terwer.space/20220315125151.png)​

没有添加成功原因

**未提交事务**

解决

```java
sqlSession.insert("user.saveUser", user);
sqlSession.commit();
```

![](https://img1.terwer.space/20220315125432.png)​

更新

```xml
<!-- 修改 -->
  <update id="updateUser" parameterType="com.terwergreen.pojo.User">
  update user set username=#{username} where id=#{id}
</update>
```

![](https://img1.terwer.space/20220315150958.png)​

删除

```xml
<!-- 删除 -->
<update id="deleteUser" parameterType="java.lang.Integer">
delete from user where id=#{id}
</update>
```

![](https://img1.terwer.space/20220315151955.png)​

备注：只有一个参数的时候，参数名的占位符可以是任意字符，例如下面的语句也是正常的

```xml
<!-- 删除 -->
<update id="deleteUser" parameterType="java.lang.Integer">
delete from user where id=#{abc}
</update>
```

## MyBatis的Dao层实现

#### 传统开发方式

1. 定义Dao层接口

    <code-group>

    <code-block title="Kotlin" active>

    ```kotlin
    /**
     * 用户Dao层接口
     *
     * @name: IUserDao
     * @author: terwer
     * @date: 2022-05-08 20:53
     */
    interface IUserDao {
        /**
         * 查询所有用户
         */
        @Throws(IOException::class)
        fun findAll(): List<User?>?
    }
    ```

    </code-block>

    <code-block title="Java">

    ```java
    /**
     * 用户Dao层接口
     *
     * @name: IUserDao
     * @author: terwer
     * @date: 2022-03-16 20:53
     **/
    public interface IUserDao {
        /**
         * 查询所有用户
         */
        public List<User> findAll() throws IOException;
    }
    ```

    </code-block>

    </code-group>
2. DaoImpl实现

    <code-group>

    <code-block title="Kotlin" active>

    ```kotlin
    /**
     * 用户Dao层实现类
     *
     * @name: UserDaoImpl
     * @author: terwer
     * @date: 2022-05-08 20:54
     */
    class UserDaoImpl : IUserDao {
        @Throws(IOException::class)
        override fun findAll(): List<User> {
            val resourceAsStream = Resources.getResourceAsStream("sqlMapConfig.xml")
            val sqlSessionFactory = SqlSessionFactoryBuilder().build(resourceAsStream)
            val sqlSession = sqlSessionFactory.openSession()
            val userList = sqlSession.selectList<User>("user.findAll")

            // 关闭资源
            sqlSession.close()
            return userList
        }
    }
    ```

    </code-block>

    <code-block title="Java">

    ```java
    /**
     * 用户Dao层实现类
     *
     * @name: UserDaoImpl
     * @author: terwer
     * @date: 2022-03-16 20:54
     **/
    public class UserDaoImpl implements IUserDao {
        @Override
        public List<User> findAll() throws IOException {
            InputStream resourceAsStream = Resources.getResourceAsStream("sqlMapConfig.xml");
            SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(resourceAsStream);

            SqlSession sqlSession = sqlSessionFactory.openSession();
            List<User> userList = sqlSession.selectList("user.findAll");

            // 关闭资源
            sqlSession.close();
            return userList;
        }
    }
    ```

    </code-block>

    </code-group>
3. 测试

    <code-group>

    <code-block title="Kotlin" active>

    ```kotlin
    // ===============
    // Dao层常规方式
    @Test
    @Throws(IOException::class)
    fun test5() {
        val userDao: IUserDao = UserDaoImpl()
        val userList = userDao.findAll()
        for (user in userList) {
            println(user)
        }
    }
    ```

    </code-block>

    <code-block title="Java">

    ```java
    @Test
    public void test5() throws Exception{
        IUserDao userDao = new UserDaoImpl();
        List<User> all = userDao.findAll();

        for (User user : all) {
            System.out.println(user);
        }
    }
    ```

    </code-block>

    </code-group>

#### 代理开发方式

Mapper 接口开发方法只需要程序员编写Mapper 接口(相当于Dao 接口)，由Mybatis 框架根据接口定义创建接

口的动态代理对象，代理对象的方法体同上边Dao接口实现类方法。

 Mapper 接口开发需要遵循以下规范:

 **1) Mapper.xml**文件中的**namespace**与**mapper**接口的全限定名相同

 **2) Mapper**接口方法名和**Mapper.xml**中定义的每个**statement**的**id**相同

 **3) Mapper**接口方法的输入参数类型和**mapper.xml**中定义的每个**sql**的**parameterType**的类型相同

 **4) Mapper**接口方法的输出参数类型和**mapper.xml**中定义的每个**sql**的**resultType**的类型相同

编写UserMapper接口

![](https://img1.terwer.space/20220317105202.png)​

测试代理方式

<code-group>

<code-block title="Kotlin" active>

```kotlin
// ===============
// Dao层代理开发方式
@Test
@Throws(IOException::class)
fun test5() {
    val resourceAsStream = Resources.getResourceAsStream("sqlMapConfig.xml")
    val sqlSessionFactory = SqlSessionFactoryBuilder().build(resourceAsStream)
    val sqlSession = sqlSessionFactory.openSession()
    val userDao = sqlSession.getMapper(IUserDao::class.java)
    val userList = userDao.findAll()
    for (user in userList) {
        println(user)
    }
}
```

</code-block>

<code-block title="Java">

```java
// ===============
// Dao层代理开发方式
@Test
public void test5() throws IOException {
  InputStream resourceAsStream = Resources.getResourceAsStream("sqlMapConfig.xml");
  SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(resourceAsStream);

  SqlSession sqlSession = sqlSessionFactory.openSession();
  IUserDao userDao = sqlSession.getMapper(IUserDao.class);

  List<User> userList = userDao.findAll();

  for (User user : userList) {
    System.out.println(user);
  }
}
```

</code-block>

</code-group>

![image-20220317102917399](https://img1.terwer.space/20220317102942.png)​

> 文章更新历史  
> 2022/05/08 feat:新增Kotlin支持

<div>
<code-group>
</div>

<div>
<code-block title="Kotlin" active>
</div>

<div>
</code-block>
</div>

<div>
<code-block title="Java">
</div>

<div>
</code-block>
</div>

<div>
</code-group>
</div>

<div>
<code-group>
</div>

<div>
<code-block title="Kotlin" active>
</div>

<div>
</code-block>
</div>

<div>
<code-block title="Java">
</div>

<div>
</code-block>
</div>

<div>
</code-group>
</div>

<div>
<code-group>
</div>

<div>
<code-block title="Kotlin" active>
</div>

<div>
</code-block>
</div>

<div>
<code-block title="Java">
</div>

<div>
</code-block>
</div>

<div>
</code-group>
</div>