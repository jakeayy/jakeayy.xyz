<script lang="ts">
    import { resolve } from "$app/paths";
    import type { Pathname } from "$app/types";

    type Props = {
        tags?: string[]
    }

    let { tags }: Props = $props()
</script>

{#if tags && tags.length > 0}
    <div class="flex flex-row flex-wrap gap-2 *:border-ctp-subtext0 *:border *:px-2">
        {#each tags as tag (tag)}
            <a
                href={resolve(`/blog?tags=${tag}` as Pathname)}
                class="text-ctp-subtext0"
            >{tag}</a>
        {/each}
    </div>
{/if}