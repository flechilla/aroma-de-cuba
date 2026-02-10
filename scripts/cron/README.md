# Cron Scripts - Aroma de Cuba

Scripts que disparan los flujos de generación de contenido automatizado.

## Scripts

| Script | Frecuencia | Propósito |
|--------|------------|-----------|
| `trigger-news-check.sh` | `*/20 * * * *` | Noticias cada 20 min |
| `trigger-gastro-check.sh` | `0 9,15,21 * * *` | Gastronomía 3x/día |
| `trigger-cultura-check.sh` | `0 0,6,12,18 * * *` | Cultura 4x/día |
| `trigger-productos-check.sh` | `0 10,20 * * *` | Productos 2x/día |

## Cómo funcionan

Cada script:
1. Envía un mensaje al agente Zunzún via OpenClaw
2. Zunzún ejecuta el flujo correspondiente (buscar, evaluar, crear, publicar)
3. El resultado se entrega por Telegram

## Instalación de crons

```bash
# Ver crons actuales
crontab -l

# Editar crons
crontab -e

# Agregar estas líneas:
*/20 * * * * /home/deploy/projects/aroma-de-cuba/scripts/cron/trigger-news-check.sh
0 9,15,21 * * * /home/deploy/projects/aroma-de-cuba/scripts/cron/trigger-gastro-check.sh
0 0,6,12,18 * * * /home/deploy/projects/aroma-de-cuba/scripts/cron/trigger-cultura-check.sh
0 10,20 * * * /home/deploy/projects/aroma-de-cuba/scripts/cron/trigger-productos-check.sh
```

## Logs

Los logs se escriben en `/tmp/`:
- `/tmp/zunzun-news-cron.log`
- `/tmp/zunzun-gastro-cron.log`
- `/tmp/zunzun-cultura-cron.log`
- `/tmp/zunzun-productos-cron.log`

## Requisitos

- OpenClaw instalado y configurado
- Agente `zunzun` configurado en OpenClaw
- Gateway de OpenClaw corriendo
- Acceso a Telegram (chat id: 786730056)

## Notas

- Los scripts NO contienen la lógica de generación de contenido
- Solo "despiertan" al agente Zunzún con un prompt específico
- La lógica real está en el agente, documentada en `/docs/flows/`
