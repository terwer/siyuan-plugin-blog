---
title: Github-Actions使用release-please实现自动发版
short_title: ''
description: githubactions使用releaseplease实现自动发版​releaseplease​​是一个来自于google​​的自动发版工具基于githubactions​可实现全自动发版。官网_https_githubcomgoogleapisreleaseplease上手在项目根目录的github​的workflows​里面新建一个releasepleaseyml​文件下面是一个标准的node​项目的标准配置_on_push_branches_mainname_releasepleasejobs_r
date: 2023-03-06 21:38:33
category:
  - 开发效率
  - 开发流程
tag:
  - 自动
  - 发版
  - release
  - release-please
  - google
article: true
timeline: false
---
​`release please`​​ 是一个来自于 `Google`​​ 的自动发版工具，基于 `Github Actions`​ 可实现全自动发版。

官网：[https://github.com/googleapis/release-please](https://github.com/googleapis/release-please)

## 上手

在项目根目录的 `.github`​ 的 `workflows`​ 里面新建一个 `release-please.yml`​ 文件，下面是一个标准的 `node`​ 项目的标准配置：

```yaml
on:
  push:
    branches:
      - main
name: release-please
jobs:
  release-please:
    runs-on: ubuntu-latest
    steps:
      - uses: google-github-actions/release-please-action@v3
        id: release
        with:
          release-type: node
          package-name: release-please-action
      # Checkout
      - uses: actions/checkout@v3
        if: ${{ steps.release.outputs.release_created }}
      # Setup node
      - uses: actions/setup-node@v3
        with:
          node-version: 16
          registry-url: 'https://registry.npmjs.org'
        if: ${{ steps.release.outputs.release_created }}
      # Setup pnpm
      - uses: pnpm/action-setup@v2
        if: ${{ steps.release.outputs.release_created }}
      # Install dependencies
      - run: pnpm install
        if: ${{ steps.release.outputs.release_created }}
      # Build output
      - run: pnpm build
        if: ${{ steps.release.outputs.release_created }}
      # Publish to npm
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{secrets.NPM_TOKEN}}
        if: ${{ steps.release.outputs.release_created }}
```

提交之后，正常情况就会在 `main`​​ 分支的 `push`​​ 事件触发之时，启动自动发版，包括发布到 `npm`​​ 仓库。

**注意 1：任务运行完毕后并不是直接就发版了，而是会新建一个 pr，可以检查 pr 内容，需要发版，就合并。如果暂时不发版，可以直接关闭这个 pr。**

​![](https://static.terwergreen.com/test/202303062218788.png)​

**注意 2：pr 会自动递增版本号，所以不要提前手动更改版本号。node 项目的版本号是 package.json 里面的 version 字段，格式是：x.x.x 。**

**版本号规则是：**

**feat:-&gt;大版本，例如：1.0.0-&gt;1.1.0**

**fix:-&gt;小版本，例如：1.0.0-&gt;1.0.1**

**feat!:,  fix!:, refactor!:-&gt;主要版本，例如：1.0.0-&gt;2.0.0**

如果从未发过版本，那么初始是 `1.0.0`​ 。

​![](https://static.terwergreen.com/test/202303062219276.png)​

‍

另外，如果不需要发布到 `npm`​ ，可以使用下面的配置：

```yaml
on:
  push:
    branches:
      - main
name: release-please
jobs:
  release-please:
    runs-on: ubuntu-latest
    steps:
      - uses: google-github-actions/release-please-action@v3
        id: release
        with:
          release-type: node
          package-name: release-please-action
```

‍

## 注意事项

* 配置 npm token （可选，如果不需要发布到 npm 可忽略）

  去 [https://www.npmjs.com/settings/terwer/tokens](https://www.npmjs.com/settings/terwer/tokens) 申请一个 `token`​ ，然后再项目里面设置：

  Settings -> Secrets and variables -> Actions -> `New repository secret`​ ，新建一个即可。

* ​`Github`​ 仓库权限设置

  注意：默认的 Github 仓库不允许拉取，需要开启权限才行。方法如下：

  转到 `https://github.com/OWNER/REPO/settings/actions`​ 页面向下划到 **Workflow Permissions** 然后切换到 **Read and Write permissions 。**

  ​![](https://static.terwergreen.com/test/202303062150540.png)​

> 文章更新历史
> 2023-03-06 feat:初稿

‍