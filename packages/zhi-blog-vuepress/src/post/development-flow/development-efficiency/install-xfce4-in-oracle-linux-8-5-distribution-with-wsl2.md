---
title: 在WSL2的Oracle Linux8_5发行版中安装xfce4
short_title: ''
description: 在WSL2的Oracle Linux8.5发行版中安装xfce4。
date: 2022-05-18 17:12:09
category:
  - 过程改进
  - 开发效率
  - 开发流程
tag:
  - wsl2
  - oracle
  - linux
article: true
timeline: false
---
# 在WSL2的Oracle Linux8.5发行版中安装xfce4

:::warning

此问题尚在研究中，暂时没有完美解决办法，仅供参考。

:::

## 安装语言、字体、图形界面

```bash
sudo yum install glibc-common -y
sudo yum install wqy-*-fonts -y
sudo yum groupinstall "Xfce" -y
```

## 安装输入法和浏览器

```bash
yum install ibus ibus-gtk2 ibus-gtk3 ibus-libpinyin im-chooser gtk2-immodule-xim gtk3-immodule-xim firefox -y
```

## 配置RDP远程支持

```bash
yum install tigervnc-server xrdp -y
```

## 修改字符集支持中文、配置远程的时候调用xfce

~~echo 'LANG=zh_CN.utf8' > /etc/locale.conf~~

~~source /etc/locale.conf~~

~~echo '#!/bin/bash' > ~/.Xclients~~

~~echo 'XFCE="$(which xfce4-session 2>/dev/null)"'  >> ~/.Xclients~~

~~echo 'exec "$XFCE"' >> ~/.Xclients~~

## 启用如上配置并重启验证

~~chmod +x /root/.Xclients && chkconfig xrdp on && service xrdp restart~~

~~systemctl set-default graphical.target~~

~~reboot~~

## 启动

```bash
sudo startxfce4
```

或者

```bash
sudo -u ulinux startxfce4
```