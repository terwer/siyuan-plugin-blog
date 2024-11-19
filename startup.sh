# nohup node .output/server/index.mjs > /dev/null 2>&1 &

# Define the application name
APP_NAME="share-front"

# List currently running applications
pm2 list

# Check if the application exists
if pm2 describe "$APP_NAME" &> /dev/null; then
  # Stop the application
  pm2 stop "$APP_NAME"

  # Delete the application
  pm2 delete "$APP_NAME"
  echo "Application '$APP_NAME' has been stopped and deleted"
else
  echo "Application '$APP_NAME' does not exist, skipping stop and delete steps"
fi

# Start the new application
pm2 start .output/server/index.mjs --name "$APP_NAME"
echo "Application '$APP_NAME' has been started"