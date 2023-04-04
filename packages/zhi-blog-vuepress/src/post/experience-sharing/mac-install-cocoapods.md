---
title: Mac Big Sur 安装CocoaPods
short_title: ''
description: Mac Big Sur 安装CocoaPods。
date: 2022-05-05 21:19:01
category:
  - 实用技巧
  - 经验分享
tag:
  - mac
  - cocoapods
article: true
timeline: false
---
# Mac Big Sur 安装CocoaPods

# 切换homebrew为中科大源

```
# 替换各个源
git -C "$(brew --repo)" remote set-url origin https://mirrors.ustc.edu.cn/brew.git
git -C "$(brew --repo homebrew/core)" remote set-url origin https://mirrors.ustc.edu.cn/homebrew-core.git
git -C "$(brew --repo homebrew/cask)" remote set-url origin https://mirrors.ustc.edu.cn/homebrew-cask.git

# zsh 替换 brew bintray 镜像
echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles' >> ~/.zshrc
source ~/.zshrc

# bash 替换 brew bintray 镜像
# echo 'export HOMEBREW_BOTTLE_DOMAIN=https://# mirrors.ustc.edu.cn/homebrew-bottles' >> ~/.bash_profile
# source ~/.bash_profile

# 刷新源
$ brew update
```

# 安装ruby

```
brew update
brew upgrade
brew install ruby
```

安装之后可根据提示设置环境变量

```
➜  Homebrew git:(stable) brew install ruby
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/readline-8.1.1.big_
######################################################################## 100.0%
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/ruby-3.0.3.big_sur.
######################################################################## 100.0%
==> Installing dependencies for ruby: readline
==> Installing ruby dependency: readline
==> Pouring readline-8.1.1.big_sur.bottle.tar.gz
🍺  /usr/local/Cellar/readline/8.1.1: 48 files, 1.6MB
==> Installing ruby
==> Pouring ruby-3.0.3.big_sur.bottle.tar.gz
==> Caveats
By default, binaries installed by gem will be placed into:
  /usr/local/lib/ruby/gems/3.0.0/bin

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
🍺  /usr/local/Cellar/ruby/3.0.3: 16,540 files, 39.4MB
==> Running `brew cleanup ruby`...
Disable this behaviour by setting HOMEBREW_NO_INSTALL_CLEANUP.
Hide these hints with HOMEBREW_NO_ENV_HINTS (see `man brew`).
Removing: /Users/terwer/Library/Caches/Homebrew/ruby--3.0.1... (11.0MB)
==> Caveats
==> ruby
By default, binaries installed by gem will be placed into:
  /usr/local/lib/ruby/gems/3.0.0/bin

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

➜  Homebrew git:(stable) 
```

# 安装CocoaPods

```
gem install cocoapods
```

结果如下：

