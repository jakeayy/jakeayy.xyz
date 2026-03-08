import { dev } from "$app/environment";
import { getBlogPostMeta } from "$lib/blog.js";
import { basename } from "path";

export function entries() {
    const posts = getBlogPostMeta()

    return Object.entries(posts)
		.filter(([, m]) => m && (m.published || dev))
		.map(([path]) => {
			const slug = basename(path, ".md");
			return { slug };
		});
}