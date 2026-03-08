import { error } from '@sveltejs/kit';
import type { PageServerLoadEvent } from "./$types"
import type { PostImport } from '$lib/types/blog';
import type { SeoData } from '$lib/types/seo';
import { USERNAME } from '$lib/const';
import { getBlogImage } from '$lib/blog';
import { PUBLIC_BASE_URL } from '$env/static/public';

export const csr = false;

export async function load({ params: { slug } }: PageServerLoadEvent) {
	let post: PostImport<true>;
	try {
		post = await import(`@/blog/${slug}.md`);
	} catch { error(404) }

	// try to get actual image
	const resolvedImage = post.metadata.image
		? getBlogImage(post.metadata.image)
		: null

	const fullResolvedImage = resolvedImage
		? `${PUBLIC_BASE_URL}${resolvedImage.img.src}`
		: undefined

	const seo: Partial<SeoData> = {
		title: post.metadata.title,
		description: post.metadata.description,
		image: fullResolvedImage,
		keywords: [
			`${USERNAME} blog`,
			...post.metadata.tags ?? []
		],
		ldJson: {
			"@context": "https://schema.org",
			"@type": "BlogPosting",
			headline: post.metadata.title,
			description: post.metadata.description,
			image: fullResolvedImage,
			datePublished: post.metadata.date
		}
	}

	return {
		seo,
		content: post.default,
		meta: {
			...post.metadata,
			image: resolvedImage
		},
	};
}