const sveltePreprocess = require('svelte-preprocess');
const vercel = require('@sveltejs/adapter-vercel');
const pkg = require('./package.json');
const autoprefixer = require('autoprefixer');
const path = require('path');

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
  // an array of file extensions that should be treated as Svelte components
  extensions: [".svelte"],

  kit: {
    adapter: vercel(),
    target: "body",
    vite: {
      ssr: {
        noExternal: Object.keys(pkg.dependencies || {})
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '/src'),
        },
      },
      optimizeDeps: {
        include: [
          // svelte-focus-trap relies on modules that are not ESM, we need to pre-compile it
          "svelte-focus-trap"
        ]
      }
    }
  },

  // options passed to svelte.preprocess (https://svelte.dev/docs#svelte_preprocess)
  preprocess: sveltePreprocess({
    postcss: {
      plugins: [
        autoprefixer()
      ]
    }
  }),
};