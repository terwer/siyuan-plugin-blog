---
title: Mac安装Nginx
short_title: ''
date: 2022-04-29 16:48:36
category:
  - 实用技巧
  - 经验分享
tag:
  - mac
  - nginx
article: true
timeline: false
---
# Mac安装Nginx

## 安装

```bash
brew install nginx
```

结果如下：

```bash
==> Installing nginx
==> Pouring nginx--1.21.6.monterey.bottle.tar.gz
==> Caveats
Docroot is: /usr/local/var/www

The default port has been set in /usr/local/etc/nginx/nginx.conf to 8080 so that
nginx can run without sudo.

nginx will load all files in /usr/local/etc/nginx/servers/.

To restart nginx after an upgrade:
  brew services restart nginx
Or, if you don't want/need a background service you can just run:
  /usr/local/opt/nginx/bin/nginx -g daemon off;
==> Summary
🍺  /usr/local/Cellar/nginx/1.21.6: 26 files, 2.2MB
==> Running `brew cleanup nginx`...
Disable this behaviour by setting HOMEBREW_NO_INSTALL_CLEANUP.
Hide these hints with HOMEBREW_NO_ENV_HINTS (see `man brew`).
==> Caveats
==> nginx
Docroot is: /usr/local/var/www

The default port has been set in /usr/local/etc/nginx/nginx.conf to 8080 so that
nginx can run without sudo.

nginx will load all files in /usr/local/etc/nginx/servers/.

To restart nginx after an upgrade:
  brew services restart nginx
Or, if you don't want/need a background service you can just run:
  /usr/local/opt/nginx/bin/nginx -g daemon off;
➜  ~
```

## 配置信息

文档根目录

```
/usr/local/var/www
```

默认配置文件：

```
/usr/local/etc/nginx/nginx.conf
```

默认端口设置成了 `8080` ，这样是为了不用sudo来启动

nginx的安装路径：

```
/usr/local/Cellar/nginx/1.21.6**
```

### 启动Nginx

```bash
brew services start nginx
```

### 重启Nginx

```bash
brew services restart nginx
```

### 非后台启动

```bash
/usr/local/opt/nginx/bin/nginx -g daemon off
```

### 停止Nginx

```bash
brew services stop nginx
```