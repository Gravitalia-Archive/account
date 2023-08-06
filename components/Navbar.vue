<template>
    <div>
        <div class="bg-gray-200 dark:bg-zinc-800">
            <div class="w-full text-gray-700 dark:text-white">
                <div class="flex flex-col max-w-screen-xl mx-auto md:items-center md:justify-between md:flex-row px-4 md:px-6 lg:px-8">
                    <div class="flex flex-row items-center justify-between h-10">
                    <img alt="Gravitalia logo" width="30" height="30" src="/favicon.webp" draggable="false" />
                    <div class="hidden md:block"><span class="ml-8"></span></div>

                    <button @click="isMobileMenuOpened = !isMobileMenuOpened" aria-label="Open menu" class="rounded-lg md:hidden focus:outline-none focus:shadow-outline">
                        <svg fill="currentColor" viewBox="0 0 20 20" class="w-6 h-6">
                            <path :class="isMobileMenuOpened ? 'block' : 'hidden'" d="M1 2.75A.75.75 0 011.75 2h12.5a.75.75 0 110 1.5H1.75A.75.75 0 011 2.75zm0 5A.75.75 0 011.75 7h12.5a.75.75 0 110 1.5H1.75A.75.75 0 011 7.75zM1.75 12a.75.75 0 100 1.5h12.5a.75.75 0 100-1.5H1.75z" />
                            <path :class="isMobileMenuOpened ? 'hidden' : 'block'" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
                        </svg>
                    </button>

                    </div>
                    <nav class="hidden md:block flex-col flex-grow pb-4 md:pb-0 md:flex md:flex-row">
                        <NuxtLink :to="localePath({ name: 'terms' })" prefetch :class="path === '/terms' ? 'UnderlineNav-item UnderlineNav-item-selected' : 'UnderlineNav-item'">
                            {{ $t("Terms") }}
                        </NuxtLink>

                        <NuxtLink :to="localePath({ name: 'privacy' })" prefetch :class="path === '/privacy' ? 'UnderlineNav-item UnderlineNav-item-selected' : 'UnderlineNav-item'">
                            {{ $t("Privacy") }}
                        </NuxtLink>
                    </nav>
                    <nav :class="isMobileMenuOpened ? 'block md:hidden' : 'hidden'">
                        <span class="w-full flex justify-center text-center">
                            <NuxtLink :to="localePath({ name: 'terms' })" prefetch :class="path === '/terms' ? 'py-1 w-3/4 mb-2 bg-[#24292e] dark:bg-gray-700 text-white rounded' : 'py-1 w-3/4 bg-gray-300 dark:bg-gray-200 dark:text-black hover:bg-gray-400 rounded mb-2'">
                                {{ $t("Terms") }}
                            </NuxtLink>
                        </span>

                        <span class="w-full flex justify-center text-center">
                            <NuxtLink :to="localePath({ name: 'privacy' })" prefetch :class="path === '/privacy' ? 'py-1 w-3/4 mb-2 bg-[#24292e] dark:bg-gray-700 text-white rounded' : 'py-1 w-3/4 bg-gray-300 dark:bg-gray-200 dark:text-black hover:bg-gray-400 rounded mb-2'">
                                {{ $t("Privacy") }}
                            </NuxtLink>
                        </span>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

const path = useRoute().path;
const isMobileMenuOpened = ref(false);
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
.UnderlineNav-item.selected,
.UnderlineNav-item[role="tab"][aria-selected="true"],
.UnderlineNav-item-selected {
    font-weight: 600;
    color: var(#24292e);
    border-bottom-color: #332b43;
    outline: 1px dotted transparent;
    outline-offset: -1px;
}
</style>