# Caché Restaurante · Carta digital

Carta completa de **CACHÉ RESTAURANTE** en una sola página, pensada para leerse desde el
celular al escanear un QR. Es el equivalente a un PDF: listado simple de platillos con
nombre, descripción y precio, sin fotografías y sin interacción por producto.

Hecho con **Astro + Tailwind CSS**. Sitio 100 % estático, listo para GitHub + Cloudflare Pages.

---

## Cómo está armada

| Menú          | Categorías | Productos |
| ------------- | ---------: | --------: |
| Desayunos     |         13 |        52 |
| Comidas       |          8 |        32 |
| Bebidas       |         12 |        72 |
| **Total**     |     **33** |   **156** |

Las **bebidas se comparten** entre desayunos y comidas, por eso viven en su propia pestaña
en lugar de repetirse en los otros dos menús.

### Navegación

- **Tres pestañas** arriba: Desayunos · Comidas · Bebidas.
- **Carrusel de categorías** debajo, con desplazamiento horizontal. La categoría que se está
  leyendo se resalta sola conforme se hace scroll y el carrusel la mantiene a la vista.
- **Enlace directo a una categoría:** `.../#chilaquiles` abre el menú correcto y baja hasta
  ahí. Útil si quieres un QR específico, por ejemplo sólo para la barra o para los postres.
- Botón de **volver arriba** después de un rato de scroll.

---

## Actualizar la carta

Todo el contenido está en un solo archivo: **`src/data/menu.ts`**. No hay que tocar diseño
ni componentes.

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
  (por ejemplo _"Solo sábados y domingos"_ en Menudo).
- Para agregar una categoría, se añade un objeto con `id` (en minúsculas y sin espacios,
  porque es el ancla del enlace directo), `title` y `products`.

Al guardar y hacer push, Cloudflare Pages reconstruye el sitio solo.

---

## Desarrollo

```bash
npm install
```

```bash
npm run dev
```

Queda en `http://localhost:4321`.

```bash
npm run build
```

El sitio se genera en `dist/`.

---

## Publicar en GitHub + Cloudflare Pages

### 1. Subir el repositorio

```bash
git init && git add . && git commit -m "Carta digital de Caché Restaurante"
```

```bash
git remote add origin git@github.com:USUARIO/cache-menu.git && git branch -M main && git push -u origin main
```

### 2. Conectar Cloudflare Pages

En el panel de Cloudflare: **Workers & Pages → Create → Pages → Connect to Git**, se elige
el repositorio y se configura:

| Campo                  | Valor          |
| ---------------------- | -------------- |
| Framework preset       | `Astro`        |
| Build command          | `npm run build`|
| Build output directory | `dist`         |
| Node version           | 20 o superior  |

Cada push a `main` publica de nuevo. Las ramas distintas de `main` generan una vista previa
con su propia URL.

### 3. Apuntar el subdominio `cache.soyshua.dev`

Como `soyshua.dev` ya está en Cloudflare, **no hay que tocar DNS a mano**: Cloudflare crea
el registro solo.

En el proyecto de Pages: **Custom domains → Set up a custom domain**, se escribe
`cache.soyshua.dev` y se confirma con **Activate domain**.

Cloudflare agrega un `CNAME` de `cache` hacia `<proyecto>.pages.dev` (proxeado, la nubecita
naranja) y emite el certificado TLS. Tarda entre un minuto y unos 15; mientras aparece como
_Initializing_.

El dominio ya está configurado en `astro.config.mjs`:

```js
site: 'https://cache.soyshua.dev',
```

> Si el subdominio ya tuviera un registro previo (`A`, `AAAA` o `CNAME` de `cache`), hay que
> borrarlo antes o Cloudflare marcará conflicto.

### 4. Generar el QR

Ya con `https://cache.soyshua.dev` en línea, el QR se apunta a esa URL. Al vivir en un
dominio propio, el QR impreso **no se vuelve a imprimir** aunque cambie el hosting.

Para un QR de una sección específica se le agrega el ancla de la categoría, por ejemplo
`https://cache.soyshua.dev/#micheladas`.

---

## Notas sobre el contenido

- Los precios y textos salieron de los documentos `MENU DESAYUNOS`, `MENU COMIDAS` y
  `MENU BEBIDAS`. Se verificó que **los 172 precios de los documentos están en el sitio**.
- **Menudo** aparece en el documento sin precio; se tomó **$100** del menú de NEI Digital.
  Conviene confirmarlo.
- Se corrigieron erratas de captura (por ejemplo _ligth_ → _light_, _omellete_ → _omelette_,
  _carme_ → _carne_, _BAYLES_ → _Baileys_). **Ningún precio se modificó.**
- Las categorías **Tacos** y **Aguas Frescas** que existen en NEI Digital **no se incluyeron**:
  sus precios ($19–$40) corresponden a otro concepto, no al restaurante.

## Detalles técnicos

- Tipografías **autoalojadas** (Cormorant Garamond + Jost): no se llama a Google Fonts, así
  el menú abre más rápido con una señal de celular débil.
- El logotipo se sirve en **WebP** en tres tamaños (8–49 KB según la pantalla), en vez del
  PNG original de 547 KB.
- Fondo de lujo mexicano en CSS puro: terciopelo morado en degradado, celosía de talavera
  calada en oro y viñeta. No pesa nada porque no usa imágenes.
- Sin JavaScript el menú sigue siendo legible: se muestran los tres menús uno tras otro.
