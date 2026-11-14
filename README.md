# RUBXTER · Portfolio de Rubén García

Portfolio con el diseño original de escritorio: ventanas arrastrables, barras con controles, foto, tipografía VT323, etiquetas de habilidades y dock de seis iconos. En móvil, las mismas ventanas se muestran como paneles desplazables.

## Ejecutar y compilar

Node.js 24 LTS recomendado.

```sh
npm ci
npm run dev
```

Abrir http://localhost:3000. `npm run build` genera la versión publicable directamente en `dist/`. No requiere claves API, base de datos ni servidor backend.

## Diseño y contenido

- `src/services/desktop.service.ts`: ventanas, dimensiones, foco, apertura y cierre. Sobre mí y Habilidades están abiertas al inicio, como en la referencia.
- `src/components/window/`: arrastre, redimensionado, maximizar y restaurar.
- `src/components/dock/`: seis iconos originales, indicadores y acceso a ventanas.
- `src/services/language.service.ts`: contenido ES/EN, incluido Niji desde marzo de 2026 y tecnologías de los CV.
- `src/components/about/`: presentación, foto original y descarga de CV por idioma.
- `src/components/projects/`: SKROLL, RANDOMIA y Deep Dark Waters. SKROLL se acredita como proyecto de equipo de Cyclops Games.
- `src/components/contact/`: contacto y servicios, dentro de la ventana original. Las ofertas se leen de `src/portfolio.content.ts`.
- `src/styles.css` y `tailwind.config.cjs`: estilos originales, temas claro/oscuro, adaptación móvil y movimiento reducido.
- `public/cv/`: ambos CV aportados por Rubén.
- `public/images/`: foto e imágenes de los juegos recuperadas de las fuentes originales.

Tailwind y las fuentes se compilan localmente. El navegador no necesita cargar estilos, fuentes o imágenes desde un CDN.

## Publicar

Vercel: el repositorio está conectado a Vercel. Cada `git push` a `main` genera un nuevo despliegue de producción. El portfolio se publica en `www.rubengdm.dev`; Vercel detecta Angular y configura el build del proyecto.

El contacto utiliza `mailto:`. No se ha publicado ni contratado ningún servicio. La versión ES/EN cambia en cliente; no son dos páginas independientes prerenderizadas para SEO.

## Comprobaciones

Compilación con plantillas estrictas. Pruebas en Chrome a 320, 390, 768, 1024 y 1440 px: dock, ventanas, arrastre, redimensionado, maximizar/restaurar, cierre y reapertura, navegación móvil, idiomas, temas, CV y contenido añadido. Capturas y herramientas locales en `.tools/`, excluidas del despliegue.

Queda por concretar con Rubén la aportación individual a SKROLL y su experiencia Shopify antes de ampliar esas descripciones.

Validación final realizada el 15 de septiembre de 2026: compilación correcta y pruebas de navegador superadas, incluyendo el cambio móvil/escritorio sin recarga y la conservación del tamaño manual después de maximizar/restaurar. Se mantiene el diseño de ventanas y dock original.
