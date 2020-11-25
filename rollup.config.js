import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import del from 'rollup-plugin-delete'
import { join } from 'path';
import posthtml from 'posthtml';
import { hash } from 'posthtml-hash';
import { writeFileSync, readFileSync } from "fs";
import htmlnano from 'htmlnano';
import { execSync, spawn } from 'child_process';
import replace from '@rollup/plugin-replace';
import copyAssets from 'rollup-plugin-copy-assets';

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
    production && del({ targets: join(outputDir, '*') }),
    copyAssets({
      assets: ['index.html', 'assets/']
    }),
    replace({
      include: '**/version.ts',
      values: {
        COMMIT_HASH: execSync('git rev-parse --short HEAD').toString().trim(),
      }
    }),
    svelte({
      // enable run-time checks when not in production
      dev: !production,
      // we'll extract any component CSS out into
      // a separate file - better for performance
      css: css => {
        css.write('bundle.[hash].css', !production);
      },
      preprocess: sveltePreprocess({
        typescript: true,
        scss: true,
        postcss: production,
      }),
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
