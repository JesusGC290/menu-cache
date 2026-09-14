/**
 * Carta de bebidas de la Noche Mexicana · 15 de septiembre
 * ═══════════════════════════════════════════════════════════════════════
 *
 * La noche es DESPUÉS del horario del restaurante y la barra trabaja con un
 * listado propio: aguas frescas y mocktails a precio de evento, cazuelas,
 * cantaritos y margaritas que no están en la carta de diario. De aquí sale
 * la media carta impresa `/impresion/noche-mexicana`.
 *
 * ── Por qué esto no vive en `menu.ts` ni en `evento.ts` ─────────────────
 *
 * `menu.ts` es la carta de todos los días, y se exporta al punto de venta
 * con `npm run exportar`: meter aquí una margarita que sólo existe una noche
 * la mandaría a la carta web y al POS. `evento.ts` es la fuente del anuncio
 * —menú de tres tiempos, programa, reservaciones— y lo consumen el modal, la
 * página del evento y los datos estructurados de Google; las bebidas no
 * entran en ninguno de esos tres.
 *
 * ── Lo que NO se retecleó ───────────────────────────────────────────────
 *
 * Cerveza, refrescos, micheladas y digestivos son los mismos de la carta y
 * al mismo precio, así que se leen de `menu.ts` por id. Si mañana sube la
 * Heineken, sube en la carta, en el POS y en esta media carta a la vez. El
 * `!` de la búsqueda es a propósito: si alguien borra o renombra una de esas
 * categorías, el build truena en lugar de imprimir una sección vacía.
 */

import type { Category, Product } from './menu';
import { menus } from './menu';

const bebidas = menus.find((m) => m.id === 'bebidas')!;
const dela = (id: string): Category => bebidas.categories.find((c) => c.id === id)!;

/**
 * Categoría reutilizada de la carta, sin descripciones y sin los productos que
 * esa noche no se venden.
 *
 * En media carta el renglón de ingredientes de una cerveza o un refresco no
 * aporta nada —nadie necesita que le expliquen una Coca— y sí cuesta el alto
 * que ocupan las bebidas que sí hay que explicar. El nombre, el volumen y el
 * precio se quedan; el volumen porque PROFECO obliga a declararlo.
 *
 * `excluir` lleva nombres exactos y **verifica que existan**: quitar una bebida
 * de la noche no puede degradarse en silencio a no quitar nada. Si alguien
 * renombra el producto en `menu.ts`, el build truena y se entera; si sólo se
 * filtrara, la bebida reaparecería en la carta impresa sin que nadie lo note.
 */
const sinDescripcion = (id: string, excluir: string[] = []): Category => {
  const c = dela(id);
  const faltantes = excluir.filter((n) => !c.products.some((p) => p.name === n));
  if (faltantes.length) {
    throw new Error(
      `evento-bebidas: en la categoría «${id}» no existe ${faltantes.join(', ')}. ` +
        'Se renombró o se borró en menu.ts; hay que actualizar la exclusión.',
    );
  }

  return {
    ...c,
    products: c.products
      .filter((p) => !excluir.includes(p.name))
      .map((p) => ({
        name: p.name,
        gramaje: p.gramaje,
        price: p.price,
        note: p.note,
      })),
  };
};

/**
  * Tequila de la casa. Dos formas: la de producto lleva punto porque cae junto
  * a una descripción, y la de categoría no, porque se compone en versalitas
  * con tracking y ahí un punto se lee como mancha.
  */
const tequila = (oz: number) => `Con ${oz} oz de tequila.`;
const tequilaNota = (oz: number) => `Con ${oz} oz de tequila`;

const aguasFrescas: Category = {
  id: 'evento-aguas',
  title: 'Aguas Frescas',
  products: [
    { name: 'Piña con Menta', gramaje: '400 ml', price: '49' },
    { name: 'Jamaica', gramaje: '400 ml', price: '49' },
    { name: 'Limonada', gramaje: '400 ml', price: '49' },
    { name: 'Naranjada', gramaje: '400 ml', price: '49' },
  ],
};

