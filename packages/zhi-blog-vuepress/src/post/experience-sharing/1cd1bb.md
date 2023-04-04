---
title: MySQL57查看与修改数据库编码为utf8
short_title: ''
description: MySQL57查看与修改数据库编码为utf8。
date: 2022-05-28 01:27:20
category:
  - 实用技巧
  - 经验分享
tag:
  - mysql
  - mysql57
  - char
  - encoding
  - utf8
article: true
timeline: false
---
查看MySQL编码

```bash
show variables like 'char%';
```

修改 `my.cnf` 设置 `utf8` 编码

## utf8

```ini
[mysqld]
# 解决中文问号乱码问题
# show variables like 'char%';
collation-server = utf8_general_ci
init-connect='SET NAMES utf8'
character-set-server=utf8

[client]
default-character-set=utf8
```

## utf8mb4

```ini
[mysqld]
# 解决中文问号乱码问题
# show variables like 'char%';
collation-server = utf8mb4_bin
init-connect='SET NAMES utf8mb4'
character-set-server=utf8mb4

[client]
default-character-set=utf8mb4
```

完了重启即可。

效果

```bash
mysql> show variables like 'char%';
+--------------------------+----------------------------+
| Variable_name            | Value                      |
+--------------------------+----------------------------+
| character_set_client     | utf8mb4                    |
| character_set_connection | utf8mb4                    |
| character_set_database   | utf8mb4                    |
| character_set_filesystem | binary                     |
| character_set_results    | utf8mb4                    |
| character_set_server     | utf8mb4                    |
| character_set_system     | utf8                       |
| character_sets_dir       | /usr/share/mysql/charsets/ |
+--------------------------+----------------------------+
8 rows in set (0.00 sec)
```

PS：更完整的显示字符编码信息：

```bash
SHOW VARIABLES WHERE Variable_name LIKE 'character\_set\_%' OR Variable_name LIKE 'collation%';
```

| Variable\_name             | Value        |
| :------------------------- | :----------- |
| character\_set\_client     | utf8mb4      |
| character\_set\_connection | utf8mb4      |
| character\_set\_database   | utf8mb4      |
| character\_set\_filesystem | binary       |
| character\_set\_results    | utf8mb4      |
| character\_set\_server     | utf8mb4      |
| character\_set\_system     | utf8         |
| collation\_connection      | utf8mb4\_bin |
| collation\_database        | utf8mb4\_bin |
| collation\_server          | utf8mb4\_bin |

## 单独修改某个数据库的编码规则

参考：

[https://confluence.atlassian.com/kb/how-to-fix-the-collation-and-character-set-of-a-mysql-database-744326173.html](https://confluence.atlassian.com/kb/how-to-fix-the-collation-and-character-set-of-a-mysql-database-744326173.html)

```sql
# To check database collation:
use jira;
SELECT @@character_set_database, @@collation_database;

# To check Table collation:
SELECT TABLE_SCHEMA
    , TABLE_NAME
    , TABLE_COLLATION 
FROM INFORMATION_SCHEMA.TABLES;

# To check Column collation:
SELECT TABLE_NAME 
    , COLUMN_NAME 
    , COLLATION_NAME 
FROM INFORMATION_SCHEMA.COLUMNS;

show create database jira;
ALTER DATABASE jira CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;
```

```bash
mysql> use jira;
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
mysql> SELECT @@character_set_database, @@collation_database;
+--------------------------+----------------------+
| @@character_set_database | @@collation_database |
+--------------------------+----------------------+
| utf8mb4                  | utf8mb4_general_ci   |
+--------------------------+----------------------+
1 row in set (0.00 sec)
```

```bash
mysql> show create database jira;
+----------+------------------------------------------------------------------+
| Database | Create Database                                                  |
+----------+------------------------------------------------------------------+
| jira     | CREATE DATABASE `jira` /*!40100 DEFAULT CHARACTER SET utf8mb4 */ |
+----------+------------------------------------------------------------------+
1 row in set (0.00 sec)
```

```bash
mysql> ALTER DATABASE jira CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;
Query OK, 1 row affected (0.00 sec)

mysql> SELECT @@character_set_database, @@collation_database;
+--------------------------+----------------------+
| @@character_set_database | @@collation_database |
+--------------------------+----------------------+
| utf8mb4                  | utf8mb4_bin          |
+--------------------------+----------------------+
1 row in set (0.00 sec)
```

如果不想修改数据库也可以修改连接串，jira在 jira-home/dbconfig.xml 里面，加上

```
&ampcharacterEncoding=utf8&amp;connectionCollation=utf8mb4_bin
```

修改表的排序规则

```sql
SELECT CONCAT('ALTER TABLE `',  table_name, '` CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;')
FROM information_schema.TABLES AS T, information_schema.`COLLATION_CHARACTER_SET_APPLICABILITY` AS C
WHERE C.collation_name = T.table_collation
AND T.table_schema = 'jira'
AND
(
    C.CHARACTER_SET_NAME != 'utf8mb4'
    OR
    C.COLLATION_NAME != 'utf8mb4_bin'
);
```

然后执行生成的sql，下面的同理。

修改数据行的排序规则

varchar行

```sql
SELECT CONCAT('ALTER TABLE `', table_name, '` MODIFY `', column_name, '` ', DATA_TYPE, '(', CHARACTER_MAXIMUM_LENGTH, ') CHARACTER SET utf8mb4 COLLATE utf8mb4_bin', (CASE WHEN IS_NULLABLE = 'NO' THEN ' NOT NULL' ELSE '' END), ';')
FROM information_schema.COLUMNS 
WHERE TABLE_SCHEMA = 'jira'
AND DATA_TYPE = 'varchar'
AND
(
    CHARACTER_SET_NAME != 'utf8mb4'
    OR
    COLLATION_NAME != 'utf8mb4_bin'
);
```

非varchar行

```sql
SELECT CONCAT('ALTER TABLE `', table_name, '` MODIFY `', column_name, '` ', DATA_TYPE, ' CHARACTER SET utf8mb4 COLLATE utf8mb4_bin', (CASE WHEN IS_NULLABLE = 'NO' THEN ' NOT NULL' ELSE '' END), ';')
FROM information_schema.COLUMNS 
WHERE TABLE_SCHEMA = 'jira'
AND DATA_TYPE != 'varchar'
AND
(
    CHARACTER_SET_NAME != 'utf8mb4'
    OR
    COLLATION_NAME != 'utf8mb4_bin'
);
```

## 参考

关于 utf8 的详细讨论可参考

[谈谈MySQL中的utf8和utf8mb4](http://blog.kevalin.xyz/2019/12/26/%E8%B0%88%E8%B0%88MySQL%E4%B8%AD%E7%9A%84utf8%E5%92%8Cutf8mb4/)