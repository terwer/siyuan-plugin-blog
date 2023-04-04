---
title: docker运行思源笔记
short_title: ''
date: 2022-06-21 19:00:31
category:
  - 经验分享
tag: []
article: true
timeline: false
---
# docker 运行思源笔记

`docker` 调试成功，有需要脚本的可以拿走 `docker-compose.yml`

```yml
 # docker-compose --log-level INFO up --build
 # docker-compose --log-level INFO up -d --build
 
 version: '3'
 services:
   portable-siyuan:
     stdin_open: true
     tty: true
     image: terwer/siyuan:2.0.22
     container_name: portable-siyuan
     build:
       context: .
       dockerfile: Dockerfile
     ports:
       - "6806:6806"
     environment:
       # 最好使用此设定时区，其它镜像也可以使用，也可以用"TZ=Asia/Shanghai"
       - "TZ=CST-8"
     volumes:
       - ./workspace:/home/siyuan/Documents
     restart: "no"
```

依赖的 `Dockerfile` 就是 `Github` 的。