<template>
    <Sidebar />

    <div class="p-4 sm:ml-64">
        <div class="p-4 border-2 h-[96vh] border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            <div class="w-full max-w-xl bg-white border border-gray-200 rounded-lg shadow dark:bg-zinc-900 dark:border-zinc-700">
                <div class="pt-6 flex flex-col items-center pb-10">
					<div class="space-y-4">
						<div class="flex justify-center">
							<div @click="avatarPicker" class="flex -space-x-32 cursor-pointer">
								<img @mouseover="avatarHoverShown = true" class="rounded-full w-32 h-32" :src="image.includes('data:image/') ? image : user.avatar ? runtimeConfig.CDN_URL+'/t_avatar/'+user.avatar+'.webp' : `https://www.gravitalia.com/avatar/${user?.username ? user?.username[0].match(/[A-z]/) ? user?.username[0]?.toUpperCase() : 'A' : 'A'}.webp`" />
								<div @mouseleave="avatarHoverShown = false" :class="avatarHoverShown ? 'w-32 h-32 bg-zinc-700/60 rounded-full inset-0 flex justify-center items-center text-white' : 'hidden'">
									<p class="pl-2 text-white font-bold text-sm z-40 mix-blend-normal">
                                        {{ $t("Upload image") }}
                                    </p>
								</div>
							</div>
							<span class="pl-14 absolute">
								<span class="w-6 h-6 bg-gray-200 absolute rounded-full flex justify-center items-center">
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
										<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
									</svg>
								</span>
							</span>
						</div>
						<div class="flex items-center justify-center">
							<p @click="openedUsernameModal = !openedUsernameModal; username = user.username" class="pl-6 cursor-pointer rounded-sm max-w-4 text-xl font-semibold">{{ user.username }}</p>
							<div class="pl-2" @click="openedUsernameModal = !openedUsernameModal; username = user.username">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="cursor-pointer w-5 h-5">
									<path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
								</svg>
							</div>
						</div>
					</div>

                    <div class="mt-20">
                        <p v-if="isError.internal" class="flex justify-center text-red-500">{{ $t("An error has occurred") }}</p>
                        <button
                            @click="saveAvatar"
                            :disabled="loading.saveAvatar || !image.includes('data:image/')"
                            class="px-24 xl:px-56 4xl:px-64 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md disabled:bg-green-600/50 disabled:cursor-not-allowed disabled:hover:bg-green-600/50"
                            v-html='loading.saveAvatar ? `<svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/></svg>` : $t("Save")'
                        ></button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div v-if="openedUsernameModal" class="fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center" style="background: rgba(0,0,0,.7);">
		<div class="border-none shadow-lg bg-white dark:bg-zinc-900 w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
			<div class="py-4 text-left px-6">
				<div class="flex justify-between items-center">
					<p class="text-2xl font-bold">{{ $t("Update username") }}</p>
					<div class="cursor-pointer z-50" @click="openedUsernameModal = false">
						<svg class="fill-current text-black dark:text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
							viewBox="0 0 18 18">
							<path
								d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z">
							</path>
						</svg>
					</div>
				</div>
				<p class="pb-3 text-sm text-gray-500 dark:text-gray-400">
                    {{ $t("Update your username will affect every services.") }}
                </p>
				<div class="my-5">
					<label v-if="isError.username" class="hidden text-sm text-red-500 w-full">{{ $t("Invalid username") }}</label>
					<input class="focus:outline-none text-lg border dark:border-zinc-800 dark:bg-zinc-800 w-full py-2 px-2 rounded-md" :placeholder="user.username" v-model="username" maxlength="25" minlength="1" />
				</div>
				<div class="flex justify-end space-x-2">
                    <button @click="openedUsernameModal = false" type="button" class="px-5 py-2 font-medium text-center text-dark dark:text-white bg-transparent rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                        {{ $t("Cancel") }}
                    </button>

					<button
                        type="button"
                        @click="updateUsername"
                        :disabled="loading.saveUsername || username.length < 2 || username === user.username"
                        class="px-5 py-2 font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 dark:hover:bg-green-700 dark:focus:ring-green-800 disabled:bg-green-600/50 disabled:cursor-not-allowed disabled:hover:bg-green-600/50"
                        v-html='
                            loading.saveUsername ?
                            `<svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/></svg>`
                            : $t("Save")'
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
        { rel: "canonical", href: `${useRuntimeConfig().public?.SITE_URL || "https://account.gravitalia.com"}/` }
    ],
    meta: [
        { property: "description", content: useI18n().t("Connecting the world, allowing freedom, that's what Gravitalia does. Let us connect you!") },
        { property: "og:site_name", content: useI18n().t("Gravitalia Account") },
        { property: "og:title", content: useI18n().t("Gravitalia Account") },
        { property: "og:description", content: useI18n().t("Connecting the world, allowing freedom, that's what Gravitalia does. Let us connect you!") }
    ],
    title: useI18n().t("Gravitalia Account")
});
</script>

