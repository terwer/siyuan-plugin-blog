## 技术路线

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

这是一个由 Nx 生成的工作区 README 文件，Nx 是一个智能、快速和可扩展的构建系统。

## 理解这个工作区

运行 `nx graph` 命令可以查看项目的依赖关系图表。

## 远程缓存

运行 `npx nx connect-to-nx-cloud` 命令可以启用[远程缓存](https://nx.app/)，使 CI 更快。

## 创建新项目

```
## 项目  
npx create-nx-workspace zhi --package-manager=pnpm --preset=ts  
```

## 初始化

```
## 库  
nx generate @nrwl/js:library zhi-env --publishable --importPath zhi-env  
nx generate @nrwl/node:library mylibrary
```

## 应用程序

```
nx generate @nrwl/web:app myapp  
nx generate @nrwl/node:app myapp  
```

## 设置

```
pnpm install
```

## 构建

```
pmpm build
```

## 校验

```
pnpm lint
```

## 测试

>pnpm test  
</code></div></div></pre>

## 发布

```
nx publish zhi-env --ver=0.0.1 --tag=latest  
nx publish zhi-log --ver=0.0.1 --tag=latest  
```

## 更多帮助

请访问 [Nx 文档](https://nx.dev/) 以了解更多信息。

## zhi 项目架构

### zhi 系列生态

* [zhi](https://github.com/terwer/zhi)

* [zhi-cli](https://github.com/terwer/zhi-cli)

* [zhi-sdk](https://github.com/terwer/zhi-sdk)
  * [zhi-env](https://github.com/terwer/zhi-env)
  * [zhi-log](https://github.com/terwer/zhi-log)
  * zhi-core - 事件、调度
  * [zhi-common](https://github.com/terwer/zhi-common) - 工具类
  * zhi-blog-api
    * zhi-common-blog-api
      * zhi-yuque-api
      * zhi-liandi-api
      * zhi-wechat-api
    * zhi-metaweblog-api
      * zhi-cnblogs-api
      * zhi-wordpress-api
    * zhi-siyuan-api
  * zhi-electron - Electron专属API
  * zhi-web - 浏览器专属API
  * zhi-node - Node专属API
  * zhi-mobile - 移动端专属API

* [zhi-mini](https://github.com/terwer/zhi-mini)
* [zhi-blog](https://github.com/terwer/zhi-blog)
* [zhi-blog-astro](https://github.com/terwer/zhi-blog-astro)


### 核心框架

- 基础设施：[zhi-sdk](https://github.com/terwer/zhi-sdk)

- 脚手架(zhi-cli): [zhi-cli](https://github.com/terwer/zhi-cli)

- 开发工具包 (zhi-sdk): [zhi-sdk](https://github.com/terwer/zhi-sdk)

- 思源主题 (zhi-mini): [Vite](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Stylus](https://stylus-lang.com/)

- 动态博客 (zhi-blog): [Nuxt framework](https://nuxt.com/) + [Vue3](https://vuejs.org/) + [Stylus](https://stylus-lang.com/)

- 静态博客 (zhi-blog-astro): [Astro](https://astro.build/) + [Vue3](https://vuejs.org/) + [Stylus](https://stylus-lang.com/)

依赖关系如下：

* zhi-sdk
  * zhi-log
    * zhi-env
  * zhi-common
* zhi-mini
  * zhi-common
* zhi-blog
  * zhi-common

现阶段 `zhi-theme` = `zhi-mini` ， 即 `zhi-theme` 已经规划到 `zhi-mini` 了。

其中，公共组件( `zhi-common` )基于我的另一个脚手架项目 [zhi-cli](https://github.com/terwer/zhi-cli) 的模板类型 `ts-vite-lib` 生成:

```bash
## 初始化公共组件
npm i -g zhi-cli
zhi-cli init common ts-vite-lib
```
