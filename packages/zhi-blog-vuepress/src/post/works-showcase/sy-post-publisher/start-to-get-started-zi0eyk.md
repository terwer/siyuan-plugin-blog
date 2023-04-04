---
title: 开始上手
short_title: ''
description: 安装思源笔记发布工具的安装步骤如下从edge商店下载插件或者在思源笔记集市下载挂件并添加到页面。思源笔记发布工具microsoftedgeaddons快速配置浏览器插件方式使用推荐如果本地使用请确保思源笔记处于打开模式。​​如果是docker部署请启动容器。如果本地使用并且是​​端口则无需设置请忽略此步骤_如果本地使用但是使用的是随机端口请在在思源笔记设置关于找到ip地址以及端口然后修改本插件的思源api地址​​_如果是远程docker​​部署请填写外网api地址​​以及token​​并配置代理地址​​。
date: 2022-09-27 09:49:26
category:
  - sy-post-publisher
  - 作品展示
tag:
  - 地址
  - 如果
  - 思源
  - 使用
  - 部署
  - 上手
  - 入门
article: true
timeline: false
---
## 安装

思源笔记发布工具的安装步骤如下  
从 Edge 商店下载插件或者在思源笔记集市下载挂件并添加到页面。  
[思源笔记发布工具 - Microsoft Edge Addons](https://microsoftedge.microsoft.com/addons/detail/aejmkigifflimhjlhjkdckclhabbilee)

## 快速配置

### 浏览器插件方式使用 <sup> 推荐 </sup>

* 如果本地使用，请确保思源笔记处于打开模式。  

  ​![](https://static-rs-terwer.oss-cn-beijing.aliyuncs.com/project/sy-post-publisher/docs/screenshot-20221126-232837.png)​

  如果是 docker 部署，请启动容器。
* 如果本地使用，并且是 `6806`​​ 端口，则 **无需设置** ，请忽略此步骤；

  如果本地使用，但是使用的是随机端口，请在在思源笔记设置-> 关于找到 IP 地址以及端口，然后修改本插件的 `思源 API 地址`​​ ；

  如果是 `远程 docker`​​ 部署，请填写 `外网 API 地址`​​ 以及 `token`​​ ，并配置 `代理地址`​​ 。

  配置地址可在列表页面底部找到：**修改思源API地址**

  ​![](https://static-rs-terwer.oss-cn-beijing.aliyuncs.com/project/sy-post-publisher/docs/screenshot-20221126-232612.png)​

  如果您没有支持跨域的代理地址，可以使用我的共享地址：`https://publish.terwer.space/api/middleware`​​ 。出于性能考虑，建议自己部署一份。部署方法请参考 Vercel 远程部署模式 。

* Edge 商店版本打开 popup 默认是文章列表页面；

  挂件模式从 <sup>0.1.0+</sup> 版本开始，会自动检测，如果发现有子文档，会展示文章列表，否则，只展示发布页面。
* 列表页面会有发布预览，新窗口等功能。

  发布页面有设置、国际化、暗黑模式、平台绑定、平台设置、动态平台添加、平台开关等详细功能。后面会逐一讲解。

  初步配置可直接根据提示操作。详细设置请参考后面的文档。

### 思源笔记挂件方式使用

挂件方式使用  
首先在设置 - 集市 - 挂件 中下载 sy-post-publisher  
然后写好文章  
在文中最后面输入 / 找到挂件，选择 sy-post-publisher  
然后选择你需要的平台然后进行设置  
点击发布即可

### 浏览器直接访问

**打开思源笔记 ​**，并在集市下载 **sy-post-publisher** 挂件，然后 **在浏览器打开** 下面的链接即可直接访问：  
[http://127.0.0.1:6806/widgets/sy-post-publisher/blog/?from=siyuan](http://127.0.0.1:6806/widgets/sy-post-publisher/blog/?from=siyuan)

## 使用

配置完成之后直接点击发布按钮，设置好属性发布即可。高级设置及操作后面会逐一讲解。

## 进阶

通过源码编译：  
[https://github.com/terwer/src-sy-post-publisher](https://github.com/terwer/src-sy-post-publisher)

```bash
git clone https://github.com/terwer/src-sy-post-publisher
```

```plantuml
@startmindmap

skinparam backgroundcolor transparent

!include https://static-rs-terwer.oss-cn-beijing.aliyuncs.com/lib/uml/starter-skin.puml

* sy-post-publisher
	* api/ 提供统一的需要server环境的API请求代理
	* assets/ 资源文件、样式文件等
	* components/ 通用组件
	* composables/ 可复用单元
	* layouts/ 页面布局
	* locals/ 国际化
	* pages/ 页面统一出口
	* plugins/ 插件
	* scripts/ 脚本（构建脚本、打包脚本等）
	* stores/ 存储
	* test/ 基于vitest的单元测试
	* typings/ 类型定义文件（主要用于开发阶段的代码智能提示）
	* utils/ 工具类
	* vite.config.ts 统一配置文件
	* vercel.json vercel部署描述文件

@endmindmap
```

准备

```bash
npm i -g pnpm
npm i -g vercel
pnpm install
```

运行

```bash
pnpm run serve
```

大功告成。

‍

## Copyright

```plaintext
/*
 * Copyright (c) 2022, Terwer . All rights reserved.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 only, as
 * published by the Free Software Foundation.  Terwer designates this
 * particular file as subject to the "Classpath" exception as provided
 * by Terwer in the LICENSE file that accompanied this code.
 *
 * This code is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 * version 2 for more details (a copy is included in the LICENSE file that
 * accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version
 * 2 along with this work; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 * Please contact Terwer, Shenzhen, Guangdong, China, youweics@163.com
 * or visit www.terwer.space if you need additional information or have any
 * questions.
 */
```