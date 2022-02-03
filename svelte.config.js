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
 * @returns {string[]}
 */
function listRoutesIn(path) {
	const routesPath = joinPath("./src/routes/", path)
	const dir = readdirSync(routesPath, { withFileTypes: true })

	const filenames = dir
		.filter(({ isFile, name }) => isFile && !name.startsWith("_"))
		.map((dirent) => dirent.name)

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

	onwarn: (warning, handler) => {
		const { code, message } = warning
		if (code === "css-unused-selector" && message.includes(".focus-visible"))
			return

		handler(warning)
	},

	kit: {
		adapter: adapterStatic(),
		prerender: {
			enabled: true,
			crawl: true,
			entries: ["*", ...listRoutesIn("/icon/")]
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
