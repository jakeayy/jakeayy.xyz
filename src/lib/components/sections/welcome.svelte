<script lang="ts">
    import logo from "./fastfetch/logo.txt?raw"
    import config from "./fastfetch/config.json"
    import { HOSTNAME, NAME, BIRTHDAY } from "$lib/const";

    let uptime = $state("")
    function calculateUptime() {
        const now = new Date()

        let years = now.getFullYear() - BIRTHDAY.getFullYear();
        let months = now.getMonth() - BIRTHDAY.getMonth();
        let days = now.getDate() - BIRTHDAY.getDate();

        if (days < 0) {
            months--;
            days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        const parts: string[] = [];
        if (years > 0) parts.push(`${years} ${years === 1 ? 'year' : 'years'}`);
        if (months > 0) parts.push(`${months} ${months === 1 ? 'month' : 'months'}`);
        if (days > 0 || parts.length === 0) parts.push(`${days} ${days === 1 ? 'day' : 'days'}`);

        return parts.join(', ');
    }

    type FetchFragment = { text: string, color?: SupportedColors, bold?: boolean }
    class Fragments extends Array {
        #fragmentState: Omit<FetchFragment, "text"> = { bold: false, color: "text" }

        push(...items: FetchFragment[]): number {
            for (const item of items) {
                const last = this[this.length - 1];

                if (!last) {
                    super.push({ ...this.#fragmentState, ...item });
                    continue;
                }

                const isSameBold = typeof item.bold === "undefined" || item.bold === last.bold;
                const isSameColor = typeof item.color === "undefined" || item.color === last.color;

                if (isSameBold && isSameColor) last.text += item.text;
                else super.push({ ...last, ...item });
            }
            return this.length;
        }
    }

    const COLORS_MAP = {
        "grey": "text-ctp-subtext0",
        "lavender": "text-ctp-lavender",
        "text": "text-ctp-text"
    }
    type SupportedColors = keyof typeof COLORS_MAP

    const MAIN_COLOR: SupportedColors = "lavender"
    const KEY_WIDTH = 20

    const logoLines = logo.split("\n")
    const fragments: FetchFragment[] = new Fragments()
    for (let i = 0; i < config.length; i++) {
        const { type, key, format } = config[i]

        // prepend with logo line
        if (i < logoLines.length - 1)
            fragments.push({ text: logoLines[i], bold: false, color: MAIN_COLOR })

        // add key
        if (key)
            fragments.push({ text: key.padEnd(KEY_WIDTH, " "), bold: true, color: MAIN_COLOR })

        // add value
        switch (type) {
            case "host":
                fragments.push(
                    { text: NAME, bold: true, color: MAIN_COLOR },
                    { text: "@", bold: false, color: "grey" },
                    { text: HOSTNAME, bold: true, color: MAIN_COLOR }
                )
                break
            case "text":
                if (!format) break;
                fragments.push({ text: format, bold: false, color: "text" })
                break;
            case "name":
                fragments.push({ text: NAME, bold: false, color: "text" })
                break;
            case "uptime":
                fragments.push({ text: "{uptime}", bold: false, color: "text" })
                break;
        }

        fragments.push({ text: "\n" })
    }

    // fill rest of lines with logo
    if (config.length < logoLines.length)
        fragments.push({ text: logoLines.slice(config.length).join("\n"), bold: false, color: MAIN_COLOR })

    // update bday on load
    $effect(() => { uptime = calculateUptime() })
</script>

<div class="*:whitespace-pre p-2 overflow-x-auto h-full">
    {#each fragments as { text, bold, color }}
        {@const finalText = text.replaceAll("{uptime}", uptime)}
        <span
            class={[
                ...[ color ? [COLORS_MAP[color]] : [] ],
                ...[ bold ? [ "font-bold" ] : [] ]
            ]}
        >{finalText}</span>
{/each}
</div>