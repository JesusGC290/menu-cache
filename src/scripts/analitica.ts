/**
 * PostHog, inicializado una sola vez por página.
 *
 * `Analitica.astro` lo arranca en todas las páginas de `Layout.astro`, y una
 * página que necesita mandar un evento propio —/empresas— lo pide aquí mismo
 * en lugar de importar `posthog-js` por su cuenta. Las dos llamadas comparten
 * la misma promesa, así que el evento siempre sale después de `init`, sin
 * importar qué script corra primero. Es la carrera que `Campana.astro` evita
 * metiendo init y evento en el mismo script; aquí se evita con este módulo.
 *
 * Sin `PUBLIC_POSTHOG_KEY` (el caso de `npm run dev`) devuelve `null` y no se
 * descarga ni un byte de posthog: el compilador elimina la importación entera.
 * Por eso quien la use escribe `ph?.capture(...)`.
 */
import type { PostHog } from 'posthog-js';

let cargando: Promise<PostHog | null> | undefined;

export function analitica(): Promise<PostHog | null> {
  cargando ??= iniciar();
  return cargando;
}

async function iniciar(): Promise<PostHog | null> {
  // Vite sustituye esto por el valor literal al compilar. Sin la variable
  // queda `undefined`, el `if` se cae solo y la importación dinámica de
  // posthog-js desaparece del build: ni siquiera se genera su archivo.
  const llave = import.meta.env.PUBLIC_POSTHOG_KEY;

  if (llave) {
    const { default: posthog } = await import('posthog-js');

    posthog.init(llave, {
      api_host: 'https://us.i.posthog.com',
      // Fija el comportamiento por omisión a la fecha de esta instalación, en
      // lugar de heredar el de 2020. Es lo que activa las pageviews modernas,
      // el ignorar rageclicks en contenido, y demás. Al subir de versión
      // posthog-js NO cambia nada de esto solo: mover la fecha es un cambio
      // explícito, que es justo la idea. `Campana.astro` fija la misma fecha.
      defaults: '2026-06-25',
    });

    return posthog;
  }

  return null;
}
