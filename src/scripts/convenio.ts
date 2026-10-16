/**
 * Lo que corre en el navegador en /empresas y /empresas/terminos.
 *
 * Basta importarlo: `BotonWhatsapp.astro` lo hace, así que cualquier página
 * con ese botón queda lista. Astro incluye el script una sola vez aunque haya
 * tres botones.
 *
 * ── La referencia del correo: `?e=` ─────────────────────────────────────
 *
 * Cada correo lleva su liga, `/empresas?e=mutuo`. El valor viaja al final
 * del mensaje de WhatsApp —«(Ref: mutuo)»—, así que Caché sabe de qué correo
 * viene el registro aunque no haya analítica. Sólo se acepta
 * `[a-z0-9-]{2,40}`: cualquier otra cosa se ignora, como si no hubiera
 * parámetro, para que nadie meta texto arbitrario al mensaje ni a PostHog
 * desde la barra de direcciones.
 *
 * No se guarda en ningún lado. Para que no se pierda al pasar a los términos
 * y volver, las ligas marcadas con `data-conserva-ref` lo llevan consigo.
 */
import { ligaWhatsApp } from '../data/convenio';
import { analitica } from './analitica';

const e = new URLSearchParams(location.search).get('e');

export const ref = e && /^[a-z0-9-]{2,40}$/.test(e) ? e : undefined;

/** Valor de `ref` en los eventos: sin liga de correo, la visita es directa. */
export const refEvento = ref ?? 'directo';

if (ref) {
  document.querySelectorAll<HTMLAnchorElement>('a[data-conserva-ref]').forEach((liga) => {
    const url = new URL(liga.href);
    url.searchParams.set('e', ref);
    liga.href = url.href;
  });
}

document.querySelectorAll<HTMLAnchorElement>('a[data-whatsapp-convenio]').forEach((boton) => {
  if (ref) boton.href = ligaWhatsApp(ref);

  // `send_instantly`: en el celular, wa.me manda la página a segundo plano
  // al abrir la app, y un evento que espera el siguiente lote se puede perder.
  boton.addEventListener('click', () => {
    analitica().then((ph) =>
      ph?.capture(
        'convenio_whatsapp',
        { ref: refEvento, boton: boton.dataset.whatsappConvenio },
        { send_instantly: true },
      ),
    );
  });
});
