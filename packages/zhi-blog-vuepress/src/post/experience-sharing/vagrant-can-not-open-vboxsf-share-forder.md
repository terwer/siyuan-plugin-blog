---
title: vagrant用户无法访问vboxsf的共享文件夹解决方案
short_title: ''
description: vagrant用户无法访问vboxsf的共享文件夹解决方案，将vagrant用户添加到vboxsf用户组即可。
date: 2022-05-13 02:21:47
category:
  - 实用技巧
  - 经验分享
tag:
  - vagrant
  - virtualbox
article: true
timeline: false
---
将vagrant用户添加到vboxsf用户组即可。

```bash
sudo usermod --append --groups vboxsf vagrant
```

然后就可以了，访问共享文件夹：

```bash
cd /mnt/share
ls
```

![image-20220513022415845](https://img1.terwer.space/20220513022416.png)