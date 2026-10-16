/**
 * Clases que comparten /empresas y /regalos, para no copiarlas en cada página.
 * Tailwind las encuentra aquí igual que en un `.astro`.
 */

export const foco =
  'focus-visible:outline-acento focus-visible:outline-2 focus-visible:outline-offset-4';

/** Título de sección: Cormorant en oro, centrado, sin etiqueta encima. */
export const titulo =
  'font-display text-oro-degradado text-center text-[1.75rem] leading-tight font-medium text-balance sm:text-[2rem]';

export const botonLinea = `border-acento/45 text-acento hover:bg-acento/10 hover:border-acento/75 inline-flex items-center justify-center rounded-full border px-6 py-3 text-[0.76rem] tracking-[0.12em] uppercase transition-colors duration-200 ${foco}`;

export const ligaTexto = `text-acento hover:text-acento-alto decoration-acento/50 underline decoration-1 underline-offset-4 transition-colors ${foco} focus-visible:outline-offset-2 rounded-sm`;
