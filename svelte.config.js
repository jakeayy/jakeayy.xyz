import adapter from '@sveltejs/adapter-cloudflare-workers';
import { mdsvex } from 'mdsvex';
import mdsvexOptions from './mdsvex.config.js';
import { join } from 'path';


/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md', '.svx'],
	preprocess: [mdsvex(mdsvexOptions)],
	kit: {
		adapter: adapter(),
		alias: {
			"@/*": join(import.meta.dirname, "src", "*")
		},
		prerender: {
			handleUnseenRoutes({ message, routes }) {
				for (const route of routes) {
					if (route.startsWith("/blog/")) // ignore unpublished blog posts
						continue;

					throw new Error(message)
				}
			}
		}
	}
};

export default config;
