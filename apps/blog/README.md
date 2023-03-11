# zhi-blog

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## 规范

- `ts` 规则请在 `.prettierrc.json` 添加，`eslint` 会自动继承此规则并生效

## Setup

Make sure to install the dependencies:

```bash
# Make sure you have `shamefully-hoist=true` in `.npmrc` before running pnpm install
pnpm install
```

## Development Server

Start the development server on http://localhost:3000

```bash
pnpm dev -o
```

## Production

Build the application for production:

```bash
pnpm build
```

Locally preview production build:

```bash
pnpm preview
```

Staticly generate a site:

```bash
pnpm generate
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
