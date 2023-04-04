---
title: 统信 UOS 基本开发环境搭建之 java
short_title: ''
description: 统信 UOS 基本开发环境搭建之 java。
date: 2022-06-08 01:27:20
category:
  - 统信UOS专区
  - UOS专区
tag:
  - uos
  - uos-home
  - deepin
  - java
  - jdk
  - env
article: true
timeline: false
---
## jdk

```bash
cp /media/psf/share/portable-linux-sync/app/jdk-* ~/app
```

![image-20220608015235015](https://img1.terwer.space/20220608015235.png)

```bash
tar -zxvf jdk-7u80-linux-x64.tar.gz
rm jdk-7u80-linux-x64.tar.gz
```

```bash
tar -zxvf jdk-8u311-linux-x64.tar.gz
rm jdk-8u311-linux-x64.tar.gz
```

```bash
tar -zxvf jdk-11.0.15.1_linux-x64_bin.tar.gz
rm jdk-11.0.15.1_linux-x64_bin.tar.gz
```

## 环境变量

```bash
# jdk env
# export JAVA_HOME=/home/terwer/app/jdk1.7.0_80
export JAVA_HOME=/home/terwer/app/jdk1.8.0_311
# export JAVA_HOME=/home/terwer/app/jdk-11.0.15.1
export PATH=$JAVA_HOME/bin:$PATH
```

## 注意

如果使用的是 `zsh` ，需要把环境变量添加到 `.zshrc` 里面。

```bash
source ~/my_profile.sh
```

效果

```bash
➜  ~ vim ~/.zshrc
➜  ~ source ~/.zshrc      
my profile inited
➜  ~ java -version  
java version "1.8.0_311"
Java(TM) SE Runtime Environment (build 1.8.0_311-b11)
Java HotSpot(TM) 64-Bit Server VM (build 25.311-b11, mixed mode)
```