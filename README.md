[中文](README_zh_CN.md)

# Share to web

<img src="https://ghproxy.com/https://github.com/terwer/siyuan-plugin-blog/blob/main/icon.png" width="160" height="160" alt="icon">

The notion like sharing feature you've always dreamed of is here, too. 

Based on the localization concept of siyuan-note , this plugin is natively shared locally on a local area network and can be shared remotely through the docker plugin. No additional server-side support is required, just take siyuan-note.

The core idea of this plugin is: `Everything is a Page` . You can set a page to be the home page.

> Important Notice:
> 1. Version 2.0.0 introduces support for VIP versions, add mode link rules as follows:    
     /s/[id]  
     /static/[id]  
     /p/[id]  
     /post/[id]  
     /link/[id]  
     /doc/[id]  
     /article/[id]  
     /x/[id]  
     /a/[id]  
     /d/[id]  
> 2. Share pro is coming soon, please visit：https://github.com/terwerinc/siyuan-plugin-share-pro


[docs](https://blog.terwer.space/s/20230621001422-xsimx5v)

## Core Features

* **One-click sharing**: You can share your documents to the local area network with just one click. If you need to share remotely, you can deploy it on a server using Docker and then install the plugin.
* **Permission control**: Only shared pages can be viewed, and pages that have not been shared cannot be viewed without permission.
* **Expiration time**: Support setting expired time, after which you cannot view it
* **Personal homepage**: You can set a shared page as your homepage, which can be used as a custom blog homepage.
* **Theme integration**: The default theme is [Zhihu](https://github.com/terwer/siyuan-theme-zhihu), and other themes will be supported in the future.
* **SEO optimization**: support automatically generating titles, summaries, and cover images for better SEO.
* **Multiple Deployment Options**: Supports deployment as a plugin for siyuan-note, self-deployment using Docker, and hosting on Vercel to meet different needs. For more details, please see the [docs](https://blog.terwer.space/s/20230621001422-xsimx5v) .
  - [Beginner-Level] siyuan-note Plugin: Zero configuration, ready to use out of the box, runs as a local SPA application and accesses the Siyuan ontology directly, resulting in extremely fast speed but not very SEO-friendly.
  - [Expert-Level] Self-Deployment using Docker: Requires purchasing a server, SSR server-side rendering, SEO-friendly, high speed.
  - [Cost-Free Option] Vercel Hosting: Requires purchasing a domain and may not be accessible in some countries, low cost, moderate speed.
* **Sharing mode (experimental)**: Public note sharing is supported by default, and limited sharing functions can be supported after enabling the authorization code.
* **VIP Service Provider Mode**<sup>2.0.0+</sup>: Allows deploying this project as a VIP service provider, requiring backend sharing service(eg. https://github.com/terwerinc/siyuan-note-service) support.

## TODO

- [X] Support for replacing image links
- [X] Support for custom domain names
- [X] Support for internal and external links
- [X] Support task list
- [X] Support enabling sharing under authorization code (experimental)
- [X] Unordered list style adaptation
- [ ] Bulk management of shared pages
- [ ] Support single page setting sharing password
- [X] Integrate popular topics that are currently available
- [ ] Document alias access is supported
- [ ] Support displaying MD originals
- [ ] Support displaying KMD original text
- [ ] Sub document tree
- [ ] Page outline
- [ ] tags, summary
- [ ] Custom properties
- [ ] Image enlargement effect
- [X] Latex formula rendering
- [ ] plantuml chart support
- [ ] echats chart support
- [X] Support svg with svOrigin, e.g. '<use xlink:href="#iconMore'>'</use>

## Changelog

Please refer to [CHANGELOG](https://github.com/terwer/siyuan-plugin-blog/blob/main/CHANGELOG.md)

## Development

Please refer to [DEVELOPMENT](./DEVELOPMENT.md)

## Donate

If you approve of this project, invite me to have a cup of coffee, which will encourage me to keep updating and create more useful tools~

### WeChat

<div>
<img src="https://static-rs-terwer.oss-cn-beijing.aliyuncs.com/donate/wechat.jpg" alt="wechat" style="width:280px;height:375px;" />
</div>

### Alipay

<div>
<img src="https://static-rs-terwer.oss-cn-beijing.aliyuncs.com/donate/alipay.jpg" alt="alipay" style="width:280px;height:375px;" />
</div>

## Thanks

Thanks to the solutions provided by the open source community, which simplifies a lot of work for this project!

- [notion](https://notion.so)