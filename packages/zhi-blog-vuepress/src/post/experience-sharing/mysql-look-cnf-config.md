---
title: mysql查看my_cnf位置
short_title: ''
description: mysql查看my.cnf位置。
date: 2022-05-24 14:49:54
category:
  - 实用技巧
  - 经验分享
tag:
  - mysql
  - config
  - cnf
article: true
timeline: false
---
```bash
mysql --help | grep 'Default options' -A 1
```

mysql查看my.cnf位置

参考

[linux shell 管道命令(pipe)使用及与shell重定向区别](https://www.cnblogs.com/chengmo/archive/2010/10/21/1856577.html)