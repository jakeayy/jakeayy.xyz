<script lang="ts">
    import ClockIcon from "$lib/assets/icons/clock.svg?component"

    type Props = {
        date: Date
    }

    let { date }: Props = $props()
</script>

<span><ClockIcon height="20" class="inline mr-1" />Published on: {date.toDateString()}</span>