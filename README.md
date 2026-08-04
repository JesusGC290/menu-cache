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

### 2. Deploy automático con GitHub Actions

El repositorio ya trae el workflow **`.github/workflows/deploy.yml`**. En cada push:

1. instala dependencias con `npm ci`,
2. revisa tipos con `astro check`,
3. compila con `npm run build`,
4. publica `dist/` en Cloudflare Pages con `wrangler`.

Push a **`main` → producción** (`cache.soyshua.dev`). Push a **cualquier otra rama →
vista previa** con su propia URL, útil para revisar un cambio de precios antes de que lo
vea un cliente.

Hace falta configurarlo **una sola vez**:

**a) Crear el proyecto de Pages** (tipo _Direct Upload_, no conectado a Git):

```bash
npx wrangler pages project create menu-cache --production-branch=main
```

**b) Crear el API token** en [dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens)
→ **Create Token → Custom token**, con el permiso **Account · Cloudflare Pages · Edit**.

**c) Guardar los dos secrets** en GitHub: **Settings → Secrets and variables → Actions →
New repository secret**:

| Secret                 | De dónde sale                                            |
| ---------------------- | -------------------------------------------------------- |
| `CLOUDFLARE_API_TOKEN` | el token del paso (b)                                    |
| `CLOUDFLARE_ACCOUNT_ID`| panel de Cloudflare, barra lateral derecha de la cuenta  |

Mientras falten los secrets el workflow **compila igual pero no publica**, y deja un aviso
en el log en lugar de fallar.

> **No conectes además la integración de Git de Cloudflare Pages.** Con las dos activas cada
> push se publicaría dos veces. Se elige una: o este workflow, o
> _Workers & Pages → Create → Pages → Connect to Git_ (que no necesita secrets ni workflow,
> pero sí acceso de Cloudflare al repositorio).

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

## Carta para imprenta

Además de la web hay dos páginas que generan la carta impresa, **desde el mismo
`menu.ts`**: si cambia un precio, cambian el QR y el PDF a la vez.

| Ruta                 | Paleta                                  |                      |
| -------------------- | --------------------------------------- | -------------------- |
| `/impresion/claro`   | Marfil con tinta vino y oro             | **la que se trabaja** |
| `/impresion/oscuro`  | Morado, igual que la web                | alterna              |

**Formato:** doble carta plana, dos caras.

- Corte final **11 × 17 in**, sangrado **0.125 in** por lado (archivo de 11.25 × 17.25 in).
- Marcas de corte en las cuatro esquinas, dentro del sangrado.
- Zona segura de 0.35 in dentro del corte.
- Frente: Desayunos y Comidas a tres columnas. Vuelta: logotipo y Bebidas a dos columnas.

### Generar el PDF

```bash
npm run dev
```

Se abre `http://localhost:4321/impresion/claro` y se imprime con **Cmd + P**:

| Opción             | Valor              |
| ------------------ | ------------------ |
| Destino            | Guardar como PDF   |
| Tamaño de papel    | 11.25 × 17.25 in   |
| Márgenes           | Ninguno            |
| Escala             | 100 %              |
| Gráficos de fondo  | **Activado**       |

Sin *Gráficos de fondo* no salen el papel, los filetes ni la veladura de talavera.

### Cómo se reparte el espacio

El alto de cada bloque no se ajusta a ojo: `pesoDeMenu()` en
`src/components/CartaImpresa.astro` estima los renglones que genera cada menú (nombre,
líneas de descripción y notas) y ese peso se convierte en `flex-grow`. Así, al agregar
productos, la retícula se reacomoda sola.

Dos reglas de composición que conviene no romper:

- Una **categoría sí puede partirse** entre columnas. Si se prohíbe, los bloques quedan
  atómicos, no empaquetan parejo y el contenido se desborda fuera de la hoja.
- Un **encabezado de categoría nunca queda huérfano** al pie de una columna
  (`break-after: avoid`), ni se corta un producto a la mitad.

### El logotipo de la vuelta

Sale de `cache-logo-h.jpeg` (1206 × 818). Se le recortó el marco negro analizando el brillo
de cada fila y columna, y se guardó como PNG sin pérdida en
`src/assets/cache-logo-impresion.png` (**1194 × 789**), para no recomprimir un JPEG en
material de imprenta.

- Se imprime a **3.5 in → 341 DPI**, con holgura sobre los 300 que pide imprenta.
- El techo son **3.98 in** (justo 300 DPI). Pero de 3.6 in en adelante la vuelta se queda
  sin aire para las bebidas, así que 3.5 in es el tope práctico.
- Lleva `loading="eager"` a propósito: con carga diferida el navegador puede mandar la hoja
  a imprimir antes de bajar la imagen y **el logotipo saldría en blanco en el PDF**.

### Pendientes de producción

- **El PDF sale en RGB.** El dorado `#d4a437` y el morado se van a correr un poco al
  convertirse a CMYK en imprenta. Si el color importa, conviene pedirle a la imprenta la
  conversión con perfil, o una prueba de color antes del tiraje.
- **Para la versión oscura**, papel couché con laminado mate: es mucha cobertura de tinta y
  en impresión digital barata el morado sale manchado.

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
