---
title: vdoing主题vuepress的v1版本集成Artalk
short_title: ''
description: vdoing主题vuepress的v1版本集成Artalk，再也不用担心评论服务问题了。
date: 2022-07-07 00:35:48
category:
  - 前端开发
tag:
  - comment
article: true
timeline: false
---
# vdoing主题vuepress的v1版本集成Artalk

## 后端部署

[https://artalk.js.org/guide/backend/install.html#%E4%BD%BF%E7%94%A8-docker](https://artalk.js.org/guide/backend/install.html#%E4%BD%BF%E7%94%A8-docker)

使用 docker-compose 部署即可，很简单。这里需要注意的是配置 https。

可参考我的：[https://github.com/terwer/Artalk](https://github.com/terwer/Artalk)

备注：我开启了 CORS 保护，默认只有 https://terwergreen.com 域名才能引用。

## 前端部署

### 安装 Artalk 插件

```bash
yarn add vuepress-plugin-vdoing-comment -D  
```

配置评论

```typescript
plugins:{
  [
     'vuepress-plugin-vdoing-comment', // 评论
      {
        choosen: 'artalk',
        options: {
          server: 'https://my-artalk-server',
          site: '站点名称',
        }
      }
  ]
}
```

OK。

![image-20220707004134784](https://img1.terwergreen.com/20220707004135.png)

效果

![image-20220707005046846](https://img1.terwergreen.com/20220707005047.png)

## 注意

https 配置问题

这个直接咨询云服务提供方即可，我的是阿里云的，使用官方文档就配置好了。