# zhi

a pluggable siyuan-note theme

## Building

This library was generated with [Nx](https://nx.dev).

Run `nx build zhi` to build the library.

## Running unit tests

Run `nx test zhi` to execute the unit tests via [Vitest](https://vitest.dev).

## Command

```
nx run zhi:build --watch
```

## Structure

```
src/lib/core/plugin-system - plugin system
src/lib/core/util - tools, hacker
src/lib/modules - electron modules
src/lib/web-modules - web modules, compatible with docker and browser
src/lib/zhi.tx - zhi core loading system
src/style - styles
src/theme.ts - theme entry
```
