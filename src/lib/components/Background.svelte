<script lang="ts">
    import bgVideo from "$lib/assets/vid/bg.webm"
    import bgVideoPoster from "$lib/assets/img/bg.webm-poster.webp"
</script>

<video
    class="fixed left-0 top-0 -z-10 w-full h-full object-cover blur-xs brightness-25"
    autoplay muted loop playsinline poster={bgVideoPoster}
>
    <source src={bgVideo} type="video/webm" />
</video>
