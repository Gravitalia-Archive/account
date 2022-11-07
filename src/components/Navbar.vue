<template>
          <div>
            <div class="bg-gray-200 dark:bg-zinc-800">
              <div class="w-full text-gray-700 dark:text-white">
                <div class="flex flex-col max-w-screen-xl mx-auto md:items-center md:justify-between md:flex-row px-4 md:px-6 lg:px-8">
                  <div class="flex flex-row items-center justify-between">
                    <img alt="Gravitalia logo" width="30" height="30" src="/favicon.webp" draggable="false" />
                    <div class="block md:hidden">
                      <a href="/sign-in" class="cursor-pointer py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-[#332b43] dark:bg-indigo-600">Sign in</a>
                    </div>
                    <div class="hidden md:block"><span class="ml-8"></span></div>
                    <button aria-label="Open menu" class="rounded-lg md:hidden focus:outline-none focus:shadow-outline">
                      <svg fill="currentColor" viewBox="0 0 20 20" class="w-6 h-6">
                        <path id="open-mobile-menu" fillRule="evenodd" d="M1 2.75A.75.75 0 011.75 2h12.5a.75.75 0 110 1.5H1.75A.75.75 0 011 2.75zm0 5A.75.75 0 011.75 7h12.5a.75.75 0 110 1.5H1.75A.75.75 0 011 7.75zM1.75 12a.75.75 0 100 1.5h12.5a.75.75 0 100-1.5H1.75z" />
                        <path id="close-mobile-menu" class="hidden" fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  <nav class="hidden md:block flex-col flex-grow pb-4 md:pb-0 md:flex md:flex-row">
                    <a class="UnderlineNav-item UnderlineNav-item-selected" href="#">Home</a>
                    <a class="UnderlineNav-item" href="https://gravitalia.statuspage.io/">Terms</a>

                    <div class="relative mt-1 ml-44 text-gray-600">
                      <input type="search" placeholder="Search" class="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none" />
                      <button aria-label="Search bar" class="absolute right-0 top-0 mt-3 mr-4">
                        <svg class="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966"  xmlSpace="preserve" width="512px" height="512px">
                          <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"/>
                        </svg>
                      </button>
                    </div>
                  </nav>
                  <!--<nav id="mobile-menu" class="hidden md:hidden flex-col flex-grow pb-4">
                    <br />
                    <Link prefetch="intent" to="/" dangerouslySetInnerHTML={{__html: t("Home", l)}}></Link><br />
                    <a href="https://gravitalia.statuspage.io/" dangerouslySetInnerHTML={{__html: t("Status", l)}}></a><br />
                    <Link prefetch="intent" to="/developer" dangerouslySetInnerHTML={{__html: t("Developer", l)}}></Link><br />
                    <a href="https://blog.gravitalia.studio/" dangerouslySetInnerHTML={{__html: t("Blog", l)}}></a><br />
                  </nav> -->
                </div>
              </div>
            </div>
          </div>
</template>

<script lang="ts">
    export default {
        data() {
            return {
                path: ""
            }
        },
        mounted() {
            this.path = window.location.pathname;
        }
    };
</script>