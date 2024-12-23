[中文](./DEVELOPMENT_zh_CN.md)

# Development Guide

## Directory Structure

```
├── apps
│   ├── 
│   ├── 
│   └── 
├── packages
│   └── 
```

## Prerequisites

```bash
pnpm prepareBuild
pnpm install
```

## Serving Debugging

```bash
pnpm dev -F @terwer/share-pro-siyuan
```

## Simple Debugging

```bash
pnpm build -F @terwer/share-pro-siyuan -- --watch
```

## Build for production

```bash
pnpm build -F @terwer/share-pro-siyuan
```