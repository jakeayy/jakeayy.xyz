import type { Snippet } from "svelte"

export type PostMetadata = {
    published: boolean,
	date: string,
	title: string,
    description?: string,
	image?: string
    tags?: string[],
}

export type FullPostMetadata = [slug: string, metadata: PostMetadata]

export type PostImport<T extends boolean = false> = {
	default: Snippet,
	metadata: T extends true
		? PostMetadata
		: Partial<PostMetadata>
}