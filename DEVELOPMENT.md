# Development

## Prerequisites

```bash
pnpm install
```

## Using aliyun private image repo

```bash
docker pull node:18-alpine
docker images
docker tag a1f1d32cdee7 registry.cn-shenzhen.aliyuncs.com/terwer/dm:node-18-alpine
docker login --username=terwer@aliyun.com registry.cn-shenzhen.aliyuncs.com
docker push registry.cn-shenzhen.aliyuncs.com/terwer/dm:node-18-alpine
```

## Development

serve

```bash
pnpm dev -F siyuan-blog
# http://localhost:6808/plugins/siyuan-blog/app/#/share?id=20240408194841-jmgbco2&origin=http://192.168.3.3:6806&isSsr=false

pnpm dev -F @terwer/share-pro-app -- --host
# http://localhost:3000
# http://localhost:3000/s/20241217142133-o580ytq
# http://10.10.34.38:3000/s/20241217142133-o580ytq.html?lang=en_US
```

dev

```bash
pnpm build -F @terwer/share-pro-app -- --from siyuan
pnpm build -F siyuan-blog
pnpm makeLink
pnpm build -F siyuan-blog -- --watch

# http://localhost:6806/plugins/siyuan-blog/app/#/s/20241217142133-o580ytq
# http://localhost:6806/plugins/siyuan-blog/app/#/s/20241217142133-o580ytq?lang=en_US
```

## Build

### for siyuan-note

```bash
pnpm build -F @terwer/share-pro-app -- --from siyuan
pnpm build -F siyuan-blog
```

### for node

```bash
pnpm build -F @terwer/share-pro-app -- --from node
# for /
node ./dist/node/server/index.mjs
# custom prefix, eg:/blog
NUXT_APP_BASE_URL=blog node ./dist/node/server/index.mjs
```

for vercel

```bash
# root：apps/app
# build command
pnpm vercelBuild
```

for cloudflare

```bash
# root：apps/app
# build command
pnpm cloudflareBuild
```

## Package

```bash
pnpm package
```

artifacts structure

```
├── build
  ├── package.zip
  ├── siyuan-plugin-blog-5.4.0.zip
```

## Node Provider Mode Maintenance

1. Build

```bash
pnpm buildNodeProvider
pnpm packageNodeProvider
```

2. FTP upload `build/node-provider.zip` and replace, then extract and install

```bash
mv dist dist_bak
./install.sh
```

3. Start command

```bash
pnpm start
```