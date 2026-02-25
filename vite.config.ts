import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

import svg from "@poppanator/sveltekit-svg"
import { enhancedImages } from "@sveltejs/enhanced-img"


export default defineConfig({
    plugins: [
        enhancedImages(),
        svg(),
        tailwindcss(),
        sveltekit()
    ]
});
