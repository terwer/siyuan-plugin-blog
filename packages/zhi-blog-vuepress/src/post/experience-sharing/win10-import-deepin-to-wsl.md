---
title: Win10导入Deepin到WSL
short_title: ''
description: 准备工作首先要确保开启了hyperv注意_virtulbox与这个冲突。方法_控制面板打开或者关闭windows功能打开虚拟化bootcamp可以尝试下面的命令bcdeditsethypervisorlaunchtypeautostart导入deepin下载导入包https_panbaiducomsmxupflkrvalfcrxmfsv_w?pwd=导入deepinexeinstallbackupextvhdxgz验证c_softwarewsldistrosdeepinwsllist适用于linux的wi
date: 2022-08-09 22:33:59
category:
  - 经验分享
tag:
  - 导入
  - win10
  - wsl
  - deepin
  - linux
article: true
timeline: false
---
## 准备工作

* 首先要确保开启了Hyper-V，**注意：VirtulBox与这个冲突**。

  方法：控制面板->程序与功能->打开或者关闭Windows功能

* 打开虚拟化，BootCamp可以尝试下面的命令

  ```bash
  bcdedit /set hypervisorlaunchtype auto start
  ```

## 导入Deepin

下载导入包

[https://pan.baidu.com/s/1mx5UPFLkrVaLfCRXmfSv_w?pwd=8888](https://pan.baidu.com/s/1mx5UPFLkrVaLfCRXmfSv_w?pwd=8888)

导入

```bash
Deepin.exe install backup.ext4.vhdx.gz
```

验证

```bash
C:\software\wsl-distros\deepin>wsl --list
适用于 Linux 的 Windows 子系统分发版:
Debian (默认)
Deepin
```

## 设置为默认

```bash
wsl -s Deepin
```

## 卸载

```bash
Deepin.exe clean
```

## 参考

[https://blog.csdn.net/sinat_14817045/article/details/124286821](https://github.com/MicrosoftDocs/WSL/issues/436)

[https://github.com/MicrosoftDocs/WSL/issues/436](https://github.com/MicrosoftDocs/WSL/issues/436)

‍