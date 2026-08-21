/**
 * Datos del negocio. Fuente única: de aquí salen la portada, el pie, los
 * botones de contacto y los datos estructurados para Google.
 *
 * REGLA IMPORTANTE: nada de marcadores de plantilla en producción.
 * Si un dato todavía no existe se deja en `null` y la sección simplemente no
 * se dibuja. Nunca un `wa.me/523300000000` ni un `instagram.com/[IG]`: un
 * enlace roto cuesta más que un botón ausente.
 */

export const negocio = {
  nombre: 'Caché Restaurante',
  descripcionCorta: 'Cocina mexicana en Guadalajara',

  direccion: {
    calle: 'Manuel Acuña 1849',
    colonia: 'Ladrón de Guevara',
    cp: '44600',
    ciudad: 'Guadalajara',
    estado: 'Jalisco',
    pais: 'MX',
  },

  /**
   * Todos los días, 8:00 a 18:00.
   *
   * Este es el horario oficial, el mismo que las bios de Instagram, TikTok y
   * Facebook. El sitio decía 8 am – 10 pm y las contradecía: cualquiera que
   * compare las dos fuentes se queda sin saber a qué hora abrimos, y el
   * primer dato equivocado es el que se recuerda.
   *
   * De aquí salen el pie, la portada, /informacion, la landing /89 y el
   * `openingHours` de schema.org. Cambiarlo aquí lo cambia en todo el sitio:
   * no hay ninguna otra copia del horario en el código.
   */
  horario: {
    texto: 'Todos los días de 8:00 am a 6:00 pm',
    textoCorto: 'Todos los días · 8 am – 6 pm',
    /** Redacción corta para frases dentro de un párrafo: «Abrimos …» */
    frase: 'todos los días de 8 am a 6 pm',
    abre: '08:00',
    cierra: '18:00',
    /** Formato de schema.org para los datos estructurados */
    dias: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  },

  telefono: {
    /** Tal como lo proporcionó el restaurante */
    marcar: '+523826908583',
    mostrar: '382 690 8583',
  },

  /**
   * WhatsApp. `wa.me` exige el número con lada de país y sin signos ni espacios:
   * 52 + 3319116034. El mensaje va precargado en el chat para que el comensal
   * no tenga que escribir nada.
   *
   * Si algún día se cae la línea, se pone en `null` y el botón desaparece solo,
   * en lugar de quedar un enlace que no contesta.
   */
  whatsapp: {
    numero: '523319116034',
    mostrar: '33 1911 6034',
    mensaje: 'Hola, quiero hacer una reservación en Caché.',
  } as { numero: string; mostrar: string; mensaje: string } | null,

  instagram: {
    usuario: 'cache.restaurante',
    url: 'https://www.instagram.com/cache.restaurante/',
  },

  /** Búsqueda en Google Maps por nombre y dirección: abre la app en el celular. */
  mapa: 'https://www.google.com/maps/search/?api=1&query=Cach%C3%A9%20Restaurante%2C%20Manuel%20Acu%C3%B1a%201849%2C%20Ladr%C3%B3n%20de%20Guevara%2C%2044600%20Guadalajara%2C%20Jal.',
} as const;

export const direccionUnaLinea = [
  negocio.direccion.calle,
  negocio.direccion.colonia,
  `${negocio.direccion.cp} ${negocio.direccion.ciudad}`,
  negocio.direccion.estado,
].join(', ');
