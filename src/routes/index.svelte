<script lang="ts" context="module">
	import type { Load } from "@sveltejs/kit"

	export const load: Load = async function () {
		return {
			status: 302,
			redirect: "setup"
		}
	}

</script>
