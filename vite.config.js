// vite.config.js
import { defineConfig } from 'vite';
import purgecss from 'vite-plugin-purgecss';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist' // output outside of /src
  },
  disableSourceMap: false,
  sourceMap: true,
  plugins: [
    purgecss({
      content: ['./src/**/*.{js,ts,jsx,tsx,html}'], // Specify files to scan for used classes
    }),
  ],
})
