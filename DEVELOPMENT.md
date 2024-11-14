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
pnpm serve

# available links for serve test
# http://localhost:4000/share?id=20240408194841-jmgbco2&origin=http://192.168.3.3:6806&isSsr=false
#
# http://localhost:4000
# http://localhost:4000/s/20240408194841-jmgbco2
```

dev

```bash
pnpm makeLink
pnpm dev
```

## Build

```bash
pnpm build
```

## Package

```bash
pnpm package
```

artifacts structure

```
├── build
  ├── package.zip
  ├── siyuan-plugin-blog--1.8.5.zip
```

Note: vercel is also supported via `pnpm vercelBuild`

## Sync to legacy widget repo

```bash
pnpm syncWidgetRepo
```