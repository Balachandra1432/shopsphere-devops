
const API_BASE_URL = "/api";

async function loginUser() {

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

    try {

        const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",

    headers: {
        "Content-Type": "application/json"
    },

    body: JSON.stringify({
        email: email,
        password: password
    })
});
            

        const result = await response.json();

        alert(result.message);

        if (response.ok) {

            localStorage.setItem(
                "user",
                JSON.stringify(result.user)
            );

            window.location.href = "index.html";

        }

    } catch (error) {

        console.error(error);

        alert("Something went wrong!");

    }

}