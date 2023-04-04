# zhi-vuepress1-to-vuepress2

## About

Project description here.

[API Documentation](docs/source/api.md)

## Create new python project

```bash
npx nx generate @nxlv/python:project zhi-vuepress1-to-vuepress2 \
--type application \
--description='zhi-vuepress1-to-vuepress2' \
--packageName=zhi-vuepress1-to-vuepress2 \
--moduleName=zhi_vuepress1_to_vuepress2
```

## Prepare

```bash
## Install poetry
## https://python-poetry.org/docs/#installation
poetry completions bash >> ~/.bash_completion

## Install pytest
nx add zhi-vuepress1-to-vuepress2 pytest
nx add zhi-vuepress1-to-vuepress2 pytest-cov
nx add zhi-vuepress1-to-vuepress2 pytest-html

## Install pydoc-markdown
nx add zhi-vuepress1-to-vuepress2 pydoc-markdown

## Install tox
nx add zhi-vuepress1-to-vuepress2 tox
```

## Install

```bash
nx install zhi-vuepress1-to-vuepress2
```

## Add dependency

```bash
nx add zhi-vuepress1-to-vuepress2 pydoc-markdown

nx add zhi-vuepress1-to-vuepress2 pytest
nx add zhi-vuepress1-to-vuepress2 pytest-cov
nx add zhi-vuepress1-to-vuepress2 pytest-html
nx add zhi-vuepress1-to-vuepress2 tox
```

## Lint

```bash
nx lint zhi-vuepress1-to-vuepress2
```

## Build

```bash
nx build zhi-vuepress1-to-vuepress2
```

## Test

```bash
nx test zhi-vuepress1-to-vuepress2
```

## Docs

```bash
nx docs zhi-vuepress1-to-vuepress2
```

## Tox

```bash
nx tox zhi-vuepress1-to-vuepress2
```

## [Change log](CHANGELOG.md)
