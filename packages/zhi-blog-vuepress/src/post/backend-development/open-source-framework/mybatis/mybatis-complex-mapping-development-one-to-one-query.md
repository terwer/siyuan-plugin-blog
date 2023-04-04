---
title: MyBatis复杂映射开发之一对一查询
short_title: ''
description: 一对一查询需求用户表和订单表的关系为_一个用户可以有多个订单一个订单只能从属于一个用户一对一查询需求_查询一个订单同时查询出该订单所对应的用户对应的sql语句_selectfromordersouseruwhereouid=uid查询结果如下_idordertimetotaluididusernamepasswordbirthday__lucy____lucy____tom__需求分析具体实现创建user和order实体user用户信息@name_user@author_terwer@date__clas
date: 2022-08-30 11:27:13
category:
  - MyBatis
  - 后端开发
  - 开源框架
tag:
  - framework
  - mybatis
  - query
  - mybatis-10
article: true
timeline: false
---
## 一对一查询需求

用户表和订单表的关系为：一个用户可以有多个订单，一个订单只能从属于一个用户

![](https://img1.terwer.space/image-20220317170627431.png)​

一对一查询需求：查询一个订单，同时查询出该订单所对应的用户

对应的sql语句：`select * from orders o,user u where o.uid=u.id `

查询结果如下：

|id|ordertime|total|uid|id|username|password|birthday|
| :---| :--------------------| :------| :----| :---| :---------| :---------| :--------------------|
|1|2022-03-17 17:15:33|3000|1|1|lucy|123|2022-03-17 17:15:56|
|2|2022-03-17 17:15:33|4000|1|1|lucy|123|2022-03-17 17:15:56|
|3|2022-03-17 17:15:33|5000|2|2|tom|123|2022-03-17 17:15:56|

## 需求分析

![](https://img1.terwer.space/20220317185145.png)​

![](https://img1.terwer.space/20220317185151.png)​

## 具体实现

### 创建User和Order实体

* User

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
   * @date: 2022-03-17 17:41
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
* Order

  <code-group>

  <code-block title="Kotlin" active>

  ```kotlin
  /**
   * 订单
   *
   * @name: Order
   * @author: terwer
   * @date: 2022-05-08 17:42
   */
  class Order {
      var id: Int? = null
      var orderTime: String? = null
      var total: Double? = null

      // 代表当前订单属于哪一个用户
      var user: User? = null
      override fun toString(): String {
          return "Order{" +
                  "id=" + id +
                  ", orderTime='" + orderTime + '\'' +
                  ", total=" + total +
                  ", user=" + user +
                  '}'
      }
  }
  ```

  </code-block>

  <code-block title="Java">

  ```java
  /**
   * 订单
   *
   * @name: Order
   * @author: terwer
   * @date: 2022-03-17 17:42
   **/
  public class Order {
      private Integer id;
      private String orderTime;
      private Double total;

      // 代表当前订单属于哪一个用户
      private User user;

      public Integer getId() {
          return id;
      }

      public void setId(Integer id) {
          this.id = id;
      }

      public String getOrderTime() {
          return orderTime;
      }

      public void setOrderTime(String orderTime) {
          this.orderTime = orderTime;
      }

      public Double getTotal() {
          return total;
      }

      public void setTotal(Double total) {
          this.total = total;
      }

      public User getUser() {
          return user;
      }

      public void setUser(User user) {
          this.user = user;
      }

      @Override
      public String toString() {
          return "Order{" +
                  "id=" + id +
                  ", orderTime='" + orderTime + '\'' +
                  ", total=" + total +
                  ", user=" + user +
                  '}';
      }
  }
  ```

  </code-block>

  </code-group>

### 创建OrderMapper接口

<code-group>

<code-block title="Kotlin" active>

```kotlin
/**
 * 订单映射
 *
 * @name: IUserMapper
 * @author: terwer
 * @date: 2022-05-08 17:54
 */
interface OrderMapper {
    /**
     * 查询订单同时查询订单所属用户
     * @return
     */
    fun findOrderAndUser(): List<Order?>?
}
```

</code-block>

<code-block title="Java">

```java
/**
 * 订单映射
 *
 * @name: IUserMapper
 * @author: terwer
 * @date: 2022-03-17 17:54
 **/
public interface OrderMapper {
    /**
     * 查询订单同时查询订单所属用户
     * @return
     */
    public List<Order> findOrderAndUser();
}
```

</code-block>

</code-group>

### 配置OrderMapper.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.terwergreen.mapper.OrderMapper">
    <resultMap id="orderMap" type="com.terwergreen.pojo.Order">
        <result property="id" column="id"></result>
        <result property="orderTime" column="ordertime"></result>
        <result property="total" column="total"></result>

        <association property="user" javaType="com.terwergreen.pojo.User">
            <result property="id" column="uid"></result>
            <result property="username" column="username"></result>
        </association>
    </resultMap>

    <!-- resultMap：手动配置实体属性与表字段的映射关系 -->
    <select id="findOrderAndUser" resultMap="orderMap">
        select * from orders o,user u where o.uid=u.id
    </select>
</mapper>
```

**另外一种配置方法**

```xml
 <mapper namespace="com.terwergreen.mapper.OrderMapper">
    <resultMap id="orderMap" type="com.terwergreen.pojo.Order">
       <result property="id" column="id"></result>
        <result property="orderTime" column="ordertime"></result>
        <result property="total" column="total"></result>
    
        <result property="user.id" column="uid"></result>
        <result property="user.username" column="username"></result>
    </resultMap>
  
    <!-- resultMap：手动配置实体属性与表字段的映射关系 -->
    <select id="findOrderAndUser" resultMap="orderMap">
        select * from orders o,user u where o.uid=u.id
    </select>
</mapper>
```

### 测试结果

<code-group>

<code-block title="Kotlin" active>

```kotlin
@Test
@Throws(IOException::class)
fun test1() {
    val resourceAsStream = Resources.getResourceAsStream("sqlMapConfig.xml")
    val sqlSessionFactory = SqlSessionFactoryBuilder().build(resourceAsStream)
    val sqlSession = sqlSessionFactory.openSession()
    val orderMapper = sqlSession.getMapper(OrderMapper::class.java)
    val orderList = orderMapper.findOrderAndUser()
    for (order in orderList) {
        println(order)
    }
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
    OrderMapper orderMapper = sqlSession.getMapper(OrderMapper.class);

    List<Order> orderList = orderMapper.findOrderAndUser();
    for (Order order : orderList) {
        System.out.println(order);
    }
}
```

</code-block>

</code-group>

![](https://img1.terwer.space/20220317184429.png)​

> 文章更新历史  
> 2022/05/08 feat:新增Kotlin支持

‍