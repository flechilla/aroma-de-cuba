#!/bin/bash
# Trigger Zunzún gastronomía content via OpenClaw agent
# Cron: 0 9,15,21 * * * /root/.openclaw/workspace-zunzun/scripts/trigger-gastro-check.sh

LOG="/tmp/zunzun-gastro-cron.log"
echo "[$(date '+%Y-%m-%d %H:%M:%S')] Triggering gastro content..." >> "$LOG"

/root/.nvm/versions/node/v24.13.0/bin/node \
    /root/.nvm/versions/node/v24.13.0/lib/node_modules/openclaw/dist/index.js \
    agent \
    --agent zunzun \
    --message "CRON_GASTRO_CHECK: Busca contenido interesante sobre gastronomía cubana — recetas tradicionales, ingredientes, historia culinaria, restaurantes, bebidas. Crea un post ES/EN con imagen AI si encuentras algo que no hayamos cubierto. Si no hay inspiración hoy, responde NO_GASTRO." \
    --channel telegram \
    --to 786730056 \
    --deliver \
    >> "$LOG" 2>&1

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Done" >> "$LOG"
