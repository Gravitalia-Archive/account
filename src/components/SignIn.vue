<template>
    <!-- CF Turnstile implementation -->
    <div class="cf-turnstile" data-sitekey="yourSitekey" data-callback="javascriptCallback"></div>
    <div id="CF-Token-Generator" class="cf-turnstile" data-sitekey="0x4AAAAAAABG7Pcx4-fniaty"></div> 

    <div class="mt-28 h-[60vh] xl:h-[50vh] xl:mt-40 flex justify-center items-center">
        <div class="p-11 border-[1px] -mt-10 border-none lg:border-solid border-slate-200 dark:border-zinc-800 dark:bg-zinc-800 rounded-md flex flex-col items-center space-y-3 shadow-sm">
            <br />
            <img width="30" height="30" draggable="false" alt="Gravitalia logo" src="/favicon.webp" />
            <p class="text-lg font-semibold">Let us connect you!</p>
            <p class="hidden text-lg font-semibold">Votre code à deux facteurs</p>
            <br /><br />
            <label for="email" id="invalid_email_label" class="hidden text-sm text-red-500 w-full">Invalid email</label>
            <input id="email" type="email" class="p-2 border-[1px] border-slate-500 dark:bg-zinc-900 dark:border-zinc-800 rounded w-80" placeholder="Email adress" />
            <label for="password" id="invalid_password_label" class="hidden text-sm text-red-500 w-full">Invalid password</label>
            <div id="psw" class="hidden flex flex-col space-y-1">
                <input id="password" type="password" class="p-2 border-[1px] border-slate-500 dark:bg-zinc-900 dark:border-zinc-800 rounded w-80" placeholder="Password" />
                <a href="/sign-in/password" class="text-sm text-gray-700 dark:text-white hover:text-gray-800 dark:hover:text-gray-200 w-1/2">Forgot your password?</a>
            </div>
            <div id="enter_mfa" class="hidden flex">
                <input v-for="i in 6" :autofocus="i == 0" :id="`${i}`" :key="i" class="h-12 w-10 border mx-1 rounded-lg flex items-center text-center font-thin text-3xl" maxlength="1" max="9" min="0" inputmode="decimal" @keydown="mfa_keypress" />
            </div>

            <div class="flex flex-wrap w-full">
                <a href="/signup" id="create_acc" class="text-sm px-2 py-2 bg-indigo-50 dark:bg-opacity-0 dark:border-none outline-none border border-indigo-100 rounded text-indigo-500 dark:text-white font-medium hover:bg-indigo-400 dark:hover:bg-indigo-500 hover:text-white transition-colors duration-200">
                    Créer un compte
                </a>
                <button id="back_btn" @click="back()" class="hidden text-sm px-2 py-2 bg-indigo-50 dark:bg-[#7f5af0] outline-none border border-indigo-100 dark:border-[#7f5af0] rounded text-indigo-500 dark:text-white font-medium hover:bg-indigo-400 dark:hover:bg-[#7f5af0] hover:text-white transition-colors duration-200">
                    Retour en arrière
                </button>
                <span class="pl-16 xl:pl-28">
                    <button id="next" @click="next()" class="text-sm px-4 py-2 outline-none rounded bg-[#332b43] dark:bg-indigo-500 dark:hover:bg-indigo-600 font-medium text-white disabled:opacity-75 transition-colors duration-200 disabled:cursor-not-allowed">
                        Suivant
                    </button>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                token: ""
            }
        },
        mounted() {
            document.onkeydown = (e) => {
                if(e.code === "Enter") this.next();
            };
        },
        methods: {
            async next() {
                document.getElementById("next").disabled = true;
                if(!document.getElementById("create_acc").classList.value.includes("hidden")) {
                    if(await this.login() === "email") {
                        document.getElementById("email").classList.add("border-red-500");
                        document.getElementById("invalid_email_label").classList.remove("hidden");
                    } else {
                        document.getElementById("create_acc").classList.add("hidden");
                        document.getElementById("invalid_email_label").classList.add("hidden");
                        document.getElementById("email").classList.add("hidden");
                        document.getElementById("back_btn").classList.remove("hidden");
                        document.getElementById("psw").classList.remove("hidden");
                        document.getElementById("email").classList.remove("border-red-500");
                    }
                } else {
                    const call_res = await this.login();
                    if(call_res === "password") {
                        document.getElementById("password").classList.add("border-red-500");
                        document.getElementById("invalid_password_label").classList.remove("hidden");
                    } else if(call_res === "mfa") {
                        document.getElementById("psw").classList.add("hidden");
                        document.getElementById("next").classList.add("hidden");
                        document.getElementById("back").classList.add("hidden");
                        document.getElementById("enter_mfa").classList.remove("hidden");
                        document.getElementById("email").classList.remove("border-red-500");
                    } else if(call_res === "ratelimit") {
                        document.getElementById("ratelimit").classList.remove("hidden");
                        setTimeout(() => {
                            document.getElementById("ratelimit").classList.add("hidden");
                        }, 5000*60)
                    } else {
                        window.location.href = `/signin/next?token=${call_res}`;
                    }
                }
                document.getElementById("next").disabled = false;
            },

            back() {
                document.getElementById("create_acc").classList.remove("hidden");
                document.getElementById("email").classList.remove("hidden");
                document.getElementById("back_btn").classList.add("hidden");
                document.getElementById("psw").classList.add("hidden");
                document.getElementById("invalid_password_label").classList.add("hidden");
            },

            login(mfa = null) {
                return new Promise(async (resolve, reject) => {
                    if(this.token.length === 0) {
                        const MATCH = document.getElementById("CF-Token-Generator").innerHTML.match(/value=".*">/gm);
                        if(!MATCH) setTimeout(() => {return this.login(mfa)}, 1000);
                        else this.token = MATCH[0]?.replace(/value="/g, "")?.replace(/">/g, "");
                    }

                    if(document.getElementById("email").value === "") return resolve("email");
                    fetch("https://oauth.gravitalia.studio/login", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "CF-Turnstile-Token": this.token,
                            "Sec": await window["fingerprint"]()
                        },
                        body: JSON.stringify({
                            email: document.getElementById("email")["value"],
                            password: document.getElementById("password").value === "" ? "Password1234(DontUsePls)" : document.getElementById("password").value,
                            mfa
                        })
                    })
                    .catch(_ => resolve("email"))
                    .then(res => res.json())
                    .then(res => {
                        if(res?.message === "Invalid email") {
                            resolve("email");
                        } else if(res?.message === "Invalid password") {
                            resolve("password");
                        } if(res?.message === "MFA") {
                            resolve("mfa");
                        } else if(res?.error) {
                            resolve("ratelimit");
                        } else {
                            resolve(res.token);
                        }
                    });
                });
            },

            async mfa_keypress(event) {
                if(event.key === "Backspace") {
                    if(event.target.id-1 === 0) {
                        document.getElementById(event.target.id)["value"] = "";
                    } else {
                        document.getElementById(`${event.target.id-1}`).focus();
                        document.getElementById(`${event.target.id}`)["value"] = "";
                    }
                } else if([ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ].includes(event.key)) {
                    let Id = parseInt(event.target.id);
                    if(Id === 6) {
                        let code = "";
                        for(let i = 1; i < 6; i++) {
                            code += document.getElementById(`${i}`)["value"];
                        }
                        if(code.length === 6) {
                            const call_res = await this.login(code);
                            if(call_res !== "mfa") {
                                window.location.href = `/signin/next?token=${call_res}`;
                            }
                        }
                    } else {
                        setTimeout(() => {
                            document.getElementById(`${Id+1}`).focus();
                        }, 50);
                        document.getElementById(`${Id+1}`)["value"] = "";
                    }
                }
            }
        }
    }
</script>