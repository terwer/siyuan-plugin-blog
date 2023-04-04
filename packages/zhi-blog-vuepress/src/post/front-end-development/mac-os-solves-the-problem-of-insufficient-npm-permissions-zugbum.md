---
title: MacOS解决npm权限不足问题
short_title: ''
description: sudochownr`whoami`~npmsudochownr`whoami`usrlocallibnode_modules错误提示如下_permissiondeniedaccessusrlocallibnode_modules‍
date: 2022-08-24 18:01:34
category:
  - 前端开发
tag:
  - 错误
  - 提示
  - npm
  - permission
  - deny
article: true
timeline: false
---
```bash
sudo chown -R `whoami` ~/.npm
sudo chown -R `whoami` /usr/local/lib/node_modules
```

错误提示如下：

```bash
permission denied, access '/usr/local/lib/node_modules/'
```

‍