```
➜  ~ ruby -v
ruby 3.0.3p157 (2021-11-24 revision 3fb7d2cadc) [x86_64-darwin20]
➜  ~ gem -v
3.2.32
➜  ~  gem install cocoapods
Fetching nanaimo-0.3.0.gem
Fetching colored2-3.1.2.gem
Fetching claide-1.0.3.gem
Fetching CFPropertyList-3.0.5.gem
Fetching atomos-0.1.3.gem
Fetching xcodeproj-1.21.0.gem
Fetching ruby-macho-2.5.1.gem
Fetching nap-1.1.0.gem
Fetching molinillo-0.8.0.gem
Fetching gh_inspector-1.1.3.gem
Fetching fourflusher-2.3.1.gem
Fetching escape-0.0.4.gem
Fetching cocoapods-try-1.2.0.gem
Fetching netrc-0.11.0.gem
Fetching cocoapods-trunk-1.6.0.gem
Fetching cocoapods-search-1.0.1.gem
Fetching cocoapods-plugins-1.0.0.gem
Fetching cocoapods-downloader-1.5.1.gem
Fetching cocoapods-deintegrate-1.0.5.gem
Fetching ffi-1.15.5.gem
Fetching ethon-0.15.0.gem
Fetching typhoeus-1.4.0.gem
Fetching public_suffix-4.0.6.gem
Fetching fuzzy_match-2.0.4.gem
Fetching concurrent-ruby-1.1.9.gem
Fetching httpclient-2.8.3.gem
Fetching algoliasearch-1.27.5.gem
Fetching addressable-2.8.0.gem
Fetching zeitwerk-2.5.3.gem
Fetching tzinfo-2.0.4.gem
Fetching i18n-1.8.11.gem
Fetching activesupport-6.1.4.4.gem
Fetching cocoapods-1.11.2.gem
Fetching cocoapods-core-1.11.2.gem
Successfully installed nanaimo-0.3.0
Successfully installed colored2-3.1.2
Successfully installed claide-1.0.3
Successfully installed CFPropertyList-3.0.5
Successfully installed atomos-0.1.3
Successfully installed xcodeproj-1.21.0
Successfully installed ruby-macho-2.5.1
Successfully installed nap-1.1.0
Successfully installed molinillo-0.8.0
Successfully installed gh_inspector-1.1.3
Successfully installed fourflusher-2.3.1
Successfully installed escape-0.0.4
Successfully installed cocoapods-try-1.2.0
Successfully installed netrc-0.11.0
Successfully installed cocoapods-trunk-1.6.0
Successfully installed cocoapods-search-1.0.1
Successfully installed cocoapods-plugins-1.0.0
Successfully installed cocoapods-downloader-1.5.1
Successfully installed cocoapods-deintegrate-1.0.5
Building native extensions. This could take a while...
Successfully installed ffi-1.15.5
Successfully installed ethon-0.15.0
Successfully installed typhoeus-1.4.0
Successfully installed public_suffix-4.0.6
Successfully installed fuzzy_match-2.0.4
Successfully installed concurrent-ruby-1.1.9
Successfully installed httpclient-2.8.3
A new major version is available for Algolia! Please now use the https://rubygems.org/gems/algolia gem to get the latest features.
Successfully installed algoliasearch-1.27.5
Successfully installed addressable-2.8.0
Successfully installed zeitwerk-2.5.3
Successfully installed tzinfo-2.0.4
Successfully installed i18n-1.8.11
Successfully installed activesupport-6.1.4.4
Successfully installed cocoapods-core-1.11.2
Successfully installed cocoapods-1.11.2
Parsing documentation for nanaimo-0.3.0
Installing ri documentation for nanaimo-0.3.0
Parsing documentation for colored2-3.1.2
Installing ri documentation for colored2-3.1.2
Parsing documentation for claide-1.0.3
Installing ri documentation for claide-1.0.3
Parsing documentation for CFPropertyList-3.0.5
Installing ri documentation for CFPropertyList-3.0.5
Parsing documentation for atomos-0.1.3
Installing ri documentation for atomos-0.1.3
Parsing documentation for xcodeproj-1.21.0
Installing ri documentation for xcodeproj-1.21.0
Parsing documentation for ruby-macho-2.5.1
Installing ri documentation for ruby-macho-2.5.1
Parsing documentation for nap-1.1.0
Installing ri documentation for nap-1.1.0
Parsing documentation for molinillo-0.8.0
Installing ri documentation for molinillo-0.8.0
Parsing documentation for gh_inspector-1.1.3
Installing ri documentation for gh_inspector-1.1.3
Parsing documentation for fourflusher-2.3.1
Installing ri documentation for fourflusher-2.3.1
Parsing documentation for escape-0.0.4
Installing ri documentation for escape-0.0.4
Parsing documentation for cocoapods-try-1.2.0
Installing ri documentation for cocoapods-try-1.2.0
Parsing documentation for netrc-0.11.0
Installing ri documentation for netrc-0.11.0
Parsing documentation for cocoapods-trunk-1.6.0
Installing ri documentation for cocoapods-trunk-1.6.0
Parsing documentation for cocoapods-search-1.0.1
Installing ri documentation for cocoapods-search-1.0.1
Parsing documentation for cocoapods-plugins-1.0.0
Installing ri documentation for cocoapods-plugins-1.0.0
Parsing documentation for cocoapods-downloader-1.5.1
Installing ri documentation for cocoapods-downloader-1.5.1
Parsing documentation for cocoapods-deintegrate-1.0.5
Installing ri documentation for cocoapods-deintegrate-1.0.5
Parsing documentation for ffi-1.15.5
Installing ri documentation for ffi-1.15.5
Parsing documentation for ethon-0.15.0
Installing ri documentation for ethon-0.15.0
Parsing documentation for typhoeus-1.4.0
Installing ri documentation for typhoeus-1.4.0
Parsing documentation for public_suffix-4.0.6
Installing ri documentation for public_suffix-4.0.6
Parsing documentation for fuzzy_match-2.0.4
Installing ri documentation for fuzzy_match-2.0.4
Parsing documentation for concurrent-ruby-1.1.9
Installing ri documentation for concurrent-ruby-1.1.9
Parsing documentation for httpclient-2.8.3
Installing ri documentation for httpclient-2.8.3
Parsing documentation for algoliasearch-1.27.5
Installing ri documentation for algoliasearch-1.27.5
Parsing documentation for addressable-2.8.0
Installing ri documentation for addressable-2.8.0
Parsing documentation for zeitwerk-2.5.3
Installing ri documentation for zeitwerk-2.5.3
Parsing documentation for tzinfo-2.0.4
Installing ri documentation for tzinfo-2.0.4
Parsing documentation for i18n-1.8.11
Installing ri documentation for i18n-1.8.11
Parsing documentation for activesupport-6.1.4.4
Installing ri documentation for activesupport-6.1.4.4
Parsing documentation for cocoapods-core-1.11.2
Installing ri documentation for cocoapods-core-1.11.2
Parsing documentation for cocoapods-1.11.2
Installing ri documentation for cocoapods-1.11.2
Done installing documentation for nanaimo, colored2, claide, CFPropertyList, atomos, xcodeproj, ruby-macho, nap, molinillo, gh_inspector, fourflusher, escape, cocoapods-try, netrc, cocoapods-trunk, cocoapods-search, cocoapods-plugins, cocoapods-downloader, cocoapods-deintegrate, ffi, ethon, typhoeus, public_suffix, fuzzy_match, concurrent-ruby, httpclient, algoliasearch, addressable, zeitwerk, tzinfo, i18n, activesupport, cocoapods-core, cocoapods after 18 seconds
34 gems installed
➜  ~ 
```

