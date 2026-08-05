/**
 * Exporta la carta completa desde `src/data/menu.ts` a formatos legibles y
 * cargables, para actualizar el menú del punto de venta.
 *
 * La fuente única sigue siendo menu.ts: estos archivos se REGENERAN, no se
 * editan a mano. Si se corrigen aquí, el siguiente `npm run exportar` los
 * sobrescribe y la corrección se pierde.
 *
 * Genera en `exportacion/`:
 *   carta.md    — para leer y capturar a mano, categoría por categoría
 *   carta.csv   — para importar o abrir en Excel, un renglón por producto
 *   carta.json  — para importar por sistema
 *
 * Uso:  npm run exportar
 */

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { menus } from '../src/data/menu.ts';

const SALIDA = join(process.cwd(), 'exportacion');
mkdirSync(SALIDA, { recursive: true });

/** Filas planas: es la forma que espera un punto de venta o una hoja de cálculo. */
const filas = menus.flatMap((menu) =>
  menu.categories.flatMap((categoria) =>
    categoria.products.map((p) => ({
      menu: menu.title,
      categoria: categoria.title,
      // Nota que aplica a TODA la categoría (extras, disponibilidad)
      nota_categoria: categoria.note ?? '',
      producto: p.name,
      gramaje: p.gramaje ?? '',
      descripcion: p.description ?? '',
      // Como se ve en la carta: útil si el punto de venta tiene un solo campo
      descripcion_completa: [p.gramaje, p.description].filter(Boolean).join(' · '),
      precio: p.price ?? '',
      nota_producto: p.note ?? '',
    })),
  ),
);

// ─────────────────────────────────────────────── JSON
const json = {
  generado: 'npm run exportar (no editar a mano)',
  fuente: 'src/data/menu.ts',
  totales: {
    productos: filas.length,
    con_gramaje: filas.filter((f) => f.gramaje).length,
    categorias: menus.reduce((n, m) => n + m.categories.length, 0),
  },
  menus: menus.map((m) => ({
    menu: m.title,
    categorias: m.categories.map((c) => ({
      categoria: c.title,
      nota: c.note ?? null,
      productos: c.products.map((p) => ({
        producto: p.name,
        gramaje: p.gramaje ?? null,
        descripcion: p.description ?? null,
        precio: p.price ? Number(p.price) : null,
        nota: p.note ?? null,
      })),
    })),
  })),
};
writeFileSync(join(SALIDA, 'carta.json'), JSON.stringify(json, null, 2) + '\n');

// ─────────────────────────────────────────────── CSV
const columnas = [
  'menu',
  'categoria',
  'nota_categoria',
  'producto',
  'gramaje',
  'descripcion',
  'descripcion_completa',
  'precio',
  'nota_producto',
];
// Se entrecomilla siempre y se duplican las comillas internas: hay comas y
// acentos en casi todas las descripciones.
const celda = (v) => `"${String(v).replace(/"/g, '""')}"`;
const csv = [
  columnas.join(','),
  ...filas.map((f) => columnas.map((c) => celda(f[c])).join(',')),
].join('\n');
// BOM al inicio: sin él Excel en Windows abre los acentos como basura
writeFileSync(join(SALIDA, 'carta.csv'), '﻿' + csv + '\n');

// ─────────────────────────────────────────────── Markdown
const md = [];
md.push('# Caché Restaurante · Carta completa');
md.push('');
md.push(
  `**${filas.length} productos** en ${json.totales.categorias} categorías · ` +
    `${json.totales.con_gramaje} con gramaje declarado.`,
);
md.push('');
md.push('> Generado con `npm run exportar` desde `src/data/menu.ts`. No editar a mano.');
md.push('');
md.push('Precios en pesos mexicanos, IVA incluido.');

for (const menu of menus) {
  const n = menu.categories.reduce((k, c) => k + c.products.length, 0);
  md.push('', '---', '', `## ${menu.title}`, '', `_${n} productos._`);

  for (const categoria of menu.categories) {
    md.push('', `### ${categoria.title}`);
    if (categoria.note) md.push('', `**Aplica a toda la categoría:** ${categoria.note}`);
    md.push('', '| Producto | Gramaje | Descripción | Precio | Extras |');
    md.push('| --- | --- | --- | ---: | --- |');
    for (const p of categoria.products) {
      const c = (v) => (v ?? '').replace(/\|/g, '\\|');
      md.push(
        `| ${c(p.name)} | ${c(p.gramaje)} | ${c(p.description)} | ${p.price ? '$' + p.price : ''} | ${c(p.note)} |`,
      );
    }
  }
}

/**
 * Lo que aún no declara porción, para cerrar ante PROFECO.
 *
 * Un producto sin `gramaje` propio no necesariamente está pendiente: su
 * categoría puede declararlo por todos, como Enchiladas con «Todas llevan
 * 100 g de proteína». En cambio una nota de EXTRAS —«Con chorizo … 80 g»—
 * declara el añadido, no la porción del platillo. Por eso se separan: contar
 * los 29 sin campo propio mandaría a perseguir datos que ya existen.
 */
const declaraPorcion = (nota) =>
  !!nota && /\d+\s*(g|ml|pza)/i.test(nota) && /\btod[oa]s\b/i.test(nota);

const sinGramaje = filas.filter((f) => !f.gramaje);
const cubiertos = sinGramaje.filter((f) => declaraPorcion(f.nota_categoria));
const pendientes = sinGramaje.filter((f) => !declaraPorcion(f.nota_categoria));

md.push('', '---', '', '## Estado de las porciones');
md.push('');
md.push(`- **${filas.length - sinGramaje.length}** con gramaje propio.`);
md.push(`- **${cubiertos.length}** sin campo propio, pero su categoría lo declara por todos.`);
md.push(`- **${pendientes.length}** sin porción declarada en ningún lado.`);

if (cubiertos.length) {
  md.push('', '### Declarados por su categoría', '');
  md.push('| Producto | Categoría | Lo que declara la categoría |');
  md.push('| --- | --- | --- |');
  for (const f of cubiertos) {
    md.push(`| ${f.producto} | ${f.categoria} | ${f.nota_categoria} |`);
  }
}

if (pendientes.length) {
  md.push('', '### Sin declarar', '');
  md.push('| Producto | Menú | Categoría |');
  md.push('| --- | --- | --- |');
  for (const f of pendientes) {
    md.push(`| ${f.producto} | ${f.menu} | ${f.categoria} |`);
  }
} else {
  md.push('', 'No queda ningún producto sin porción declarada.');
}
md.push('');
writeFileSync(join(SALIDA, 'carta.md'), md.join('\n'));

// ───────────────────────────────────────────────
console.log(`Exportado a exportacion/ desde src/data/menu.ts

  carta.md     para leer y capturar a mano
  carta.csv    para importar o abrir en Excel
  carta.json   para importar por sistema

  ${filas.length} productos
  ${filas.length - sinGramaje.length} con gramaje propio
  ${cubiertos.length} declarados por su categoría
  ${pendientes.length} sin declarar`);
