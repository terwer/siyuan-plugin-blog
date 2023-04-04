---
title: MyBatis-RedisCache源码分析
short_title: ''
description: 回顾在前面我们通过redis​集成了mybatis​的二级缓存mybatis的二级缓存整合redis接下来我们来分析一下rediscache​的源码。源码分析rediscache主要是通过实现cache接口来做的。数据存储和获取主要是通过操作jedis来实现。publicfinalclassrediscacheimplementscache{privatefinalreadwritelockreadwritelock=newdummyreadwritelock()_privatestringid_priv
date: 2023-02-20 19:35:10
category:
  - MyBatis
  - 后端开发
  - 开源框架
tag:
  - 通过
  - 方法
  - 分析
  - 实现
  - 读取
article: true
timeline: false
---
## 回顾

在前面，我们通过 `redis`​ 集成了 `MyBatis`​ 的二级缓存，[440.MyBatis的二级缓存整合redis](siyuan://blocks/20230213211210-bl7c6m0) ，接下来，我们来分析一下 `RedisCache`​ 的源码。

## 源码分析

RedisCache 主要是通过实现 Cache 接口来做的。数据存储和获取主要是通过操作 jedis 来实现。

```java
public final class RedisCache implements Cache {
    private final ReadWriteLock readWriteLock = new DummyReadWriteLock();
    private String id;
    private static JedisPool pool;

    public RedisCache(String id) {
        if (id == null) {
            throw new IllegalArgumentException("Cache instances require an ID");
        } else {
            this.id = id;
            RedisConfig redisConfig = RedisConfigurationBuilder.getInstance().parseConfiguration();
            pool = new JedisPool(redisConfig, redisConfig.getHost(), redisConfig.getPort(), redisConfig.getConnectionTimeout(), redisConfig.getSoTimeout(), redisConfig.getPassword(), redisConfig.getDatabase(), redisConfig.getClientName());
        }
    }
}
```

RedisCache 在 MyBatis 启动的时候由 MyBatis 的 `CacheBuilder`​ 构建，构建的方式就是调用 `Cache`​ 实现类的带 `id`​ 参数的构造方法。

```java
// CacheBuilder.java

public Cache build() {
    setDefaultImplementations();
    Cache cache = newBaseCacheInstance(implementation, id);
    setCacheProperties(cache);
}

private Cache newBaseCacheInstance(Class<? extends Cache> cacheClass, String id) {
    Constructor<? extends Cache> cacheConstructor = getBaseCacheConstructor(cacheClass);
    try {
        return cacheConstructor.newInstance(id);
    } catch (Exception e) {
        throw new CacheException("Could not instantiate cache implementation (" + cacheClass + "). Cause: " + e, e);
    }
}
```

在 `RedisCache`​ 的构造方法中，调用了 `RedisConfigurationBuilder`​ 来常见 `RedisConfig`​ 对象，并通过 `RedisConfig`​ 对象来创建 `Jedis`​ 。

​`RedisConfig`​ 继承了 `JedisPoolConfig`​ ，并定义了一些属性来读取配置。

```java
public class RedisConfig extends JedisPoolConfig {
    private String host = "localhost";
    private int port = 6379;
    private int connectionTimeout = 2000;
    private int soTimeout = 2000;
    private String password;
    private int database = 0;
    private String clientName;
}
```

​`RedisConfig`​ 是由 `RedisConfigurationBuilder`​​ 构建的，这个类的主要方法是 `parseConfiguration`​

```java
public RedisConfig parseConfiguration(ClassLoader classLoader) {
    Properties config = new Properties();
    InputStream input = classLoader.getResourceAsStream(this.redisPropertiesFilename);
    if (input != null) {
        try {
            config.load(input);
        } catch (IOException var12) {
            throw new RuntimeException("An error occurred while reading classpath property '" + this.redisPropertiesFilename + "', see nested exceptions", var12);
        } finally {
            try {
                input.close();
            } catch (IOException var11) {
            }

        }
    }

    RedisConfig jedisConfig = new RedisConfig();
    this.setConfigProperties(config, jedisConfig);
    return jedisConfig;
}
```

该方法从 `Resource`​ 读取一个 `redis.properties`​ 文件，其结构如下：

```properties
host=localhost
port=6379
password=123456
database=0
```

读取完成之后将内容设置到 RedisConfig 对象中。

接下来，RedisCache 使用 RedisCo 创建 Jedis。在 RedisCache 中，实现了一个简单的模板方法来操作 redis：

```java
private Object execute(RedisCallback callback) {
    Jedis jedis = pool.getResource();

    Object var3;
    try {
        var3 = callback.doWithRedis(jedis);
    } finally {
        jedis.close();
    }

    return var3;
}
```

目标接口为 RedisCallback，该接口定义了一个简单的 doWithRedis 方法用来进行 redis 相关操作：

```java
public interface RedisCallback {
    Object doWithRedis(Jedis var1);
}
```

接下来，我们分析一下 Cache 中的两个重要方法 putObject()和 getObject()

```java
public void putObject(final Object key, final Object value) {
    this.execute(new RedisCallback() {
        public Object doWithRedis(Jedis jedis) {
            jedis.hset(RedisCache.this.id.toString().getBytes(), key.toString().getBytes(), SerializeUtil.serialize(value));
            return null;
        }
    });
}
```

```java
public Object getObject(final Object key) {
    return this.execute(new RedisCallback() {
        public Object doWithRedis(Jedis jedis) {
            return SerializeUtil.unserialize(jedis.hget(RedisCache.this.id.toString().getBytes(), key.toString().getBytes()));
        }
    });
}
```

可以看出来，MyBatis-RedisCache 采用的是 redis 的 `hash`​ 结构来存储数据，把 Cache 的 `id`​ 作为 hash 的 `key`​（Cache 的 id 在 Mapper 中是 namspace），缓存和读取之前通过 SerializeUtil 进行==序列化==或者==反序列化==。

‍