# Caché Restaurante · Carta digital

Carta completa de **CACHÉ RESTAURANTE** en una sola página, pensada para leerse desde el
celular al escanear un QR. Es el equivalente a un PDF: listado simple de platillos con
nombre, descripción y precio, sin fotografías y sin interacción por producto.

Hecho con **Astro + Tailwind CSS**. Sitio 100 % estático, listo para GitHub + Cloudflare Pages.

---

## Estructura del sitio

| Ruta                | Qué es                                                          |
| ------------------- | --------------------------------------------------------------- |
| `/`                 | **La carta completa. Es la principal y el destino del QR.**     |
| `/informacion`      | Presentación: la casa, especialidades, horario y contacto        |
| `/carta-impresa`    | Muestra del pliego impreso, para compartir por enlace            |
| `/impresion/claro`  | Carta para imprenta, paleta marfil (la que se trabaja)          |
| `/impresion/oscuro` | Carta para imprenta, paleta morada                              |

`/carta` sigue respondiendo con un redirect a `/`, por si quedó algún enlace viejo.

Las tres versiones salen del mismo `menu.ts`, así que un cambio de precio entra a las tres
a la vez.

**La carta es la página principal.** Quien escanea el QR en la mesa cae directo en ella, y
desde ahí hay dos botones: *Información* (horario, ubicación y contacto) y *Carta impresa*
(la muestra del pliego). Los datos estructurados de Google viven en `/`, que es la página
que se posiciona.

### Tema claro y oscuro

El sitio **respeta la preferencia del sistema**: un celular en modo claro a mediodía abre en
marfil, y de noche en morado. El botón de la barra sólo sirve para forzar lo contrario, y la
elección se guarda en `localStorage`.

El modo claro **es la misma paleta marfil de la carta impresa**, así que la web clara y el
papel son el mismo diseño.

Hay dos familias de tokens de color y la diferencia importa:

| Familia | Ejemplos | Comportamiento |
| ------- | -------- | -------------- |
| **Marca** | `oro`, `oro-claro`, `oro-hondo`, `vino`, `talavera-*` | fijos, son del logotipo |
| **Semánticos** | `fondo`, `superficie`, `barra`, `texto`, `suave`, `tenue`, `acento` | giran con el tema |

Al escribir una clase de color, la regla es: **si el color debe seguir siendo legible en los
dos temas, va un token semántico** (`text-texto`, `border-acento/35`). Los fijos sólo para el
botón dorado y los pétalos de talavera, que funcionan igual sobre papel y sobre terciopelo.

Cosas que **no** son colores planos y también giran: la veladura de talavera, la viñeta y las
sombras (`--sombra-placa`, `--sombra-barra`). Una sombra negra al 95 % sobre marfil se ve
como mugre, por eso en claro son cafés y más suaves.

El tema se aplica con un script *inline* en el `<head>`, antes de pintar. Si fuera diferido,
la página aparecería un instante en el tema equivocado.

#### Contraste verificado

Se auditaron los colores calculados de cada elemento con texto, contra el fondo del tema, en
los dos temas: **231 elementos (44 en la portada + 187 en la carta), 0 por debajo de WCAG AA.**
Dos cosas salieron de ahí:

- `tenue` en claro empezó en `#857089` y daba 3.93 — reprobado. Quedó en `#775f7b` (4.96).
- A `tenue` **no se le baja la opacidad**. Ya es el nivel apagado; con `/50` o `/60` el texto
  legal quedaba ilegible en papel. La jerarquía la da el tamaño, no más transparencia.

### Datos del negocio

Todo lo de contacto vive en `src/data/negocio.ts`, y de ahí salen la portada, el pie, los
botones y los datos estructurados de Google. **Regla: nada de marcadores de plantilla en
producción.** Si un dato no existe se deja en `null` y la sección no se dibuja. Así estuvo el
botón de WhatsApp hasta que existió la línea: al llenar el dato apareció solo, sin tocar
componentes.

Las especialidades de la portada **se leen de `menu.ts`**, no se teclean aparte: así la
portada no puede anunciar un precio que la carta ya cambió. Si un platillo se renombra, el
build truena en lugar de dejar el hueco en silencio.

