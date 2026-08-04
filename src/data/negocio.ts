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
    calle: 'Manuel Acuña 1846',
    colonia: 'Ladrón de Guevara',
    cp: '44600',
    ciudad: 'Guadalajara',
    estado: 'Jalisco',
    pais: 'MX',
  },

  /** Todos los días, 8:00 a 22:00 */
  horario: {
    texto: 'Todos los días de 8:00 am a 10:00 pm',
    textoCorto: 'Todos los días · 8 am – 10 pm',
    abre: '08:00',
    cierra: '22:00',
    /** Formato de schema.org para los datos estructurados */
    dias: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  },

  telefono: {
    /** Tal como lo proporcionó el restaurante */
    marcar: '+523826908583',
    mostrar: '382 690 8583',
  },

  /** Aún no existe la línea de WhatsApp: mientras sea null, no se dibuja el botón. */
  whatsapp: null as null | { numero: string; mensaje: string },

  instagram: {
    usuario: 'cache.restaurante',
    url: 'https://www.instagram.com/cache.restaurante/',
  },

  /** Búsqueda en Google Maps por nombre y dirección: abre la app en el celular. */
  mapa: 'https://www.google.com/maps/search/?api=1&query=Cach%C3%A9%20Restaurante%2C%20Manuel%20Acu%C3%B1a%201846%2C%20Ladr%C3%B3n%20de%20Guevara%2C%2044600%20Guadalajara%2C%20Jal.',
} as const;

export const direccionUnaLinea = [
  negocio.direccion.calle,
  negocio.direccion.colonia,
  `${negocio.direccion.cp} ${negocio.direccion.ciudad}`,
  negocio.direccion.estado,
].join(', ');
