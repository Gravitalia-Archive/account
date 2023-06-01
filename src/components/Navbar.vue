<template>
    <div class="bg-gray-200 dark:bg-zinc-800">
        <div class="w-full text-gray-700 dark:text-white">
            <div class="flex flex-col max-w-screen-xl mx-auto md:items-center md:justify-between md:flex-row px-4 md:px-6 lg:px-8">
                <div class="flex flex-row items-center justify-between h-11">
                    <img alt="Gravitalia logo" width="30" height="30" src="/favicon.webp" draggable="false" />
                    <div class="hidden md:block"><span class="ml-8"></span></div>
                    <button aria-label="Open menu" @click="openMobile()" class="rounded-lg md:hidden focus:outline-none focus:shadow-outline">
                        <svg fill="currentColor" viewBox="0 0 20 20" class="w-6 h-6">
                            <path id="open-mobile-menu" fillRule="evenodd" d="M1 2.75A.75.75 0 011.75 2h12.5a.75.75 0 110 1.5H1.75A.75.75 0 011 2.75zm0 5A.75.75 0 011.75 7h12.5a.75.75 0 110 1.5H1.75A.75.75 0 011 7.75zM1.75 12a.75.75 0 100 1.5h12.5a.75.75 0 100-1.5H1.75z" />
                            <path id="close-mobile-menu" class="hidden" fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
                <nav class="hidden md:block flex-col flex-grow pb-4 md:pb-0 md:flex md:flex-row">
                    <NuxtLink :class="path === '/' ? 'UnderlineNav-item UnderlineNav-item-selected' : 'UnderlineNav-item'" to="/" prefetch>{{ $t("Home") }}</NuxtLink>
                    <NuxtLink :class="path === '/explore' ? 'UnderlineNav-item UnderlineNav-item-selected' : 'UnderlineNav-item'" to="/explore" prefetch>{{ $t("Explore") }}</NuxtLink>

                    <div class="relative mt-1 ml-16 xl:ml-60 text-gray-600">
                        <input type="search" :placeholder='$t("Search")' class="bg-white h-10 px-11 pr-10 xl:pr-48 rounded-full text-sm focus:outline-none" />
                        <button aria-label="Search bar" class="absolute right-0 top-0 mt-3 mr-4">
                            <svg class="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966"  xmlSpace="preserve" width="512px" height="512px">
                            <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"/>
                            </svg>
                        </button>
                    </div>
                </nav>
                <nav id="mobile-menu" class="hidden md:hidden">
                    <span class="w-full flex justify-center text-center"><NuxtLink :class="path === '/' ? 'py-1 w-3/4 mb-2 bg-[#24292e] dark:bg-gray-700 text-white rounded' : 'py-1 w-3/4 bg-gray-300 dark:bg-gray-200 dark:text-black hover:bg-gray-400 rounded mb-2'" to="/" prefetch>{{ $t("Home") }}</NuxtLink></span>
                    <span class="w-full flex justify-center text-center"><NuxtLink :class="path === '/explore' ? 'py-1 w-3/4 mb-2 bg-[#24292e] dark:bg-gray-700 text-white rounded' : 'py-1 w-3/4 bg-gray-300 dark:bg-gray-200 dark:text-black hover:bg-gray-400 rounded mb-2'" to="/explore" prefetch>{{ $t("Explore") }}</NuxtLink></span>
                </nav>
                <div class="absolute pl-32 md:pl-0 md:static md:flex-left flex flex-row items-center justify-between h-11">
                    <div v-if="user">
                        <div class="relative ml-3">
                            <button type="button" aria-label="User menu" class="flex rounded-full text-sm focus:outline-none" @click="showProfile()">
                                <img class="h-8 w-8 rounded-full" :src='user.avatar ? "CDN_URL" : "/avatar/"+(user.username.match("[A-z]") ? user.username.match("[A-z]")[0].toUpperCase() : "A")+".webp"' alt="">
                            </button>

                            <div class="pt-1.5 pl-10">
                                <div id="show-profile" class="hidden z-50 origin-top-right absolute right-0 mt-3 w-48 rounded-md shadow-lg py-1 bg-slate-100 dark:bg-zinc-800 dark:border dark:border-zinc-700 ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical">
                                    <svg class="absolute bottom-full right-4" width="22" height="13" viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg">
                                        <polygon class="fill-slate-100 dark:fill-zinc-800 dark:stroke-zinc-700" points="15, 0 30, 20 0, 20"/>
                                    </svg>
                                    <p class="block px-4 py-2 text-sm text-gray-800 dark:text-gray-100">{{ $t("Signed in as") }}<br /><strong>{{ user.username }}</strong></p>
                                    <hr />
                                    <NuxtLink :to="'/'+user.vanity" prefetch class="block px-4 py-2 text-sm text-gray-700 dark:text-white">{{ $t("Profile") }}</NuxtLink>
                                    <NuxtLink to="/settings" prefetch class="block px-4 py-2 text-sm text-gray-700 dark:text-white">{{ $t("Parameters") }}</NuxtLink>
                                    <NuxtLink to="/upload" prefetch class="block px-4 py-2 text-sm text-gray-700 dark:text-white">{{ $t("New post") }}</NuxtLink>
                                    <span class="block px-4 py-2 text-sm text-gray-700 dark:text-white cursor-pointer"><span @click="logout()">{{ $t("Logout") }}</span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a v-else href="https://api.gravitalia.com/callback" class="cursor-pointer py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-[#332b43] dark:bg-indigo-600">{{ $t("Sign in") }}</a>
                </div>
            </div>
        </div>
    </div>
    <br /><br />
