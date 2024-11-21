#!/bin/bash

# 定义应用名称
APP_NAME="share-front2"

# 列出当前运行的应用
echo "Listing currently running applications..."
pm2 list

# 检查应用是否存在
if pm2 describe "$APP_NAME" &> /dev/null; then
  # 停止应用
  echo "Stopping application '$APP_NAME'..."
  pm2 stop "$APP_NAME"

  # 删除应用
  echo "Deleting application '$APP_NAME'..."
  pm2 delete "$APP_NAME"
  echo "Application '$APP_NAME' has been stopped and deleted"
else
  echo "Application '$APP_NAME' does not exist, skipping stop and delete steps"
fi

# 启动新应用
echo "Starting new application '$APP_NAME'..."
pm2 start pm2.json --update-env

echo "Application '$APP_NAME' has been started"