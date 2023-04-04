---
title: 解决macOS Monterey 12.3没有python2的问题
short_title: ''
description: 当Mac升级到macOS Monterey 12.3之后，你会发现 python2 不见了，输入 python 也提示 找不到。
date: 2022-05-09 01:56:02
category:
  - 实用技巧
  - 经验分享
tag:
  - macos
  - monterey
  - python
  - python2
article: true
timeline: false
---
## 问题

当Mac升级到macOS Monterey 12.3之后，你会发现 python2 不见了，输入 python 也提示 找不到

```bash
➜  ~ python -m pip install --user virtualenv
zsh: command not found: python
```

## 解决

如果我么将 macOS 更新到 Monterey 12.3 ，就会发现突然不再拥有系统提供的 Python 2。

原因是苹果删除了系统提供的python 2安装（[详情](https://macmule.com/2022/01/29/macos-monterey-12-3-will-remove-python-2-7-usr-bin-python/)）。

因此，解决方法/解决方案是使用 pyenv 安装 python 2.7（或您需要的任何其他特定版本）。

使用 brew 安装 pyenv 以管理不同的 python 版本： 

```bash
brew install pyenv
```

安装日志如下：

```bash
➜  ~ brew install pyenv
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/m4-1.4.19.monterey.bottle.tar.gz
######################################################################## 100.0%
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/autoconf-2.71.monterey.bottle.tar.gz
######################################################################## 100.0%
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/ca-certificates-2022-04-26.all.bottle.t
######################################################################## 100.0%
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/openssl%401.1-1.1.1o.monterey.bottle.ta
######################################################################## 100.0%
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/pyenv-2.3.0.monterey.bottle.tar.gz
######################################################################## 100.0%
==> Installing dependencies for pyenv: m4, autoconf, ca-certificates and openssl@1.1
==> Installing pyenv dependency: m4
==> Pouring m4-1.4.19.monterey.bottle.tar.gz
🍺  /usr/local/Cellar/m4/1.4.19: 13 files, 740.7KB
==> Installing pyenv dependency: autoconf
==> Pouring autoconf-2.71.monterey.bottle.tar.gz
🍺  /usr/local/Cellar/autoconf/2.71: 71 files, 3.2MB
==> Installing pyenv dependency: ca-certificates
==> Pouring ca-certificates-2022-04-26.all.bottle.tar.gz
==> Regenerating CA certificate bundle from keychain, this may take a while...
🍺  /usr/local/Cellar/ca-certificates/2022-04-26: 3 files, 215.5KB
==> Installing pyenv dependency: openssl@1.1
==> Pouring openssl@1.1-1.1.1o.monterey.bottle.tar.gz
🍺  /usr/local/Cellar/openssl@1.1/1.1.1o: 8,089 files, 18.5MB
==> Installing pyenv
==> Pouring pyenv-2.3.0.monterey.bottle.tar.gz
🍺  /usr/local/Cellar/pyenv/2.3.0: 917 files, 3.0MB
==> Running `brew cleanup pyenv`...
Disable this behaviour by setting HOMEBREW_NO_INSTALL_CLEANUP.
Hide these hints with HOMEBREW_NO_ENV_HINTS (see `man brew`).
==> Upgrading 7 dependents of upgraded formulae:
Disable this behaviour by setting HOMEBREW_NO_INSTALLED_DEPENDENTS_CHECK.
Hide these hints with HOMEBREW_NO_ENV_HINTS (see `man brew`).
iproute2mac 1.3.0_2 -> 1.4.0, nginx 1.21.6 -> 1.21.6_1, python@3.10 3.10.2 -> 3.10.4, python@3.9 3.9.10 -> 3.9.12, redis 6.2.6 -> 7.0.0, ruby 3.1.0 -> 3.1.2, wget 1.21.2 -> 1.21.3
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/sqlite-3.38.5.monterey.bottle.tar.gz
######################################################################## 100.0%
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/python%403.10-3.10.4.monterey.bottle.ta
######################################################################## 100.0%
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/ruby-3.1.2.monterey.bottle.tar.gz
######################################################################## 100.0%
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/iproute2mac-1.4.0.all.bottle.tar.gz
######################################################################## 100.0%
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/pcre2-10.40.monterey.bottle.tar.gz
######################################################################## 100.0%
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/nginx-1.21.6_1.monterey.bottle.tar.gz
######################################################################## 100.0%
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/python%403.9-3.9.12.monterey.bottle.tar
######################################################################## 100.0%
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/redis-7.0.0.monterey.bottle.tar.gz
######################################################################## 100.0%
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/wget-1.21.3.monterey.bottle.tar.gz
######################################################################## 100.0%
==> Upgrading python@3.10
  3.10.2 -> 3.10.4

==> Installing dependencies for python@3.10: sqlite
==> Installing python@3.10 dependency: sqlite
==> Pouring sqlite-3.38.5.monterey.bottle.tar.gz
🍺  /usr/local/Cellar/sqlite/3.38.5: 11 files, 4.4MB
==> Installing python@3.10
==> Pouring python@3.10-3.10.4.monterey.bottle.tar.gz
==> /usr/local/Cellar/python@3.10/3.10.4/bin/python3 -m ensurepip
==> /usr/local/Cellar/python@3.10/3.10.4/bin/python3 -m pip install -v --no-deps --no-index --upgrad
🍺  /usr/local/Cellar/python@3.10/3.10.4: 3,138 files, 56.6MB
==> Running `brew cleanup python@3.10`...
Removing: /usr/local/Cellar/python@3.10/3.10.2... (3,133 files, 56.4MB)
==> Upgrading ruby
  3.1.0 -> 3.1.2

==> Pouring ruby-3.1.2.monterey.bottle.tar.gz
==> Caveats
By default, binaries installed by gem will be placed into:
  /usr/local/lib/ruby/gems/3.1.0/bin

You may want to add this to your PATH.

ruby is keg-only, which means it was not symlinked into /usr/local,
because macOS already provides this software and installing another version in
parallel can cause all kinds of trouble.

If you need to have ruby first in your PATH, run:
  echo 'export PATH="/usr/local/opt/ruby/bin:$PATH"' >> ~/.zshrc

For compilers to find ruby you may need to set:
  export LDFLAGS="-L/usr/local/opt/ruby/lib"
  export CPPFLAGS="-I/usr/local/opt/ruby/include"

For pkg-config to find ruby you may need to set:
  export PKG_CONFIG_PATH="/usr/local/opt/ruby/lib/pkgconfig"

==> Summary
🍺  /usr/local/Cellar/ruby/3.1.2: 15,996 files, 41MB
==> Running `brew cleanup ruby`...
Removing: /usr/local/Cellar/ruby/3.1.0... (15,942 files, 39.6MB)
==> Upgrading iproute2mac
  1.3.0_2 -> 1.4.0

==> Pouring iproute2mac-1.4.0.all.bottle.tar.gz
🍺  /usr/local/Cellar/iproute2mac/1.4.0: 6 files, 29.4KB
==> Running `brew cleanup iproute2mac`...
Removing: /usr/local/Cellar/iproute2mac/1.3.0_2... (6 files, 23.7KB)
==> Upgrading nginx
  1.21.6 -> 1.21.6_1

==> Installing dependencies for nginx: pcre2
==> Installing nginx dependency: pcre2
==> Pouring pcre2-10.40.monterey.bottle.tar.gz
🍺  /usr/local/Cellar/pcre2/10.40: 230 files, 6.4MB
==> Installing nginx
==> Pouring nginx-1.21.6_1.monterey.bottle.tar.gz
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
🍺  /usr/local/Cellar/nginx/1.21.6_1: 26 files, 2.2MB
==> Running `brew cleanup nginx`...
Removing: /usr/local/Cellar/nginx/1.21.6... (26 files, 2.2MB)
==> Upgrading python@3.9
  3.9.10 -> 3.9.12

==> Pouring python@3.9-3.9.12.monterey.bottle.tar.gz
==> /usr/local/Cellar/python@3.9/3.9.12/bin/python3 -m ensurepip
==> /usr/local/Cellar/python@3.9/3.9.12/bin/python3 -m pip install -v --no-deps --no-index --upgrade
==> Caveats
Python has been installed as
  /usr/local/bin/python3

Unversioned symlinks `python`, `python-config`, `pip` etc. pointing to
`python3`, `python3-config`, `pip3` etc., respectively, have been installed into
  /usr/local/opt/python@3.9/libexec/bin

You can install Python packages with
  pip3 install <package>
They will install into the site-package directory
  /usr/local/lib/python3.9/site-packages

tkinter is no longer included with this formula, but it is available separately:
  brew install python-tk@3.9

See: https://docs.brew.sh/Homebrew-and-Python
==> Summary
🍺  /usr/local/Cellar/python@3.9/3.9.12: 3,088 files, 55.5MB
==> Running `brew cleanup python@3.9`...
Removing: /usr/local/Cellar/python@3.9/3.9.10... (3,102 files, 55MB)
==> Upgrading redis
  6.2.6 -> 7.0.0

==> Pouring redis-7.0.0.monterey.bottle.tar.gz
==> Caveats
To restart redis after an upgrade:
  brew services restart redis
Or, if you don't want/need a background service you can just run:
  /usr/local/opt/redis/bin/redis-server /usr/local/etc/redis.conf
==> Summary
🍺  /usr/local/Cellar/redis/7.0.0: 14 files, 2.6MB
==> Running `brew cleanup redis`...
Removing: /usr/local/Cellar/redis/6.2.6... (14 files, 2.0MB)
==> Upgrading wget
  1.21.2 -> 1.21.3

==> Pouring wget-1.21.3.monterey.bottle.tar.gz
🍺  /usr/local/Cellar/wget/1.21.3: 89 files, 4.2MB
==> Running `brew cleanup wget`...
Removing: /usr/local/Cellar/wget/1.21.2... (89 files, 4.2MB)
==> Checking for dependents of upgraded formulae...
==> No broken dependents found!
==> Caveats
==> ruby
By default, binaries installed by gem will be placed into:
  /usr/local/lib/ruby/gems/3.1.0/bin

You may want to add this to your PATH.

ruby is keg-only, which means it was not symlinked into /usr/local,
because macOS already provides this software and installing another version in
parallel can cause all kinds of trouble.

If you need to have ruby first in your PATH, run:
  echo 'export PATH="/usr/local/opt/ruby/bin:$PATH"' >> ~/.zshrc

For compilers to find ruby you may need to set:
  export LDFLAGS="-L/usr/local/opt/ruby/lib"
  export CPPFLAGS="-I/usr/local/opt/ruby/include"

For pkg-config to find ruby you may need to set:
  export PKG_CONFIG_PATH="/usr/local/opt/ruby/lib/pkgconfig"

==> nginx
Docroot is: /usr/local/var/www

The default port has been set in /usr/local/etc/nginx/nginx.conf to 8080 so that
nginx can run without sudo.

nginx will load all files in /usr/local/etc/nginx/servers/.

To restart nginx after an upgrade:
  brew services restart nginx
Or, if you don't want/need a background service you can just run:
  /usr/local/opt/nginx/bin/nginx -g daemon off;
==> python@3.9
Python has been installed as
  /usr/local/bin/python3

Unversioned symlinks `python`, `python-config`, `pip` etc. pointing to
`python3`, `python3-config`, `pip3` etc., respectively, have been installed into
  /usr/local/opt/python@3.9/libexec/bin

You can install Python packages with
  pip3 install <package>
They will install into the site-package directory
  /usr/local/lib/python3.9/site-packages

tkinter is no longer included with this formula, but it is available separately:
  brew install python-tk@3.9

See: https://docs.brew.sh/Homebrew-and-Python
==> redis
To restart redis after an upgrade:
  brew services restart redis
Or, if you don't want/need a background service you can just run:
  /usr/local/opt/redis/bin/redis-server /usr/local/etc/redis.conf
➜  ~
```

使用 `pyenv install --list` 列出所有可安装版本

使用 `pyenv install 2.7.18` 安装 `python 2.7.18`

使用 `pyenv` 版本列出已安装的版本

使用 `pyenv global 2.7.18` 设置全局 python 版本

将 `eval "$(pyenv init --path)"` 添加到 `~/.zprofile`（或 `~/.bash_profile` 或 `~/.zshrc`）

````bash
# pyenv
export PYENV_ROOR="$HOME/.pyenv"
export PATH=$PYENV_ROOT/shims:$PATH
eval "$(pyenv init -)"
eval "$(pyenv virtualenv-init -)"
````

## 出错解决

```bash
pyenv: no such command virtualenv-init
```

没有下载 `pyenv-virtualenv`

```bash
git clone https://github.com/yyuu/pyenv-virtualenv.git ~/.pyenv/plugins/pyenv-virtualenv
```

重新启动 shell 并检查 python 是否正常工作。

## 使用指南

### 常用命令

```bash
pyenv install --list # 列出可安装版本
pyenv install <version> # 安装对应版本
pyenv install -v <version> # 安装对应版本，若发生错误，可以显示详细的错误信息
pyenv versions # 显示当前使用的python版本
pyenv which python # 显示当前python安装路径
pyenv global <version> # 设置默认Python版本
pyenv local <env> # 当前路径创建一个.python-version文件, 以后进入这个目录自动切换为该版本，注意<env> 必须为虚拟环境，不能是python版本
pyenv shell <version> # 当前shell的session中启用某版本，优先级高于global 及 local
```

### 使用 `virtualenv`

```bash
pyenv virtualenv venv # 从默认版本创建虚拟环境
pyenv virtualenv 3.10.4 venv-3.10.4 # 创建3.10.4版本的虚拟环境

pyenv activate venv
pyenv activate venv-3.10.4 # 激活 env-3.10.4 这个虚拟环境

pyenv deactivate # 停用当前的虚拟环境

# 自动激活
# 使用pyenv local 虚拟环境名
# 会把`虚拟环境名`写入当前目录的.python-version文件中
# 关闭自动激活 -> pyenv deactivate
# 启动自动激活 -> pyenv activate venv-3.10.4
pyenv local venv
pyenv local venv-3.10.4

pyenv uninstall venv
pyenv uninstall venv-3.10.4 # 删除 env-3.10.4 这个虚拟环境
```

# 删除虚拟环境

```bash
pyenv virtualenv-delete venv
pyenv virtualenv-delete venv-3.10.4
```