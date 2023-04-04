---
title: 阿里云安装桌面环境及VNC连接
short_title: ''
description: 阿里云安装桌面环境及VNC连接。
date: 2022-05-16 12:24:49
category:
  - 过程改进
  - 开发效率
  - 开发流程
tag:
  - xfce
  - vncserver
article: true
timeline: false
---
## 安装桌面环境

```
yum groupinstall Xfce -y
```

## 安装vnc

```
yum install tigervnc-server -y
```

## 设置密码

```
vncpasswd
```

## 组策略允许5901端口

## 启动vnc

```
vncserver
```

## 连接

下载realvnc

```
ip:1
```

或者

```
ip:端口
```

## 查看实例列表

```bash
vncserver -list
```

## 停止实例

```bash
vncserver -kill :1
```

## 安装redis

```bash
yum install -y redis
service redis restart
```