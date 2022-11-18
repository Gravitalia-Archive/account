---
console.log("test")
---

<template>
    <!-- CF Turnstile implementation -->
    <div class="cf-turnstile" data-sitekey="yourSitekey" data-callback="javascriptCallback"></div>
    <div id="CF-Token-Generator" class="cf-turnstile" data-sitekey="0x4AAAAAAABG7Pcx4-fniaty"></div> 

    <div class="mt-28 h-[60vh] xl:h-[50vh] xl:mt-40 flex justify-center items-center">
        <div class="p-11 border-[1px] -mt-10 border-none lg:border-solid border-slate-200 dark:border-zinc-800 dark:bg-zinc-800 rounded-md flex flex-col items-center space-y-3 shadow-sm">
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
                <label for="birth">Date de naissance <span class="text-xs w-full dark:text-gray-300">(champ facultatif)</span></label>
                <br />
                <input id="birth" type="date" class="p-2 border-[1px] border-slate-500 dark:bg-zinc-900 dark:border-zinc-800 rounded w-80" placeholder="Date de naissance" />
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
    export default {
        data() {
            return {
                token: ""
            }
        },
        mounted() {
            document.onkeydown = (e) => {
                if(e.code === "Enter") return; //this.next();
            };
        },
        methods: {
            next() {
                if(!document.getElementById("first")?.classList.value.includes("hidden")) {
                    if((<HTMLInputElement>document.getElementById("email")).value.match("^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,7})$")) return;
                    document.getElementById("first")?.classList.add("hidden");
                    document.getElementById("second")?.classList.remove("hidden");
                }
            },

            back() {

            }
        }
    }
</script>