const sveltePreprocess = require("svelte-preprocess")
const vercel = require("@sveltejs/adapter-vercel")
const pkg = require("./package.json")
const autoprefixer = require("autoprefixer")
const path = require("path")
const replace = require("@rollup/plugin-replace")
const child_process = require("child_process")

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
	// an array of file extensions that should be treated as Svelte components
	extensions: [".svelte"],

	kit: {
		adapter: vercel(),
		target: "body",
		prerender: {
			enabled: false
		},
		vite: {
			resolve: {
				alias: {
					"@": path.resolve(__dirname, "/src")
				}
			},
			optimizeDeps: {
				include: [
					// svelte-focus-trap relies on modules that break dynamic imports, we need to pre-compile it
					"svelte-focus-trap"
				]
			},
			plugins: [
				replace({
					preventAssignment: true,
					values: {
						COMMIT_HASH_SHORT: child_process
							.execSync("git rev-parse --short HEAD")
							.toString()
							.trim(),
						COMMIT_HASH_LONG: child_process
							.execSync("git rev-parse HEAD")
							.toString()
							.trim()
					}
				})
			]
		}
	},

	// options passed to svelte.preprocess (https://svelte.dev/docs#svelte_preprocess)
	preprocess: sveltePreprocess({
		postcss: {
			plugins: [autoprefixer()]
		}
	})
}
