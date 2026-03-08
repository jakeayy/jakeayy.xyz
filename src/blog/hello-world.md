---
title: Hello World - How I made my first blog!
date: 2026-03-08
description: How I created my blog site in a nice to maintain way with Svelte and MDsveX!
image: assets/hello-world.png
tags: ["blog", "typescript", "svelte"]
published: true
---

Hello everyone reading this post! This will be a small test of the first experiment I've ever done - making my own blog site from scratch!

At first, I didn't even think about making a blog part of my site at all. I just needed some sort of "home page" for me as a person and my work, and I actually built a fairly large part of my site before I decided to start making this one.

But the idea came up not even from the website topic itself. I was experimenting with my phone - a Samsung Galaxy A20e - and tried to install Android 14 on it, which is still a bit outdated but definitely less so than Android 11, which was the last official update for my phone. My first idea for a post was to make an actual comprehensive list with all the things you should know if you have Samsung Galaxy A20-like phones, such as methods of rooting, currently up-to-date ROMs, etc. It's very possible that when I publish this post, I'll start making a post about that and another one about using Termux as a server. (...so keep an eye on this page!)

Back to the topic, I decided that for my first post, I'll try to explain how I even created this blog at all.

For the simplest blog posts, you don't even need a server! It'll very likely work perfectly on GitHub Pages - just keep in mind that your page will be static and you'll have to rebuild it whenever you add new content.


## Prerequisites
This guide is prepared the way as if I was making the site, as it looks like the most maintainable way for me without having to pay for professional databases, VPSes, and such. **You don't need to follow it 1-to-1 and you should always do your own research before deciding!** The more creative way usually is better for you and possibly for the people visiting it!

And as always, you can visit the [GitHub repo of this project](https://github.com/jakeayy/jakeayy-xyz) if you want to get inspired by something! (Credits optional but welcome!)

What you'll need for a setup like the one I have is:
- Some basic web dev knowledge (duh)
- [A Svelte project](https://svelte.dev/) - My website is done using it, so my knowledge will be currently focused on this stack. You can try other ones if the dependencies below support it (or if you have enough knowledge to possibly make your own!)
- [MDsveX](https://github.com/pngwn/MDsveX) - The main solution for this guide, a preprocessor for Svelte that converts Markdown into highly customizable Svelte snippets.

## Easiest Setup
If you want to get up and running as fast as possible, you can just let MDsveX turn your markdown files directly into Svelte routes. 

Assuming you already have a fresh SvelteKit project set up (if not, you can run `bun create svelte@latest my-blog`), you'll first need to install MDsveX as a dev dependency:

```bash
bun add -d mdsvex
```

Next, open your `svelte.config.js` and tell Svelte to use MDsveX to preprocess your files, keeping an eye out for `.md` or `.svx` extensions:

```javascript
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // vvv mdsvex preprocessors vvv
    extensions: ['.svelte', '.md', '.svx'],
    preprocess: [
        vitePreprocess(),
        mdsvex({
            extensions: ['.md', '.svx']
        })
    ],
    kit: {
        adapter: adapter()
    }
};

export default config;
```

With this setup, you can literally just create a file at `src/routes/my-first-post/+page.md`, write standard markdown in it, and SvelteKit will automatically turn it into a webpage!

## More Advanced Use

While the easy setup is cool, throwing every single markdown file into your `src/routes` folder can get super messy if you plan to write a lot and possibly include other sections on your page than just a blog. A much cleaner way is keeping your posts inside a separate directory like `src/blog` and loading them into a dynamic endpoint!

First, let's make a dynamic route in SvelteKit. Create a folder at `src/routes/blog/[slug]`. Inside this folder, we need a `+page.ts` (to load the data) and a `+page.svelte` (to display it).

Here is what our `+page.ts` looks like. This script grabs the slug from the URL and dynamically imports the matching `.md` file from our `src/blog` folder:

```typescript
import { error } from '@sveltejs/kit';

export async function load({ params }) {
    try {
        // dynamically imports the markdown file using the slug from URL
        const post = await import(`../../../blog/${params.slug}.md`);
        
        return {
            content: post.default, // compiled markdown
            meta: post.metadata    // frontmatter metadata e.g. title, publish date, etc.
        };
    } catch (e) {
        throw error(404, `Could not find the post: ${params.slug}`);
    }
}

```

Now, we just render it in our `+page.svelte`:

```svelte
<script lang="ts">
    let { data } = $props();
</script>

<article>
    <h1>{data.meta.title}</h1>
    <p>Published on: {data.meta.date}</p>
    
    <hr />
    
    {@render data.content?.()}
</article>

```

### Static hosting

If you want to host this on GitHub Pages without a Node server, just add `export const prerender = true;` to your `+page.ts`. When you run `bun run build`, SvelteKit will crawl your links and bake out those dynamic endpoints into fast, static HTML files!

## Alternatives?

Obviously, if you want to keep it **extremely simple**, you can always just let services such as [GitHub Pages](https://pages.github.com/) autogenerate everything using [GitHub Workflows](https://docs.github.com/en/actions/how-tos/write-workflows) on your repo. One of the default templates does that and turns `.md` files into webpages viewable from the browser, and you could make an autogenerated main page that lists all of them.

You can even use no preprocessors at all! You can just go with good old HTML like:

```html
<html>
    <head>
        <title>My blog post</title>
    </head>
    <body>
        <h1>My blog post</h1>
        <p>Hello world!</p>
    </body>
</html>

```

...but you probably should use a preprocessor for your own comfort at maintaining it, and to not lose any possible optimizations given by the previous solutions.
