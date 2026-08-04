import { visit } from "unist-util-visit";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const TWEET_URL_RE = /^https?:\/\/(?:www\.)?(?:twitter\.com|x\.com)\/(\w{1,15})\/status\/(\d+)(?:[/?].*)?$/i;

const CACHE_DIR = path.resolve(".tweet-cache");

function getSyndicationToken(id) {
	return ((Number(id) / 1e15) * Math.PI).toString(36).replace(/(0+|\.)/g, "");
}

// cdn.syndication.twimg.com - source: react-tweet
async function fetchTweetRaw(id) {
	const token = getSyndicationToken(id);
	const res = await fetch(
		`https://cdn.syndication.twimg.com/tweet-result?id=${id}&token=${token}`
	);

	if (!res.ok) throw new Error(`syndication request failed with status ${res.status}`);

	const json = await res.json();

	if (json?.type === "error" || json?.__typename === "TweetTombstone")
		throw new Error("tweet unavailable (deleted, protected, or not found)");

	return json;
}

function normalizeTweet(raw, url, id) {
	const photos = (raw.photos ?? [])
		.map((p) => p?.url)
		.filter(Boolean);

	const bestVideoVariant = (raw.video?.variants ?? [])
		.filter((v) => v.type === "video/mp4")
		.sort((a, b) => (b.bitrate ?? 0) - (a.bitrate ?? 0))[0];

	return {
		id,
		url,
		text: raw.text ?? null,
		authorName: raw.user?.name ?? null,
		authorHandle: raw.user?.screen_name ?? null,
		avatarUrl: raw.user?.profile_image_url_https ?? null,
		photos,
		video: bestVideoVariant
			? { src: bestVideoVariant.src, poster: raw.video?.poster ?? null }
			: null,
	};
}

async function fetchTweet(url, id) {
	const cachePath = path.join(CACHE_DIR, `${id}.json`);

	if (existsSync(cachePath)) {
		try {
			return JSON.parse(await readFile(cachePath, "utf-8"));
		} catch {
			// corrupt cache entry
		}
	}

	const raw = await fetchTweetRaw(id);
	const data = normalizeTweet(raw, url, id);

	await mkdir(CACHE_DIR, { recursive: true });
	await writeFile(cachePath, JSON.stringify(data), "utf-8");

	return data;
}

function extractTweetUrls(node) {
	const urls = [];

	for (const child of node.children) {
		if (child.type === "link") {
			if (!TWEET_URL_RE.test(child.url)) return null;
			urls.push(child.url);
			continue;
		}

		if (child.type === "text") {
			const lines = child.value.split("\n").map((l) => l.trim()).filter(Boolean);
			for (const line of lines) {
				if (!TWEET_URL_RE.test(line)) return null;
				urls.push(line);
			}
			continue;
		}

		return null;
	}

	return urls.length > 0 ? urls : null;
}

function buildTweetNode(varName) {
	return {
		type: "paragraph",
		children: [],
		data: {
			hName: "Tweet",
			hProperties: { data: `{${varName}}` },
		},
	};
}

/** @returns {import("unified").Plugin} */
export default () => async (tree) => {
	/** @type {{ parent: any, index: number, urls: string[] }[]} */
	const matches = [];

	visit(tree, "paragraph", (node, index, parent) => {
		if (!parent || index == null) return;

		const urls = extractTweetUrls(node);
		if (!urls) return;

		matches.push({ parent, index, urls });
	});

	if (matches.length === 0) return;

	const embeds = matches.flatMap((match) =>
		match.urls.map((url) => ({ url, id: url.match(TWEET_URL_RE)[2] }))
	);

	const tweets = await Promise.all(
		embeds.map(async ({ url, id }) => {
			try {
				return await fetchTweet(url, id);
			} catch (err) {
				console.warn(`[embedTweets] failed to fetch ${url}: ${err.message}`);
				return {
					id, url, text: null, authorName: null, authorHandle: null,
					avatarUrl: null, photos: [], video: null,
				};
			}
		})
	);

	const varNames = embeds.map((_, i) => `__tweet_${i}`);

	// re-group the flat var-name list back per source paragraph
	let cursor = 0;
	const namesByMatch = matches.map((m) => {
		const names = varNames.slice(cursor, cursor + m.urls.length);
		cursor += m.urls.length;
		return names;
	});

	const byParent = new Map();
	matches.forEach((match, i) => {
		const group = byParent.get(match.parent) ?? [];
		group.push({ index: match.index, names: namesByMatch[i] });
		byParent.set(match.parent, group);
	});

	for (const [parent, group] of byParent) {
		group
			.sort((a, b) => b.index - a.index)
			.forEach(({ index, names }) => {
				parent.children.splice(index, 1, ...names.map(buildTweetNode));
			});
	}

	const scriptCode = [
		'import Tweet from "$lib/components/Tweet.svelte"',
		...tweets.map((t, i) => {
			const json = JSON.stringify(t).replace(/</g, "\\u003c");
			return `const ${varNames[i]} = ${json};`;
		}),
	].join("\n");

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
};
