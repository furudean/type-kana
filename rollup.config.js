import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import del from 'rollup-plugin-delete'
import copy from "rollup-plugin-copy";
import html from "@rollup/plugin-html";
import htmlTemplate from "./htmlTemplate";

const production = !process.env.ROLLUP_WATCH;
const outputDir = "build/";

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

const log = (opts) => {
	console.log(opts)

	return {
		name: 'log',
		buildEnd(err) {
			if (err && options.errors) {
				process.stderr.write('\x07');
			}
		}
	}
}


export default {
	input: 'src/main.ts',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		dir: outputDir,
		entryFileNames: production ? 'bundle.[hash].js' : 'bundle.js',
	},
	plugins: [
		production && del({ targets: `${outputDir}*` }),
		copy({
			targets: [{ src: 'public/*', dest: outputDir }]
		}),
		svelte({
			// enable run-time checks when not in production
			dev: !production,
			preprocess: sveltePreprocess(),
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

		// Write the index.html file which holds links to all 
		//.css and .js files generated
		html({ template: htmlTemplate }),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload(outputDir),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};
