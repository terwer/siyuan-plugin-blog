---
title: 使用nodejs实现ed25519的公钥加密和私钥解密
short_title: ''
description: 主要使用了ed库加解密和验证代码commonjsandecmascriptmodules(esm)importasedfrom@nobleed_ifyoureusingsinglefileuseglobalvariableinstead_`windownobleed`constverifyed=asyncfunction(prikeypubkey){consolelog(prikey)consolelog(pubkey)====================新私钥开始==================
date: 2022-11-26 21:36:28
category:
  - 前端开发
tag:
  - ed25519
  - node
  - password
  - 私钥
  - 使用
  - 实现
  - 加密
  - 解密
article: true
timeline: false
---
主要使用了 ed25519 库

加解密和验证代码

```javascript
// Common.js and ECMAScript Modules (ESM)
import * as ed from '@noble/ed25519';
// If you're using single file, use global variable instead: `window.nobleEd25519`

const verifyEd = async function (prikey, pubkey) {
    console.log("你输入的私钥是：" + prikey)
    console.log("环境变量中的公钥是：" + pubkey)

    // ====================
    // 新私钥开始
    // ====================
    // const newPrivateKey = ed.utils.randomPrivateKey();
    // const privateKeyStr = Buffer.from(newPrivateKey).toString('base64');
    // console.log("new privateKey=>", privateKeyStr)
    // ====================
    // 新私钥结束
    // ====================
  
    const privateKeyStr = prikey

    const privateKey = Buffer.from(privateKeyStr, 'base64');
    // console.log("parsed privateKey=>", privateKey)

    // ====================
    // 新公钥开始
    // ====================
    // const newPublicKey = await ed.getPublicKey(privateKey);
    // const publicKeyStr = Buffer.from(newPublicKey).toString('base64');
    // console.log("new publicKey=>", publicKeyStr)
    // ====================
    // 新公钥结束
    // ====================
  
    const publicKeyStr = pubkey

    const publicKey = Buffer.from(publicKeyStr, 'base64');
    // console.log("parsed publicKey=>", publicKey)

    try {
        const valiPass = "123456";
        const message = Uint8Array.from(valiPass, x => x.charCodeAt(0))
        // const messageStr = Buffer.from(message).toString('base64');
        // console.log("校验密码：", valiPass)

        const signature = await ed.sign(message, privateKey);
        const isValid = await ed.verify(signature, message, publicKey);
        // console.log("验证结果：", isValid ? "有效" : "无效")
        return isValid;
    } catch (e) {
        console.warn("校验失败，请检查密码", e)
        return false;
    }
}

const privateKeyStr = "prikey";
const publicKeyStr = "pubkey"
const valiResult = verifyEd(privateKeyStr, publicKeyStr)
valiResult.then(function(item){
    console.log("item=>", item)
})
```