import { getBlogImage, getBlogPostMeta, isValidPost } from "$lib/blog";
import { USERNAME } from "$lib/const";
import type { FullPostMetadata} from "$lib/types/blog";
import type { SeoData } from "$lib/types/seo";

const seo: Partial<SeoData> = {
    title: "Blog Posts",
    keywords: [
        `${USERNAME} blog`,
        `${USERNAME} posts`,
        `${USERNAME} blog posts`,
    ]
}

export function load() {
    const posts = Object.entries(getBlogPostMeta())
        .filter(([, m]) => isValidPost(m))
        .map<FullPostMetadata>(([path, post]) => { // resolve image path
            const slug = path.replace(".md", "")

            const m = { ...post }
            if (!m.image) return [slug, m]

            const img = getBlogImage(m.image)
            if (!img) return [slug, m]

            m.image = img.img.src
            return [slug, m]
        })
        .toSorted(([, a], [, b]) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        )
    
    return {
        seo,
        posts
    }
}