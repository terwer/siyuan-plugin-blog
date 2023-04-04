---
title: 卸载Wine版本的微信导致文泉字体被删掉解决
short_title: ''
description: 今天，IDEA用的好好的，重启之后却发现，字体被重置了。这不能忍。然后我就想着去改字体，然后一直找，就是找不到我原来的字体了，就是Wenquanyi
  Micro Hei 和 Wenquanyi Micro Hei Mono。
date: 2022-06-15 02:15:26
category:
  - 实用技巧
  - 经验分享
tag:
  - wine
  - wenquan
  - wenquanyi
  - mono
  - font
article: true
timeline: false
---
# 卸载Wine版本的微信导致文泉字体被删掉解决

## 问题分析

今天，IDEA用的好好的，重启之后却发现，字体被重置了。这不能忍。

然后我就想着去改字体，然后一直找，就是找不到我原来的字体了，就是 Wenquanyi Micro Hei 和 Wenquanyi Micro Hei Mono。

![image-20220614223034661](https://img1.terwer.space/20220614223040.png)

然后就去搜索命令行，发现，**竟然被卸载了。**`

```bash
sudo apt list | grep wqy
```

![image-20220614223234335](https://img1.terwer.space/20220614223234.png)

回想了一下，我没有主动卸载啊，再想想，会不会是关联卸载。突然想起，今天卸载了Wine版本的微信的。应该就是**卸载Wine版本的微信的锅**了。

## 解决办法

重新安装上即可。

可以使用以下命令安装：

```bash
sudo apt install fonts-wqy-microhei fonts-wqy-zenhei
```

然后**注销登录**。因为有可能正在运行的程序没有加载到这个字体。

## 检验效果

重新登录系统之后，再去查看，我们喜欢的文泉字体又回来了。Happy~

![image-20220614224823709](https://img1.terwer.space/20220614224829.png)