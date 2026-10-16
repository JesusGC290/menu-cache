/**
 * Un regalo de caché — certificados de regalo para empresas.
 *
 * Lo usan: /regalos, /regalos/terminos y las ligas cruzadas desde /empresas y el inicio.
 * Para cambiar un precio, un platillo o una condición, sólo se edita este archivo.
 * Precios tomados de Nei Digital el 16 de octubre de 2026.
 *
 * Versión 1 · 16 de octubre de 2026.
 */

import { contacto } from './convenio';

export { contacto };

export type Tiempo = {
  nombre: string;
  /** Lo que recibe cada persona. */
  detalle: string;
};

export type Paquete = {
  id: 'desayuno' | 'comida';
  nombre: string;
  personas: number;
  /** Precio de lista publicado, sin signo de pesos. */
  precio: string;
  /** Valor máximo en carta de lo incluido, para mostrar como referencia. */
  valorCarta: string;
  tiempos: Tiempo[];
  nota: string;
};

/** Precios por volumen: NO se publican. Se cotizan por WhatsApp. */
export const paquetes: Paquete[] = [
  {
    id: 'comida',
    nombre: 'Comida para 2',
    personas: 2,
    precio: '890',
    valorCarta: '984',
    tiempos: [
      { nombre: 'Entrada', detalle: 'Sopa de tortilla' },
      { nombre: 'Plato fuerte', detalle: 'Chamorro al horno o enchiladas suizas' },
      { nombre: 'Postre', detalle: 'Flan de elote o pastel de chocolate' },
      { nombre: 'Bebida', detalle: 'Agua fresca del día o refresco' },
    ],
    nota: 'Comida a tres tiempos para dos personas, con una bebida sin alcohol cada una.',
  },
  {
    id: 'desayuno',
    nombre: 'Desayuno para 2',
    personas: 2,
    precio: '590',
    valorCarta: '702',
    tiempos: [
      { nombre: 'Para abrir', detalle: 'Pan dulce de la casa' },
      {
        nombre: 'Plato fuerte',
        detalle: 'Huevos Caché, chilaquiles con huevo o pollo, o birriaquiles gratinados',
      },
      { nombre: 'Café', detalle: 'Americano con refill o café de olla' },
      { nombre: 'Jugo', detalle: 'Naranja natural' },
    ],
    nota: 'Desayuno completo para dos personas.',
  },
];

export const condiciones = {
  vigenciaDias: 90,
  anticipacionReservaHoras: 24,
  aplicaDomingo: true,
};

/** Liga de WhatsApp con mensaje listo. `ref` es el valor de ?e= cuando la visita viene de un correo. */
export function ligaWhatsAppRegalos(ref?: string): string {
  const base = 'Hola, quiero cotizar certificados de regalo de Caché para mi empresa.';
  const texto = ref ? `${base} (Ref: ${ref})` : base;
  return `https://wa.me/${contacto.whatsapp}?text=${encodeURIComponent(texto)}`;
}

export const seo = {
  titulo: 'Un regalo de caché · Certificados para empresas · Caché Restaurante',
  descripcion:
    'Desayuno o comida para dos en Caché, para regalar a sus clientes o a su equipo. Certificados con folio para agencias, inmobiliarias y empresas en Guadalajara.',
};

export const hero = {
  titulo: 'Un regalo de caché',
  bajada:
    'Cuando su cliente cierra una compra importante, el regalo también tiene que estar a la altura. Desayuno o comida para dos, con la mesa lista a nombre de su empresa.',
  cta: 'Cotizar para mi empresa',
};

export const paraQuien =
  'Para agencias de autos, inmobiliarias, aseguradoras y cualquier empresa que quiera agradecer una compra o reconocer a su equipo.';

/** Es una secuencia real: se puede numerar. */
export const pasos = [
  {
    titulo: 'Su empresa compra los certificados',
    texto: 'Por WhatsApp, sin mínimo de compra. Precio especial por volumen.',
  },
  {
    titulo: 'Le entregamos los certificados',
    texto: 'Cada uno con folio único, listo para entregar a su cliente en digital o impreso.',
  },
  {
    titulo: 'Su cliente reserva',
    texto: 'Por WhatsApp, con su folio y al menos un día de anticipación. Cualquier día de la semana.',
  },
  {
    titulo: 'Lo recibimos como se merece',
    texto: 'Mesa preparada y una tarjeta que le recuerda quién le hizo el regalo.',
  },
];

export const experiencia = {
  titulo: 'Lo que vive su cliente',
  texto:
    'Una mesa lista a su nombre, una tarjeta con el nombre de su empresa y los murales de Caché alrededor. Su cliente no recibe un vale: recibe una mañana o una tarde que va a contar.',
};

export const preguntas = [
  {
    pregunta: '¿Hay un mínimo de compra?',
    respuesta: 'No. Puede comprar desde un certificado. A partir de 10 le cotizamos un precio especial.',
  },
  {
    pregunta: '¿Cómo se paga?',
    respuesta: 'Por transferencia, antes de entregar los certificados. Si necesita factura, la emitimos.',
  },
  {
    pregunta: '¿Cuánto tiempo tiene su cliente para usarlo?',
    respuesta: '90 días a partir de la fecha de emisión, impresa en el certificado.',
  },
  {
    pregunta: '¿Qué pasa si llegan más personas?',
    respuesta:
      'El certificado cubre a dos personas. Quien se sume, y cualquier consumo adicional, se cobra a precio de carta.',
  },
  {
    pregunta: '¿Incluye bebidas con alcohol o la propina?',
    respuesta: 'No. Las bebidas con alcohol se cobran aparte y la propina queda a criterio de los comensales.',
  },
  {
    pregunta: '¿Podemos poner el logo de nuestra empresa?',
    respuesta: 'Sí. Con su autorización, la tarjeta de la mesa y el certificado llevan su nombre y logo.',
  },
];

export const cierre = {
  titulo: 'Cuéntenos cuántos certificados necesita',
  cta: 'Cotizar para mi empresa',
};

/** Texto para la liga cruzada desde /empresas. */
export const ligaDesdeEmpresas = {
  texto: '¿Quiere regalar Caché a sus clientes?',
  cta: 'Ver certificados de regalo',
  href: '/regalos',
};

/** Texto para el inicio (puede compartir franja con la del convenio). */
export const franjaInicio = {
  titulo: 'Un regalo de caché',
  texto: 'Desayuno o comida para dos, para regalar a sus clientes o a su equipo.',
  cta: 'Conocer los certificados',
  href: '/regalos',
};
