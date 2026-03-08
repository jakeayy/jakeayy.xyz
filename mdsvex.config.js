import { escapeSvelte } from "mdsvex";
import { getSingletonHighlighter } from "shiki";

import remarkOptimizeImages from "./plugins/remark/optimizeImages.js"
import remarkReplaceLinks from './plugins/remark/replaceLinks.js';
import remarkLinkHeadings from "./plugins/remark/linkHeadings.js"


async function highlighter(code, lang = 'text') {
    const shiki = await getSingletonHighlighter({
        themes: ["catppuccin-mocha"],
        langs: ['javascript', 'typescript', 'svelte', 'bash', 'html']
    });

    const html = escapeSvelte(
        shiki.codeToHtml(code, { 
            lang, 
            theme: "catppuccin-mocha",
        })
    );
    
    return `{@html \`${html}\` }`;
}

/** @type {import("mdsvex").MdsvexOptions} */
const config = {
    extensions: ['.svx', '.md'],
    remarkPlugins: [remarkOptimizeImages, remarkReplaceLinks, remarkLinkHeadings],
    highlight: { highlighter }
}

export default config;