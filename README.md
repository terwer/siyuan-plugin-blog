# zhi

一款知乎风格的思源笔记主题

## 版本适配

思源笔记 <sup>2.7.6+</sup>

## 核心特色

- 完全模仿知乎风格
- 整合热门挂件以及其他小工具，提供统一的入口
- 天生支持插件系统
- 同时搞定主题与预览，安装了 zhi 主题相当于额外安装了一个插件系统，一个带权限的在线博客，默认私有

注意事项：插件系统为社区热心开发者提供，请详细了解相关机制之后再使用。

！！！Warning！！！

**强烈建议在使用之前做好数据备份， 数据无价，谨慎操作！**

**强烈建议在使用之前做好数据备份， 数据无价，谨慎操作！**

**强烈建议在使用之前做好数据备份， 数据无价，谨慎操作！**

！！！Warning！！！

## TODO

- [ ] 文章预览默认带密码，custom-publish-access 字段控制，公开是 public，带密码是 protected ，默认 private

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

Vite + React + TypeScript + SWC

```
.
├── README.md
├── dist                            构建后的目录，可直接部署到Nginx等静态服务器
├── index.html                      内置文章预览等功能的统一入口
├── node_modules
├── package.json
├── public
│   ├── lib                         思源内部加载的依赖，使用cjs，可以直接使用fs，可直接require思源内部支持的库，但是不可依赖任何自定义类库，也不能参与编译
├── src                             源码根路径，除非特别说明，均参与编译类型检查，不可依赖node独有类库，例如fs等
│   ├── App.css
│   ├── App.tsx
│   ├── assets
│   │   └── react.svg
│   ├── index.css
│   ├── main.tsx
│   ├── utils
│   │   ├── otherlib                参与编译，但是编译期间不参与类型检查，可以直接依赖ts或者js库，但不可依赖node独有类库，例如fs等
│   │   ├── strUtil.ts
│   │   └── sysUtil.ts
│   ├── vite-env.d.ts
│   ├── zhi
│   │   ├── Lifecycle.ts
│   │   └── bootstrap.ts
│   ├── zhi-theme.sass               zhi 核心样式sass源码
│   └── zhi-theme.ts                 zhi 核心加载逻辑
├── theme.css                        思源笔记样式入口
├── theme.js                         思源笔记脚本入口
├── theme.json
├── tsconfig.json
├── tsconfig.node.json
├── typings
│   └── custom.d.ts
└── vite.config.ts                    vite项目配置
```

## 感谢

感谢 [zuoez02](https://github.com/zuoez02/siyuan-plugin-system) 提供的插件系统
