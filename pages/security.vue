<template>
    <!-- Sidebar component -->
    <Sidebar />

    <!-- Cards -->
    <div class="p-4 sm:ml-64">
        <div class="p-4 border-2 h-[96vh] border-gray-200 border-dashed rounded-lg dark:border-gray-700">
			<p class="font-semibold text-lg pb-2">{{ $t("Update personal data") }}</p>
			<div class="border dark:border-zinc-800 dark:bg-zinc-800 shadow-xs w-full lg:w-2/5 h-min rounded-md">
                <p @click="openModal('email')" class="px-4 py-3 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer">
                    <span class="text-gray-500 dark:text-gray-300 text-sm">{{ user.email || $t("Email address") }}</span>
                    <span class="text-md">{{ $t("Update your email address") }}</span>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </span>
                    </p>

                <hr />

                <p @click="openModal('birthdate')" class="px-4 py-3 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer">
                    <span class="text-gray-500 dark:text-gray-300 text-sm">{{ $t("Birthday") }}</span>
                    <span class="text-md">{{ $t("Not set") }}</span>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </span>
                </p>

				<!-- <hr />

                <p @click="openModal('phone')" class="px-4 py-3 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer">
                    <span class="text-gray-500 text-sm">{{ $t("Phone") }}</span> 
                    <span class="text-md">{{ $t("Not set") }}</span>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </span>
                </p> -->

                <hr />

                <p @click="openModal('password')" class="px-4 py-3 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer">
                    <span class="text-gray-500 dark:text-gray-300 text-sm">{{ $t("Password") }}</span>
                    <span class="text-md">••••••••••••••</span>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </span>
                </p>
			</div>
        </div>
    </div>

    <!-- Modal -->
    <div v-if="openedModal" class="fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center" style="background: rgba(0,0,0,.7);">
		<div class="border-none shadow-lg bg-white dark:bg-zinc-900 w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
			<div class="py-4 text-left px-6">
				<div class="flex justify-between items-center">
					<p v-if="modalType === 'email'" class="text-2xl font-bold">{{ $t("Update email") }}</p>
                    <p v-else-if="modalType === 'birthdate'" class="text-2xl font-bold">{{ $t("Update birthdate") }}</p>
                    <p v-else-if="modalType === 'password'" class="text-2xl font-bold">{{ $t("Update password") }}</p>

				    <div class="cursor-pointer z-50" @click="openedModal = false">
						<svg class="fill-current text-black dark:text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
						    <path
								d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z">
						    </path>
						</svg>
					</div>
				</div>
				<p class="pb-3 text-sm text-gray-500 dark:text-gray-400">
                     <span v-if="modalType === 'password'">
                         {{ $t("At least 8 characters with numbers and symbols") }}
                     </span>
                    <span v-if="modalType === 'birthdate'">
                        {{ $t("You must have at least 13 years old.") }}
                    </span>
                </p>
				<label v-if="isError && modalType === 'email'" class="text-sm w-full text-red-500">
                    {{ $t("The email address entered is already in use.") }}
                </label>
				<label v-if="(isError && modalType === 'password') || isMissingActualPassword" class="text-sm w-full text-red-500">
                    {{ $t("Invalid password") }}
                </label>

                <!-- New email -->
				<div v-if="modalType === 'email'" class="my-5">
					<label class="text-sm w-full">
                        {{ $t("Email address") }}
                    </label>

					<input v-model="email" type="email" :class="isError ? 'focus:outline-none text-lg border border-red-500 dark:bg-zinc-800 w-full py-2 px-2 rounded-md' : 'focus:outline-none text-lg border dark:border-zinc-800 dark:bg-zinc-800 w-full py-2 px-2 rounded-md'" :placeholder="$t('Email address')" required />
				</div>

                <!-- New birthdate -->
                <div v-if="modalType === 'birthdate'" class="my-5">
					<label class="text-sm w-full">
                        {{ $t("Birthdate") }}
                    </label>

					<input v-model="birthdate" type="date" :class="isError ? 'focus:outline-none text-lg border border-red-500 dark:bg-zinc-800 w-full py-2 px-2 rounded-md' : 'focus:outline-none text-lg border dark:border-zinc-800 dark:bg-zinc-800 w-full py-2 px-2 rounded-md'" :placeholder="$t('Birthdate')" :max="new Date().getFullYear()-13" :min="new Date().getFullYear()-100" />
				</div>

                <!-- New password -->
                <div v-if="modalType === 'password'" class="my-5">
					<label class="text-sm w-full">
                        {{ $t("New password") }}
                    </label>

					<input v-model="newPassword" type="password" :class="isError ? 'focus:outline-none text-lg border border-red-500 dark:bg-zinc-800 w-full py-2 px-2 rounded-md' : 'focus:outline-none text-lg border dark:border-zinc-800 dark:bg-zinc-800 w-full py-2 px-2 rounded-md'" :placeholder="$t('New password')" required />
				</div>

                <!-- Actual password for email & password modification -->
                <div v-if="modalType === 'email' || modalType === 'password'" class="my-6">
					<label for="actualpassword" class="text-sm w-full">
                        {{ $t("Actual password") }}
                    </label>

					<input v-model="oldPassword" type="password" :class="isMissingActualPassword ? 'focus:outline-none text-lg border border-red-500 dark:bg-zinc-800 w-full py-2 px-2 rounded-md' : 'focus:outline-none text-lg border dark:border-zinc-800 dark:bg-zinc-800 w-full py-2 px-2 rounded-md'" :placeholder="$t('Password')" required />
					
                    <NuxtLink to="/signin/password" class="text-sm text-gray-700 dark:text-white hover:text-gray-800 dark:hover:text-gray-200 w-1/2">
                        {{ $t("Forgot your password?") }}
                    </NuxtLink>
				</div>
				<div class="flex justify-end space-x-2">
                    <button @click="openedModal = false" type="button" class="px-5 py-2 font-medium text-center text-dark dark:text-white bg-transparent rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                        {{ $t("Cancel") }}
                    </button>

					<button
                        type="button"
                        @click="confirmUpdate"
                        :disabled="loading"
                        class="px-5 py-2 font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 dark:hover:bg-green-700 dark:focus:ring-green-800 disabled:bg-green-600/50 disabled:cursor-not-allowed disabled:hover:bg-green-600/50"
                        v-html='
                            loading ?
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
        { rel: "canonical", href: `${useRuntimeConfig().public?.SITE_URL || "https://account.gravitalia.com"}/security` }
    ],
    meta: [
        { property: "description", content: useI18n().t("Connecting the world, allowing freedom, that's what Gravitalia does. Let us connect you!") },
        { property: "og:site_name", content: useI18n().t("Gravitalia Account") },
        { property: "og:title", content: useI18n().t("Gravitalia Account") },
        { property: "og:description", content: useI18n().t("Connecting the world, allowing freedom, that's what Gravitalia does. Let us connect you!") }
    ],
    title: useI18n().t("Security") + " - " + useI18n().t("Gravitalia Account")
});
</script>

