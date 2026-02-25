import adapter from '@sveltejs/adapter-cloudflare-workers';
import { mdsvex } from 'mdsvex';
import { join } from 'path';

import remarkOptimizeImages from "./plugins/remark/optimizeImages.js"
import remarkReplaceLinks from './plugins/remark/replaceLinks.js';


/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md', '.svx'],
	preprocess: [
		mdsvex({
			extensions: ['.svx', '.md'],
			remarkPlugins: [remarkOptimizeImages, remarkReplaceLinks]
		})
	],
	kit: {
		adapter: adapter(),
		alias: {
			"$blog/*": join(import.meta.dirname, "src", "blog", "*")
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
