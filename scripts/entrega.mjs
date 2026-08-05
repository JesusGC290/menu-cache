/**
 * Arma el paquete de entrega para la empresa que montará el sitio en producción.
 *
 * Qué se entrega y qué no:
 *   · SÍ  /carta-impresa  — la muestra plana del pliego, para compartir por enlace
 *   · NO  /impresion/*    — las páginas que generan el PDF de imprenta
 *
 * Las páginas de producción son hojas del árbol: nadie las importa. El componente
 * y el CSS del pliego SÍ se quedan, porque los usa la muestra. Aun así el script
 * no lo da por hecho: compila sin esas páginas y verifica el resultado.
 *
 * Produce dos archivos en `entrega/`:
 *   · cache-restaurante-codigo.zip  el proyecto, para que ellos lo compilen
 *   · cache-restaurante-sitio.zip   ya compilado, si sólo lo van a subir tal cual
 *
 * Uso:
 *   node scripts/entrega.mjs
 *   SITE_URL=https://cacherestaurante.com node scripts/entrega.mjs
 */

import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const raiz = process.cwd();
const SALIDA = join(raiz, 'entrega');
const STAGING = join(SALIDA, 'cache-restaurante');
const PAGINAS_IMPRENTA = join(raiz, 'src/pages/impresion');
const APARTADO = join(raiz, '.impresion-apartada');

/** Rutas que NO van en el ZIP de código. */
const EXCLUIR = [
  'src/pages/impresion/', // las páginas que generan el PDF: no se entregan
  '.github/', // CI apuntando a nuestra cuenta de Cloudflare
  '.claude/', // configuración local del editor
  'scripts/', // este script y la plantilla del LEEME
  'README.md', // se reemplaza por LEEME.md (documenta también la imprenta)
  'cache_logo.png', // original suelto: el que usa el build está en src/assets
  'cache-logo-h.jpeg',
];

const sh = (cmd, args, opts = {}) =>
  execFileSync(cmd, args, { cwd: raiz, encoding: 'utf8', ...opts });

const paso = (t) => console.log(`\n▸ ${t}`);
const ok = (t) => console.log(`  ✓ ${t}`);
const mal = (t) => {
  console.error(`  ✗ ${t}`);
  process.exitCode = 1;
};

// ─────────────────────────────────────────────────────────────────────────
paso('Revisando el repositorio');

const sucio = sh('git', ['status', '--porcelain']).trim();
if (sucio) {
  console.log('  ! Hay cambios sin commitear. Se empaqueta el estado actual del disco:');
  for (const l of sucio.split('\n')) console.log(`      ${l}`);
} else {
  ok('sin cambios pendientes');
}

const sitio = process.env.SITE_URL ?? null;
console.log(`  · SITE_URL: ${sitio ?? '(no definido, se usará el valor por omisión)'}`);

// ─────────────────────────────────────────────────────────────────────────
paso('Compilando SIN las páginas de imprenta (así lo recibirán ellos)');

rmSync(SALIDA, { recursive: true, force: true });
rmSync(APARTADO, { recursive: true, force: true });

let apartado = false;
try {
  if (existsSync(PAGINAS_IMPRENTA)) {
    cpSync(PAGINAS_IMPRENTA, APARTADO, { recursive: true });
    rmSync(PAGINAS_IMPRENTA, { recursive: true, force: true });
    apartado = true;
    ok('páginas de imprenta apartadas temporalmente');
  }

  rmSync(join(raiz, 'dist'), { recursive: true, force: true });
  sh('npm', ['run', 'build'], {
    stdio: ['ignore', 'ignore', 'inherit'],
    env: { ...process.env, ...(sitio ? { SITE_URL: sitio } : {}) },
  });
  ok('build terminado');
} finally {
  // Se restauran siempre, incluso si el build falla
  if (apartado) {
    cpSync(APARTADO, PAGINAS_IMPRENTA, { recursive: true });
    rmSync(APARTADO, { recursive: true, force: true });
    ok('páginas de imprenta restauradas en el repositorio');
  }
}

