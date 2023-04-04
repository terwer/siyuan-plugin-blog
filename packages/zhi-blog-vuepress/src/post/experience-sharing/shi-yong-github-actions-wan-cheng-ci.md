---
title: 使用GitHub Actions完成ci自动化部署
short_title: ''
date: 2022-04-17 11:34:15
category:
  - 实用技巧
  - 经验分享
tag:
  - github
  - ci
  - token
article: true
timeline: false
---
本文提供了利用 `GitHub Actions` 完成自动部署的方法，我们只需要推送代码到仓库，剩下的交给 `ci` 持续继承就好了。

# 编写任务脚本

本质上，还是自动触发执行脚本，所以我们先写好脚本 `deploy.sh`

![image-20220417120250870](https://img1.terwer.space/image-20220417120250870.png)

配置GitHub Actions

我们只需要在git仓库根目录创建一个 `.github` 文件夹，在新建一个workflows文件夹，然后新建一个yml文件，GitHub会自动把yml文件当成ci任务。

![image-20220417113906034](https://img1.terwer.space/image-20220417113906034.png)

ci.yml内容如下：

![image-20220417120214679](https://img1.terwer.space/image-20220417120214679.png)

可以看到，我们实际上是自动调用了上面的脚本实现。

但是这里会有一个问题要注意，就是 `GITHUB_TOKEN` 这个变量，这个是自动生成的。

我们使用了![image-20220417120427425](https://img1.terwer.space/image-20220417120427425.png)去访问它，那么我们需要需先配置。

# 配置GITHUB_TOKEN

打开项目的Settings，将token加进去即可，注意key值要保持一致

![image-20220417114442871](https://img1.terwer.space/image-20220417114442871.png)

value就是用户自定义令牌，可以在个人设置里面开发者设置里面生成。

![image-20220417114607178](https://img1.terwer.space/image-20220417114607178.png)

这样就ok了。