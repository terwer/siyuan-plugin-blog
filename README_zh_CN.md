[English](README.md)

# 在线分享

您的自部署 notion 替代品

## 服务商开发模式启动

```bash
# cp .env .env
# 修改 NUXT_PUBLIC_PROVIDER_URL，或者使用默认
pnpm devApp
```

## 服务商生产模式启动

```bash
# cp ./startup.example.sh ./startup.sh
# 修改 NUXT_PUBLIC_PROVIDER_URL，或者使用默认
./startup.sh
```

## 服务商生产模式打包

```bash
pnpm buildNodeProvider
pnpm packageNodeProvider
```

## 详细了解

[功能介绍](https://siyuan.wiki/s/20250111132959-fv1bjrw)
