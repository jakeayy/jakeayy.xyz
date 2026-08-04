export type TweetData = {
	id: string,
	url: string,
	text: string | null,
	authorName: string | null,
	authorHandle: string | null,
	avatarUrl: string | null,
	photos: string[],
	video: { src: string, poster: string | null } | null,
}
