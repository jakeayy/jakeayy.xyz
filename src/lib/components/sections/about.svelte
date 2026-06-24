<script lang="ts">
    import Avatar from "$lib/assets/img/avatar.avif"
    import { NAME, USERNAME } from "$lib/const";
    import Link from "$lib/components/Link.svelte";
</script>

<div class="grid sm:grid-cols-2 p-5 w-full h-full *:flex *:justify-center *:items-center gap-5">
    <div>
        <div class="border-2 border-ctp-mauve w-max h-max">
            <img class="slow-load select-none avatar" alt="Avatar" src={Avatar} height="250" width="250" />
        </div>
    </div>
    <div>
        <span>
            Hey! My name is <b>{NAME}</b> (aka {USERNAME}) and I'm passionated around various computer topics including
            computer programming, security researching or just creating content!
            <br><br>
            I'm currently most known for projects such as <Link href="https://github.com/jakeayy/gif-validator">Discord GIFs Validator</Link>
            and <Link href="https://codeberg.org/jakeayy/Starshift">my mod loader for <span title="In Stars and Time">ISAT</span>!</Link>
        </span>
    </div>
</div>

<style>
    .slow-load { animation: fake-reveal 1s steps(5) forwards; }
    @keyframes fake-reveal {
        from { clip-path: inset(0 0 100% 0); }
        to { clip-path: inset(0 0 0% 0); }
    }

    @media (prefers-color-scheme: light) {
        .avatar { filter: invert(); }
    }
</style>