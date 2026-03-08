<script lang="ts">
	import './layout.css';
	import avatar from '$lib/assets/avatar.png?enhanced';
	import iosevkaFontWoff from "$lib/assets/fonts/Iosevka-Regular-latin-400.woff2?url"

	import { PUBLIC_BASE_URL } from "$env/static/public"
    import { NAME, USERNAME } from '$lib/const';
    import Seo from '$lib/components/Seo.svelte';

    import type { SeoData } from '$lib/types/seo';
	import { page } from "$app/state"
    import LoaderBar from '$lib/components/LoaderBar.svelte';
	
	
	const hostname = new URL(PUBLIC_BASE_URL).hostname

	// SEO LOADING
	let seo: SeoData = $derived({
		// defaults
        title: "",
        description: `Welcome to ${hostname}, a portfolio site of ${NAME} (${USERNAME}) and showcase of various other projects created by him!`,
		keywords: [USERNAME, hostname],
		image: `${PUBLIC_BASE_URL}${avatar.img.src}`,
		themeColor: {
			light: "white",
			dark: "black"
		},

		// dynamic data
		...page.data.seo
    })
	
	let { children } = $props();
</script>

<svelte:head>
	<Seo {...seo} />

	<link rel="preload" as="font" type="font/woff2" href={iosevkaFontWoff} crossorigin="anonymous" />
	<link rel="alternate" type="application/rss+xml" title="RSS Feed" href={`${PUBLIC_BASE_URL}/blog/rss.xml`} />
</svelte:head>

<!-- LOADING BAR -->
<LoaderBar />

<!-- DATA -->
{@render children()}
