---
title: Java获取url中参数
short_title: ''
description: 方案在java中你可以利用urlencoder​​和urldecoder​​来对url字符串进行编解码然后使用stringsplit()​方法或者使用正则表达式​来从url字符串中获取参数。代码示例获取url中的参数at_paramurl链接at_paramkey参数keyat_return参数值publicstaticstringgetparameterfromurl(stringurlstringkey){string[]params=urlsplit(string[]queryparams=para
date: 2023-02-03 10:53:53
category:
  - 经验分享
tag:
  - 参数
  - 获取
  - 字符串
  - 使用
  - 方案
article: true
timeline: false
---
## 方案

在 Java 中，你可以利用 `URLEncoder ​` ​和 `URLDecoder ​` ​来对 URL 字符串进行编解码，然后使用 `String.split()`​ 方法或者使用 `正则表达式`​ 来从 URL 字符串中获取参数。

## 代码示例

```java
/**
 * 获取url中的参数
 *
 * @param url 链接
 * @param key 参数key
 * @return 参数值
 */
public static String getParameterFromUrl(String url, String key) {
	String[] params = url.split("\\?");
	String[] queryParams = params[1].split("&");

	String result = "";
	for (String queryParam : queryParams) {
		String[] param = queryParam.split("=");
		// System.out.println("key: " + param[0] + " value: " + param[1]);
		if (param[0].equals(key)) {
			result = param[1];
			break;
		}
	}

	return result;
}
```

注意：上面的参数值有 `=`​ 会有 bug，建议使用下面的：

```java
/**
 * 获取url中的参数
 *
 * @param url 链接
 * @param key 参数key
 * @return 参数值
 */
public static String getParameterFromUrl(String url, String key) {
	HashMap<String, String> urlMap = new HashMap<String, String>();
	String queryString = StringUtils.substringAfter(url, "?");
	for (String param : queryString.split("&")) {
		urlMap.put(StringUtils.substringBefore(param, "="), StringUtils.substringAfter(param, "="));
	}
	return urlMap.get(key);
}
```