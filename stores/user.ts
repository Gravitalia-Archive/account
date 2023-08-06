/**
* Structure of a user
*/
export interface User {
    username: string;
    vanity: string;
    avatar?: string | null;
    bio?: string | null;
    email: string;
    birthdate?: string | null;
    verified: boolean;
    deleted: boolean;
    flags: number;
}

const EMPTY_USER: User = {
    username: "",
    vanity: "",
    avatar: null,
    bio: null,
    email: "",
    birthdate: null,
    verified: false,
    deleted: false,
    flags: 0
};

export const useUser = defineStore("user", {
    state: () => (
        EMPTY_USER
    ),

    actions: {
        /**
         * Get user with its session token
         */
        async fetchUser(forceFetching: boolean = false): Promise<void> {
            // Get session
            const session: string = useCookie("session").value || "";
            if(!forceFetching && (session === "" || this.vanity !== "")) return;

            // Set header
            const headers = new Headers();
            headers.append("Authorization", session)

            // Set user in data
            this.$patch(
                await fetch(`${useRuntimeConfig().public?.API_URL || "https://oauth.gravitalia.com"}/users/@me`, {
                    headers
                })
                .then(res => res.json()) as User
            )
        },

        /**
         * Logout user by removing cookie and set it to null
         */
        logout(): void {
            useCookie("session").value = null;
            this.$patch(EMPTY_USER)
        }
    }
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUser, import.meta.hot))
}