</template>

<script setup>
const token = useCookie("token");
const { data: user } = token.value ? await useFetch(`https://oauth.gravitalia.com/users/${JSON.parse(atob(token.value.split(".")[1])).sub}`, {}) : {data: null};

const path = useRoute().path;

const emit = defineEmits(["userData"]);
emit("userData", user);

function showProfile() {
    if(document.getElementById('show-profile').classList.value.includes('hidden')) {
        document.getElementById('show-profile').classList.remove('hidden');
    } else {
        document.getElementById('show-profile').classList.add('hidden');
    }
}

function logout() {
    document.cookie = "token=gv;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    window.location.reload();
}

function openMobile() {
    if(document.getElementById("mobile-menu").classList.contains("hidden")) {
        document.getElementById("mobile-menu").classList.remove("hidden");
        document.getElementById("open-mobile-menu").classList.add("hidden");
        document.getElementById("close-mobile-menu").classList.remove("hidden");
    } else {
        document.getElementById("mobile-menu").classList.add("hidden");
        document.getElementById("open-mobile-menu").classList.remove("hidden");
        document.getElementById("close-mobile-menu").classList.add("hidden");
    }
}
</script>

<style>
    .UnderlineNav-item {
        padding: 8px 16px;
        font-size: 14px;
        line-height: 30px;
        color: var(#24292e);
        text-align: center;
        white-space: nowrap;
        background-color: transparent;
        border: 0;
        border-bottom: 2px solid transparent;
        cursor: pointer;
    }
    .UnderlineNav-item:hover,
    .UnderlineNav-item:focus {
        color: var(#24292e);
        text-decoration: none;
        border-bottom-color: var(#d1d5da);
        outline: 1px dotted transparent;
        outline-offset: -1px;
        transition: border-bottom-color 0.12s ease-out;
    }
    .UnderlineNav-item.selected,
    .UnderlineNav-item[role="tab"][aria-selected="true"],
    .UnderlineNav-item-selected {
        font-weight: 600;
        color: var(#24292e);
        border-bottom-color: #332b43;
        outline: 1px dotted transparent;
        outline-offset: -1px;
    }

    input[type="search"]::-webkit-search-decoration,
    input[type="search"]::-webkit-search-cancel-button,
    input[type="search"]::-webkit-search-results-button,
    input[type="search"]::-webkit-search-results-decoration { display: none; }
</style>