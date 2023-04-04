---
title: SpringBoot中https的配置
short_title: ''
description: 配置#https_helpaliyuncomdocument_detailhtml#https协议默认端口号为需要使用其他端口时您可以在此处自定义。serverport=#https_docsoraclecomenjavajavasedocsspecssecuritystandardnameshtml#keystoretypes#您需要使用实际的证书名称替换domain_namepfx。serversslkeystore=classpath_vpfx#填写pfxpasswordtxt文件内的密码。serv
date: 2022-07-16 22:13:14
category:
  - 经验分享
tag:
  - spring
  - https
  - spring-boot
article: true
timeline: false
---
## 配置

```yaml
# https://help.aliyun.com/document_detail/365559.html
# HTTPS协议默认端口号为443，需要使用其他端口时，您可以在此处自定义。
server.port=8002
# https://docs.oracle.com/en/java/javase/11/docs/specs/security/standard-names.html#keystore-types
# 您需要使用实际的证书名称替换domain_name.pfx。
server.ssl.key-store=classpath:v4.pfx
# 填写pfx-password.txt文件内的密码。
server.ssl.key-store-password=${SSL_KEY_PASSWORD}
server.ssl.keyStoreType=PKCS12
```

## 参考

[https://help.aliyun.com/document_detail/365559.html](https://help.aliyun.com/document_detail/365559.html)

[https://docs.oracle.com/en/java/javase/11/docs/specs/security/standard-names.html#keystore-types](https://docs.oracle.com/en/java/javase/11/docs/specs/security/standard-names.html#keystore-types)

‍