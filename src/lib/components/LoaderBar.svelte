<script lang="ts">
    import { beforeNavigate, afterNavigate } from "$app/navigation";
    import { loadProgress, startLoading, stopLoading } from "./LoaderBar.svelte.ts";

    beforeNavigate(startLoading)
    afterNavigate(stopLoading)
</script>

<div
    style:opacity={loadProgress.value > 0 ? "100%" : "0%"}
    style:width={`${loadProgress.value}vw`}
    class="fixed z-999 top-0 left-0 transition-all duration-100 ease-out h-0.5 bg-ctp-mauve"
></div>