<script lang="ts">
	import TwitterLogo from "$lib/assets/icons/twitter.svg?component"
	import type { TweetData } from "$lib/types/tweet";

	type Props = {
		data: TweetData
	}

	let { data }: Props = $props()
</script>

<blockquote class="not-prose border-faint border p-4 flex flex-col gap-3 my-2 max-w-4xl place-self-center">
	{#if data.text}
		<div class="flex flex-row items-center gap-2 text-muted">
			{#if data.avatarUrl}
				<img
					src={data.avatarUrl}
					alt=""
					class="size-8 border border-faint"
					loading="lazy"
				/>
			{:else}
				<TwitterLogo height="18" />
			{/if}
			{#if data.authorName}
				<span class="text-fg">{data.authorName}</span>
			{/if}
			{#if data.authorHandle}
				<span>@{data.authorHandle}</span>
			{/if}
		</div>
		<p class="whitespace-pre-line">{data.text}</p>
		{#if data.photos.length > 0}
			<div class="flex flex-row flex-wrap gap-2">
				{#each data.photos as photo (photo)}
					<img
						src={photo}
						alt="Tweet media"
						class="max-h-80 border border-faint object-cover"
						loading="lazy"
					/>
				{/each}
			</div>
		{/if}
		{#if data.video}
			<a
				href={data.video.src}
				target="_blank"
				rel="noreferrer noopener external"
				class="relative block w-fit group"
			>
				{#if data.video.poster}
					<img
						src={data.video.poster}
						alt="Tweet video preview"
						class="max-h-96 border border-faint object-cover"
						loading="lazy"
					/>
					<span class="absolute inset-0 flex items-center justify-center bg-canvas/40 group-hover:bg-canvas/60 transition-colors">
						<span class="text-fg text-2xl">&#9654;</span>
					</span>
				{:else}
					<span class="flex items-center gap-2 text-muted hover:text-accent-soft border border-faint px-3 py-2 w-fit">
						<span>&#9654;</span>
						<span>Watch video</span>
					</span>
				{/if}
			</a>
		{/if}
	{:else}
		<div class="flex flex-row items-center gap-2 text-muted">
			<TwitterLogo height="18" />
			<span>Tweet unavailable for preview</span>
		</div>
	{/if}
	<a
		href={data.url}
		target="_blank"
		rel="noreferrer noopener external"
		class="text-faint hover:text-accent-soft text-sm"
	>View on X &rarr;</a>
</blockquote>
