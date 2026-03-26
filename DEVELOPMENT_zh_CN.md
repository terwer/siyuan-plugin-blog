# 开发指南

## 产品拆分

当前仓库刻意把创作端与查看端分开，但它并不是完整产品体系的全部。

本仓库内：

- `apps/siyuan`
  免费版创作端前端。
  它以思源插件形式存在，负责在宿主思源内部进行创作与触发分享。
- `apps/app`
  统一查看页。
  当前支持 `siyuan`、`node`、`vercel`、`cloudflare` 四类目标。

本仓库外：

- `share-pro`
  收费版 / 专业版创作端前端。
- `siyuan-note-service`
  收费版 / 专业版后端服务。

因此真实链路分成两条：

- 免费链路：
  `apps/siyuan` -> 宿主思源内核 / 本地 public 存储 -> `apps/app` 查看页
- 专业版链路：
  `share-pro` -> `siyuan-note-service` -> `apps/app` 查看页

这里最关键的产品边界是：

- 免费创作端直接调用宿主思源 API。
- 免费创作链路没有你自己的业务后端参与。
- 只有独立的专业版产品线才会接入后端。

### AI 助手约定

- AI 是依赖 server 的查看页能力。
- `siyuan` 目标是免费版 SPA 查看页，因此在构建目标层就禁用 AI。
- `node` / `vercel` / `cloudflare` 这三类带 server 的查看页才允许展示 AI。
- 查看页只消费冻结后的分享快照：
  `post.aiAssistantEnabled`
- 不要再用 `static.app.config.json` 直接驱动查看页 AI 显示逻辑。

当前有效规则：

`showAI = viewerCapability.aiAssistant && post.aiAssistantEnabled && hasMeaningfulContent`

## 准备工作

```bash
pnpm install
```


## 使用阿里云私有镜像仓库

```bash
docker pull node:18-alpine
docker images
docker tag a1f1d32cdee7 registry.cn-shenzhen.aliyuncs.com/terwer/dm:node-18-alpine
docker login --username=terwer@aliyun.com registry.cn-shenzhen.aliyuncs.com
docker push registry.cn-shenzhen.aliyuncs.com/terwer/dm:node-18-alpine
```


## 开发

### 启动开发服务器

```bash
# 免费版 Siyuan SPA 查看页（按设计禁用 AI）
pnpm build -F @terwer/share-pro-app -- --from siyuan
pnpm build -F siyuan-blog
pnpm makeLink
pnpm build -F siyuan-blog -- --watch

# http://localhost:6806/plugins/siyuan-blog/app/#/s/20241217142133-o580ytq
# http://localhost:6806/plugins/siyuan-blog/app/#/s/20241217142133-o580ytq?lang=en_US
```

### 构建和链接

```bash
pnpm makeLink
# 免费版 Siyuan SPA 查看页（按设计禁用 AI）
pnpm build -F @terwer/share-pro-app -- --from siyuan
pnpm build -F siyuan-blog -- --watch
```


## 构建

### 为思源笔记构建

```bash
# 免费版 SPA 查看页，AI 助手禁用
pnpm build -F @terwer/share-pro-app -- --from siyuan
```


### 为 Node.js 构建

```bash
pnpm build -F @terwer/share-pro-app -- --from node
# 对于根路径 /
node ./dist/node/server/index.mjs
# 自定义前缀，例如：/blog
NUXT_APP_BASE_URL=blog node ./dist/node/server/index.mjs
```


### 为 Vercel 构建

```bash
# 根目录：apps/app
# 构建命令
pnpm vercelBuild
```


### 为 Cloudflare 构建

```bash
# 根目录：apps/app
# 构建命令
pnpm cloudflareBuild
```

## 关于 `siyuan` 构建

- `apps/app/script/siyuan.sh` 现在会安全地临时切换到 `nuxt.siyuan.config.ts`，执行构建后自动恢复 `nuxt.config.ts`
- 这个目标是免费版 SPA 查看页，不是带 server 的 AI 查看页
- 不要用 `siyuan` 目标验证 AI API 或 server 路由
- AI 能力验证应放在 `node`、`vercel`、`cloudflare` 目标下进行

## 脚本说明

查看页脚本现在统一采用“临时切换目标配置 -> 执行命令 -> 自动恢复 `nuxt.config.ts`”的方式：

- `apps/app/script/siyuan.sh`
  临时切换到 `nuxt.siyuan.config.ts`，执行 `pnpm exec nuxi generate`，再自动恢复
- `apps/app/script/node.sh`
  临时切换到 `nuxt.node.config.ts`，执行 `pnpm exec nuxi build`，再自动恢复
- `apps/app/script/vercel.sh`
  临时切换到 `nuxt.vercel.config.ts`，执行 `pnpm exec nuxi build`，再自动恢复
- `apps/app/script/cloudflare.sh`
  临时切换到 `nuxt.cloudflare.config.ts`，执行 `pnpm exec nuxi build`，再自动恢复
- `apps/app/script/dev.sh`
  临时切换到 `nuxt.node.config.ts`，执行 `pnpm exec nuxi dev --host`，结束后自动恢复

默认不要直接使用 `nuxi -c <config>` 作为本仓库的多目标构建入口。

在当前这套多配置结构里，最稳定的方式仍然是走仓库提供的脚本，因为它们会负责切换目标配置并在命令结束后恢复。


## 打包

```bash
pnpm package
```


### 打包后的文件结构

```
├── build
  ├── package.zip
  ├── siyuan-plugin-blog-5.4.0.zip
```

## 服务商模式维护

1. 打包

```
pnpm buildNodeProvider
pnpm packageNodeProvider
```

2. 然后 ftp 上传 `build/node-provider.zip` 并替换，接着解压安装

```
mv dist dist_bak
./install.sh
```

3. 启动命令

```
pnpm start
```
