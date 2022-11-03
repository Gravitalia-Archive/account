<template>
    <div class="mt-28 h-[60vh] xl:h-[40vh] xl:mt-40 flex justify-center items-center">
        <div class="p-10 border-[1px] -mt-10 border-slate-200 dark:border-zinc-800 dark:bg-zinc-800 rounded-md flex flex-col items-center space-y-3">
            <div class="py-8">
                <img width="30" height="30" draggable="false" alt="Gravitalia logo" src="/favicon.webp" />
            </div>
            <input id="email" type="email" class="p-2 border-[1px] border-slate-500 dark:bg-zinc-900 dark:border-zinc-800 rounded-sm w-80" placeholder="Email adress" />
            <div class="flex flex-col space-y-1">
                <input id="password" type="password" class="p-2 border-[1px] border-slate-500 dark:bg-zinc-900 dark:border-zinc-800 rounded-sm w-80" placeholder="Password" />
                <a href="/sign-in/password" class="text-sm text-gray-700 dark:text-white hover:text-gray-800 dark:hover:text-gray-200 w-1/2">Forgot your password?</a>
            </div>
            <div class="flex flex-col space-y-5 w-full">
                <Turnstile v-model="token" />
                <button @click="login" class="w-full bg-[#332b43] dark:bg-indigo-600 rounded-md p-2 text-white font-semibold">
                    Sign in
                </button>
            </div>
        </div>
    </div>
    <div class="flex justify-center items-center">
        <div class="mt-6 w-[25rem] p-3 border-[1px] border-slate-200 dark:border-zinc-800 dark:bg-zinc-800 rounded-md flex flex-col items-center">
            <p class="text-sm dark:text-gray-200"><span>New here?</span> <a href="/signup" class="text-blue-700 dark:text-blue-500">Create an account!</a></p>
        </div>
    </div>
</template>

<script setup lang="ts">
    let token: string;

    async function login() {
        console.log("cliked")
        fetch("https://oauth.gravitalia.studio/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "CF-Turnstile-Token": token,
                "Sec": await window["fingerprint"]
            },
            body: JSON.stringify({
                email: document.getElementById("email")["value"],
                password: document.getElementById("password")["value"]
            })
        }).then(res => res.json())
        .then(res => {
            console.log(res)
            if(res?.token) {
                console.log("good")
            }
        });
    }

    useHead({
        title: "Login - Gravitalia Account"
    })
</script>