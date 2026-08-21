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
| `/89`               | Landing de la campaña del café con QR (`noindex`, piloto)       |

`/carta` sigue respondiendo con un redirect a `/`, por si quedó algún enlace viejo.

**`/89` no se enlaza desde ninguna parte del sitio, y es a propósito.** Se llega sólo
escaneando el QR pegado en los vasos de café que se reparten en la zona de oficinas. Lleva
`noindex, nofollow` mientras corre el piloto: la campaña se mide por la razón entre escaneos
y canjes en Nei, y si la página empezara a recibir visitas de búsqueda ese número dejaría de
significar algo. Al cerrar el piloto se revierte en una línea. Ver
[la sección de la campaña](#la-campaña-del-café-89).

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

| Cuenta                                  | No cuenta                                              |
| --------------------------------------- | ------------------------------------------------------ |
| `/` (la carta), `/informacion`, `/89`   | `/impresion/claro`, `/impresion/oscuro`, `/carta-impresa` |

`/89` no usa `Analitica.astro`: su layout trae su propio script, porque además de
inicializar PostHog tiene que mandar el evento de la campaña con la zona de reparto en el
mismo hilo. Con dos scripts separados el evento dependería de que PostHog ya hubiera acabado
de cargar, y esa carrera se pierde justo con mala señal. Los dos scripts fijan `defaults` a
la misma fecha: si algún día se mueve, se mueven los dos.

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

## La campaña del café: `/89`

Se reparte café gratis en una zona de oficinas cercana. Cada vaso lleva un QR pegado, y quien
lo escanea cae en [`/89`](src/pages/89.astro). El único trabajo de esa página es que esa
persona entienda la promo en cinco segundos y sepa cómo llegar.

**El canje ocurre en Nei, en la caja, en persona.** La web no emite códigos, no valida nada,
no registra canjes y no le habla al punto de venta. Por eso la página es prácticamente
estática: cualquier estado o lógica de canje en web crearía una segunda fuente de verdad que
contradiría a Nei. Queda explícitamente fuera de alcance —y no se debe agregar— formulario de
cualquier tipo, código o cupón en pantalla, cuenta regresiva, contador de canjes restantes,
pedido en línea, reserva y fotografía de banco.

### Otro sistema visual, y por eso otro layout

`/89` no se ve como la carta, a propósito. Sigue el **Sistema de Identidad Visual v1.1**
—papel `#FBF5ED`, escalas de coral y golondrina, Alegreya y Alegreya Sans, motivos planos
sacados de los murales— mientras la carta sigue en terciopelo y oro con Cormorant Garamond y
Jost. El v1.1 deja el sitio web en su lista de pendientes: el rediseño con ese sistema
todavía no se decide, así que cada sistema vive en su propia hoja y no se pisan.

| Pieza | La carta y `/informacion` | `/89` |
| --- | --- | --- |
| Layout | `Layout.astro` | `Campana.astro` |
| Hoja | `global.css` (Tailwind) | `campana.css` (CSS a mano) |
| Tipografías | Cormorant Garamond + Jost | Alegreya + Alegreya Sans |
| Temas | claro y oscuro | uno solo |

`campana.css` no usa Tailwind. Un segundo punto de entrada arrastraría a la landing todo el
utilitario que usa la carta —que es mucho—, y esta página se abre en un pasillo de oficina con
mala señal. Escrita a mano, y con las tres fotos dentro, la primera carga en un celular de
375px son **181 KB** — y **93 KB** en las visitas siguientes, porque las tipografías se quedan
en la caché de un año:

| Pieza | Peso |
| --- | --- |
| Tipografías ×3 (caché de un año) | 88 KB |
| Sello | 31 KB |
| Foto del café | 22 KB |
| Fotos de chilaquiles y hotcakes | 24 KB |
| HTML | 9 KB |
| CSS | 7 KB |
| **JavaScript** | **0 KB** |

### El diseño es de celular, no de escritorio

La página se llega escaneando un QR pegado a un vaso, así que **el celular no es un caso a
soportar: es el caso**. De ahí salen las decisiones que a primera vista parecen raras en una
pantalla grande:

- **Las tres opciones van en filas horizontales**, no apiladas con foto grande. Tres fotos de
  4:3 una debajo de otra son unos 750px de scroll antes de llegar a «Cómo llegar», y el
  trabajo de la página son cinco segundos. Arriba de 600px pasan a tres columnas.
- **No hay motivo decorativo grande.** Hubo una golondrina en la banda oscura y se quitó: para
  que se leyera como golondrina y no como un fragmento, había que darle su propio espacio, y
  en un celular ese espacio se ve como un hueco vacío. La foto real del café hace ese trabajo
  mejor. El componente [`Golondrina.astro`](src/components/campana/Golondrina.astro) se queda:
  es el motivo que llevan las dos tarjetas de vista previa, y ahí sí tiene ancho de sobra.
- **El ritmo vertical está apretado a mano.** El aire por omisión entre secciones se lee como
  descuido en una pantalla de 375px.

### El interruptor de apagado

La promo no tiene fecha de cierre, pero algún día termina, y para entonces va a haber QRs
impresos circulando por meses en vasos que ya nadie controla. En `89.astro`:

```js
const PROMO_ACTIVA = true;
```

En `false`, la misma ruta renderiza el estado alterno —la promo ya no está, el restaurante
sigue aquí, dirección, horario e Instagram—, cambia el `og:image` por la tarjeta de promo
cerrada y manda otro evento de analítica, para que los escaneos de vasos viejos no inflen la
razón del piloto. **Nunca un 404 ni un redirect:** quien escanea un vaso viejo merece una
respuesta, no un error.

### La zona de reparto: `?p=`

`/89?p=<zona>` se lee en cliente y viaja como propiedad `zona` del evento de analítica. **No
se muestra en pantalla:** no hay código que enseñar, el canje lo resuelve la caja. Sin
parámetro se registra como `general`. Hoy hay una sola zona; el parámetro existe desde ahora
para que expandir la campaña no obligue a tocar código.

### Las fotos

Tres, todas propias del restaurante y todas recortadas a mano en `src/assets/`:

| Archivo | Qué es | Recorte |
| --- | --- | --- |
| `89-chilaquiles.jpg` | Chilaquiles rojos, a 45° | 1:1 |
| `89-hotcakes.jpg` | Hotcakes con fruta, cenital | 1:1 |
| `89-cafe-bota.jpg` | La taza de barro en forma de bota | 4:5 |

Cumplen las reglas de foto del v1.1: cenital o a 45°, sobre superficie neutra, sin filtros y
**nada de fotografía de banco**, que contradiría un sistema visual que se sostiene en que cada
color existe de verdad en el local.

**Dos cosas que hubo que arreglar y conviene revisar si se cambia alguna foto:**

- La del café traía en el fondo el letrero enmarcado del menú con el horario viejo,
  `8:00 — 22:00`, perfectamente legible. Publicada así, la página se contradecía a sí misma
  tres bloques más abajo, donde dice que abrimos de 8 am a 6 pm. El recorte 4:5 lo saca por
  completo. **Revisar el fondo antes de publicar cualquier foto nueva.**
- La del café y la de hotcakes venían con orientación EXIF 6, o sea acostadas.

### El platillo sin foto

De huevos no hay foto todavía, y no se esperó. El problema de tener dos de tres no es que
falte una: es que **cualquier relleno tibio al lado de dos fotografías se lee como imagen
rota.** El bloque de crema con un arco pálido que había antes se veía exactamente así, como un
agujero.

La salida no fue disimularlo sino subirle el peso hasta que empatara: **coral 500 macizo con un
círculo de papel encima.** Plano, sin sombra ni degradado, dentro del sistema —el 500 es la
banda de las manchas de color y el círculo pleno es el motivo «sol» de la biblioteca— y de paso
se lee como un huevo estrellado. Deja de parecer una foto que falta y pasa a parecer una
decisión.

El mecanismo está en el arreglo `platillos` de [`89.astro`](src/pages/89.astro): cada platillo
lleva `foto` y un `motivo` (`'sol'` o `'arco'`) que ocupa el hueco mientras la foto no exista.
**Cuando llegue la de huevos:** se suelta el archivo en `src/assets/`, se importa, se pone en
`foto` y se le escribe su `alt`. El `motivo` se queda sin usar, listo para la próxima vez, y no
hay que mover ninguna medida.

> El `alt` describe **la foto, no el platillo**. El detalle de la tarjeta dice «verdes o rojos»
> porque las dos versiones entran en la promo, pero la foto es de los rojos, y eso es lo que
> tiene que oír quien no la ve. Las tres tarjetas traen el slot reservado y degradan a un bloque de crema con
un arco plano, así que **agregarlas es soltar tres archivos en `src/assets/` y cambiar tres
`null`** en el arreglo `platillos`. No hay que rediseñar nada: el hueco ya ocupa el espacio
final. Tienen que ser cenitales, cuadradas y propias — nada de fotografía de banco, que
contradice un sistema visual que se sostiene en que cada color existe de verdad en el local.

### Las tarjetas de vista previa

[`public/og-89.png`](public/og-89.png) y
[`public/og-89-cerrada.png`](public/og-89-cerrada.png), 1200×630. Importan más que la página:
el camino más probable de esta campaña no es el escaneo, es que quien escaneó reenvíe el
enlace al grupo de WhatsApp de su oficina, y esa tarjeta la ven más ojos que la landing.

Están generadas por código a partir del sistema v1.1 para no lanzar con la vista previa
vacía. **Cuando exista la versión de Figma, se reemplazan los dos archivos en la misma ruta y
no hay que tocar código.**

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

- Tipografías **autoalojadas**: Cormorant Garamond + Jost en la carta, Alegreya + Alegreya
  Sans en `/89`. No se llama a Google Fonts, así el sitio abre más rápido con una señal de
  celular débil. Sólo el subconjunto latino, y las agarra la caché de un año de `/fonts/*`.
- El logotipo se sirve en **WebP** en tres tamaños (8–49 KB según la pantalla), en vez del
  PNG original de 547 KB.
- Fondo de lujo mexicano en CSS puro: terciopelo morado en degradado, celosía de talavera
  calada en oro y viñeta. No pesa nada porque no usa imágenes.
- Sin JavaScript el menú sigue siendo legible: se muestran los tres menús uno tras otro.
