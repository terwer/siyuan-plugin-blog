---
title: 使用cross-fetch替换node-fetch和isomorphic-fetch
short_title: ''
description: 安装yarnaddcrossfetch使用importfetchfromcrossfetch_polyfill的使用方式importcrossfetchpolyfill_
date: 2022-08-20 22:48:47
category:
  - 前端开发
tag:
  - 使用
  - 安装
  - 方式
  - cross
  - fetch
  - ponyfill
  - polyfill
  - y
  - a
article: true
timeline: false
---
安装

```ts
yarn add cross-fetch
```

使用

```ts
import fetch from 'cross-fetch';
```

polyfill的使用方式

```ts
import 'cross-fetch/polyfill';
```