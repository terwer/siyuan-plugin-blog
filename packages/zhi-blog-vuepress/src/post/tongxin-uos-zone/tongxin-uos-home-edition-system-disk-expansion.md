---
title: 统信 UOS 家庭版系统盘扩容
short_title: ''
description: 统信 UOS 家庭版默认安装完成之后系统盘是15G，这样的话如果我们做开发，稍微安装一些类库，系统盘就会爆满。
date: 2022-06-07 23:34:55
category:
  - 统信UOS专区
  - UOS专区
tag:
  - uos
  - uos-home
  - deepin
  - disk
  - partion
article: true
timeline: false
---
# 统信 UOS 家庭版系统盘扩容

## 前言

统信 UOS 家庭版默认安装完成之后系统盘是15G，这样的话如果我们做开发，稍微安装一些类库，系统盘就会爆满。

## 解决

### 方法一（推荐）

我们可以在安装之前把系统盘设置大一些。但是，很多时候我们是默认安装的，这种方法就不行了。

:::warning

注意：操作之前，一定要备份工作空间！操作之前，一定要备份工作空间！操作之前，一定要备份工作空间！

**数据无价，谨慎操作！**

:::

用 Gparted 分区

![image-20220608150509930](https://img1.terwer.space/20220608150510.png)

安装指定分区

![image-20220608150605879](https://img1.terwer.space/20220608150606.png)

其实我们只需要分4个区就好。

`/boot` ：efi 启动分区，不用太大，300M-500M 即可。

`/` ：根分区，尽量大，我这里设置了 200G 。

`/home` ：主要的用户数据区，存放重要资料和工作空间。我这里是 233G 。

`swap` ：交换分区，根内存一样即可。我这里是 16G ，因为我的内存设置的是 16G 。

重装

![image-20220608150916658](https://img1.terwer.space/20220608150917.png)



![image-20220608150944337](https://img1.terwer.space/20220608150944.png)



![image-20220608151016773](https://img1.terwer.space/20220608151017.png)

好了，到这里就大功告成啦。现在可以把工作空间拷贝回来了。

### 方法二

不推荐。

可能会造成无法启动。

[https://bbs.deepin.org/post/237402](https://bbs.deepin.org/post/237402)