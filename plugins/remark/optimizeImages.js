import { visit } from "unist-util-visit";

/** @returns {import("unified").Plugin} */
export default () => (tree) => {
	/** @type {{ name: string, url: string }[]} */
	const images = [];
	visit(tree, "image", (node) => {
		if (!node.url.startsWith("http")) {
			const name = `__img_${images.length}`;
			images.push({ name, url: node.url });
			
			node.data ??= {};
			node.data.hName = "Image";
			node.data.hProperties ??= {};
			node.data.hProperties.src = `{${name}}`;
		}
	});

	if (images.length > 0) {
		const imgImports = images
			.map(img => `import ${img.name} from "${img.url}?enhanced"`)
			.join("\n")
		const scriptCode = `import Image from "$lib/components/EnhancedImage.svelte"\n${imgImports}`;

		const scriptEl = tree.children.find(n =>
			n.type === "html"
			&& n.value.startsWith("<script")
		);

		if (scriptEl)
			scriptEl.value = scriptEl.value
				.replace(/<script.*?>/, (r) => `${r}${scriptCode}\n`);
		else
			tree.children.push({
				type: "html",
				value: `<script lang={"ts"}>${scriptCode}</script>`
			});
	}
};