---
title: 后端服务CORS预检请求验证问题探究
short_title: ''
description: 问题探索问题引入目前在vitevue的项目中使用fetchapi调用siyuan的api时候如果加上api鉴权就会返回cors错误如下_​根据https_developermozillaorgenusdocsglossarypreflight_request这篇文章的理解在检测到cors跨域复杂请求（例如post等）时候会发送一个options的预检请求请求会返回下一个请求允许的header和method检测请求可以看到可以看到思源服务端返回的accesscontrolrequestheaders并没有a
date: 2022-08-06 13:58:45
category:
  - 经验分享
tag:
  - 请求
  - CORS
  - Authorization
  - auth
  - 跨域
article: true
timeline: false
---
## 问题探索

### 问题引入

目前在 Vite+Vue3 的项目中使用 fetch API 调用 siyuan 的 API 时候，如果加上 API 鉴权，就会返回 CORS 错误，如下：
​![](https://img1.terwergreen.com/api/public/20220806134238.png)

根据 https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request 这篇文章的理解

在检测到 CORS 跨域复杂请求（例如 POST 等）时候，会发送一个 OPTIONS 的预检请求，请求会返回下一个请求允许的 header 和 method

检测请求可以看到

![](https://img1.terwergreen.com/api/public/20220806134552.png)

![](https://img1.terwergreen.com/api/public/20220806134634.png)

可以看到思源服务端返回的 Access-Control-Request-Headers 并没有 Authorization 字段。这就是导致最终 CORS 失败的根本原因。

### 最优解决方案

查看 https://github.com/siyuan-note/siyuan/blob/master/kernel/server/serve.go) 代码可以看到，服务端是支持 CORS 的，代码如下

```
ginServer.Use(cors.Default())
```

这里实用的默认策略。我们看看详细的默认策略

![](https://img1.terwergreen.com/api/public/20220806135023.png)

可以看到并没有包含 Authorization 字段。

而 siyuan 的 API 文档鉴权部分明确表示需要在 header 传递该字段

https://github.com/siyuan-note/siyuan/blob/master/API_zh_CN.md#%E9%89%B4%E6%9D%83

解决方案：
参考了
https://stackoverflow.com/questions/29418478/go-gin-framework-cors

代码修改如下

```go
func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {

		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Credentials", "true")
		c.Header("Access-Control-Allow-Headers", "origin, Content-Length, Content-Type, Authorization")
		c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
```

然后原来的

```
ginServer.Use(cors.Default())
```

调整为

```
ginServer.Use(CORSMiddleware())
```

![](https://img1.terwergreen.com/api/public/20220806135531.png)

问题解决。

![](https://img1.terwergreen.com/api/public/20220806135619.png)

![](https://img1.terwergreen.com/api/public/20220806135641.png)

### 候选的解决方案

如果修改内核影响太大或者看看能不能把跨域策略提供配置可选。

## 参考

[https://blog.csdn.net/root_miss/article/details/82740399](https://blog.csdn.net/root_miss/article/details/82740399)

[https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request](https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request)

[https://stackoverflow.com/questions/29418478/go-gin-framework-cors](https://stackoverflow.com/questions/29418478/go-gin-framework-cors)

‍