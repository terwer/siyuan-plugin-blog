---
title: 搭建一个轻量级的ftp服务器
short_title: ''
description: 搭建直接使用我写好的dockercompose​脚本即可。​dockerfile​#依赖的镜像fromdelferalpineftpserver_latest#镜像创建者的信息maintainerterwer#设置编码envlangcutf#设置时区envtzasiashanghai#dockerinspectportableftpserver_grepipaddres​dockercomposeyml​#dockercomposeloglevelinfoupbuildportableminaftpser
date: 2022-10-31 18:38:17
category:
  - 经验分享
tag:
  - 搭建
  - 直接
  - light-weight
  - ftp
  - ftpserver
  - docker
  - 轻量级
article: true
timeline: false
---
## 搭建

直接使用我写好的 `docker-compose`​ 脚本即可。

​`Dockerfile`​

```dockerfile
# 依赖的镜像
FROM delfer/alpine-ftp-server:latest

#镜像创建者的信息
MAINTAINER terwer "youweics@163.com"

# 设置编码
ENV LANG C.UTF-8

# 设置时区
ENV TZ Asia/Shanghai

# docker inspect portable-ftpserver | grep IPAddres
```

​`docker-compose.yml`​

```yaml
# docker-compose --log-level INFO up --build portable-mina-ftpserver
# docker-compose --log-level INFO up

version: '3'
services:
  portable-redis7:
    image: terwer/ftpserver:latest
    container_name: portable-ftpserver
    build:
     context: .
     dockerfile: Dockerfile
    ports:
     - "21:21"
     - "21000-21010:21000-21010"
    environment:
     - "TZ=Asia/Shanghai"
     - "USERS=terwer|123456|/Users/terwer/ftppath|10000"
     - "ADDRESS=localhost"
    volumes:
      - ./ftphome:/Users/terwer/ftppath
    stdin_open: true
    restart: "no"
    networks:
      - local-dev

networks:
  local-dev:
    external: true
```

## 运行 ftpserver

在 `docker-compose.yml`​ 的同级目录，新建一个 `ftphome`​ 文件夹，然后运行下面命令即可。

```bash
docker compose up --build
```

## 连接 ftp 测试

使用 Filezilla

![](https://img1.terwer.space/api/public/20221031184315.png)​

信息如下：

```bash
Host localhost
Port 21 # 端口默认是21，可以不写

User terwer
Password 123456
```

效果：

![](https://img1.terwer.space/api/public/20221031184611.png)​