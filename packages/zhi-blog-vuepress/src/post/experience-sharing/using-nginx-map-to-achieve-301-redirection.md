---
title: 利用Nginx的map实现301重定向
short_title: ''
date: 2022-04-28 15:53:54
category:
  - 实用技巧
  - 经验分享
tag:
  - nginx
  - seo
  - '301'
article: true
timeline: false
---
很多时候，我们先写了一篇文章，但是还没来得及命名号好友好的url，就已经发出去了。后来我们完成了文章，修改了文章链接，但是这时候原先的文章已经被收录了，用户点击就会导致404。这样是非常不好的，一个比较好的办法就是利用Nginx的301永久重定向，这样用户访问失效的页面就能自动跳转到新压面，还不会影响SEO。

<!-- more -->

# 利用Nginx的map实现301重定向

## 链接错误对SEO的影响

- 301重定向

  使用301重定向来永久重定向页面。“永久”这个词意味着重定向页面的所有权重都会被传递到指向页面。

  如果我们把一个地址采用301跳转方式跳转的话，搜索引擎会把老地址的PageRank等信息带到新地址，同时在搜索引擎索引库中彻底废弃掉原先的老地址。

  **一般使用301比较好。**

- 302重定向

  302重定向，一般是做临时性的跳转，是暂时性的，在使用的过程中也会比较常见，不过各位在使用的过程中不要使用太多的302重定向，因为搜索引擎会认为新的跳转url是临时性的，用得过多的话，可能会导致降权处理，这个也是我们必须要去重视的一个地方，千万不要因为使用比较多的302重定向，而导致我们的网站被降权。

  302重定向将不会将重定向页面的所有权重质量传递到指向页面。重定向页面仍将保留其网页排名、页面权限和流量价值。并且指向页面不会累积任何页面的权重。

  **错误地使用302重定向是非常危险的。这会严重损害你网站的搜索引擎可见性。**

## Nginx的配置

修改 `nginx.conf` 文件配置如下：

```bash
map_hash_max_size 262144; # see http://nginx.org/en/docs/hash.html
map_hash_bucket_size 262144;
map $request_uri $new_uri {
    include /usr/local/docker/nginx/www/seo301.map; # or any file readable by nginx
}

server {
    listen     80;
    charset utf-8;

    location / {
        # 对应静态资源文件夹
        root /usr/local/docker/nginx/www;
        # 对应首页
        index index.html;
        # 解决登录之后刷新404
        # try_files $uri $uri/ /index.html;

        if ($new_uri) {
            return 301 $new_uri;
        }
    }
}
```

PS：如果你使用的是 `docker` 部署，注意要加上目录映射，例如我的 `docker-compose.yml` 文件：

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
    volumes:
      - ./bugucms-nginx/nginx.conf:/etc/nginx/conf.d/default.conf
      - ./data/nginx/log:/var/log/nginx
      - /var/lib/jenkins/workspace/gitee-pages:/usr/local/docker/nginx/www
    restart: always
```

## 结合Vdoing主题生成seo301.map文件

### 生成的seo301.map文件

```
/pages/790154/ /post/netty-codec.html;
/pages/efebb8/ /post/http-server-development-based-on-netty.html;
```

## 生成map的js代码

seo301.js

````javascript
/**
 * 生成301映射文件
 */
const fs = require('fs');
const path = require('path');
const chalk = require('chalk')
const matter = require('gray-matter'); // FrontMatter解析器 https://github.com/jonschlinkert/gray-matter
const readFileList = require('./modules/readFileList');
const urlsRoot = path.join(__dirname, '..', 'seo301.map'); // 百度链接推送文件
const DOMAIN = process.argv.splice(2)[0]; // 获取命令行传入的参数
const dayjs = require('dayjs')

main();

/**
* 主体函数
*/
function main() {
    // 解决下面一行会产生的空行问题
    fs.closeSync(fs.openSync(urlsRoot, 'w'));
    // fs.writeFileSync(urlsRoot, "")

    const files = readFileList(); // 读取所有md文件数据

    let idx = 1;
    files.forEach(file => {
        const { data } = matter(fs.readFileSync(file.filePath, 'utf8'));
        if (data.oldlink && data.permalink) {
            console.log("301映射from=>", data.oldlink)
            console.log("301映射to=>", data.permalink)
            if(idx > 1){
                fs.appendFileSync(urlsRoot, "\n");
            }
            fs.appendFileSync(urlsRoot, data.oldlink);
            fs.appendFileSync(urlsRoot, " ");
            fs.appendFileSync(urlsRoot, data.permalink);
            fs.appendFileSync(urlsRoot, ";");
            idx++;
        }
    });
    console.log("301映射完成")
}
````

## 参考

[https://stackoverflow.com/questions/29354142/nginx-how-to-mass-permanent-redirect-from-a-given-list](https://stackoverflow.com/questions/29354142/nginx-how-to-mass-permanent-redirect-from-a-given-list)

[https://www.cnblogs.com/shichangchun/p/11653487.html](https://www.cnblogs.com/shichangchun/p/11653487.html)