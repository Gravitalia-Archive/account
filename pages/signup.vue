<template>
    <p v-if="isError.emailAlreadyUsed" class="flex h-10 items-center justify-center bg-[#332b43] px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
    	<span class="underline pr-1">{{ $t("Warning") }} </span> {{ $t("The email address entered is already in use.") }}
    </p>

    <!-- Cloudflare Turnstile implementation -->
    <NuxtTurnstile v-model="token" />

	<div class="mt-28 h-[60vh] xl:h-[50vh] xl:mt-40 flex justify-center items-center">
		<div class="p-11 border-[1px] -mt-10 border-none lg:border-solid border-slate-200 dark:border-zinc-800 dark:bg-zinc-800 rounded-md flex flex-col items-center space-y-3 shadow-md">
			<img width="30" height="30" draggable="false" alt="Gravitalia logo" src="/favicon.webp" />
			<p class="text-lg font-semibold">{{ $t("Let us connect you!") }}</p>

			<div :class="level === 0 ? 'space-y-2' : 'hidden'">
                <!-- First and last name (combined into a username) -->
				<div class="flex space-x-2">
					<input v-model="firstname" type="text" :class="isError.invalidFirstName ? 'p-2 border-[1px] border-red-500 dark:bg-zinc-900 rounded w-[9.75rem]' : 'p-2 border-[1px] border-slate-500 dark:bg-zinc-900 dark:border-zinc-800 rounded w-[9.75rem]'" :placeholder="$t('Firstname')" maxlength="10" />
					<input v-model="lastname" type="text" class="p-2 border-[1px] border-slate-500 dark:bg-zinc-900 dark:border-zinc-800 rounded w-[9.75rem]" :placeholder="$t('Lastname')" maxlength="15" />
				</div>

                <!-- Email -->
				<input v-model="email" type="email" :class="isError.invalidEmail ? 'p-2 border-[1px] border-red-500 dark:bg-zinc-900 rounded w-80' : 'p-2 border-[1px] border-slate-500 dark:bg-zinc-900 dark:border-zinc-800 rounded w-80'" :placeholder="$t('Email address')" />

				<br />

                <!-- Password -->
				<input v-model="password" type="password" :class="isError.invalidPassword ? 'p-2 border-[1px] border-red-500 dark:bg-zinc-900 rounded w-80' : 'p-2 border-[1px] border-slate-500 dark:bg-zinc-900 dark:border-zinc-800 rounded w-80'" :placeholder="$t('Password')" />
				<p :class="isError.invalidPassword ? 'text-xs w-full text-red-500' : 'text-xs w-full dark:text-gray-300'">
                    {{ $t("At least 8 characters with numbers and symbols") }}
                </p>
			</div>

			<div :class="level === 1 ? 'block' : 'hidden'">
				<label class="w-full">{{ $t("Username") }} <span class="text-xs w-full text-red-500">*</span></label>
				<div class="flex w-full">
					<div class="flex flex-row border-[1px] border-slate-500 dark:bg-zinc-900 dark:border-zinc-800 rounded w-80">
						<span class="rounded-l-lg w-1/3 p-2 flex justify-center items-center text-sm">
							gravitalia.com/
						</span>
						<input v-model="vanity" type="text" :class="invalidVanity ? 'focus:outline-none border-red-500 w-28 pl-1 text-sm dark:bg-zinc-900' : 'focus:outline-none w-28 pl-1 text-sm dark:bg-zinc-900'" :placeholder="$t('Username').toLowerCase()">
					</div>
				</div>
				<br />

                <!-- Birthdate -->
				<label>{{ $t("Birthdate") }} <span class="text-xs w-full dark:text-gray-300">{{ $t("(optional field)") }}</span></label>
				<br />
				<input v-model="birthdate" type="date" :class="isError.invalidBirthdate ? 'p-2 border-[1px] border-red-500 dark:bg-zinc-900 rounded w-80' : 'p-2 border-[1px] border-slate-500 dark:bg-zinc-900 dark:border-zinc-800 rounded w-80'" :max="new Date().getFullYear()-13" :min="new Date().getFullYear()-100" />
				<br />

                <!-- Terms of Service and Privacy Policy acceptance -->
				<p class="pt-3 text-xs w-full dark:text-gray-300 w-full">
                    {{ $t("You accept our") }} <NuxtLink to="/terms" class="text-blue-500 hover:text-blue-700">{{ $t("ToS") }}</NuxtLink> {{ $t("and our") }} <NuxtLink to="/privacy" class="text-blue-500 hover:text-blue-700">{{ $t("privacy policy") }}</NuxtLink>
                </p>
			</div>

            <div class="flex justify-between w-full">
                <NuxtLink v-if="level === 0" to="/signin" class="text-sm px-2 py-2 bg-indigo-50 dark:bg-opacity-0 dark:border-none outline-none border border-indigo-100 rounded text-indigo-500 dark:text-white font-medium hover:bg-indigo-400 dark:hover:bg-indigo-500 hover:text-white transition-colors duration-200">
                    {{ $t("Sign in") }}
                </NuxtLink>

                <button v-if="level === 1" @click="back()" class="text-sm px-2 py-2 bg-indigo-50 dark:bg-opacity-0 dark:border-none outline-none border border-indigo-100 rounded text-indigo-500 dark:text-white font-medium hover:bg-indigo-400 dark:hover:bg-indigo-500 hover:text-white transition-colors duration-200">
                    {{ $t("Back") }}
                </button>

                <button @click="next()" class="text-sm px-4 py-2 outline-none rounded bg-[#332b43] dark:bg-indigo-500 dark:hover:bg-indigo-600 font-medium text-white disabled:opacity-75 transition-colors duration-200 disabled:cursor-not-allowed" :disabled="isNextDesactivated">
                    {{ $t("Next") }}
                </button>
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
        { rel: "canonical", href: `${useRuntimeConfig().public?.SITE_URL || "https://account.gravitalia.com"}/signup` }
    ],
    meta: [
        { property: "description", content: useI18n().t("Connecting the world, allowing freedom, that's what Gravitalia does. Let us connect you!") },
        { property: "og:site_name", content: useI18n().t("Gravitalia Account") },
        { property: "og:title", content: useI18n().t("Gravitalia Account") },
        { property: "og:description", content: useI18n().t("Connecting the world, allowing freedom, that's what Gravitalia does. Let us connect you!") }
    ],
    title: useI18n().t("Sign up") + " - " + useI18n().t("Gravitalia Account")
});

