<template>
    	<div class="mt-28 h-[60vh] xl:h-[50vh] xl:mt-40 flex justify-center items-center">
		<div class="p-11 border-[1px] -mt-10 border-none lg:border-solid border-slate-200 dark:border-zinc-800 dark:bg-zinc-800 rounded-md flex flex-col items-center space-y-3 shadow-sm">
			<img class="rounded-lg" width="50" height="50" draggable="false" alt="" :src="bot?.avatar ? runtimeConfig.CDN_URL+'/t_avatar/'+bot.avatar+'.webp' : `https://www.gravitalia.com/avatar/${bot?.username ? bot?.username[0].match(/[A-z]/) ? bot?.username[0]?.toUpperCase() : 'A' : 'A'}.webp`" />
			<p class="text-lg font-semibold">{{ bot?.username }} {{ $t("wants access to your account") }}</p>
			<div class="flex items-center">
				<div class="w-6 h-6 rounded-full bg-green-300 flex justify-center items-center">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-gray-700">
						<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
					</svg>
				</div>
				<p class="ml-2">
                    {{ $t("Access to username and avatar") }}
                </p>
			</div>

			<div class="pt-11 flex justify-between w-full">
				<NuxtLink :to="`${query.redirect_uri.includes('http') ? query.redirect_uri : 'https://' + query.redirect_uri}?error=access_denied&error_description=The+resource+owner+or+authorization+server+denied+the+request${query.state ? '&state=' + query.state : ''}`" class="text-sm px-2 py-2 bg-indigo-50 dark:bg-opacity-0 dark:border-none outline-none border border-indigo-100 rounded text-indigo-500 dark:text-white font-medium hover:bg-indigo-400 dark:hover:bg-indigo-500 hover:text-white transition-colors duration-200">
					{{ $t("Cancel") }}
				</NuxtLink>
                
				<button @click="authorize()" class="text-sm px-4 py-2 outline-none rounded bg-[#332b43] dark:bg-indigo-500 dark:hover:bg-indigo-600 font-medium text-white disabled:opacity-75 transition-colors duration-200 disabled:cursor-not-allowed">
					{{ $t("Authorize") }}
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
const token = useCookie("session").value;
const user = useUser();
const runtimeConfig = useRuntimeConfig().public;
const query = useRoute().query;

// Fetch user
await user.fetchUser();

// Redirect user if not connected
if(!token || user.vanity === "") {
    await navigateTo("/signin");
}

// Fetch bot
const { data: bot } = await useFetch(`${runtimeConfig?.API_URL || "https://oauth.gravitalia.com"}/users/${query?.client_id}`, {
    headers: {
        "Authorization": token
    },
    server: false
});

// Fetch if token already exists
const { data: oauth } = await useFetch(`${useRuntimeConfig().public?.API_URL || "https://oauth.gravitalia.com"}/oauth2`, {
    method: "POST",
    headers: {
        "Authorization": token,
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        response_type: query?.response_type || "code",
        bot_id: query?.client_id,
        redirect_uri: query?.redirect_uri?.includes("http") ? query.redirect_uri : `https://${query?.redirect_uri}`,
        scope: "identity"
    })
});

if(oauth.value?.message && !oauth.value.message.includes("Invalid") && oauth.value.message !== "") {
    await navigateTo(
        query?.redirect_uri?.includes("http") ?
        `${query.redirect_uri}?${query?.response_type || "code"}=${oauth.value.message}${query.state ? '&state=' + query.state : ''}`
        : `https://${query?.redirect_uri}?${query?.response_type || "code"}=${oauth.value.message}${query.state ? '&state=' + query.state : ''}`,
        {
            external: true
        }
    )
}

function authorize() {
    fetch("https://oauth.gravitalia.com/oauth2", {
		method: "POST",
		headers: {
			"Authorization": token,
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
            response_type: query?.response_type || "code",
            bot_id: query?.client_id,
            redirect_uri: query?.redirect_uri?.includes("http") ? query.redirect_uri : `https://${query?.redirect_uri}`,
            scope: "identity"
		})
	})
	.then(res => res.json())
	.then(async (res) => {
		if(res.message === "Invalid bot_id") {
			await navigateTo("/oauth2/error?message=Invalid%20bot");
		} else if(res.message === "Invalid redirect_uri") {
			await navigateTo("/oauth2/error?message=Invalid%20redirect_uri");
		} else if(res.message === "Internal server error") {
			await navigateTo("/oauth2/error");
		} else {
			await navigateTo(
                `
                    ${query?.redirect_uri?.includes("http") ?
                    `${query.redirect_uri}?${query?.response_type || "code"}=${oauth.value.message}${query.state ? '&state=' + query.state : ''}`
                    : `https://${query?.redirect_uri}`}?${query?.response_type || "code"}=${oauth.value.message}${query.state ? '&state=' + query.state : ''}
                `,
                {
                    external: true
                }
            )
		}
	});
}
</script>