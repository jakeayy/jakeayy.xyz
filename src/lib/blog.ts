import { dev } from "$app/environment";
import type { Picture } from "@sveltejs/enhanced-img";
import type { PostMetadata } from "$lib/types/blog";
import { PUBLIC_BASE_URL } from "$env/static/public";

export function isValidPost(meta: Partial<PostMetadata>): meta is PostMetadata {
    return typeof meta.title === "string"
		&& typeof meta.published === "boolean"
		&& typeof meta.date === "string"
        && (meta.published || dev)
}

export const getBlogPostMeta = () =>
    import.meta.glob<PostMetadata>("./*.md", {
        eager: true,
        import: "metadata",
        base: "../blog/"
    })

const blogImageMap =
            import.meta.glob<Picture>("./**/*.{png,jpg,webp,gif,avif}", {
                eager: true,
                query: "?enhanced",
                import: "default",
                base: "../blog/",
            })

export function getBlogImage<T extends boolean = false>(path: string, includeHostname?: T): (T extends true ? string : Picture) | null {
    const normalizedPath = path.replace(/^\.?\/?/, "./")
    const image = blogImageMap[normalizedPath]
    if (!image) return null

    if (includeHostname) return `${PUBLIC_BASE_URL}${image.img.src}` as ReturnType<typeof getBlogImage<T>>
    return image as ReturnType<typeof getBlogImage<T>>
}