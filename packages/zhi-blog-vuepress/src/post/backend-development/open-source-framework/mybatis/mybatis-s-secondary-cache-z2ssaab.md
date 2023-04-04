---
title: MyBatis的二级缓存
short_title: ''
description: mybatis的二级缓存二级缓存的原理二级缓存的原理和一级缓存一样第一次查询会将数据放到缓存中然后第二次查询直接去缓存读取。但是一级缓存是基于sqlsession的二级缓存是基于mapper的namespace的。也就是说多个sqlsession可以共享同一个二级缓存区域。如果两个mapper的namespace相同那么即使是两个mapper这两个mapper执行sql查询的数据也将保存在相同的二级缓存区域中。​如何使用二级缓存注意_user需要实现序列化接口。开启二级缓存和一级缓存不一样二级缓存需要手动
date: 2022-09-24 22:38:54
category:
  - MyBatis
  - 后端开发
  - 开源框架
tag:
  - 二级缓存
  - mybatis
article: true
timeline: false
---
## 二级缓存的原理

二级缓存的原理和一级缓存一样，第一次查询会将数据放到缓存中，然后第二次查询直接去缓存读取。

但是一级缓存是基于 SqlSession 的，二级缓存是基于 mapper 的 namespace 的。

也就是说，多个 SqlSession 可以共享同一个二级缓存区域。如果两个 mapper 的 namespace 相同，那么即使是两个 mapper，这两个 mapper 执行 sql 查询的数据也将保存在相同的二级缓存区域中。

![](https://img1.terwer.space/api/public/20220929000423.png)​

## 如何使用二级缓存

注意：User 需要实现序列化接口。

### 开启二级缓存

和一级缓存不一样，二级缓存需要手动开启。

首先在全局配置文件 sqlMapConfig.xml 中加入如下代码

```xml
<settings>
    <!-- 开启二级缓存 -->
    <setting name="cacheEnabled" value="true"/>
</settings>
```

然后在 UserMapper.xml 中开启二级缓存。

```xml
<!-- 开启二级缓存 -->
<cache />
```

如果是使用注解方式，在 IUserMapper 上写上注解 `@CacheNamespace`

```java
@CacheNamespace
public interface IUserMapper {
}
```

测试代码

```java
public class SecondCacheTest {
    private SqlSessionFactory sqlSessionFactory;

    @Before
    public void before() throws Exception {
        InputStream resourceAsStream = Resources.getResourceAsStream("sqlMapConfig.xml");
        sqlSessionFactory = new SqlSessionFactoryBuilder().build(resourceAsStream);
    }

    @Test
    public void secondLevelCache() {
        SqlSession sqlSession1 = sqlSessionFactory.openSession();
        SqlSession sqlSession2 = sqlSessionFactory.openSession();

        IUserMapper userMapper1 = sqlSession1.getMapper(IUserMapper.class);
        IUserMapper userMapper2 = sqlSession2.getMapper(IUserMapper.class);

        User user1 = userMapper1.findUserById(1);
        // 清空一级缓存
        sqlSession1.close();
        User user2 = userMapper2.findUserById(1);
        System.out.println(user1 == user2);
    }
}
```

效果如下

```plaintext
Setting autocommit to false on JDBC Connection [com.mysql.cj.jdbc.ConnectionImpl@56528192]
==>  Preparing: select * from user where id=?
==> Parameters: 1(Integer)
<==    Columns: id, username, password, birthday
<==        Row: 1, lucy, 123, 2019-12-12
<==      Total: 1
Resetting autocommit to true on JDBC Connection [com.mysql.cj.jdbc.ConnectionImpl@56528192]
Closing JDBC Connection [com.mysql.cj.jdbc.ConnectionImpl@56528192]
Returned connection 1448247698 to pool.
As you are using functionality that deserializes object streams, it is recommended to define the JEP-290 serial filter. Please refer to https://docs.oracle.com/pls/topic/lookup?ctx=javase15&id=GUID-8296D8E8-2B93-4B9A-856E-0A65AF9B8C66
Cache Hit Ratio [com.terwergreen.mapper.IUserMapper]: 0.5
false
```

可以看到，两次请求，只有第一次输出了 sql ， 并且输出了缓存命中率是 0.5 。

### useCache 和 flushCache

* **useCache** 用来设置是否禁用二级缓存。在 statement 中设置 useCache="false" 可以禁用当前 select 语句的二级缓存
* ```xml
  <select id="selectUserByUserId" useCache="false" resultType="space.terwer.pojo.User"
  parameterType="int">
    select * from user where id=#{id}
  </select>
  ```

* 设置 statement 的 flushCache="true" 即 **刷新缓存** ，默认情况下就是 true。因为一般不设置，默认即可。

* **注解方式使用**

  ```java
  /**
   * 根据ID查询用户
   *
   * @param id
   * @return
   */
  @Options(useCache = false, flushCache = Options.FlushCachePolicy.TRUE)
  @Select("select * from user where id=#{id}")
  User findUserById(Integer id);
  ```

> 文章更新历史
>
> 2022-12-25 feat: 初稿