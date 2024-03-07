import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import adapter from "@sveltejs/adapter-netlify";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
			$components: "./src/lib/components",
			$utils: "./src/lib/utils",
			$stores: "./src/lib/stores",
		},
	},

	preprocess: [vitePreprocess({})],
};

export default config;