## Cómo está armada

| Menú          | Categorías | Productos | Con gramaje |
| ------------- | ---------: | --------: | ----------: |
| Desayunos     |         13 |        53 |          34 |
| Comidas       |          8 |        36 |          25 |
| Bebidas       |         12 |        74 |          74 |
| **Total**     | **33** | **163** | **133** | **33** | **159** | **47** |

Las **bebidas se comparten** entre desayunos y comidas, por eso viven en su propia pestaña
en lugar de repetirse en los otros dos menús.

### Navegación

- **Tres pestañas** arriba: Desayunos · Comidas · Bebidas.
- **Carrusel de categorías** debajo, con desplazamiento horizontal. La categoría que se está
  leyendo se resalta sola conforme se hace scroll y el carrusel la mantiene a la vista.
- **Enlace directo a una categoría:** `.../#chilaquiles` abre el menú correcto y baja hasta
  ahí. Útil si quieres un QR específico, por ejemplo sólo para la barra o para los postres.
- Botón de **volver arriba** después de un rato de scroll.

### Exportar la carta para el punto de venta

```bash
npm run exportar
```

Genera en **`exportacion/`** tres vistas de la misma carta, salidas de `menu.ts`:

| Archivo      | Para qué                                                      |
| ------------ | ------------------------------------------------------------- |
| `carta.md`   | Leer y capturar a mano, categoría por categoría               |
| `carta.csv`  | Importar o abrir en Excel · un renglón por producto, 9 columnas |
| `carta.json` | Importar por sistema                                          |

**Se regeneran, no se editan a mano.** Si se corrigen ahí, el siguiente
`npm run exportar` los sobrescribe: la corrección va en `src/data/menu.ts`.

El CSV trae dos columnas de descripción: `descripcion` sola y
`descripcion_completa`, que es gramaje y descripción unidos como se ven en la carta,
para cuando el punto de venta tiene un solo campo. Lleva BOM al inicio, o Excel en
Windows abre los acentos como basura.

`carta.md` cierra con el **estado de las porciones**, que distingue tres casos: con
gramaje propio, declarado por la nota de su categoría (las enchiladas), y sin declarar.
La distinción importa: contar sólo los que no tienen campo propio manda a perseguir
datos que ya existen.

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

## Publicar

El sitio lo despliega **Cloudflare Pages conectado directamente al repositorio de GitHub**,
en la cuenta del cliente. Cada push a `main` reconstruye y publica solo: no hace falta
ningún workflow de GitHub Actions, y por eso el repositorio ya no trae uno.

Configuración del proyecto en Cloudflare Pages:

| Campo                     | Valor           |
| ------------------------- | --------------- |
| Framework preset          | `Astro`         |
| Build command             | `npm run build` |
| Build output directory    | `dist`          |
| Node version              | 22 o superior   |

**Variables de entorno**, en *Settings → Environment variables*:

| Variable              | Valor                          |                                |
| --------------------- | ------------------------------ | ------------------------------ |
| `SITE_URL`            | `https://cacherestaurante.com` | obligatoria                    |
| `PUBLIC_POSTHOG_KEY`  | `phc_…`                        | para la analítica (ver abajo)  |

Sin `SITE_URL`, la URL canónica, la imagen que se ve al compartir en WhatsApp y los datos
estructurados de Google apuntarían al dominio por omisión. El valor por omisión ya es el
dominio final, así que aunque falte no queda mal — pero conviene fijarla para que una
vista previa de otra rama no se anuncie como si fuera producción.

El dominio está en Namecheap con los nameservers apuntando a Cloudflare, así que el
subdominio se agrega desde **Custom domains** del proyecto de Pages y Cloudflare crea el
registro solo.

Las ramas distintas de `main` generan una vista previa con su propia URL.

---

## Analítica

Visitas y analítica web con **PostHog** (proyecto en la región US). Todo vive en un solo
componente, [`src/components/Analitica.astro`](src/components/Analitica.astro), incluido
únicamente en `Layout.astro`.

Eso último es a propósito. Sólo cuentan las páginas públicas:

