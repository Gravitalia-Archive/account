// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            htmlAttrs: {
                lang: "en"
            },
            charset: "utf-8",
            viewport: "width=device-width,initial-scale=1",
            title: "Gravitalia Account",
            meta: [
                { property: "description", content: "Connecting the world, allowing freedom, that's what Gravitalia does. Let us connect you!" },
                { property: "og:type", content: "website" },
                { property: "og:site_name", content: "Gravitalia Account" },
                { property: "og:title", content: "Gravitalia Account" },
                { property: "og:description", content: "Connecting the world, allowing freedom, that's what Gravitalia does. Let us connect you!" },
                { property: "og:image", content: "/favicon.webp" },
                { name: "theme-color", content: "#332b43" },
                { name: "robots", content: "index, follow" },
                { name: "twitter:card", content: "summary" },
                { name: "twitter:site", content: "@gravitaliainc" }
            ],
            link: [
                { rel: "icon", type: "image/webp", href: "/favicon.webp" }
            ],
            script: [
                { innerHTML: '"serviceWorker"in navigator&&navigator.serviceWorker.register("/sw.js",{scope:"/"});' }
            ],
            bodyAttrs: {
                class: "dark:bg-zinc-900 dark:text-white"
            }
        }
    },

    ssr: true,
    components: true,
    modules: [
        "@nuxtjs/tailwindcss",
        "@pinia/nuxt",
        ["@nuxtjs/turnstile", {
            siteKey: "0x4AAAAAAABG7Pcx4-fniaty"
        }],
        ["@nuxtjs/i18n", {
            defaultLocale: "en",
            compilation: {
                strictMessage: false,
                escapeHtml: true
            },
            strategy: "no_prefix",
            lazy: false,
            langDir: "lang",
            detectBrowserLanguage: {
                useCookie: true,
                cookieKey: "lang",
                redirectOn: "root",
                fallbackLocale: "en",
                alwaysRedirect: true
            },
            locales: [
                {
                    code: "en",
                    iso: "en-US",
                    file: "en-US.json",
                    name: "English"
                },
                {
                    code: "fr",
                    iso: "fr-FR",
                    file: "fr-FR.json",
                    name: "Français"
                }
            ],   
            baseUrl: "https://account.gravitalia.com"
        }],
        ["@nuxtjs/color-mode", {
            preference: 'system',
            fallback: 'light',
            hid: 'color-script',
            globalName: '__NUXT_COLOR_MODE__',
            componentName: 'ColorScheme',
            classPrefix: '',
            classSuffix: '',
            storageKey: 'mode'
        }]
    ],

    imports: {
        dirs: ['./stores'],
    },
    
    pinia: {
        autoImports: ['defineStore', 'acceptHMRUpdate'],
    },

    runtimeConfig: {
        public: {
            API_URL: "https://oauth.gravitalia.com",
            CDN_URL: "https://res.cloudinary.com/dimtq5hwr/image/upload/s--4SMIfypA--",
            SITE_URL: "https://account.gravitalia.com"
        }
    },

    nitro: {
        preset: 'cloudflare'
    }
});
