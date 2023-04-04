---
title: 在ubuntu中，升级emacs到最新版本（非源码安装）
short_title: ''
description: 在ubuntu中，升级emacs到最新版本（非源码安装）
date: 2022-05-18 17:54:17
category:
  - 过程改进
  - 开发效率
  - 开发流程
tag:
  - ubuntu
  - emacs
article: true
timeline: false
---
# 在ubuntu中，升级emacs到最新版本（非源码安装）

当使用低版本的ubuntu时，安装的emacs也是低版本的，如果想使用高版本的emacs，怎么办呢？
当然可以下载emacs的源码，编译安装，有没有更省事的办法吗？

可以使用下面的方法：

```shell
$sudo add-apt-repository ppa:ubuntu-elisp/ppa
$sudo apt update
$sudo apt install emacs-snapshot emacs-snapshot-el

$emacs-snapshot --version    #查看emacs版本
```

成功安装后，原来版本的emacs还是可以通过`emacs`使用;使用新安装的emacs：`emacs-snapshot`。