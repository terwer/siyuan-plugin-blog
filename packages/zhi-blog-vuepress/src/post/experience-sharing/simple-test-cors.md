---
title: 简单测试CORS
short_title: ''
description: CORS的简单测试方法。
date: 2022-06-16 02:05:19
category:
  - 实用技巧
  - 经验分享
tag:
  - cors
  - xhr
article: true
timeline: false
---
## 测试脚本

```javascript
const xhr = new XMLHttpRequest();
const url = 'https://xmlrpc.terwergreen.com/api/xmlrpc';

xhr.open('GET', url);
xhr.onreadystatechange = function(){
  if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
    console.log(xhr.responseText)
  }
};
xhr.send();
```

结果

```bash
Access to XMLHttpRequest at 'https://xmlrpc.terwergreen.com/api/xmlrpc' from origin 'https://nextjs.org' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
_app-4ccd7c9a287b6dc7.js:1          
GET https://xmlrpc.terwergreen.com/api/xmlrpc net::ERR_FAILED 200
```

![image-20220616022517361](https://img1.terwer.space/20220616022520.png)

## 测试脚本2

```javascript
const xhr = new XMLHttpRequest();
const url = 'https://xmlrpc.terwergreen.com/api/hello';

xhr.open('GET', url);
xhr.onreadystatechange = function(){
  if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
    console.log(xhr.responseText)
  }
};
xhr.send();
```

代码如下

```javascript
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}
```

## 测试脚本3

```javascript
const xhr = new XMLHttpRequest();
const url = 'https://xmlrpc.terwergreen.com/api/cors';

xhr.open('GET', url);
xhr.onreadystatechange = function(){
  if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
    console.log(xhr.responseText)
  }
};
xhr.send();
```

修改代码之后，正常

```javascript
import Cors from 'cors'
import initMiddleware from '../../lib/init-middleware'

// Initialize the cors middleware
const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
        // Only allow requests with GET, POST and OPTIONS
        methods: ['GET', 'POST', 'OPTIONS'],
    })
)

export default async function handler(req, res) {
    // Run cors
    await cors(req, res)

    // Rest of the API logic
    res.json({ message: 'Hello Everyone!' })
}
```

![image-20220616023424123](https://img1.terwer.space/20220616023427.png)

## 参考

[https://nextjs.org/docs/api-routes/api-middlewares](https://nextjs.org/docs/api-routes/api-middlewares)