#!/usr/bin/sh

pnpm siyuanBuild
echo "Nuxt build finished."
pnpm pluginBuild
echo "Plugin build finished."

# 使用 `sed` 命令替换内容
find ./dist/_nuxt -type f -name 'entry.*.js' -exec \
  sed -i '' -E 's/\/__i18n__\/prerender/\/plugins\/siyuan-blog\/__i18n__\/prerender/g' {} \;
echo "The i18n path has been replaced"

echo "Siyuan build success."