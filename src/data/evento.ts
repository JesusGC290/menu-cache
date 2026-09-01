/**
 * Evento con fecha: la Noche Mexicana del 15 de septiembre.
 * ═══════════════════════════════════════════════════════════════════════
 *
 * Fuente única del evento. De aquí salen las tres piezas que lo anuncian y
 * no puede pasar que se contradigan:
 *
 *   · el modal que aparece al entrar al sitio  (`AnuncioEvento.astro`)
 *   · la página con todo el detalle            (`/noche-mexicana`)
 *   · los datos estructurados de Google        (`DatosEvento.astro`)
 *
 * El menú y los horarios se transcribieron de `material/menu-evento.docx`.
 * El nombre del evento, la hora de apertura y el teléfono de reservaciones
 * salen además del flyer (`material/vacashow.JPG`), que es lo que circula
 * impreso y en redes.
 *
 * ── Por qué esto NO va en negocio.ts ni en menu.ts ──────────────────────
 *
 * `negocio.ts` es lo permanente del restaurante y `menu.ts` es la carta de
 * todos los días. Esto es una noche. Mezclarlo tendría dos costos concretos:
 * el menú del evento aparecería en la carta y en la exportación al punto de
 * venta (`npm run exportar`), donde no debe estar, y el horario del evento
 * —8 pm a medianoche— chocaría con el horario oficial de 8 am a 6 pm, que es
 * el que Google publica y el que las bios de redes repiten.
 *
 * **El horario del restaurante no se toca.** Esa noche se abre a las 8 pm por
 * excepción; el `openingHours` de schema.org sigue siendo 08:00–18:00 y el
 * detalle de la excepción vive en el `Event`, que es donde Google lo espera.
 */

/**
 * ── Interruptor de apagado ──────────────────────────────────────────────
 *
 * En `false` la página `/noche-mexicana` renderiza el estado alterno —la
 * noche ya pasó, el restaurante sigue aquí— y el modal deja de aparecer en
 * todo el sitio. **Nunca un 404 ni un redirect:** el flyer va a seguir
 * circulando en WhatsApp semanas después de la noche, y quien llegue tarde
 * merece una respuesta, no un error.
 *
 * Casi nunca hay que tocarlo: `eventoVigente` ya apaga todo solo en cuanto
 * pasa la fecha. Está para poder cancelar la noche antes de tiempo sin
 * borrar código.
 */
export const EVENTO_ACTIVO = true;

export const evento = {
  ruta: '/noche-mexicana',

  nombre: 'Gran Noche Mexicana',
  /** Una línea, la del flyer. Es lo que se lee en el modal antes de decidir. */
  gancho: 'Una noche de música, comedia y tradición',

  /**
   * Fechas en ISO con offset explícito. Guadalajara es UTC−6 todo el año
   * (México dejó el horario de verano en 2022), así que el `-06:00` es fijo
   * y no hay que revisarlo cada abril.
   *
   * `fin` es la hora a la que el anuncio deja de tener sentido, no la hora a
   * la que se apagan las luces: el show termina 11:30 pm y a medianoche ya no
   * hay nada que reservar.
   */
  inicio: '2026-09-15T20:00:00-06:00',
  fin: '2026-09-16T00:00:00-06:00',

  fechaLarga: 'Martes 15 de septiembre de 2026',
  fechaCorta: '15 de septiembre',
  /** Para el botón de la portada, donde «Gran Noche Mexicana» no cabe a 375px */
  etiquetaBoton: 'Noche Mexicana · 15 sep',
  /** Primer punto del programa: la puerta abre antes que empiece la música. */
  apertura: { hora: '8:00 pm', texto: 'Se abren las puertas' },

  /**
   * Menú de tres tiempos. `elegir: true` marca el tiempo donde el comensal
   * escoge uno de los platillos en lugar de recibirlos todos: sin esa marca,
   * tres platos fuertes en una lista se leen como que van los tres.
   */
  menu: {
    tiempos: [
      { nombre: 'Entrada', elegir: false, platillos: ['Sopa azteca'] },
      {
        nombre: 'Plato fuerte',
        elegir: true,
        platillos: ['Chamorro', 'Mixiote de pollo', 'Chile en nogada'],
      },
      { nombre: 'Postre', elegir: false, platillos: ['Flan de elote'] },
    ],
    precio: 490,
    nota: 'Por persona. No incluye bebidas ni propina.',
  },

  /** El infantil son dos tiempos, no tres: no lleva entrada. */
  menuInfantil: {
    tiempos: [
      {
        nombre: 'Plato fuerte',
        elegir: true,
        platillos: ['Mini hamburguesas', 'Tiras de pechuga de pollo empanizada'],
      },
      { nombre: 'Postre', elegir: false, platillos: ['Flan de elote'] },
    ],
    precio: 260,
    nota: 'No incluye bebidas.',
  },

  /** El programa de la noche, en orden. */
  variedad: [
    {
      hora: '9:00 – 10:00 pm',
      nombre: 'Mariachi',
      detalle: null,
    },
    {
      hora: '10:00 – 11:30 pm',
      nombre: 'Esdras Vaca Showman',
      detalle: 'Show cómico musical: imitaciones de Juan Gabriel y Vicente Fernández',
    },
  ],

  /** Mensaje precargado del botón de WhatsApp. Distinto al de reservación normal. */
  mensajeWhatsapp:
    'Hola, quiero reservar para la Noche Mexicana del 15 de septiembre en Caché.',

  /**
   * Lo que el restaurante pidió anunciar. Va tal cual porque es una
   * afirmación del negocio sobre su propio aforo, no un dato del sitio.
   */
  urgencia: 'Últimas mesas',
} as const;

/**
 * ¿Sigue en pie? Se evalúa al compilar, así que el sitio se apaga solo en el
 * primer despliegue posterior a la noche —y el modal lo vuelve a verificar en
 * el navegador, por si alguien abre una página que quedó en caché.
 */
export const eventoVigente = EVENTO_ACTIVO && Date.now() < Date.parse(evento.fin);
