---
title: Java中HTML与Textarea换行符的相互转换
short_title: ''
date: 2022-04-25 17:03:40
category:
  - 实用技巧
  - 经验分享
tag:
  - java
  - code-snapshot
article: true
timeline: false
---
HTML与Textarea中换行符相互转化。

```java
/**
 * Html转换为TextArea文本
 *
 * @return
 */
public static String HtmlToText(String str) {
	if (str == null) {
		return "";
	} else if (str.length() == 0) {
		return "";
	}
	str = str.replaceAll("<br />", "\r\n");
	return str;
}

/**
 * TextArea文本转换为Html:写入数据库时使用
 */
public static String Text2Html(String str) {
	if (str == null) {
		return "";
	} else if (str.length() == 0) {
		return "";
	}
	str = str.replaceAll("\r\n", "<br />");
	return str;
}
```