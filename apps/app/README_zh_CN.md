[English](README.md)

# 查看页应用

`apps/app` 是统一的查看页应用。

它同时服务两条产品链路：

- 免费链路：
  `apps/siyuan` -> 宿主思源内核 / 本地 public 文件 -> `apps/app`
- 专业版链路：
  `share-pro` -> `siyuan-note-service` -> `apps/app`

## 目标

- `siyuan`
  嵌入在思源里的免费版 SPA 查看页。
- `node`
  带 server 能力的 SSR 查看页。
- `vercel`
  带 server 能力的部署目标。
- `cloudflare`
  带 server 能力的部署目标。

## 安装

```bash
pnpm install
```

## 开发

本地运行带 server 能力的查看页：

```bash
cd apps/app
bash script/dev.sh
```

## 构建

构建免费版 Siyuan SPA 查看页：

```bash
cd apps/app
bash script/siyuan.sh
```

这个脚本会临时切换到 `nuxt.siyuan.config.ts`，完成免费版 SPA 查看页构建后，再自动恢复 `nuxt.config.ts`。

构建 Node 查看页：

```bash
cd apps/app
bash script/node.sh
```

构建 Vercel 查看页：

```bash
cd apps/app
bash script/vercel.sh
```

构建 Cloudflare 查看页：

```bash
cd apps/app
bash script/cloudflare.sh
```
