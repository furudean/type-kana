import { vitePreprocess } from "@sveltejs/vite-plugin-svelte"
import adapterVercel from "@sveltejs/adapter-vercel"
import path from "path"
import { readdirSync } from "fs"

/**
 * Lists urls of all static routes in `path`.
 *
 * @param {string} p - The path to search
 *
 * @returns {string[]}
 */
function listRoutesIn(p) {
	const routesPath = path.join("./src/routes/", p)
	const dir = readdirSync(routesPath, { withFileTypes: true })

	const filenames = dir
		.filter(({ isFile, name }) => isFile && !name.startsWith("_"))
		.map((dirent) => dirent.name)

	if (filenames.length === 0) {
		throw new Error(`listRoutesIn: No static routes found in '${p}'`)
	}

	const routes = filenames.map((filename) => {
		return path.posix.join("/", p, filename)
	})

	return routes
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// an array of file extensions that should be treated as Svelte components
	extensions: [".svelte"],

	kit: {
		adapter: adapterVercel(),
		prerender: {
			entries: ["*", ...listRoutesIn("/icon/")]
		},
		alias: {
			$: "src"
		}
	},

	preprocess: vitePreprocess()
}

export default config
