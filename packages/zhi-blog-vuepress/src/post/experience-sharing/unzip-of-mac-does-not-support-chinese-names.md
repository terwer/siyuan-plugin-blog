---
title: 一个令人沮丧的问题：Mac的unzip竟然不支持中文名
short_title: ''
description: 一个令人沮丧的问题：Mac的unzip竟然不支持中文名。
date: 2022-05-11 23:50:34
category:
  - 实用技巧
  - 经验分享
tag:
  - mac
  - unzip
  - unar
article: true
timeline: false
---
:::tip 文章更新历史

2022/05/11 feat:初稿。

:::

话说，这都 2022 年了，Mac 的 unzip 还是不支持中文名。

找到了几个方案，试了下，最终还是果断用别的代替。

之前的方案有两个

## 自己编译 unzip610b

这个找到了源码，但是鼓捣半天没成功，后面在折腾吧。。。

[https://sourceforge.net/projects/infozip/files/latest/download](https://sourceforge.net/projects/infozip/files/latest/download)

据说如果成功了，下面的可以解决

`unzip -O cp936` 文件名
如果包是 arch 之类的还得有 `unzip-iconv` 包

## 换成 unar

果断安装了 unar 试试

```bash
brew install unar
```

然后用下面的命令解压带中文的文件

```bash
# unar -e macintosh -f 中文文件.zip
unar 中文文件.zip
```