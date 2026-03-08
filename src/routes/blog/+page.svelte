<script lang="ts">
    import SearchBox from "$lib/components/SearchBox.svelte";
    import TagRenderer from "$lib/components/blog/TagRenderer.svelte";
    import RssIcon from "$lib/assets/icons/rss.svg?component"
    import Select from "$lib/components/Select.svelte";
    import type { FullPostMetadata } from "$lib/types/blog.js";
    import { page } from "$app/state"
    import DateRenderer from "$lib/components/blog/DateRenderer.svelte";
    import { goto } from "$app/navigation";
    import { untrack } from "svelte";
    import { resolve } from "$app/paths";

    let { data } = $props()
    
    const allTags = $derived([...new Set(
        data.posts
            .filter(([, p]) => p.tags && p.tags.length > 0)
            .flatMap(([, p]) => p.tags!)
    )])

    let searchValue = $state("")
    let selectedTags = $state<string[]>([])

    // set query tags/search
    $effect(() => {
        untrack(() => {
            const q = page.url.searchParams.get("q")
            const tags = page.url.searchParams.get("tags")?.split(",")

            if (q) searchValue = q
            if (tags) selectedTags = tags
        })
    })


    const latestPost = $derived<FullPostMetadata | undefined>(data.posts[0])
    const filteredPosts = $derived(
        data.posts
            .filter(([, p]) =>
                (
                    !searchValue
                    || p.title.toLowerCase().includes(searchValue.toLowerCase())
                    || (!p.description || p.description.toLowerCase().includes(searchValue.toLowerCase()))
                )
                &&
                (
                    selectedTags.length === 0
                    || (p.tags && p.tags.length > 0 && selectedTags.every(t => p.tags?.includes(t)))
                )
            )
    )
</script>

{#snippet postItem([slug, { title, tags, date: dateStr, image, description }]: FullPostMetadata)}
    {@const date = new Date(dateStr)}

    <div class="flex flex-col border border-ctp-subtext0 bg-ctp-mantle">
        {#if image}
            <enhanced:img
                alt={`${title} - Preview`}
                src={image}
                class="object-cover object-top h-32 w-full mask-[linear-gradient(to_bottom,black,transparent)] -mb-5"
            />
        {/if}
        <div class="flex flex-col gap-2 p-3">
            <TagRenderer tags={tags} />
            <a class="text-ctp-subtext0" href={resolve("/blog/[slug]", { slug })} data-sveltekit-preload-code>
                <h2>{title}</h2>
            </a>
            <DateRenderer {date} />
            {#if description}
                <span class="text-ctp-subtext1">{description}</span>
            {/if}
        </div>
    </div>
{/snippet}

<div class="flex flex-col gap-6 mx-6">
    <header class="flex flex-col gap-5 text-center">
        <div>
            {#if latestPost && latestPost[1].image}
                {@const [slug, meta] = latestPost}

                <button
                    onclick={() => goto(resolve(`/blog/[slug]`, { slug }))}
                    class="h-64 w-full select-none group *:transition-all *:duration-150 *:ease-out *:group-hover:scale-110 cursor-pointer"
                >
                    <div class="relative z-10 top-1/2 -translate-y-1/2 not-group-hover:opacity-0">
                        <h2>Go to latest post</h2>
                        <span class="text-ctp-subtext0">{meta.title}</span>
                    </div>
                    <enhanced:img
                        class="relative object-cover h-full w-full mask-[linear-gradient(to_bottom,black,transparent)] group-hover:brightness-90 group-hover:blur-xs"
                        alt={`${meta.title} - Preview`}
                        src={meta.image!}
                    />
                </button>
            {/if}
            <div class="flex flex-row justify-center items-center gap-3 mt-15">
                <h1 class="inline">Blog Posts</h1>
                <a
                    data-sveltekit-reload
                    href={resolve("/blog/rss.xml")}
                    title="Subscribe to RSS feed"
                ><RssIcon height={30} /></a>
            </div>
            <a href={resolve("/")} class="text-ctp-subtext0">[Go back]</a>
        </div>
        <div class="flex flex-col">
            <span class="text-ctp-subtext0">Search:</span>
            <div class="flex flex-row justify-center gap-5 *:w-max h-24">
                <SearchBox
                    placeholder="...by title/description"
                    bind:value={searchValue}
                />
                <Select
                    title="...by tags"
                    selection={allTags}
                    bind:selected={selectedTags}
                />
            </div>
        </div>
    </header>
    <main class="w-full max-sm:flex max-sm:flex-col sm:grid sm:grid-cols-2 gap-3 border border-ctp-subtext0 bg-ctp-base p-3">
        {#each filteredPosts as post (post[0])}
            {@render postItem(post)}
        {/each}
    </main>
</div>