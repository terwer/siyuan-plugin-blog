---
title: Oracle12c创建表空间、用户
short_title: ''
description: 一前言oraclec中新增加了可插入数据库的概念即pdb（pluggabledatabase）允许一个容器数据库即cdb（containerdatabase）承载多个可插入数据库pdb。cdb相当于操作系统调用并管理各个pdbpdb相当于真正提供业务需求的数据库实例。在pdb中创建用户与之前相同但在cdb中创建用户与之前有所不同下面会详细说明。默认会安装一个名字为orcl​的pdb。查看pdb~sqlplussysassysdbasqlshowpdbs）打开sqlplus以system用户登录注意输入密码
date: 2022-10-17 14:55:42
category:
  - 数据库
  - Oracle
tag:
  - 创建
  - 用户
  - 数据库
  - 空间
  - 注意
  - oracle
  - 表空间
  - tablespace
article: true
timeline: false
---
## 一、前言

Oracle 12c 中新增加了可插入数据库的概念，即 PDB（Pluggable Database），允许一个容器数据库 ，即 CDB （Container Database）承载多个可插入数据库 PDB 。CDB 相当于操作系统，调用并管理各个 PDB ，PDB 相当于真正提供业务需求的数据库实例。在 PDB 中创建用户与之前相同，但在 CDB 中创建用户与之前有所不同，下面会详细说明。

默认会安装一个名字为 `ORCL`​ 的 pdb。

## 查看 pdb

```sql
~ sqlplus sys/123456 as sysdba
>SQL show pdbs
```

1）打开 SQL Plus, 以 system 用户登录，注意输入密码后面加入“as sysdba”;

这是如果创建普通用户则会提示“ORA-65096：公用用户名或角色名无效”。

输入

```sql
show con_name
```

可以看出当前容器为 CDB。

2）输入以下代码，启动 PDB 数据库：

```sql
 alter session set container=ORCL; 
 -- startup;
```

## 二、创建表空间

CDB 与 PDB 之间的表空间是不能相互使用的，需要单独创建

**注意：这里需要切换 session， 参考第一步第2小步。**

注意目录

```bash
cd /opt/oracle/oradata
mkdir ORCLPDB
```

```bash
 alter session set container=ORCL; 
```

1. 创建临时表空间

```sql
--  alter session set container=ORCL; 
CREATE TEMPORARY tablespace my_temp tempfile '/opt/oracle/oradata/orclpdb/my_temp.dbf' SIZE 50m autoextend ON NEXT 50m maxsize 20480m extent management LOCAL;
```

2. 创建数据表空间

```sql
--  alter session set container=ORCL; 
CREATE tablespace my_data logging datafile '/opt/oracle/oradata/orclpdb/my_data.dbf' SIZE 50m autoextend ON NEXT 50m maxsize 20480m extent management LOCAL;
```

## 三、创建用户

1. 创建用户

```sql
-- CDB下创建用户需要加上c##或C##才能创建成功（c##xxx整体是用户名）
CREATE USER c##xxx IDENTIFIED BY 密码
DEFAULT tablespace 数据表空间
TEMPORARY tablespace 临时表空间;
```

```sql
-- PDB 下创建用户按之前的方式就行
CREATE USER xxx IDENTIFIED BY 密码
DEFAULT tablespace 数据表空间
TEMPORARY tablespace 临时表空间;
```

2. 赋予权限

```sql
GRANT CONNECT,resource,dba TO terwer;
```

例子：

```sql
--  alter session set container=ORCL; 
create user kms15 identified by 123456 default tablespace my_data temporary tablespace my_temp; 
grant CONNECT,resource,dba to kms15;

--  alter session set container=ORCL; 
create user kms16 identified by 123456 default tablespace my_data temporary tablespace my_temp;
grant CONNECT,resource,dba to kms16;
```

## 四、删除表空间、用户

1. 删除表空间<br />

```sql
-- 删除空的表空间，但是不包含物理文件
DROP tablespace 表空间名称;

-- 删除空表空间，包含物理文件
DROP tablespace 表空间名称 INCLUDING datafiles;

-- 删除非空表空间，但是不包含物理文件
DROP tablespace 表空间名称 INCLUDING contents;

--删除非空表空间，包含物理文件
DROP tablespace 表空间名称 INCLUDING contents AND datafiles;

--如果其他表空间中的表有外键等约束关联到了本表空间中表的字段，需要加上CASCADE CONSTRAINTS
DROP tablespace 表空间名称 INCLUDING contents AND datafiles CASCADE CONSTRAINTS;
```

2. 删除用户

```sql
-- 只是删除此用户
DROP USER 用户名;

-- 会删除此用户及此用户关联的所有表和视图
DROP USER 用户名 CASCADE;
```