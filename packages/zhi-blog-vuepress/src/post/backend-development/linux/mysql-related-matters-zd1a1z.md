---
title: CentOS7安装与配置MySQL
short_title: ''
description: 安装rpm版本的mysql安装源#卸载旧版rpmqa_grepmysqlsudorpmenodepsmysqlcommunityreleaseelnoarch#安装新版wgethttp_repomysqlcommysqlcommunityreleaseelnoarchrpmsudorpmuvhmysqlcommunityreleaseelnoarchrpm#导入keysudorpmimporthttps_repomysqlcomrpmgpgkeymysql安装mysqlsudodnfinstallymys
date: 2022-09-28 00:52:06
category:
  - 后端开发
  - Linux
tag:
  - 重启
  - 创建
  - 用户
  - 允许
  - 远程
article: true
timeline: false
---
## 安装 rpm 版本的 mysql

### 安装源

```bash
# 卸载旧版
rpm -qa | grep mysql
sudo rpm -e --nodeps mysql-community-release-el7-5.noarch

# 安装5.7新版
wget http://repo.mysql.com/mysql57-community-release-el7-10.noarch.rpm
sudo rpm -Uvh mysql57-community-release-el7-10.noarch.rpm
# 导入key
sudo rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2022
```

### 安装 mysql

```bash
sudo dnf install -y mysql-community-server
```

## 启动 MySQL

```bash
systemctl start mysqld.service
```

## 检测是否启动成功

```bash
systemctl status mysqld.service
```

## 获取临时密码，MySQL5.7 为 root 用户随机生成了一个密码

```bash
sudo grep 'temporary password' /var/log/mysqld.log 
```

## 因为 MySQL 的密码规则需要很复杂，我们一般自己设置的不会设置成这样，所以我们全局修改一下

```bash
mysql> set global validate_password_policy=0;
mysql> set global validate_password_length=1;
```

## 修改 root 密码

```bash
ALTER USER 'root'@'localhost' IDENTIFIED BY 'root';
```

授权其他机器登录

```bash
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'root' WITH GRANT OPTION;
FLUSH PRIVILEGES;
```

## 创建 MySQL 用户并允许远程访问

```sql
CREATE USER 'terwer'@'%' IDENTIFIED BY '123456';
GRANT ALL PRIVILEGES ON *.* TO 'terwer'@'%' WITH GRANT OPTION;
flush privileges;
```

## 重启 mysql

```bash
service mysqld restart
```

## 关闭防火墙

```bash
systemctl stop firewalld;
systemctl stop iptables;
```

## 开启开机自启动

```bash
systemctl enable mysqld
systemctl daemon-reload
```

## 设置 MySQL 的字符集为 UTF-8，令其支持中文

```bash
vim /etc/my.cnf
```

改成下面的样子，然后保存

```bash
# For advice on how to change settings please see
# http://dev.mysql.com/doc/refman/5.7/en/server-configuration-defaults.html
 
[mysql]
default-character-set=utf8
 
[mysqld]
datadir=/var/lib/mysql
socket=/var/lib/mysql/mysql.sock
default-storage-engine=INNODB
character_set_server=utf8
 
symbolic-links=0
 
log-error=/var/log/mysqld.log
pid-file=/var/run/mysqld/mysqld.pid
```

重启 service mysqld restart

## 防火墙开放 3306 端口

```bash
firewall-cmd --state
firewall-cmd --zone=public --add-port=3306/tcp --permanent
firewall-cmd --reload
```

## 卸载 MySQL

```bash
rpm -qa | grep mysql
```

```bash
yum -y remove mysql57-community-release-el7-10.noarch
```

## 数据库此操作

1. 查看 mysql 是否启动：`service mysqld status`

启动 mysql：`service mysqld start`

停止 mysql：`service mysqld stop`

重启 mysql：`service mysqld restart`

2. 查看临时密码：`grep password /var/log/mysqld.log`

‍