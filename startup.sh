# nohup node .output/server/index.mjs > /dev/null 2>&1 &

pm2 list
pm2 start .output/server/index.mjs