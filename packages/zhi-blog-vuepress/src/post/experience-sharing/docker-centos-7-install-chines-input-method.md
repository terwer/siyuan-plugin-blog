---
title: docker中的centos7安装中文输入法
short_title: ''
description: docker中的centos7安装中文输入法。
date: 2022-05-24 14:49:54
category:
  - 实用技巧
  - 经验分享
tag:
  - docker
  - centos7
  - cn
article: true
timeline: false
---
# docker中的centos7安装中文输入法

## 安装中文输入法

```bash
# fcitx输入法
RUN dnf remove ibus -y
RUN dnf remove imsettings imsettings-libs im-chooser -y
RUN dnf install fcitx fcitx-pinyin fcitx-configtool -y

# 更新软件
RUN yum -y upgrade
# 安装中文包
RUN yum install -y kde-l10n-Chinese
# 重新安装glibc-common
RUN yum -y reinstall glibc-common
# 编译生成语言库
RUN localedef -c -f UTF-8 -i zh_CN zh_CN.utf8
# 设置语言默认值为中文，时区改为东八区
RUN echo 'LANG="zh_CN.UTF-8"' > /etc/locale.conf
RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
ENV LANG zh_CN.UTF-8
ENV LC_ALL zh_CN.UTF-8
```

## 配置中文字体

参考

[https://blog.csdn.net/oZuoZuoZuoShi/article/details/118977701](https://blog.csdn.net/oZuoZuoZuoShi/article/details/118977701)