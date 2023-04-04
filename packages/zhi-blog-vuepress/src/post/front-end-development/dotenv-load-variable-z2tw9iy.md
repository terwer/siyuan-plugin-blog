---
title: dotenv加载变量
short_title: ''
description: '@tsignoreimportdotenvfromdotenvimportpathfrompath_初始化测试环境变量exportconstinittestenv=()={const__dirname=pathdirname(importmetaurl)_constenvpath=pathrelative(processcwd()pathjoin(__dirnameenvdevelopmentlocal))replace()consolelog(envpath)dotenvconfig({path_env'
date: 2022-08-20 21:32:47
category:
  - 前端开发
tag:
  - 测试
  - 初始化
  - 环境变量
  - 另外
  - 文件
  - env
  - dotenv
article: true
timeline: false
---
```ts
// @ts-ignore
import dotenv from 'dotenv'
import path from 'path';

/**
 * 初始化测试环境变量
 */
export const initTestEnv = () => {
    const __dirname = path.dirname(import.meta.url);
    const envPath = path.relative(process.cwd(), path.join(__dirname, '../.env.development.local')).replace("file:\\", "")
    // console.log(envPath)
    dotenv.config({path: envPath});
    // console.log(process.env.VITE_LIANDI_API_URL)
    console.log("env loaded.")
}
```

另外 ts-node测试单文件的方法

```ts
  "test-script": "node --experimental-specifier-resolution=node --loader ts-node/esm test/test.ts",
  "testEsm-script": "ts-node-esm --experimental-specifier-resolution=node test/test.ts",
```