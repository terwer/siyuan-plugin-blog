---
title: 统信 UOS 基本开发环境搭建之 git
short_title: ''
description: 统信 UOS 基本开发环境搭建之 git。
date: 2022-06-07 23:55:17
category:
  - 统信UOS专区
  - UOS专区
tag:
  - uos
  - uos-home
  - deepin
  - git
article: true
timeline: false
---
## git

```bash
sudo apt install git
```

## 解决问题

- 问题1：解决 sign_and_send_pubkey: signing failed: agent refused operation 问题

  ```bash
  ➜  ~ ssh -T git@github.com
  sign_and_send_pubkey: signing failed: agent refused operation
  git@github.com: Permission denied (publickey).
  ```

  执行下面的命令修复即可

  ```bash
  eval "$(ssh-agent -s)"
  ssh-add
  ```

- 问题2：Permissions 0777 for '/home/terwer/.ssh/id_ed25519_github_ubuntu' are too open

  ```bash
  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  @         WARNING: UNPROTECTED PRIVATE KEY FILE!          @
  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  Permissions 0777 for '/home/terwer/.ssh/id_ed25519_github_ubuntu' are too open.
  It is required that your private key files are NOT accessible by others.
  This private key will be ignored.
  Load key "/home/terwer/.ssh/id_ed25519_github_ubuntu": bad permissions
  git@github.com: Permission denied (publickey)
  ```

  解决，修复权限即可

  ```bash
  chown -R terwer:terwer ~/.ssh
  chmod 600 ~/.ssh/*
  ```

## 测试

```bash
ssh -T git@github.com
```

效果

```bash
➜  ~ ssh -T git@github.com
Hi terwer! You've successfully authenticated, but GitHub does not provide shell access.
```