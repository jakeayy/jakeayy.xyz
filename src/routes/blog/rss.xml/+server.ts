import { generateRSS, createPostRSSItem } from "$lib/rss";
import { getBlogImage, getBlogPostMeta, isValidPost } from "$lib/blog";
import { NAME, USERNAME, HOSTNAME } from "$lib/const";
import { PUBLIC_BASE_URL } from "$env/static/public";
import type { FullPostMetadata } from "$lib/types/blog";
import { basename } from "path";

export const prerender = true;

// Generate RSS at build time
const posts = Object.entries(getBlogPostMeta())
	.filter(([, m]) => isValidPost(m))
	.map<FullPostMetadata>(([path, post]) => {
		const slug = basename(path, ".md");

		const m = { ...post };
		if (!m.image) return [slug, m];

		const img = getBlogImage(m.image);
		if (!img) return [slug, m];

		m.image = img.img.src;
		return [slug, m];
	})
	.toSorted(
		([, a], [, b]) =>
			new Date(b.date).getTime() - new Date(a.date).getTime()
	);

const rssItems = posts.map(createPostRSSItem);

const rss = generateRSS(rssItems, {
	title: `${NAME}'s Blog`,
	description: `Latest blog posts from ${NAME} (${USERNAME}) on ${HOSTNAME}`,
	link: `${PUBLIC_BASE_URL}/blog`,
	language: "en",
	copyright: `${NAME}`,
	ttl: 360 // check every 6 hours
});

export function GET() {
	return new Response(rss, {
		headers: {
			"Content-Type": "application/xml; charset=utf-8",
			"Cache-Control": "public, max-age=3600, s-maxage=3600" // cache for 1 hour
		}
	});
}
