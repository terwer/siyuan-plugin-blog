---
title: MyBatis的二级缓存整合redis
short_title: ''
description: mybatis的二级缓存整合redismybatis自带的二级缓存存在的问题在前面我们使用at_cachenamespace​实现了mybatis的二级缓存这个底层使用hashmap​来实现。在单机环境下没有问题但是在分布式环境下就不行了。​​mybatis二级缓存在分布式环境下的问题解决为了解决这个问题可以使用分布式缓存保存mybatis二级缓存的数据。​​怎么自定义mybatis的二级缓存可以在at_cachenamespace​上面加上implementation例如默认的缓存可以写成_at_cac
date: 2023-02-13 21:12:10
category:
  - MyBatis
  - 后端开发
  - 开源框架
tag:
  - 二级缓存
  - 使用
  - 问题
  - 加上
  - 环境
article: true
timeline: false
---
## MyBatis 自带的二级缓存存在的问题

在前面我们使用 `@CacheNamespace`​ 实现了 [430.MyBatis的二级缓存](siyuan://blocks/20220924223854-qygzxps) ，这个底层使用 `HashMap`​ 来实现。在 **单机环境** 下没有问题，但是在 **分布式环境** 下就不行了。

​![](https://img1.terwer.space/api/public/202302132141223.png)​

## MyBatis 二级缓存在分布式环境下的问题解决

为了解决这个问题，可以使用 **分布式缓存** 保存 MyBatis 二级缓存的数据。

​![](https://img1.terwer.space/api/public/202302132144797.png)​

## 怎么自定义 MyBatis 的二级缓存

可以在 `@CacheNamespace`​ 上面加上 **implementation** ， 例如，默认的缓存可以写成：

```java
@CacheNamespace(implementation = PerpetualCache.class)
```

## 使用 redis 作为 MyBatis 的二级缓存

使用 redis 作为 MyBatis 二级缓存的步骤如下：

导入 **mybatis-redis** 的 pom 包

```xml
<dependency>
    <groupId>org.mybatis.caches</groupId>
    <artifactId>mybatis-redis</artifactId>
    <version>1.0.0-beta2</version>
</dependency>
```

修改，**IUserMapper ​**，加上相关注解

请参考：[https://github.com/terwer/senior-java-engineer-road/blob/main/p7-skill/framework/mybatis/mybatis-annotation/src/main/java/com/terwergreen/mapper/IUserMapper.java#L25](https://github.com/terwer/senior-java-engineer-road/blob/main/p7-skill/framework/mybatis/mybatis-annotation/src/main/java/com/terwergreen/mapper/IUserMapper.java#L25)

```java
@CacheNamespace(implementation = RedisCache.class)
public interface IUserMapper {
```

​`resource`​ **根目录 ​**加上 `redis.properties`​ 配置文件

```properties
host=localhost
port=6379
password=
database=0
```

特别提醒：这里的 **配置** 不要写错了。

注意： **查询方法 ​**也得地加上 `@Options(useCache = true)`​ 注解

```java
@Options(useCache = true)
@Select("select * from user where id=#{id}")
User findUserById(Integer id);
```

测试：

请参考：[https://github.com/terwer/senior-java-engineer-road/blob/main/p7-skill/framework/mybatis/mybatis-annotation/src/test/java/com/terwergreen/mapper/SecondCacheTest.java#L30](https://github.com/terwer/senior-java-engineer-road/blob/main/p7-skill/framework/mybatis/mybatis-annotation/src/test/java/com/terwergreen/mapper/SecondCacheTest.java#L30)

```java
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
```

结果：

```plaintext
Setting autocommit to false on JDBC Connection [com.mysql.cj.jdbc.ConnectionImpl@6b81ce95]
==>  Preparing: select * from user where id=?
==> Parameters: 1(Integer)
<==    Columns: id, username, password, birthday
<==        Row: 1, lisi, 123, 2019-12-12
<==      Total: 1
Resetting autocommit to true on JDBC Connection [com.mysql.cj.jdbc.ConnectionImpl@6b81ce95]
Closing JDBC Connection [com.mysql.cj.jdbc.ConnectionImpl@6b81ce95]
Returned connection 1803669141 to pool.
Cache Hit Ratio [com.terwergreen.mapper.IUserMapper]: 0.5
false
```

查看 redis 缓存

​![](https://img1.terwer.space/api/public/202302140055475.png)​