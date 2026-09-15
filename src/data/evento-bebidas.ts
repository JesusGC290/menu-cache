/**
 * Carta de bebidas de la Noche Mexicana · 15 de septiembre
 * ═══════════════════════════════════════════════════════════════════════
 *
 * La noche es DESPUÉS del horario del restaurante y la barra trabaja con un
 * listado propio: aguas frescas y mocktails a precio de evento, margaritas y
 * una jarra de clericot que no están en la carta de diario. De aquí sale
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
 * Productos sueltos de una categoría de la carta, en el orden que se piden.
 *
 * Igual que `sinDescripcion`, **verifica que existan**: si alguien renombra el
 * Clericot en `menu.ts`, el build truena en vez de imprimir la categoría con un
 * hueco. Sirve para las categorías del evento que mezclan bebidas de la carta
 * con bebidas que sólo existen esa noche.
 */
const productos = (id: string, nombres: string[]): Product[] =>
  nombres.map((n) => {
    const p = dela(id).products.find((x) => x.name === n);
    if (!p) {
      throw new Error(
        `evento-bebidas: en la categoría «${id}» no existe «${n}». ` +
          'Se renombró o se borró en menu.ts.',
      );
    }
    return p;
  });

/**
 * Tequila de las margaritas. Sin punto final: la nota de categoría se compone
 * en versalitas con tracking, y ahí un punto se lee como mancha.
 */
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
 *
 * **La cazuela vive aquí y no en su propia categoría.** Al quitarse la versión
 * con tequila y el cantarito quedaba sola, y un encabezado centrado para un
 * solo renglón se lee como que falta contenido. No se le llama mocktail —por
 * eso el título dice «y Cazuela»—, pero comparte lo único que importa
 * anunciar: que no lleva alcohol, que es justo lo que un comensal NO espera de
 * una cazuela.
 */
const mocktails: Category = {
  id: 'evento-mocktails',
  title: 'Mocktails y Cazuela',
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
    {
      name: 'Cazuela',
      gramaje: '500 ml',
      description: 'Squirt, naranja, lima, toronja, limón y sal.',
      price: '89',
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
 * Vinos y cócteles de vino.
 *
 * Los tres cócteles son los mismos de la carta y al mismo precio, así que se
 * leen de `menu.ts`: sólo se teclean la jarra y la botella, que no existen en
 * la carta de diario. Las Mimosas de esa categoría se quedan fuera, no entran
 * en la noche.
 *
 * La botella es el mismo vino que la copa de la carta (La Cetto Cabernet
 * Sauvignon), por eso repite esa descripción en vez de inventarle una.
 */
const vinos: Category = {
  id: 'evento-vinos',
  title: 'Vinos y Clericot',
  products: [
    ...productos('cocteles-vino', ['Clericot']),
    { name: 'Jarra de Clericot', price: '390' },
    ...productos('cocteles-vino', ['Sangría', 'Tinto de Verano']),
    {
      name: 'Botella de Vino de la Casa',
      description: 'La Cetto, Cabernet Sauvignon.',
      price: '350',
    },
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
 * Izquierda, lo que la barra prepara: aguas, mocktails, cócteles y los
 * digestivos, que se montan con espresso. Derecha, lo que sale de botella o
 * lata. **Las micheladas van con la cerveza, no con los mocktails**: una
 * michelada es una cerveza, y quien la busca la busca ahí.
 *
 * Los digestivos cambiaron de columna al entrar los vinos: con ellos a la
 * derecha esa columna se pasaba 0.40 in de la hoja mientras a la izquierda le
 * sobraban 1.32. Así cierran en 5.57 y 5.85 in de las 6.17 disponibles.
 */
export const columnasBebidasEvento: Category[][] = [
  [aguasFrescas, mocktails, margaritas, vinos, dela('digestivos')],
  // El Squirt sale de la carta de la noche: esa botella se va en las cazuelas,
  // y venderlo suelto se come el insumo. Sigue en la carta de diario y en el
  // punto de venta; esta exclusión es sólo del evento.
  [
    dela('cerveza'),
    sinDescripcion('micheladas'),
    sinDescripcion('refrescos', ['Squirt']),
  ],
];

export const bebidasEvento: Category[] = columnasBebidasEvento.flat();

export const totalBebidasEvento: number = bebidasEvento.reduce(
  (n, c) => n + c.products.length,
  0,
);

export type { Category, Product };
