---
title: 使用NRWL-NX-workspace创建一个Node-js-命令行库
date: 2023-03-29 11:26:22
tag:
  - 使用
  - 创建
  - 工作
  - 一个
  - 命令
  - zhi
  - zhi-cli
category: 
  - 前端开发
  - nx
  - monorepo
article: true
timeline: false
---



## 为什么要费心写另一篇关于 CLI 库的文章呢？

有无数关于创建 Node.js 命令行库的文章可用，而本文并不尝试重新发明轮子。它被作为一个统一的工作流，专门为 zhi 主题所采用并为 zhi 所使用的技术堆栈进行了量身定制：NRWL NX 工作区、语义化版本控制、GitHub actions、GitHub packages、多分发渠道（即功能/预发布分支）以及 Netlify/Vercel 服务。

在这篇文章中，我会分享我在 [思源笔记 zhi 主题](https://github.com/terwer/zhi) 开发过程中创建命令行库时精确的开发流程。这个统一的开发栈帮助我在我的各个子项目之间共享库时减少了大量重复工作和时间。

## 阅读本文对我有什么好处？

本文将指导您如何：

1. 创建一个基于 NX 的工作区
2. 在 NX 工作区中创建一个 Typescript 的  Vite 项目
3. 将该项目暴露为 node.js CLI 执行项目
4. 转译为 ESM 模块
5. 将代码分割成命令

文章末尾有一些跟进文章：

1. 使用 GitHub Actions 自动将库发布到 NPM 仓库中。
2. 在开发机器上使用环境参数运行库。

一个可运行的例子可以在 [terwer/zhi](https://github.com/terwer/zhi/tree/dev/packages/zhi-cli "zhi-cli") 中找到。

## 先决条件

请确保您正在使用 Node 版本 >= 16。

顺带一提，为了在您的计算机上使用多个 Node 版本，如果您未使用 [nvm-sh/nvm：Node 版本管理器](https://github.com/nvm-sh/nvm#automatically-call-nvm-use)，我建议您尝试一下。

设置工作区

创建新的 NX 工作区。

```bsah
npx create-nx-workspace@latest
```

当询问时，请选择选项 `integrated monorepo > ts`​ 。

create-nx-workspace 脚本会创建一个以您提供的项目名称命名的文件夹。进入新创建的文件夹。

添加 `.nvmrc`​ 文件并将内容设置为所需的 Node.js 版本号。例如，如果您正在使用 Node v16：

```
16
```

现在，请运行以下命令在工作区中创建一个基于 Vite 的新项目。

```bash
## Create a Vite project
nx generate @nrwl/js:library zhi-cli --publishable --importPath=zhi-cli  --bundler=vite

## Add Vitest support
## In the selection option select Vitest as Unit test framework
```

在文件 `packages/zhi-cli/package.json`​ 中：

* 将版本设置为 `1.0.0`​.
* 让脚本可执行。

  ```
  "bin": "./index.js"
  ```

注意：一旦部署到 [NPM](https://npmjs.com/)，您将可以使用其名称运行该库，例如通过运行 `npx zhi-cli --help`​ 。

* 添加一些脚本，这些脚本可以在开发过程中帮助你。注意：在根目录加，不是子项目。

  ```json
  {
    "name": "zhi",
    "version": "1.0.0",
    "license": "GPL",
    "type": "module",
    "scripts": {
      "dev:zhi-cli": "node --experimental-specifier-resolution=node --loader ts-node/esm packages/zhi-cli/index.ts",
      "watch:zhi-cli": "nx run zhi-cli:build --watch",
      "cli:zhi-cli": "node --experimental-specifier-resolution=node dist/packages/zhi-cli"
    },
  }
  ```

注意：上面我们设置了 `"type": "module"`​ , 这样保证直接 ESM 的方式运行 js 文件，否则就需要设置文件后缀名为 mjs。

还有：如果直接运行 ts 文件，还需要安装 `ts-node`​ 。

在文件 `packages/cli/tsconfig.lib.json`​ 中添加一个标志以避免 Typescript 错误，当库没有导出默认对象时。

```json
{
  compilerOptions { 
    "allowSyntheticDefaultImports": true 
  }
}
```

在文件 `packages/zhi-cli/project.json`​ 中，当构建包时，您应该指示 NX 将包使用的依赖项包含在生成的 package.json 中。

```
"targets": {
    "build": {
        "updateBuildableProjectDepsInPackageJson": true,  
        "buildableProjectDepsInPackageJsonType": "dependencies"
    }
}
```

## 将库转换为为 ES 模块

要导入 ES 模块库，你的库也应该是 ==ES 模块==。有关更多信息，请参见 [@nrwl/node 应用程序未转换为 esm · Issue #10296 · nrwl/nx](https://github.com/nrwl/nx/issues/10296) 。请通过以下步骤进行：

* 在文件 `packages/zhi-cli/package.json`​ 中添加 `"type": "module"`​ ，这个在上面一步已经说过了。
* 在文件 `packages/zhi-cli/tsconfig.json`​ 中，将 `module`​ 值更改为 `esnext`​。
* 在文件 `tsconfig.base.json`​ 中，将 `target`​ 编译器值更改为 `esnext`​。

## 创建初始 CLI 命令

> 在继续指南之前，现在是将您的工作区提交到 Github 的好时机。

在前面的部分，您创建了一个工作区并准备好了您的命令。现在是添加命令的时候了。

library 的推荐结构：

```
packages
├── zhi-cli
│   ├── package.json
│   ├── project.json
│   ├── README.md
│   ├── src
│   │   ├── index.ts
│   │   └── lib
│   │       ├── zhi-cli.spec.ts
│   │       ├── zhi-cli.ts
│   │       ├── {command-name}                    (folder)
│   │       │       ├── command.ts
│   │       └── {another-command-name}     (folder)
│   │                  ├── command.ts
│   ├── tsconfig.json
│   ├── tsconfig.lib.json
│   ├── tsconfig.spec.json
│   └── vite.config.ts
```

在本文中，我们将创建一个名为 `init`​ 的命令，除了写入控制台外，什么也不做。

## 安装推荐的库

许多优秀的库可被用于提供丰富且友好的命令行用户体验。

在本文中，我们将安装一些必备的库。

1. [commander - npm](https://www.npmjs.com/package/commander) - 必备的一个库，可让您定义命令及其参数、选项、帮助等。
2. [debug - npm](https://www.npmjs.com/package/debug) - 必备的一个流行库，可用于编写调试日志。
3. [fast-glob - npm](https://www.npmjs.com/package/fast-glob) - 推荐的一个高速高效的 Glob 库。
4. [inquirer - npm](https://www.npmjs.com/package/inquirer) - 推荐的一个常见交互式命令行用户界面的集合。

安装所需的库（可以添加更多）。

```bash
pnpm add commander debug
pnpm add @types/debug @types/node -D
```

## 添加初始命令代码

新建 `src/lib/utils.ts`​ 文件

将以下内容复制到 utils 文件中。

```bash
import Debug from "debug"

export const rootDebug = Debug("zhi-cli")

export const printVerboseHook = (thisCommand: any) => {
  const options = thisCommand.opts()

  if (options.verbose) {
    Debug.enable("zhi-cli*")
    rootDebug(`CLI arguments`)
    rootDebug(options)
  }
}
```

### `src/lib/init/command.ts`​ 文件

请复制以下模板并根据需要进行调整。

```ts
import * as fs from "fs"
import { Command } from "commander"
import { printVerboseHook, rootDebug } from "../utils"
import * as process from "process"

// remember to name the folder of this file as the command name

const debug = rootDebug.extend("init")
const debugError = rootDebug.extend("init:error")

export const initCommand = () => {
  const command = new Command("init")
  command
    .argument("[path]", "directory to do something with")
    .option("--verbose", "output debug logs", false)
    .option("--target <name>", "the target name", "node")
    // .requiredOption('--includeDirectories', 'copy directories')
    .hook("preAction", printVerboseHook)
    .action(async (path, options) => {
      if (path && !fs.existsSync(path)) {
        debugError("invalid path provided")
        process.exit(1)
      }

      debug(`Zhi-cli is executing now....`)
    })
  return command
}

```

### `src/lib/zhi-cli.ts`​ 文件

创建文件并添加以下内容：

```ts
import { Command } from "commander"
import { initCommand } from "./init/commnd"

const program = new Command()
program.name("Zhi project creator").description("Create projects for zhi theme")

program.addCommand(initCommand())

program.parse(process.argv)
```

## 配置 Vite 支持 Node

这一步非常重要，否则后面的无法运行，修改 `vite.config.ts`​ ，这里需要添加 `external`​ 和 `output.banner`​ 。

```js
 build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: "src/index.ts",
      name: "zhi-cli",
      fileName: "index",
      // Change this to the formats you want to support.
      // Don't forgot to update your package.json as well.
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      // External packages that should not be bundled into your library.
      external: ["fs", "path", "process", "events"],
      output: {
        banner: "#! /usr/bin/env node",
      },
    },
```

## 测试命令

先运行 `nx build zhi-cli`​

```bash
➜  zhi git:(dev) ✗ nx build zhi-cli

> nx run zhi-cli:build

vite v4.2.1 building for production...
```

然后运行以下命令 `node --experimental-specifier-resolution=node dist/packages/zhi-cli init --verbose`​。

```bash
➜  zhi git:(dev) ✗ node --experimental-specifier-resolution=node dist/packages/zhi-cli init --verbose
(node:14065) ExperimentalWarning: The Node.js specifier resolution flag is experimental. It could change or be removed at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
zhi-cli CLI arguments +0ms
zhi-cli { verbose: true, target: 'node' } +1ms
zhi-cli:init Zhi-cli is executing now.... +0ms
```

或者 `pnpm cli:zhi-cli`​

```bash
➜  zhi git:(dev) ✗ pnpm cli:zhi-cli  

> zhi@1.0.0 cli:zhi-cli /home/terwer/Documents/mydocs/zhi
> node --experimental-specifier-resolution=node dist/packages/zhi-cli

(node:15205) ExperimentalWarning: The Node.js specifier resolution flag is experimental. It could change or be removed at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
Usage: Zhi project creator [options] [command]

Create projects for zhi theme

Options:
  -h, --help             display help for command

Commands:
  init [options] [path]
  help [command]         display help for command
 ELIFECYCLE  Command failed with exit code 1.
➜  zhi git:(dev) 
```

运行 `init`​

```bash
➜  zhi git:(dev) pnpm cli:zhi-cli init --verbose

> zhi@1.0.0 cli:zhi-cli /home/terwer/Documents/mydocs/zhi
> node --experimental-specifier-resolution=node dist/packages/zhi-cli "init" "--verbose"

(node:16121) ExperimentalWarning: The Node.js specifier resolution flag is experimental. It could change or be removed at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
zhi-cli CLI arguments +0ms
zhi-cli { verbose: true, target: 'node' } +1ms
zhi-cli:init Zhi-cli is executing now.... +0ms
➜  zhi git:(dev) ➜
```

## 命令行测试命令

你可以以类似于部署应用的行为方式进行测试。

确保您构建了项目。

在终端中，导航到 `dist/packages/zhi-cli`​ ，然后运行 `npm link`​ 命令。

```bash
cd dist/packages/zhi-cli
npm link
## for linux, like Debian, Ubuntu, Deepin, UOS, you should use the following command
## sudo npm link
```

完成后，您可以导航返回根文件夹。

```bash
➜  zhi-cli git:(dev) sudo npm link   
请输入密码:
验证成功

added 1 package in 713ms
```

使用 npx 运行这个库。例如，`npx zhi-cli`​：

```
➜  zhi-cli git:(dev) npx zhi-cli
Usage: Zhi project creator [options] [command]

Create projects for zhi theme

Options:
  -h, --help             display help for command

Commands:
  init [options] [path]
  help [command]         display help for command
➜  zhi-cli git:(dev)
```

## NPM 测试命令

一旦部署到 NPM 仓库，您可以使用 NPX 运行它，而无需下载库。如果您的库不紧密地与使用它的库/应用程序的工作流程相关，则建议使用此方法。

```json
nx publish zhi-cli --ver=1.2.0 --tag=lates
```

```json
npx zhi-cli
```

结果如下：

```bash
Documents  npx zhi-cli
Need to install the following packages:
  zhi-cli@1.2.1
Ok to proceed? (y) y
Usage: Zhi project creator [options] [command]

Create projects for zhi theme

Options:
  -h, --help             display help for command

Commands:
  init [options] [path]
  help [command]         display help for command
terwer   Documents   
```

## 提供用户体验良好的 UX

> JavaScript 生态系统非常棒，可以通过使用其他库让你的应用程序更加出色。但是，还要记住，当你越来越多地依赖第三方库时，会增加安全漏洞的潜在可能性。

我正在使用两个库显著提高我的项目用户体验。您可以在 [terwer/zhi](https://github.com/terwer/zhi "zhi-cli") 中查看我的使用情况。

## 多种配置库的方式。

有一个神奇的库 [davidtheclark/cosmiconfig: 从 package.json 属性、rc 文件或 CommonJS 模块中查找和加载配置](https://github.com/davidtheclark/cosmiconfig)，它可以帮你完成所有繁琐的工作。

Cosmiconfig 搜索并加载程序的配置。例如，如果您的模块名为“myapp”，cosmiconfig 将在以下位置查找目录树中的配置：

* 在 `package.json`​ 文件中有一个 `myapp`​ 属性
* 在 JSON 或 YAML 格式的 `.myapprc`​ 文件
* 在 `.myapprc.json`​、`.myapprc.yaml`​、`.myapprc.yml`​、`.myapprc.js`​ 或 `.myapprc.cjs`​ 文件中有 `myapprc`​、`myapprc.json`​、`myapprc.yaml`​、`myapprc.yml`​、`myapprc.js`​ 或 `myapprc.cjs`​ 文件
* 在 `.config`​ 子目录内的 `myapprc`​、`myapprc.json`​、`myapprc.yaml`​、`myapprc.yml`​、`myapprc.js`​ 或 `myapprc.cjs`​ 文件
* 一个 CommonJS 模块 `myapp.config.js`​ 或 `myapp.config.cjs`​ 导出一个对象

使用友好的界面与用户交互。

[inquirer - npm](https://www.npmjs.com/package/inquirer) 库是一个收集常见命令行交互式用户界面的集合。一些人在处理参数时会遇到困难，特别是当参数很多时。相反，他们更喜欢与库进行交互，而 inquirer 正是如此。

它在 `create-react-app`​、`create-nx-workspace` ​等许多应用中都表现出色，因此它也应该适用于您。

## 接下来是什么？

就是这样了。您现在已经准备好添加库逻辑了。如有问题欢迎邮件 youweics@163.com 。

## 附加资源

阅读 [如何从 NRWL NX 工作区自动部署到 NPM 和 Github 包](https://sakalim.com/content/how-to-deploy-automatically-to-npm-and-github-packages-from-nrwl-nx-workspace)，以支持使用 GitHub Actions 和语义版本发布进行自动部署。

阅读[在开发过程中使用 CLI 库的实用技巧](https://sakalim.com/content/handy-tips-when-working-on-cli-library-during-development)，了解一些有用的开发技巧。

如果您正在使用 GitHub 包管理器，请阅读[如何在您的仓库以及 Github Actions 中使用私有 GitHub 包](https://sakalim.com/content/how-to-use-private-github-packages-in-your-repository-and-with-github-actions)。

## 参考

[https://dev.to/eransakal/create-a-nodejs-command-line-library-with-nrwl-nx-workspace-5hin](https://dev.to/eransakal/create-a-nodejs-command-line-library-with-nrwl-nx-workspace-5hin)

‍
