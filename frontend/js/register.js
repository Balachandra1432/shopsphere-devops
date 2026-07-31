
const API_BASE_URL = "/api";

async function registerUser() {

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {

        const response = await fetch(`${API_BASE_URL}/register`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })

        });

       const result = await response.json();

console.log("Before redirect");

if (response.ok) {
    console.log("Redirecting...");
    window.location.href = "./index.html";
} else {
    console.log(result.message);
}

console.log("End of function");
    } catch (error) {

        console.error(error);
        alert("Something went wrong!");

    }

}