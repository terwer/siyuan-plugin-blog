---
title: 从零开始写一个vuepress插件
short_title: ''
description: 初始化插件项目在任意目录新建一个插件目录我这里在pkgvuepresspluginsimpleencryptmkdirpkgvuepresspluginsimpleencrypt进入该目录初始化项目yarninit输入插件名vuepresspluginsimpleencrypt入口文件名indexjs其他选项对应填写即可。初始化之后packagejson的文件内容_{_{}_{}_[]_{}}编写入口文件indexjsmoduleexports=(optionsctx)={return{name_vuep
date: 2022-11-26 21:18:43
category:
  - 前端开发
tag:
  - 插件
  - 目录
  - 初始化
  - 从零开始
  - vuepress
  - plugin
article: true
timeline: false
---
## 初始化插件项目

1. 在任意目录新建一个插件目录，我这里在 `/pkg/vuepress-plugin-simple-encrypt`

   ```bash
   mkdir /pkg/vuepress-plugin-simple-encrypt
   ```

   ![image-20220424215029271](https://img1.terwer.space/image-20220424215029271.png)
2. 进入该目录，初始化项目

   ```bash
   yarn init
   ```

   输入插件名 `vuepress-plugin-simple-encrypt` ，入口文件名 `index.js` ，其他选项对应填写即可。

   ![image-20220424215319909](https://img1.terwer.space/image-20220424215319909.png)

   初始化之后，package.json 的文件内容：

   ```javascript
   {
     "name": "vuepress-plugin-simple-encrypt",
     "version": "1.0.0",
     "description": "a simple encrypt and decrypt for vuepress",
     "main": "index.js",
     "scripts": {
       "test": "yarn test"
     },
     "repository": {
       "type": "git",
       "url": "git+https://github.com/terwer/vuepress-plugin-simple-encrypt.git"
     },
     "keywords": [
       "encrypt",
       "decrypt",
       "vuepress"
     ],
     "author": "terwer",
     "license": "MIT",
     "bugs": {
       "url": "https://github.com/terwer/vuepress-plugin-simple-encrypt/issues"
     },
     "homepage": "https://github.com/terwer/vuepress-plugin-simple-encrypt#readme"
   }
   ```
3. 编写入口文件 `index.js`

   ```javascript
   module.exports = (options, ctx) => {
       return {
           name: 'vuepress-plugin-simple-encrypt',
           async ready() {
               console.log('Hello World!');
           }
       }
   }
   ```
4. 注入插件到 `vuepress`。在 `config.ts` 文件的插件节点加上我们的插件，注意使用相对目录目录

   ```javascript
   [
     require('../../pkg/vuepress-plugin-simple-encrypt'), // 主要用于文章部分加密
     {
     }
   ]
   ```
5. 启动项目 `yarn dev` ，正常情况可以看到输出 `Hello World`

![image-20220424215853496](https://img1.terwer.space/image-20220424215853496.png)

## 插件高级开发

### 添加插件配置

config.ts 修改插件对应配置如下

```javascript
[
  require('../../pkg/vuepress-plugin-simple-encrypt'), // 主要用于文章部分加密
  {
    contentTitle: '加密内容',
    unencryptedText: '未加密内容',
    encryptedText: '该内容已加密，如需访问，请留言或者联系 youweics@163.com 获取密码。',
    decryptedText: '文章已成功解密。',
    decryptButtonText: '查看',
    decryptFailText: '密码错误!',
    unencryptedIcon: undefined,
    encryptedIcon: undefined,
    decryptedIcon: undefined
  }
]
```