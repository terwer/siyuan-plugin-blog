---
title: 在Docker中部署confluence和jira
short_title: ''
description: 在Docker中部署confluence和jira。
date: 2022-06-01 14:48:24
category:
  - 实用技巧
  - 经验分享
tag:
  - docker
  - confluence
  - jira
article: true
timeline: false
---
## 部署confluence

[https://hub.docker.com/r/atlassian/confluence](https://hub.docker.com/r/atlassian/confluence)

### 数据库配置

创建数据库

```sql
create database confluence default character set utf8mb4 collate utf8mb4_bin;
```

下载并配置数据库驱动

配置 `my.cnf`

PS：除了共用jira的部分配置，还需要下面的配置

```bash
# 指定设置为 utf8mb4 的默认字符
# character-set-server=utf8mb4
# collation-server=utf8mb4_bin

# 默认存储引擎设置为 InnoDB
# default-storage-engine=INNODB
transaction-isolation=READ-COMMITTED

max_allowed_packet=256M
# innodb_log_file_size=2GB

# 检查二进制记录格式是否被配置为使用"row-based"的二进制记录，以及
# 数据库用户是否可以创建和更改存储的功能
binlog_format=row
log-bin-trust-function-creators=1
```

其他没什么特别的。直接安装就好了。

## 部署jira

[https://hub.docker.com/r/atlassian/jira-software](https://hub.docker.com/r/atlassian/jira-software)

### 基本运行环境

Dockerfile

```dockerfile
# 依赖的镜像
FROM atlassian/jira-software:8.22.3-ubuntu-jdk11

#镜像创建者的信息
LABEL maintainer="terwer youweics@163.com"

# 设置编码
ENV LANG C.UTF-8

# 设置时区
# ENV TZ Asia/Shanghai
ENV TZ CST-8

# 容器入口
COPY ./entrypoint.sh /entrypoint.sh
# 注意：这个CMD会覆盖原来image的命令
# CMD ["/entrypoint.py"]
# 因此，需要再次执行entrypoint.py
CMD ["bash", "/entrypoint.sh"]
```

启动入口

注意：添加MySQL驱动

```bash
#!/bin/sh

# 添加MySQL驱动
cp /drivers/mysql-connector-java-5.1.49.jar /opt/atlassian/jira/lib
# 设置权限，没必要，jar包默认root权限即可
# chown -R jira:jira /opt/atlassian/jira/lib/mysql-connector-java-5.1.49.jar
echo "copy mysql driver finished"

# start jira
/entrypoint.py
```

docker-compose.yml

```yaml
# https://github.com/codeclou/docker-atlassian-jira-data-center/blob/master/versions/8.20.5/docker-compose-one-node.yml
# 查看最新版本
# https://stackoverflow.com/questions/28320134/how-can-i-list-all-tags-for-a-docker-image-on-a-remote-registry
# ./dockertags.sh atlassian/jira-software 8.22.3
# 运行
# docker-compose up --build

version: "3.2"
services:
  portable-jira:
    image: terwer/jira:8.22.3-ubuntu-jdk11
    container_name: portable-jira
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "8080:8080"
    # Allow docker to connect to localhost
    network_mode: "host"
    environment:
      # 最好使用此设定时区，其它镜像也可以使用，也可以用"TZ=Asia/Shanghai"
      - "TZ=CST-8"
      # # Memory / Heap Size
      # - JVM_MINIMUM_MEMORY=512M
      # - JVM_MAXIMUM_MEMORY=2048M
    # volumes:
    #   - type: bind
    #     source: ./jira-home
    #     target: /var/atlassian/application-data/jira
    volumes:
      - ./jira-home:/var/atlassian/application-data/jira
      - ./drivers:/drivers
    stdin_open: true
    tty: true
    restart: "no"

```

### 数据库配置

参考

[https://confluence.atlassian.com/adminjiraserver/connecting-jira-applications-to-mysql-5-7-966063305.html](https://confluence.atlassian.com/adminjiraserver/connecting-jira-applications-to-mysql-5-7-966063305.html)

创建数据库

```sql
create database jira default character set utf8mb4 collate utf8mb4_bin;
```

下载并配置数据库驱动

配置 `my.cnf`

```ini
[mysqld]
# ...

# jira
default-storage-engine=INNODB
character_set_server=utf8mb4
innodb_default_row_format=DYNAMIC
innodb_large_prefix=ON
innodb_file_format=Barracuda
innodb_log_file_size=2G
// remove this if it exists
sql_mode=NO_AUTO_VALUE_ON_ZERO
```

重启MySQL。

:::warning

注意：docker版本的MySQL修改之后需要重新build。

```
docker-compose up --build
```

:::

重启Jira。

注意：为了重新构建时的权限问题，最好把jira-home加入dockerignore

![image-20220602143325463](https://img1.terwer.space/20220602143330.png)

### 运行

运行 `docker-compose up --build`

然后浏览器打开

```
http://localhost:8080
```

设置方式选择自己配置，语言选择中文，数据库选择MySQL57

![image-20220602143928939](https://img1.terwer.space/20220602143929.png)

后面会出现许可证，我们可以先试用。如果你资金允许可以购买正版。

到这里Jira的安装就结束了，尽情使用吧！

## 数据迁移

选择系统->导入导出，先备份成zip，然后导入即可。

注意：备份的时候文件名不需要输入 .zip ，但是还原的时候需要输入 .zip 。