# zhi-cli

a tool for generating zhi framework related projects

[Read more about node with cli](https://www.terwer.space/post/use-typescript-to-develop-a-custom-nodejs-frontend-development-scaffold-1i5fne.html)

[Read more about nx vite with cli](https://hexo.terwer.space/post/use-nrwlnxworkspace-to-create-a-nodejscommand-line-library-1urtj8.html)

## Usage

```bash
# npx zhi-cli

npm i -g zhi-cli
```

```bash
## default
zhi-cli init my-project main

## ts-cli
zhi-cli init my-project ts-cli

## ts-vite-lib
zhi-cli init my-project ts-vite-lib

## ts-vite-vue
zhi-cli init my-project ts-vite-vue

## ts-vite-react
zhi-cli init my-project ts-vite-react

```

## Building

This library was generated with [Nx](https://nx.dev).

Run `nx build zhi-cli` to build the library.

## Running unit tests

Run `nx test zhi-cli` to execute the unit tests via [Jest](https://jestjs.io).

## Publish

```
nx publish zhi-cli --ver=1.2.2 --tag=latest
```
