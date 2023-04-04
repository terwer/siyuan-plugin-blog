---
title: Mac使用iTerm2代替默认终端
short_title: ''
description: 默认的mac终端是不支持多个远程链接的也不支持多个tab通过配置使用iterm替换默认终端可以很方便的解决这些需求。下载地址https_itermcomdownloadsstableiterm__zip安装解压后直接拖进应用程序即可。配置管理多个远程链接并支持自动登录自动登录安装sshpass下载_http_sourceforgenetprojectssshpassfiles如果嫌慢可以使用我的阿里云osshttps_staticrsterwerosscnbeijingaliyuncscomlibsshp
date: 2022-10-21 18:36:48
category:
  - 经验分享
tag:
  - mac
  - terminal
  - 实用技巧
  - 多个
  - 配置
  - 打开
  - 默认
  - 终端
article: true
timeline: false
---
默认的 Mac 终端是不支持多个远程链接的，也不支持多个 tab，通过配置使用 iTerm2 替换默认终端可以很方便的解决这些需求。

## 下载地址

[https://iterm2.com/downloads/stable/iTerm2-3_4_15.zip](https://iterm2.com/downloads/stable/iTerm2-3_4_15.zip)

## 安装

解压后，直接拖进应用程序即可。

## 配置管理多个远程链接并支持自动登录

### 自动登录

#### 安装 sshpass

下载：[http://sourceforge.net/projects/sshpass/files/](http://sourceforge.net/projects/sshpass/files/)

如果嫌慢，可以使用我的阿里云 OSS

[https://static-rs-terwer.oss-cn-beijing.aliyuncs.com/lib/sshpass/sshpass-1.09.tar.gz](https://static-rs-terwer.oss-cn-beijing.aliyuncs.com/lib/sshpass/sshpass-1.09.tar.gz)

解压后，进入 sshpass 目录，执行安装

```bash
./configure make make install
```

理论上不会出什么问题，安装好后，执行命令检查是否已经 OK

```bash
sshpass -h
```

#### 创建 profile

通过 Profiles->Open Profiles 打开配置

![](https://img1.terwer.space/api/public/20221021185405.png)​

点击 Edit Profiles ，可以在新窗口里面新增Profile​

添加一个新的 profile，其它没什么好配置的，主要是在 `General`​ 的 `command`​ 中选择使用 `command`​，命令就是 `sshpass`​ 的执行命令，如：

```bash
/usr/local/bin/sshpass -p '123456' ssh root@127.0.0.1
```

![](https://img1.terwer.space/api/public/20221021185710.png)​

### 多个远程

多个远程只需要配置多个 Profile 就可以了。

## 配置 Mac 默认终端为 Iterm2

注意到有很多小伙伴还不会把终端默认设置为 Iterm2，我这里说一下。

我们可以新建一个测试文件 `test.sh`​ ,

```bash
cd ~/Downloads/test.sh
touch test.sh
```

![](https://img1.terwer.space/api/public/20221021184618.png)​

然后右键-> 打开方式-> 其他。

![](https://img1.terwer.space/api/public/20221021184722.png)​

在应用程序里面找到 Item，选中，然后勾选 始终以此方式打开。

![](https://img1.terwer.space/api/public/20221021184859.png)​

这样以后打开 `.sh`​ 文件默认就是 `Item2`​ 了。如果希望打开 `.command`​ 文件，方法同理。新建一个 `.command`​ 文件，然后选择始终打开即可。

如果还有问题，可发邮件至 youweics@163.com ，或者直接给我留言。

> 文章更新历史  
> 2022-07-09 feat:初稿。
>
> 2022-10-21 feat:新增设置默认终端的方法，补充部分操作截图。