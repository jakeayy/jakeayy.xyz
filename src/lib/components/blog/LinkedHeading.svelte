<script lang="ts">
    import type { Snippet } from "svelte";

    type Props = {
        id: string,
        depth: number,
        children?: Snippet
    }

    let { id, depth, children }: Props = $props()
</script>

<a class="group relative" {id} href={`#${id}`}>
    <span class="indicator">#</span>
    <svelte:element
        this={`h${depth}`}
        class="heading"
    >
        {@render children?.()}
    </svelte:element>
</a>

<style lang="postcss">
    @reference "@/routes/layout.css";

    .indicator { @apply absolute top-1/2 -translate-y-1/2 text-ctp-subtext0 text-lg transition-opacity duration-200 ease-out not-group-hover:opacity-0; }
    .heading { @apply relative text-ctp-text transition-transform duration-200 ease-out group-hover:translate-x-5; }
</style>