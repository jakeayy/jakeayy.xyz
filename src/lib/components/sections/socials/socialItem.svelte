<script lang="ts">
    import Link from "$lib/components/Link.svelte";
    import { NAME } from "$lib/const";
    import { ICON_MAP, type SocialMedia } from "$lib/social";
    import CheckIcon from "$lib/assets/icons/check.svg?component"
    import CrossIcon from "$lib/assets/icons/cross.svg?component"
    import Tooltip from "../../Tooltip.svelte";

    type Props = { item: SocialMedia, titleTemplate?: string }

    let { item, titleTemplate }: Props = $props()

    let actionState = $state<boolean | null>(null)

    let Icon = $derived(
            actionState === null
                ? ICON_MAP[item.type]
                : (actionState ? CheckIcon : CrossIcon)
        )
    let typeFormatted = $derived(item.type.replace(/^[a-z]/, s => s.toUpperCase()))
    let title = $derived(
        (titleTemplate ?? `Visit ${typeFormatted}`)
            .replace("{}", NAME)
            .replace("{}", typeFormatted)
        + `\n(${item.text ?? item.url?.replace(/^(https?:\/\/(www\.)?)|(mailto:)/, "")})`
    )
    let shouldCopy = $derived(typeof item.url !== "string")

    async function handleClick(event: MouseEvent, item: SocialMedia) {
        // ignore if clicked empty event/link
        if (!shouldCopy || !item.text)
            return

        event.preventDefault()

        // currently has a state
        if (actionState) return;

        actionState = await navigator.clipboard.writeText(item.text)
            .then(() => true)
            .catch(e => {
                alert("There was an error copying a text! No permissions, perhaps? (Check console for more info)")
                console.error("Could not copy to clipboard", e)
                return false
            })

        setTimeout(() => ( actionState = null ), 1000)
    }
</script>

<Tooltip text={actionState === null ? title : actionState ? "Copied!" : "Failed to copy..."}>
    <Link
        href={item.url ?? "#"}
        onclick={(event) => handleClick(event, item)}
        class={[
                "transition-colors duration-200",
                actionState === null
                    ? "text-muted hover:text-fg"
                    : (actionState ? "text-fg" : "text-accent")
            ]}
    >
        <Icon height={40}/>
    </Link>
</Tooltip>
