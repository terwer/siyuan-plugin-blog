#!/bin/bash

# 使用 Docker 构建配置
echo "Using Docker build config as SSR build."

APP_VERSION=1.8.3

# 兼容 node 的构建
pnpm nodeBuild
docker compose up -d --build --remove-orphans

# 复制一份 terwer/nuxt3-blog:latest 镜像，并将它打上最新版本的标签
docker tag terwer/nuxt3-blog:latest terwer/nuxt3-blog:$APP_VERSION

# 登录 Docker Hub
# docker login

# 推送最新版本和 latest 标签
docker push terwer/nuxt3-blog:latest
docker push terwer/nuxt3-blog:$APP_VERSION