import type { Snippet } from "svelte"

export type PostMetadata = {
	title?: string,
	date?: string,
    description?: string,
    tags?: string[],
    published?: boolean
}

export type PostImport = {
	default: Snippet,
	metadata?: PostMetadata
}