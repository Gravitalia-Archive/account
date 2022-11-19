---
console.log("test")
---

<template>
    <!-- CF Turnstile implementation -->
    <div class="cf-turnstile" data-sitekey="yourSitekey" data-callback="javascriptCallback"></div>
    <div id="CF-Token-Generator" class="cf-turnstile" data-sitekey="0x4AAAAAAABG7Pcx4-fniaty"></div> 

    <div class="mt-28 h-[60vh] xl:h-[50vh] xl:mt-40 flex justify-center items-center">
        <div class="p-11 border-[1px] -mt-10 border-none lg:border-solid border-slate-200 dark:border-zinc-800 dark:bg-zinc-800 rounded-md flex flex-col items-center space-y-3 shadow-md">
            <img width="30" height="30" draggable="false" alt="Gravitalia logo" src="/favicon.webp" />
            <p class="text-lg font-semibold">Let us connect you!</p>

            <div id="first" class="space-y-2">
                <div class="flex space-x-2">
                    <input id="firstname" type="text" class="p-2 border-[1px] border-slate-500 dark:bg-zinc-900 dark:border-zinc-800 rounded w-[9.75rem]" placeholder="Prénom" />
                    <input id="lastname" type="text" class="p-2 border-[1px] border-slate-500 dark:bg-zinc-900 dark:border-zinc-800 rounded w-[9.75rem]" placeholder="Nom" />
                </div>

                <input id="email" type="email" class="p-2 border-[1px] border-slate-500 dark:bg-zinc-900 dark:border-zinc-800 rounded w-80" placeholder="Adresse e-mail" />
                <br />
                <input id="password" type="password" class="p-2 border-[1px] border-slate-500 dark:bg-zinc-900 dark:border-zinc-800 rounded w-80" placeholder="Mot de passe" />
                <p id="password-tips" class="text-xs w-full dark:text-gray-300">Au moins 8 caractères avec chiffres et symboles</p>
            </div>

            <div id="second" class="hidden">
                <label for="vanity" class="w-full">Nom d'utilisateur <span class="text-xs w-full text-red-500">*</span></label>
                <div class="flex w-full">
                    <div id="vanity_div" class="flex flex-row border-[1px] border-slate-500 dark:bg-zinc-900 dark:border-zinc-800 rounded w-80">
                        <span class="rounded-l-lg w-1/3 p-2 flex justify-center items-center text-sm">
                            gravitalia.com/
                        </span>
                        <input id="vanity" class="focus:outline-none w-28 pl-1 text-sm" placeholder="username">
                    </div>
                </div>
                <br />
                <label for="birth">Date de naissance <span class="text-xs w-full dark:text-gray-300">(champ facultatif)</span></label>
                <br />
                <input id="birth" type="date" class="p-2 border-[1px] border-slate-500 dark:bg-zinc-900 dark:border-zinc-800 rounded w-80" placeholder="Date de naissance" max="2022" min="1920" />
                <br />
                <p id="tos-tips" class="mt-3 text-xs w-full dark:text-gray-300 w-4/5">Vous acceptez nos <a href="/terms" target="_blank" rel="prefetch" class="text-blue-500 hover:text-blue-700">CGU</a> et notre <a href="/privacy" target="_blank" rel="prefetch" class="text-blue-500 hover:text-blue-700">politique de confidentialité</a></p>
            </div>

            <div class="flex flex-wrap w-full pt-4">
                <a href="/signin" id="create_acc" class="text-sm px-2 py-2 bg-indigo-50 dark:bg-opacity-0 dark:border-none outline-none border border-indigo-100 rounded text-indigo-500 dark:text-white font-medium hover:bg-indigo-400 dark:hover:bg-indigo-500 hover:text-white transition-colors duration-200">
                    Se connecter
                </a>
                <button id="back_btn" @click="back()" class="hidden text-sm px-2 py-2 bg-indigo-50 dark:bg-[#7f5af0] outline-none border border-indigo-100 dark:border-[#7f5af0] rounded text-indigo-500 dark:text-white font-medium hover:bg-indigo-400 dark:hover:bg-[#7f5af0] hover:text-white transition-colors duration-200">
                    Retour en arrière
                </button>
                <span class="pl-32 xl:pl-36">
                    <button id="next" @click="next()" class="text-sm px-4 py-2 outline-none rounded bg-[#332b43] dark:bg-indigo-500 dark:hover:bg-indigo-600 font-medium text-white disabled:opacity-75 transition-colors duration-200 disabled:cursor-not-allowed">
                        Suivant
                    </button>
                </span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    declare global {
        interface Window {
            fingerprint: Function;
        }
    }

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
                if(!document.getElementById("first")?.classList.value.includes("hidden")) {
                    if(!(<HTMLInputElement>document.getElementById("firstname")).value || (<HTMLInputElement>document.getElementById("firstname")).value.length >= 16) {
                        document.getElementById("password")?.classList.remove("border-red-500");
                        document.getElementById("email")?.classList.remove("border-red-500");
                        document.getElementById("firstname")?.classList.add("border-red-500");
                    } else if((!(<HTMLInputElement>document.getElementById("email")).value.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,7})$/))) {
                        document.getElementById("password")?.classList.remove("border-red-500");
                        document.getElementById("firstname")?.classList.remove("border-red-500");
                        document.getElementById("email")?.classList.add("border-red-500");
                    } else if(!(<HTMLInputElement>document.getElementById("password")).value.match(/([0-9|*|]|[$&+,:;=?@#|'<>.^*()%!-_])+/) || !(<HTMLInputElement>document.getElementById("password")).value.match(/[A-z]/) || (<HTMLInputElement>document.getElementById("password")).value.length < 8) {
                        document.getElementById("email")?.classList.remove("border-red-500");
                        document.getElementById("firstname")?.classList.remove("border-red-500");
                        document.getElementById("password")?.classList.add("border-red-500");
                    } else {
                        document.getElementById("first")?.classList.add("hidden");
                        document.getElementById("second")?.classList.remove("hidden");
                        document.getElementById("create_acc")?.classList.add("hidden");
                        document.getElementById("back_btn")?.classList.remove("hidden");
                    }
                } else {
                    if(!(<HTMLInputElement>document.getElementById("vanity")).value || !(<HTMLInputElement>document.getElementById("vanity")).value.match(/[A-z|0-9|_]{3,16}/)) {
                        document.getElementById("password")?.classList.remove("border-red-500");
                        document.getElementById("email")?.classList.remove("border-red-500");
                        document.getElementById("firstname")?.classList.remove("border-red-500");
                        document.getElementById("vanity_div")?.classList.add("border-red-500");
                    } else if((<HTMLInputElement>document.getElementById("birth")).value && new Date().getFullYear()-parseInt((<HTMLInputElement>document.getElementById("birth")).value.split("-")[0], 10) < 13) {
                        document.getElementById("vanity_div")?.classList.remove("border-red-500");
                        document.getElementById("birth")?.classList.add("border-red-500");
                    } else {
                        document.getElementById("password")?.classList.remove("border-red-500");
                        document.getElementById("email")?.classList.remove("border-red-500");
                        document.getElementById("firstname")?.classList.remove("border-red-500");
                        document.getElementById("vanity_div")?.classList.remove("border-red-500");
                        document.getElementById("birth")?.classList.remove("border-red-500");

                        const res = await this.create();
                        if(res === "email") {
                            this.back();
                            document.getElementById("email")?.classList.add("border-red-500");
                        } else if(res === "vanity") {
                            document.getElementById("vanity_div")?.classList.add("border-red-500");
                        }
                    }
                }
            },

            back() {
                document.getElementById("first")?.classList.remove("hidden");
                document.getElementById("second")?.classList.add("hidden");
                document.getElementById("create_acc")?.classList.remove("hidden");
                document.getElementById("back_btn")?.classList.add("hidden");
            },

            create() {
                return new Promise(async (resolve, reject) => {
                    if(this.token.length === 0) {
                        const MATCH = (<HTMLInputElement>document.getElementById("CF-Token-Generator")).innerHTML.match(/value=".*">/gm);
                        if(!MATCH) setTimeout(() => {return this.create()}, 1000);
                        else this.token = MATCH[0]?.replace(/value="/g, "")?.replace(/">/g, "");
                    }

                    if((<HTMLInputElement>document.getElementById("email")).value === "") return resolve("email");
                    fetch("https://oauth.gravitalia.studio/login", {
                        method: "POST",
                        mode: "no-cors",
                        headers: {
                            "Content-Type": "application/json",
                            "CF-Turnstile-Token": this.token,
                            "Sec": await window.fingerprint()
                        },
                        body: JSON.stringify({
                            username: (<HTMLInputElement>document.getElementById("firstname")).value + ((<HTMLInputElement>document.getElementById("lastname")).value ? ` ${(<HTMLInputElement>document.getElementById("lastname")).value}` : ""),
                            vanity: (<HTMLInputElement>document.getElementById("vanity")).value.toLowerCase(),
                            birthdate: (<HTMLInputElement>document.getElementById("birth")).value,
                            email: (<HTMLInputElement>document.getElementById("email")).value,
                            password: (<HTMLInputElement>document.getElementById("password")).value
                        })
                    })
                    .catch(_ => resolve("email"))
                    .then(res => res?.json())
                    .then(res => {
                        if(res?.message === "Invalid email") {
                            resolve("email");
                        } else if(res?.message === "Invalid vanity") {
                            resolve("vanity");
                        } else if(res?.error) {
                            resolve("ratelimit");
                        } else {
                            resolve(res.token);
                        }
                    });
                });
            }
        }
    }
</script>