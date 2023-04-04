---
title: Ubuntu2204安装MySQL5_7
short_title: ''
description: Ubuntu直接使用下面的命令默认安装的是MySQL8.0，但是有时候为了兼容我们需要使用MySQL5.7。
date: 2022-05-16 13:12:35
category:
  - 过程改进
  - 开发效率
  - 开发流程
tag:
  - wsl
  - ubuntu
  - mysql
  - mysql57
article: true
timeline: false
---
Ubuntu直接使用下面的命令默认安装的是MySQL8.0，但是有时候为了兼容我们需要使用MySQL5.7。

```bash
# 会默认安装MySQL 8.0
sudo apt install mysql-sever mysql-client
```

解决方案如下：

```bash
wget https://repo.mysql.com//mysql-apt-config_0.8.12-1_all.deb
sudo dpkg -i mysql-apt-config_0.8.12-1_all.deb
```

这里选择MySQL5.7即可

![image-20220516165038541](https://cdn.jsdelivr.net/gh/terwer/upload@main/img/image-20220516165038541.png)

然后更新

```bash
sudo apt update
```

报错解决

```
The following signatures couldn't be verified because the public key is not available: NO_PUBKEY 467B942D3A79BD29
```

解决

```bash
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 467B942D3A79BD29
```

安装MySQL5.7

```bash
sudo apt install mysql-client=5.7.38-1ubuntu18.04 -y
sudo apt install mysql-community-server=5.7.38-1ubuntu18.04 -y
```

管理

```bash
service mysql status
# restrat
sudo service mysql restart
# stop
sudo service mysql stop
```

创建用户与数据库

```sql
CREATE USER 'terwer'@'%' IDENTIFIED BY '123456';
GRANT ALL PRIVILEGES ON *.* TO 'terwer'@'%' WITH GRANT OPTION;
flush privileges;

create database databasename default character set utf8mb4 collate utf8mb4_general_ci;
```