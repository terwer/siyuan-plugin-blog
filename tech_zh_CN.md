# zhi

这是使用 [turborepo](https://turbo.build/repo) 和 [pnpm workspace](https://pnpm.io/workspaces) 搭建的 zhi 主题的所有源码

## 里面有什么？

本项目使用 turborepo 构建，并使用 [pnpm](https://pnpm.io) 作为包管理器。它包括以下包含的子项目 ：

### 子项目

- `zhi-cli`：zhi 项目的脚手架，它本身也是用 `zhi-cli` 生成的
- `web`：另一个[Next. js]（https://nextjs.org/）应用程序
-'用户界面'：'web'和'docs'应用程序共享的存根React组件库
-'eslint-config-自定义'：'eslint'配置（包括'eslint-config-next'和'eslint-config-漂亮'）
-'tsconfig'：'tsconfig. json在整个monorepo中使用

每个包/应用程序都是100%[TypeScript]（https://www.typescriptlang.org/）。

###实用程序

这款Turborepo已经为您设置了一些额外的工具：

-[TypeScript]（https://www.typescriptlang.org/）用于静态类型检查
-[ESLint]（https://eslint.org/）用于代码lint
https://prettier.io）用于代码格式化

###构建

要构建所有应用程序和包，请运行以下命令：

“”
cd my-turborepo
pnpm运行构建
“”

###开发

要开发所有应用程序和包，请运行以下命令：

“”
cd my-turborepo
pnpm运行开发
“”

###远程缓存

Turborepo可以使用一种称为[远程缓存]（https://turbo.build/repo/docs/core-concepts/remote-caching）的技术来跨机器共享缓存工件，使您能够与您的团队和CI/CD管道共享构建缓存。

默认情况下，Turborepo将在本地缓存。要启用远程缓存，您需要一个Vercel帐户。如果您没有帐户，您可以[创建一个]（https://vercel.com/signup），然后输入以下命令：

“”
cd my-turborepo
pnpm dlx turbo登录
“”

这将使用您的[Vercel帐户]（https://vercel.com/docs/concepts/personal-accounts/overview）验证Turborepo CLI。

接下来，您可以通过从turborepo的根目录运行以下命令将Turborepo链接到远程缓存：

“”
pnpm dlx turbo link
“”

##有用的链接

了解有关Turborepo强大功能的更多信息：

-[任务]（https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks）
-[缓存]（https://turbo.build/repo/docs/core-concepts/caching）
-[远程缓存]（https://turbo.build/repo/docs/core-concepts/remote-caching）
-[过滤]（https://turbo.build/repo/docs/core-concepts/monorepos/filtering）
-[配置选项]（https://turbo.build/repo/docs/reference/configuration）
-[CLI用法]（https://turbo.build/repo/docs/reference/command-line-reference）