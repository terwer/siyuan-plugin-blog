# 开发指南

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
pnpm build -F @terwer/share-pro-app -- --from siyuan
pnpm build -F siyuan-blog -- --watch
```


## 构建

### 为思源笔记构建

```bash
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