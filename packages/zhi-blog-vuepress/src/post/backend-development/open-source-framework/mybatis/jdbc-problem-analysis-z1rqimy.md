---
title: JDBC的问题分析
short_title: ''
description: jdbc的问题分析核心实现packagetest_importjavasqlconnection_importjavasqldrivermanager_importjavasqlpreparedstatement_importjavasqlresultset_at_authorterwerat_descriptionat_create_publicclassmain{publicstaticvoidmain(string[]args){connectionconnection=null_prepareds
date: 2022-08-27 16:16:11
category:
  - MyBatis
  - 后端开发
  - 开源框架
tag:
  - 数据库
  - mybatis
  - jdbc
  - problem
  - 问题
  - framework
  - mybatis-1
article: true
timeline: false
---
## 核心实现

```java
package test;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

/**
 * @author terwer
 * @Description
 * @create 2021-11-30 23:18
 */
public class Main {
    public static void main(String[] args) {
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        try {
            // 1、加载数据库驱动
            Class.forName("com.mysql.jdbc.Driver");
            // 2、获取数据库链接
            connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/mybatis?characterEncoding=utf-8&useSSL=false", "root", "123456");

            // 3、定义sql语句
            String sql = "select * from user where username = ?";
            // 4、获取预处理对象
            preparedStatement = connection.prepareStatement(sql);
            // 5、设置参数
            preparedStatement.setString(1, "terwer");
            // 6、拿到查询的数据库结果
            resultSet = preparedStatement.executeQuery();

            while (resultSet.next()) {
                int id = resultSet.getInt("id");
                String username = resultSet.getString("username");

                User user = new User();
                user.setId(id);
                user.setUsername(username);

                System.out.println("user = " + user.toString());
            }

            // JDBC问题分析
            // 1、数据库链接信息等存在硬编码  解决：配置文件
            // 2、频繁创建释放数据库链接 解决：连接池(c3p0、druid)

            // 查询过程问题分析
            // 1、sql语句、参数、结果集存在硬编码 解决：配置文件

            // 结果集问题分析
            // 1、需要手动封装结果集 解决：反射进行对象映射、内省

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            System.out.println("释放资源");
        }
    }
}

```

## 问题分析

### JDBC 问题总结

原生 jdbc 开发存在的问题如下:

1、 数据库连接创建、释放频繁造成 **系统资源浪费** ，从而影响系统性能

2、 Sql 语句在代码中 **硬编码** ，造成代码不易维护，实际应用中 sql 变化的可能较大，sql 变动需要改变 java 代码

3、 使用 preparedStatement **向占有位符号传参数存在硬编码 ​**，因为 sql 语句的 where 条件不一定，可能多也可能少，修改 sql 还要修改代码，系统不易维护

4、 **对结果集解析存在硬编码 ​**(查询列名)，sql 变化导致解析代码变化，系统不易维护，如果能将数据库记录封装成 pojo 对象来解析比较方便

### 问题解决思路

1、使用 **数据库连接池** 来初始化连接资源

2、将 sql 语句抽取到 **xml 配置文件 ​**中去

3、使用 **反射** 、 **内省** 等底层技术，自动将实体与数据库表进行属性与字段的自动映射

## mysql 驱动链接

[https://files.cnblogs.com/files/tangyouwei/mysql-connector-java-5.1.49.jar.zip](https://files.cnblogs.com/files/tangyouwei/mysql-connector-java-5.1.49.jar.zip)

## 本文源码

[https://github.com/terwer/senior-java-engineer-road/blob/main/p7-skill/framework/mybatis/jdbc-simple/src/main/java/com/terwergreen/Main.java](https://github.com/terwer/senior-java-engineer-road/blob/main/p7-skill/framework/mybatis/jdbc-simple/src/main/java/com/terwergreen/Main.java)

> 文章更新历史
>
> 2023/01/02 修正源码路径错误问题
>
> 2022/03/16 校对完成
>
> 2022/03/06 初稿