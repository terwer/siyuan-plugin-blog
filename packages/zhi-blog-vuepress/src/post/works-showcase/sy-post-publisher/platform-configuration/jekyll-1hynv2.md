---
title: Jekyll平台配置指南
short_title: ''
description: 安装jekyllgeminstalljekyllwithcppflags=i(brewprefixopenssl)include查看jekyll版本jekyllv站点初始化##gitcheckoutorphanghpagesgitrmrf创建新站点jekyllnewskipbundle替换依赖##注释掉##gem##添加gem安装依赖bundleinstall解决依赖问题bundleaddwebrick本地运行bundleexecjekyllserve准备工作https_docsgithubcomenpa
date: 2022-09-27 10:00:37
category:
  - 平台配置
  - sy-post-publisher
  - 作品展示
tag:
  - 安装
  - 查看
  - 版本
  - 站点
  - 初始化
article: true
timeline: false
---
## 安装 Jekyll

```bash
gem install jekyll -- --with-cppflags=-I$(brew --prefix openssl)/include
```

## 查看 Jekyll 版本

```bash
jekyll -v
```

## 站点初始化

```bash
## git checkout --orphan gh-pages
git rm -rf .
```

## 创建新站点

```bash
jekyll new --skip-bundle .
```

## 替换依赖

```bash
## 注释掉
## gem "jekyll", "~> 4.3.1"

## 添加
gem "github-pages", "~> 227"
```

## 安装依赖

```bash
bundle install
```

解决依赖问题

```bash
bundle add webrick
```

## 本地运行

```bash
bundle exec jekyll serve
```

## 准备工作

[https://docs.github.com/en/pages/quickstart](https://docs.github.com/en/pages/quickstart)

## Jekyll主题最佳实践

[https://github.com/lorepirri/cayman-blog](https://github.com/lorepirri/cayman-blog)

## Jekyll 的 front-matter 规则

[https://jekyllrb.com/docs/front-matter/](https://jekyllrb.com/docs/front-matter/)

我开发此功能的测试博客：[https://terwer.github.io](https://terwer.github.io)

源码：[https://github.com/terwer/terwer.github.io/tree/gh-pages](https://github.com/terwer/terwer.github.io/tree/gh-pages)

## 发布配置

‍