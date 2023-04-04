---
title: node发送邮件
short_title: ''
description: 代码mailmjsimportnodemailerfromexportdefaultasyncfunctionsendmail(totitlemsg){创建transporterconsttransporter=nodemailercreatetransport({host_邮箱的smtp地址auth_{user_邮箱的smtp地址pass_processenvqqmail_smtp_token邮箱授权码}})_配置邮件信息constmailinfo={from_to_tosubject_titlesub
date: 2022-07-07 18:34:05
category:
  - 前端开发
tag:
  - 邮箱
  - 地址
  - 邮件
  - node
  - mail
article: true
timeline: false
---
## 代码

Mail.mjs

```js
import nodemailer from "nodemailer";

export default async function sendMail(to, title, msg) {
    // 创建transporter
    const transporter = nodemailer.createTransport({
        host: "smtp.qq.com", // 邮箱的smtp地址
        auth: {
            user: "tangyouwei@qq.com", // 邮箱的smtp地址
            pass: process.env.QQMAIL_SMTP_TOKEN // 邮箱授权码
        }
    });

    // 配置邮件信息
    const mailInfo = {
        from: "tangyouwei@qq.com",
        to: to,
        subject: title, // Subject line
        text: "仓库容量邮件通知", // plain text body
        html: msg, // html body
    };

    // 发送邮件
    const ret = await transporter.sendMail(mailInfo);
    console.log("send mail finish to " + to);
    return ret;
}
```

## 测试

Checkrepo.mjs

```js
// yarn add node-fetch -S
// yarn add babel-cli -S

import fetch from 'node-fetch';
import sendMail from "./mail.mjs"

const args = process.argv.slice(2)

console.log(args[1] + " repo size:");

fetch('https://api.github.com/repos/' + args[0] + '/' + args[1])
    .then(v => v.json()).then(async (v) => {
    const msize = (v['size'] / 1024).toFixed(2)
    const gsize = (v['size'] / 1024 / 1024).toFixed(2)
    console.log(msize + 'MB');
    console.log(gsize + 'GB');

    const repoName = args[0] + '/' + args[1]
    const to = "youweics@163.com";
    const title = "仓库【" + repoName + "】容量邮件通知邮件✔";
    const msg = "您的仓库【" + repoName + "】目前容量大小为请留意！";
    console.log("check token is=>" + process.env.QQMAIL_SMTP_TOKEN);

    const ret = await sendMail(to, title, msg);
    console.log("finish." + ret.response);
})
    .catch(err => console.log(err));

```

## 运行

```bash
node checkrepo.mjs terwer upload
```

## 效果

![image-20220707161013420](https://img1.terwergreen.com/20220707161019.png)

## 图片处理

```js
import fetch from 'node-fetch';

export default function handler(req, res) {
    // https://img1.terwergreen.com/api/public/20220706194731.png
    const imagePath = req.query.slug.join("/");
    let host = req.headers.host;
    if (host.indexOf("localhost") > -1) {
        host = "http://localhost:3000";
    } else {
        host = "https://img1.terwergreen.com";
    }
    const fileUrl = `${host}/${imagePath}`;
    console.log("fileUrl=>", fileUrl)

    fetch(fileUrl).then(async (v) => {
        if (v.status == 200) {
            const absUrl = '/' + imagePath;
            console.log("absUrl=>", absUrl)
            res.redirect(307, '/' + imagePath).end()
        } else {
            // 获取中间代理地址
            const newUrl = 'https://ghproxy.com/https://raw.githubusercontent.com/terwer/upload/main/public/' + imagePath
            console.log("newUrl=>", newUrl)
            res.redirect(307, newUrl).end()
        }
    }).catch(err => {
        console.log(err)
        res.end("500")
    });
}
```

## 测试图片

### 未同步的时候

https://img1.terwergreen.com/api/public/20220707191555.png

### 已经同步的

https://img1.terwergreen.com/api/public/20220706194731.png

‍