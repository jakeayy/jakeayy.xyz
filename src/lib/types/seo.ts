export type SeoData = {
    title: string,
    description: string,
    keywords?: string[],
    icon?: string
    image?: string,
    themeColor?: {
        light?: string,
        dark?: string
    },
    ldJson?: Record<string, unknown>
}