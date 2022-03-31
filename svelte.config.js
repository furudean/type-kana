import sveltePreprocess from "svelte-preprocess"
import adapterStatic from "@sveltejs/adapter-static"
import {
	join as joinPath,
	parse as parsePath,
	resolve as resolvePath
} from "path"
import replace from "@rollup/plugin-replace"
import { execSync } from "child_process"
import { readdirSync } from "fs"

function execSyncSafe(command) {
	try {
		return execSync(command).toString().trim()
	} catch (error) {
		console.warn(`execSyncSafe: command ${command} failed!`)
		return `'${command}' failed`
	}
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// an array of file extensions that should be treated as Svelte components
	extensions: [".svelte"],

	onwarn: (warning, handler) => {
		const { code, message } = warning
		if (code === "css-unused-selector" && message.includes(".focus-visible"))
			return

		handler(warning)
	},

	kit: {
		adapter: adapterStatic(),
		prerender: {
			default: true
		},
		vite: {
			ssr: {
				noExternal: ["svelte-hero-icons"]
			},
			resolve: {
				alias: {
					$: resolvePath("./src")
				}
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

export default config
