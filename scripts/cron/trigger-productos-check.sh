#!/bin/bash
# Trigger Zunzún productos content via OpenClaw agent
# Cron: 0 10,20 * * * /root/.openclaw/workspace-zunzun/scripts/trigger-productos-check.sh

LOG="/tmp/zunzun-productos-cron.log"
echo "[$(date '+%Y-%m-%d %H:%M:%S')] Triggering productos content..." >> "$LOG"

/root/.nvm/versions/node/v24.13.0/bin/node \
    /root/.nvm/versions/node/v24.13.0/lib/node_modules/openclaw/dist/index.js \
    agent \
    --agent zunzun \
    --message "CRON_PRODUCTOS_CHECK: Crea contenido sobre productos cubanos — café, ron, tabaco/puros, miel, etc. Incluye historia, variedades, cómo elegir/disfrutar. IMPORTANTE: incluir links externos donde comprar y links internos a posts relacionados. Crea post ES/EN con imagen AI. Si no hay inspiración, responde NO_PRODUCTOS." \
    --channel telegram \
    --to 786730056 \
    --deliver \
    >> "$LOG" 2>&1

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Done" >> "$LOG"
