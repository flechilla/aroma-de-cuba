#!/bin/bash
# Trigger Zunzún news check via OpenClaw agent
# Cron: */20 * * * *

LOG="/tmp/zunzun-news-cron.log"
echo "[$(date '+%Y-%m-%d %H:%M:%S')] Triggering news check..." >> "$LOG"

/root/.nvm/versions/node/v24.13.0/bin/node \
    /root/.nvm/versions/node/v24.13.0/lib/node_modules/openclaw/dist/index.js \
    agent \
    --agent zunzun \
    --message "CRON_NEWS_CHECK: 

1. BUSCAR noticias de Cuba con múltiples queries:
   - 'Cuba noticias hoy 2026' (freshness:pd)
   - 'Cuba crisis combustible energía' (freshness:pd)
   - 'Cuba migración diáspora' (freshness:pd)
   - 'Cuba news today fuel crisis' (freshness:pd)
   - 'site:reuters.com OR site:apnews.com Cuba' (freshness:pw)

2. COMPARAR cada resultado contra memory/news-registry.json
   - Por URL, título exacto, keywords
   - Nuevo desarrollo de tema existente = PUBLICAR como actualización
   - Mismo evento exacto = DUPLICADO, ignorar

3. PARA CADA NOTICIA NUEVA:
   - Escribir post ES + EN con imagen AI
   - Incluir 2-3 links externos (fuentes)
   - Incluir links internos a posts relacionados
   - Si es actualización, referenciar post original

4. Actualizar registry y notificarme resumen.

Si no hay nada nuevo: responde NO_NEWS" \
    --channel telegram:zunzun \
    --to 786730056 \
    --deliver \
    >> "$LOG" 2>&1

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Done" >> "$LOG"
