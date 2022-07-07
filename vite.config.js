import { sveltekit } from "@sveltejs/kit/vite"
import replace from "@rollup/plugin-replace"
import { execSync } from "child_process"

function execSyncSafe(command) {
	try {
		return execSync(command).toString().trim()
	} catch (error) {
		console.warn(`execSyncSafe: command ${command} failed!`)
		return `'${command}' failed`
	}
}

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		replace({
			preventAssignment: true,
			values: {
				COMMIT_HASH_SHORT: execSyncSafe("git rev-parse --short HEAD"),
				COMMIT_HASH_LONG: execSyncSafe("git rev-parse HEAD")
			}
		}),
		sveltekit()
	],
	ssr: {
		noExternal: ["svelte-hero-icons"]
	}
}

export default config
