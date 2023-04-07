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

```bash
## core library
## https://nx.dev/packages/vite
nx generate @nrwl/js:library zhi-env --publishable --importPath zhi-env --bundler=vite --unitTestRunner=vitest
nx generate @nrwl/js:library zhi-log --publishable --importPath zhi-log --bundler=vite --unitTestRunner=vitest
nx generate @nrwl/js:library zhi-cli --publishable --importPath=zhi-cli  --bundler=vite --unitTestRunner=vitest
nx generate @nrwl/js:library zhi --publishable --importPath=zhi --bundler=vite --unitTestRunner=vitest
nx generate @nrwl/js:library zhi-sdk --publishable --importPath=zhi-sdk  --bundler=vite --unitTestRunner=vitest
nx generate @nrwl/js:library zhi-blog-api --publishable --importPath=zhi-blog-api  --bundler=vite --unitTestRunner=vitest
nx generate @nrwl/js:library zhi-siyuan-api --publishable --importPath=zhi-siyuan-api  --bundler=vite --unitTestRunner=vitest

## zhi-plugins
nx generate @nrwl/js:library zhi-plugin-publisher --publishable --importPath=zhi-plugin-publisher --bundler=vite --unitTestRunner=vitest
nx generate @nrwl/js:library zhi-plugin-code-block --publishable --importPath=zhi-plugin-code-block --bundler=vite --unitTestRunner=vitest
nx generate @nrwl/js:library zhi-plugin-siyuan2md --publishable --importPath=zhi-plugin-siyuan2md --bundler=vite --unitTestRunner=vitest

## zhi-modules
nx generate @nrwl/js:library zhi-modules-blog-middleware --publishable --importPath=zhi-modules-blog-middleware --bundler=vite --unitTestRunner=vitest

## zhi-modules-web
nx generate @nrwl/js:library zhi-modules-blog-middleware-web --publishable --importPath=zhi-modules-blog-middleware-web --bundler=vite --unitTestRunner=vitest

## node library
#nx generate @nrwl/node:lib zhi-blog-middleware --publishable --importPath=zhi-blog-middleware
#nx generate @nrwl/js:lib zhi-blog-middleware-esbuild --publishable --importPath=zhi-blog-middleware-esbuild --bundler=esbuild

## web app
## zhi-blog, zhi-blog-astro
nx generate @nrwl/web:app zhi-blog-ssr --bundler=vite --unitTestRunner=vitest
## nx generate @nrwl/react:app zhi-blog --bundler=vite --dry-run

## node app
https://nx.dev/packages/node/generators/application
nx g @nrwl/node:application zhi-blog --bundler=webpack --framework=express --docker=true

## docs
## pnpm install @nx-plus/docusaurus --save-dev
nx generate @nx-plus/docusaurus:app zhi-docs
## nx serve zhi-docs
## -----------------------------------------------
## pnpm install typedoc typedoc-plugin-markdown docusaurus-plugin-typedoc --save-dev
## -----------------------------------------------
## pnpm add vue vitepress -D
## pnpm exec vitepress init
## ./packages/zhi-docs-vitepress
## -----------------------------------------------
## pnpm add vuepress -D
## mkdir packages/zhi-docs-vuepress
## echo '# Hello VuePress' > packages/zhi-docs-vuepress/README.md
## "docs:dev": "vuepress dev packages/zhi-docs-vuepress",
## "docs:build": "vuepress build packages/zhi-docs-vuepress"
## -----------------------------------------------
## pnpm add -D vuepress@next @vuepress/client@next vue
## "docs:dev": "vuepress dev packages/zhi-docs-vuepress",
## "docs:build": "vuepress build packages/zhi-docs-vuepress"
## -----------------------------------------------
## pnpm create vuepress-theme-hope packages/zhi-docs-vuepress2
## pnpm add @vuepress/client vue vuepress vuepress-theme-hope -D

## nuxt
## pnpm install @nx-plus/nuxt --save-dev
## nx generate @nx-plus/nuxt:app zhi-blog
## nx serve my-app

## astro
## pnpm install -D @nxtensions/astro
## nx migrate @nxtensions/astro@latest
nx generate @nxtensions/astro:app zhi-static-blog-astro
nx generate @nxtensions/astro:app zhi-blog-astro
## nx generate @nxtensions/astro:lib my-lib
## nx generate @nxtensions/astro:component my-component
## nx dev my-app
## nx preview my-app

## python
## https://betterprogramming.pub/poetry-python-nx-monorepo-5750d8627024
## https://github.com/lucasvieirasilva/nx-plugins/blob/main/packages/nx-python/README.md
## pnpm install @nxlv/python --save-dev
npx nx generate @nxlv/python:project zhi-vuepress1-to-vuepress2 --type application --description='zhi-vuepress1-to-vuepress2' --packageName=zhi-vuepress1-to-vuepress2 --moduleName=zhi_vuepress1_to_vuepress2

## rollup
## https://nx.dev/packages/js/generators/library#bundler
## https://github.com/nrwl/nx/issues/2212#issuecomment-894064983
## nx generate @nrwl/js:lib zhi-blog-middleware-rollup --publishable --importPath=zhi-blog-middleware-rollup --bundler=rollup
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

```
pnpm test  
```

## 发布

```
nx publish zhi-env --ver=0.0.1 --tag=latest  
nx publish zhi-log --ver=0.0.1 --tag=latest  
nx publish zhi-cli --ver=0.0.1 --tag=latest
nx publish zhi-common --ver=0.0.1 --tag=latest
nx publish zhi --ver=0.0.1 --tag=latest
nx publish zhi-sdk --ver=0.0.1 --tag=latest
nx publish zhi-blog-api --ver=0.0.1 --tag=latest
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

- 基础设施：[zhi-env](https://github.com/terwer/zhi-env) + [zhi-log](https://github.com/terwer/zhi-log)

- 脚手架(zhi-cli): [zhi-cli](https://github.com/terwer/zhi-cli)

- 开发工具包 (zhi-sdk): [zhi-sdk](https://github.com/terwer/zhi-sdk)

- 思源主题 (zhi-mini): [Vite](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Stylus](https://stylus-lang.com/)

- 动态博客 (zhi-blog): [Nuxt framework](https://nuxt.com/) + [Vue3](https://vuejs.org/) + [Stylus](https://stylus-lang.com/)

- 静态博客 (zhi-blog-astro): [Astro](https://astro.build/) + [Vue3](https://vuejs.org/) + [Stylus](https://stylus-lang.com/)

依赖关系如下：

* zhi-sdk
  * zhi-core
  * zhi-log
    * zhi-env
  * zhi-common
* zhi-mini
  * zhi-sdk
  * zhi-electron
* zhi-blog
  * zhi-sdk
* zhi-blog-astro
  * zhi-sdk

现阶段 `zhi-theme` = `zhi-mini` ， 即 `zhi-theme` 已经规划到 `zhi-mini` 了。
