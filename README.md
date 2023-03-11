# zhi

🛍️ 一款自带插件和博客的思源笔记主题

![version](https://img.shields.io/github/release/terwer/zhi.svg?style=flat-square)
![license](https://img.shields.io/badge/license-GPL-blue.svg?style=popout-square)

## 主题展示

### 浅色风格

![](https://static.terwergreen.com/test/202303050157804.png)

### 暗黑风格

![](https://static.terwergreen.com/test/202303050156263.png)

### 博客主页

![](https://static.terwergreen.com/test/202303052323466.png)

## 前排推荐

zhi 系列生态

- [zhi-cli](https://github.com/terwer/zhi-cli)
- zhi-sdk
  - [zhi-env](https://github.com/terwer/zhi-env)
  - [zhi-log](https://github.com/terwer/zhi-log)
  - zhi-common
  - zhi-core
  - zhi-blog-api
  - zhi-siyuan-api

⚠️ 特别提醒 1: `1.0.0` 为前期可用版本，功能上尚不全面，仅作为测试使用，欢迎 issue
提出宝贵意见。此版本特性，请参照 [核心特性](#核心特性) 。

⚠️ 特别提醒 2: 插件系统默认为 `安全模式` ，所有插件禁用，需要点击右上角设置菜单关闭安全模式，才能开启插件系统。

⚠️ 特别提醒 3: 所有插件默认关闭，需要手动在插件列表开启对应插件才能使用，目前内置可用的插件如下：

- 系统设置插件（插件系统内置）
- 示例插件-需手动开启
- 图片背景自动透明插件-需手动开启
- 思源笔记发布工具集成插件-需手动开启
- 博客插件-需手动开启
- 更多插件开发中，敬请期待...

## 版本适配

思源笔记 <sup>2.7.6+</sup>

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

  博客主页：http://127.0.0.1:6806/appearance/themes/zhi/apps/blog/dist/

  挂件版博客管理与发布主页：http://127.0.0.1:6806/widgets/sy-post-publisher/blog/?from=siyuanNewWin

注意事项：插件系统为社区热心开发者提供，请详细了解相关机制之后再使用。

## 版本规划

## 1.1.x

- [ ] 博客权限控制

## 快速上手

直接在思源笔记 `集市` 下载 `zhi` 主题，然后在 <kbd>设置</kbd> - <kbd>外观</kbd> - <kbd>主题</kbd> 选择 `zhi` 主题即可

## 本地调试

1. 下载压缩包，解压到主题目录。主题目录在 <kbd>设置</kbd> - <kbd>外观</kbd> - <kbd>主题</kbd> - <kbd>打开主题文件夹</kbd>

2. 安装依赖，构建项目

```bash
npm i -g pnpm
pnpm install
pnpm build
```

3. <kbd>设置</kbd> - <kbd>外观</kbd> - <kbd>主题</kbd> 选择 `zhi` 主题即可

## 项目结构

```
├── README.md
├── apps
│   ├── blog 博客根目录
│   └── theme 主题根目录
├── scripts 脚本根目录
backup 备份
```

## Useful scripts

### Build

```bash
pnpm ci
```

### Publish to npm

```bash
pnpm package
```

### Docs

```bash
pnpm vitepress:dev
```

## 感谢

感谢 [zuoez02](https://github.com/zuoez02/siyuan-plugin-system) 提供的插件系统
