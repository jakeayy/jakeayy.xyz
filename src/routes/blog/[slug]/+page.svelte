<script lang="ts">
    import SEO from '$lib/components/SEO.svelte';

	export let data;
</script>

<svelte:head>
	<SEO
		title={data.meta?.title}
		description={data.meta?.description}
		keywords={data.meta?.tags}
	/>
</svelte:head>

<article>
	<h1>{data.meta.title}</h1>
	<p>Published on: {data.meta.date}</p>

	{@render data.content()}
</article>