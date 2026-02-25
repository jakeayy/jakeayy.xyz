import { error } from '@sveltejs/kit';
import type { PageServerLoadEvent } from "./$types"
import type { PostImport } from '$lib/blog';

export async function load({ params: { slug } }: PageServerLoadEvent) {
	let post: PostImport;
	try {
		post = await import(`$blog/${slug}.md`);
	} catch { error(404) }

	if (
		typeof post.metadata?.title !== "string"
		|| typeof post.metadata.published !== "boolean"
		|| typeof post.metadata.date !== "string"
	) throw new Error(`No title/published/date in "${slug}"`)

	return {
		content: post.default,
		meta: post.metadata
	};
}