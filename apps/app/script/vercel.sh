#!/bin/sh

# 使用 Vercel 构建配置
echo "Using Vercel build config as SSR build."
cp nuxt.vercel.config.ts nuxt.config.ts
nuxt build
echo "Nuxt build for vercel finished."

# 拷贝资源
# rsync -av --progress .output/public/ ./dist/
mkdir -p ../../dist/vercel
#rsync -av .vercel/output/ ../../dist/vercel
cp -r .vercel/output/ ../../dist/vercel
echo "Resources are copied."

echo "Vercel build finished."