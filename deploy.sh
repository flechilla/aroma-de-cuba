#!/bin/bash
set -e

# Configuration
export PATH="/root/.nvm/versions/node/v24.13.0/bin:$PATH"
PROJECT_DIR="/home/deploy/projects/aroma-de-cuba"
RELEASES_DIR="/var/www/aromadecuba.com/releases"
CURRENT_LINK="/var/www/aromadecuba.com/current"
DEPLOY_LOG="/var/www/aromadecuba.com/deploy.log"
LOCK_FILE="/var/www/aromadecuba.com/.deploy.lock"
KEEP_RELEASES=5
SITE_URL="https://aromadecuba.com"

# Timeouts (seconds)
INSTALL_TIMEOUT=180
BUILD_TIMEOUT=300
HEALTH_CHECK_TIMEOUT=10

TIMESTAMP=$(date +%Y%m%d-%H%M%S)
RELEASE_DIR="$RELEASES_DIR/$TIMESTAMP"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$DEPLOY_LOG"
}

cleanup_lock() {
    rm -f "$LOCK_FILE"
}

trap cleanup_lock EXIT

# Check for stale lock (older than 10 minutes)
if [ -f "$LOCK_FILE" ]; then
    LOCK_AGE=$(($(date +%s) - $(stat -c %Y "$LOCK_FILE")))
    if [ "$LOCK_AGE" -gt 600 ]; then
        log "⚠️ Removing stale lock (${LOCK_AGE}s old)"
        rm -f "$LOCK_FILE"
    else
        log "⏳ Another deployment in progress. Exiting."
        exit 0
    fi
fi

# Acquire lock
echo $$ > "$LOCK_FILE"

log "Starting deployment..."

cd "$PROJECT_DIR"

# Pull latest changes
log "Pulling from git..."
git fetch origin main
git reset --hard origin/main

# Install dependencies
log "Installing dependencies..."
install_attempt=0
max_attempts=3

while [ $install_attempt -lt $max_attempts ]; do
    install_attempt=$((install_attempt + 1))

    if [ $install_attempt -eq 1 ]; then
        CMD="pnpm install --frozen-lockfile"
    else
        CMD="pnpm install"
    fi

    if timeout $INSTALL_TIMEOUT $CMD 2>&1 | tee -a "$DEPLOY_LOG"; then
        log "✅ Dependencies installed (attempt $install_attempt)"
        break
    else
        if [ $install_attempt -lt $max_attempts ]; then
            log "⚠️ pnpm install failed (attempt $install_attempt), retrying in 5s..."
            sleep 5
            rm -rf node_modules
        else
            log "❌ pnpm install failed after $max_attempts attempts"
            exit 1
        fi
    fi
done

# Build
log "Building..."
if ! timeout $BUILD_TIMEOUT pnpm build 2>&1 | tee -a "$DEPLOY_LOG"; then
    log "❌ Build failed or timed out"
    exit 1
fi

# Create release directory
log "Creating release $TIMESTAMP..."
mkdir -p "$RELEASE_DIR"
cp -r dist/* "$RELEASE_DIR/"

# Atomic symlink swap
log "Switching to new release..."
ln -sfn "$RELEASE_DIR" "${CURRENT_LINK}.new"
mv -Tf "${CURRENT_LINK}.new" "$CURRENT_LINK"

# Cleanup old releases
log "Cleaning up old releases..."
cd "$RELEASES_DIR"
ls -t | tail -n +$((KEEP_RELEASES + 1)) | xargs -r rm -rf

# Health check
log "Running health check..."
sleep 2

HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time $HEALTH_CHECK_TIMEOUT "$SITE_URL" 2>/dev/null || echo "000")

if [ "$HTTP_CODE" = "200" ]; then
    log "✅ Health check passed (HTTP $HTTP_CODE)"
else
    log "⚠️ Health check returned HTTP $HTTP_CODE (site may still be working)"
fi

log "✓ Deployment complete! Release: $TIMESTAMP"

echo "{\"release\":\"$TIMESTAMP\",\"status\":\"success\",\"timestamp\":\"$(date -Iseconds)\"}" > /var/www/aromadecuba.com/.last-deploy.json
