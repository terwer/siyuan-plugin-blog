---
title: 使用getMapper方式对自定义持久层框架进行优化
short_title: ''
description: 问题分析dao层使用持久层框架存在代码重复整个操作过程模板重复（加载配置文件创建sqlsessionfactory生产sqlsession）存在硬编码（statementid）解决思路getmapper动态代理方式优化使用代理模式生成dao层接口的实现类​​sqlsession接口新增getmapper方法fun?)_tpublicdefaultsqlsession中getmapper方法的实现overridefun)_t{使用jdk动态代理为dao接口生成代理对象returnproxynewproxyi
date: 2022-08-29 23:43:59
category:
  - MyBatis
  - 后端开发
  - 开源框架
tag:
  - custom
  - dao
  - persistence
  - framework
  - mybatis
  - mybatis-5
  - mapper
article: true
timeline: false
---
## 问题分析

1、Dao层使用持久层框架，存在代码重复，整个操作过程模板重复（加载配置文件、创建SqlSessionFactory、生产SqlSession）

2、存在硬编码（statementId）

## 解决思路

### getMapper+动态代理方式优化

使用代理模式生成Dao层接口的实现类

![](https://img1.terwer.space/20220314210022.png)​

![](https://img1.terwer.space/20220314212430.png)​

SqlSession接口新增getMapper方法

<code-group>

<code-block title="Kotlin" active>

```kotlin
fun <T> getMapper(mapperClass: Class<*>?): T
```

</code-block>

<code-block title="Java">

```java
public <T> T getMapper(Class<?> mapperClass);
```

</code-block>

</code-group>

DefaultSqlSession中getMapper方法的实现

<code-group>

<code-block title="Kotlin" active>

```kotlin
override fun <T> getMapper(mapperClass: Class<*>): T {
    // 使用JDK动态代理为Dao接口生成代理对象
    return Proxy.newProxyInstance(
        DefaultSqlSession::class.java.classLoader,
        arrayOf(mapperClass)
    ) { proxy, method, args -> // 底层还是执行JDBC
        // 准备参数1
        // statemendid=namespace.id，获取不到
        // statemendid=接口全限定名.方法名
        val clazzName = method.declaringClass.name
        val methodName = method.name
        val statementId = "$clazzName.$methodName"

        // 准备参数2：params=args

        // 获取被调用方法的返回类型
        val genericReturnType = method.genericReturnType
        // 判断是否进行了泛型类型参数化
        if (genericReturnType is ParameterizedType) {
            selectList<Any>(statementId, *args)
        } else selectOne<Any>(statementId, *args)
    } as T
}
```

</code-block>

<code-block title="Java">

```java
@Override
public <T> T getMapper(Class<?> mapperClass) {
    // 使用JDK动态代理为Dao接口生成代理对象
    return (T) Proxy.newProxyInstance(DefaultSqlSession.class.getClassLoader(), new Class[]{mapperClass}, new InvocationHandler() {
        @Override
        public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
            // 底层还是执行JDBC
            // 准备参数1
            // statemendid=namespace.id，获取不到
            // statemendid=接口全限定名.方法名
            String clazzName = method.getDeclaringClass().getName();
            String methodName = method.getName();
            String statementId = clazzName + "." + methodName;

            // 准备参数2：params=args

            // 获取被调用方法的返回类型
            Type genericReturnType = method.getGenericReturnType();
            // 判断是否进行了泛型类型参数化
            if (genericReturnType instanceof ParameterizedType) {
                return selectList(statementId, args);
            }

            return selectOne(statementId, args);
        }
    });
}
```

</code-block>

</code-group>

## 优化版代码

[mybatis-proxy/custom-persistence](https://github.com/terwer/senior-java-engineer-road/tree/mybatis-proxy/p7-skill/framework/mybatis/custom-persistence)

## 默认实现方式

[mybatis-normal/custom-persistence](https://github.com/terwer/senior-java-engineer-road/tree/mybatis-normal/p7-skill/framework/mybatis/custom-persistence)

> 文章更新历史
>
> 2022/05/08 feat:增加Kotlin实现。
>