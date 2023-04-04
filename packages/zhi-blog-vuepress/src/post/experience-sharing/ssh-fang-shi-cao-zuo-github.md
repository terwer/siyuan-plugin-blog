---
title: 使用SSH方式操作GitHub
short_title: ''
description: 本文介绍了使用SSH方式操作GitHub的方法。生成SSHkeysshkeygented25519Cyouweics@163com拷贝SSHkeyvim~/ssh/id_ed25519pub直接拷贝秘钥字符串然后打开GitHub，Settings&gtSSHandGPGkeys，点击NewSSHkey然后对包起个秘钥名字，把秘钥字符串粘贴到秘钥框内，点击AddSSHkey提交即可。接下来就能用SSH的方式操作GitHub了。
date: 2022-04-17 10:27:12
category:
  - 实用技巧
  - 经验分享
tag:
  - ssh
  - github
article: true
timeline: false
---
本文介绍了使用SSH方式操作GitHub的方法。

<!-- more -->

# 生成SSH key

```bash
ssh-keygen -t ed25519 -C "youweics@163.com"
```

# 拷贝SSH key

```bash
vim ~/.ssh/id_ed25519.pub
```

直接拷贝秘钥字符串

然后打开GitHub，Settings-> SSH and GPG keys，点击New SSH key

![image-20220417103459842](https://img1.terwer.space/image-20220417103459842.png)

然后对包起个秘钥名字，把秘钥字符串粘贴到秘钥框内，点击Add SSH key提交即可。

![image-20220417103641656](https://img1.terwer.space/image-20220417103641656.png)

接下来就能用SSH的方式操作GitHub了。