---
title: Struts2使用标签库找不到URI:[struts-tags]的taglib[s]问题解决
short_title: ''
description: 找到strutscore​的jar​包将其复制到无关文件夹中当作压缩文件解压在其中的metainf​​目录中找到strutstagstld​​文件将其复制到项目中webappwebinf​​目录下然后在webxml​​文件中（之前）添加以下内容_
date: 2022-10-30 13:17:38
category:
  - 经验分享
tag:
  - struts2
  - tablib
  - 标签库
  - not-found
  - uri
  - struts-tags
article: true
timeline: false
---
找到 `struts2-core`​ 的 `jar`​ 包，将其复制到无关文件夹中，当作压缩文件解压，在其中的 `META-INF`​​ 目录中找到 `struts-tags.tld`​​ 文件，将其复制到项目中 `webapp/WEB-INF`​​ 目录下，然后在 `web.xml`​​ 文件中 （之前） 添加以下内容：

```xml
<!--配置/struts-tag位置-->
<jsp-config>
    <taglib>
        <taglib-uri>s</taglib-uri>
        <taglib-location>/WEB-INF/struts-tags.tld</taglib-location>
    </taglib>
</jsp-config>
```