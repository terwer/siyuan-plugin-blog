---
title: 把npm依赖转换为本地依赖
short_title: ''
description: 概述有的时候当我们要使用额第三方库停止维护之后我们想自己修改代码才能达到某个需求。但是npm默认是只读的下次运行依赖管理会覆盖代码。缘由要在上面陈述的情况我们可以把npm依赖库转换为本地依赖这样就不再受包管理器约束我们就可以自定义修改代码了方案先删除npm中依赖yarnremovevuepressplugincomment使用require​​传入相对路径例如_require(pluginsvuepresspluginvdoingcomment)如果是vuepress插件可能需要下面的方式_[使用本地插件
date: 2022-11-26 19:35:50
category:
  - 前端开发
tag:
  - 依赖
  - 代码
  - 转换
  - 本地
  - dependency
  - npm
article: true
timeline: false
---
## 概述

有的时候，当我们要使用额第三方库停止维护之后，我们想自己修改代码才能达到某个需求。但是 npm 默认是只读的，下次运行依赖管理会覆盖代码。

## 缘由

要在上面陈述的情况，我们可以把 npm 依赖库转换为本地依赖，这样就不再受包管理器约束，我们就可以自定义修改代码 了

## 方案

1. 先删除 npm 中依赖

   ```bash
   yarn remove vuepress-plugin-comment
   ```
2. 使用 `require`​​ 传入相对路径，例如：

   ```js
   require('../../plugins/vuepress-plugin-vdoing-comment')
   ```

   如果是 Vuepress 插件，可能需要下面的方式：

   ```js
   [
       // 使用本地插件
       // resolve(__dirname, '../../plugins/vdoing-comment'), // 评论
       // 使用npm仓库，待发布
       'vuepress-plugin-vdoing-comment', // 评论
       {
           choosen: 'artalk',
           options: {
               server: 'https://my-artalk-server',
               site: '站点名称',
               disableEmotion: false,
               disablePicture: true,
               disablePreview: false
           }
       }
   ],
   ```

‍