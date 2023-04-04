---
title: 使用TypeScript开发一个自定义的Node-js前端开发脚手架
short_title: ''
description: 使用typescript开发一个自定义的nodejs前端开发脚手架本文将从零开始介绍如何用nodejs​和typescript​​开发脚手架。可用版本的github地址_zhiclinpm的地址_zhicli需求来源如果我们之前花很大力气搭建了一个项目开发工具包但是有了新项目想用咋办常规办法就是拷贝模板文件。但是每次拷贝模版再去修改总是麻烦的不如来开发一个脚手架用命令行生成新的nodejs项目。什么是脚手架？我们都用过脚手架像vuecli​reactnativecli​expressgenerator​等
date: 2023-03-08 11:28:08
category:
  - 前端开发
tag:
  - 项目
  - 脚手架
  - 开发
  - 前端
  - cli
  - ts
  - typescript
article: true
timeline: false
---
本文将从零开始介绍如何用 `Node.js`​ 和 `TypeScript`​​ 开发脚手架。

可用版本的 github 地址：[zhi-cli](https://github.com/terwer/zhi-cli)

npm 的地址：[zhi-cli](https://www.npmjs.com/package/zhi-cli)

## 需求来源

如果我们之前花很大力气搭建了一个项目开发工具包，但是有了新项目想用咋办，常规办法就是拷贝模板文件。但是每次拷贝模版再去修改，总是麻烦的，不如来开发一个脚手架，用命令行生成新的 Node.js 项目。

## 什么是脚手架？

我们都用过脚手架，像 `vue-cli`​ 、`react-native-cli`​ 、`express-generator`​ 等等。

脚手架提供这些的功能：

* 快速初始化项目
* 保证协作团队项目的统一
* 添加通用的组件或者配置

## 确定脚手架要提供什么样的功能？

我们的脚手架起名为 `zhi-cli`​，顾名思义，这是一个 `zhi`​ 系列项目的生成器，主要功能是生产 `zhi`​ 相关项目，拆分细节，我们的功能点有以下这些。

* 下载 zhi 模板代码到本地。
* 接收用户输入的项目名称、描述等，用于确定目录名称和修改 `package`​ 文件。
* 接收用户的输入，定制项目内容（比如对中间件的选择）。
* 查看 help 和 version。
* 对创建进度和创建结果，给出反馈。

## 开始操作

确定了需求之后，我们开始按部就班，操作起来！

## 准备工作

### 创建 npm 项目

首先创建 npm 项目。

```bash
npm i -g pnpm
pnpm init
```

然后补充必要的信息，其中 main 是入口文件，bin 用于引入一个全局的命令，映射到 lib/index.js，有了 bin 字段后，我们就可以直接运行 `zhi-cli`​ 命令，而不需要 `node lib/index.js`​ 了。

```json
// package.json
{
  "name": "zhi-cli",
  "version": "0.0.1",
  "description": "zhi application generator",
  "main": "lib/index.js",
  "type": "module",
  "bin": {
    "zhi-cli": "lib/index.js"
  },
  "repository": "terwer/zhi-cli",
  "homepage": "https://terwer.space",
  "keywords": [
    "zhi",
    "zhi-cli",
    "cli"
  ],
  "author": "terwer",
  "license": "MIT"
}
```

### 支持用 ES6 和 TypeScript 开发

安装 `typescript` ​和 `@types/node`​。

```bash
pnpm add typescript @types/node -D
```

初始化 `tsconfig.json`​

```bash
tsc --init
```

然后按我们工程的实际情况，修改下入口和输出。

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "es2016",
    "module": "ESNext",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "sourceMap": true,
    "outDir": "./lib",
  },
  "include": [".eslintrc.js", "src/**/*"],
  "exclude": ["node_modules", "lib/**/*"],
}
```

我们在 `src/index.ts` ​写个 hello world，测试下 ts 编译是否正常。

```typescript
// src/index.ts
#!/usr/bin/env node --experimental-specifier-resolution=node
const msg: string = 'Hello World'
console.log(msg)
```

然后执行 `tsc`​，可以看到 `lib/index.js`​ 输出了编译后的 js 文件，而且 `node --experimental-specifier-resolution=node lib/index.js` 输出正常。

```bash
➜  zhi-cli git:(main) ✗ tsc   
➜  zhi-cli git:(main) ✗ node --experimental-specifier-resolution=node lib/index.js
Hello World
```

也可以不编译，安装 ts-node，更简洁的调试：

安装 ts-node

```bash
pnpm add ts-node -D
```

调试

```bash
node --experimental-specifier-resolution=node --loader ts-node/esm src/index.ts
```

这一 part 完成。

## 引入 ESLint

安装 ESLint 和其 ts 插件。

```bash
pnpm add eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-prettier prettier
```

然后加上 `.eslintrc.js` ​配置。

```javascript
// .eslintrc.cjs
module.exports = {
  root: true,

  env: {
    browser: true,
    node: true,
    es2021: true
  },

  parser: "@typescript-eslint/parser",

  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
    tsconfigRootDir: __dirname,
    parser: "@typescript-eslint/parser",
    project: ["./tsconfig.json"]
  },

  plugins: ["@typescript-eslint"],

  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],

  rules: {
    // Note: you must disable the base rule as it can report incorrect errors
    "semi": "off",
    "quotes": "off",
    "@typescript-eslint/semi": ["error", "never"],
    "@typescript-eslint/quotes": ["error", "double"]
  }
}
```

验收一下，`package.json`​ ​加上两条命令。

```json
// package.json
"scripts": {
    "lint": "eslint --ext .ts .",
    "lint:fix": "eslint --fix --ext .ts ."
},
```

运行 `npm run lint:fix`​，没有异常，完成！

## npm link 本地调试

记得我们前面在 `package.json`​ 中有个 `bin`​ 配置，那我们直接跑 `zhi-cli`​ 这个命令试试。

```bash
➜  zhi-cli git:(main) zhi-cli
zsh: command not found: zhi-cli
```

！！！嗯？原来我们现在的 npm 包还没发布和安装，没办法找到命令，为了方便调试，我们需要跑一下这个命令。

```bash
npm link
```

重新 `zhi-cli`​，可以了！

为了方便调试，我们在 `package.json`​ ​中再加两个配置，用于调试和打包。

可以把这一块封装成 `scripts`​ ：

```json
// package.json
"scripts": {
  "dev": "node --experimental-specifier-resolution=node --loader ts-node/esm src/index.ts",
  "build": "tsc",
  "start": "node --experimental-specifier-resolution=node lib/index.js"
},
```

## 命令行工具开发

接下来我们开始真正的脚手架开发。

### commander 处理命令

我们用到 [commander](https://www.npmjs.com/package/commander "commander") 来处理命令。`commander`​ 是一个用于简化 `node.js`​ 命令行开发的库。

安装 `commander`​。

```bash
pnpm add commander -D 
```

我们先从简单的开始，接收一个输入作为新建工程的名称，先不做处理直接输出出来。

```ts
// src/index.ts
#!/usr/bin/env node --experimental-specifier-resolution=node
import { Command } from "commander"

