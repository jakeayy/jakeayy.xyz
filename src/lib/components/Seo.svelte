<script lang="ts">
    import { page } from '$app/state';
    import { PUBLIC_BASE_URL } from '$env/static/public';
	import favicon from '$lib/assets/icons/favicon.svg?url';
    import { USERNAME } from '$lib/const';
    import type { SeoData } from '$lib/types/seo';

    import mainFont from "$lib/assets/fonts/Iosevka-Regular-latin-400.woff2?url"

    let {
        title,
        themeColor,
        description,
        keywords,
        image,
        icon,
        ldJson
    }: SeoData = $props()
</script>

{#if typeof title === "string"}
    {@const domain = new URL(PUBLIC_BASE_URL).hostname}
    {@const fullTitle = title ? `${title} | ${domain}` : domain}
    
    <title>{fullTitle}</title>
    <meta property="og:title" content={fullTitle} />
    <meta name="twitter:title" content={fullTitle} />
{/if}
<link rel="icon" href={icon || favicon} />
{#if themeColor?.light}
    <meta
        name="theme-color"
        content={themeColor.light}
        media="(prefers-color-scheme: light)"
    />
{/if}
{#if themeColor?.dark}
    <meta
        name="theme-color"
        content={themeColor.dark}
        media="(prefers-color-scheme: dark)"
    />
{/if}
{#if description}
    <meta name="description" content={description} />
    <meta property="og:description" content={description} />
    <meta name="twitter:description" content={description} />
{/if}
{#if keywords}
    <meta name="keywords" content={keywords.join(",")} />
{/if}
{#if image}
    <meta property="og:image" content={image} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={image} />
{/if}
<meta name="author" content={USERNAME} />
<meta property="og:type" content="website" />
<link rel="canonical" href={`${PUBLIC_BASE_URL}${page.url.pathname}`} />
<link rel="preload" href={mainFont} as="font" crossorigin="anonymous" />
{#if ldJson}
    <svelte:element this={"script"} type="application/ld+json">{JSON.stringify(ldJson)}</svelte:element>
{/if}