const token = useCookie("session").value;
const user = useUser();

// Fetch user
await user.fetchUser();

// Redirect user if connected
if(token && user.vanity !== "") {
    await navigateTo("/");
}
</script>

<script>
    export default {
        data() {
            return {
                isNextDesactivated: false,
                token: "",
                isError: {
                    invalidEmail: false,
                    invalidFirstName: false,
                    invalidPassword: false,
                    invalidVanity: false,
                    invalidBirthdate: false,
                    emailAlreadyUsed: false
                },
                firstname: "",
                lastname: "",
                email: "",
                password: "",
                vanity: "",
                birthdate: "",
                level: 0
            }
        },

        mounted() {
            document.onkeydown = (e) => {
                if(e.code === "Enter") this.next();
            };
        },

        methods: {
            async next() {
                // Disable Next button
                this.isNextDesactivated = true;

                // Set all errors to false
                this.isError.invalidEmail = false;
                this.isError.invalidFirstName = false;
                this.isError.invalidPassword = false;
                this.isError.invalidVanity = false;
                this.isError.invalidBirthdate = false;
                this.isError.emailAlreadyUsed = false;

                if(this.level === 0) {
                    if(this.firstname === "" || this.firstname.length >= 16) this.isError.invalidFirstName = true;
                    else if((this.email === "" || !this.email.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,7})$/))) this.isError.invalidEmail = true;
                    else if(!this.password.match(/([0-9|*|]|[$&+,:;=?@#|'<>.^*()%!-_])+/)
                        || !this.password.match(/[A-z]/)
                        || this.password.length < 8
                        ) this.isError.invalidPassword = true;
                    else {
                        this.level = 1;
                    }
                } else {
                    if(!this.vanity.match(/[A-z|0-9|_]{3,16}/)) {
                        this.isError.invalidVanity = true;
                    } else if(this.birthdate.split("-").length === 3 && new Date().getFullYear()-parseInt(this.birthdate.split("-")[0], 10) < 13) {
                        this.isError.invalidBirthdate = true;
                    } else {
                        const res = await this.create();

                        // Invalid email
                        if(res.includes("email")) {
                            // Going back
                            this.back();

                            // Set email as error
                            this.isError.invalidEmail = true;

                            // If error contains "already", it means that email is
                            // in use, so show new error
                            if(res.includes("already")) {
                                this.isError.emailAlreadyUsed = true;

                                setTimeout(() => {
                                    this.isError.emailAlreadyUsed = false;
                                }, 1000 * 60);
                            }
                        } else if(res === "vanity") {
                            // Invalid vanity
                            this.isError.invalidVanity = true;
                        } else if(res === "ratelimit") {
                            // Let's add new error later
                        }
                    }
                }

                // Enable Next button
                this.isNextDesactivated = false;
            },

            back() {
                this.level -= 1;
            },

            create() {
                return new Promise(async (resolve, reject) => {
                    fetch(`${useRuntimeConfig().public.API_URL || "https://oauth.gravitalia.com"}/create`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "CF-Turnstile-Token": this.token,
                        },
                        body: JSON.stringify({
                            username: this.lastname === "" ? this.firstname : this.firstname + " " + this.lastname,
                            vanity: this.vanity.toLowerCase(),
                            birthdate: this.birthdate,
                            email: this.email,
                            password: this.password
                        })
                    })
                    .then(res => res?.json())
                    .then(async (res) => {
                        if(res?.message === "Invalid email") {
                            resolve("email");
                        } else if(res?.message === "Email already used") {
                            resolve("email_already");
                        } else if(res?.message === "Invalid vanity") {
                            resolve("vanity");
                        } else if(res?.error) {
                            resolve("ratelimit");
                        } else {
                            useCookie(
                                "session",
                                {
                                    maxAge: 5256000,
                                    sameSite: "strict",
                                    secure: true,
                                    //httpOnly: true,
                                }
                            ).value = res.message;

                            const redirect = this.$route.query?.redirect;
                            if(redirect) {
                                let url = decodeURIComponent(redirect)
                                if (!url.includes("http")) {
                                    await navigateTo(url, { external: true });
                                } else {
                                    await navigateTo("/");
                                }
                            } else {
                                await navigateTo("/");
                            }
                        }
                    });
                });
            }
        }
    }
</script>