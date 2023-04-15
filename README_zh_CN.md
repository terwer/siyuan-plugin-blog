# zhi

🛍️ 一款自带插件和博客的思源笔记主题

[English](README.md)

[![](https://img.shields.io/badge/api-docs-green)](https://zhi.terwer.space)
[![dev checks](https://img.shields.io/github/checks-status/terwer/zhi/dev?label=build)](https://github.com/terwer/zhi/tree/dev)
![version](https://img.shields.io/github/release/terwer/zhi.svg?style=flat-square)
![license](https://img.shields.io/badge/license-GPL-blue.svg?style=popout-square)

[![](https://img.shields.io/badge/构建-成品-green)](https://github.com/terwer/zhi)
[![](https://img.shields.io/badge/主题-源码-red)](https://github.com/terwer/zhi/tree/dev/packages/zhi-mini)
[![](https://img.shields.io/badge/动态-博客-blue)](https://github.com/terwer/zhi/tree/dev/packages/zhi-blog)
[![](https://img.shields.io/badge/静态-博客-purple)](https://github.com/terwer/zhi/tree/dev/packages/zhi-blog-astro)

> ⚠️ 特别提醒 1: 注意：`zhi` 主题仅支持 [思源笔记](https://github.com/siyuan-note/siyuan) `2.7.6+` 以上版本，插件功能仅支持 `2.8.1+` ，否则您需要升级 [思源笔记](https://github.com/siyuan-note/siyuan) 到新版本。

> ⚠️ 特别提醒 2: `0.1.0` 为前期可用版本，功能上尚不全面，仅作为测试使用，欢迎 issue
> 提出宝贵意见。此版本特性，请参照 [核心特性](#核心特性) 。

> ⚠️ 特别提醒 3: 插件系统默认为 `安全模式` ，需要点击右上角设置菜单关闭安全模式，才能开启插件系统。

> ⚠️ 特别提醒 4: 除主题核心插件外，所有插件默认禁用，需要在首次使用之前，在插件列表开启。

## 快速上手

直接在思源笔记 `集市` 下载 `zhi` 主题，然后在 <kbd>设置</kbd> - <kbd>外观</kbd> - <kbd>主题</kbd> 选择 `zhi` 主题即可

## 设计哲学

-   主题核心尽量保持足够轻量、小巧
-   尽可能的使用插件实现功能
-   插件功能单一化，杜绝功能无脑堆积
-   组件尽可能保持可重用

## 核心特性

-   主题灵感源自于知乎但不限于知乎风格，外观优化包括不限于：

    -   字体样式美化，英文以 `Open Sans` 为主， 中文以 `落霞孤鹜` 为主
    -   背景色优化，整体布局、间距优化
    -   代码块美化，类似 `Mac` 窗口风格

-   天生支持插件系统，并内置诸多使用插件，插件系统由社区开发者提供支持

    -   思源笔记发布工具插件
    -   文档图片背景自动透明插件
    -   博客插件

-   同时搞定主题与预览，安装了 zhi 主题相当于额外安装了一个插件系统，两个在线博客

    静态博客主页：http://127.0.0.1:6806/appearance/themes/zhi/web/blog/ <sup>简单</sup>  
    动态博客主页：http://127.0.0.1:3000/appearance/themes/zhi/server/blog/ <sup>SEO 友好</sup>

    特别说明：

    1. 博客服务已经自带，开箱即用，无需任何配置。
    2. 静态博客如果想自部署，可拷贝 `web/blog` 目录 ，然后用 `Nginx` 伺服即可，无需其他。
    3. 动态博客如果想自部署，可拷贝 `server/blog` 目录 ，然后用 `Node` 环境启动，也可自行通过 `docker` 镜像或者下面的 `docker-compose.yml` 启动，也可源码编译，然后部署到 `Vercel` 。

挂件版博客管理与发布主页：http://127.0.0.1:6806/widgets/sy-post-publisher/blog/?from=siyuanNewWin [功能重叠][已废弃][建议使用新版博客]

> 注意事项：🌹 插件系统为社区热心开发者提供，请详细了解相关机制之后再使用。

## 技术路线

[技术路线](tech_zh_CN.md)

## 感谢

感谢 [zuoez02](https://github.com/zuoez02/siyuan-plugin-system) 提供的插件系统