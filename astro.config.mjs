// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Dominio del sitio. Afecta la URL canónica, la imagen para redes sociales y
  // los datos estructurados de Google. Se cambia con la variable de entorno
  // SITE_URL al compilar, sin tocar código:
  //   SITE_URL=https://cacherestaurante.com npm run build
  site: process.env.SITE_URL ?? 'https://cacherestaurante.com',
  // La carta pasó de /carta a la raíz. Se deja el redirect por si algún
  // enlace o QR viejo apunta a la ruta anterior.
  redirects: {
    '/carta': '/',
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
