# Flow: Productos

## Configuración
- **Frecuencia:** 2 veces al día
- **Cron:** `0 10,20 * * *` (10am, 8pm UTC)
- **Registry:** `memory/productos-registry.json`

## Tipos de productos

### Tabaco (Habanos)
- Marcas: Cohiba, Montecristo, Partagás, Romeo y Julieta, Hoyo de Monterrey
- Formatos y vitolas
- Cómo elegir y fumar
- Conservación (humidores)

### Ron
- Havana Club (variedades)
- Santiago de Cuba
- Ron añejo vs. blanco
- Cócteles con ron cubano

### Café
- Regiones (Sierra Maestra, Escambray)
- Variedades y tuestes
- Preparación estilo cubano
- Café cubano en Miami

### Miel
- Producción cubana
- Tipos y usos
- Beneficios

### Otros
- Artesanías
- Instrumentos musicales
- Arte para coleccionar

## ⚠️ REQUISITO CRÍTICO: Links de compra

Cada post de productos DEBE incluir:

### Links externos (dónde comprar)
```markdown
## Dónde comprar

### Tiendas oficiales
- [La Casa del Habano México](https://lacasadelhabanohmo.com/)
- [EGM Cigars](https://es.egmcigars.com/)

### Tiendas online
- [Link 1](url)
- [Link 2](url)
```

### Links internos (contenido relacionado)
```markdown
*Relacionado: [Otro post del blog](/blog/es/slug)*
```

### Notas legales (cuando aplique)
```markdown
> ⚠️ **Nota:** La venta de [producto] está restringida en [país] 
> debido a [razón]. Verifica las regulaciones de tu país.
```

## Proceso de generación

```
1. SELECCIONAR PRODUCTO
   └─ Rotar entre categorías
   └─ Verificar registry
   └─ Preferir productos icónicos primero

2. INVESTIGAR
   └─ Historia del producto
   └─ Proceso de producción
   └─ Variedades/marcas
   └─ BUSCAR TIENDAS donde comprar

3. ESCRIBIR
   └─ Guía educativa
   └─ Recomendaciones para principiantes
   └─ Tips de experto
   └─ INCLUIR LINKS DE COMPRA

4. IMAGEN
   └─ Producto en contexto elegante
   └─ Estilo: product photography
   └─ Upload a Vercel Blob

5. PUBLICAR
   └─ ES + EN versions
   └─ Verificar que links funcionan
   └─ Commit + deploy
```

## Estructura sugerida

```markdown
## Introducción
Por qué este producto es especial

## Historia
Origen y tradición

## Variedades/Marcas
Guía de opciones

## Cómo elegir
Consejos para principiantes

## Cómo disfrutar/usar
Guía práctica

## Dónde comprar
**[SECCIÓN OBLIGATORIA]**
- Links a tiendas
- Notas sobre autenticidad
- Restricciones legales

## Relacionado
Links internos a otros posts
```

## Tono
- **Experto pero accesible**
- Guía de compra práctica
- Aspiracional sin ser pretencioso
- Honesto sobre precios y calidad
