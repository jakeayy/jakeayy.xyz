import type { SocialMedia } from "$lib/social"

export const NAME = "Jake"
export const USERNAME = "jakeayy"
export const HOSTNAME = "jakeayy-xyz"
export const BIRTHDAY = new Date(2005, 4, 27)


export const SOCIAL_MEDIA = [
    { type: "youtube", url: "https://www.youtube.com/@jakeayy_yt" },
    { type: "github", url: "https://github.com/jakeayy" },
    { type: "twitter", url: "https://twitter.com/jakeayy_" },
    { type: "bluesky", url: "https://bsky.app/profile/jakeayy.xyz" },
    { type: "discord", url: "https://discord.gg/3TGEBNc7HJ" }
] as const satisfies SocialMedia[]

export const CONTACT = [
    { type: "matrix", url: "https://matrix.to/#/@jakeayy:tchncs.de" },
    { type: "mail", url: "mailto:contact@jakeayy.xyz" },
    { type: "discord", text: "jakeayy." },
    { type: "telegram", url: "https://t.me/jakeayy_tg" }
] as const satisfies SocialMedia[]