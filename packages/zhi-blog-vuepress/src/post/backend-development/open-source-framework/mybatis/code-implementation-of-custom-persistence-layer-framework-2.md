---
title: 自定义持久层框架的代码实现二
short_title: ''
description: 代码实现续核心执行引擎executor的实现执行器的实现@name_simpleexecutor@author_terwer@date__classsimpleexecutor_executor{@throws(exception__class)overridefunquery(configuration_configurationmappedstatement_mappedstatementvarargparams_any)_list{注册驱动获取链接valconnection=configuratio
date: 2022-08-29 22:26:48
category:
  - MyBatis
  - 后端开发
  - 开源框架
tag:
  - custom
  - dao
  - framework
  - persistence
  - mybatis
  - mybatis-4
article: true
timeline: false
---
## 代码实现续

### 核心执行引擎Executor的实现

<code-group>

<code-block title="Kotlin" active>

```kotlin
/**
 * 执行器的实现
 *
 * @name: SimpleExecutor
 * @author: terwer
 * @date: 2022-05-08 16:53
 */
class SimpleExecutor : Executor {
    @Throws(Exception::class)
    override fun <E> query(
        configuration: Configuration,
        mappedStatement: MappedStatement,
        vararg params: Any
    ): List<E> {
        // 注册驱动，获取链接
        val connection = configuration.dataSource.connection

        // 获取sql语句
        // 获取的sql
        // select * from user where id = #{id} and username = #{username}
        // 转换后的sql
        // select * from user where id = ? and username = ?
        val sql = mappedStatement.sql

        // 转换sql语句
        val boundSql = getBoundSql(sql)

        // 获取预处理对象
        val preparedStatement = connection.prepareStatement(boundSql.sqlText)

        // 设置参数
        // 参数全路径
        val parameterType = mappedStatement.parameterType
        val parameterClass = getClassType(parameterType)
        val parameterMappingList = boundSql.parameterMappingList
        for (i in parameterMappingList.indices) {
            val parameterMapping = parameterMappingList[i]
            val content = parameterMapping.content
            val field = parameterClass!!.getDeclaredField(content)
            field.isAccessible = true
            val value = field[params[0]]
            preparedStatement.setObject(i + 1, value)
        }

        // 执行sql
        val resultSet = preparedStatement.executeQuery()
        val returnType = mappedStatement.resultType
        val resultTypeClass = getClassType(returnType)
        val objects = ArrayList<Any>()

        // 封装返回结果集
        while (resultSet.next()) {
            val o = resultTypeClass!!.newInstance()
            val metaData = resultSet.metaData
            for (i in 1..metaData.columnCount) {
                val columnName = metaData.getColumnName(i)
                // 获取字段值
                val value = resultSet.getObject(columnName)

                // 使用反射或者内省，根据数据库表和实体的对应关系完成封装
                val propertyDescriptor = PropertyDescriptor(columnName, resultTypeClass)
                val writeMethod = propertyDescriptor.writeMethod
                writeMethod.invoke(o, value)
            }
            objects.add(o)
        }
        return objects as List<E>
    }

    @Throws(ClassNotFoundException::class)
    private fun getClassType(parameterType: String?): Class<*>? {
        return if (parameterType != null) {
            Class.forName(parameterType)
        } else null
    }

    /**
     * 1、将#{}使用?代替
     * 2、解析出#{}的值进行存储
     *
     * @param sql
     * @return
     */
    private fun getBoundSql(sql: String): BoundSql {
        // 标记处理类，配合标记解析器完成对占位符的解析
        val tokenHandler = ParameterMappingTokenHandler()
        val genericTokenParser = GenericTokenParser("#{", "}", tokenHandler)

        // 解析后的sql
        val parseSql = genericTokenParser.parse(sql)
        // 解析的参数名称
        val parameterMappings = tokenHandler.parameterMappings
        return BoundSql(parseSql, parameterMappings)
    }
}
```

</code-block>

<code-block title="Java">

```java
/**
 * 执行器的实现
 *
 * @name: SimpleExecutor
 * @author: terwer
 * @date: 2022-03-14 16:53
 **/
public class SimpleExecutor implements Executor {
    @Override
    public <E> List<E> query(Configuration configuration, MappedStatement mappedStatement, Object... params) throws Exception {
        // 注册驱动，获取链接
        Connection connection = configuration.getDataSource().getConnection();

        // 获取sql语句
        // 获取的sql
        // select * from user where id = #{id} and username = #{username}
        // 转换后的sql
        // select * from user where id = ? and username = ?
        String sql = mappedStatement.getSql();

        // 转换sql语句
        BoundSql boundSql = getBoundSql(sql);

        // 获取预处理对象
        PreparedStatement preparedStatement = connection.prepareStatement(boundSql.getSqlText());

        // 设置参数
        // 参数全路径
        String parameterType = mappedStatement.getParameterType();
        Class<?> parameterClass = getClassType(parameterType);

        List<ParameterMapping> parameterMappingList = boundSql.getParameterMappingList();
        for (int i = 0; i < parameterMappingList.size(); i++) {
            ParameterMapping parameterMapping = parameterMappingList.get(i);
            String content = parameterMapping.getContent();

            Field field = parameterClass.getDeclaredField(content);
            field.setAccessible(true);
            Object value = field.get(params[0]);

            preparedStatement.setObject(i + 1, value);
        }

        // 执行sql
        ResultSet resultSet = preparedStatement.executeQuery();
        String returnType = mappedStatement.getResultType();
        Class<?> resultTypeClass = getClassType(returnType);
        Object o = resultTypeClass.newInstance();
        ArrayList<Object> objects = new ArrayList<>();

        // 封装返回结果集
        while (resultSet.next()) {
            ResultSetMetaData metaData = resultSet.getMetaData();
            for (int i = 1; i <= metaData.getColumnCount(); i++) {
                String columnName = metaData.getColumnName(i);
                // 获取字段值
                Object value = resultSet.getObject(columnName);

                // 使用反射或者内省，根据数据库表和实体的对应关系完成封装
                PropertyDescriptor propertyDescriptor = new PropertyDescriptor(columnName, resultTypeClass);
                Method writeMethod = propertyDescriptor.getWriteMethod();
                writeMethod.invoke(o, value);
            }
            objects.add(o);
        }

        return (List<E>) objects;
    }

    private Class<?> getClassType(String parameterType) throws ClassNotFoundException {
        if (parameterType != null) {
            Class<?> aClass = Class.forName(parameterType);
            return aClass;
        }
        return null;
    }

    /**
     * 1、将#{}使用?代替
     * 2、解析出#{}的值进行存储
     *
     * @param sql
     * @return
     */
    private BoundSql getBoundSql(String sql) {
        // 标记处理类，配合标记解析器完成对占位符的解析
        ParameterMappingTokenHandler tokenHandler = new ParameterMappingTokenHandler();
        GenericTokenParser genericTokenParser = new GenericTokenParser("#{", "}", tokenHandler);

        // 解析后的sql
        String parseSql = genericTokenParser.parse(sql);
        // 解析的参数名称
        List<ParameterMapping> parameterMappings = tokenHandler.getParameterMappings();

        BoundSql boundSql = new BoundSql(parseSql, parameterMappings);

        return boundSql;
    }
}
```

</code-block>

</code-group>

运行效果

![](https://img1.terwer.space/20220314184626.png)​

## 问题修复

1、selectList打印的全部是同一个值

```
/Library/Java/JavaVirtualMachines/jdk1.8.0_291.jdk/Contents/Home/bin/java -... com.intellij.rt.junit.JUnitStarter -ideVersion5 -junit4 com.terwergreen.test.IPersistenceTest,test2
Connected to the target VM, address: '127.0.0.1:50317', transport: 'socket'
log4j:WARN No appenders could be found for logger (com.mchange.v2.log.MLog).
log4j:WARN Please initialize the log4j system properly.
User{id=5, username='dali'}
User{id=5, username='dali'}
User{id=5, username='dali'}
User{id=5, username='dali'}
Disconnected from the target VM, address: '127.0.0.1:50317', transport: 'socket'

Process finished with exit code 0

```

修正方案

![](https://img1.terwer.space/20220314190534.png)​

修正后

```
/Library/Java/JavaVirtualMachines/jdk1.8.0_291.jdk/Contents/Home/bin/java -... com.intellij.rt.junit.JUnitStarter -ideVersion5 -junit4 com.terwergreen.test.IPersistenceTest,test2
Connected to the target VM, address: '127.0.0.1:50820', transport: 'socket'
log4j:WARN No appenders could be found for logger (com.mchange.v2.log.MLog).
log4j:WARN Please initialize the log4j system properly.
User{id=1, username='tyw'}
User{id=2, username='张月'}
User{id=4, username='haha'}
User{id=5, username='dali'}
Disconnected from the target VM, address: '127.0.0.1:50820', transport: 'socket'

Process finished with exit code 0
```

## 代码仓库

[custom-persistence](https://github.com/terwer/senior-java-engineer-road/tree/master/p7-skill/framework/mybatis/custom-persistence)

> 文章更新历史  
> 2022/05/08 feat:增加Kotlin实现

‍