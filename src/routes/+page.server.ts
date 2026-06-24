import { PUBLIC_BASE_URL } from "$env/static/public";
import { CONTACT, SOCIAL_MEDIA, USERNAME } from "$lib/const";
import avatar from "$lib/assets/img/avatar.png?enhanced"
import type { SeoData } from "$lib/types/seo";

const ldJson = 	{
    "@context": "https://schema.org",
    "@type": "Person",
    "name": USERNAME,
    "url": PUBLIC_BASE_URL,
    "image": `${PUBLIC_BASE_URL}${avatar.img.src}`,
    "description": "I'm a creator of various more or less popular projects that bring entertainment and comfort from doing day-to-day tasks!",
    "sameAs": SOCIAL_MEDIA
        .map(s => s.url)
        .filter(Boolean)
}

const seo: Partial<SeoData> = {
    ldJson,
    keywords: [
        USERNAME,
        ...["portfolio", "socials", "projects"].map(str => `${USERNAME} ${str}`),
        ...[...SOCIAL_MEDIA, ...CONTACT].map(i => `${USERNAME} ${i.type}`)
    ],
	fediverse: {
		me: "https://social.tchncs.de/@jakeayy"
	}
}

export function load() {
    return { seo }
}