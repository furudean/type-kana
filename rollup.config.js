import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from 'rollup-plugin-typescript2';
import del from 'rollup-plugin-delete'
import { join } from 'path';
import posthtml from 'posthtml';
import { hash } from 'posthtml-hash';
import { writeFileSync, readFileSync } from "fs";
import htmlnano from 'htmlnano';
import { execSync, spawn } from 'child_process';
import replace from '@rollup/plugin-replace';
import copyAssets from 'rollup-plugin-copy-assets';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

const production = !process.env.ROLLUP_WATCH;
const outputDir = 'build';

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = spawn('npm', ['run', 'start', '--', '--dev'], {
        stdio: ['ignore', 'inherit', 'inherit'],
        shell: true
      });

      process.on('SIGTERM', toExit);
      process.on('exit', toExit);
    }
  };
}

function hashStaticAssets() {
  return {
    name: 'hash-static-assets',
    writeBundle() {
      posthtml([
        // Hashes `bundle.[hash].css`, `bundle.[hash].js` and assets with [hash] in the name
        hash({
          path: outputDir,
          hashLength: 8,
          transformPath: (filepath) => filepath.replace("https://type-kana.cass.moe", "")
        }),
        // Minify
        htmlnano()
      ])
        .process(readFileSync('src/index.html'))
        .then(result => writeFileSync(join(outputDir, 'index.html'), result.html));
    },
  };
}

export default {
  input: 'src/main.ts',
  output: {
    sourcemap: !production,
    format: 'iife',
    name: 'app',
    file: join(outputDir, 'bundle.[hash].js'),
  },
  plugins: [
    // delete anything in output dir
    production && del({ targets: join(outputDir, '*') }),

    // include index.html and assets/ in bundle
    copyAssets({
      assets: ['index.html', 'assets/']
    }),

    replace({
      include: '**/version.ts',
      values: {
        COMMIT_HASH_SHORT: execSync('git rev-parse --short HEAD').toString().trim(),
        COMMIT_HASH_LONG: execSync('git rev-parse HEAD').toString().trim(),
      }
    }),

    svelte({
      compilerOptions: {
        // enable run-time checks when not in production
        dev: !production
      },
      preprocess: sveltePreprocess({
        scss: true,
      }),
    }),

    postcss({
      plugins: [
        // process CSS for production
        production && autoprefixer(),
        production && cssnano(),
      ],
      // we'll extract any component CSS out into
      // a separate file - better for performance
      extract: 'bundle.[hash].css',
    }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ['svelte']
    }),
    commonjs(),

    // process typescript to javascript
    typescript({ sourceMap: !production }),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload({ watch: outputDir }),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),
    production && hashStaticAssets()
  ],
  watch: {
    clearScreen: false
  }
};
