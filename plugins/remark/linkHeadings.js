import { visit } from "unist-util-visit";

/** @returns {import("unified").Plugin} */
export default () => (tree) => {
    let shouldImport = false
    visit(tree, "heading", (node) => {
        shouldImport ||= true

        node.data ??= {}
        node.data.hName = "Heading"
		node.data.hProperties ??= {};
		node.data.hProperties.depth = node.depth;
		node.data.hProperties.id =
			node.children
				.filter(c => c.type === "text")
				.map(c => c.value)
				.join("-")
				.toLowerCase()
				.replace(/[^a-z0-9-_]/g, "");
    });

    if (shouldImport) {
		const scriptCode = 'import Heading from "$lib/components/blog/LinkedHeading.svelte"';
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
				value: `<script lang="ts">${scriptCode}</script>`
			});
    }
};