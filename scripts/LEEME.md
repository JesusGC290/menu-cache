# Caché Restaurante · Sitio web

Sitio del restaurante con la carta digital. Hecho con **Astro + Tailwind CSS**; genera
archivos estáticos, sin base de datos ni servidor de aplicaciones.

---

## Qué contiene

| Ruta             | Qué es                                                                 |
| ---------------- | ---------------------------------------------------------------------- |
| `/`              | Presentación: portada, la casa, especialidades, horario y contacto      |
| `/carta`         | **La carta completa. Es el destino del código QR de las mesas.**       |
| `/carta-impresa` | Muestra del pliego de la carta impresa, para compartir por enlace      |

El QR de las mesas apunta a **`/carta`**, no a la portada: quien escanea sentado quiere la
carta de inmediato.

`/carta-impresa` va con `noindex` a propósito: repetiría el contenido de `/carta` y las dos
competirían por la misma búsqueda en Google. Eso no impide compartir el enlace.

---

## Requisitos

- **Node.js 22 o superior** (el archivo `.nvmrc` lo fija)

---

## Levantar en local

```bash
npm install
```

```bash
npm run dev
```

Queda en `http://localhost:4321`.

---

## Compilar para producción

**Importante:** hay que indicar el dominio final, porque de ahí salen la URL canónica, la
imagen que se ve al compartir en WhatsApp y los datos estructurados de Google.

```bash
SITE_URL=https://EL-DOMINIO-FINAL npm run build
```

El resultado queda en **`dist/`**: son archivos estáticos. Se sirven con cualquier hosting
(Cloudflare Pages, Netlify, Vercel, Nginx, Apache). No requiere Node en el servidor.

El archivo `public/_headers` trae reglas de caché para Cloudflare Pages: las tipografías y
los assets con hash se cachean un año, el HTML se revalida. En otros hosting se ignora y no
estorba.

---

## Actualizar la carta

Todo el contenido de la carta está en **`src/data/menu.ts`**. No hay que tocar diseño ni
componentes.

```ts
{
  name: 'Chilaquiles Rojos',
  description: 'Tira de maíz frita bañada en salsa de jitomate y serrano...',
  price: '149',                              // sin el signo $
  note: 'Con huevo $169 o pollo $169',       // opcional, se ve en dorado
}
```

- `note` en un **producto**: extras o precios alternos.
- `note` en una **categoría**: aclaración que aplica a todo el bloque
  (por ejemplo _«Solo sábados y domingos»_ en Menudo).
- Para agregar una categoría se añade un objeto con `id` (minúsculas, sin espacios, porque
  es el ancla del enlace directo), `title` y `products`.

Al recompilar, el cambio entra a la vez en `/carta` y en `/carta-impresa`.

> Los platillos destacados de la portada **se leen de `menu.ts`**, no se escriben aparte. Si
> se renombra un platillo destacado, el build falla con un mensaje claro en lugar de dejar el
> hueco en silencio. Los destacados se eligen en
> `src/components/sitio/Especialidades.astro`.

---

## Actualizar teléfono, horario, dirección o redes

Todo vive en **`src/data/negocio.ts`**, y de ahí salen la portada, el pie, los botones de
contacto y los datos estructurados de Google.

**Regla del proyecto: nada de marcadores de plantilla en producción.** Si un dato no existe
se deja en `null` y la sección no se dibuja. Es mejor no tener botón que tener un enlace que
no contesta.

---

## Temas claro y oscuro

El sitio respeta la preferencia del sistema operativo del visitante, y el botón de la barra
sirve para forzar lo contrario; la elección se guarda en `localStorage`.

Al escribir estilos hay dos familias de colores y la diferencia importa:

| Familia        | Ejemplos                                                     | Comportamiento              |
| -------------- | ------------------------------------------------------------ | --------------------------- |
| **Marca**      | `oro`, `oro-claro`, `oro-hondo`, `vino`, `talavera-*`        | fijos, son del logotipo     |
| **Semánticos** | `fondo`, `superficie`, `barra`, `texto`, `suave`, `tenue`, `acento` | giran con el tema    |

Si un color debe seguir siendo legible en los dos temas, va un token **semántico**
(`text-texto`, `border-acento/35`). Los fijos sólo para el botón dorado y los pétalos de
talavera, que funcionan igual sobre claro y sobre oscuro.

El contraste está auditado: 231 elementos con texto medidos en ambos temas, ninguno por
debajo de WCAG AA. Si se cambian colores, conviene volver a revisarlo.

---

## Detalles técnicos

- **Tipografías autoalojadas** (Cormorant Garamond + Jost) en `public/fonts`, sólo el
  subconjunto latino. No se llama a Google Fonts: el menú abre más rápido con señal débil y
  no depende de terceros.
- El logotipo se sirve en **WebP** en varios tamaños, generados en el build.
- El fondo (terciopelo, celosía de talavera y viñeta) es **CSS puro**, sin imágenes.
- Sin JavaScript el menú sigue siendo legible: se muestran los tres menús uno tras otro.
- Revisión de tipos con `npx astro check`.

---

## Verificar antes de publicar

```bash
npx astro check
```

```bash
SITE_URL=https://EL-DOMINIO-FINAL npm run build
```

Debe compilar **3 páginas** sin errores. Vale la pena abrir `/carta` en un celular y
comprobar que las pestañas y el carrusel de categorías funcionen.
