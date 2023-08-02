<template>
    <div class="mt-28 h-[60vh] xl:h-[50vh] xl:mt-40 flex justify-center items-center">
		<div class="p-11 border-[1px] -mt-10 border-none lg:border-solid border-slate-200 dark:border-zinc-800 dark:bg-zinc-800 rounded-md flex flex-col items-center space-y-3 shadow-sm">
			<div class="w-28 h-28 rounded-full bg-red-300 flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-24 h-24">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        :d="error === 'Invalid redirect_uri' ? 'M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z' : 'M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z'"
                    />
                </svg>
            </div>
              
            <p class="text-lg font-semibold">{{ $t(error) }}</p>
		</div>
	</div>
</template>

<script setup>
const error = useRouter().query?.message || "Internal server error";

useHead({
    htmlAttrs: {
        lang: useI18n().locale
    },
    meta: [
        { property: "description", content: useI18n().t("Connecting the world, allowing freedom, that's what Gravitalia does. Let us connect you!") },
        { property: "og:site_name", content: useI18n().t("Gravitalia Account") },
        { property: "og:title", content: useI18n().t("Gravitalia Account") },
        { property: "og:description", content: useI18n().t("Connecting the world, allowing freedom, that's what Gravitalia does. Let us connect you!") }
    ],
    title: useI18n().t("Authorization error") + " - " + useI18n().t("Gravitalia Account")
});
</script>