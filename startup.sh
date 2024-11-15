# nohup node .output/server/index.mjs > /dev/null 2>&1 &

cd /home/admin/blog/share-front
./node_modules/pm2/bin/pm2 list
./node_modules/pm2/bin/pm2 start .output/server/index.mjs