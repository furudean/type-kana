import type { RequestHandler } from "@sveltejs/kit"
import { html } from "common-tags"

export function mdiIconSvgRequestHandler(path: string): RequestHandler {
	return () => ({
		status: 200,
		headers: {
			"content-type": "image/svg+xml"
		},
		body: html`
			<svg version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
				<path d="${path}" fill="currentColor" />
			</svg>
		`
	})
}
