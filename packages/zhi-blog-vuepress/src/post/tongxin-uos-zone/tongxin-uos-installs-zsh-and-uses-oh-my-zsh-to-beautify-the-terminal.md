---
title: 统信 UOS 安装 zsh 并使用 oh-my-zsh 美化终端
short_title: ''
description: 注意：此操作之前请先安装 git。参考我的文章：统信 UOS 基本开发环境搭建之 git。
date: 2022-06-07 23:53:43
category:
  - 统信UOS专区
  - UOS专区
tag:
  - uos
  - uos-home
  - deepin
  - zsh
  - on-my-zsh
article: true
timeline: false
---
:::warning

注意：此操作之前请先安装 git。参考我的文章：[统信 UOS 基本开发环境搭建之 git](/post/the-git-built-by-tongxin-uos-basic-development-environment.html)

:::

# 统信 UOS 安装 zsh 并使用 oh-my-zsh 美化终端

## 安装 zsh

```bash
sudo apt install zsh
```

## 给 root 用户安装 oh-my-zsh

由于我们一般是次之前先设置 root 密码

```bash
sudo passwd root
```

接着切换到 root 用户

```bash
su -
```

我们可以检测是否切换成功

```bash
root@terwer:/home/terwer/app# whoami
root
```

然后给 root 安装 oh-my-zsh

```bash
git clone https://gitee.com/mirrors/oh-my-zsh.git ~/.oh-my-zsh \
    && cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc \
    && git clone https://gitee.com/playerfs/zsh-autosuggestions.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions \
    && git clone https://gitee.com/playerfs/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting \
    && sed -i 's/^plugins=(/plugins=(zsh-autosuggestions zsh-syntax-highlighting /' ~/.zshrc \
    && chsh -s /bin/zsh
```

## 普通用户安装 oh-my-zsh

安装之前，切换到普通用户

```
su - terwer
```

然后，给普通用户安装 on-my-zsh

```bash
git clone https://gitee.com/mirrors/oh-my-zsh.git ~/.oh-my-zsh \
    && cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc \
    && git clone https://gitee.com/playerfs/zsh-autosuggestions.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions \
    && git clone https://gitee.com/playerfs/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting \
    && sed -i 's/^plugins=(/plugins=(zsh-autosuggestions zsh-syntax-highlighting /' ~/.zshrc \
    && chsh -s /bin/zsh
```

## 重启

修改完成记得重启，重启之后，再打开终端，应该就能用 zsh 了。

```bash
reboot
```

## 效果

![image-20220608152050585](https://img1.terwer.space/20220608152050.png)



![image-20220608152149520](https://img1.terwer.space/20220608152149.png)