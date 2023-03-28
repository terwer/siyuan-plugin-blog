# zhi

🛍️ 一款自带插件和博客的思源笔记主题

[English](README.md)

[![dev checks](https://img.shields.io/github/checks-status/terwer/zhi/dev?label=build)](https://github.com/terwer/zhi/tree/dev)
![version](https://img.shields.io/github/release/terwer/zhi.svg?style=flat-square)
![license](https://img.shields.io/badge/license-GPL-blue.svg?style=popout-square)

[![](https://img.shields.io/badge/构建-成品-green)](https://github.com/terwer/zhi)
[![](https://img.shields.io/badge/主题-源码-red)](https://github.com/terwer/zhi/tree/dev/packages/zhi-mini)
[![](https://img.shields.io/badge/动态-博客-blue)](https://github.com/terwer/zhi/tree/dev/packages/zhi-blog)
[![](https://img.shields.io/badge/静态-博客-purple)](https://github.com/terwer/zhi/tree/dev/packages/zhi-blog-astro)

> ⚠️ 特别提醒 1: `1.0.0` 为前期可用版本，功能上尚不全面，仅作为测试使用，欢迎 issue
> 提出宝贵意见。此版本特性，请参照 [核心特性](#核心特性) 。

> ⚠️ 特别提醒 2: 插件系统默认为 `安全模式` ，需要点击右上角设置菜单关闭安全模式，才能开启插件系统。

> ⚠️ 特别提醒 3: 除主题核心插件外，所有插件默认禁用，需要在首次使用之前，在插件列表开启。

## 快速上手

直接在思源笔记 `集市` 下载 `zhi` 主题，然后在 <kbd>设置</kbd> - <kbd>外观</kbd> - <kbd>主题</kbd> 选择 `zhi` 主题即可

注意：`zhi` 主题仅支持思源笔记 `2.7.6+` 以上版本，否则您需要升级思源笔记到新版本。

## 设计哲学

- 主题核心尽量保持足够轻量、小巧
- 尽可能的使用插件实现功能
- 插件功能单一化，杜绝功能无脑堆积
- 组件尽可能保持可重用

## 核心特性

- 主题灵感源自于知乎但不限于知乎风格，外观优化包括不限于：

  - 字体样式美化，英文以 `Open Sans` 为主， 中文以 `落霞孤鹜` 为主
  - 背景色优化，整体布局、间距优化
  - 代码块美化，类似 `Mac` 窗口风格

- 天生支持插件系统，并内置诸多使用插件，插件系统由社区开发者提供支持

  - 思源笔记发布工具插件
  - 文档图片背景自动透明插件
  - 博客插件

- 同时搞定主题与预览，安装了 zhi 主题相当于额外安装了一个插件系统，一个在线博客

  博客主页：http://127.0.0.1:6806/appearance/themes/zhi/blog/

  挂件版博客管理与发布主页：http://127.0.0.1:6806/widgets/sy-post-publisher/blog/?from=siyuanNewWin

> 注意事项：🌹插件系统为社区热心开发者提供，请详细了解相关机制之后再使用。

## 版本规划

### 1.1.x

- [ ] 博客权限控制

### 项目结构

```
├── blog - 博客根目录
├── theme - 主题根目录
├── plugins - 插件根目录
├── scripts - 脚本根目录
├── docs - 帮助文档
├── temp - 博客和主题插件的临时压缩包
├── .github Github-Actions-CI - 持续集成和 release-please 自动发版
├── theme.json - 主题描述文件         
├── theme.js - 主题js入口
├── theme.css - 主题css入口
├── README.md - 项目说明
```

> 特别说明：
>
> - 主题会根据版本号自动检测并解压到对应目录
> - 发版本之后删除上一版

## 技术路线

[技术路线](tech_zh_CN.md)

## 感谢

感谢 [zuoez02](https://github.com/zuoez02/siyuan-plugin-system) 提供的插件系统
