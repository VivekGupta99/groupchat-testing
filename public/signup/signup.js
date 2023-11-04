let signupForm = document.querySelector("#signupForm");

signupForm.addEventListener("submit", formSubmit);

function showMessageDiv(text) {
	let head2 = document.createElement("h2");
	head2.innerHTML = text;
	document.querySelector("#messageDiv").appendChild(head2);

	setTimeout(() => {
		document.querySelector("#messageDiv").innerHTML = "";
	}, 3002);
}

async function formSubmit(e) {
	try {
		e.preventDefault();
		let obj = {
			name: document.querySelector("#nameInput").value,
			email: document.querySelector("#emailInput").value,
			phoneNo: document.querySelector("#phoneNoInput").value,
			password: document.querySelector("#passwordInput").value,
		};

		let response = await axios.post("http://localhost:3002/users/signup", obj);
		if (response) {
			showMessageDiv(response.data.msg);
			window.location.href = '/login'
		}
	} catch (error) {
		console.log(error);
		showMessageDiv(error.response.data.msg);
	}
}
