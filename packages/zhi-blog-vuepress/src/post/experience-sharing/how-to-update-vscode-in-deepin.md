---
title: deepin的vscode怎么更新
short_title: ''
description: 原因：deepin商店的vscode跟我们自己下载的不是同一个包。解决：先卸载之前安装的vscode，然后重新下载deb安装包自己安装即可。
date: 2022-06-07 18:26:06
category:
  - 实用技巧
  - 经验分享
tag:
  - deepin
  - vscode
  - update
article: true
timeline: false
---
## deepin的vscode怎么更新

原因：deepin商店的vscode跟我们自己下载的不是同一个包。

解决：先卸载之前安装的vscode，然后重新下载deb安装包自己安装即可。

```bash
➜  ~ sudo apt-get  remove com.visualstudio.code

请输入密码:
验证成功
正在读取软件包列表... 完成
正在分析软件包的依赖关系树       
正在读取状态信息... 完成       
下列软件包将被【卸载】：
  com.visualstudio.code
升级了 0 个软件包，新安装了 0 个软件包，要卸载 1 个软件包，有 0 个软件包未被升级。
解压缩后将会空出 350 MB 的空间。
您希望继续执行吗？ [Y/n] y
(正在读取数据库 ... 系统当前共安装有 471203 个文件和目录。)
正在卸载 com.visualstudio.code (1.67.1-1651841865) ...
正在处理用于 spark-store (3.1.1) 的触发器 ...
正在处理用于 deepin-app-store (7.4.1.0003-1) 的触发器 ...
Rebuilding /usr/share/applications/bamf-2.index...
```

![image-20220607182147365](https://img1.terwer.space/20220607182152.png)

现在就可以愉快的玩耍啦。

![image-20220607182328138](https://img1.terwer.space/20220607182328.png)