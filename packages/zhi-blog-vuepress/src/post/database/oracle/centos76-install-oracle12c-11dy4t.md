---
title: CentOS_7-6_安装Oracle_12c
short_title: ''
description: 下载地址_http_wwworaclecomtechnetworkdatabaseenterpriseeditiondownloadsindexhtmlhttps_wwworaclecomtechnetworkdatabaseenterpriseeditiondownloadsoracleclinuxhtml整个过程下载可能会比较慢最好是抓取下载链接然后使用wget下载例如​[root@terwergreenopt]#wgethttps_downloadoraclecomotnlinuxoraclecli
date: 2022-10-17 14:25:49
category:
  - 数据库
  - Oracle
tag:
  - 下载
  - 地址
  - oracle
  - centos
  - linux
  - oracle12c
  - 整个
  - 过程
  - 可能
article: true
timeline: false
---
下载地址：

```
http://www.oracle.com/technetwork/database/enterprise-edition/downloads/index.html

https://www.oracle.com/technetwork/database/enterprise-edition/downloads/oracle12c-linux-12201-3608234.html
```

整个过程下载可能会比较慢，最好是抓取下载链接，然后使用wget下载，例如

![](https://img1.terwer.space/api/public/20221017143331.png)​

```
[root@terwergreen opt]# wget https://download.oracle.com/otn/linux/oracle12c/122010/linuxx64_12201_database.zip?AuthParam=1552132547_497757efbab4cd9c91b5d9c3fde56635
--2019-03-09 19:55:16--  https://download.oracle.com/otn/linux/oracle12c/122010/linuxx64_12201_database.zip?AuthParam=1552132547_497757efbab4cd9c91b5d9c3fde56635
正在解析主机 download.oracle.com (download.oracle.com)... 104.127.201.249
正在连接 download.oracle.com (download.oracle.com)|104.127.201.249|:443... 已连接。
已发出 HTTP 请求，正在等待回应... 200 OK
长度：3453696911 (3.2G) [application/zip]
正在保存至: “linuxx64_12201_database.zip?AuthParam=1552132547_497757efbab4cd9c91b5d9c3fde56635”

78% [================================================================================>                       ] 2,711,796,149 10.8MB/s 剩余 71s    
```

1.root身份安装依赖包：

```
yum -y install binutils compat-libcap1 compat-libstdc++-33 compat-libstdc++-33*.i686 elfutils-libelf-devel gcc gc
```

2.建立用户和组：

```
groupadd oinstall  
groupadd dba  
groupadd oper  
useradd -g oinstall -G dba,oper oracle  
echo "123456" | passwd --stdin oracle #oracle用户的登录密码，后续登录要用，记着。
```

3.创建安装目录：

```
mkdir -p /orcl/app/oracle/product/12.1.0/db_1  
chown -R oracle:oinstall /orcl/app  
chmod -R 775 /orcl/app
```

4.修改内核参数`vim /etc/sysctl.conf`，添加：

```
fs.aio-max-nr = 1048576  
fs.file-max = 6815744  
kernel.shmall = 2097152  
kernel.shmmax = 1200000000    
kernel.shmmni = 4096  
kernel.sem = 250 32000 100 128  
net.ipv4.ip_local_port_range = 9000 65500  
net.core.rmem_default = 262144  
net.core.rmem_max = 4194304  
net.core.wmem_default = 262144  
net.core.wmem_max = 1048576
```

改好后，使之生效
`sysctl -p`

另外 上面的`kernel.shmmax = 1200000000`可能会有问题,后面咱们再说。

或者你直接现在就写成`4098955264`

5.改文件限制：`vim /etc/security/limits.conf`，添加：

```
oracle soft nproc 2047  
oracle hard nproc 16384  
oracle soft nofile 1024  
oracle hard nofile 65536  
oracle soft stack 10240
```

注意：修改此文件是即时生效的，但可能要重登录后再看

6.以及`vim /etc/pam.d/login`，添加：

```
session required pam_limits.so
```

7.修改ulimit：`vim /etc/profile`，添加：

```
if [ $USER = "oracle" ]; then  
if [ $SHELL = "/bin/ksh" ]; then  
ulimit -p 16384  
ulimit -n 65536a  
else  
ulimit -u 16384 -n 65536  
fi  
fi
```

8.修改环境变量。`vim ~oracle/.bash_profile`，添加：

```
ORACLE_BASE=/orcl/app/oracle  
ORACLE_HOME=$ORACLE_BASE/product/12.1.0/db_1  
ORACLE_SID=orcl  
export ORACLE_BASE ORACLE_HOME ORACLE_SID  
PATH=$ORACLE_HOME/bin:$PATH  
export PATH  
```

9.用`yum remove *openjdk* `把系统自带的openjdk卸载，再安装

`sun jdk：rpm -ivh jdk-8u144-linux-x64.rpm`。

下载地址: [https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

安装参考：[https://www.cnblogs.com/tangyouwei/p/10080840.html](https://www.cnblogs.com/tangyouwei/p/10080840.html ) 和 [https://www.cnblogs.com/stulzq/p/9286878.html](https://www.cnblogs.com/stulzq/p/9286878.html)

（openjdk环境安装oracle GUI会报class not found的错）。然后$>java -version检查一下安装是否成功。上述工作完成后，建议重启系统。

10.以oracle用户登录，开始安装：

```
yum install unzip
```

[设置swap分区](http://www.cnblogs.com/a9999/p/6957280.html)

# 安装xdpyinfo

```
yum install -y xdpyinfo

```

安装oracle报错must be configured to display at least 256 colors Failed
https://blog.csdn.net/xiegh2014/article/details/45077149

1、先执行 `xhost +`
2、`export DISPLAY=:0.0`

[为 CentOS 7 实例图形化桌面](https://www.alibabacloud.com/help/zh/faq-detail/41227.htm#ECSCentOS7)

[CentOS7 运行级别的切换（命令行和窗口的切换）](https://blog.51cto.com/hunkz/1559677)

```
# 命令行
systemctl set-default multi-user.target
# 窗口
systemctl set-default graphical.target
```

```
su  oracle  
cd /orcl/app/oracle  
unzip linuxx64_12201_database.zip 
export LANG="en_US"  
cd /orcl/app/oracle/database  
./runInstaller
```

注：下载好的Oracle要放到/orcl/app/oracle目录下，/orcl/app/oracle/下是2个目录：product和database。解压后的安装文件放在database下。然后就会出现安装界面，配置过程从略。需要注意的是字符集要选择unicode。

# EM

EM Express
[https://localhost:5500/em/](https://localhost:5500/em/)
sys
123456
sysdba

# sqlplus登录

```
lsnrctl start	打开监听
$ sqlplus /nolog	进入sql命令行
SQL> conn /as sysdba	切换权限
SQL> startup	启动数据库
SQL> shutdown immediate	停止数据库
```

启动12c数据库

Oracle12c重启

#进入到oracle的安装目录
cd $ORACLE_HOME/bin
#重启监听器
lsnrctl start

# 查看数据库状态

lsnrctl status
echo $ORACLE_SID
export ORACLE_SID=orcl
然后再执行启动命令：
sqlplus / as sysdba
SQL> startup

# 更简单的启动方法

```
dbstart $ORACLE_HOME_LISTNER
dbshut $ORACLE_HOME_LISTNER
```

http://lizhe.name/node/111

# oracle12c EM的配置和使用

[https://blog.csdn.net/rarlyf/article/details/21542321](https://blog.csdn.net/rarlyf/article/details/21542321)

# 安装样例数据库

[https://docs.oracle.com/database/121/COMSC/installation.htm#COMSC001](https://docs.oracle.com/database/121/COMSC/installation.htm#COMSC001)

或者 [https://www.oracle.com/technetwork/database/enterprise-edition/downloads/index-092322.html](https://www.oracle.com/technetwork/database/enterprise-edition/downloads/index-092322.html)

或者官方 [https://github.com/oracle/db-sample-schemas/releases/tag/v12.1.0.2](https://github.com/oracle/db-sample-schemas/releases/tag/v12.1.0.2)

# sys账户登录

```
sqlplus sys/123456 as sysdba
```

## 安装步骤

```
wget https://github.com/oracle/db-sample-schemas/archive/v12.1.0.2.zip
```

```
sqlplus system/123456
sqlplus system/123456@localhost:1521/orcl
sqlplus system/123456@39.104.66.135:1521/orcl

```

http://www.ituring.com.cn/book/1329

## Oracle 12c特殊处理

```
alter session set "_ORACLE_SCRIPT"=true;  

```

[https://stackoverflow.com/questions/33330968/error-ora-65096-invalid-common-user-or-role-name-in-oracle](https://stackoverflow.com/questions/33330968/error-ora-65096-invalid-common-user-or-role-name-in-oracle)

测试

```
CREATE USER hr IDENTIFIED BY 123456;
CREATE USER oe IDENTIFIED BY 123456;
CREATE USER pm IDENTIFIED BY 123456;
CREATE USER ix IDENTIFIED BY 123456;
CREATE USER sh IDENTIFIED BY 123456;
CREATE USER bi IDENTIFIED BY 123456;
```

```
@mksample 123456 123456 123456 123456 123456 123456 123456 123456 users temp /orcl/app/oracle/product/12.1.0/db_1/rdbms/log/ localhost:1521/orcl
@mksample 123456 123456 123456 123456 123456 123456 123456 123456 users temp /orcl/app/oracle/product/12.1.0/db_1/rdbms/log/ 39.104.66.135:1521/orcl
```

完整命令

```
sqlplus system/123456@localhost:1521/orcl
```

```
alter session set "_ORACLE_SCRIPT"=true;  
CREATE USER hr IDENTIFIED BY 123456;
CREATE USER oe IDENTIFIED BY 123456;
CREATE USER pm IDENTIFIED BY 123456;
CREATE USER ix IDENTIFIED BY 123456;
CREATE USER sh IDENTIFIED BY 123456;
CREATE USER bi IDENTIFIED BY 123456;
@mksample 123456 123456 123456 123456 123456 123456 123456 123456 users temp /orcl/app/oracle/product/12.1.0/db_1/rdbms/log/ localhost:1521/orcl
```

# 无监听解决

```
# listener.ora Network Configuration File: /orcl/app/oracle/product/12.1.0/db_1/network/admin/listener.ora
# Generated by Oracle configuration tools.

SID_LIST_LISTENER =
  (SID_LIST =
    (SID_DESC =
      (SID_NAME = PLSExtProc)
      (ORACLE_HOME = /orcl/app/oracle/product/12.1.0/db_1)
      (PROGRAM = extproc)
    )
    (SID_DESC =
      (GLOBAL_DBNAME = ORCL)
      (ORACLE_HOME = /orcl/app/oracle/product/12.1.0/db_1)
      (SID_NAME = ORCL)
    )
  )

LISTENER =
  (DESCRIPTION_LIST =
    (DESCRIPTION =
      (ADDRESS = (PROTOCOL = TCP)(HOST = terwergreen)(PORT = 1521))
      (ADDRESS = (PROTOCOL = IPC)(KEY = EXTPROC1521))
    )
  )

```

# 环境变量设置

```
# oracle
export ORACLE_HOME=/orcl/app/oracle/product/12.1.0/db_1
export PATH=$ORACLE_HOME/bin:$PATH
export ORACLE_SID=orcl
```

‍