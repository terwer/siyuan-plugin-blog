---
title: CentOS7基本配置
short_title: ''
description: 设置中科大源注意_需要先切换root用户su#===================================#镜像源设置开始#===================================#添加中科大centos镜像源cpetcyumreposdcentosbaserepoetcyumreposdcentosbaserepobaksedes_^mirrorlist=_#mirrorlist=_ges_^#baseurl=http_mirrorcentosorgcentos_baseurl=
date: 2022-09-30 01:04:27
category:
  - 后端开发
  - Linux
tag:
  - 中科大
  - 软件源
  - mirror
  - install
  - zsh
article: true
timeline: false
---
## 设置中科大源

注意：需要先切换root用户

```bash
su -
```

```bash
# ===================================
# 镜像源设置开始
# ===================================
# 添加中科大centos7镜像源
cp /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.bak \
    && sed -e 's|^mirrorlist=|#mirrorlist=|g' \
         -e 's|^#baseurl=http://mirror.centos.org/centos|baseurl=https://mirrors.ustc.edu.cn/centos|g' \
         -i.bak \
         /etc/yum.repos.d/CentOS-Base.repo

yum makecache \
    && yum clean all
```

## 安装开发工具包、系统软件

```bash
# 安装epel源
yum install epel-release -y

# 安装DNF
yum install dnf -y
# 安装dnf插件及neofetch
dnf install dnf-plugins-core -y
dnf copr enable konimex/neofetch -y
dnf install neofetch -y
```

## 安装开发工具

```bash
# 安装开发工具
dnf groupinstall "Development Tools" -y

# dnf groupinstall "X Window System" -y \
#     && dnf groupinstall xfce -y \
#     && dnf install pixman pixman-devel libXfont -y

# 升级git2
dnf install \
    https://repo.ius.io/ius-release-el7.rpm \
    https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm \
    -y
dnf remove git -y
dnf install git236 -y
```

## 安装Vim等工具

```bash
# 安装其他工具包
dnf install sudo \
    vim \
    net-tools \
    wget \
    -y
```

## 安装zsh

```bash
 dnf install zsh -y
```

## 安装on-my-zsh

```bash
# 给root用户安装oh-my-zsh
git clone https://gitee.com/mirrors/oh-my-zsh.git ~/.oh-my-zsh \
    && cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc \
    && git clone https://gitee.com/playerfs/zsh-autosuggestions.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions \
    && git clone https://gitee.com/playerfs/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting \
    && sed -i 's/^plugins=(/plugins=(zsh-autosuggestions zsh-syntax-highlighting /' ~/.zshrc \
    && chsh -s /bin/zsh

# 为普通用户再安装一次oh-my-zsh
git clone https://gitee.com/mirrors/oh-my-zsh.git ~/.oh-my-zsh \
    && cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc \
    && git clone https://gitee.com/playerfs/zsh-autosuggestions.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions \
    && git clone https://gitee.com/playerfs/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting \
    && sed -i 's/^plugins=(/plugins=(zsh-autosuggestions zsh-syntax-highlighting /' ~/.zshrc
# 添加自定义环境变量
echo "source ~/my_profile.sh" >> ~/.zshrc
chsh -s /bin/zsh

vim ~/my_profile.sh

```

‍

## 参考

[https://github.com/terwer/portable-centos-7-workstation/blob/main/centos-7-vnc/Dockerfile](https://github.com/terwer/portable-centos-7-workstation/blob/main/centos-7-vnc/Dockerfile)

‍