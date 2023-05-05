import { defineConfig } from 'astro/config';
import cloudflare from "@astrojs/cloudflare";
import prefetch from "@astrojs/prefetch";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://account.gravitalia.com/",
  output: "server",
  adapter: cloudflare(),
  integrations: [prefetch(), tailwind(), sitemap()]
});