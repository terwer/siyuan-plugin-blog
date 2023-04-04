---
title: WSL2安装MySQL8.0和redis
short_title: ''
description: WSL2安装MySQL8.0和redis。
date: 2022-05-15 16:36:07
category:
  - 过程改进
  - 开发效率
  - 开发流程
tag:
  - wsl
  - mysql
  - redis
article: true
timeline: false
---
# WSL2安装MySQL8.0和redis

## 安装MySQL8.0

```bash
sudo apt-get install mysql-server mysql-client
```

默认的root密码是空

```bash
sudo mysql
```

修改MySQL密码

```sql
CREATE USER 'terwer'@'%' IDENTIFIED BY '123456';
GRANT ALL PRIVILEGES ON *.* TO 'terwer'@'%' WITH GRANT OPTION;
flush privileges; 
```

创建默认数据库

```sql
create database databasename default character set utf8mb4 collate utf8mb4_general_ci; 
```

hibernate的MySQL8.0配置

```properties
hibernate.connection.driverClass=com.mysql.cj.jdbc.Driver
hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
hibernate.connection.url=jdbc:mysql://localhost:3306/test?userSSL=true&useUnicode=true&characterEncoding=UTF8&serverTimezone=GMT
hibernate.connection.userName=terwer
hibernate.connection.password=123456
hibernate.hbm2ddl.auto=none
```

重启MySQL

```bash
sudo service mysql restart
```

停止MySQL

```bash
sudo service mysql stop
```

## 安装redis

```bash
sudo apt install redis
sudo /etc/init.d/redis-server stop
sudo /etc/init.d/redis-server restart
```