<script>
    export default {
        data() {
            return {
                openedModal: false,
                modalType: "email",
                isError: false,
                isMissingActualPassword: false,
                loading: false,
                email: "",
                birthdate: "",
                newPassword: "",
                oldPassword: "",
                user: useUser()
            }
        },

        async mounted() {
            // Fetch user
            await this.user.fetchUser();
        },

        methods: {
            openModal(type) {
                // Remove every errors
                this.isError = false;

                // Open modal
                this.openedModal = true;

                // Set modal type
                this.modalType = type;

                // Remove every old datas (only keep actual password)
                this.email = "";
                this.birthdate = "";
                this.newPassword = "";
                this.oldPassword = "";
            },

            confirmUpdate() {
                // Remove errors
                this.isError = false;
                this.isMissingActualPassword = false;

                // Check if error need to be shown (if missing elements)
                if(this.email === "" && this.birthdate === "" && this.newPassword === "") return this.isError = true;

                // If new email or password is entred and actual (old) password is missing, show it
                if((this.email !== "" || this.newPassword !== "") && this.oldPassword === "") return this.isMissingActualPassword = true;

                // Set button to loading
                this.loading = true;

                fetch(`${useRuntimeConfig().public.API_URL || "https://oauth.gravitalia.com"}/users/@me`, {
                    method: "PATCH",
                    headers: {
                        "Authorization": useCookie("session").value,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        password: this.oldPassword === "" ? null : this.oldPassword,
                        email: this.email === "" ? null : this.email,
                        birthdate: this.birthdate === "" ? null : this.birthdate,
                        newpassword: this.newPassword === "" ? null : this.newPassword
                    })
                })
                .then(res => res.json())
                .then(async (res) => {
                    if(res.error && res.message.includes("suspended")) {
                        // If user is suspended, deconnect it
                        useCookie("session").value = null;

                        // Redirect to sign in page
                        return await navigateTo("/signin");
                    } else if(res.error && res.message === "Invalid password") {
                        this.isMissingActualPassword = true;
                    } else if(res.error) {
                        this.isError = true;
                    } else {
                        // Close modal
                        this.openedModal = false;
                    }

                    // Remove loading
                    this.loading = false;
                });
            }
        }
    }
</script>