/**
 * Los dos mocktails de la noche van los dos a 350 ml, confirmado por el
 * restaurante. Es un volumen de evento y NO coincide con la carta de diario,
 * donde el Maracuyá Muck se sirve en 300 ml: por eso se teclean aquí en vez de
 * leerse de `menu.ts`.
 */
const mocktails: Category = {
  id: 'evento-mocktails',
  title: 'Mocktails',
  note: 'Sin alcohol',
  products: [
    {
      name: 'Frutos Rojos',
      gramaje: '350 ml',
      description: 'Frutos rojos, jarabe, limón, arándano y ginger ale.',
      price: '79',
    },
    {
      name: 'Maracuyá',
      gramaje: '350 ml',
      description: 'Pulpa de maracuyá, jarabe, limón y piña.',
      price: '79',
    },
  ],
};

const cazuelas: Category = {
  id: 'evento-cazuelas',
  title: 'Cazuelas y Cantaritos',
  products: [
    {
      name: 'Cazuela sin Alcohol',
      gramaje: '500 ml',
      description: 'Squirt, naranja, lima, toronja, limón y sal.',
      price: '89',
    },
    {
      name: 'Cazuela con Alcohol',
      gramaje: '500 ml',
      note: tequila(3),
      price: '199',
    },
    {
      name: 'Cantarito',
      description: 'Naranja, lima, toronja, limón y sal, en barro.',
      note: tequila(2),
      price: '120',
    },
  ],
};

const margaritas: Category = {
  id: 'evento-margaritas',
  title: 'Margaritas',
  note: tequilaNota(2),
  products: [
    { name: 'Jamaica', price: '120' },
    { name: 'Fresa', price: '120' },
    { name: 'Clásica', price: '120' },
  ],
};

/**
 * El tequila de la noche.
 *
 * La marca va en la nota de la categoría y no en el nombre de cada producto:
 * en una columna de 2.2 in «Tradición Azul Blanco · Botella» se parte en dos
 * renglones, y repetirla en los dos productos gasta el ancho que necesita la
 * guía de puntos. Si algún día entra un segundo tequila, la marca se baja al
 * nombre y la nota se quita.
 */
const tequilaCasa: Category = {
  id: 'evento-tequila',
  title: 'Tequila',
  note: 'Tradición Azul Blanco',
  products: [
    { name: 'Botella', note: 'Incluye 4 refrescos.', price: '990' },
    { name: 'Copa', price: '90' },
  ],
};

/**
 * ── El reparto de columnas es a mano, no balanceado ─────────────────────
 *
 * Igual que en la hoja 1 del pliego grande: cada categoría vive entera en
 * una columna, nunca se parte ni deja un título huérfano al pie. En media
 * carta importa más que en doble carta, porque una columna mide 2.3 in y un
 * encabezado suelto se nota de inmediato.
 *
 * Izquierda, lo que la barra prepara en vaso más los refrescos; derecha, lo
 * que se sirve de botella. **Las micheladas van con la cerveza, no con los
 * mocktails**: una michelada es una cerveza, y quien la busca la busca ahí.
 * De paso empareja las columnas —5.9 in contra 5.4 in de las 6.1 disponibles—,
 * que con las micheladas del otro lado quedaban a 5.3 y 5.9.
 */
export const columnasBebidasEvento: Category[][] = [
  // El Squirt sale de la carta de la noche: esa botella se va en las cazuelas y
  // los cantaritos, y venderlo suelto se come el insumo de lo que más deja.
  // Sigue en la carta de diario y en el punto de venta; esta exclusión es sólo
  // del evento.
  [aguasFrescas, mocktails, margaritas, cazuelas, sinDescripcion('refrescos', ['Squirt'])],
  [tequilaCasa, dela('cerveza'), sinDescripcion('micheladas'), dela('digestivos')],
];

export const bebidasEvento: Category[] = columnasBebidasEvento.flat();

export const totalBebidasEvento: number = bebidasEvento.reduce(
  (n, c) => n + c.products.length,
  0,
);

export type { Category, Product };
