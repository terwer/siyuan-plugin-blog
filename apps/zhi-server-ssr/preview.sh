#!/bin/sh

export https_proxy=http://127.0.0.1:7890 http_proxy=http://127.0.0.1:7890 all_proxy=socks5://127.0.0.1:7890
BASE_DIR="/Users/terwer/Documents/mydocs/SiYuanWorkspace/public/conf/appearance/themes/zhi/server/ssr"

echo "copy dist to publish"
mkdir -p $BASE_DIR/.next
mkdir -p $BASE_DIR/public
cp -r .next/ $BASE_DIR/.next
cp -r public/ $BASE_DIR/public
cp next.config.js $BASE_DIR/
cp package.dist.json $BASE_DIR/package.json
echo "copy ssr finished"

cd $BASE_DIR || exit
pnpm install
./node_modules/.bin/next start ./ -p 3000