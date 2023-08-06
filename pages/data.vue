<template>
    <!-- Cloudflare Turnstile implementation -->
    <NuxtTurnstile v-model="token" />

    <!-- Sidebar component -->
    <Sidebar />

    <!-- Cards -->
    <div class="p-4 sm:ml-64">
        <div class="p-4 border-2 h-[96vh] border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            <div class="grid gap-4 grid-cols-1 md:grid-cols-2">
                <div>
                    <h3 class="font-semibold text-lg pb-2">
                        {{ $t("Delete your account") }}
                    </h3>

                    <div class="w-full px-4 max-h-60 md:max-h-48 2xl:w-3/4 2xl:max-h-60 bg-white border border-gray-200 rounded-lg shadow dark:bg-zinc-900 dark:border-zinc-700">
                        <div class="pt-6 flex flex-col items-center pb-10">
                            <p class="text-sm text-gray-700 dark:text-white">
                                {{ $t("Doing so will INSTANTLY and automatically delete ALL service data associated with your account. You will be able to recover your main account within 30 days.") }}
                            </p>
                        
                            <div class="pt-11 2xl:pt-20 w-full">
                                <button @click="isError.password = false; openedDeleteModal = !openedDeleteModal" class="text-sm mt-auto w-full py-2 bg-red-50 dark:bg-opacity-0 dark:border-none outline-none border border-red-100 rounded text-red-500 dark:text-white font-medium hover:bg-red-400 dark:hover:bg-red-500 hover:text-white transition-colors duration-200">
                                    {{ $t("Delete account") }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 class="font-semibold text-lg pb-2">
                        {{ $t("Download my data") }}
                    </h3>

                    <div class="w-full px-4 max-h-60 md:max-h-48 2xl:w-3/4 2xl:max-h-60 bg-white border border-gray-200 rounded-lg shadow dark:bg-zinc-900 dark:border-zinc-700">
                        <div class="pt-6 flex flex-col items-center pb-10">
                            <p class="text-sm text-gray-700 dark:text-white">
                                {{ $t("Data can be downloaded every 48 hours. They do not include data from the services you use.") }}
                            </p>
                            
                            <div class="pt-12 2xl:pt-24 w-full">
                                <button @click="isError.password = false; openedDownloadModal = !openedDownloadModal" class="text-sm mt-auto w-full py-2 bg-violet-100 dark:bg-opacity-0 dark:border-none outline-none border border-violet-100 rounded text-violet-500 dark:text-white font-medium hover:bg-violet-400 dark:hover:bg-violet-500 hover:text-white transition-colors duration-200">
                                    {{ $t("Download my data") }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Delete account modal -->
    <div v-if="openedDeleteModal" class="fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center" style="background: rgba(0,0,0,.7);">
		<div class="border-none shadow-lg bg-white dark:bg-zinc-900 w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
			<div class="py-4 text-left px-6">
				<div class="flex justify-between items-center">
					<p class="text-2xl font-bold">{{ $t("Delete account") }}</p>
					<div class="cursor-pointer z-50" @click="openedDeleteModal = false">
						<svg class="fill-current text-black dark:text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
							viewBox="0 0 18 18">
							<path
								d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z">
							</path>
						</svg>
					</div>
				</div>
				<p class="pb-3 text-sm text-gray-500 dark:text-gray-400">
                    {{ $t("Deleting your account will affect all services.") }}

                    <br /><br />

                    {{ $t("Doing so will INSTANTLY and automatically delete ALL service data associated with your account. You will have the option of recovering your main account within 30 days.") }}

                    <br /><br />

                    {{ $t("All accounts of other services will be completely deleted (comments, publications...), and without delay. To proceed, type your password in the following entry.") }}
                </p>
                
				<div class="my-5">
					<label v-if="isError.password" class="text-sm text-red-500 w-full">{{ $t("Invalid password") }}</label>
                    <label v-else class="text-sm">{{ $t("Password") }}</label>
					<input
                        type="password"
                        v-model="password"
                        :placeholder="$t('Password')"
                        :class="isError.password ? 'focus:outline-none border border-red-500 dark:bg-zinc-800 w-full py-2 px-2 rounded-md' : 'focus:outline-none border dark:border-zinc-800 dark:bg-zinc-800 w-full py-2 px-2 rounded-md'"
                        minlength="1"
                    />
				</div>

				<div class="flex justify-end space-x-2">
                    <button @click="openedDeleteModal = false" type="button" class="px-5 py-2 font-medium text-center text-dark dark:text-white bg-transparent rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                        {{ $t("Cancel") }}
                    </button>

					<button
                        type="button"
                        @click="deleteAccount"
                        :disabled="loading.delete"
                        class="px-5 py-2 font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:hover:bg-red-700 dark:focus:ring-red-800 disabled:bg-red-600/50 disabled:cursor-not-allowed disabled:hover:bg-red-600/50"
                        v-html='
                            loading.delete ?
                            `<svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/></svg>`
                            : $t("Confirm")'
                    ></button>
				</div>
			</div>
		</div>
	</div>

    <!-- Download modal -->
    <div v-if="openedDownloadModal" class="fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center" style="background: rgba(0,0,0,.7);">
		<div class="border-none shadow-lg bg-white dark:bg-zinc-900 w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
			<div class="py-4 text-left px-6">
				<div class="flex justify-between items-center">
					<p class="text-2xl font-bold">{{ $t("Download my data") }}</p>
					<div class="cursor-pointer z-50" @click="openedDownloadModal = false">
						<svg class="fill-current text-black dark:text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
							viewBox="0 0 18 18">
							<path
								d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z">
							</path>
						</svg>
					</div>
				</div>
				<p class="pb-3 text-sm text-gray-500 dark:text-gray-400">
                    {{ $t("Data can be downloaded every 48 hours. They do not include data from the services you use.") }}
                </p>
                
				<div class="my-5">
					<label v-if="isError.password" class="text-sm text-red-500 w-full">{{ $t("Invalid password") }}</label>
                    <label v-else class="text-sm">{{ $t("Password") }}</label>
					<input
                        type="password"
                        v-model="password"
                        :placeholder="$t('Password')"
                        :class="isError.password ? 'focus:outline-none border border-red-500 dark:bg-zinc-800 w-full py-2 px-2 rounded-md' : 'focus:outline-none border dark:border-zinc-800 dark:bg-zinc-800 w-full py-2 px-2 rounded-md'"
                        minlength="1"
                    />
				</div>

				<div class="flex justify-end space-x-2">
                    <button @click="openedDownloadModal = false" type="button" class="px-5 py-2 font-medium text-center text-dark dark:text-white bg-transparent rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                        {{ $t("Cancel") }}
                    </button>

					<button
                        type="button"
                        @click="downloadData"
                        :disabled="loading.download"
                        class="px-5 py-2 font-medium text-center text-white bg-violet-600 rounded-lg hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-violet-300 dark:hover:bg-violet-700 dark:focus:ring-violet-800 disabled:bg-violet-600/50 disabled:cursor-not-allowed disabled:hover:bg-violet-600/50"
                        v-html='
                            loading.download ?
                            `<svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/></svg>`
                            : $t("Download")'
                    ></button>
				</div>
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
        { rel: "canonical", href: `${useRuntimeConfig().public?.SITE_URL || "https://account.gravitalia.com"}/data` }
    ],
    meta: [
        { property: "description", content: useI18n().t("Connecting the world, allowing freedom, that's what Gravitalia does. Let us connect you!") },
        { property: "og:site_name", content: useI18n().t("Gravitalia Account") },
        { property: "og:title", content: useI18n().t("Gravitalia Account") },
        { property: "og:description", content: useI18n().t("Connecting the world, allowing freedom, that's what Gravitalia does. Let us connect you!") }
    ],
    title: useI18n().t("Data") + " - " + useI18n().t("Gravitalia Account")
});
</script>

