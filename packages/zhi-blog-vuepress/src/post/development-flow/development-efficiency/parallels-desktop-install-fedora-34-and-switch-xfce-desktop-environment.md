---
title: Parallels Desktop安装Fedora34并切换Xfce Desktop桌面环境
short_title: ''
description: 在 Parallels Desktop 上默认下载安装了最新的 Fedora34 ，但是里面默认是 Fedora Workstation
  环境。如果想要切换成xfce4，可以按照以下操作。
date: 2022-05-25 23:28:14
category:
  - 过程改进
  - 开发效率
  - 开发流程
tag:
  - parallels
  - desktop
  - xfce
  - xfce4
  - fedora
article: true
timeline: false
---
:::tip 文章更新历史

2022/05/25 feat:初稿。

:::

# Parallels Desktop安装Fedora34并切换Xfce Desktop桌面环境

在 Parallels Desktop 上默认下载安装了最新的 Fedora34 ，但是里面默认是 Fedora Workstation 环境。如果想要切换成xfce4，可以按照以下操作。

## 启用国内源

```bash
sudo sed -e 's|^metalink=|#metalink=|g' \
         -e 's|^#baseurl=http://download.example/pub/fedora/linux|baseurl=https://mirrors.ustc.edu.cn/fedora|g' \
         -i.bak \
         /etc/yum.repos.d/fedora.repo \
         /etc/yum.repos.d/fedora-modular.repo \
         /etc/yum.repos.d/fedora-updates.repo \
         /etc/yum.repos.d/fedora-updates-modular.repo
```

## 更新系统

```bash
sudo dnf update
```

## 安装Xfce Desktop桌面

```bash
sudo dnf groupinstall "Xfce Desktop" -y
```

## 安装桌面切换工具

```bash
sudo dnf install switchdesk switchdesk-gui -y
```

接下来，图形界面切换即可：

![image-20220526000842407](https://img1.terwer.space/image-20220526000842407.png)

## 安装zsh

```bash
sudo dnf install zsh -y
```

## 创建普通用户并设置密码

```bash
# 修改root密码
sudo passwd root
# 切换root
su -
# 创建用户
useradd --create-home --no-log-init --shell /bin/zsh -G root terwer
# 修改密码
echo 'terwer:123456' | chpasswd
# root密码
echo 'root:password' | chpasswd
```

## 添加用户到sudo

```bash
su -
echo "terwer ALL=(ALL) NOPASSWD:ALL" | sudo tee -a /etc/sudoers
```

## /opt设置为当前用户

```bash
chown -R terwer:terwer /opt
```

## 参考

https://docs.fedoraproject.org/en-US/quick-docs/switching-desktop-environments/[](https://docs.fedoraproject.org/en-US/quick-docs/switching-desktop-environments/)