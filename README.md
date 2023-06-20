[中文](README_zh_CN.md)

# Share to web

<img src="https://ghproxy.com/https://github.com/terwer/siyuan-plugin-blog/blob/main/icon.png" width="160" height="160" alt="icon">

The notion like sharing feature you've always dreamed of is here, too. 

Based on the localization concept of siyuan-note , this plugin is natively shared locally on a local area network and can be shared remotely through the docker plugin. No additional server-side support is required, just take siyuan-note.

The core idea of this plugin is: `Everything is a Page` . You can set a page to be the home page.

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

## TODO

* [ ] Support setting a sharing password for a single page
* [ ] Integrate popular themes that are currently available
* [ ] Support document alias access
* [ ] Support replacing image hosting links
* [ ] Display MD original text
* [ ] Display KMD original text
* [ ] Document tree for sub-documents
* [ ] Page outline
* [ ] Tags and summaries
* [ ] Custom properties
* [ ] Image zoom effect
* [ ] Latex formula rendering
* [ ] PlantUML chart support
* [ ] Echarts chart support
* [ ] Support for SVG with the ribbon, eg `<use xlink:href="#iconMore"></use>`

## Changelog

Please refer to [CHANGELOG](https://github.com/terwer/siyuan-plugin-blog/blob/main/CHANGELOG.md)

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