[English](README.md)

# 在线分享

<img src="https://ghproxy.com/https://github.com/terwer/siyuan-plugin-blog/blob/main/icon.png" width="160" height="160" alt="icon">

您梦寐以求的类 notion 分享功能，这里也有。

基于思源笔记的本地化理念，本插件原生支持本地局域网分享、并且可通过 docker 版插件支持远程分享。无需任何额外的服务端支持，有思源笔记即可。

本插件的核心理念是：`一切皆页面` 。您可以设置某个页面为主页。

## 核心特色

- **一键分享**：支持一键分享文档到局域网，如果需要远程分享，可使用 docker 部署在服务器，然后安装插件
- **权限控制**：只能查看已分享的页面，未分享的页面无权限查看
- **过期时间**：支持设置过期时间，过期时间之后将无法查看
- **个人主页**：支持设置已分享的某个页面为主页，可作为自定义博客主页
- **主题集成**：默认集成 默认主题 和 [Zhihu](https://github.com/terwer/siyuan-theme-zhihu) 主题，后续可支持切换其他主题
- **SEO优化**：支持自动生成标题、摘要、首图，便于SEO
- **多种部署**：支持思源笔记插件、docker自部署、Vercel托管满足各种人群的需求，详情请看 [docs](https://ghproxy.com/https://github.com/terwer/siyuan-plugin-blog/blob/main/docs)
  - [入门级]思源笔记插件：零配置，开箱即用，本地SPA应用，直接访问思源本体，因此速度极快，但是SEO不太友好
  - [高手级]docker自部署：需要自己购买服务器，SSR服务端渲染，SEO友好，速度快
  - [白嫖级]Vercel托管：需要自己购买域名，否则可能无法访问，成本低，速度适中

## TODO

- [ ] 支持单页面设置分享密码
- [ ] 集成目前已有的热门主题
- [ ] 支持文档别名访问
- [ ] 支持替换图床链接
- [ ] 支持显示 MD 原文
- [ ] 支持显示 KMD 原文
- [ ] 子文档文档树
- [ ] 页面大纲
- [ ] 标签、摘要
- [ ] 自定义属性
- [ ] 图片放大效果
- [ ] Latex 公式渲染
- [ ] plantuml 图表支持
- [ ] echats 图表支持
- [ ] 支持思源自带的svg，例如 `<use xlink:href="#iconMore"></use>`

## 更新历史

请参考 [CHANGELOG](https://github.com/terwer/siyuan-plugin-blog/blob/main/CHANGELOG.md)

## 捐赠

如果您认可这个项目，请我喝一杯咖啡吧，这将鼓励我持续更新，并创作出更多好用的工具~

### 微信

<div>
<img src="https://static-rs-terwer.oss-cn-beijing.aliyuncs.com/donate/wechat.jpg" alt="wechat" style="width:280px;height:375px;" />
</div>

### 支付宝

<div>
<img src="https://static-rs-terwer.oss-cn-beijing.aliyuncs.com/donate/alipay.jpg" alt="alipay" style="width:280px;height:375px;" />
</div>

## 感谢

感谢来自开源社区提供的解决方案，简化了本项目的不少工作！

- [notion](https://notion.so)