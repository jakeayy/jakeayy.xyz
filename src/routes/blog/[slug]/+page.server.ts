import { dev } from "$app/environment";
import type { PostImport } from "$lib/blog";

export function entries() {
    const posts = import.meta.glob<PostImport>("$blog/*.md", { eager: true })

    return Object.entries(posts)
		.filter(([, p]) => p.metadata?.published || dev)
		.map(([path]) => {
			const slug = path.split('/').pop()?.replace('.md', '')!;
			return { slug };
		});
}