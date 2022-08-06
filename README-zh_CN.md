# node-siyuan

基于思源笔记api的博客

这是一个使用 [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) 创建的 [Next.js](https://nextjs.org/) 项目.

## 预览

[https://terwer.space](https://terwer.space)

## 入门

首先，运行开发服务器：

```bash
yarn dev
```

打开 [http://localhost:3000](http://localhost:3000) 使用浏览器查看结果。

您可以通过修改 `pages/index.tsx` 开始编辑页面。编辑文件时，页面会自动更新。

[API routes](https://nextjs.org/docs/api-routes/introduction) 可以在 [http://localhost:3000/api/hello](http://localhost:3000/api/hello) 访问. 可以在 `pages/api/hello.ts` 中编辑该端点。`pages/api` 目录映射到 `/api/*` 。此目录中的文件被视为 [API routes](https://nextjs.org/docs/api-routes/introduction) 而不是响应页面。

## 了解更多信息

了解更多关于Next的信息。js，看看以下资源：

- [Next.js文档](https://nextjs.org/docs) - Next.js 特性和 API 。

- [了解Next.js](https://nextjs.org/learn) - Next.js 教程。

您可以查看[Next.js GitHub存储库](https://github.com/vercel/next.js/) - 欢迎您的反馈和贡献！

## 设置环境变量

复制 `.env.local` ，此目录中的示例文件本地Git将忽略：

```bash
cp .env.local.example .env.local
```

然后打开。env。本地并将 SIYUAN_API_URL 设置为思源笔记端点的URL。例如：http://127.0.0.1:6806.

您的 `.env.local` 文件应如下所示：

```
SIYUAN_API_URL=...
# some api need to pass token
SIYUAN_AUTH_TOKEN=...
# publish post
PUBLISH_SITE_URL=
```

## 部署在Vercel上

[![使用Vercel部署](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/terwer/node-siyuan/tree/main&project-name=node-siyuan&repository-name=node-siyuan&env=SIYUAN_API_URL,SIYUAN_TOKEN&envDescription=Required%20to%20connect%20the%20app%20with%20siyuan-note)

查看我们的 [Next.js部署文档](https://nextjs.org/docs/deployment) 了解更多详细信息。