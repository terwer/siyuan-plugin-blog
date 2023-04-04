---
title: openEuler2203移除旧的lernel
short_title: ''
description: openEuler2203移除旧的kernel。
date: 2022-05-27 11:11:01
category:
  - 过程改进
  - 开发效率
  - 开发流程
tag:
  - euler
  - open-euler
article: true
timeline: false
---
方法如下：

```bash
dnf remove --oldinstallonly --setopt installonly_limit=2 kernel
```