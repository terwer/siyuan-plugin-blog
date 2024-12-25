#!/bin/sh

# 使用 Cloudflare 构建配置
echo "Using Cloudflare build config as SSR build."
cp nuxt.cloudflare.config.ts nuxt.config.ts
nuxt build
echo "Nuxt build for cloudflare finished."

# 拷贝资源
# rsync -av --progress .output/public/ ./dist/
mkdir -p ../../dist/cloudflare
# rsync -av dist/ ../../dist/cloudflare
cp -r dist/ ../../dist/cloudflare
echo "Resources are copied."

echo "Cloudflare build finished."