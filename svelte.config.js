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

/**
 * Lists urls of all static routes in `path`.
 *
 * @param {string} path - The path to search
 *
 * @returns {string[]} Le path
 */
function listRoutesIn(path) {
	const routesPath = joinPath("./src/routes/", path)
	const dir = readdirSync(routesPath, { withFileTypes: true })

	const filenames = dir
		.filter(({ isFile, name }) => isFile && !name.startsWith("_"))
		.map((module) => module.name)

	if (filenames.length === 0) {
		throw new Error(`listRoutesIn: No static routes found in '${path}'`)
	}

	const routes = filenames.map((filename) => {
		const name = parsePath(filename).name
		return joinPath("/", path, name)
	})

	return routes
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// an array of file extensions that should be treated as Svelte components
	extensions: [".svelte"],

	kit: {
		adapter: adapterStatic(),
		target: "body",
		prerender: {
			enabled: true,
			crawl: true,
			pages: ["*", ...listRoutesIn("/icon/")]
		},
		vite: {
			resolve: {
				alias: {
					"@": resolvePath("./src")
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

export default config
