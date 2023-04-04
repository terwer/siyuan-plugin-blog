---
title: MyBatis复杂映射开发之一对多查询
short_title: ''
description: 一对多查询模型用户和订单表的关系为一个用户有多个订单一个订单只能属于一个用户。一对多查询需求_查询多有用户与此同时查询用户具有的订单信息。一对多查询语句对应的sql语句selectuoordertimeototalouidfromuseruleftjoinordersoonuid=ouid_查询结果如下_idusernamepasswordbirthdayordertimetotaluidlucy____lucy____tom____代码实现修改user实体用户信息@name_user@author_te
date: 2022-08-30 13:28:58
category:
  - MyBatis
  - 后端开发
  - 开源框架
tag:
  - mybatis
  - framework
  - one-to-many
  - mapping
  - mybatis-11
article: true
timeline: false
---
## 一对多查询模型

用户和订单表的关系为，一个用户有多个订单，一个订单只能属于一个用户。

一对多查询需求：查询多有用户，与此同时查询用户具有的订单信息。

![](https://img1.terwer.space/20220327141112.png)​

## 一对多查询语句

对应的sql语句

```sql
select u.*,o.ordertime,o.total,o.uid from user u left join orders o on u.id = o.uid;
```

查询结果如下：

|id|username|password|birthday|ordertime|total|uid|
| :---| :---------| :---------| :--------------------| :--------------------| :------| :----|
|1|lucy|123|2022-03-17 17:15:56|2022-03-17 17:15:33|3000|1|
|1|lucy|123|2022-03-17 17:15:56|2022-03-17 17:15:33|4000|1|
|2|tom|123|2022-03-17 17:15:56|2022-03-17 17:15:33|5000|2|

## 代码实现

### 修改User实体

<code-group>

<code-block title="Kotlin" active>

```kotlin
/**
 * 用户信息
 *
 * @name: User
 * @author: terwer
 * @date: 2022-05-08 17:41
 */
class User {
    var id: Int? = null
    var username: String? = null

    // 代表当前用户具备那些订单
    var orderList: List<Order>? = null
    override fun toString(): String {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", orderList=" + orderList +
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
 * @date: 2022-03-17 17:41
 **/
public class User {
    private Integer id;
    private String username;

    // 代表当前用户具备那些订单
    private List<Order> orderList;

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

    public List<Order> getOrderList() {
        return orderList;
    }

    public void setOrderList(List<Order> orderList) {
        this.orderList = orderList;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", orderList=" + orderList +
                '}';
    }
}
```

</code-block>

</code-group>

### 创建UserMapper

<code-group>

<code-block title="Kotlin" active>

```kotlin
/**
 * 用户映射
 *
 * @name: UserMapper
 * @author: terwer
 * @date: 2022-05-08 00:03
 */
interface UserMapper {
    // 查询所有用户信息以及用户关联的订单信息
    fun findAll(): List<User?>?
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
 * @date: 2022-03-28 00:03
 **/
public interface UserMapper {
    // 查询所有用户信息以及用户关联的订单信息
    public List<User> findAll();
}
```

</code-block>

</code-group>

### 配置UserMapper.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.terwergreen.mapper.UserMapper">
    <resultMap id="userMap" type="com.terwergreen.pojo.User">
        <result property="id" column="id"></result>
        <result property="username" column="username"></result>

        <collection property="orderList" ofType="com.terwergreen.pojo.Order">
            <result property="id" column="uid"></result>
            <result property="orderTime" column="ordertime"></result>
            <result property="total" column="total"></result>
        </collection>
    </resultMap>

    <!-- resultMap：手动配置实体属性与表字段的映射关系 -->
    <select id="findAll" resultMap="userMap">
        select u.*,o.ordertime,o.total,o.uid from user u left join orders o on u.id = o.uid
    </select>
</mapper>
```

### 测试

<code-group>

<code-block title="Kotlin" active>

```kotlin
@Test
@Throws(IOException::class)
fun test2() {
    val resourceAsStream = Resources.getResourceAsStream("sqlMapConfig.xml")
    val sqlSessionFactory = SqlSessionFactoryBuilder().build(resourceAsStream)
    val sqlSession = sqlSessionFactory.openSession()
    val userMapper = sqlSession.getMapper(UserMapper::class.java)
    val userList = userMapper.findAll()
    for (user in userList) {
        println(user)
    }
}
```

</code-block>

<code-block title="Java">

```java
@Test
public void test2() throws IOException {
    InputStream resourceAsStream = Resources.getResourceAsStream("sqlMapConfig.xml");
    SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(resourceAsStream);

    SqlSession sqlSession = sqlSessionFactory.openSession();
    UserMapper userMapper = sqlSession.getMapper(UserMapper.class);

    List<User> userList = userMapper.findAll();
    for (User user : userList) {
        System.out.println(user);
    }
}
```

</code-block>

</code-group>

执行结果

![](https://img1.terwer.space/20220328001602.png)​

> 文章更新历史  
> 2022/05/08 feat:新增Kotlin支持

‍