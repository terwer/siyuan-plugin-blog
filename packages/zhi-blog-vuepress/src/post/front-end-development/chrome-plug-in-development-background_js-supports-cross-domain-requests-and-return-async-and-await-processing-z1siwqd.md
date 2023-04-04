---
title: Chrome插件开发background_js支持跨域请求与返回async和await的处理
short_title: ''
description: backgroundjs的配置chromeruntimeonmessageaddlistener((requestsendersendresponse)={switch(requesttype){casefetchchromexmlrpc_(async()={constresponse=awaitfetch(requestapiurlrequestfetchcorsparams)_constrestext=awaitresponsetext()consolelog(restext)sendresponse
date: 2022-09-25 16:00:07
category:
  - 前端开发
tag:
  - 请求
  - 自定义
  - chrome
  - extension
  - 插件
  - async
article: true
timeline: false
---
## background.js的配置

```ts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.type) {
        case 'fetchChromeXmlrpc':
            (async () => {
                const response = await fetch(request.apiUrl, request.fetchCORSParams);
                const resText = await response.text()
                // console.log("chrome.runtime.onMessage.addListener fetchChromeXmlrpc response:", resText)
                sendResponse(resText);
            })();
            break;
        case 'fetchChromeJson':
            (async () => {
                const response = await fetch(request.apiUrl, request.fetchCORSOptions);
                const resJson = await response.json()
                console.log("chrome.runtime.onMessage.addListener fetchChromeJson response:", resJson)
                sendResponse(resJson);
            })();
            break;
        // 你可以定义任意内容，使用sendResponse()来返回它
        case 'test':
            sendResponse({'msg': 'test'});
            break;
    }

    return true; // keep the messaging channel open for sendResponse
});
```

## minifist的权限

```ts
  "host_permissions": [ "*://*/*" ],
```

完整的minifist

```ts
{
  "name": "思源笔记辅助工具",
  "version": "1.0.0",
  "manifest_version": 3,
  "author": "terwer",
  "description": "思源笔记辅助工具，支持博客式只读浏览，多平台文章发布。",
  "background": {
    "service_worker": "background.js"
  },
  "permissions": [
    "activeTab",
    "scripting"
  ],
  "host_permissions": [ "*://*/*" ],
  "web_accessible_resources": [
    {
      "resources": [
        "blog/index.html",
        "detail/index.html",
        "index.html"
      ],
      "matches": [
        "<all_urls>"
      ]
    }
  ],
  "action": {
    "default_popup": "blog/index.html"
  }
}
```

## 后台请求结果封装

```ts
/**
 * 向Chrome发送消息
 * @param message 消息
 */
export function sendChromeMessage(message: any) {
    return new Promise((resolve) => {
        // @ts-ignore
        chrome.runtime.sendMessage(message, resolve)
    })
}
```

## 解析请求数据

* xmlrpc

  ```ts
  /**
   * 自定义xmlrpc的请求与解析，解决apache xmlrpc的扩展问题
   * @param apiUrl
   * @param reqMethod
   * @param reqParams
   */
  export async function fetchCustom(apiUrl: string, reqMethod: string, reqParams: Array<string>) {
      let ret

      try {
          const methodBodyXml = Serializer.serializeMethodCall(reqMethod, reqParams, "utf8")

          // const response = await fetch(apiUrl, {
          //     method: "POST",
          //     headers: {
          //         "content-type": "text/xml"
          //     },
          //     body: methodBodyXml
          // })

          const fetchCORSParams = {
              method: "POST",
              headers: {
                  "content-type": "text/xml"
              },
              body: methodBodyXml
          }

          const resXml = await sendChromeMessage({
              // 里面的值应该可以自定义，用于判断哪个请求之类的
              type: 'fetchChromeXmlrpc',
              apiUrl: apiUrl, // 需要请求的url
              fetchCORSParams: fetchCORSParams
          });
          logUtil.logInfo("fetchChromeXmlrpc resXml=>", resXml)

          const parseResult: any = xmlParser.parse(resXml)
          logUtil.logInfo("parseResult=>", parseResult)

          const resJson = parseResult.methodResponse || {}
          logUtil.logInfo("resJson=>", JSON.stringify(resJson))

          return resJson
      } catch (e: any) {
          throw new Error(e)
      }

      return ret
  }

  /**
   * 兼容Chrome插件的xmlrpc API
   * @param apiUrl 端点
   * @param reqMethod 方法
   * @param reqParams 参数
   */
  private async fetchChromeCORS(apiUrl: string, reqMethod: string, reqParams: Array<string>): Promise<string> {
      let result
      logUtil.logInfo("fetchChrome apiUrl=>")
      logUtil.logInfo(apiUrl)

      const fetchCORSParams = {
          reqMethod: reqMethod,
          reqParams: reqParams
      }
      logUtil.logInfo("fetchChrome fetchCORSParams=>")
      logUtil.logInfo(fetchCORSParams)

      result = await fetchCustom(apiUrl, reqMethod, reqParams)
      if (!result || result == "") {
          throw new Error("请求错误或者返回结果为空")
      }
      logUtil.logInfo("fetchCustom result=>", result)

      // @ts-ignore
      // const resText = await chrome.runtime.sendMessage({
      //     // 里面的值应该可以自定义，用于判断哪个请求之类的
      //     type: 'fetchChromeXmlrpc',
      //     apiUrl: apiUrl, // 需要请求的url
      //     fetchCORSParams: fetchCORSParams
      // });
      return result
  }
  ```
* json

  ```ts
  /**
   * 请求中转支持Chrome插件跨域
   * @param apiUrl 请求地址
   * @param fetchOptions 请求参数
   * @param formJson 可选，发送form请求才需要
   */
  private async fetchChromeCORS(apiUrl: string, fetchOptions: RequestInit, formJson?: any[]): Promise<string> {
      let result
      logUtil.logInfo("fetchChrome apiUrl=>")
      logUtil.logInfo(apiUrl)

      const fetchCORSOptions = fetchOptions
      // 如果是form请求，进行转换
      if (formJson) {
          // 将formJson转换为formData
          const form = new URLSearchParams();
          formJson.forEach((item: any) => {
              form.append(item.key, item.value)
          })
          fetchCORSOptions.body = form
      }
      logUtil.logInfo("fetchChrome apiUrl=>", fetchCORSOptions)

      const resJson = await sendChromeMessage({
          // 里面的值应该可以自定义，用于判断哪个请求之类的
          type: 'fetchChromeJson',
          apiUrl: apiUrl, // 需要请求的url
          fetchCORSOptions: fetchCORSOptions
      });
      logUtil.logInfo("fetchChromeJson resJson=>", resJson)

      // @ts-ignore
      return resJson;
  }
  ```

到此，完美实现。