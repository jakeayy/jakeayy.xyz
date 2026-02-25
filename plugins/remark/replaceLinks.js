import { visit } from "unist-util-visit";

/** @returns {import("unified").Plugin} */
export default () => (tree) => {
    let shouldImport = false
    visit(tree, "link", (node) => {
        shouldImport ||= true

        node.data ??= {}
        node.data.hName = "Link"
    });

    if (shouldImport) {
		const scriptCode = 'import Link from "$lib/components/link.svelte"';
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