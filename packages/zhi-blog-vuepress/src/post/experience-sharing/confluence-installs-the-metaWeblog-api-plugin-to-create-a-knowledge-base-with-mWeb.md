---
title: Confluence安装MetaWeblogApi插件配合MWeb打造知识库
short_title: ''
description: Confluence安装MetaWeblogApi插件配合MWeb打造知识库，官方插件使用文档。
date: 2022-03-28 01:20:55
category:
  - 实用技巧
  - 经验分享
tag:
  - confluence
  - metaweblog
  - mweb
article: true
timeline: false
---
# Confluence安装MetaWeblogApi插件配合MWeb打造知识库

## 官方插件使用文档

[https://ecosystem.atlassian.net/wiki/spaces/BLOG/overview](https://ecosystem.atlassian.net/wiki/spaces/BLOG/overview)

## 插件下载

### 从Maven中心仓库下载插件

[https://mvnrepository.com/artifact/com.atlassian.confluence.plugins.xmlrpc.bloggingrpc/bloggingrpc/4.1.0](https://mvnrepository.com/artifact/com.atlassian.confluence.plugins.xmlrpc.bloggingrpc/bloggingrpc/4.1.0)

### 从官方插件仓库下载地址

[https://packages.atlassian.com/maven-public/com/atlassian/confluence/plugins/xmlrpc/bloggingrpc/bloggingrpc/4.1.0/](https://packages.atlassian.com/maven-public/com/atlassian/confluence/plugins/xmlrpc/bloggingrpc/bloggingrpc/4.1.0/)

## 插件安装

点击设置->管理应用，然后点击上传应用

![image-20220328033510394](https://img1.terwer.space/20220328033541.png)

上传刚刚下载的jar包，等待完成安装即可。

![image-20220603015006853](https://img1.terwer.space/20220603015007.png)

## 403报错解决

错误如下

![image-20220603015240853](https://img1.terwer.space/20220603015241.png)

解决

打开xml-rpc远程调用开关

![image-20220603015426648](https://img1.terwer.space/20220603015426.png)

## 配合我写的MWeb插件

地址：

[https://github.com/terwer/confluence-xmlrpc](https://github.com/terwer/confluence-xmlrpc)

运行我写的这个插件项目，然后MWeb写上 `http://localhost:8191/xmlrpc` 即可。

这是一个 Spring Boot 项目，直接运行即可。

注意：项目中的地址要配置成你的 confluence 实际地址。

![image-20220603014014531](https://img1.terwer.space/20220603014019.png)

MWeb配置

![image-20220603022155254](https://img1.terwer.space/20220603022155.png)