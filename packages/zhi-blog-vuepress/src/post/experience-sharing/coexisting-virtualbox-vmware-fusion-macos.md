---
title: 在 macOS 上共存 VirtualBox 和 VMWare Fusion
short_title: ''
description: VirtualBox 和 VMWare Fusion 都是简洁的虚拟化工具。我在大多数日常工作中都使用 Fusion——它为我服务了很长时间，而且我在其中有大量有用的机器。但有时我也需要使用
  VirtualBox，通常用于与 Vagrant 一起工作。
date: 2022-05-09 12:05:29
category:
  - 实用技巧
  - 经验分享
tag:
  - macos
  - virtualbox
  - vmware
  - vmware-fusion
article: true
timeline: false
---
# 在 macOS 上共存 VirtualBox 和 VMWare Fusion

:::tip 文章更新历史

2022/05/09 ~~feat:VirtualBox6.1.34已经可以兼容了。此文章失效。~~

:::

VirtualBox 和 VMWare Fusion 都是简洁的虚拟化工具。我在大多数日常工作中都使用 Fusion，它为我服务了很长时间，而且我在其中有大量有用的机器。但有时我也需要使用 VirtualBox，通常用于与 Vagrant 一起工作。问题是他们两个相处得不太好……

> **PS：macOS Monterey安装VirtualBox出错解决方案：**
>
> 安装macFUSE
>
> [https://github.com/osxfuse/osxfuse](https://github.com/osxfuse/osxfuse)

当您安装 VirtualBox，然后尝试在 Fusion 中启动 VM 时，您会看到如下内容：

```
Could not open /dev/vmmon: No such file or directory.
```

不兼容是在每个使用的内核扩展之间。我认为 Fusion 在这方面表现得更好——它在启动和停止时加载和卸载其内核扩展。这意味着当它不运行时，VirtualBox 可以运行。但是 VirtualBox 不这样做。它在安装时加载内核扩展（可能在之后的启动时）。你可以看到这些 `kextstat`：

```bash
jb@unu:~ $ kextstat | grep virtualbox
  226    3 0xffffff7f83d52000 0x61000    0x61000    org.virtualbox.kext.VBoxDrv (5.1.22) 93316754-E074-3CE2-9464-DDA4356FF02E <7 5 4 3 1>
  228    0 0xffffff7f83bd8000 0x8000     0x8000     org.virtualbox.kext.VBoxUSB (5.1.22) D956DCFA-4E4F-320A-BEBC-E4823501B1FF <227 226 41 7 5 4 3 1>
  230    0 0xffffff7f83c22000 0x6000     0x6000     org.virtualbox.kext.VBoxNetAdp (5.1.22) 4A6C39E1-5D90-3E34-9673-57B0DD779CD7 <226 5 4 1>
  231    0 0xffffff7f83c28000 0x5000     0x5000     org.virtualbox.kext.VBoxNetFlt (5.1.22) 446923A0-E855-3E75-9173-66FA4CE2474A <226 7 5 4 3 1>
```

我们可以使用几个脚本来解决这个问题，这样我们至少可以手动在两者之间切换。为了能够运行 Fusion，我们需要卸载 VirtualBox kexts：

```bash
#!/bin/sh
for id in VBoxNetAdp VBoxNetFlt VBoxUSB VBoxDrv; do
    kextunload -b "org.virtualbox.kext.$id"
done
```

将其另存为 `~/bin/unload-vbox` 或其他内容并将其运行为 `sudo unload-vbox`. 当我们不运行 Fusion 时，我们可以加载 VirtualBox kexts，VirtualBox 可以正常工作：

```bash
#!/bin/sh
for id in VBoxDrv VBoxUSB VBoxNetFlt VBoxNetAdp; do
    kextload -r "/Library/Application Support/VirtualBox" \
     "/Library/Application Support/VirtualBox/$id.kext"
done
```

## 备注

~~VirtualBox6.1.34已经可以兼容了。此文章失效。~~