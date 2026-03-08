<script lang="ts">
    import Search from "$lib/assets/icons/search.svg?component"
    import Cross from "$lib/assets/icons/cross-2.svg?component"

    type Props = {
        value?: string,
        placeholder?: string
    }

    let {
        value = $bindable(""),
        placeholder
    }: Props = $props();
</script>

<div class="bg-ctp-base flex flex-row items-center gap-3 border-2 border-ctp-subtext0 group focus-within:border-ctp-text p-3 h-max">
    <Search height="1em" />
    <input
        class="w-full h-full focus:outline-0"
        type="search"
        maxlength="100"
        bind:value={value}
        {placeholder}
    />
    <button
        title="Clear input"
        class="clear-btn"
        class:active={value.length > 0}
        onclick={() => ( value = "" )}
    ><Cross height="1em" /></button>
</div>

<style lang="postcss">
    @reference "@/routes/layout.css";

    .clear-btn {
        @apply cursor-pointer;
        &:not(.active) { @apply invisible pointer-events-none; }
    }
</style>