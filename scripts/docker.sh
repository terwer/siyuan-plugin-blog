#!/usr/bin/sh

# 使用 Docker 构建配置
echo "Using Docker build config as SSR build."
pnpm nodeBuild
docker compose up --build