---
title: Git应用开发详解之Git概述与环境准备
short_title: ''
description: linux环境配置zsh快捷操作输入命令之后按下tab​按键可以在命令之间选择zshenv与zshrc的区别_zshenv​始终是source的也就是说一直生效但是zshrc​只是活跃的shell生效另外zshrc会覆盖zshenv的设置。linux常用命令​ctrll​可以快速清屏vi中设置行号__setnumber​vi中的滚屏_​ctrlf​_向下滚屏​ctrlb​_向上滚屏​shiftg​_最后一行vi中跳转到某一行__​直接定位到行vi中dd​直接删除某一行新建文件_touchtesttxt​查
date: 2022-11-26 17:37:47
category:
  - 开发流程
  - 源代码管理
tag:
  - 命令
  - 配置
  - scm
  - git
  - zsh
article: true
timeline: false
---
## Linux 环境配置

### zsh 快捷操作

* 输入命令之后，按下 `tab`​ 按键，可以在命令之间选择
* ​`zshenv`​ 与 `zshrc`​ 的区别：`zshenv`​ 始终是 `source`​ 的，也就是说 **一直生效** ，但是 `zshrc`​ 只是 **活跃的 shell 生效** ，另外，zshrc 会 **覆盖** zshenv 的设置。

### linux 常用命令

* ​`Ctrl + L`​ 可以 **快速清屏**
* vi 中 **设置行号** ：`:set number`​
* vi 中的 **滚屏** ：

  * ​`ctrl+F`​​：**向下滚屏**
  * ​`ctrl+B`​​：**向上滚屏**
  * ​`shift+G`​​：**最后一行**
* vi 中 **跳转到某一行** ：`:62`​ 直接定位到 62 行
* vi 中 `DD`​ 直接 **删除某一行**
* **新建文件**：`touch test.txt`​​
* 查看命令 **帮助手册 ​**：`man cp`​

  man **滚屏 ​**：`空格键`​

  **退出 ​**： `q`​

## Git 系列涉及的内容

* Git **官网** ：[https://git-scm.com/](https://git-scm.com/)
* 常见 **Linux** 命令
* Git 在各种平台下的 **安装与配置**
* **分布式 ​**与 **集中式** 版本控制系统的差别
* **缓冲区**、**工作区 ​**与 Git **提交**
* 版本 **回退**
* **修改与撤销修改** 、文件的 **添加与删除**

‍