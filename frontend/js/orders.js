
const API_BASE_URL = "/api";
const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
    window.location.href = "login.html";
}

async function loadOrders() {

    const response = await fetch(`${API_BASE_URL}/orders`
    );

    const orders = await response.json();

    const container =
        document.getElementById("orders-container");

    container.innerHTML = "";

    orders.forEach(order => {

        if (order.user_id === user.id) {

            container.innerHTML += `

            <div class="order-card">

                <h2>📦 Order #${order.id}</h2>

                <p>Total : ₹${order.total_amount}</p>

                <p>Status : ${order.status}</p>

            </div>

            `;

        }

    });

}

loadOrders();