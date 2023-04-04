---
title: Deepin_linux_An_error_occurred_while_applying_changes_xdg_desktop-menu_No_writable_system_menu_directory_found解决方案
short_title: ''
description: 错误日志selectingpreviouslyunselectedpackageoneblogj(readingdatabasefilesanddirectoriescurrentlyinstalled)preparingtounpackbundlesoneblogjdebunpackingoneblogj()settinguponeblogj()addingshortcuttothemenuanerroroccurredwhileapplyingchanges_anerroroccurredwhilea
date: 2022-07-11 19:50:11
category:
  - 经验分享
tag:
  - 错误
  - 日志
  - 解决方案
  - 安装
  - 无法
  - deepin
  - writable
article: true
timeline: false
---
## 错误日志

```bash
Selecting previously unselected package oneblog4j.
(Reading database ... 264884 files and directories currently installed.)
Preparing to unpack .../bundles/oneblog4j-1.0.3.deb ...
Unpacking oneblog4j (1.0.3) ...
Setting up oneblog4j (1.0.3)/ ...
Adding shortcut to the menu
An error occurred while applying changes:
An error occurred while applying changes: xdg-desktop-menu: No writable system menu directory found.
dpkg: error processing package oneblog4j (--install):
 installed oneblog4j package post-installation script subprocess returned error exit status 3
Errors were encountered while processing:
 oneblog4j
```

## 解决方案

```bash
sudo mkdir /usr/share/desktop-directories/
```

PS：安装 deb 无法创建目录问题，直接赋予权限，再打开。

```bash
sudo chown -R terwer:terwer /opt/oneblog4j
```

‍