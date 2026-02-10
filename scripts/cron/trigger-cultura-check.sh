#!/bin/bash
# Trigger Zunzún cultura content via OpenClaw agent
# Cron: 0 6,12,18,0 * * * /root/.openclaw/workspace-zunzun/scripts/trigger-cultura-check.sh

LOG="/tmp/zunzun-cultura-cron.log"
echo "[$(date '+%Y-%m-%d %H:%M:%S')] Triggering cultura content..." >> "$LOG"

/root/.nvm/versions/node/v24.13.0/bin/node \
    /root/.nvm/versions/node/v24.13.0/lib/node_modules/openclaw/dist/index.js \
    agent \
    --agent zunzun \
    --message "CRON_CULTURA_CHECK: Busca contenido sobre cultura cubana — música (son, salsa, timba, trova), arte, literatura, cine, tradiciones, patrimonio, artistas destacados. Crea un post ES/EN con imagen AI si encuentras algo interesante. Si no hay inspiración hoy, responde NO_CULTURA." \
    --channel telegram:zunzun \
    --to 786730056 \
    --deliver \
    >> "$LOG" 2>&1

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Done" >> "$LOG"
