# zhi-docs-vitepress

docs for zhi

## Dev

This library was generated with [Nx](https://nx.dev).

```bash
nx serve zhi-docs-vitepress
```

## Build

for typedoc

```bash
node packages/zhi-docs-vitepress/makeMd.cjs
vitepress build packages/zhi-docs-vitepress
```

for jsdoc

```bash
esbuild packages/zhi-docs-vitepress/src/jsdoc2md.ts --outfile=packages/zhi-docs-vitepress/src/jsdoc2md.cjs --format=cjs
node packages/zhi-docs-vitepress/makeMd.cjs
vitepress build packages/zhi-docs-vitepress
```

vitepress full command

```bash
nx build zhi-docs-vitepress
```

## Preview

```
nx preview zhi-docs-vitepress
```
