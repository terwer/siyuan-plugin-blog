---
title: 在WSL2的Linux中安装和运行IntelliJ IDEA
short_title: ''
description: 确保Windows的版本在Windows 10 Version 1607之后。我本地的版本是 Windows 11 22000。使用 Win+R
  然后输入 Cmd 即可查看。
date: 2022-05-14 21:15:59
category:
  - 实用技巧
  - 开发效率
  - 开发流程
tag:
  - wsl
  - windows
  - win10
  - win11
  - gui
  - wwsl2
article: true
timeline: false
---
:::tip 文章更新历史

2022/05/15 ~~Windows11 22000可以直接运行，无需配置，只需要解决中文乱码问题，此文章失效。~~

2022/05/11 feat:初稿。

:::

[https://docs.microsoft.com/en-us/windows/wsl/tutorials/gui-apps](https://docs.microsoft.com/en-us/windows/wsl/tutorials/gui-apps)

Windows11 22000可以直接运行，无需任何配置。唯一需要注意的是乱码问题。

## 解决中文乱码问题

运行下述代码，成功解决。现在可以正常显示中文了。

```bash
sudo apt install fonts-noto-cjk
```

## 解决默认目录问题

设置里面把ubuntu.exe改成wsl.exe。

然后修改jenv

```bash
vim /home/ubuntu/.jenv/libexec/jenv-version-file-write
```

添加下面脚本

```bash
echo $PWD

# Write the version out to disk.
if [[ $PWD/ = /mnt/c/Users/* ]]; then
  echo "you are in windows user forder, you can dou your work"
  echo "$JENV_VERSION" > "$JENV_VERSION_FILE"
  exit 1
fi
if [[ $PWD/ = /mnt/c/* ]]; then
  printf "you are in windows c drive, for security nothing to do, you can type '~' back to wsl home \nor"
  printf '\n==========================================================\necho $UBUNTU_ROOT_PWD | sudo -S sleep 1 && sudo su - root'
  printf "\ncd /root/Desktop\n==========================================================\nto root app forder\nor"
  printf '\necho $UBUNTU_ROOT_PWD | sudo -S sleep 1 && sudo xfce4-session\n'
  echo "to start a GUI desktop"
  exit 1
fi
echo "you are in wsl env"
echo "$JENV_VERSION" > "$JENV_VERSION_FILE"
```

~/.bash_profile修改

```bash
export ubuntu_ROOT_PWD=123456
```

:::warning

~~Windows11 22000以上版本，此文章失效。如果是低版本可以继续往下看。~~

:::

## 检查 Windows 版本

确保 Windows 的版本在 Windows 10 Version 1607 之后。我本地的版本是 `Windows 11 22000` 。使用 Win+R 然后输入 Cmd 即可查看：

![image-20220514212340110](https://cdn.jsdelivr.net/gh/terwer/upload@main/img/image-20220514212340110.png)

## 安装 WSL2 并安装 Linux 发行版

[https://docs.microsoft.com/en-us/windows/wsl/install-win10](https://docs.microsoft.com/en-us/windows/wsl/install-win10)

我这里安装的是 `Oracle Linux 8.5`

```bash
➜  Terwer wslfetch
      `-/+++++++++++++++++/-.`       Windows Subsystem for Linux (WSL2)
    `/syyyyyyyyyyyyyyyyyyyyyyys/.    terwer@TERWERWIN11
   :yyyyo/-...............-/oyyyy/   Build: 22000
  /yyys-                     .oyyy+  Branch: co_release
 .yyyy`                       `syyy- Release: Oracle Linux Server 8.5
 :yyyo                         /yyy/ Kernel: Linux 5.10.16.3-microsoft-standard-WSL2
 .yyyy`                       `syyy- Uptime: 0d 7h 28m
  /yyys.                     .oyyyo
   /yyyyo:-...............-:oyyyy/`
    `/syyyyyyyyyyyyyyyyyyyyyyys+.
      `.:/+ooooooooooooooo+/:.`
```

![image-20220514213016975](https://cdn.jsdelivr.net/gh/terwer/upload@main/img/image-20220514213016975.png)

## 在 Windows 安装 X Server

[https://sourceforge.net/projects/vcxsrv/](https://sourceforge.net/projects/vcxsrv/)

直接下载安装即可。

## 创建一个 XServer的快捷启动方式如下

```bash
"C:\Program Files\VcXsrv\vcxsrv.exe" :0 -ac -terminate -lesspointer -multiwindow -clipboard -wgl -dpi auto
```

启动VcXsrv
开始菜单里现在出现了一个文件夹VcXsrv，选择里面的XLaunch，一路选择下一步即可。然后这个软件就后台运行了。之后如果有需要使用Linux的图形界面的，都需要提前打开XLaunch。
提一下打开Xlaunch后第一页的四个选项设置，我个人是喜欢选择全屏的，最接近原生系统的体验。假如你不需要打开完整的桌面环境而只需要图形化某些软件，那么就用默认的Multiple windows也不错。

## 配置DISPLAY

为了方便，打开Ubuntu bash，运行如下代码：

```bash
echo "export DISPLAY=:0.0" >> ~/.bashrc
```

这样，每次打开图形界面程序就不需要额外指定`DISPLAY`了。