<script lang="ts">
    import type { HTMLAnchorAttributes } from "svelte/elements";

    const { children, ...props }: HTMLAnchorAttributes = $props()
</script>
<a {...props} target="_blank" rel="noreferrer noopener">{@render children?.()}</a>