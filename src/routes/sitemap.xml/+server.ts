import { getBlogPostMeta, isValidPost } from "$lib/blog";
import { PUBLIC_BASE_URL } from "$env/static/public";
import { basename } from "path";

export function GET() {
    // STATIC PAGES
    const pages = [
        "",         // home
        "/blog",    // blog index
    ];

    // BLOG POSTS
    const postMeta = getBlogPostMeta();
    const blogPosts = Object.entries(postMeta)
        .filter(([, meta]) => isValidPost(meta))
        .map(([path, meta]) => {
            const slug = basename(path, ".md");
            return {
                url: `/blog/${slug}`,
                lastMod: new Date(meta.date).toISOString().split('T')[0],
                priority: 0.7
            };
        })
        .sort((a, b) => new Date(b.lastMod).getTime() - new Date(a.lastMod).getTime());

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <!-- Static Pages -->
${pages.map(page => `    <url>
        <loc>${PUBLIC_BASE_URL}${page}</loc>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
    </url>`).join('\n')}

    <!-- Blog Posts -->
${blogPosts.map(post => `    <url>
        <loc>${PUBLIC_BASE_URL}${post.url}</loc>
        <lastmod>${post.lastMod}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>${post.priority}</priority>
    </url>`).join('\n')}
</urlset>`;

    return new Response(sitemap, {
        headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "max-age=0, s-maxage=3600"
        }
    });
}
