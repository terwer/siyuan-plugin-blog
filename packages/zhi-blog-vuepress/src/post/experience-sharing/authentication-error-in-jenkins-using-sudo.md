---
title: 解决jenkins使用sodo出现的Authentication error in jenkins on using sudo错误
short_title: ''
date: 2022-04-28 21:38:15
category:
  - 实用技巧
  - 经验分享
tag:
  - jenkisn
  - sudo
  - auth
  - error
article: true
timeline: false
---
# 解决jenkins使用sodo出现的Authentication error in jenkins on using sudo错误

修改suduousers，

```bash
sudo su    
visudo -f /etc/sudoers
```

运行jenkins无密码使用sudo

```bash
jenkins ALL= NOPASSWD: ALL
```