# 初始化CocoaPods

项目中使用CocoaPods时，第一次运行需要初始化。进入项目根目录，执行下面的命令

这条命令是将Github上的开源库都托管都安装Podspec索引安装到到本地，过程可能很慢，耐心等待即可。。。

```
pod setup
```

如果提示找不到 `pod` ，使用下面的命令重新安装

```
➜  ~ gem install -n /usr/local/bin cocoapods
Successfully installed cocoapods-1.11.2
Parsing documentation for cocoapods-1.11.2
Done installing documentation for cocoapods after 1 seconds
1 gem installed
➜  ~ 
```

再次执行就可以了。

```
➜  ~ pod
Usage:

    $ pod COMMAND

      CocoaPods, the Cocoa library package manager.

Commands:

    + cache         Manipulate the CocoaPods cache
    + deintegrate   Deintegrate CocoaPods from your project
    + env           Display pod environment
    + init          Generate a Podfile for the current directory
    + install       Install project dependencies according to versions from a
                    Podfile.lock
    + ipc           Inter-process communication
    + lib           Develop pods
    + list          List pods
    + outdated      Show outdated project dependencies
    + plugins       Show available CocoaPods plugins
    + repo          Manage spec-repositories
    + search        Search for pods
    + setup         Setup the CocoaPods environment
    + spec          Manage pod specs
    + trunk         Interact with the CocoaPods API (e.g. publishing new specs)
    + try           Try a Pod!
    + update        Update outdated project dependencies and create new
                    Podfile.lock

Options:

    --allow-root    Allows CocoaPods to run as root
    --silent        Show nothing
    --version       Show the version of the tool
    --verbose       Show more debugging information
    --no-ansi       Show output without ANSI codes
    --help          Show help banner of specified command
➜  ~ 
```

```
➜  ~ pod setup
Setup completed
➜  ~ 
```

# 使用CocoaPods

生成 Podfile

```
pod init
```

添加依赖，在 Podfile 里面添加对应依赖和版本即可

```
platform :ios, "7.0"
# ignore all warnings
inhibit_all_warnings!

pod 'RESideMenu','~> 4.0.7'         # 侧拉菜单
pod "AFNetworking","~> 2.0"         # 网络访问
```

安装依赖

```
pod install
```

# 扩展阅读

https://blog.devtang.com/2014/05/25/use-cocoapod-to-manage-ios-lib-dependency/