---
title: git修改提交的用户名
short_title: ''
date: 2022-06-13 10:35:55
category:
  - 实用技巧
  - 经验分享
tag:
  - git
article: true
timeline: false
---
## 第一步，设置新的用户名

```bash
git config user.name terwer
git config user.email youweics@163.com
```

## 第二步，修正用户名

```bash
git commit --amend --reset-author --no-edit
```