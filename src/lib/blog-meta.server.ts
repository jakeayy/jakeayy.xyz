import { dev } from "$app/environment";
import type { PostMetadata } from "$lib/types/blog";

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
