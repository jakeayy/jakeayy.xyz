<script lang="ts">
    import { CONTACT, SOCIAL_MEDIA } from "$lib/const";
    import type { SocialMedia } from "$lib/social";
    import SocialItem from "./socials/socialItem.svelte";
</script>

{#snippet socialCategory(title: string, items: SocialMedia[], titleTemplate?: string)}
    <div class="flex flex-col gap-2">
        <h2>{title}</h2>
        <div class="flex flex-row flex-wrap gap-5 justify-center">
            {#each items as item, i (item.text ?? item.url ?? `${item.type}-${i}`)}
                <SocialItem item={item} titleTemplate={titleTemplate} />
            {/each}
        </div>
    </div>
{/snippet}

<div class="text-center h-full w-full grid sm:grid-cols-2 items-center justify-center px-10 gap-10">
    {@render socialCategory("Social Media", SOCIAL_MEDIA, "Check out {} on {}")}
    {@render socialCategory("Contacts", CONTACT, "Contact {} through {}")}
</div>