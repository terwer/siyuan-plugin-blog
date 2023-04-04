---
title: docker部署思源笔记并配置nginx支持https
short_title: ''
description: dockercompsoe的完整配置dockercomposeyml#构建dockercompose项目#dockercomposeloglevelinfoupbuild#dockercomposeloglevelinfoupdbuildversion_services_terwernginx_image_terwernginx_container_name_terwernginxbuild_context_terwernginxdockerfile_dockerfileports_volumes_ter
date: 2022-07-16 19:25:33
category:
  - 经验分享
tag:
  - 配置
  - 支持
  - 完整
  - docker
  - siyuan
  - 思源笔记
  - nginx
  - docker-compose
article: true
timeline: false
---
## docker compsoe的完整配置

## docker-compose.yml

```yaml
# 构建docker-compose项目
# docker compose --log-level INFO up -- build
# docker compose --log-level INFO up -d --build

version: '3'
services:
  terwer-nginx:
    image: terwer/nginx:1.15.9
    container_name: terwer-nginx
    build:
      context: ./terwer-nginx
      dockerfile: Dockerfile
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./terwer-nginx/nginx.conf:/etc/nginx/conf.d/default.conf
      - ./terwer-nginx/data/nginx/log:/var/log/nginx
      - ./terwer-nginx/ssl/v4.pem:/etc/ssl/v4.pem
      - ./terwer-nginx/ssl/v4.key:/etc/ssl/v4.key
    restart: "no"
  siyuan-nginx:
    image: siyuan/nginx:1.15.9
    container_name: siyuan-nginx
    build:
      context: ./siyuan-nginx
      dockerfile: Dockerfile
    ports:
      - "9000:9000"
      - "9001:9001"
    volumes:
      - ./siyuan-nginx/nginx.conf:/etc/nginx/conf.d/default.conf
      - ./siyuan-nginx/data/nginx/log:/var/log/nginx
      - ./siyuan-nginx/ssl/siyuan.pem:/etc/ssl/siyuan.pem
      - ./siyuan-nginx/ssl/siyuan.key:/etc/ssl/siyuan.key
    restart: "no"
```

## JVue支持配置支持https反向代理

terwer-nginx

```yaml
server {
    listen 80;
    listen 443 ssl http2;
    charset utf-8;
    server_name siyuan.terwergreen.com;

    if ($server_port !~ 443){
        rewrite ^(/.*)$ https://$host$1 permanent;
    }
    # HTTP_TO_HTTPS_END

    ssl_certificate        /etc/ssl/v4.pem;
    ssl_certificate_key    /etc/ssl/v4.key;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    error_page 497  https://$host$request_uri;
    # SSL-END

    # jvue-front 前台
    location / {
        proxy_pass http://120.25.179.230:3000;
        index  index.html index.htm;
    }

    # jvue-server 接口服务器
    location /api/ {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_pass http://120.25.179.230:8002;
    }

    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /usr/share/nginx/html;
    }
}
```

## 思源笔记配置支持https反向代理

siyuan-nginx

```yaml
server{
    listen 9001;
    listen 9000 ssl http2;
    server_name siyuan.terwergreen.com;
    index index.php index.html index.htm default.php default.htm default.html;
    root /var/www/html;

    if ($server_port !~ 9000){
        rewrite ^(/.*)$ https://$host$1 permanent;
    }
    # HTTP_TO_HTTPS_END

    ssl_certificate        /etc/ssl/siyuan.pem;
    ssl_certificate_key    /etc/ssl/siyuan.key;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    error_page 497  https://$host$request_uri;
    # SSL-END

    location / {
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   Host      $http_host;
        proxy_pass         http://120.25.179.230:6806;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'Upgrade';
        client_max_body_size 100m;
    }

    location /ws {
        proxy_pass         http://120.25.179.230:6806;
        proxy_read_timeout 60s;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'Upgrade';
    }
}
```

## 注意事项

1、注意证书的合适位置与docker目录映射；

2、证书域名与nginx的域名要保持一致；

3、注意暴露端口，内外网端口，还有云服务器的网络与安全组。

‍