---
title: docker的centos7中IDEA中文
short_title: ''
description: docker的centos7中IDEA中文。
date: 2022-05-24 14:49:54
category:
  - 过程改进
  - 开发效率
  - 开发流程
tag:
  - docker
  - idea
  - centos
  - centos7
article: true
timeline: false
---
废话不多说，直接上干货。

```bash
# fcitx
RUN dnf remove ibus -y
RUN dnf remove imsettings imsettings-libs im-chooser -y

RUN dnf install fcitx fcitx-pinyin fcitx-configtool -y
```

idea.sh

```bash
export LC_CTYPE=zh_CN.UTF-8
export XIM=fcitx
export XIM_PROGRAM=fcitx
export GTK_IM_MODULE=fcitx
export QT_IM_MODULE=fcitx
export XMODIFIERS="@im=fcitx"
```