async function next() {
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
}

function back() {
	document.getElementById("create_acc").classList.remove("hidden");
	document.getElementById("email").classList.remove("hidden");
	document.getElementById("back_btn").classList.add("hidden");
	document.getElementById("psw").classList.add("hidden");
	document.getElementById("invalid_password_label").classList.add("hidden");
}

function login(mfa = null) {
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
}

async function mfa_keypress(event) {
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