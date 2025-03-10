#!/bin/sh

# 把 dist/node 目录的所有文件打包成 package.zip方法根目录
rm -rf build
mkdir -p build
if [ ! -d "dist/node" ]; then
  echo "dist/node directory does not exist"
  exit 1
fi
zip -r build/node-provider.zip dist/node