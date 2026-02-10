#!/bin/bash
# Trigger Zunzún news check via OpenClaw agent
# Cron: */20 * * * * /root/.openclaw/workspace-zunzun/scripts/trigger-news-check.sh

LOG="/tmp/zunzun-news-cron.log"
echo "[$(date '+%Y-%m-%d %H:%M:%S')] Triggering news check..." >> "$LOG"

/root/.nvm/versions/node/v24.13.0/bin/node \
    /root/.nvm/versions/node/v24.13.0/lib/node_modules/openclaw/dist/index.js \
    agent \
    --agent zunzun \
    --message "CRON_NEWS_CHECK: Busca noticias de Cuba (economía, diáspora, política) de las últimas horas. Si hay algo relevante que no esté en news-registry.json, crea el post ES/EN con imagen AI, publica y notifícame el link. Si no hay nada nuevo, responde solo NO_NEWS." \
    --channel telegram \
    --to 786730056 \
    --deliver \
    >> "$LOG" 2>&1

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Done" >> "$LOG"
