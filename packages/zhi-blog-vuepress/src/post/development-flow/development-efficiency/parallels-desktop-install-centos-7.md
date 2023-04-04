---
title: Parallels Desktop从零开始安装CentOS7
short_title: ''
description: Parallels Desktop从零开始安装CentOS7。
date: 2022-05-26 02:40:11
category:
  - 过程改进
  - 开发效率
  - 开发流程
tag:
  - parallels
  - desktop
  - centos
  - centos7
article: true
timeline: false
---
# Parallels Desktop从零开始安装CentOS7

## 安装光盘

[https://mirrors.ustc.edu.cn/centos/7.9.2009/isos/x86_64/](https://mirrors.ustc.edu.cn/centos/7.9.2009/isos/x86_64/)

## 在Parallels上安装

前面的配置没什么好说的，不过有两个坑

1、**不能选择自动设置**，否则会直接卡在安装界面。

2、**必须关闭3D加速**，否则无法打开安装界面。

选择最小化安装即可。

可以勾上开发工具、诊断工具。其他的暂时不要，等下命令安装。

## 必要的设置

### 安装epel-release

```bash
sudo yum install epel-release -y
```

### 更新

```bash
sudo yum makecache
sudo yum update
```

### 安装dnf

```bash
sudo yum install dnf -y
```

## 安装Xfce4桌面

默认打开的是终端，我们直接命令安装桌面

```bash
sudo dnf groupinstall "X Window System" -y
```

```bash
sudo dnf groupinstall "Xfce" -y
```

## 安装中文

文泉驿字体

检查，安装

```bash
dnf list | grep wqy

sudo dnf install wqy*
```

cjkuni字体

检查，安装

```bash
dnf list | grep cjkuni 

sudo dnf install cjkuni*
```

### 安装lightdm

```bash
sudo dnf install lightdm -y

sudo systemctl enable lightdm.service
sudo systemctl set-default graphical.target

# 检验桌面
# sudo systemctl isolate graphical.target

reboot
```

### 设置图形界面为默认

- 命令查看当前登录模式（可以省去） 

  ```bash
  systemctl get-default
  ```

- 修改启动模式(修改为图形界面）

  ```bash
  systemctl set-default graphical.target
  ```

## 国内源

[https://mirrors.ustc.edu.cn/help/centos.html](https://mirrors.ustc.edu.cn/help/centos.html)

## 更新git

```bash
# 如果没有安装开发工具
# sudo yum groupinstall "Development Tools" -y

# 升级git2
sudo dnf install https://packages.endpointdev.com/rhel/7/os/x86_64/endpoint-repo.x86_64.rpm -y

# 执行下面操作后会自动升级到git2，没必要不要随便卸载，避免卸载掉有用的依赖
sudo yum makecache
sudo yum update
```