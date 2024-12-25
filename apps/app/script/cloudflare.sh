#!/bin/sh

# 使用 Cloudflare 构建配置
echo "Using Cloudflare build config as SSR build."
cp nuxt.cloudflare.config.ts nuxt.config.ts
nuxt build
echo "Nuxt build for cloudflare finished."