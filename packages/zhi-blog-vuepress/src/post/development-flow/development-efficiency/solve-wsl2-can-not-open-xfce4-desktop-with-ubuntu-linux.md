---
title: 终于解决了困扰多天的普通用户不能启动WSL2的ubuntu的xfce4桌面问题
short_title: ''
description: 终于解决了困扰多天的普通用户不能启动WSL2的ubuntu的xfce4桌面问题。
date: 2022-05-18 00:14:33
category:
  - 过程改进
  - 开发效率
  - 开发流程
tag:
  - wsl
  - ubuntu
  - xfce4
article: true
timeline: false
---
# 终于解决了困扰多天的普通用户不能启动WSL2的ubuntu的xfce4桌面问题

## ！！！划重点！！！

```bash
sudo -u ubuntu startxfce4
```

也可以用

```bash
sudo -u ubuntu xfce4-session
```

PS：其他应用启动同理。**归根到底还是普通用户权限不够的问题。**