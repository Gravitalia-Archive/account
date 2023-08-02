<template>
    <Sidebar />

    <div class="p-4 sm:ml-64">
        <div class="p-4 border-2 h-[96vh] border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            <div class="w-full pt-20 pr-12">
                <div class="flex flex-col items-center justify-center">
                    <img alt="" src="/no_data.svg" width="200" height="200" />
                    <p class="pt-8 text-xl font-bold">{{ $t("No authorized application") }}</p>
                </div>
			</div>
        </div>
    </div>
</template>

<script setup>
const user = useUser();

// Fetch user
await user.fetchUser();

// Redirect user if connected
if(useCookie("session").value && user.vanity === "") {
    await navigateTo("/signin");
}

useHead({
    htmlAttrs: {
        lang: useI18n().locale
    },
    link: [
        { rel: "canonical", href: `${useRuntimeConfig().public?.SITE_URL || "https://account.gravitalia.com"}/oauth` }
    ],
    meta: [
        { property: "description", content: useI18n().t("Connecting the world, allowing freedom, that's what Gravitalia does. Let us connect you!") },
        { property: "og:site_name", content: useI18n().t("Gravitalia Account") },
        { property: "og:title", content: useI18n().t("Gravitalia Account") },
        { property: "og:description", content: useI18n().t("Connecting the world, allowing freedom, that's what Gravitalia does. Let us connect you!") }
    ],
    title: useI18n().t("OAuth") + " - " + useI18n().t("Gravitalia Account")
});
</script>