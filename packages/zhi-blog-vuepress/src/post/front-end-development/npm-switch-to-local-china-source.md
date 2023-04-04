---
title: npm切换为阿里云国内源码
short_title: ''
description: npm切换为阿里云国内源码npmnpmconfigsetregistryhttps//registrynpmmirrorcom/pnpmnpminstallgpnpmpnpmconfigsetregistryhttps//registrynpmmirrorcom/pnpmconfigsetelectron_mirrorhttps//npmmirrorcom/mirrors/electron/yarnnpminstallgyarn
date: 2022-07-11 03:07:00
category:
  - 前端开发
tag:
  - npm
  - pnpm
  - yarn
article: true
timeline: false
---
# npm切换为阿里云国内源码

## npm

```bash
npm config set registry https://registry.npmmirror.com/
```

## pnpm

```bash
npm install -g pnpm
pnpm config set registry https://registry.npmmirror.com/
pnpm config set electron_mirror https://npmmirror.com/mirrors/electron/
```

## yarn

```bash
npm install -g yarn
```