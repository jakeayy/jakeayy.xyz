<script lang="ts">
    import Check from "$lib/assets/icons/check-2.svg?component"

    type Props = {
        title: string,
        selection: string[],
        selected?: string[],
    }

    let {
        title,
        selection,
        selected = $bindable([])
    }: Props = $props()
</script>

<div class="flex flex-col py-1 gap-1 border-2 border-ctp-subtext0 bg-ctp-base select-none">
    <span class="text-ctp-overlay0">{title}</span>

    <div class="flex flex-row flex-wrap gap-2 justify-center overflow-y-auto max-w-64">
        {#each selection as item (item)}
            {@const isSelected = selected.includes(item)}
            <button
                type="button"
                class="item"
                class:active={isSelected}
                onclick={() => {
                    if (isSelected)
                        selected = selected.filter(x => x !== item)
                    else
                        selected.push(item)
                }}
            >
                {#if isSelected}
                    <Check height="1em" class="inline" />
                {/if}
                {item}
            </button>
        {/each}
    </div>
</div>

<style lang="postcss">
    @reference "@/routes/layout.css";

    .item {
        @apply border text-ctp-text border-ctp-mauve px-2 min-w-16 cursor-pointer transition-colors duration-300;
        &.active { @apply border-ctp-mauve bg-ctp-mauve text-ctp-base; }
    }
</style>