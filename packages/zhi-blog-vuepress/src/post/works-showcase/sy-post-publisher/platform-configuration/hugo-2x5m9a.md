---
title: Hugo平台配置指南
short_title: ''
description: hugo官网theworld’sfastestframeworkforbuildingwebsites_hugo(gohugoio)安装hugobrewinstallhugo准备工作hugo博客部署_这个相信大家都已经会了。不过这里还是推荐一个最佳实践。推荐使用hugothemenextstarter生成博客。博客设置参考_hugothemenext我开发此功能的测试博客_https_hugoterwerspace源码_https_githubcomterwerhugobloghugo的frontmatt
date: 2022-09-27 10:00:30
category:
  - 平台配置
  - sy-post-publisher
  - 作品展示
tag:
  - 博客
  - 推荐
  - 安装
  - 准备
  - 工作
article: true
timeline: false
---
## HUGO 官网

[The world’s fastest framework for building websites | Hugo (gohugo.io)](https://gohugo.io/)

## 安装 HUGO

```bash
brew install hugo
```

## 准备工作

HUGO 博客部署：这个相信大家都已经会了。不过这里还是推荐一个最佳实践。

推荐使用 [hugo-theme-next-starter](https://github.com/hugo-next/hugo-theme-next-starter) 生成博客。

博客设置参考：[hugo-theme-next](https://github.com/hugo-next/hugo-theme-next#-direct-reference)

```bash
git submodule add https://github.com/hugo-next/hugo-theme-next.git themes/hugo-theme-next
```

我开发此功能的测试博客：[https://hugo.terwer.space](https://hugo.terwer.space)

源码：[https://github.com/terwer/hugo-blog](https://github.com/terwer/hugo-blog)

## HUGO 的 front-matter 规则

[Front Matter | Hugo (gohugo.io)](https://gohugo.io/content-management/front-matter/)

## 发布配置

‍