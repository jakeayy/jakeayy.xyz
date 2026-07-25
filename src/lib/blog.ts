import type { Picture } from "@sveltejs/enhanced-img";
import { PUBLIC_BASE_URL } from "$env/static/public";

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
