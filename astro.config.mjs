import { defineConfig } from 'astro/config';
import vue from "@astrojs/vue";
import tailwind from "@astrojs/tailwind";
import prefetch from "@astrojs/prefetch";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [vue(), tailwind(), prefetch(), sitemap()],
  adapter: cloudflare({ mode: "directory" }),
  site: "https://account.gravitalia.com/"
});
