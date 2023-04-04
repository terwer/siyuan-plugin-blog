---
title: babel运行nodejs
short_title: ''
description: 安装依赖yarnadd@babelcore@babelcli@babelnode@babelpresetenvd或者全局安装yarnglobaladd@babelcore@babelcli@babelnode@babelpresetenv注意_全局安装需要把yarn的全局目录添加到windows的path查找path命令如下yarnglobalbin不建议全局安装很多时候以来都成问题完整的依赖{_{}_{}}配置babelrc{_[[{}]]}接下来运行即可编译babeltestjs编译与执行babeln
date: 2022-07-24 17:24:44
category:
  - 前端开发
tag:
  - 安装
  - 全局
  - 运行
  - 依赖
  - 编译
article: true
timeline: false
---
安装依赖

```bash
yarn add @babel/core @babel/cli @babel/node @babel/preset-env -D
```

~~或者全局安装~~

```bash
yarn global add @babel/core @babel/cli @babel/node @babel/preset-env
```

<u>注意：全局安装需要把yarn的全局目录添加到Windows的path，查找path命令如下</u>

```bash
yarn global bin
```

~~不建议全局安装，很多时候以来都成问题~~

完整的依赖

```json
{
  "dependencies": {
    "core-js": "^3.8.3"
  },
  "devDependencies": {
    "@babel/cli": "^7.18.9",
    "@babel/node": "^7.18.9",
    "@babel/preset-env": "^7.18.9"
  }
}
```

配置 .babelrc

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "entry",
        "corejs": "3.8.3"
      }
    ]
  ]
}
```

接下来运行即可

编译

```bash
babel test.js
```

编译与执行

```bash
babel-node test.js
```

## 参考

[https://babeljs.io/docs/en/babel-preset-env](https://babeljs.io/docs/en/babel-preset-env)

‍