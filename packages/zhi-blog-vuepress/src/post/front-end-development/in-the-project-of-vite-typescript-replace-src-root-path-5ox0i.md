---
title: 在Vite+TypeScript的项目中使用~和@代替src根路径的方法
short_title: ''
description: 原由当前端项目组件比较多的时候引用组件会面临路径特别长的情况不易维护且容易出错。定义绝对路径映射是个好办法下面就介绍vitetypescript的项目中中的具体实现。方案​viteconfigts​resolve_{alias_{)}}​tsconfigjson​{_{_{]}}使用import{api_type_constants}fromimportmetaweblogmainfrom原来的import{api_type_constants}fromimportmetaweblogmainfrom
date: 2022-11-22 17:25:36
category:
  - 前端开发
tag:
  - 项目
  - 组件
  - vite
  - typescript
  - src
  - relative
  - path
  - 相对路径
  - 绝对路径
  - vue
  - vue3
article: true
timeline: false
---
## 原由

当前端项目组件比较多的时候，引用组件会面临路径特别长的情况，不易维护且容易出错。定义绝对路径映射是个好办法，下面就介绍 Vite+TypeScript 的项目中中的具体实现。

## 方案

* ​`vite.config.ts`​

  ```typescript
  resolve: {
      alias: {
          "~": path.resolve(path.dirname(fileURLToPath(import.meta.url)), "src"),
  	}
  }
  ```

* ​`tsconfig.json`​

  ```typescript
  {
    "compilerOptions": {
      "paths": {
        "~/*": ["./src/*"]
      }
  }
  ```

使用

```typescript
import {API_TYPE_CONSTANTS} from "~/utils/constants/apiTypeConstants";
import MetaweblogMain from "~/components/publish/tab/main/MetaweblogMain.vue";

// 原来的
// import {API_TYPE_CONSTANTS} from "../../../../../../utils/constants/apiTypeConstants";
// import MetaweblogMain from "../../MetaweblogMain.vue";
```