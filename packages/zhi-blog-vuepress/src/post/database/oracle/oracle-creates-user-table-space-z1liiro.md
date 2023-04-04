---
title: Oracle创建用户表空间
short_title: ''
description: 创建用户打开命令提示框输入以下内容输入_sqlplusnolog​进入oralce控制台输入_connassysdba​以管理员权限登录输入_createuserabcidentifiedby_​创建用户名adc密码输入_grantdbatoabc_​授予dba权限分为四步第步_创建临时表空间createtemporarytablespaceuser_temptempfilec_softwareoracleproductdbhome_oradatauser_tempdbfsizemautoextendon
date: 2022-10-17 14:52:37
category:
  - 数据库
  - Oracle
tag:
  - 创建
  - 输入
  - 用户
  - 权限
  - 空间
  - 表空间
  - oracle
article: true
timeline: false
---
## 创建用户

打开命令提示框输入以下内容

1.输入：`sqlplus /nolog`​ //进入oralce控制台  
2.输入：`conn /as sysdba`​ //以管理员权限登录  
3.输入：`create user abc identified by 123456;`​ //创建用户名adc密码123456  
4.输入：`grant dba to abc;`​ //授予DBA权限

# 表空间

```sql
/*分为四步 */
/*第1步：创建临时表空间  */
create temporary tablespace user_temp
tempfile 'C:\Software\oracle\product\12.2.0\dbhome_1\oradata\user_temp.dbf'
size 50m
autoextend on
next 50m maxsize 20480m
extent management local;

/*第2步：创建数据表空间  */
create tablespace user_data
logging
datafile 'C:\Software\oracle\product\12.2.0\dbhome_1\oradata\user_data.dbf'
size 50m
autoextend on
next 50m maxsize 20480m
extent management local;

/*第3步：创建用户并指定表空间  */
create user username identified by password
default tablespace user_data
temporary tablespace user_temp;

/*第4步：给用户授予权限  */
grant connect,resource,dba to username;
```

# 用户

```sql
SQL> create user terwer identified by 123456;

用户已创建。

SQL> grant dba to terwer;

授权成功。

SQL>
```

实例

```sql
create user kms15 identified by 123456
default tablespace user_data
temporary tablespace user_temp;
grant dba to kms15;

create user kms16 identified by 123456
default tablespace user_data
temporary tablespace user_temp;
grant dba to kms16;
```