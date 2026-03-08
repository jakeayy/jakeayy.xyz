import { PUBLIC_BASE_URL } from "$env/static/public";
import { NAME } from "$lib/const";
import type { FullPostMetadata } from "$lib/types/blog";
import { basename } from "path";

export interface RSSOptions {
	title: string;
	description: string;
	link: string;
	language?: string;
	copyright?: string;
	ttl?: number;
}

export interface RSSItem {
	title: string;
	link: string;
	description?: string;
	pubDate: Date;
	author?: string;
	image?: string;
	content?: string;
}

export function generateRSS(items: RSSItem[], options: RSSOptions): string {
	const escapeXML = (str: string) =>
		str
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/"/g, "&quot;")
			.replace(/'/g, "&apos;");

	const header = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXML(options.title)}</title>
    <link>${escapeXML(options.link)}</link>
    <description>${escapeXML(options.description)}</description>
    <atom:link href="${escapeXML(options.link)}/rss.xml" rel="self" type="application/rss+xml" />
    <language>${options.language || "en"}</language>
    <copyright>${options.copyright || `${NAME}`}</copyright>
    <ttl>${options.ttl || 60}</ttl>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`;

	const itemXML = items
		.map((item) => {
			let content = `    <item>
      <title>${escapeXML(item.title)}</title>
      <link>${escapeXML(item.link)}</link>
      <guid isPermaLink="true">${escapeXML(item.link)}</guid>
      <pubDate>${item.pubDate.toUTCString()}</pubDate>`;

			if (item.description) {
				content += `
      <description>${escapeXML(item.description)}</description>`;
			}

			if (item.author) {
				content += `
      <author>${escapeXML(item.author)}</author>`;
			}

			if (item.image) {
				content += `
      <enclosure url="${escapeXML(item.image)}" type="image/jpeg" />`;
			}

			if (item.content) {
				content += `
      <content:encoded><![CDATA[${item.content}]]></content:encoded>`;
			}

			content += `
    </item>`;
			return content;
		})
		.join("\n");

	return `${header}
${itemXML}
  </channel>
</rss>`;
}

export function createPostRSSItem(post: FullPostMetadata): RSSItem {
	const [slug, metadata] = post;
	const cleanSlug = basename(slug, ".md");

	return {
		title: metadata.title,
		link: `${PUBLIC_BASE_URL}/blog/${cleanSlug}`,
		description: metadata.description,
		pubDate: new Date(metadata.date),
		author: NAME,
		image: metadata.image ? `${PUBLIC_BASE_URL}${metadata.image}` : undefined
	};
}
