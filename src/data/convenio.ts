/**
 * Convenio Caché para Empresas — fuente única de contenido.
 *
 * Lo usan: /empresas, /empresas/terminos y la franja del inicio.
 * Para dar de alta una empresa aliada o cambiar una regla, sólo se edita este archivo.
 *
 * Versión 1 · 16 de octubre de 2026.
 */

export type EmpresaAliada = {
  /** Identificador corto. Es también el valor de ?e= en las ligas de correo (ej. "mutuo"). */
  slug: string;
  nombre: string;
  /** Ruta dentro de /public/aliados/. Sólo con autorización por escrito de la empresa. */
  logo?: string;
  /** true sólo si la empresa autorizó por escrito mostrar su logo. */
  autorizaLogo: boolean;
  /** false = registrada, pero no aparece en la página. */
  visible: boolean;
  /** Fecha de registro, AAAA-MM-DD. */
  desde: string;
  /** Fecha de vencimiento, AAAA-MM-DD. */
  vence: string;
};

export const contacto = {
  whatsapp: '523319116034',
  whatsappVisible: '33 1911 6034',
  telefono: '+523826908583',
  telefonoVisible: '382 690 8583',
  direccion: 'Manuel Acuña 1849, Ladrón de Guevara, 44600, Guadalajara, Jalisco',
  horario: 'Todos los días de 8:00 am a 6:00 pm',
};

export const vigencia = {
  fin: '2026-11-30',
  texto: 'Vigente hasta el 30 de noviembre de 2026, con renovación sencilla.',
};

/** La sección de empresas aliadas se muestra a partir de este número de empresas visibles. */
export const MIN_ALIADOS_VISIBLES = 5;

/** Liga de WhatsApp con mensaje listo. `ref` es el valor de ?e= cuando la visita viene de un correo. */
export function ligaWhatsApp(ref?: string): string {
  const base = 'Hola, quiero registrar mi empresa en el Convenio Caché para Empresas.';
  const texto = ref ? `${base} (Ref: ${ref})` : base;
  return `https://wa.me/${contacto.whatsapp}?text=${encodeURIComponent(texto)}`;
}

export const seo = {
  titulo: 'Convenio para empresas · Caché Restaurante',
  descripcion:
    '10% para colaboradores de empresas registradas, de lunes a sábado, en Caché, cocina mexicana en Ladrón de Guevara, Guadalajara. Sin costo para la empresa.',
};

export const hero = {
  // Alternativa con la voz del sitio: «Que su equipo coma de caché».
  titulo: 'Su equipo también es familia',
  bajada:
    '10% para sus colaboradores de lunes a sábado y un postre de la casa cuando vienen 4 o más. Sin costo ni firma para la empresa.',
  cta: 'Registrar mi empresa por WhatsApp',
  secundaria: 'Leer los términos',
};

/** Única línea que toca la historia de origen. Confirmar con la dueña antes de publicar. */
export const intro =
  'Caché nació en familia y creció gracias a quienes creyeron en el proyecto. Con este convenio abrimos la mesa a los equipos que trabajan cerca.';

/** Es una secuencia real: se puede numerar. */
export const pasos = [
  {
    titulo: 'Registre su empresa',
    texto:
      'Escríbanos por WhatsApp con el nombre de la empresa y una persona de contacto. Le confirmamos el registro en un día hábil.',
  },
  {
    titulo: 'Presente su credencial',
    texto: 'Gafete o credencial de la empresa con fotografía, física o en su celular.',
  },
  {
    titulo: 'Reciba su 10%',
    texto: 'Sobre su consumo, de lunes a sábado, en el restaurante.',
  },
];

export const beneficios = [
  {
    titulo: '10% sobre su consumo',
    texto: 'Para cada colaborador que presente su credencial, de lunes a sábado.',
  },
  {
    titulo: 'Postre para la mesa',
    texto:
      'En mesas de 4 o más con al menos un colaborador registrado: flan de elote o pastel de chocolate, sujeto a disponibilidad.',
  },
  {
    titulo: 'Mesa para su equipo',
    texto:
      'Desayunos de trabajo, juntas o cumpleaños de oficina. Avísenos con un día de anticipación.',
  },
];

export const aliadosTexto = {
  titulo: 'Empresas aliadas',
  vacioTitulo: 'Sea de las primeras empresas aliadas',
  vacioTexto: 'Las empresas que se registren aparecerán aquí, con su autorización.',
};

/** Versión corta para la página. El detalle completo vive en /empresas/terminos. */
export const reglas = [
  'El 10% aplica sólo a colaboradores de empresas registradas, sobre su propio consumo.',
  'Credencial con fotografía y nombre de la empresa. La foto debe coincidir con quien la presenta.',
  'De lunes a sábado y sólo en consumo dentro del restaurante. No aplica para llevar ni a domicilio.',
  'No se combina con otras promociones, cortesías ni descuentos.',
  'Vigente hasta el 30 de noviembre de 2026, con renovación sencilla.',
];

export const preguntas = [
  {
    pregunta: '¿Tiene algún costo para la empresa?',
    respuesta: 'No. El convenio no tiene costo ni requiere firma.',
  },
  {
    pregunta: '¿Cómo registro a mi empresa?',
    respuesta:
      'Escríbanos por WhatsApp al 33 1911 6034 con el nombre de la empresa, la dirección y una persona de contacto. Le confirmamos el registro en un día hábil.',
  },
  {
    pregunta: '¿Mis acompañantes también tienen descuento?',
    respuesta:
      'El 10% es para quien presenta su credencial. Si en la mesa hay varios colaboradores con credencial, cada uno lo recibe sobre su propio consumo.',
  },
  {
    pregunta: '¿Sirve mi credencial digital?',
    respuesta:
      'Sí, si tiene su fotografía y el nombre de la empresa, y la muestra en su propio celular.',
  },
  {
    pregunta: '¿Aplica en pedidos para llevar?',
    respuesta: 'No. El convenio es para consumo dentro del restaurante.',
  },
  {
    pregunta: '¿Qué pasa el 30 de noviembre?',
    respuesta:
      'Antes de esa fecha lo contactamos para renovar. Si prefiere dejarlo acordado desde el registro, lo platicamos al confirmarlo.',
  },
  {
    pregunta: '¿Puedo apartar mesa para mi equipo?',
    respuesta:
      'Sí. Escríbanos con un día de anticipación con el número de personas y la hora.',
  },
];

export const cierre = {
  titulo: 'Su mesa está a unos minutos',
  cta: 'Registrar mi empresa por WhatsApp',
};

export const franjaInicio = {
  titulo: 'Caché para empresas',
  texto: '¿Su oficina está cerca? Su equipo tiene 10% de lunes a sábado.',
  cta: 'Conocer el convenio',
  href: '/empresas',
};

/**
 * Empresas aliadas. Se agregan aquí al confirmar su registro.
 * Ejemplo (no publicar):
 * { slug: 'mutuo', nombre: 'Mutuo Hidalgo', logo: '/aliados/mutuo.svg', autorizaLogo: true,
 *   visible: true, desde: '2026-10-19', vence: '2026-11-30' },
 */
export const aliados: EmpresaAliada[] = [];
