import YouTubeLogo from "$lib/assets/icons/youtube.svg?component"
import DiscordLogo from "$lib/assets/icons/discord.svg?component"
import GitHubLogo from "$lib/assets/icons/github.svg?component"
import MailLogo from "$lib/assets/icons/mail.svg?component"
import MatrixLogo from "$lib/assets/icons/matrix.svg?component"
import TwitterLogo from "$lib/assets/icons/twitter.svg?component"
import BlueskyLogo from "$lib/assets/icons/bluesky.svg?component"
import TelegramLogo from "$lib/assets/icons/telegram.svg?component"
import CodebergLogo from "$lib/assets/icons/codeberg.svg?component"

import type { Component } from "svelte"

export const ICON_MAP = {
    youtube: YouTubeLogo,
    discord: DiscordLogo,
    github: GitHubLogo,
    mail: MailLogo,
    matrix: MatrixLogo,
    twitter: TwitterLogo,
    bluesky: BlueskyLogo,
    telegram: TelegramLogo,
    codeberg: CodebergLogo
} as const satisfies Record<string, Component>

export type SocialTypes = keyof typeof ICON_MAP

export type SocialMedia = {
    type: SocialTypes,
    text?: string,
    url?: string
}