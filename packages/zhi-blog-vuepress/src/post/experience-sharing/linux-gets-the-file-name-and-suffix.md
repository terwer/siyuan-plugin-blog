---
title: Linux获取文件名以及后缀名
short_title: ''
description: Linux获取文件名以及后缀名。
date: 2022-05-11 23:50:25
category:
  - 实用技巧
  - 经验分享
tag:
  - linux
  - file
  - ext
article: true
timeline: false
---
:::tip 文章更新历史

2022/05/11 feat:初稿。

:::

在 Linux 中，利用 bash 获取文件名和后缀还是很常见的。

## 获取后缀名

```bash
ext = ${file: -4}
echo $ext
```

如果文件名是 `file.zip`，运行结果如下：

```bash
.zip
```

## 获取文件名

```bash
name = $(basename "$file" .zip)
echo $name
```

如果文件名是 `file.zip`，运行结果如下：

```bash
file
```