// ─────────────────────────────────────────────────────────────────────────
paso('Verificando lo compilado');

const esperadas = ['index.html', 'carta/index.html', 'carta-impresa/index.html'];
for (const p of esperadas) {
  existsSync(join(raiz, 'dist', p)) ? ok(`/${p.replace('/index.html', '')}`) : mal(`falta /${p}`);
}
existsSync(join(raiz, 'dist/impresion'))
  ? mal('/impresion sigue en el build y no debería')
  : ok('/impresion ausente, como se quiere');

// La muestra debe traer la carta completa
const muestra = readFileSync(join(raiz, 'dist/carta-impresa/index.html'), 'utf8');
const carta = readFileSync(join(raiz, 'dist/carta/index.html'), 'utf8');
const cuenta = (s, re) => (s.match(re) ?? []).length;
const nMuestra = cuenta(muestra, /class="producto"/g);
const nCarta = cuenta(carta, /guia-puntos/g);

nMuestra === nCarta && nMuestra > 0
  ? ok(`${nMuestra} productos, iguales en /carta y /carta-impresa`)
  : mal(`descuadre de productos: /carta ${nCarta}, /carta-impresa ${nMuestra}`);

cuenta(muestra, /class="aviso"/g) === 0
  ? ok('la muestra no trae el letrero de producción')
  : mal('la muestra trae el letrero de producción');

cuenta(muestra, /<button|<a /g) === 0
  ? ok('la muestra no trae botones ni enlaces')
  : mal('la muestra trae botones o enlaces');

if (process.exitCode === 1) {
  console.error('\nLa verificación falló: no se genera el ZIP.');
  process.exit(1);
}

// ─────────────────────────────────────────────────────────────────────────
paso('Armando el paquete de código');

// git ls-files respeta .gitignore, así que no arrastra node_modules ni dist
const rastreados = sh('git', ['ls-files']).trim().split('\n').filter(Boolean);
const incluidos = rastreados.filter((f) => !EXCLUIR.some((x) => f === x || f.startsWith(x)));
const omitidos = rastreados.length - incluidos.length;

mkdirSync(STAGING, { recursive: true });
for (const f of incluidos) {
  const destino = join(STAGING, f);
  mkdirSync(dirname(destino), { recursive: true });
  cpSync(join(raiz, f), destino);
}

// El LEEME de entrega sustituye al README (que documenta también la imprenta)
cpSync(join(raiz, 'scripts/LEEME.md'), join(STAGING, 'LEEME.md'));
ok(`${incluidos.length} archivos incluidos, ${omitidos} omitidos`);

for (const x of EXCLUIR) console.log(`      omitido: ${x}`);

// ─────────────────────────────────────────────────────────────────────────
paso('Comprimiendo');

const zip = (nombre, cwd, que) => {
  sh('zip', ['-qr', join(SALIDA, nombre), que, '-x', '.DS_Store'], { cwd });
  const kb = Math.round(readFileSync(join(SALIDA, nombre)).length / 1024);
  ok(`${nombre} · ${kb} KB`);
};

zip('cache-restaurante-codigo.zip', SALIDA, 'cache-restaurante');
zip('cache-restaurante-sitio.zip', raiz, 'dist');

rmSync(STAGING, { recursive: true, force: true });

// ─────────────────────────────────────────────────────────────────────────
console.log(`
Listo. En entrega/:

  cache-restaurante-codigo.zip   el proyecto, para que ellos lo compilen
  cache-restaurante-sitio.zip    ya compilado, si sólo lo van a subir tal cual

Recordatorio: al compilar hay que pasarles el dominio final, o las URLs
canónicas y la imagen de WhatsApp apuntarán al dominio de pruebas:

  SITE_URL=https://EL-DOMINIO-FINAL npm run build
`);
