/**
 * La referencia del correo: `?e=`, en /empresas, /regalos y sus términos.
 *
 * Cada correo lleva su liga, `/empresas?e=mutuo`. El valor viaja al final
 * del mensaje de WhatsApp —«(Ref: mutuo)»—, así que Caché sabe de qué correo
 * viene el contacto aunque no haya analítica. Sólo se acepta
 * `[a-z0-9-]{2,40}`: cualquier otra cosa se ignora, como si no hubiera
 * parámetro, para que nadie meta texto arbitrario al mensaje ni a PostHog
 * desde la barra de direcciones.
 *
 * No se guarda en ningún lado. Para que no se pierda al pasar a los términos,
 * de /empresas a /regalos o de regreso, las ligas marcadas con
 * `data-conserva-ref` lo llevan consigo.
 */
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
