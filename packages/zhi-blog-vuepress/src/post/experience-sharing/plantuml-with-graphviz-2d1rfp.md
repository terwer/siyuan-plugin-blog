---
title: plantuml配合graphviz
short_title: ''
description: idea安装插件直接idea搜索plantuml即可mac安装brewinstallgraphvizps_收藏一个写的很好的homebrew脚本binzshcplantuml编解码https_githubcommarkushedvallplantumlencoder编码varplantumlencoder=require(plantumlencoder)varencoded=plantumlencoderencode(ab_hello)consolelog(encoded)srjgjldmibbmicto
date: 2022-08-30 14:33:28
category:
  - 经验分享
tag:
  - 安装
  - 插件
  - 直接
  - 搜索
  - graphviz
article: true
timeline: false
---
## IDEA 安装插件

直接 IDEA 搜索 plantuml 即可

## Mac 安装

```bash
 brew install graphviz
```

PS：收藏一个写的很好的homebrew脚本

```bash
/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"
```

## plantuml编解码

[https://github.com/markushedvall/plantuml-encoder](https://github.com/markushedvall/plantuml-encoder)

编码

```js
var plantumlEncoder = require('plantuml-encoder')

var encoded = plantumlEncoder.encode('A -> B: Hello')
console.log(encoded) // SrJGjLDmibBmICt9oGS0

var url = 'http://www.plantuml.com/plantuml/img/' + encoded
```

解码

```js
var plantumlEncoder = require('plantuml-encoder')

var plain = plantumlEncoder.decode('SrJGjLDmibBmICt9oGS0')
console.log(plain) // A -> B: Hello
```

## 参考

[https://zhuanlan.zhihu.com/p/111014448](https://zhuanlan.zhihu.com/p/111014448)

‍