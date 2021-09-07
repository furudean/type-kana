import sveltePreprocess from "svelte-preprocess"
import adapterStatic from "@sveltejs/adapter-static"
import path from "path"
import replace from "@rollup/plugin-replace"
import { execSync } from "child_process"

function execSyncSafe(command) {
	try {
		return execSync(command).toString().trim()
	} catch (error) {
		return `'${command}' failed`
	}
}

/** @type {import('@sveltejs/kit').Config} */
export default {
	// an array of file extensions that should be treated as Svelte components
	extensions: [".svelte"],

	kit: {
		adapter: adapterStatic(),
		target: "body",
		vite: {
			resolve: {
				alias: {
					"@": path.resolve("./src")
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
						COMMIT_HASH_SHORT: execSyncSafe("git rev-parse --short HEAD"),
						COMMIT_HASH_LONG: execSyncSafe("git rev-parse HEAD")
					}
				})
			]
		}
	},

	// options passed to svelte.preprocess (https://svelte.dev/docs#svelte_preprocess)
	preprocess: sveltePreprocess({ postcss: true, typescript: true })
}
