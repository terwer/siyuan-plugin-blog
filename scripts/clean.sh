#!/bin/sh

set -e
rimraf ./dist
rimraf ./build
turbo run clean
rm -rf node_modules
find . -name ".turbo" -type d -exec rm -rf {} +
find . -name "__pycache__" -type d -exec rm -rf {} +
echo "finished."