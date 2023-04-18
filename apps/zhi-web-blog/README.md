# zhi-web-blog

a blog based on siyuan-note api

## 快速上手

### 使用 docker-compose 部署 <sup>推荐</sup>

```bash
docker compose up --build
```

### 本地启动

Start the development server on http://localhost:3000

```bash
# Make sure you have `shamefully-hoist=true` in `.npmrc` before running pnpm install
pnpm install
pnpm dev
```

### 生产环境

Build the application for production:

```bash
pnpm build
pnpm preview
```

Statically generate a site:

```bash
pnpm generate
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.