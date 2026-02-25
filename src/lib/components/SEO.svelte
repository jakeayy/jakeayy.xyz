<script lang="ts">
    import { PUBLIC_BASE_URL } from '$env/static/public';
	import favicon from '$lib/assets/icons/favicon.svg?url';
    import { USERNAME } from '$lib/const';

    type Props = {
        title?: string,
        themeColor?: {
            light?: string,
            dark?: string
        },
        description?: string,
        keywords?: string[],
        image?: string,
        icon?: string
    }

    let {
        title,
        themeColor,
        description,
        keywords,
        image,
        icon
    }: Props = $props()
</script>

{#if typeof title === "string"}
    {@const domain = new URL(PUBLIC_BASE_URL).hostname}
    {@const fullTitle = title ? `${title} - ${domain}` : domain}
    
    <title>{fullTitle}</title>
    <meta property="og:title" content={title} />
    <meta name="twitter:title" content={title} />
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