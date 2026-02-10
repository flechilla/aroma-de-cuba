# Content Flows - Aroma de Cuba

Este documento define los flujos de generación de contenido automatizado para cada colección del blog.

## Resumen de Flows

| Flow | Colección | Frecuencia | Propósito |
|------|-----------|------------|-----------|
| News | noticias | Cada 20 min | Noticias de Cuba (economía, política, diáspora) |
| Gastro | gastronomia | 3x día | Recetas y cultura culinaria cubana |
| Cultura | cultura | 4x día | Música, arte, tradiciones, patrimonio |
| Productos | productos | 2x día | Café, ron, tabaco, miel y otros productos |

---

## Flow: Noticias

**Cron:** `*/20 * * * *`

### Proceso
1. Buscar noticias recientes de Cuba (últimas horas)
2. Filtrar por temas: economía, política, diáspora
3. Verificar contra `news-registry.json` para evitar duplicados
4. Si hay noticia nueva relevante → crear post
5. Si es actualización de noticia existente → expandir o crear follow-up

### Fuentes
- Medios internacionales (El País, BBC, CNN)
- Medios especializados (CiberCuba, Martí Noticias)
- Sin restricciones ideológicas

### Tono
- **Informativo y neutral**
- Sin postura editorial
- Citar fuentes con links externos

### Schema
```yaml
category: noticias
tags: [tema-principal, subtemas...]
featured: true/false (según relevancia)
```

---

## Flow: Gastronomía

**Cron:** `0 9,15,21 * * *` (9am, 3pm, 9pm UTC)

### Proceso
1. Seleccionar tema gastronómico (receta, ingrediente, historia culinaria)
2. Investigar y escribir contenido educativo
3. Generar imagen AI del plato/ingrediente
4. Incluir receta si aplica

### Temas
- Recetas tradicionales (ropa vieja, lechón, moros y cristianos)
- Ingredientes cubanos (yuca, plátano, boniato)
- Bebidas (mojito, daiquirí, café cubano)
- Historia culinaria
- Restaurantes y paladares

### Tono
- **Cálido y educativo**
- Historias personales y familiares
- Conexión con la diáspora ("el sabor de casa")

### Schema
```yaml
category: gastronomia
tags: [recetas|ingredientes|bebidas|historia, ...]
featured: true para platos emblemáticos
```

### Estructura de recetas
1. Introducción/historia del plato
2. Ingredientes (con cantidades)
3. Preparación paso a paso
4. Tips y variaciones
5. Cómo servir/acompañar

---

## Flow: Cultura

**Cron:** `0 0,6,12,18 * * *` (midnight, 6am, 12pm, 6pm UTC)

### Proceso
1. Seleccionar tema cultural cubano
2. Investigar con profundidad
3. Generar imagen AI representativa
4. Incluir referencias multimedia (canciones, películas)

### Temas
- **Música:** Son, salsa, timba, trova, jazz cubano
- **Arte:** Pintores, escultores, arte contemporáneo
- **Literatura:** Escritores, poetas, obras importantes
- **Cine:** Películas cubanas, directores
- **Tradiciones:** Fiestas, religión, costumbres
- **Patrimonio:** Arquitectura, sitios históricos

### Tono
- **Apasionado y conocedor**
- Celebrar sin idealizar
- Conectar pasado con presente

### Schema
```yaml
category: cultura
tags: [musica|arte|literatura|cine|tradiciones|patrimonio, artista/tema específico]
featured: true para temas emblemáticos
```

---

## Flow: Productos

**Cron:** `0 10,20 * * *` (10am, 8pm UTC)

### Proceso
1. Seleccionar producto cubano
2. Investigar historia, variedades, cómo elegir
3. **IMPORTANTE:** Incluir links de compra externos
4. Incluir links internos a posts relacionados
5. Generar imagen AI del producto

### Productos
- **Tabaco:** Habanos, marcas, cómo fumar
- **Ron:** Havana Club, Santiago, añejamiento
- **Café:** Variedades, preparación, regiones
- **Miel:** Producción, tipos, usos
- **Otros:** Artesanías, arte

### Tono
- **Experto y aspiracional**
- Guía de compra práctica
- Sin ser excesivamente comercial

### Schema
```yaml
category: productos
tags: [tabaco|ron|cafe|miel|artesanias, marca/variedad específica]
featured: true para productos principales
```

### Requisitos de links
- **Externos:** Mínimo 2-3 tiendas donde comprar
- **Internos:** Links a posts relacionados del blog
- **Nota legal:** Mencionar restricciones (ej: embargo EEUU para Habanos)

---

## Especificaciones Comunes

### Frontmatter requerido
```yaml
---
title: "Título SEO (50-60 caracteres)"
description: "Meta descripción (150-160 caracteres)"
author: "Aroma de Cuba"
date: YYYY-MM-DD
category: noticias|cultura|gastronomia|productos
tags:
  - tag1
  - tag2
coverImage: "URL de Vercel Blob"
coverImageAlt: "Descripción accesible de la imagen"
draft: false
featured: true|false
---
```

### Imágenes
- **Fuente:** Generadas con AI (Gemini/nano-banana-pro)
- **Almacenamiento:** Vercel Blob
- **Formato:** PNG, 1K resolution
- **Naming:** `YYYY-MM-DD-slug-descriptivo.png`

### Idiomas
- Cada post debe tener versión **ES** y **EN**
- No traducción literal — adaptar al público
- ES en `/src/content/blog/es/`
- EN en `/src/content/blog/en/`

### SEO
- Títulos descriptivos con keywords
- Meta descriptions únicas
- Headers jerárquicos (H2, H3)
- Alt text en imágenes
- Links internos cuando sea relevante

---

## Registros

Cada flow mantiene un registro JSON para evitar duplicados:

- `memory/news-registry.json`
- `memory/gastro-registry.json`
- `memory/cultura-registry.json`
- `memory/productos-registry.json`

Estructura:
```json
{
  "published": [
    {
      "id": "unique-id",
      "title": "Título",
      "publishedAt": "ISO date",
      "slugEs": "slug-español",
      "slugEn": "slug-english",
      "sources": ["urls..."],
      "keywords": ["para detectar duplicados"]
    }
  ],
  "lastCheck": "ISO date"
}
```
