#!/bin/bash

# 使用 Siyuan 构建配置
echo "Using Siyuan build config as SSE and SPA build."
cp nuxt.siyuan.config.ts nuxt.config.ts
nuxt generate
echo "Nuxt build finished."
pnpm pluginBuild
echo "Plugin build finished."

# 拷贝资源
# rsync -av --progress .output/public/ ./dist/
rsync -av .output/public/ ./dist/
echo "Resources are copied."

# 使用 `sed` 命令替换内容
ls ./dist/_nuxt
find ./dist/_nuxt -type f -name 'entry.*.js' -exec \
  sed -i -E 's/\/__i18n__\/prerender/\/plugins\/siyuan-blog\/__i18n__\/prerender/g' {} \;
echo "The i18n path has been replaced"

echo "Siyuan build finished."