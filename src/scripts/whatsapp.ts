/**
 * Los botones de WhatsApp de /empresas y /regalos.
 *
 * Basta importarlo: `BotonWhatsapp.astro` lo hace, y Astro incluye el script
 * una sola vez aunque la página tenga varios botones.
 *
 * Cada botón dice de qué programa es (`data-whatsapp`) y dónde está
 * (`data-boton`). Si la visita trae `?e=`, se le agrega la referencia al
 * mensaje; al tocarlo se manda `<programa>_whatsapp` a PostHog.
 */
import { ligaWhatsApp } from '../data/convenio';
import { ligaWhatsAppRegalos } from '../data/regalos';
import { analitica } from './analitica';
import { ref, refEvento } from './referencia';

/** El nombre del programa es también el prefijo de sus eventos. */
const ligas = {
  convenio: ligaWhatsApp,
  regalos: ligaWhatsAppRegalos,
};

export type Programa = keyof typeof ligas;

document.querySelectorAll<HTMLAnchorElement>('a[data-whatsapp]').forEach((boton) => {
  const programa = boton.dataset.whatsapp as Programa;

  if (ref) boton.href = ligas[programa](ref);

  // `send_instantly`: en el celular, wa.me manda la página a segundo plano
  // al abrir la app, y un evento que espera el siguiente lote se puede perder.
  boton.addEventListener('click', () => {
    analitica().then((ph) =>
      ph?.capture(
        `${programa}_whatsapp`,
        { ref: refEvento, boton: boton.dataset.boton },
        { send_instantly: true },
      ),
    );
  });
});
