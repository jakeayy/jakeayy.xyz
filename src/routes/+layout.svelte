<script lang="ts">
	import './layout.css';
	import avatar from '$lib/assets/avatar.png';
	import iosevkaFontWoff from "$lib/assets/fonts/Iosevka-Regular-latin-400.woff2?url"

	import { PUBLIC_BASE_URL } from "$env/static/public"
    import { CONTACT, NAME, SOCIAL_MEDIA, USERNAME } from '$lib/const';
    import SEO from '$lib/components/SEO.svelte';

	const hostname = new URL(PUBLIC_BASE_URL).hostname

	let { children } = $props();
</script>

<svelte:head>
	<SEO
		title=""
		description={`Welcome to ${hostname}, a portfolio site of ${NAME} (${USERNAME}) and showcase of various other projects created by him!`}
		keywords={[USERNAME, hostname, `${USERNAME} portfolio`, ...[...SOCIAL_MEDIA, ...CONTACT].map(i => `${USERNAME} ${i.type}`)]}
		image={`${PUBLIC_BASE_URL}${avatar}`}
		themeColor={{
			light: "white",
			dark: "black"
		}}
	/>

	<link rel="preload" as="font" type="font/woff2" href={iosevkaFontWoff} crossorigin="anonymous" />
</svelte:head>
{@render children()}