| Cuenta                          | No cuenta                                              |
| ------------------------------- | ------------------------------------------------------ |
| `/` (la carta), `/informacion`  | `/impresion/claro`, `/impresion/oscuro`, `/carta-impresa` |

Las de impresión salen de `Impresion.astro`, que no lleva el componente: se abren para
generar el PDF, y contarlas mezclaría trabajo interno con visitas de clientes. Si algún día
se quiere medir la muestra compartible `/carta-impresa`, es agregar `<Analitica />` a
`Impresion.astro` dentro del `if` de `compartible`, para que las dos de producción sigan
fuera.

**La llave va en `PUBLIC_POSTHOG_KEY`**, no en el código. La project API key de PostHog es
pública por diseño —viaja al navegador de todos modos, no es un secreto—, pero sacarla del
código sirve para dos cosas: cambiar de proyecto de PostHog no obliga a tocar código, y
**sin la variable no se manda nada**. Como `npm run dev` no la trae, trabajar en la carta
no genera visitas falsas. Para probar la analítica en local, un archivo `.env` con:

```
PUBLIC_POSTHOG_KEY=phc_…
```

`.env` está en el `.gitignore`.

Sobre el peso: `posthog-js` se carga con importación dinámica, así que queda en su propio
archivo (~65 KB comprimido) aparte del JS de la página, y se pide después de pintar. Sin la
variable el compilador lo elimina entero: no se genera ni el archivo.

Ningún visitante genera perfil de persona. El sitio no tiene cuentas ni `identify`, y con
el valor por omisión de PostHog (`person_profiles: 'identified_only'`) los eventos son
anónimos, lo que además abarata el plan.

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

### Muestra para compartir: `/carta-impresa`

Es **el mismo pliego que va a imprenta**, en paleta marfil, para verse en pantalla y
compartirse por enlace. No se descarga: se ve. Sin el letrero de producción y **sin un solo
botón ni enlace** (verificado en el HTML compilado: 0 de cada uno).

El problema a resolver era el tamaño: el pliego mide 1080 px de ancho y un celular tiene 390.

- La hoja se **escala al ancho disponible** (0.34 en un celular de 390 px) y nunca se agranda
  más allá de 1:1 en escritorio.
- El `viewport` **no lleva `user-scalable=no`**, así que para leer un precio se acerca con los
  dedos, igual que en un PDF.
- El contenedor de cada hoja se encoge al alto ya escalado; si no, quedaría un hueco enorme
  debajo.
- Se recalcula cuando cargan las tipografías y al girar el teléfono, porque el alto cambia.

Sobre la legibilidad, para tenerlo claro: a 0.34 **se ve la composición completa, pero para
leer hay que acercar**. Eso es inherente a mostrar una hoja de 11 × 17 in en un celular, y es
como se comporta cualquier PDF. Para leer la carta en el teléfono sin acercar está `/carta`,
que es justo para eso.

La hoja va envuelta en `.encuadre`, que es `display: contents` por omisión: no altera ni el
impreso ni las páginas de producción, y sólo la muestra lo convierte en caja para escalar.

`noindex` a propósito: repetiría el contenido de `/carta` y las dos competirían por la misma
búsqueda. No impide compartir el enlace, y sí lleva metadatos de Open Graph para que se vea
bien al pegarlo en WhatsApp.

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

**Un solo flujo de columnas para todas las secciones.** Las bandas de título
(`DESAYUNOS`, `COMIDAS`) cruzan el ancho con `column-span: all`, y el navegador balancea
todo el contenido.

Antes cada menú tenía su propia retícula y el alto se repartía con un peso estimado desde
los datos. Se eliminó porque el problema era de fondo: **cualquier estimación se desvía**, y
al desviarse un menú acapara espacio mientras al otro se le desborda el contenido. Pasó
exactamente eso al entrar los gramajes de Comidas: Desayunos se quedaba con 1.06 in de
sobra mientras a Comidas se le caían dos postres fuera de la hoja. Con flujo único no hay
reparto que calibrar.

Tres reglas de composición que conviene no romper:

- Las **bandas de título** llevan `column-span: all`. Es lo que permite el flujo único.

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
