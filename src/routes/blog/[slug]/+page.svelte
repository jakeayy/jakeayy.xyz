<script lang="ts">
    import { page } from '$app/state';
    import { onMount } from "svelte";
    import TagRenderer from "$lib/components/blog/TagRenderer.svelte";
    import DateRenderer from '$lib/components/blog/DateRenderer.svelte';
	import { resolve } from "$app/paths"
    import type { Pathname } from '$app/types';

	let { data } = $props();

	const date = $derived(new Date(data.meta.date!))
	const navArr = page.url.pathname
		.slice(1)
		.split("/")
		.reduce<string[]>((p, currStr) => {
			const prevPath = p[p.length - 1] ?? ""
			p.push(`${prevPath}/${currStr}`)
			return p
		}, [])

	// show keepandroidopen banner
	onMount(() => {
		if (!data.meta.tags?.includes("android"))
			return;
		
		if (window.__ANDROID_BANNER_LOADED__) return;
		window.__ANDROID_BANNER_LOADED__ = true;

		const script = document.createElement('script');
		script.src = "https://keepandroidopen.org/banner.js";
		script.async = true;
		
		document.head.appendChild(script);
	});
</script>

<main class="flex flex-col gap-10">
	<header class="flex flex-col gap-5">
		{#if data.meta.image}
			<enhanced:img
				fetchpriority="high"
				src={data.meta.image}
				alt={`${data.meta.title} - Preview`}
				class="object-cover object-center h-32 w-full transition-all duration-500 ease-out hover:h-128 not-hover:mask-[linear-gradient(to_bottom,black,transparent)]"
			/>
		{/if}
		<div class="flex flex-col gap-2">
			<div class="flex flex-row gap-2">
				{#each ["/", ...navArr] as nav, i (nav)}
					{@const title = nav.split("/").pop()!}
					<a
						class="bg-ctp-mauve text-ctp-base hover:font-bold px-2"
						title={title}
						href={resolve(nav as Pathname)}
					>{i === 0 ? `[ROOT]` : title}</a>
					{#if i < navArr.length}<span>-&gt;</span>{/if}
				{/each}
			</div>
			<h1>{data.meta.title}</h1>
			<DateRenderer {date} />
			<TagRenderer tags={data.meta?.tags} />
		</div>
		{#if data.meta.description}
			<span class="text-ctp-subtext1 italic">{data.meta.description}</span>
		{/if}
	</header>
	<article>
		{@render data.content()}
	</article>
</main>

<style lang="postcss">
	@reference "../../layout.css";

	main {
		@apply mx-32 my-16;
	}

	article {
		@apply p-5 border-ctp-overlay0 border flex flex-col gap-4;
	}
</style>