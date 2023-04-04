---
title: yarn和npm设置国内镜像源
short_title: ''
description: feat_更新最新镜像地址。由于npm包部分依赖下载速度缓慢最好使用国内镜像源来解决一般使用淘宝开源的镜像。安装yarnnpmigyarnyarn设置国内源yarnconfigsetregistryhttps_registrynpmmirrorcomglobalyarnconfigsetdisturlhttps_npmmirrorcompackagedistglobalyarnconfigsetsass_binary_sitehttps_cdnnpmmirrorcombinariesnodesassglo
date: 2022-08-16 20:10:25
category:
  - 前端开发
tag:
  - 镜像
  - 国内
  - 使用
  - 设置
  - 更新
article: true
timeline: false
---
2022-08-16 feat:更新最新镜像地址。

由于 npm 包部分依赖下载速度缓慢，最好使用国内镜像源来解决，一般使用淘宝开源的镜像。

## 安装 yarn

```bash
npm i -g yarn
```

## yarn 设置国内源

```bash
yarn config set registry https://registry.npmmirror.com/ --global  && \
yarn config set disturl https://npmmirror.com/package/dist --global && \
yarn config set sass_binary_site https://cdn.npmmirror.com/binaries/node-sass --global  && \
yarn config set electron_mirror https://registry.npmmirror.com/binary.html?path=electron/ --global  && \
yarn config set puppeteer_download_host https://registry.npmmirror.com/binary.html --global  && \
yarn config set chromedriver_cdnurl https://cdn.npmmirror.com/binaries/chromedriver --global  && \
yarn config set operadriver_cdnurl https://cdn.npmmirror.com/binaries/operadriver --global  && \
yarn config set phantomjs_cdnurl https://cdn.npmmirror.com/binaries/phantomjs --global  && \
yarn config set selenium_cdnurl https://cdn.npmmirror.com/binaries/selenium --global  && \
yarn config set node_inspector_cdnurl https://cdn.npmmirror.com/binaries/node-inspector --global
```

## npm 设置国内源

```bash
npm set registry https://registry.npmmirror.com/ && \
npm set disturl https://npmmirror.com/package/dist && \
npm set sass_binary_site https://cdn.npmmirror.com/binaries/node-sass && \
npm set electron_mirror https://registry.npmmirror.com/binary.html?path=electron/ && \
npm set puppeteer_download_host https://registry.npmmirror.com/binary.html && \
npm set chromedriver_cdnurl https://cdn.npmmirror.com/binaries/chromedriver && \
npm set operadriver_cdnurl https://cdn.npmmirror.com/binaries/operadriver && \
npm set phantomjs_cdnurl https://cdn.npmmirror.com/binaries/phantomjs && \
npm set selenium_cdnurl https://cdn.npmmirror.com/binaries/selenium && \
npm set node_inspector_cdnurl https://cdn.npmmirror.com/binaries/node-inspector && \
npm cache clean --force
```

‍