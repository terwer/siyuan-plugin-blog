---
title: Paralle_Desktop安装CentOS7
short_title: ''
description: 下载centos最小化isohttp_isomirrorsustceducncentosisosx_centosx_minimaliso完全版isohttps_isomirrorsustceducncentosisosx_centosx_everythingisoparalledesktop新建虚拟机注意一下_paralle安装centos有两个坑要选择自动安装勾选安装前设定安装前设定要设置虚拟机监控程序为paralle默认是apple第二点非常重要要不然启动会失败。正常情况下是下面的页面一直跑日志_​最
date: 2022-09-29 23:16:42
category:
  - 后端开发
  - Linux
tag:
  - 虚拟机
  - parallel
  - parallel-desktop
  - centos
  - centos7
  - 安装
  - 设定
  - 下载
  - 最小化
article: true
timeline: false
---
## 下载 CentOS7

### 最小化 iso

[http://iso.mirrors.ustc.edu.cn/centos/7.9.2009/isos/x86_64/CentOS-7-x86_64-Minimal-2009.iso](http://iso.mirrors.ustc.edu.cn/centos/7.9.2009/isos/x86_64/CentOS-7-x86_64-Minimal-2009.iso)

### 完全版 iso

[https://iso.mirrors.ustc.edu.cn/centos/7.9.2009/isos/x86_64/CentOS-7-x86_64-Everything-2207-02.iso](https://iso.mirrors.ustc.edu.cn/centos/7.9.2009/isos/x86_64/CentOS-7-x86_64-Everything-2207-02.iso)

## Paralle Desktop 新建虚拟机

注意一下：Paralle 安装 CentOS7 有两个坑

1、要选择自动安装，勾选安装前设定

2、安装前设定，要设置虚拟机监控程序为 Paralle，默认是 Apple

第二点非常重要，要不然启动会失败。

正常情况下，是下面的页面，一直跑日志：

![](https://img1.terwer.space/api/public/20220930001027.png)​

最后出现登录界面，大功告成。

![](https://img1.terwer.space/api/public/20220930001648.png)​

登录之后熟悉的界面。

![](https://img1.terwer.space/api/public/20220930001848.png)​

## Centos7图形化界面设置固定IP

System Tools->Settings->Network->Wired->IPv4

注意：

![](https://img1.terwer.space/api/public/20220930005342.png)​

这里有一个需要注意的地方，Parallel的网络要设置成WiFi

![](https://img1.terwer.space/api/public/20220930005449.png)​

‍