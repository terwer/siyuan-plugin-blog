#!/usr/bin/sh

# 使用 Vercel 构建配置
echo "Using Vercel build config as SSR build."
cp nuxt.vercel.config.ts nuxt.config.ts
nuxt build