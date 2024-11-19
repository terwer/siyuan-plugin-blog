# nohup node .output/server/index.mjs > /dev/null 2>&1 &

# 列出当前运行的应用
pm2 list

# 检查应用是否存在
if pm2 describe "share-front" &> /dev/null; then
  # 停止应用
  pm2 stop "share-front"

  # 删除应用
  pm2 delete "share-front"
  echo "应用 'share-front' 已停止并删除"
else
  echo "应用 'share-front' 不存在，跳过停止和删除步骤"
fi

# 启动新应用
pm2 start .output/server/index.mjs --name "share-front"
echo "应用 'share-front' 已启动"