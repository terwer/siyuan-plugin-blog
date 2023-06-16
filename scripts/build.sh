#!/usr/bin/sh

pnpm siyuanBuild
echo "Nuxt build finished."
pnpm pluginBuild
echo "Plugin build finished."

# 使用 `sed` 命令替换内容
find ./dist/_nuxt -type f -name 'entry.*.js' -exec \
  sed -i '' -E 's/\/__i18n__\/prerender/\/plugins\/siyuan-blog\/__i18n__\/prerender/g' {} \;
echo "The i18n path has been replaced"

# 添加 html 版本号
function replace_file_name() {
    timestamp="$(date +%s)"
    sed -i '' -E \
        -e "s/(<script[^>]*src=[\"'][^\"']+\.js)[^\"']*(\"[^>]*>)/\1?v=${timestamp}\2/g" \
        -e "s/(<link[^>]*href=[\"'][^\"']+\.js)[^\"']*(\"[^>]*>)/\1?v=${timestamp}\2/g" \
        -e "s/(<link[^>]*href=[\"'][^\"']+\.css)[^\"']*(\"[^>]*>)/\1?v=${timestamp}\2/g" \
        -e "s/(<link[^>]*href=[\"'][^\"']+\.(svg|png|jpe?g|gif|webp)[^\"']*[\"'][^>]*>)/\1?v=${timestamp}\"/g" \
        "./dist/index.html"
}

replace_file_name
echo "The html version number has been added"

echo "Siyuan build success."