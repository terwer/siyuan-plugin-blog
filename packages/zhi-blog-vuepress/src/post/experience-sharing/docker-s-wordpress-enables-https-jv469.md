---
title: docker的WordPress启用https
short_title: ''
description: docker的http部署配置集成mysql的版本version_services_db_image_mysql_volumes_data_varlibmysqlports__restart_environment_mysql_root_password_wordpressmysql_database_wordpressmysql_user_wordpressmysql_password_wordpresswordpress_depends_on_dbimage_wordpress_ports__rest
date: 2022-09-16 17:30:19
category:
  - 经验分享
tag:
  - 部署
  - 使用
  - docker
  - docker-compose
  - https
  - wordpress
  - ssl
article: true
timeline: false
---
## docker 的 http 部署配置

* 集成 MySQL 的版本

  ```yaml
  version: '3.3'
  services:
     db:
       image: mysql:5.7.38
       volumes:
        - ./data:/var/lib/mysql
       ports:
        - "3307:3306"
       restart: "no"
       environment:
         MYSQL_ROOT_PASSWORD: wordpress
         MYSQL_DATABASE: wordpress
         MYSQL_USER: wordpress
         MYSQL_PASSWORD: wordpress

     wordpress:
       depends_on:
         - db
       image: wordpress:6.0.2
       ports:
         - "8000:80"
       restart: "no"
       environment:
         WORDPRESS_DB_HOST: "db:3306"
         WORDPRESS_DB_USER: "wordpress"
         WORDPRESS_DB_PASSWORD: "wordpress"
         WORDPRESS_DEBUG: 1
       volumes:
        - ./wordpress:/var/www/html
        - ./uploads.ini:/usr/local/etc/php/conf.d/uploads.ini
  ```
* 使用 rds 版本的 mysql

  ```yaml
  version: '3.3'
  services:
     wordpress:
       image: wordpress:6.0.2
       ports:
         - "80:80"
       restart: "no"
       environment:
         WORDPRESS_DB_HOST: "${MYSQL_HOST}:${MYSQL_PORT}"
         WORDPRESS_DB_NAME: "${MYSQL_DB_NAME}"
         WORDPRESS_DB_USER: "${MYSQL_USERNAME}"
         WORDPRESS_DB_PASSWORD: "${MYSQL_PASSWORD}"
         # WORDPRESS_DEBUG: 1
       volumes:
        - ./wordpress:/var/www/html
        - ./uploads.ini:/usr/local/etc/php/conf.d/uploads.ini
  ```

## 启用 https

先增加端口和 ssl 证书映射

```yaml
version: '3.3'
services:
   wordpress:
     image: wordpress:6.0.2
     ports:
       - "80:80"
       - "443:443"
     restart: "no"
     environment:
       WORDPRESS_DB_HOST: "${MYSQL_HOST}:${MYSQL_PORT}"
       WORDPRESS_DB_NAME: "${MYSQL_DB_NAME}"
       WORDPRESS_DB_USER: "${MYSQL_USERNAME}"
       WORDPRESS_DB_PASSWORD: "${MYSQL_PASSWORD}"
       # WORDPRESS_DEBUG: 1
     volumes:
      - ./wordpress:/var/www/html
      - ./uploads.ini:/usr/local/etc/php/conf.d/uploads.ini
      - ./ssl:/ssl
```

进入 wordpress 容器，加载 apache 的 ssl 模块。

```bash
[root@instance]# docker exec -it wordpress bash
root@0f05292f2238:/var/www/html# a2enmod ssl
Considering dependency setenvif for ssl:
Module setenvif already enabled
Considering dependency mime for ssl:
Module mime already enabled
Considering dependency socache_shmcb for ssl:
Enabling module socache_shmcb.
Enabling module ssl.
See /usr/share/doc/apache2/README.Debian.gz on how to configure SSL and create self-signed certificates.
To activate the new configuration, you need to run:
  service apache2 restart
```

## 编辑容器中的 ssl 文件

```bash
root@0f05292f2238:/var/www/html# vim /etc/apache2/sites-available/default-ssl.conf
```

容器中没有 vim，我们先把文件拷贝出来，然后在映射进去

```bash
root@0f05292f2238:/var/www/html# cp /etc/apache2/sites-available/default-ssl.conf /ssl/default-ssl.conf
```

ssl 证书和私钥

找到 **SSLCertificateFile 和 SSLCertificateKeyFile** 这两个配置项，改成把私钥和证书

```properties
#   A self-signed (snakeoil) certificate can be created by installing
#   the ssl-cert package. See
#   /usr/share/doc/apache2/README.Debian.gz for more info.
#   If both key and certificate are stored in the same file, only the
#   SSLCertificateFile directive is needed.
# SSLCertificateFile	/etc/ssl/certs/ssl-cert-snakeoil.pem
# SSLCertificateKeyFile /etc/ssl/private/ssl-cert-snakeoil.key
SSLCertificateFile	/ssl/certs/blog.terwergreen.com.pem
SSLCertificateKeyFile /ssl/certs/blog.terwergreen.com.key
```

## 强制 http 请求转到 https

编辑  **/etc/apache2/sites-available/000-default.conf** ，找到 <VirtualHost *:80> 标签中增加下面的配置：

```properties
<Directory "/var/www/html"> 
    RewriteEngine   on
    RewriteBase /
    # FORCE HTTPS
    RewriteCond %{HTTPS} !=on
    RewriteRule ^/?(.*) https://%{SERVER_NAME}/$1 [R,L]
</Directory>
```

这里要注意修改文件的位置

![](https://img1.terwer.space/api/public/20220916183108.png)​

## 踩坑

**如果发现没有生效看这里**

1、重建容器需要重新启用 ssl

```bash
a2enmod ssl
```

2、从 apache 的配置文件 `apache2.conf` 可以看到，apache 只会读取 `/etc/apache2/sites-enabled` 目录的配置文件，所以需要把 `/etc/apache2/sites-available` 下的 `default-ssl.conf` 文件链接到 `/etc/apache2/sites-enabled` 目录下。

```bash
ln -s /etc/apache2/sites-available/default-ssl.conf \
/etc/apache2/sites-enabled/default-ssl.conf
```

## 最终完整版的配置

```yaml
version: '3.3'
services:
   wordpress:
     image: wordpress:6.0.2
     ports:
       - "80:80"
       - "443:443"
     restart: "no"
     environment:
       WORDPRESS_DB_HOST: "${MYSQL_HOST}:${MYSQL_PORT}"
       WORDPRESS_DB_NAME: "${MYSQL_DB_NAME}"
       WORDPRESS_DB_USER: "${MYSQL_USERNAME}"
       WORDPRESS_DB_PASSWORD: "${MYSQL_PASSWORD}"
       # WORDPRESS_DEBUG: 1
     volumes:
      - ./wordpress:/var/www/html
      - ./uploads.ini:/usr/local/etc/php/conf.d/uploads.ini
      - ./ssl:/ssl
      - ./ssl-conf/default-ssl.conf:/etc/apache2/sites-available/default-ssl.conf
      - ./ssl-conf/000-default.conf:/etc/apache2/sites-available/000-default.conf
```