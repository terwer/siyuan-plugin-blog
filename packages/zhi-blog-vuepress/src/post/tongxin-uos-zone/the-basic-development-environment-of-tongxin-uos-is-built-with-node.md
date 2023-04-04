---
title: 统信 UOS 基本开发环境搭建之 node
short_title: ''
description: 注意，此方法已经不推荐。建议使用系统方式安装。
date: 2022-06-08 01:24:41
category:
  - 统信UOS专区
  - UOS专区
tag:
  - uos
  - uos-home
  - deepin
  - node
article: true
timeline: false
---
## node

:::warning

注意：此方法已经不推荐。建议使用系统方式安装，参考：

[统信 UOS 利用 Github 打造 Typora 图床](/post/tongxin-uos-uses-github-to-build-typora-image-bed.html)

:::

```bash
cp /media/psf/share/portable-linux-sync/app/node-v16.15.0-linux-x64.tar.xz ~/app
tar -xvf node-v16.15.0-linux-x64.tar.xz
rm node-v16.15.0-linux-x64.tar.xz
```

node 环境变量

```bash
vim ~/my_prifile.sh
```

加上如下配置

```bash
# node env
export NODE_HOME=/home/terwer/app/node-v16.15.0-linux-x64
export PATH=$NODE_HOME/bin:$PATH
```

检测

```bash
➜  ~ node -v
v16.15.0
➜  ~ npm -v 
8.5.5
```

安装 yarn

```bash
npm install --global yarn
```

检测

```bash
yarn -v
```

设置 node 和 yarn 为国内源

```bash
# node
npm set registry https://registry.npm.taobao.org && \npm set disturl https://npm.taobao.org/dist && \npm set sass_binary_site https://npm.taobao.org/mirrors/node-sass && \npm set electron_mirror https://npm.taobao.org/mirrors/electron && \npm set puppeteer_download_host https://npm.taobao.org/mirrors && \npm set chromedriver_cdnurl https://npm.taobao.org/mirrors/chromedriver && \npm set operadriver_cdnurl https://npm.taobao.org/mirrors/operadriver && \npm set phantomjs_cdnurl https://npm.taobao.org/mirrors/phantomjs && \npm set selenium_cdnurl https://npm.taobao.org/mirrors/selenium && \npm set node_inspector_cdnurl https://npm.taobao.org/mirrors/node-inspector && \npm cache clean --force

# yarn
yarn config set registry https://registry.npm.taobao.org --global  && \yarn config set disturl https://npm.taobao.org/dist --global && \yarn config set sass_binary_site https://npm.taobao.org/mirrors/node-sass --global  && \yarn config set electron_mirror https://npm.taobao.org/mirrors/electron/ --global  && \yarn config set puppeteer_download_host https://npm.taobao.org/mirrors --global  && \yarn config set chromedriver_cdnurl https://npm.taobao.org/mirrors/chromedriver --global  && \yarn config set operadriver_cdnurl https://npm.taobao.org/mirrors/operadriver --global  && \yarn config set phantomjs_cdnurl https://npm.taobao.org/mirrors/phantomjs --global  && \yarn config set selenium_cdnurl https://npm.taobao.org/mirrors/selenium --global  && \yarn config set node_inspector_cdnurl https://npm.taobao.org/mirrors/node-inspector --global
```