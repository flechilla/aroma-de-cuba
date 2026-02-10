# Flow: Gastronomía

## Configuración
- **Frecuencia:** 3 veces al día
- **Cron:** `0 9,15,21 * * *` (9am, 3pm, 9pm UTC)
- **Registry:** `memory/gastro-registry.json`

## Tipos de contenido

### Recetas tradicionales
- Ropa vieja, lechón asado, picadillo
- Moros y cristianos, congrí
- Yuca con mojo, tostones, maduros
- Postres: flan, arroz con leche, dulce de coco

### Ingredientes
- Yuca, boniato, malanga
- Plátano (verde y maduro)
- Frijoles negros
- Especias y adobos

### Bebidas
- Café cubano (colada, cortadito, café con leche)
- Cócteles (mojito, daiquirí, cuba libre)
- Guarapo, champola

### Historia culinaria
- Influencias (española, africana, china)
- Evolución de la cocina cubana
- Comida durante el Período Especial

## Proceso de generación

```
1. SELECCIONAR TEMA
   └─ Rotar entre tipos de contenido
   └─ Verificar que no esté en registry
   └─ Preferir platos emblemáticos primero

2. INVESTIGAR
   └─ Historia del plato/ingrediente
   └─ Variaciones regionales
   └─ Anécdotas y conexiones culturales

3. ESCRIBIR
   └─ Introducción con historia
   └─ Receta detallada (si aplica)
   └─ Tips prácticos
   └─ Conexión emocional (nostalgia, familia)

4. IMAGEN
   └─ Prompt descriptivo del plato
   └─ Estilo: food photography, warm lighting
   └─ Upload a Vercel Blob

5. PUBLICAR
   └─ ES + EN versions
   └─ Commit + deploy
```

## Estructura de recetas

```markdown
## Introducción
Historia y significado del plato

## Ingredientes
- Lista con cantidades exactas
- Notas sobre sustituciones

## Preparación
1. Pasos numerados
2. Con tiempos estimados
3. Tips en cada paso si es necesario

## Cómo servir
Acompañamientos tradicionales

## Variaciones
Versiones regionales o modernas
```

## Tono
- **Cálido y personal**
- "Mi abuela siempre decía..."
- Conectar con la nostalgia de la diáspora
- Accesible pero auténtico
