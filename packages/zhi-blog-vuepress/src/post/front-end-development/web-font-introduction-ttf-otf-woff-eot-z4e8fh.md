---
title: Web字体简介_TTF_OTF_WOFF_EOT以及SVG
short_title: ''
description: 字体格式有太多选择不幸的是始终没有一个能在所有的浏览器上通用。这意味着你必须使用多种字体的方案来保持用户跨平台的一致性体验。本文内容如题会依次介绍一下ttfotfwoffeot和svg几种字体目前在web上的情况。浏览器支持情况@fontface目前浏览器的兼容性_webkitsafari()_truetypeopentypett(ttf)opentypeps(otf)_opera()_truetypeopentypett(ttf)opentypeps(otf)svg(svg)_internetexplo
date: 2022-08-30 21:37:06
category:
  - 前端开发
tag:
  - 字体
  - 浏览器
  - web
  - font
  - web-font
  - font-family
  - font-face
article: true
timeline: false
---
字体格式有太多选择，不幸的是始终 **没有一个能在所有的浏览器上通用** 。这意味着，你必须使用多种字体的方案来保持 **用户跨平台的一致性体验** 。本文内容如题，会依次介绍一下 TTF、OTF、WOFF、EOT 和 SVG 几种字体目前在 Web 上的情况。

## 浏览器支持情况

@Font-face 目前浏览器的兼容性：

* Webkit/Safari(3.2+)：TrueType/OpenType TT (.ttf) 、OpenType PS (.otf)；
* Opera (10+)： TrueType/OpenType TT (.ttf) 、 OpenType PS (.otf) 、 SVG (.svg)；
* Internet Explorer： 自 ie4 开始，支持 EOT 格式的字体文件；ie9 支持 WOFF；
* Firefox(3.5+)： TrueType/OpenType TT (.ttf)、 OpenType PS (.otf)、 WOFF (since Firefox 3.6)
* Google Chrome：TrueType/OpenType TT (.ttf)、OpenType PS (.otf)、WOFF since version 6

**由上面可以得出：.eot + .ttf /.otf + svg + woff = 所有浏览器的完美支持。**

@Font-face 让所有浏览器都兼容的方法：

字体转换网址：[https://onlinefontconverter.com/](https://link.segmentfault.com/?enc=vRAqytXjalzR8W9mie2Xjw%3D%3D.zStI%2BED01SXJMzaYar4OXaRcBHrSs7qn5zsdaVF%2BGzwiQFTEwd9x4WQ3eM30vofY)

Fira Code 字体下载地址：

[https://github.com/tonsky/FiraCode/releases/](https://github.com/tonsky/FiraCode/releases/)

## 各种字体介绍

### TTF

TTF (TrueType Font) 字体格式是由苹果和微软为 PostScript 而开发的字体格式。在 Mac 和 Windows 操作系统上，TTF 一直是最常见的格式，所有主流浏览器都支持它。然而，IE8 不支持 TTF；且 IE9 上只有被设置成 "installable" 才能支持（译注：别想了，转别的格式吧）。

TTF 允许嵌入最基本的数字版权管理标志————内置标志可以告诉我们字体作者是否允许改字体在 PDF 或者网站等处使用，所以可能会有版权问题。另一个缺点是，TTF 和 OTF 字体是没压缩的，因此他们文件更大。

### OTF

OTF (OpenType Font) 由 TTF 演化而来，是 Adobe 和微软共同努力的结果。OTF 字体包含一部分屏幕和打印机字体数据。OTF 有几个独家功能，包括支持多平台和扩展字符集。OTF 字体可以在 Macintosh 和 Windows 系统上使用。

OTF 也允许多达 65000 个字符的存储。这个额外的空间让设计师可以自由地添加附加元素，比如小帽子、老式数字体、代替的字符和其他一些以前必须作为独立字体分发的附加材料。

（译注：苹果当年为了对抗 Adobe 在 PostScript 的 Type 1 字体拉上了微软一起撸了 TTF，结果后来微软又反水跟 Adobe 搞一套 OTF，还让 IE 后面的版本取消 TTF 支持，IT 圈子还真是乱。。）

### EOT

EOT (Embedded Open Type) 字体是微软设计用来在 Web 上使用的字体。是一个在网页上试图绕过 TTF 和 OTF 版权的方案。你可以使用微软的工具从现有的 TTF/OTF 字体转成 EOT 字体使用，其中对字体进行压缩和裁剪使得文件体积更小。同时为了避免一些收版权保护的字体被随意复制，EOT 还集成了一些特性来阻止复制行为，以及对字体文件进行加密保护。听起来很有前途？嗯哼，可惜 EOT 格式只有 IE 支持。

（译注：微软曾经弄死网景的恶意竞争引起了公愤，在 IE 上推行孤立主义的微软遭到整个行业的唾弃）

### WOFF

WOFF (Web Open Font Format) 本质上是 metadata + 基于 SFNT 的字体（如 TTF、OTF 或其他开放字体格式）。该格式完全是为了 Web 而创建，由 Mozilla 基金会、微软和 Opera 软件公司合作推出。 WOFF 字体均经过 WOFF 的编码工具压缩，文件大小一般比 TTF 小 40%，加载速度更快，可以更好的嵌入网页中。metadata 允许在字体文件中包含许可数据，以解决版权问题。这是万维网联盟提（qing）倡（ding）的，所以毫无疑问的是字体格式的未来。**目前主流的浏览器的新版本几乎都支持 WOFF。**

WOFF2 是 WOFF 的下一代。 WOFF2 格式在原有的基础上提升了 30% 的压缩率。由于它还没有 WOFF 的广泛支持，所以还只是一个可展望的升级。

### SVG

SVG (Scalable Vector Graphics font) 字体格式使用 SVG 的字体元素定义。这些字体包含作为标准 SVG 元素和属性的字形轮廓，就像它们是 SVG 映像中的单个矢量对象一样。SVG 字体最大的缺点是缺少字体提示（font-hinting）。字体提示是渲染小字体时为了质量和清晰度额外嵌入的信息。同时，SVG 对文本（body text）支持并不是特别好。因为 SVG 的文本选择（text selection）目前在 Safari、Safari Mobile 和 Chrome 的一些版本上完全崩坏，所以你不能选择单个字符、单词或任何自定义选项，你只能选择整行或段落文本。

然而，如果你的目标是 iPhone 和 iPad 用户，需要说 SVG 字体是 iOS 上 Safari 4.1 以下唯一允许的字体格式。

## 明智的选择

正如你所看到的，有许多因素可能会影响 Web 字体的呈现。为了提供质量和一致性，对所有可能的 OS 和浏览器组合进行彻底测试是至关重要的。

译者能想到的无非是造一些 xx2woff（主流兼容）、xx2eot（兼容 IE）、xx2svg （向下兼容 Safari）之类的轮子然后在 webpack 中配置（在 npm 上看了下确实有已经有不少的轮子了, 2333），不过貌似还没看到最佳实践（有轮子心的同学们，机会来了！），有知道的同学欢迎在评论中补充。

原文来自 [The Missing Guide to Font Formats: TTF, OTF, WOFF, EOT & SVG](https://creativemarket.com/blog/the-missing-guide-to-font-formats) 。