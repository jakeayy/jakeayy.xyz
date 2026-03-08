<script lang="ts">
    import BlogLink from "$lib/assets/img/blog.png?enhanced"
    import ArrowLeft from "$lib/assets/icons/arrow-left.svg?component"
    import ArrowRight from "$lib/assets/icons/arrow-right.svg?component"
    import type { Picture } from "@sveltejs/enhanced-img";
    import { resolve } from "$app/paths";
    import type { Pathname } from "$app/types";

    type Link = {
        title: string,
        image: Picture,
        url: string
    }

    let selectedLink = $state(0)
    const LINKS: Link[] = [
        { title: "Blog Posts", image: BlogLink, url: "/blog" },
    ]
</script>

<div class="relative z-10 top-1/2 -translate-y-1/2 *:absolute *:top-1/2 *:-translate-y-1/2 *:text-ctp-subtext0 *:hover:text-ctp-text">
    <ArrowLeft class={selectedLink > 0 ? "left-0" : "hidden"} height={80} onclick={() => ( selectedLink-- )} />
    <ArrowRight class={selectedLink < (LINKS.length - 1) ? "right-0" : "hidden"} height={80} onclick={() => ( selectedLink++ )} />
</div>

{#each LINKS as { title, image, url }, i (url)}
    <a
        class="overflow-hidden group w-full h-full text-center"
        style:display={selectedLink === i ? "block" : "none"}
        href={resolve(url as Pathname)}
        {title}
    >
        <h1 class="absolute z-10 top-1/2 left-1/2 -translate-1/2 text-ctp-subtext0 transition-all duration-150 ease-out group-hover:text-ctp-text group-hover:scale-110">{title}</h1>
        <enhanced:img
            class="object-cover w-full h-full transition-all duration-150 ease-out not-group-hover:blur-xs group-hover:brightness-90 group-hover:scale-105"
            alt={title} src={image}
        />
    </a>
{/each}