#!/usr/bin/env bash

set -e

source ~/.bin/dotfiles/.secrets.zconfig

# Call ./scripts/get-triggers.sh to fetch available triggers and update trigger.html
TRIGGERS_JSON=$(./scripts/get-triggers.sh)

# Update trigger.html with the new trigger options
python3 ./scripts/update-triggers.py "$TRIGGERS_JSON"

# Create a temporary working directory for deployment files
DEPLOY_DIR=$(mktemp -d)
trap "rm -rf $DEPLOY_DIR" EXIT

# Copy all html, js, css, json, and icon files from current directory
cp *.html "$DEPLOY_DIR/" 2>/dev/null || true
cp *.js "$DEPLOY_DIR/" 2>/dev/null || true
cp *.css "$DEPLOY_DIR/" 2>/dev/null || true
cp *.png "$DEPLOY_DIR/" 2>/dev/null || true
cp *.json "$DEPLOY_DIR/" 2>/dev/null || true

# Substitute EMAIL placeholder in all copied files
for file in "$DEPLOY_DIR"/*.{html,js,css}; do
  [ -f "$file" ] && sed -i '' "s/{{EMAIL}}/$EMAIL/g" "$file"
done

# Send and set 755 permissions
rsync -av --include='*.html' --include='*.js' --include='*.css' --include='*.json' --include='*.png' --exclude='*' "$DEPLOY_DIR/" shane@$NIGHTINGALE:/var/www/html/sl-plain-app

# Set 755 permissions on the deployed files
ssh shane@$NIGHTINGALE "chmod -R 755 /var/www/html/sl-plain-app 2>/dev/null || true"

echo "Deployed to: http:/$NIGHTINGALE/sl-plain-app/index.html"

