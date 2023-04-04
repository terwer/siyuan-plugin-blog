---
title: Deepin配置Typora和PicGo实现GitHub图床
short_title: ''
description: Deepin配置Typora和PicGo实现GitHub图床。
date: 2022-06-01 01:30:19
category:
  - 实用技巧
  - 经验分享
tag:
  - deepin
  - picgo
  - node
  - typora
  - watermark
  - cdn
article: true
timeline: false
---
# Deepin配置Typora和PicGo实现GitHub图床

:::tip 文章更新历史

2022/06/12 feat:修复nodejs安装脚本。

2022/06/01 feat:初稿。

:::

## 下载并安装 Typora

[https://typora.io/](https://typora.io/)

## 下载 PicGo 的 AppImage 版本

[https://github.com/Molunerfinn/PicGo/releases/tag/v2.3.0](https://github.com/Molunerfinn/PicGo/releases/tag/v2.3.0)

## 设置Typora

选择 文件->偏好设置->图像->上传服务，选择PicGo（app），填上 AppImage 的绝对路径。

```
/home/terwer/appimage/PicGo-2.3.0.AppImage
```

![image-20220601015423533](https://img1.terwer.space/20220601015423.png)

点击验证，此时会启动 PicGo

## 设置 PicGo 使用 GitHub 图床

![image-20220601204542849](https://img1.terwer.space/20220601204543.png)

注意下，域名

~~https://cdn.jsdelivr.net/gh/terwer/upload/main~~

~~这里，选择 jsdeliver ，防止 GitHub 无法访问的情况。~~

PS：最新方法，输入下面地址：

```bash
https://ghproxy.com/https://raw.githubusercontent.com/terwer/upload/main
```

切记 **不要滥用！不要滥用！不要滥用！** 避免失效。

这个地址根据你自己的仓库调整即可 

https://ghproxy.com/https://raw.githubusercontent.com/**用户名**/**仓库名**/**分支名**

## 安装水印插件

注意：这里直接安装会提示，请安装 NodeJS 并重启 PicGo ，需要使用 apt 安装最新稳定版 node 。

方法如下：

1：安装apt中的nodejs和npm

```bash
# 这一行不需要了
# sudo apt-get install nodejs-legacy
sudo apt-get install npm 
```

2：npm修改成淘宝源，安装n模块

```bash
sudo npm config set registry https://registry.npm.taobao.org
sudo npm config list
sudo npm install n -g
```

3：安装最新的nodejs（stable版本）

```bash
sudo n stable
```

4：验证安装

```bash
node -v
npm -v
```

5：顺便安装一下 yarn ，这个也经常用

```bash
sudo npm install --global yarn
```

然后就可以安装水印插件了。

![image-20220601014554723](https://img1.terwer.space/20220601014554.png)

水印设置，图片要是绝对路径

![image-20220601014447070](https://img1.terwer.space/20220601014447.png)

水印图片

![logo](https://terwergreen.com/img/logo.png)

本地路径

```
/home/terwer/Pictures/logo.png
```