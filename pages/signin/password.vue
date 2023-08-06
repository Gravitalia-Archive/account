<template>
    <div class="mt-28 h-[60vh] xl:h-[50vh] xl:mt-40 flex justify-center items-center">
        <div class="p-11 border-[1px] -mt-10 border-none lg:border-solid border-slate-200 dark:border-zinc-800 dark:bg-zinc-800 rounded-md flex flex-col items-center space-y-3 shadow-sm">
            <br />
            <img width="30" height="30" draggable="false" alt="Gravitalia logo" src="/favicon.webp" />
            <p class="pb-11 text-lg font-semibold">{{ $t("Let us connect you!") }}</p>

            <!-- Forgot password message -->
            <div>
				<p class="text-sm max-w-xs">
                    {{ $t("To recover your password, please contact us using the e-mail address for your account. You can reach us via:") }}
                    <a href="mailto:contact@gravitalia.com">contact@gravitalia.com</a>
                </p>

                <p class="pt-2 text-xs max-w-xs text-gray-500 dark:text-gray-400">
                    {{ $t("If you no longer have access to your e-mail address, contact us by the same means, and we'll start another procedure!") }}
                </p>
			</div>

            <!-- Redirection button -->
            <div class="pt-2 flex justify-between w-full">
                <NuxtLink to="/signin" class="text-sm px-2 py-2 bg-indigo-50 dark:bg-opacity-0 dark:border-none outline-none border border-indigo-100 rounded text-indigo-500 dark:text-white font-medium hover:bg-indigo-400 dark:hover:bg-indigo-500 hover:text-white transition-colors duration-200">
                    {{ $t("Sign in") }}
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
useHead({
    htmlAttrs: {
        lang: useI18n().locale
    },
    link: [
        { rel: "canonical", href: `${useRuntimeConfig().public?.SITE_URL || "https://account.gravitalia.com"}/signin/password` }
    ],
    title: useI18n().t("Forgotten password") + " - " + useI18n().t("Gravitalia Account")
});
</script>