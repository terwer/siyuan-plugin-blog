---
title: git-2_34_1访问服务器报Permission-denied(publickey)
short_title: ''
description: 起因近期git更新了最新的版本好多小伙伴突然发现无法访问服务器。gitpull的时候命令行会提示git@gitxxxxxcom_permissiondenied(publickeygssapikeyexgssapiwithmicpassword)莫名的提示我还以为git版本有问题。注意_mac​更新到ventura​​也会有此问题。因为git​随着系统升级到了​。➜sshcd~➜~➜~gitversiongitversion(applegit)原因git版本集成了最新的opensshvp版本此版本放弃了历
date: 2022-10-26 12:40:57
category:
  - 开发效率
  - 开发流程
tag:
  - 版本
  - 算法
  - 密钥
  - 支持
  - 服务器
  - git
  - permission
  - deny
article: true
timeline: false
---
## 起因

近期 git 更新了最新的 2.34.1 版本，好多小伙伴突然发现无法访问服务器。

git pull 的时候命令行会提示

```plaintext
 git@git.xxxxx.com:  Permission denied (publickey,gssapi-keyex,gssapi-with-mic,password).
```

莫名的提示，我还以为 git 版本有问题。

注意：`Mac`​ 更新到 `Ventura`​ `13.0`​ 也会有此问题。因为 `git`​ 随着系统升级到了 `2.32.1`​ 。

```bash
➜  .ssh cd ~/
➜  ~
➜  ~ git --version
git version 2.32.1 (Apple Git-133)
```

## 原因

**GIT 2.33.1 版本集成了最新的 OpenSSH v8.8p1 版本，此版本放弃了历史相当悠久的 rsa-sha1 的支持。** 当我们习惯于用命令行

```bash
 ssh-keygen -t rsa -C "your_email@example.com"
```

来创建密钥的时候，要小心了，以后不再支持。

SHA-1 哈希算法，此前被发现构造前缀碰撞攻击成本已降至低于 5 万美元（实际为 4.5 万美元），因此 OpenSSH 开发团队决定从 8.2 版本禁用 ssh-rsa 公钥签名算法。有一些更好的算法可以替代，包括 RFC8332 RSA SHA-2 签名算法 rsa-sha2-256/512、ssh-ed25519 签名算法与 RFC5656 ECDSA 算法。目前这些算法在 OpenSSH 中都已经支持。

值得注意的是，一般情况下，如果服务器 OpenSSH 版本大于等于 7.2 ，那么已经支持 ssh-rsa2-256/512 ，用户无需做额外的处理。但是如果服务器版本仍然比较低，就需要更换密钥。

## 解决方法

### 方法 1

如果你急需访问仓库，而暂时不想修改密钥，可以 **在密钥所在的 .ssh 目录下的 config 文件（没有的话自行创建）添加如下配置即可访问。**

```plaintext
 Host git.xxx.com
 HostkeyAlgorithms +ssh-rsa 
 PubkeyAcceptedAlgorithms +ssh-rsa
```

修改后的配置

```plaintext
 Host git.xxx.com
   PreferredAuthentications publickey
   IdentityFile ~/.ssh/id_rsa_mac
   HostkeyAlgorithms +ssh-rsa
   PubkeyAcceptedAlgorithms +ssh-rsa
```

### 方法 2

**重新生成更安全的密钥**。 在生成之前，要确定服务器是否支持相应的密钥加密算法。 使用 ECDSA 或者 ED25519 算法替代 RSA 以一个不错的选择

```bash
 ssh-keygen -t ed25519 -C "your@example.email"
```

参考文章

[https://confluence.atlassian.com/bitbucketserverkb/ssh-rsa-key-rejected-with-message-no-mutual-signature-algorithm-1026057701.html](https://confluence.atlassian.com/bitbucketserverkb/ssh-rsa-key-rejected-with-message-no-mutual-signature-algorithm-1026057701.html)

[https://git-scm.com/docs/gitfaq#_credentials](https://git-scm.com/docs/gitfaq#_credentials)

### 方法 3

**回滚 git 到 2.32 版本。**

> 文章更新历史  
> 2022-08-30 feat:初稿。
>
> 2022-10-26 feat:新增Mac更新场景。