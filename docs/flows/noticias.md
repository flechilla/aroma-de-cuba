# Flow: Noticias

## Configuración
- **Frecuencia:** Cada 20 minutos
- **Cron:** `*/20 * * * *`
- **Registry:** `memory/news-registry.json`

## Búsqueda de Noticias

### Queries obligatorias (rotar/combinar)
Ejecutar **mínimo 4-5 búsquedas diferentes** por check:

**Español:**
- `Cuba noticias hoy [año]`
- `Cuba crisis económica [año]`
- `Cuba combustible energía`
- `Cuba migración diáspora`
- `Cuba turismo vuelos`
- `La Habana noticias`
- `cubanos Estados Unidos migración`

**English:**
- `Cuba news today`
- `Cuba fuel crisis energy`
- `Cuba migration diaspora US`
- `Havana news`
- `Cuba tourism flights airlines`
- `Cuban economy sanctions`

**Fuentes específicas:**
- `site:reuters.com Cuba`
- `site:apnews.com Cuba`
- `site:bbc.com Cuba`
- `site:elpais.com Cuba`
- `site:cibercuba.com`

### Parámetros de búsqueda
- `freshness: "pd"` (últimas 24h) para noticias del día
- `freshness: "pw"` (última semana) si poco resultado
- `count: 10` resultados por query

## Detección de Duplicados

### ES duplicado si:
- ✅ Mismo evento exacto (mismo titular/ángulo)
- ✅ URL de fuente ya en registry
- ✅ Keywords principales idénticos

### NO es duplicado si:
- ❌ Mismo tema general, pero NUEVO desarrollo
- ❌ Nueva fuente con información adicional
- ❌ Reacción/consecuencia de noticia anterior

### Ejemplos
| Ya publicado | Nueva noticia | ¿Duplicado? |
|--------------|---------------|-------------|
| "Air Canada suspende vuelos" | "WestJet también suspende" | NO - nuevo desarrollo |
| "Cuba sin combustible aviación" | "México corta envíos de petróleo" | NO - causa relacionada pero distinta |
| "Nicaragua cierra ruta migratoria" | "Nicaragua cierra ruta a cubanos" | SÍ - mismo evento |
| "Crisis combustible" | "Gobierno anuncia medidas emergencia" | NO - consecuencia, nuevo ángulo |

## Posts de Actualización

Cuando hay **nueva información sobre noticia existente**:

1. Crear post NUEVO (no editar el anterior)
2. Título indica actualización: "ACTUALIZACIÓN: [tema]" o "Nuevos detalles: [tema]"
3. **Referenciar post original** con link interno
4. Explicar qué cambió/qué es nuevo

### Ejemplo de referencia interna:
```markdown
> Esta noticia es una actualización de nuestro artículo anterior: 
> [Cuba se queda sin combustible para aviación](/es/blog/2026-02-10-cuba-sin-combustible-aviacion-air-canada-suspende-vuelos)
```

## Links Obligatorios

### Links externos (fuentes)
- **Mínimo 2-3** links a fuentes originales
- Usar texto descriptivo, no "click aquí"
- Preferir fuentes reconocidas (Reuters, AP, BBC, El País)

```markdown
Según reporta [Reuters](https://reuters.com/...), el gobierno cubano...

La información fue confirmada por [Associated Press](https://apnews.com/...).
```

### Links internos (nuestro contenido)
- Buscar posts relacionados en el blog
- Linkear a contexto relevante (posts anteriores sobre el tema)
- Usar sección "Artículos relacionados" al final si aplica

```markdown
## Artículos relacionados
- [Cuba se queda sin combustible para aviación](/es/blog/2026-02-10-cuba-sin-combustible-aviacion...)
- [Cómo sobreviven los cubanos el racionamiento](/es/blog/2026-02-10-cubanos-sobreviven-racionamiento...)
```

## Proceso Completo

```
1. BUSCAR (múltiples queries)
   └─ Ejecutar 4-5 búsquedas diferentes
   └─ Español + Inglés
   └─ Freshness: últimas 24h primero
   └─ Recopilar TODOS los resultados relevantes

2. FILTRAR
   └─ Comparar cada resultado contra registry
   └─ Por URL, título, keywords
   └─ Marcar: NUEVO / ACTUALIZACIÓN / DUPLICADO

3. PARA CADA NOTICIA NUEVA:
   └─ Fetch y leer artículo fuente
   └─ Buscar fuentes adicionales (2-3 mínimo)
   └─ Buscar posts internos relacionados
   └─ Escribir post ES + EN
   └─ Generar imagen AI
   └─ Upload a Vercel Blob

4. PUBLICAR
   └─ Commit todos los posts nuevos
   └─ Push a GitHub (auto-deploy)
   └─ Actualizar registry con TODOS los nuevos
   └─ Notificar resumen a Adriano

5. SI NO HAY NOTICIAS NUEVAS
   └─ Responder "NO_NEWS"
```

## Formato de Notificación

Cuando publiques, reportar así:
```
📰 Publicadas X noticias nuevas:

1. [Título ES] - enlace
   └─ Fuentes: Reuters, AP
   └─ Links internos: 2

2. [Título ES] - enlace
   └─ ACTUALIZACIÓN de: [post original]

Sin publicar (duplicados): Y historias
```

## Tono Editorial

- **Neutral e informativo** — sin opinión política
- **Citar fuentes siempre** — atribuir información
- **Humanizar** — incluir impacto en personas reales
- **Contexto** — explicar por qué importa
- **Sin sensacionalismo** — hechos, no drama

## Registry Schema

```json
{
  "id": "unique-slug-date",
  "title": "Título completo",
  "titleEn": "English title",
  "topics": ["economia", "energia"],
  "publishedAt": "ISO timestamp",
  "slugEs": "filename-es",
  "slugEn": "filename-en", 
  "sources": ["url1", "url2"],
  "keywords": ["combustible", "aviacion"],
  "relatedPosts": ["slug-of-related"],
  "isUpdate": false,
  "updatesPost": null
}
```
