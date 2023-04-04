---
title: 给阿里云docker中的Nginx配置SSL证书开启https服务
short_title: ''
description: 给阿里云docker中的Nginx配置SSL证书开启https服务。
date: 2022-05-28 23:53:53
category:
  - 实用技巧
  - 经验分享
tag:
  - ssl
  - aliyun
  - nginx
article: true
timeline: false
---
# 给阿里云docker中的Nginx配置SSL证书开启https服务

:::tip 文章更新历史

2022/05/29 fix:目前无法访问 https 问题已解决，根源是 docker 的443 端口忘了放。

:::

## 申请 SSL 证书

我申请的是免费版的，阿里云支持 1 年申请一次，最多部署 20 个。

地址：

[阿里云免费 SSL 证书购买](https://common-buy.aliyun.com/?spm=5176.b657008.0.0.6f7f799dnh4e4y&commodityCode=cas_dv_public_cn&request=%7B%22product%22%3A%22free_product%22%7D)

然后可以下载部署

证书管理地址：

[免费 SSL 证书管理](https://yundunnext.console.aliyun.com/?spm=5176.21213303.782131.4.738053c95GQkOa&p=cas&accounttraceid=c954f613b8a9412a81fb55251881911besdq#/certExtend/free)

我下载的是 nginx 版本。同时支持的还有 tomcat、Apache、IIS 等。

## 上传者证书到服务器

我是把它放到项目目录，后面用 docker 的 volume 去映射，这样可以免去上传的麻烦。

![image-20220529023356152](https://img1.terwer.space/20220529023356.png)

## 安装 Nginx 的 ssl 模块

检查Nginx 的 SSL 模块

安装 vscode 的 SSH 远程扩展和 docker 扩展，然后打开 docker 容器 shell

![image-20220529001634461](https://img1.terwer.space/20220529001634.png)

输入以下命令

```bash
nginx -V
```

结果如下

```bash
> Executing task: docker exec -it 154d27fd10c46b46958c05edc8736e73ba2e8618b23b6d615db3a532077b2250 sh <

/ # nginx -V
nginx version: nginx/1.15.9
built by gcc 8.2.0 (Alpine 8.2.0) 
built with OpenSSL 1.1.1a  20 Nov 2018
TLS SNI support enabled
configure arguments: --prefix=/etc/nginx --sbin-path=/usr/sbin/nginx --modules-path=/usr/lib/nginx/modules --conf-path=/etc/nginx/nginx.conf --error-log-path=/var/log/nginx/error.log --http-log-path=/var/log/nginx/access.log --pid-path=/var/run/nginx.pid --lock-path=/var/run/nginx.lock --http-client-body-temp-path=/var/cache/nginx/client_temp --http-proxy-temp-path=/var/cache/nginx/proxy_temp --http-fastcgi-temp-path=/var/cache/nginx/fastcgi_temp --http-uwsgi-temp-path=/var/cache/nginx/uwsgi_temp --http-scgi-temp-path=/var/cache/nginx/scgi_temp --user=nginx --group=nginx --with-http_ssl_module --with-http_realip_module --with-http_addition_module --with-http_sub_module --with-http_dav_module --with-http_flv_module --with-http_mp4_module --with-http_gunzip_module --with-http_gzip_static_module --with-http_random_index_module --with-http_secure_link_module --with-http_stub_status_module --with-http_auth_request_module --with-http_xslt_module=dynamic --with-http_image_filter_module=dynamic --with-http_geoip_module=dynamic --with-threads --with-stream --with-stream_ssl_module --with-stream_ssl_preread_module --with-stream_realip_module --with-stream_geoip_module=dynamic --with-http_slice_module --with-mail --with-mail_ssl_module --with-compat --with-file-aio --with-http_v2_module
/ # 
```

如果出现 `configure arguments: –with-http_ssl_module` , 则已安装（下面的步骤可以跳过，进入 nginx.conf 配置）。

![image-20220529002413870](https://img1.terwer.space/20220529002414.png)

可以看到 docker 版的 nginx 已经包含了 https 模块，我们只需要配置即可。如果是自安装版本需要自己下载 https 模块安装。

## Nginx.conf 配置

打开 nginx.conf 文件，新增 https 的 server：

```nginx
# https配置
server {
    # 服务器端口使用443，开启ssl, 这里ssl就是上面安装的ssl模块
    listen       443 ssl;
    charset utf-8;
    # 域名，多个以空格分开
    server_name  terwergreen.com www.terwergreen.com;
    
    # ssl证书地址
    ssl_certificate      /etc/ssl/certs/cert.pem;  # pem文件的路径
    ssl_certificate_key  /etc/ssl/certs/cert.key; # key文件的路径
    
    # ssl验证相关配置
    ssl_session_timeout  5m;    #缓存有效期
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;    #加密算法
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;    #安全链接可选的加密协议
    ssl_prefer_server_ciphers on;   #使用服务器端的首选算法

    location / {
        # 对应静态资源文件夹
        root /usr/local/docker/nginx/www;
        # 对应首页
        index index.html;
        # 解决登录之后刷新404
        # try_files $uri $uri/ /index.html;

        # if ($new_uri) {
        #     return 301 $new_uri;
        # }
    }
}
```

## docker 的目录映射

注意映射证书路径

```yaml
version: '3'
services:
  bugucms-nginx:
    image: bugucms/nginx:1.15.9
    container_name: bugucms-nginx
    build:
      context: ./
      dockerfile: ./bugucms-nginx/Dockerfile
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./bugucms-nginx/nginx.conf:/etc/nginx/conf.d/default.conf
      - ./bugucms-nginx/data/nginx/log:/var/log/nginx
      - ./bugucms-nginx/ssl/certs/cert.pem:/etc/ssl/certs/cert.pem
      - ./bugucms-nginx/ssl/certs/cert.key:/etc/ssl/certs/cert.key
      - /var/lib/jenkins/workspace/gitee-pages:/usr/local/docker/nginx/www
    restart: always
```

## 网络安全组放开 443 端口

![image-20220529004744658](https://img1.terwer.space/20220529004745.png)

## 重启 Nginx 验证

```bash
docker-compose up -d --build
```

直接重新开启 jenkins 部署也可以

![image-20220529004509860](https://img1.terwer.space/20220529004510.png)

## 验证 https 服务

原来的 http 模式

![image-20220529025532140](https://img1.terwer.space/20220529025532.png)

加上 https 之后

![image-20220529024835242](https://img1.terwer.space/20220529024835.png)

可以看到，网站前面已经有一把锁了，https 部署成功。Yeah~

## 后续

为了适应 https 的潮流，我们可以更进一步，将 http 重定向 https。

只需要加上下面的 301 跳转代码即可。

```nginx
server {
    listen       80;
    server_name  terwergreen.com www.terwergreen.com;
    return 301 https://$server_name$ request_uri;
}
```

## 后记

一个乌龙，之前一致无法访问，还以为是阿里云的问题，后来，**无意间发现是我 docker 的443端口没开**，汗。。。

![image-20220529024557848](https://img1.terwer.space/20220529024558.png)

细心！细心！细心！切记~