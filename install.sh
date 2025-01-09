#!/bin/sh

# 解压 package.zip打牌 文件到 build/node/
unzip package.zip -d .
# Check if packaging was successful
if [ $? -eq 0 ]; then
  echo "Packaging successful: package.zip"
else
  echo "Packaging failed"
  exit 1
fi