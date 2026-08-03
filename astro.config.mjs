// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Dominio final del menú. Sólo afecta la URL canónica y la imagen para redes.
  site: 'https://cache.soyshua.dev',
  vite: {
    plugins: [tailwindcss()],
  },
});
