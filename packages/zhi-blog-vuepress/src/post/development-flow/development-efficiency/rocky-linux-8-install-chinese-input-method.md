---
title: Rocky Linux 8.6安装中文输入法
short_title: ''
description: 不知道为什么rocky8连中文输入法都没有，目前来看，就两条路，自己编译，继续使用ibus。
date: 2022-05-26 02:40:11
category:
  - 过程改进
  - 开发效率
  - 开发流程
tag:
  - rocky
  - linux
  - input
  - ibus
article: true
timeline: false
---
# Rocky Linux 8.6安装中文输入法

不知道为什么rocky8连中文输入法都没有

[https://github.com/fcitx/fcitx5/discussions/318](https://github.com/fcitx/fcitx5/discussions/318)

目前来看，就两条路，自己编译，继续使用ibus

## 使用ibus

算了，先用ibus吧

:::tip

如果是安装的 [Live CD版](https://mirrors.ustc.edu.cn/rocky/8.6/Live/x86_64/Rocky-XFCE-8-x86_64-20220515.4.iso)，不需要安装，系统已经有了。

:::

```bash
sudo dnf install ibus ibus-libpinyin -y
```

启动ibus

```bash
ibus-setup
```

:::tip

如果没有启动 ibus-demoan ，需要把 ibus-demon 启动。最好加入系统启动，方法是：

设置=>会话和启动=>加入路径 /usr/bin/ibus-demon

:::

![img](https://img1.terwer.space/image-20220526121540882.png)

环境变量

```bash
export GTK_IM_MODULE=ibus
export QT_IM_MODULE=ibus
export XMODIFIERS=@im=ibus
```

## 自己编译（尚未成功）

:::warning

尚在研究中，此方法暂时不能用。

:::

### 检查依赖

```bash
C Compiler
C++ Compiler
CMake
ECM (Extra CMake Modules)
GNU Make
XCB (X protocol C-language Binding)
Expat
PkgConfig
json-c
dbus
fmt
cldr-emoji-annotation*
```

合并安装这些依赖

```bash
# 系统已经有了的
# gcc \
# g++ \
# make \
# pkg-config \

# 还需要安装的
sudo dnf install \
cmake \
extra-cmake-modules \
libxcb libxcb-devel libX11-xcb xcb-util-keysyms xcb-util-keysyms-devel xcb-proto \
xcb-util-cursor xcb-util-cursor-devel \
xcb-util-wm xcb-util-wm-devel \
python3-xcffib xbar xbg xwm \
uthash-devel \
xcb-util-devel \
expat \
json-c \
dbus \
cldr-emoji-annotation \
systemd systemd-devel \
libuuid libuuid-devel \
fmt fmt-devel \
cairo-devel \
libxkbfile libxkbfile-devel \
libxkbcommon-devel libxkbcommon-x11-devel \
iso-codes-devel \
xkeyboard-config-devel \
json-c-devel \
pango-devel \
gdk-pixbuf2-devel \
enchant2-devel \
fcitx-qt5-devel \
-y
```

PS：暂时没有成功。