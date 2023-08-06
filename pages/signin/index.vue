<template>
    <!-- Cloudflare Turnstile implementation -->
    <NuxtTurnstile v-model="token" />

    <div class="mt-28 h-[60vh] xl:h-[50vh] xl:mt-40 flex justify-center items-center">
        <div class="p-11 border-[1px] -mt-10 border-none lg:border-solid border-slate-200 dark:border-zinc-800 dark:bg-zinc-800 rounded-md flex flex-col items-center space-y-3 shadow-sm">
            <br />
            <img width="30" height="30" draggable="false" alt="Gravitalia logo" src="/favicon.webp" />
            <p v-if="level === 3" class="pb-6 text-lg font-semibold">{{ $t("Your two-factor code") }}</p>
            <p v-else class="text-lg font-semibold">{{ $t("Let us connect you!") }}</p>

            <br /><br />

            <!-- Email -->
            <label v-if="isError.invalidEmail && level === 0" class="text-sm text-red-500 w-full" for="email">{{ $t("Invalid email") }}</label>
            <input id="email" type="email" v-model="email" :class="level === 0 ? isError.invalidEmail ? 'border-red-500 p-2 border-[1px] dark:bg-zinc-900 rounded w-80' : 'p-2 border-[1px] border-slate-500 dark:bg-zinc-900 dark:border-zinc-800 rounded w-80' : 'hidden'" :placeholder="$t('Email address')" />

            <!-- Password -->
            <label v-if="isError.invalidPassword && level === 1" for="password" class="text-sm text-red-500 w-full">{{ $t("Invalid password") }}</label>
            <div :class="level === 1 ? 'flex flex-col space-y-1' : 'hidden'">
                <input id="password" type="password" v-model="password" :class="isError.invalidPassword ? 'border-red-500 p-2 border-[1px] dark:bg-zinc-900 rounded w-80' : 'p-2 border-[1px] border-slate-500 dark:bg-zinc-900 dark:border-zinc-800 rounded w-80'" :placeholder="$t('Password')" />

                <NuxtLink to="/signin/password" class="text-sm text-gray-700 dark:text-white hover:text-gray-800 dark:hover:text-gray-200 w-1/2">
                    {{ $t("Forgot your password?") }}
                </NuxtLink>
            </div>

            <!-- MFA -->
            <div v-if="level === 3" class="flex">
                <input v-for="i in 6" :autofocus="i == 0" :id="`${i}`" :key="i" class="h-12 w-10 border mx-1 rounded-lg flex items-center text-center font-thin text-3xl" maxlength="1" max="9" min="0" inputmode="decimal" @keydown="mfa_keypress" />
            </div>

            <!-- Account suspension message -->
            <div v-if="isError.suspendedAccount">
				<p class="text-sm max-w-xs">
                    {{ $t("We're sorry, but your account has been suspended. For more information, please contact us by e-mail. The internal procedure is practically the same as for deleting an account. All sensitive data will be deleted after 60 days.") }}
                </p>
			</div>

            <div class="flex justify-between w-full">
                <NuxtLink v-if="level === 0" to="/signup" class="text-sm px-2 py-2 bg-indigo-50 dark:bg-opacity-0 dark:border-none outline-none border border-indigo-100 rounded text-indigo-500 dark:text-white font-medium hover:bg-indigo-400 dark:hover:bg-indigo-500 hover:text-white transition-colors duration-200">
                    {{ $t("Create account") }}
                </NuxtLink>

                <button v-if="level === 1" @click="back()" class="text-sm px-2 py-2 bg-indigo-50 dark:bg-opacity-0 dark:border-none outline-none border border-indigo-100 rounded text-indigo-500 dark:text-white font-medium hover:bg-indigo-400 dark:hover:bg-indigo-500 hover:text-white transition-colors duration-200">
                    {{ $t("Back") }}
                </button>

                <button v-if="level !== 3" @click="next()" class="text-sm px-4 py-2 outline-none rounded bg-[#332b43] dark:bg-indigo-500 dark:hover:bg-indigo-600 font-medium text-white disabled:opacity-75 transition-colors duration-200 disabled:cursor-not-allowed" :disabled="isNextDesactivated">
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
        { rel: "canonical", href: `${useRuntimeConfig().public?.SITE_URL || "https://account.gravitalia.com"}/signin` }
    ],
    title: useI18n().t("Sign in") + " - " + useI18n().t("Gravitalia Account")
});

const user = useUser();

// Fetch user
await user.fetchUser();

// Redirect user if connected
if(useCookie("session").value && user.vanity !== "") {
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
                    invalidPassword: false,
                    suspendedAccount: false
                },
                email: "",
                password: "",
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
                // Set button as disabled
                this.isNextDesactivated = true;

                // Set all errors to false
                this.isError.invalidEmail = false;
                this.isError.invalidPassword = false;
                this.isError.suspendedAccount = false;

                // Do not send request if no email is present
                if(this.email.length === 0) {
                    this.isError.invalidEmail = true;
                    this.isNextDesactivated = false;
                } else {
                    // Make request
                    if(this.level === 0) {
                        if(await this.login() === "email") {
                            // Wrong email? Show error
                            this.isError.invalidEmail = true;
                        } else {
                            // Pass to the next level
                            this.level = 1;
                        }
                    } else {
                        const call_res = await this.login();
                        if(call_res === "password") {
                            // If password doesn't match, show error
                            this.isError.invalidPassword = true;
                        } else if(call_res === "mfa") {
                            this.level = 2;
                        } else if(call_res === "ratelimit") {
                            document.getElementById("ratelimit").classList.remove("hidden");

                            setTimeout(() => {
                                document.getElementById("ratelimit").classList.add("hidden");
                            }, 5000*60)
                        }
                    }

                    // Generate new token
                    this.$turnstile.reset();

                    // Set button as actiavted
                    this.isNextDesactivated = false;
                }
            },

            back() {
                this.level -= 1;
            },

            login(mfa = null) {
                return new Promise(async (resolve, reject) => {
                    fetch(`${useRuntimeConfig().public.API_URL || "https://oauth.gravitalia.com"}/login`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "CF-Turnstile-Token": this.token,
                        },
                        body: JSON.stringify({
                            email: this.email,
                            password: this.password.length === 0 ? "testemail" : this.password,
                            mfa
                        })
                    })
                    .catch(_ => resolve("email"))
                    .then(res => res.json())
                    .then(async (res) => {
                        if(res?.message === "Invalid email" || res?.message === "Invalid user") {
                            resolve("email");
                        } else if(res?.message === "Invalid password") {
                            resolve("password");
                        } if(res?.message === "MFA") {
                            resolve("mfa");
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
            },

            async mfa_keypress(event) {
                let Id = parseInt(event.target.id);

                if(event.key === "Backspace") {
                    if(Id-1 === 0) {
                        document.getElementById(event.target.id).value = "";
                    } else {
                        document.getElementById(`${event.target.id-1}`).focus();
                        document.getElementById(`${event.target.id}`).value = "";
                    }
                } else if([ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ].includes(event.key)) {
                    console.log(Id)
                    if(Id === 6) {
                        let code = "";

                        for(let i = 1; i < 7; i++) {
                            code += document.getElementById(i.toString()).value;
                        }

                        console.log(code)
                        if(code.length === 6) {
                            await this.login(code);
                        }
                    } else {
                        setTimeout(() => {
                            document.getElementById(`${Id+1}`).focus();
                        }, 50);

                        document.getElementById(`${Id+1}`).value = "";
                    }
                }
            }
        }
    }
</script>