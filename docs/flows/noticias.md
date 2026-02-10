# Flow: Noticias

## Configuración
- **Frecuencia:** Cada 20 minutos
- **Cron:** `*/20 * * * *`
- **Registry:** `memory/news-registry.json`

## Temas cubiertos
- Economía cubana
- Política (interna y relaciones internacionales)
- Diáspora cubana
- Crisis energética/humanitaria

## Proceso de generación

```
1. BUSCAR
   └─ Web search: "Cuba noticias [temas] [fecha]"
   └─ Usar múltiples queries (español + inglés)
   └─ Filtrar por freshness: últimas 24h preferido
   └─ Buscar en fuentes variadas (no solo El País)

2. EVALUAR (¡SER GENEROSO, NO RESTRICTIVO!)
   └─ ¿Es relevante? (economía, política, diáspora)
   └─ ¿Es un ÁNGULO NUEVO aunque sea tema similar?
   │   → Ejemplo: "Air Canada suspende" vs "Nicaragua cierra frontera"
   │   → Son noticias DISTINTAS aunque ambas afectan viajes
   └─ Solo es DUPLICADO si es exactamente la misma noticia
   └─ Verificar registry por URLs y títulos específicos, NO por tema general
   └─ Si hay duda → PUBLICAR (mejor más contenido que menos)

3. CREAR (si hay noticia nueva)
   └─ Fetch artículo fuente
   └─ Escribir resumen/análisis propio
   └─ Generar imagen AI contextual
   └─ Upload imagen a Vercel Blob
   └─ Crear post ES + EN

4. PUBLICAR
   └─ Commit + push a GitHub
   └─ Auto-deploy via GitHub Actions
   └─ Actualizar registry
   └─ Notificar a Adriano

5. SI NO HAY NOTICIAS
   └─ Responder "NO_NEWS"
```

## Ejemplo de post

### Frontmatter
```yaml
---
title: "Cuba se queda sin combustible para aviación: Air Canada suspende vuelos"
description: "La crisis energética alcanza la aviación. Air Canada suspende operaciones hasta mayo."
author: "Aroma de Cuba"
date: 2026-02-10
category: noticias
tags:
  - crisis-energetica
  - aviacion
  - turismo
  - economia
coverImage: https://vercel-blob-url/image.png
coverImageAlt: "Terminal de aeropuerto vacío en La Habana"
draft: false
featured: true
---
```

### Estructura del contenido
1. **Lead:** Resumen de la noticia en 2-3 oraciones
2. **Contexto:** Por qué es importante
3. **Detalles:** Datos, cifras, declaraciones
4. **Impacto:** A quién afecta y cómo
5. **Fuentes:** Links a artículos originales

## Tono editorial
- **Neutral e informativo**
- Sin opinión política explícita
- Citar fuentes siempre
- Humanizar cuando sea apropiado (historias de personas)
