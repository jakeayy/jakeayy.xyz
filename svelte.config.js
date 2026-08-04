import adapter from '@sveltejs/adapter-cloudflare';
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
		csp: {
      mode: "hash",
      directives: {
          "default-src": ["self"],
          "script-src": [
              "self",
              "https://keepandroidopen.org" // src/routes/blog/[slug]/+page.svelte
          ],
          // shiki and svelte style need inlines
          "style-src-attr": ["unsafe-inline"],
          "style-src-elem": ["self"],
        "img-src": [
          "self", "data:",
          "https://pbs.twimg.com" // (plugins/remark/embedTweets.js + src/lib/components/Tweet.svelte)
        ],
          "font-src": ["self", "data:"],
          "connect-src": ["self"],
          "object-src": ["none"],
          "base-uri": ["self"],
          "form-action": ["self"]
      }
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
