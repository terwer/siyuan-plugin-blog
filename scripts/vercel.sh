#!/usr/bin/sh

# 使用 Vercel 构建配置
echo "Using Vercel build config as SSE and SPA build."
mv nuxt.vercel.config.ts nuxt.config.ts
pnpm build