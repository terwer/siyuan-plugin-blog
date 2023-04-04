---
title: 将WSL的2204版本的ununtu滚动升级版本升级到到2204
short_title: ''
description: 使用vagrant搭建可移植的跨平台的开发环境。
date: 2022-05-16 12:22:35
category:
  - 过程改进
  - 开发效率
  - 开发流程
tag:
  - ubuntu
  - upgrade
article: true
timeline: false
---
# 将WSL的2004版本的ununtu滚动升级版本升级到到2204

## 可以直接使用

```bash
do-release-upgrade
```

## 如果没有发布，可使用

```bash
do-release-upgrade -d
```

参考：

[https://askubuntu.com/questions/1403610/22-04-is-suggested-on-ubuntus-website-but-not-in-the-repository](https://askubuntu.com/questions/1403610/22-04-is-suggested-on-ubuntus-website-but-not-in-the-repository)