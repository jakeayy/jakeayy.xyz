<script>
	let { src, alt, ...rest } = $props();
</script>

<enhanced:img {src} {alt} {...rest} />
