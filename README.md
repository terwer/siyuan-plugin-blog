# zhi

🛍️ 一款自带插件和博客的思源笔记主题

[![dev checks](https://img.shields.io/github/checks-status/terwer/zhi/main?label=build)](https://github.com/terwer/zhi/tree/main)
![version](https://img.shields.io/github/release/terwer/zhi.svg?style=flat-square)
![license](https://img.shields.io/badge/license-GPL-blue.svg?style=popout-square)
[![](https://img.shields.io/badge/主题源码-code-red)](https://github.com/terwer/src-sy-post-publisher)
[![](https://img.shields.io/badge/博客源码-code-green)](https://github.com/terwer/src-sy-post-publisher)

## 快速上手

直接在思源笔记 `集市` 下载 `zhi` 主题，然后在 <kbd>设置</kbd> - <kbd>外观</kbd> - <kbd>主题</kbd> 选择 `zhi` 主题即可

## 版本适配

思源笔记 <sup>2.7.6+</sup>

## 设计哲学

- 主题核心尽量保持足够轻量、小巧
- 尽可能的使用插件实现功能
- 插件功能单一化，杜绝功能无脑堆积
- 组件尽可能保持可重用

⚠️ 特别提醒 1: `1.0.0` 为前期可用版本，功能上尚不全面，仅作为测试使用，欢迎 issue
提出宝贵意见。此版本特性，请参照 [核心特性](#核心特性) 。

⚠️ 特别提醒 2: 插件系统默认为 `安全模式` ，所有插件禁用，需要点击右上角设置菜单关闭安全模式，才能开启插件系统。

⚠️ 特别提醒 3: 所有插件默认关闭，需要手动在插件列表开启对应插件才能使用。

## 核心特性

- 主题灵感源自于知乎但不限于知乎风格，外观优化包括不限于：

    - 字体样式美化，英文以 `Open Sans` 为主， 中文以 `落霞孤鹜` 为主
    - 背景色优化
    - 代码块美化，类似 `Mac` 窗口风格

- 整合热门挂件以及其他小工具，提供统一的入口

    - 集成 `sy-post-publisher` 思源笔记发布工具，无需手动添加挂件，无需添加 js 片段，开箱即用

      注意：`sy-post-publisher` 需要单独在集市挂件下载

- 天生支持插件系统，插件系统由社区开发者提供支持

    - 文档图片背景自动透明插件
    - 博客插件

- 同时搞定主题与预览，安装了 zhi 主题相当于额外安装了一个插件系统，一个在线博客

  博客主页：http://127.0.0.1:6806/appearance/themes/zhi/blog/

  挂件版博客管理与发布主页：http://127.0.0.1:6806/widgets/sy-post-publisher/blog/?from=siyuanNewWin

注意事项：插件系统为社区热心开发者提供，请详细了解相关机制之后再使用。

## 版本规划

### 1.1.x

- [ ] 博客权限控制

## 技术路线

### zhi 系列生态

- [zhi](https://github.com/terwer/zhi)
- [zhi-mini](https://github.com/terwer/zhi-mini)
- [zhi-cli](https://github.com/terwer/zhi-cli)
- [zhi-common](https://github.com/terwer/zhi-common)
  - [zhi-sdk](https://github.com/terwer/zhi-sdk)
      - [zhi-env](https://github.com/terwer/zhi-env)
      - [zhi-log](https://github.com/terwer/zhi-log)
      - zhi-core
      - zhi-blog-api
      - zhi-siyuan-api

### 核心框架

- 基础设施：[zhi-sdk](https://github.com/terwer/zhi-sdk)

- 公共组件(zhi-common): [zhi-cli](https://github.com/terwer/zhi-cli) + [zhi-sdk](https://github.com/terwer/zhi-sdk)

- 博客(zhi-blog)：[Nuxt framework](https://nuxt.com/) + [Vue3](https://vuejs.org/) + [Stylus](https://stylus-lang.com/)

- 主题(zhi-theme)：[Vite](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Stylus](https://stylus-lang.com/)

依赖关系如下：

- zhi-common
    - zhi-sdk
        - zhi-log
            - zhi-env

- zhi-mini
    - zhi-sdk

- zhi-theme
    - zhi-common

- zhi-blog
    - zhi-common

现阶段 `zhi-theme` = `zhi-mini` ， 即 `zhi-theme` 已经规划到 `zhi-mini` 了。

其中，公共组件( `zhi-common` )基于我的另一个脚手架项目 [zhi-cli](https://github.com/terwer/zhi-cli) 的模板类型 `ts-vite-lib` 生成:

```bash
## 初始化公共组件
npm i -g zhi-cli
zhi-cli init common ts-vite-lib
```

### 项目结构

```
├── blog 博客根目录
├── theme 主题根目录
├── scripts 脚本根目录
├── docs 帮助文档
├── temp 博客和主题插件的临时压缩包
├── .github Github-Actions-CI持续集成和release-please自动发版
├── theme.json 主题描述文件         
├── theme.js 主题js文件，自动生成，请勿修改
├── theme.css 主题css文件，自动生成，请勿修改
├── README.md
```

特别说明：

- 主题会根据版本号自动检测并解压到对应目录

- 发版本之后删除上一版

## 感谢

感谢 [zuoez02](https://github.com/zuoez02/siyuan-plugin-system) 提供的插件系统
