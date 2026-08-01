<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
      text: string,
      position?: "top" | "bottom" | "left" | "right"
      children: Snippet
    }

    let { text = "", position = "top", children }: Props = $props();
    let visible = $state(false);

    const id = $props.id();
    const anchorName = `--tooltip-anchor-${id}`;
    const tooltipId = `tooltip-${id}`;
</script>

<span
    class="tooltip-anchor"
    style:anchor-name={anchorName}
    aria-describedby={visible ? tooltipId : undefined}
    role="tooltip"
    onmouseenter={() => (visible = true)}
    onmouseleave={() => (visible = false)}
    onfocus={() => (visible = true)}
    onblur={() => (visible = false)}
>
    {@render children()}
</span>

{#if visible}
    <span
        id={tooltipId}
        class="tooltip"
        role="tooltip"
        style:position-anchor={anchorName}
        style:--position-area={position}
    >
        {text}
    </span>
{/if}

<style lang="postcss">
    @reference "@/routes/layout.css";

    .tooltip-anchor {
        @apply inline-block;

        & > :global(p), & > :global(span) {
            @apply decoration-2 underline decoration-dotted hover:decoration-solid underline-offset-3;
        }
    }

    .tooltip {
        @apply fixed m-0 z-1000 px-2 py-1 bg-canvas/90 text-fg text-sm whitespace-pre pointer-events-none;
        position-area: var(--position-area, top);
        position-try-fallbacks: flip-block, flip-inline;
    }

    /* fallback */
    @supports not (position-anchor: --a) {
        .tooltip-anchor { @apply relative; }
        .tooltip { @apply absolute top-auto bottom-full left-1/2 -translate-x-1/2 -translate-y-1.5; }
    }
</style>
