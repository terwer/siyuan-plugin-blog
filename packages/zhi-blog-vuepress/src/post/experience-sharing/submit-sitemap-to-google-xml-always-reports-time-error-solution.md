---
title: 向google提交sitemap.xml总是报时间错误解决
short_title: ''
description: xml提交到google search console后总是提示：日期无效，发现无效日期。请修正日期或格式，然后重新提交。
date: 2022-07-03 16:30:39
category:
  - 经验分享
tag:
  - google
  - sitemap
article: true
timeline: false
---
# 向google提交sitemap.xml总是报时间错误解决

xml 提交到 google search console 后总是提示：

```html
日期无效
发现无效日期。请修正日期或格式，然后重新提交。 父标记：url
```

xml 原文：

```xml
<?xml version="1.0" encoding="utf-8"?>
<urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
<url>
  <loc>http://www.test.com/test.html</loc>
  <priority>0.80</priority>
  <lastmod>2020-04-28 00:00:00</lastmod>
  <changefreq>daily</changefreq>
</url>
</urlset>
```

`lastmod` 时间需要转换一下，不能直接使用事件对象，需要使用

```js
new Date().toISOString()  
// "2020-12-30T01:08:56.543Z"
```