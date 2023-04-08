#!/bin/sh
ZHI_THEME_DIR=/Users/terwer/Documents/mydocs/SiYuanWorkspace/public/conf/appearance/themes/zhi

## copy dist
cp -r dist/packages/zhi/* $ZHI_THEME_DIR/
echo "zhi dist copy success"

## install dependency for zhi
cd $ZHI_THEME_DIR/ || exit
echo "installing zhi dependencies ..."
npm i express --registry=https://registry.npmmirror.com
echo "zhi dependency installed"