const program = new Command()

program
    .name("zhi-cli")
    .description("zhi+TypeScript application generator")
    .version("0.0.1")

program
    .command("init <name>")
    .description("init a zhi project")
    .action((name: string) => {
        console.log("start init zhi project:", name)
    })

program.parse()
```

​`tsc` ​后，运行 `​ zhi-cli init firstProject`​，成功输出 `start init zhi project: firstProject`​，可以了！

```bash
➜  zhi-cli git:(main) zhi-cli init firstProject

> zhi-cli@0.0.1 dev /Users/terwer/Documents/mydocs/zhi-cli
> tsc && node lib/index.js "init" "firstProject"

start init zhi project: firstProject
➜  zhi-cli git:(main) 
```

注意：顶部需要加上 `#!/usr/bin/env node`​

参考：[https://docs.npmjs.com/cli/v8/configuring-npm/package-json#bin](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#bin)

## inquirer 处理交互

下面开始搞用户交互。

为了脚手架尽量简单易用，我们先只运行用户有少量的交互操作，[inquirer](https://www.npmjs.com/package/inquirer "inquirer") 是简化 node.js 命令行开发的一个库。

我们先确定交互有哪些，思考一下，我们先确定有下面这几个交互。

* 输入项目描述
* 输入项目作者

安装 `inquirer`​。

```bash
pnpm add inquirer @types/inquirer
```

继续完善一下代码，添加交互提示。

```ts
// src/index.ts
#!/usr/bin/env node --experimental-specifier-resolution=node
import {Command} from "commander"
import inquirer from "inquirer"

const InitPrompts = [
    {
        name: "description",
        message: "please input description",
        default: "",
    },
    {
        name: "author",
        message: "please input author",
        default: "",
    }
]

const program = new Command()

program
    .name("zhi-cli")
    .description("TypeScript application generator for zhi")
    .version("0.0.1")

program
    .command("init <name>")
    .description("init a zhi project")
    .action(async (name: string) => {
        console.log("start init zhi project:", name)
        const initOptions = await inquirer.prompt(InitPrompts)
        console.log("initOptions", initOptions)
    })

program.parse()
```

好了，现在我们试验一下。运行 `pnpm dev init myproject`​，输出下面的结果。

```ts
➜  zhi-cli git:(main) ✗ pnpm dev init myproject

> zhi-cli@0.0.1 dev /Users/terwer/Documents/mydocs/zhi-cli
> tsc && node lib/index.js "init" "myproject"

start init zhi project: myproject
? please input description test project
? please input author terwer
initOptions { description: 'test project', author: 'terwer' }
```

OK，没问题，继续下一 part 。

## git-clone 下载模板

不使用 `download-git-repo` ​是因为这个库有些依赖有安全问题，且已经不在维护。

我们使用 [git-clone](https://www.npmjs.com/package/git-clone "git-clone") 这个库来下载 git 上的模板，这个库更小而且功能也够用。

安装 `git-clone`​。

```bash
pnpm add git-clone fs-extra @types/git-clone @types/fs-extra
```

新建一个 `download.ts`​​，加上下载模板的代码，并在 `index.ts`​ ​中引用。

```typescript
// src/download.ts
import gitclone from "git-clone"
import fs from "fs-extra"
import path from "path"

export const downloadTemplate = async (templateGitUrl: string, downloadPath: string) => {
    let ret
    try {
        await gitclone(templateGitUrl, downloadPath, {checkout: "main", shallow: true})
        fs.removeSync(path.join(downloadPath, ".git"))
        ret = "download success"
    } catch (error) {
        ret = error
    }
    return ret
}
```

```ts
// src/index.ts
#!/usr/bin/env node --experimental-specifier-resolution=node
import {Command} from "commander"
import inquirer from "inquirer"
import {downloadTemplate} from "./download"

const templateGitUrl = "https://github.com/terwer/zhi-log"
let downloadPath = null

const InitPrompts = [
    {
        name: "description",
        message: "please input description",
        default: "",
    },
    {
        name: "author",
        message: "please input author",
        default: "",
    }
]

const program = new Command()

program
    .name("zhi-cli")
    .description("TypeScript application generator for zhi")
    .version("0.0.1")

program
    .command("init <name>")
    .description("init a zhi project")
    .action(async (name: string) => {
        console.log("start init zhi project:", name)
        const initOptions = await inquirer.prompt(InitPrompts)
        console.log("initOptions", initOptions)

        try {
            downloadPath = `./${name}`
            await downloadTemplate(templateGitUrl, downloadPath)
        } catch (error) {
            console.error(error)
        }
    })

program.parse()
```

注意！！下载完模板，要删除 `.git`​ 目录。

运行 `npm run dev init myproject`​​，发现 myproject 目录被创建了，而且下载了 github 仓库的内容。

​![](https://img1.terwer.space/api/public/202303081539853.png)​

又搞定一个，继续继续！！

## handlebars 语义化模板

继续完善，接下来我们要用输入的名称和描述、作者等文本，替换模板的对应字段。

在替换前，我们需要修改模板的 `package.json`​，添加一些插槽，方便后面替换。

```json
// 模板仓库的package.json
{
  "name": "{{name}}",
  "version": "1.0.0",
  "description": "{{description}}",
  "author": "{{author}}"
}
```

下面开始修改 `package.json`​。

安装 `handlebars`​。

```bash
pnpm add handlebars -D
```

开始修改 `package.json`​。

```typescript
// src/modify.ts
import fs from "fs-extra"
import path from "path"
import handlebars from "handlebars"

export const modifyPackageJson = function (downloadPath: string, options: any) {
  console.log("modifying package.json……")
  const packagePath = path.join(downloadPath, "package.json")
  if (fs.existsSync(packagePath)) {
    const content = fs.readFileSync(packagePath).toString()
    const template = handlebars.compile(content)

    const param = {
      name: options.name,
      description: options.description,
      author: options.author,
    }

    const result = template(param)
    fs.writeFileSync(packagePath, result)
    console.log("modify package.json complete")
  } else {
    throw new Error("no package.json")
  }
}
```

```ts
// src/index.ts
#!/usr/bin/env node --experimental-specifier-resolution=node
import { Command } from "commander"
import inquirer from "inquirer"
import { downloadTemplate } from "./download"
import { modifyPackageJson } from "./modify"

const templateGitUrl = "https://github.com/terwer/zhi-log"
let downloadPath = null

const InitPrompts = [
  {
    name: "description",
    message: "please input description",
    default: "",
  },
  {
    name: "author",
    message: "please input author",
    default: "",
  },
]

const program = new Command()

program
  .name("zhi-cli")
  .description("TypeScript application generator for zhi")
  .version("0.0.1")

program
  .command("init <name>")
  .description("init a zhi project")
  .action(async (name: string) => {
    console.log("start init zhi project:", name)
    const initOptions = await inquirer.prompt(InitPrompts)
    console.log("initOptions", initOptions)

    try {
      downloadPath = `./${name}`
      await downloadTemplate(templateGitUrl, downloadPath)
      await modifyPackageJson(downloadPath, { name, ...initOptions })
    } catch (error) {
      console.error(error)
    }
  })

program.parse()
```

## ora 命令行美化

功能部分已经完成了，但是现在的提示比较简陋。

我们来升级一下。

安装 `ora`​。

```bash
pnpm add ora
```

我们美化下输出。

```ts
// src/download.ts
import gitclone from "git-clone/promise"
import fs from "fs-extra"
import path from "path"
import ora from "ora"

export const downloadTemplate = (
  templateGitUrl: string,
  downloadPath: string
) => {
  const loading = ora("download template")
  return new Promise((resolve, reject) => {
    loading.start("start download template")

    gitclone(templateGitUrl, downloadPath, {
      checkout: "master",
      shallow: true,
    })
      .then((r) => {
        fs.removeSync(path.join(downloadPath, ".git"))
        loading.succeed("download success")
        loading.stop()

        resolve("download success")
      })
      .catch((error) => {
        loading.stop()
        loading.fail("download fail")

        reject(error)
      })
  })
}

```

```ts
// src/modify.ts
import fs from "fs-extra"
import path from "path"
import handlebars from "handlebars"
import ora from "ora"

const log = ora("modify")

export const modifyPackageJson = function (downloadPath: string, options: any) {
  const packagePath = path.join(downloadPath, "package.json")
  log.start("start modifying package.json")
  if (fs.existsSync(packagePath)) {
    const content = fs.readFileSync(packagePath).toString()
    const template = handlebars.compile(content)

    const param = {
      name: options.name,
      description: options.description,
      author: options.author,
    }

    const result = template(param)
    fs.writeFileSync(packagePath, result)
    log.stop()
    log.succeed("modify package.json complate")
  } else {
    log.stop()
    log.fail("modify package.json fail")
    throw new Error("no package.json")
  }
}
```

再运行下，这次有了 loading 动画，美观多了。

## 支持传入指定分支

```ts
// src/index.ts
#!/usr/bin/env node --experimental-specifier-resolution=node
import { Command } from "commander"
import inquirer from "inquirer"
import { downloadTemplate } from "./download"
import { modifyPackageJson } from "./modify"

const templateGitUrl = "https://github.com/terwer/zhi-ts-template"
let downloadPath = null

const InitPrompts = [
  {
    name: "description",
    message: "please input description",
    default: "",
  },
  {
    name: "author",
    message: "please input author",
    default: "",
  },
]

const program = new Command()

program
  .name("zhi-cli")
  .description("TypeScript application generator for zhi")
  .version("0.0.1")

program
  .command("init <name> <branch>")
  .description("init a zhi project")
  .action(async (name: string, branch: string) => {
    console.log("start init zhi project:", name)
    const b = branch ?? "main"
    console.log("current branch:", b)
    const initOptions = await inquirer.prompt(InitPrompts)
    console.log("initOptions", initOptions)

    try {
      downloadPath = `./${name}`
      await downloadTemplate(templateGitUrl, downloadPath,b)
      modifyPackageJson(downloadPath, { name, ...initOptions })
      console.log("project created.")
    } catch (error) {
      console.error(error)
    }
  })

program.parse()
```

```ts
// src/download.ts
import gitclone from "git-clone/promise"
import fs from "fs-extra"
import path from "path"
import ora from "ora"

export const downloadTemplate = (
  templateGitUrl: string,
  downloadPath: string,
  branch: string
) => {
  const loading = ora("download template")
  return new Promise((resolve, reject) => {
    loading.start("start download template")

    gitclone(templateGitUrl, downloadPath, {
      checkout: branch,
      shallow: true,
    })
      .then((r) => {
        fs.removeSync(path.join(downloadPath, ".git"))
        loading.succeed("download success")
        loading.stop()

        resolve("download success")
      })
      .catch((error) => {
        loading.stop()
        loading.fail("download fail")

        reject(error)
      })
  })
}
```

命令

```bash
## default
zhi-cli init my-project main

## ts-cli
zhi-cli init my-project ts-cli

## ts-vite-lib
zhi-cli init my-project ts-vite-lib

## ts-vite-vue
zhi-cli init my-project ts-vite-vue

## ts-vite-react
zhi-cli init my-project ts-vite-react
```

## 总结

本文实现了最简单的一个 zhi 生成器组件，实现的理念是，脚手架和模板都尽可能的简单。

> 文章更新历史  
> 2022-03-08 feat:初稿

‍