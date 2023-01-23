async function next() {
    if(!document.getElementById("first")?.classList.value.includes("hidden")) {
        if(!document.getElementById("firstname").value || document.getElementById("firstname").value.length >= 16) {
            document.getElementById("password")?.classList.remove("border-red-500");
            document.getElementById("email")?.classList.remove("border-red-500");
            document.getElementById("firstname")?.classList.add("border-red-500");
        } else if((!document.getElementById("email").value.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,7})$/))) {
            document.getElementById("password")?.classList.remove("border-red-500");
            document.getElementById("firstname")?.classList.remove("border-red-500");
            document.getElementById("email")?.classList.add("border-red-500");
        } else if(!document.getElementById("password").value.match(/([0-9|*|]|[$&+,:;=?@#|'<>.^*()%!-_])+/) || !document.getElementById("password").value.match(/[A-z]/) || document.getElementById("password").value.length < 8) {
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
        if(!document.getElementById("vanity").value || !document.getElementById("vanity").value.match(/[A-z|0-9|_]{3,16}/)) {
            document.getElementById("password")?.classList.remove("border-red-500");
            document.getElementById("email")?.classList.remove("border-red-500");
            document.getElementById("firstname")?.classList.remove("border-red-500");
            document.getElementById("vanity_div")?.classList.add("border-red-500");
        } else if(document.getElementById("birth").value && new Date().getFullYear()-parseInt(document.getElementById("birth").value.split("-")[0], 10) < 13) {
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
}

function back() {
    document.getElementById("first")?.classList.remove("hidden");
    document.getElementById("second")?.classList.add("hidden");
    document.getElementById("create_acc")?.classList.remove("hidden");
    document.getElementById("back_btn")?.classList.add("hidden");
}

function create() {
    return new Promise(async (resolve, reject) => {
        if(this.token.length === 0) {
            const MATCH = document.getElementById("CF-Token-Generator").innerHTML.match(/value=".*">/gm);
            if(!MATCH) setTimeout(() => {return this.create()}, 1000);
            else this.token = MATCH[0]?.replace(/value="/g, "")?.replace(/">/g, "");
        }

        if(document.getElementById("email").value === "") return resolve("email");
        fetch("https://oauth.gravitalia.studio/login", {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "application/json",
                "CF-Turnstile-Token": this.token,
                "Sec": await window.fingerprint()
            },
            body: JSON.stringify({
                username: document.getElementById("firstname").value + (document.getElementById("lastname").value ? ` ${document.getElementById("lastname").value}` : ""),
                vanity: document.getElementById("vanity").value.toLowerCase(),
                birthdate: document.getElementById("birth").value,
                email: document.getElementById("email").value,
                password: document.getElementById("password").value
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