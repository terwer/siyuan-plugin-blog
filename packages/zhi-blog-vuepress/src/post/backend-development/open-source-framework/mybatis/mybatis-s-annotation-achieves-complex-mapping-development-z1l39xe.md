---
title: MyBatis的注解实现复杂映射开发
short_title: ''
description: xml配置方式实现复杂映射回顾​实现复杂映射我们之前可以在映射文件中通过配置来实现使用注解开发后我们可以通过@results注解@result注解@one注解和@many注解组合完成复杂关系的配置。注解说明@results代替的是标签该注解中可以使用单个的@result注解也可以使用@result集合。使用方式_@results({@result()@result()})或者@results(@result())@result代替了标签和标签@result中的属性介绍column_数据库中的列名prope
date: 2022-08-31 00:12:54
category:
  - MyBatis
  - 后端开发
  - 开源框架
tag:
  - 注解
  - mybatis
  - complex
  - framework
  - mybatis-14
  - mapping
article: true
timeline: false
---
## xml 配置方式实现复杂映射回顾

![](https://img1.terwergreen.com/api/public/20220831002257.png)​

实现复杂映射我们之前可以在映射文件中通过配置来实现，使用注解开发后，我们可以通过 `@Results` 注解，`@Result` 注解，`@One` 注解和 `@Many` 注解组合完成复杂关系的配置。

|注解|说明|
| ---------------| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|@Results<br />|代替的是标签 <ResultMap>，该注解中可以使用单个的 @Result 注解，也可以使用 @Result 集合。<br />使用方式：`@Results({@Result(), @Result()})` 或者 `@Results(@Result())`|
|@Result<br />|代替了 <id> 标签和 <result> 标签<br />@Result 中的属性介绍<br />column：数据库中的列名<br />property：要装配的属性名<br />one：需要使用 @One 注解（ `@Result(one=@One)()` ）<br />many：需要使用 @Many 注解（ `@Result(many=@many)()` ）|
|@One（一对一）|代替了 <assocation> 标签，是多表查询的关键，在注解中用来指定子查询返回单一对象。<br />@One 注解属性介绍<br />select：指定用来多表查询的  sqlmapper<br />使用格式：`@Result(column="", property="", one=(select=""))`|
|@Many（多对一）|代替了 <collection> 标签，是多表查询的关键，在注解中用来指定子查询返回对象集合。<br />使用格式：`@Result(property="", column="", many=@many(select=""))`|

## 一对一查询

### 一对一查询的模型

用户表和订单表的关系为，一个用户有多个订单，一共订单只属于一个用户

一对一查询需求：查询一个订单，与此同时查询该订单对应的用户

```plantuml
@startuml

!include https://unpkg.com/plantuml-style-c4@latest/core.puml
' uncomment the following line and comment the first to use locally
'!include core.puml

left to right direction

class orders {
   ordertime: varchar(255)
   total: double
   uid: int(11)
   id: int(11)
}
class user {
   username: varchar(50)
   password: varchar(50)
   birthday: varchar(50)
   id: int(11)
}

orders  -[#595959,plain]-^  user   : "uid:id"
@enduml
```

### 一对一查询的语句

对应的 sql 语句

```sql
select * from orders;
select * from user where id=查询出订单的uid;
```

查询结果如下：

|id|ordertime|total|uid|id|username|password|birthday|
| :-| :---------| :----| :--| :-| :-------| :-------| :---------|
|1|2019-12-12|3000|1|1|lucy|123|2019-12-12|
|2|2019-12-12|4000|1|1|lucy|123|2019-12-12|
|3|2019-12-12|5000|2|1|lucy|123|2019-12-12|
|1|2019-12-12|3000|1|2|tom|123|2019-12-12|

### 创建 User 和 Order 实体

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

/**
 * 用户
 *
 * @name: User
 * @author: terwer
 * @date: 2022-05-25 13:25
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

### 创建 IOrderMapper 接口

```java
/**
 * 订单映射
 *
 * @name: IUserMapper
 * @author: terwer
 * @date: 2022-03-17 17:54
 **/
public interface IOrderMapper {
    public List<Order> findOrderAndUser();
}
```

### 使用注解配置接口

```java
/**
 * 订单映射
 *
 * @name: IUserMapper
 * @author: terwer
 * @date: 2022-03-17 17:54
 **/
public interface IOrderMapper {
    /**
     * 查询订单同时查询订单所属用户
     *
     * @return
     */
    @Results({
            @Result(property = "id", column = "id"),
            @Result(property = "orderTime", column = "ordertime"),
            @Result(property = "total", column = "total"),
            @Result(property = "user", column = "uid", javaType = User.class, one = @One(select = "com.terwergreen.mapper.IUserMapper.findUserById"))
    })
    @Select("select * from orders")
    public List<Order> findOrderAndUser();
}
```

```java
/*
 * 用户映射
 *
 * @name: IUserMapper
 * @author: terwer
 * @date: 2022-05-25 13:27
 **/
public interface IUserMapper {
    /**
     * 根据ID查询用户
     * @param id
     * @return
     */
    @Select("select * from user where id=#{id}")
    User findUserById(Integer id);
}
```

### 测试结果

```java
/**
 * 订单测试
 *
 * @name: IOrderMapperTest
 * @author: terwer
 * @date: 2022-08-31 22:52
 **/
public class IOrderMapperTest {
    private IOrderMapper orderMapper;
    private SqlSession sqlSession;

    @Before
    public void before() throws Exception {
        System.out.println("before...");
        InputStream resourceAsStream = Resources.getResourceAsStream("sqlMapConfig.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(resourceAsStream);
        sqlSession = sqlSessionFactory.openSession();
        // 这样也是可以的，这样的话后面就不用每次都设置了
        // sqlSession = sqlSessionFactory.openSession(true);
        orderMapper = sqlSession.getMapper(IOrderMapper.class);
    }

    @Test
    public void testFindOrder() throws Exception {
        List<Order> orderAndUser = orderMapper.findOrderAndUser();

        orderAndUser.forEach(order -> {
            System.out.println(order);
        });
    }
}
```

效果

```
Opening JDBC Connection
Created connection 2024453272.
Setting autocommit to false on JDBC Connection [com.mysql.cj.jdbc.ConnectionImpl@78aab498]
==>  Preparing: select * from orders
==> Parameters: 
<==    Columns: id, ordertime, total, uid
<==        Row: 1, 2019-12-12, 3000.0, 1
====>  Preparing: select * from user where id=?
====> Parameters: 1(Integer)
<====    Columns: id, username, password, birthday
<====        Row: 1, lucy, 123, 2019-12-12
<====      Total: 1
<==        Row: 2, 2019-12-12, 4000.0, 1
<==        Row: 3, 2019-12-12, 5000.0, 2
====>  Preparing: select * from user where id=?
====> Parameters: 2(Integer)
<====    Columns: id, username, password, birthday
<====        Row: 2, tom, 123, 2019-12-12
<====      Total: 1
<==      Total: 3
Order{id=1, orderTime='2019-12-12', total=3000.0, user=User{id=1, username='lucy'}}
Order{id=2, orderTime='2019-12-12', total=4000.0, user=User{id=1, username='lucy'}}
Order{id=3, orderTime='2019-12-12', total=5000.0, user=User{id=2, username='tom'}}

Process finished with exit code 0
```

### 调用过程分析

**![image-20220901002006366](https://img1.terwer.space/20220901002012.png)**

## 一对多查询

### 一对多查询的模型

用户表和订单表的关系为，一个用户有多个订单，一个订单只从属于一个用户。

一对多查询需求：查询一个用户，与此同时查出该用户具有的订单。

```plantuml
@startuml

!include https://unpkg.com/plantuml-style-c4@latest/core.puml
' uncomment the following line and comment the first to use locally
'!include core.puml

left to right direction

class orders {
   ordertime: varchar(255)
   total: double
   uid: int(11)
   id: int(11)
}
class user {
   username: varchar(50)
   password: varchar(50)
   birthday: varchar(50)
   id: int(11)
}

orders  -[#595959,plain]-^  user   : "uid:id"
@enduml
```

### 一对多查询语句

对应查询语句：

对应的 sql 语句

```sql
select * from user;
select * from orders where uid=查询出用户的id;
```

查询结果如下：

|id|ordertime|total|uid|id|username|password|birthday|
| :-| :---------| :----| :--| :-| :-------| :-------| :---------|
|1|2019-12-12|3000|1|1|lucy|123|2019-12-12|
|2|2019-12-12|4000|1|1|lucy|123|2019-12-12|
|3|2019-12-12|5000|2|1|lucy|123|2019-12-12|
|1|2019-12-12|3000|1|2|tom|123|2019-12-12|

### 修改 User 实体

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

```java
/**
 * 用户
 *
 * @name: User
 * @author: terwer
 * @date: 2022-05-25 13:25
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

### 创建IUserMapper接口

```java
/**
 * 用户映射
 *
 * @name: IUserMapper
 * @author: terwer
 * @date: 2022-05-25 13:27
 **/
public interface IUserMapper {
    /**
     * 查询用户和订单
     *
     * @return
     */
    List<User> findUserAndOrder();
}
```

### 使用注解配置Mapper

```java
/**
 * 用户映射
 *
 * @name: IUserMapper
 * @author: terwer
 * @date: 2022-05-25 13:27
 **/
public interface IUserMapper {
    /**
     * 查询用户和订单
     *
     * @return
     */
    @Results({
            @Result(property = "id", column = "id"),
            @Result(property = "username", column = "username"),
            @Result(property = "orderList", column = "id", many = @Many(select = "com.terwergreen.mapper.IOrderMapper.findOrderByUid"), javaType = List.class)
    })
    @Select("select * from user")
    List<User> findUserAndOrder();
}
```

```java
/**
 * 订单映射
 *
 * @name: IUserMapper
 * @author: terwer
 * @date: 2022-03-17 17:54
 **/
public interface IOrderMapper {
    @Select("select * from orders where uid=#{uid}")
    public List<Order> findOrderByUid(Integer uid);
}
```

## 测试结果

```java
public class IUserMapperTest {

    private IUserMapper userMapper;
    private SqlSession sqlSession;

    @Before
    public void before() throws Exception {
        System.out.println("before...");
        InputStream resourceAsStream = Resources.getResourceAsStream("sqlMapConfig.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(resourceAsStream);
        sqlSession = sqlSessionFactory.openSession();
        // 这样也是可以的，这样的话后面就不用每次都设置了
        // sqlSession = sqlSessionFactory.openSession(true);
        userMapper = sqlSession.getMapper(IUserMapper.class);
    }

    @Test
    public void testGetUserOrders() {
        List<User> userAndOrder = userMapper.findUserAndOrder();
        userAndOrder.forEach(user -> {
            System.out.println(user);
        });
    }
}
```

结果如下：

```plaintext
Opening JDBC Connection
Created connection 98394724.
Setting autocommit to false on JDBC Connection [com.mysql.cj.jdbc.ConnectionImpl@5dd6264]
==>  Preparing: select * from user
==> Parameters: 
<==    Columns: id, username, password, birthday
<==        Row: 1, lucy, 123, 2019-12-12
====>  Preparing: select * from orders where uid=?
====> Parameters: 1(Integer)
<====    Columns: id, ordertime, total, uid
<====        Row: 1, 2019-12-12, 3000.0, 1
<====        Row: 2, 2019-12-12, 4000.0, 1
<====      Total: 2
<==        Row: 2, tom, 123, 2019-12-12
====>  Preparing: select * from orders where uid=?
====> Parameters: 2(Integer)
<====    Columns: id, ordertime, total, uid
<====        Row: 3, 2019-12-12, 5000.0, 2
<====      Total: 1
<==        Row: 8, 测试2, null, null
====>  Preparing: select * from orders where uid=?
====> Parameters: 8(Integer)
<====      Total: 0
<==        Row: 9, 测试3, null, null
====>  Preparing: select * from orders where uid=?
====> Parameters: 9(Integer)
<====      Total: 0
<==      Total: 4
User{id=1, username='lucy', orderList=[Order{id=1, orderTime='2019-12-12', total=3000.0, user=null}, Order{id=2, orderTime='2019-12-12', total=4000.0, user=null}]}
User{id=2, username='tom', orderList=[Order{id=3, orderTime='2019-12-12', total=5000.0, user=null}]}
User{id=8, username='测试2', orderList=[]}
User{id=9, username='测试3', orderList=[]}

Process finished with exit code 0
```

## 多对多查询

### 多对多查询的模型

用户表和角色表的关系为，一个用户有多个角色，一个角色被多个用户使用。

```plantuml
@startuml

!include https://unpkg.com/plantuml-style-c4@latest/core.puml
' uncomment the following line and comment the first to use locally
'!include core.puml

left to right direction

class sys_role {
   rolename: varchar(255)
   roleDesc: varchar(255)
   id: int(11)
}
class sys_user_role {
   userid: int(11)
   roleid: int(11)
}
class user {
   username: varchar(50)
   password: varchar(50)
   birthday: varchar(50)
   id: int(11)
}

sys_user_role  -[#595959,plain]-^  sys_role      : "roleid:id"
sys_user_role  -[#595959,plain]-^  user          : "userid:id"
@enduml
```

### 多对多查询需求

查询用户的同时查询该用户对应的角色。

### 多对多查询的语句

```sql
select * from user;
select * from sys_role r,sys_user_role ur where r.id=ur.roleid and ur.userid=用户的id
```

查询结果如下：

|id|rolename|roleDesc|userid|roleid|
| :---| :---------| :---------| :-------| :-------|
|1|CTO|CTO|1|1|
|2|CEO|CEO|1|2|

### 代码实现

* 创建User实体和Role实体

  ```java
  /**
   * 用户
   *
   * @name: User
   * @author: terwer
   * @date: 2022-05-25 13:25
   **/
  public class User {
      private Integer id;
      private String username;

      // 代表当前用户具备那些订单
      private List<Order> orderList;


      // 代表当前用户具备的那些角色
      private List<Role> roleList;

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

      public List<Role> getRoleList() {
          return roleList;
      }

      public void setRoleList(List<Role> roleList) {
          this.roleList = roleList;
      }

      @Override
      public String toString() {
          return "User{" +
                  "id=" + id +
                  ", username='" + username + '\'' +
                  ", orderList=" + orderList +
                  ", roleList=" + roleList +
                  '}';
      }
  }
  ```

* 创建IRoleMapper

  ```java
  /**
   * 角色映射
   *
   * @name: IRoleMapper
   * @author: terwer
   * @date: 2022-09-06 00:04
   **/
  public interface  IRoleMapper {
      @Select("select * from sys_role r,sys_user_role ur where r.id=ur.roleid and ur.userid=#{userId}")
      List<Role> findRolesByUserId(Integer userId);
  }
  ```

  ```java
  /**
   * 角色
   *
   * @name: Role
   * @author: terwer
   * @date: 2022-05-12 14:14
   **/
  public class Role {
      private Integer id;
      private String rolename;

      @Override
      public String toString() {
          return "Role{" +
                  "id=" + id +
                  ", rolename='" + rolename + '\'' +
                  '}';
      }
  }
  ```

* 修改IUserMapper

  ```java
  /**
   * 用户映射
   *
   * @name: IUserMapper
   * @author: terwer
   * @date: 2022-05-25 13:27
   **/
  public interface IUserMapper {
      @Results({
              @Result(property = "id", column = "id"),
              @Result(property = "username", column = "username"),
              @Result(property = "roleList", column = "id", javaType = List.class,
                      many = @Many(select = "com.terwergreen.mapper.IRoleMapper.findRolesByUserId"))
      })
      @Select("select * from user")
      List<User> findUserAndRole();
  }
  ```

* 添加测试方法

  ```java
  public class IUserMapperTest {

      private IUserMapper userMapper;
      private SqlSession sqlSession;

      @Before
      public void before() throws Exception {
          System.out.println("before...");
          InputStream resourceAsStream = Resources.getResourceAsStream("sqlMapConfig.xml");
          SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(resourceAsStream);
          sqlSession = sqlSessionFactory.openSession();
          // 这样也是可以的，这样的话后面就不用每次都设置了
          // sqlSession = sqlSessionFactory.openSession(true);
          userMapper = sqlSession.getMapper(IUserMapper.class);
      }

      @Test
      public void testFindUserAndRole() {
          userMapper.findUserAndRole().forEach(user -> {
              System.out.println(user);
          });
      }
  }
  ```

* 效果如下

  ```plaintext
  Setting autocommit to false on JDBC Connection [com.mysql.cj.jdbc.ConnectionImpl@51e5fc98]
  ==>  Preparing: select * from user
  ==> Parameters: 
  <==    Columns: id, username, password, birthday
  <==        Row: 1, lucy, 123, 2019-12-12
  ====>  Preparing: select * from sys_role r,sys_user_role ur where r.id=ur.roleid and ur.userid=?
  ====> Parameters: 1(Integer)
  <====    Columns: id, rolename, roleDesc, userid, roleid
  <====        Row: 1, CTO, CTO, 1, 1
  <====        Row: 2, CEO, CEO, 1, 2
  <====      Total: 2
  <==        Row: 2, tom, 123, 2019-12-12
  ====>  Preparing: select * from sys_role r,sys_user_role ur where r.id=ur.roleid and ur.userid=?
  ====> Parameters: 2(Integer)
  <====    Columns: id, rolename, roleDesc, userid, roleid
  <====        Row: 1, CTO, CTO, 2, 1
  <====        Row: 2, CEO, CEO, 2, 2
  <====      Total: 2
  <==        Row: 8, 测试2, null, null
  ====>  Preparing: select * from sys_role r,sys_user_role ur where r.id=ur.roleid and ur.userid=?
  ====> Parameters: 8(Integer)
  <====      Total: 0
  <==        Row: 9, 测试3, null, null
  ====>  Preparing: select * from sys_role r,sys_user_role ur where r.id=ur.roleid and ur.userid=?
  ====> Parameters: 9(Integer)
  <====      Total: 0
  <==      Total: 4
  User{id=1, username='lucy', orderList=null, roleList=[Role{id=1, rolename='CTO'}, Role{id=2, rolename='CEO'}]}
  User{id=2, username='tom', orderList=null, roleList=[Role{id=1, rolename='CTO'}, Role{id=2, rolename='CEO'}]}
  User{id=8, username='测试2', orderList=null, roleList=[]}
  User{id=9, username='测试3', orderList=null, roleList=[]}

  Process finished with exit code 0
  ```

> 文章更新历史
>
> 2022-08-30 feat:初稿
>

‍