<script>
    export default {
        data() {
            return {
                runtimeConfig: useRuntimeConfig().public,
                openedUsernameModal: false,
                avatarHoverShown: false,
                username: "",
                isError: {
                    username: false,
                    internal: false
                },
                loading: {
                    saveUsername: false,
                    saveAvatar: false
                },
                image: "",
                token: useCookie("session").value,
                user: useUser()
            }
        },

        async serverPrefetch() {
            // Fetch user
            await this.user.fetchUser(true);

            // Redirect user if connected
            if(!this.token || this.user.vanity === "") {
                await navigateTo("/signin");
            } else {
                this.image = this.user.avatar;
            }
        },

        methods: {
            avatarPicker() {
                const fileInput = document.createElement("input");
                fileInput.type = "file";
                fileInput.accept = "image/*";
                document.body.appendChild(fileInput);
                fileInput.click();

                fileInput.addEventListener("change", (event) => {
                    const selectedFiles = event.target.files;

                    if (selectedFiles && selectedFiles.length > 0) {
                        const file = selectedFiles[0];
                        if (file.type.startsWith('image/')) {
                            const reader = new FileReader();

                            reader.onload = async (event) => {
                                this.image = event.target.result;
                            };

                            reader.readAsDataURL(file);
                        }
                    }
                });

                document.body.removeChild(fileInput);
            },

            updateUsername() {
                if(this.username.length < 2) return;
                this.loading.saveUsername = true;

                const headers = new Headers();
                headers.append("Authorization", this.token || "");
                headers.append("Content-Type", "application/json");

                fetch(`${this.runtimeConfig.API_URL || "https://oauth.gravitalia.com"}/users/@me`, {
                    method: "PATCH",
                    headers,
                    body: JSON.stringify({
                        username: this.username
                    })
                }).then(res => res.json())
                .then(async (res) => {
                    if(res.message === "Invalid username") this.isError.username = true;
                    else {
                        if(res?.error) this.isError.internal = true;
                        
                        this.loading.saveUsername = false;
                        this.openedUsernameModal = false;

                        this.user.username = this.username;
                        this.username = "";
                    }
                });
            },

            async saveAvatar() {
                if(!this.image.includes("data:image/")) return;
                this.loading.saveAvatar = true;

                const headers = new Headers();
                headers.append("Authorization", this.token || "");
                headers.append("Content-Type", "application/json");

                fetch(`${this.runtimeConfig.API_URL || "https://oauth.gravitalia.com"}/users/@me`, {
                    method: "PATCH",
                    headers,
                    body: JSON.stringify({
                        avatar: Array.from(new Uint8Array(await (await fetch(this.image)).arrayBuffer()))
                    })
                })
                .then(res => res.json())
                .then(res => {
                    if(res?.error) this.isError.internal = true;

                    this.loading.saveAvatar = false;
                });
            }
        }
    }
</script>