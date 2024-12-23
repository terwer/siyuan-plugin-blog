[英文](./DEVELOPMENT.md)

# 开发指南

## 目录结构

```
├── apps
│   ├── 
│   ├── 
│   └── 
├── packages
│   └── 
```

## 预准备

```bash
# 调试准备，编译 rust 核心服务
pnpm prepareBuild
# 安装依赖
pnpm install
```

## 伺服调试

```bash
pnpm dev -F @terwer/share-pro-siyuan
```

## 简单调试

```bash
pnpm build -F @terwer/share-pro-siyuan -- --watch
```

## 生产构建

```bash
pnpm build -F @terwer/share-pro-siyuan
```