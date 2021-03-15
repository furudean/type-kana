import path from "path";
import { execSync } from "child_process";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import commonjs from "@rollup/plugin-commonjs";
import url from "@rollup/plugin-url";
import svelte from "rollup-plugin-svelte";
import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import config from "sapper/config/rollup.js";
import pkg from "./package.json";
import autoprefixer from "autoprefixer";
import sveltePreprocess from "svelte-preprocess";
import typescript from "@rollup/plugin-typescript";

const mode = process.env.NODE_ENV;
const dev = mode === "development";
const legacy = !!process.env.SAPPER_LEGACY_BUILD;

console.log("Node version", process.version)

const onwarn = (warning, onwarn) =>
  (warning.code === "MISSING_EXPORT" && /'preload'/.test(warning.message)) ||
  (warning.code === "CIRCULAR_DEPENDENCY" && /[/\\]@sapper[/\\]/.test(warning.message)) ||
  (warning.code === 'THIS_IS_UNDEFINED') ||
  onwarn(warning);

const replaceDefaults = {
  'process.env.NODE_ENV': JSON.stringify(mode),
  'COMMIT_HASH_SHORT': execSync("git rev-parse --short HEAD").toString().trim(),
  'COMMIT_HASH_LONG': execSync("git rev-parse HEAD").toString().trim(),
}

const preprocessOptions = {
  sourceMap: dev,
  postcss: {
    plugins: [
      autoprefixer(),
    ]
  }
}

export default {
  client: {
    input: config.client.input().replace(/\.js$/, '.ts'),
    output: config.client.output(),
    plugins: [
      replace({
        preventAssignment: true,
        values: {
          ...replaceDefaults,
          'process.browser': true,
        }
      }),
      svelte({
        preprocess: sveltePreprocess(preprocessOptions),
        compilerOptions: {
          dev,
          hydratable: true
        }
      }),
      url({
        sourceDir: path.resolve(__dirname, "src/node_modules/images"),
        publicPath: "/client/"
      }),
      resolve({
        browser: true,
        dedupe: ["svelte"]
      }),
      commonjs(),

      typescript({ sourceMap: dev, inlineSources: dev }),

      legacy && babel({
        extensions: [".js", ".mjs", ".html", ".svelte"],
        babelHelpers: "runtime",
        exclude: ["node_modules/@babel/**"],
        presets: [
          ["@babel/preset-env"]
        ],
        plugins: [
          "@babel/plugin-syntax-dynamic-import",
          ["@babel/plugin-transform-runtime", {
            useESModules: true
          }]
        ]
      }),

      !dev && terser({
        module: true
      })
    ],

    preserveEntrySignatures: false,
    onwarn,
  },

  server: {
    input: { server: config.server.input().server.replace(/\.js$/, ".ts") },
    output: config.server.output(),
    plugins: [
      replace({
        preventAssignment: true,
        values: {
          ...replaceDefaults,
          'process.browser': false,
        }
      }),
      svelte({
        preprocess: sveltePreprocess(preprocessOptions),
        compilerOptions: {
          dev,
          generate: "ssr",
          hydratable: true
        },
        emitCss: false
      }),
      url({
        sourceDir: path.resolve(__dirname, "src/node_modules/images"),
        publicPath: "/client/",
        emitFiles: false // already emitted by client build
      }),

      resolve({
        dedupe: ["svelte"]
      }),
      commonjs(),

      typescript({ sourceMap: dev, inlineSources: dev }),

      legacy && babel({
        extensions: [".js", ".ts", ".mjs", ".html", ".svelte"],
        babelHelpers: "runtime",
        exclude: ["node_modules/@babel/**"],
        presets: [
          ["@babel/preset-env", {
            targets: { node: 12 } // target node 12 since vercel runs this version
          }]
        ],
        plugins: [
          ["@babel/plugin-transform-runtime", {
            useESModules: true
          }]
        ]
      }),
      !dev && terser()
    ],
    external: Object.keys(pkg.dependencies).concat(require("module").builtinModules),
    preserveEntrySignatures: "strict",
    onwarn,
  },

  serviceworker: {
    input: config.serviceworker.input().replace(/\.js$/, '.ts'),
    output: config.serviceworker.output(),
    plugins: [
      resolve(),
      replace({
        preventAssignment: true,
        values: {
          ...replaceDefaults,
          'process.browser': true,
        }
      }),
      commonjs(),
      typescript({ sourceMap: dev, inlineSources: dev }),
      !dev && terser()
    ],
    preserveEntrySignatures: false,
    onwarn,
  }
};