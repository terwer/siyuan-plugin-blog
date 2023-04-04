---
title: 利用macOS的自动操作实现登录执行特定shell脚本
short_title: ''
description: 利用macOS的自动操作可以大大的提升我们的工作效率。
date: 2022-06-15 10:06:27
category:
  - macOS专区
  - MAC转区
tag:
  - mac
  - macos
  - shell
  - auto
  - shell
  - script
  - login
article: true
timeline: false
---
利用macOS的自动操作可以大大的提升我们的工作效率。

步骤如下：

1、搜索 `自动操作` 启动。

![image-20220615101026949](https://img1.terwer.space/20220615101032.png)

2、点击右侧Tab，打开资源库。

![image-20220615101129984](https://img1.terwer.space/20220615101130.png)

3、找到 `实用工具` -> `运行Shell脚本`

![image-20220615101246967](https://img1.terwer.space/20220615101247.png)

4、写上我们的Shell脚本，或者Shell脚本地址

![image-20220615101514537](https://img1.terwer.space/20220615101514.png)

运行，测试

![image-20220615101608231](https://img1.terwer.space/20220615101608.png)

保存自动操作

CMD+S保存自动操作到应用程序。

![image-20220615101902689](https://img1.terwer.space/20220615101903.png)

5、打开系统偏好设置，用户与群组。

点击登录用户，切换到登录项。

点击+号，加上刚刚的.app程序即可。

现在重启电脑，就能自动执行我们想要的Shell脚本了。