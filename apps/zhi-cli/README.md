# zhi-cli

a tool for generating zhi framework related projects

[Read more about node with cli](https://www.terwer.space/post/use-typescript-to-develop-a-custom-nodejs-frontend-development-scaffold-1i5fne.html)

[Read more about nx vite with cli](https://www.terwer.space/post/use-nrwlnxworkspace-to-create-a-nodejscommand-line-library-1urtj8.html)

[Read more about turbo esbuild with cli](https://www.terwer.space/implement-a-general-environment-variable-settings-tool-2bxmkh.html)

## Usage

```bash
npm set registry https://registry.npmmirror.com
pnpm set registry https://registry.npmmirror.com
npm i -g zhi-cli
```

Note: this project is under turbo-workspace, you need to create a turbo-workspace first and add the projects inside

a turbo-workspace may like

```
zhi
├── apps
│   ├── zhi-cli
│   ├── zhi-core
├── packages
│   ├── api-docs
│   ├── eslint-config-custom
│   ├── tsconfig
├── pnpm-worpspace.yaml
├── turbo.json
```

Creating project use the following commands

```bash
## turbo-workspace
## zhi-cli init my-turbo-workspace turbo-workspace-simple

## ts-cli
## zhi-cli init my-project ts-cli

## ts-vite-lib
zhi-cli init my-project ts-esbuild-lib

## ts-vite-lib
## zhi-cli init my-project ts-vite-lib

## ts-vite-vue
## zhi-cli init my-project ts-vite-vue

## ts-vite-react
## zhi-cli init my-project ts-vite-react
```

## Dev

```bash
pnpm dev -F zhi-cli
```

## Build

```bash
pnpm build -F zhi-cli
```

## Api

```bash
pnpm doc -F zhi-cli
pnpm md -F zhi-cli
```

## Test

```bash
pnpm test -F zhi-cli
```

## Publish

```
pnpm publish -F zhi-cli --tag=latest
```