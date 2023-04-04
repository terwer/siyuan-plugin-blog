---
title: 在WSL2上安装xfce桌面以及中文开发环境的配置
short_title: ''
description: 在WSL2上安装xfce桌面以及中文开发环境的配置。
date: 2022-05-15 14:18:13
category:
  - 实用技巧
  - 开发效率
  - 开发流程
tag:
  - wsl
  - zsh
  - xfce
  - zh
  - wsl2
article: true
timeline: false
---
## 安装桌面

这里选择xfce4桌面，它的优点是轻量、美观、占用系统资源少。

```bash
sudo apt install xfce4 dbus-x11 -y
```

完成后，执行下面这段代码就可以看到桌面的图形界面了。

```bash
sudo xfce4-session
```

## 修改默认语言环境为中文（可选）

安装中文语言包

对于Centos8，可以使用

```bash
sudo yum -y groupinstall Fonts
```

对于Debian用下面的，ubuntu可以不装

```
sudo apt install fonts-noto-cjk -y
```

对于ubuntu还可以继续安装

```bash
sudo apt install language-pack-zh-hans language-pack-zh-hans-base -y
```

设置本地化环境变量

```bash
sudo /etc/default/locale
# LANG=zh_CN.UTF-8
# LANG=en_US.UTF-8
```

## 中文输入法

```bash
sudo apt install fcitx fcitx-pinyin
echo -e "export XMODIFIERS=@im=fcitx\nexport GTK_IM_MODULE=fcitx\nexport QT_IM_MODULE=fcitx\n" >> .profile
```

软件包已装，在应用程序 - 设置 - 会话与启动 - 应用程序自启动，添加 `/usr/bin/fcitx`。

PS：安装其他输入法

```bash
sudo apt install fcitx dbus-x11 im-config fcitx-sunpinyin
```

更完整的配置

- 编辑`/etc/locale.gen`文件

```
# 找到 # zh_CN.UTF-8 这一行，取消注释
zh_CN.UTF-8
```

- 编辑`~/.profile`文件

```bash
export GTK_IM_MODULE=fcitx
export QT_IM_MODULE=fcitx
export XMODIFIERS=@im=fcitx
export DefaultIMModule=fcitx
fcitx-autostart &>/dev/null
```

安装Google拼音

```bash
sudo apt-get install fcitx-googlepinyin
```

需要注意的时，fcitx 默认输入法切换快捷键是ctrl+space，会覆盖 IDEA 的提示快捷键，可以通过`fcitx-config-gtk3`修改，但是不能和 Windows 宿主机上的全局热键冲突，不然会无效。

设置输入法

```bash
sudo xfce4-session
```

打开设置

![image-20220517020011362](https://cdn.jsdelivr.net/gh/terwer/upload@main/img/image-20220517020011362.png)

设置好如下

![image-20220517020348005](https://cdn.jsdelivr.net/gh/terwer/upload@main/img/image-20220517020348005.png)

另外快捷键可设置为Shift方便操作

![image-20220517020301467](https://cdn.jsdelivr.net/gh/terwer/upload@main/img/image-20220517020301467.png)

- `IDEA` 输入法支持

上面配好之后，IDEA 切不出输入法，需要特殊配置一下才行，编辑 IDEA 启动脚本`idea.sh`，在上面加入以下配置：

```bash
export XMODIFIERS=@im=fcitx
export QT_IM_MODULE=fcitx
```

然后重启`IDEA`就可以切出输入法了。