---
title: NodeJS创建一个空文件
short_title: ''
date: 2022-04-28 21:32:35
category:
  - 实用技巧
  - 经验分享
tag:
  - node
  - nodejs
  - file
article: true
timeline: false
---
# NodeJS创建一个空文件

创建一个空文件并返回：

```javascript
var fd = fs.openSync(filepath, 'w');
```

直接创建新文件不用返回值

```javascript
fs.closeSync(fs.openSync(filepath, 'w'));
```