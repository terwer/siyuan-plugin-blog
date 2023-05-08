# siyuan-blog

a blog based on siyuan-note api

## Quick start

### Use docker-compose for deploy <sup>recommended</sup>

```bash
docker compose up --build
```

### Development

Start the development server on http://localhost:3000

```bash
# Make sure you have `shamefully-hoist=true` in `.npmrc` before running pnpm install
pnpm install
pnpm dev
```

### Production

Build the application for production:

```bash
pnpm build
pnpm preview
```

for vercel:

```bash
pnpm vercelBuild
```

for siyuan

```bash
pnpm siyuanBuild
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.