<script lang="ts">
    import { untrack, type Component } from "svelte";
    
    import WelcomeSection from "$lib/components/sections/welcome.svelte"
    import AboutSection from "$lib/components/sections/about.svelte"
    import SocialsSection from "$lib/components/sections/socials.svelte"
    import LinksSection from "$lib/components/sections/links.svelte"
    import { HOSTNAME, NAME, SOCIAL_MEDIA, USERNAME } from "$lib/const";
    import { PUBLIC_BASE_URL } from "$env/static/public";
    import avatar from "$lib/assets/avatar.png"

    const ldJson = 	{
		"@context": "https://schema.org",
		"@type": "Person",
		"name": USERNAME,
		"url": PUBLIC_BASE_URL,
		"image": `${PUBLIC_BASE_URL}${avatar}`,
		"description": "I'm a creator of various more or less popular projects that bring entertainment and comfort from doing day-to-day tasks!",
		"sameAs": SOCIAL_MEDIA
			.map(s => s.url)
			.filter(Boolean)
	}
    
    let currentSection = $state<number>(0)
    const SECTIONS: [string, Component][] = [
        ["Welcome", WelcomeSection],
        ["About", AboutSection],
        ["Socials & Contact", SocialsSection],
        ["Useful Links", LinksSection]
    ]

    // rickroll easteregg :b
    type ClickModes = "left" | "right" | "down" | "up" | "b" | "a"
    const TO_CLICK: ClickModes[] = ["up", "up", "down", "down", "left", "right", "left", "right", "b", "a"]
    let clicks: ClickModes[] = []
    let consoleEl: HTMLElement;
    const animate = (mode: ClickModes) => {
        clicks.push(mode)
        if (clicks.every((c, i) => c === TO_CLICK[i])) {
            if (clicks.length === TO_CLICK.length)
                window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_self", "noopener,noreferrer")
        } else {
            clicks = []
            return
        }

        let animation: Record<string, string>[] = [];
        switch (mode) {
            case "left":
            case "right":
                animation = [
                    { transform: `translateX(${mode === "left" ? "-" : ""}100px)` },
                    { transform: "translateX(0)" },
                ]
                break;
            case "up":
            case "down":
                animation = [
                    { transform: `translateY(${mode === "up" ? "-" : ""}100px)` },
                    { transform: "translateY(0)" },
                ]
                break;
            case "b":
                animation = [
                    { transform: "scale(80%)" },
                    { transform: "scale(100%)" },
                ]
                break;
            case "a":
                animation = [
                    { transform: "rotate(360deg) scale(50%)" },
                    { transform: "rotate(0deg) scale(100%)" },
                ]
                break;
        }

        consoleEl.animate(animation, { 
            composite: "replace",
            duration: 300,
            easing: "ease-out"
        })
    }
    
    // rickroll click handle
    $effect(() => {
        const handleClick = ({ key, repeat }: KeyboardEvent) => {
            if (repeat) return

            switch(key) {
                case "ArrowUp": animate("up"); break;
                case "ArrowDown": animate("down"); break;
                case "ArrowLeft": animate("left"); break;
                case "ArrowRight": animate("right"); break;
                case "b": animate("b"); break;
                case "a": animate("a"); break;
            }
        }

        document.addEventListener("keydown", handleClick)
        return () => document.removeEventListener("keydown", handleClick)
    })

    // typewriter animation
    let currentTitle = $state<string>("")
    let typewriterChangeId = 0
    $effect(() => {
        const targetTitle = SECTIONS[currentSection][0];
        let aborted = false;
        const id = ++typewriterChangeId

        untrack(async () => {
            while (currentTitle.length > 0 && id === typewriterChangeId) {
                currentTitle = currentTitle.slice(0, -1)
                await new Promise(r => setTimeout(r, 30))
            }

            while (currentTitle.length < targetTitle.length && id === typewriterChangeId) {
                currentTitle += targetTitle[currentTitle.length]
                await new Promise(r => setTimeout(r, 80))
            }
        })
        return () => { aborted = false; }
    })
</script>

<svelte:head>
    {@html `<script type="application/ld+json">${JSON.stringify(ldJson)}</script>`}
</svelte:head>

<main
    bind:this={consoleEl}
    class="border-2 bg-ctp-base shadow-2xl/60 shadow-crust border-ctp-mauve fixed inset-1/2 -translate-1/2 w-[calc(100vw-1rem)] h-[calc(100vh-1rem)] max-w-2xl max-h-112 flex flex-col"
>
    <span class="p-2 border-b border-ctp-mauve">
        <span class="text-ctp-subtext0">[{NAME.toLowerCase()}@{HOSTNAME} ~]$</span>
        <span class="font-bold">{currentTitle}</span>
    </span>
    <div class="w-full h-full overflow-x-hidden overflow-y-auto *:w-full *:h-full">
        {#each SECTIONS as [, Section], i}
            <section
                style:display={currentSection === i ? "block" : "none"}
            ><Section /></section>
        {/each}
    </div>
    <nav class="flex flex-row justify-between h-12">
        {#each SECTIONS as [sectionName], i}
            {@const isSelected = currentSection === i}
            <button
                class="nav-btn"
                data-selected={isSelected || undefined}
                onclick={() => isSelected || ( currentSection = i )}
            >{sectionName}</button>
        {/each}
    </nav>
</main>

<style lang="postcss">
    @reference "./layout.css";

    .nav-btn {
        @apply w-full h-full transition-all duration-150 border-t border-ctp-mauve;

        &:hover { @apply z-10; }
        &[data-selected], &:hover {
            @apply bg-ctp-mauve text-ctp-base scale-110 shadow-2xl/100;
        }
    }
</style>