<script>
    export default {
        data() {
            return {
                openedDeleteModal: false,
                openedDownloadModal: false,
                isError: {
                    password: false
                },
                loading: {
                    delete: false,
                    download: false
                },
                password: "",
                token: "",
                user: useUser()
            }
        },

        async mounted() {
            // Fetch user
            await this.user.fetchUser(true);
        },

        methods: {
            deleteAccount() {
                // Reset error
                this.isError.password = false;

                // If no password or token is present, show error
                if(this.password === "" || this.token === "") return this.isError.password = true;

                // Set deleting as loading
                this.loading.delete = true;

                fetch(`${useRuntimeConfig().public.API_URL || "https://oauth.gravitalia.com"}/users/@me`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": useCookie("session").value,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        password: this.password,
                        security_token: this.token
                    })
                }).then(res => res.json())
                .then(async (res) => {
                    if(res.error) {
                        // Show error
                        this.isError.password = true;

                        // Remove loading
                        this.loading.delete = false;

                        // Generate new token
                        this.$turnstile.reset();
                    } else {
                        await this.user.logout();
                        await navigateTo("/signin");
                    }
                });
            },

            downloadData() {
                // Reset error
                this.isError.password = false;

                // If no password or token is present, show error
                if(this.password === "" || this.token === "") return this.isError.password = true;

                // Set deleting as loading
                this.loading.download = true;

                fetch(`${useRuntimeConfig().public.API_URL || "https://oauth.gravitalia.com"}/account/data`, {
                    method: "POST",
                    headers: {
                        "Authorization": useCookie("session").value,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        password: this.password,
                        security_token: this.token
                    })
                }).then(res => res.json())
                .then(res => {
                    if(res?.error) {
                        // Show error
                        this.isError.password = true;

                        // Remove loding
                        this.loading.download = false;

                        // Re-generate Cloudflare Turnstile token
                        this.$turnstile.reset();
                    } else {
                        // Create blob
                        const blob = new Blob(
                            [
                                JSON.stringify(res)
                            ],
                            {
                                type: 'application/json'
                            }
                        );

                        // Create element
                        const url = URL.createObjectURL(blob);

                        const link = document.createElement("a");
                        link.href = url;
                        link.download = "data.json";

                        // Add element into body
                        document.body.appendChild(link);

                        // Artifical click (for download file)
                        link.click();

                        // Delete element
                        document.body.removeChild(link);

                        URL.revokeObjectURL(url);
                        
                        // Close modal
                        this.openedDownloadModal = false;

                        // Remove loding
                        this.loading.download = false;
                    }
                });
            }
        }
    }
</script>