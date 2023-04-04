---
title: 从Integrated-Repos上手nx
date: 2023-03-27 21:04:15
tag:
    - 构建
    - 初始化
    - 工作
    - 空间
    - 创建
category: 
    - 前端开发
    - nx
    - monorepo
article: true
timeline: false
---

## 初始化 nx 工作空间

```bash
npx create-nx-workspace zhi --package-manager=pnpm --preset=ts ​
```

## 创建 package

```bash
pnpm nx generate @nrwl/js:library zhi-env --publishable --importPath zhi-env
```

## 构建

### 构建单个包

```bash
pnpm nx build zhi-env
```

### 构建所有的包

```bash
pnpm nx run-many --target=build
```

### 只构建改变了的

```bash
pnpm nx affected --target=build
```

## 发布

```bash
pnpm nx publish zhi-env
```

## 校验

```bash
pnpm nx lint zhi-env
```

## 测试

```bash
pnpm nx test zhi-env
```

## 了解更多

[Core Features](https://nx.dev/core-features "Core Features") Read about the core features of Nx.

[Mental Model](https://nx.dev/concepts/mental-model "Mental Model") Get a deeper understanding of the mental model.

[Adopting Nx](https://nx.dev/recipes/adopting-nx "Adopting Nx") Learn how to add Nx to your existing repo.

[Integrated Repos vs Package-Based Repos](https://nx.dev/concepts/integrated-vs-package-based "Integrated Repos vs Package-Based Repos") Learn about two styles of monorepos.

[React Tutorial](https://nx.dev/react-tutorial/1-code-generation "React Tutorial") A step-by-step tutorial showing how to build an integrated monorepo with React applications sharing code.

[Node.js Tutorial](https://nx.dev/getting-started/node-server-tutorial "Node.js Tutorial") A step-by-step tutorial showing how to build an integrated monorepo with Node.js applications sharing code.

## 参考

[https://nx.dev/getting-started/integrated-repo-tutorial - Nx](https://nx.dev/getting-started/integrated-repo-tutorial)

[/nrwl/nx-recipes/tree/main/integrated](https://github.com/nrwl/nx-recipes/tree/main/integrated)
