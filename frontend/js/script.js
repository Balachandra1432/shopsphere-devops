// ================================
// Check Login
// ================================

const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
    window.location.href = "login.html";
}

// ================================
// Logout
// ================================

function logout() {
    localStorage.removeItem("user");
    window.location.href = "login.html";
}

// ================================
// Show Logged-in User
// ================================

function showLoggedInUser() {

    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
        document.getElementById("welcome-user").textContent = `👤 ${user.name}`;
    }

}

// ================================
// Add Product to Cart
// ================================

async function addToCart(productId) {

    try {

        const user = JSON.parse(localStorage.getItem("user"));

        const response = await fetch("http://127.0.0.1:5000/cart", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                id: productId,
                user_id: user.id
            })

        });

        const result = await response.json();

        console.log(result);

        loadCart();

    } catch (error) {

        console.error(error);

    }

}

// ================================
// Load Products
// ================================

async function loadProducts() {

    try {

        const response = await fetch("http://127.0.0.1:5000/products");

        const products = await response.json();

        const container = document.getElementById("product-container");

        container.innerHTML = "";

        products.forEach(product => {

            const card = document.createElement("div");

            card.className = "product-card";

            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}" width="200">

                <h3>${product.name}</h3>

                <p>₹${product.price}</p>

                <button onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            `;

            container.appendChild(card);

        });

    } catch (error) {

        console.error("Error loading products:", error);

    }

}

// ================================
// Load Cart
// ================================

async function loadCart() {

    try {

        const user = JSON.parse(localStorage.getItem("user"));

        const response = await fetch(
            `http://127.0.0.1:5000/cart?user_id=${user.id}`
        );

        const cart = await response.json();

        const cartContainer = document.getElementById("cart-container");

        cartContainer.innerHTML = "";

        if (cart.length === 0) {

            cartContainer.innerHTML = "<p>Your cart is empty.</p>";

            return;

        }

        cart.forEach(item => {

            cartContainer.innerHTML += `
                <div class="cart-item">

                    <h3>${item.product_name}</h3>

                    <p>₹${item.price}</p>

                    <p>Quantity : ${item.quantity}</p>

                    <button onclick="increaseQuantity(${item.id})">➕</button>

                    <button onclick="decreaseQuantity(${item.id})">➖</button>

                    <button onclick="removeFromCart(${item.id})">
                        🗑 Remove
                    </button>

                    <hr>

                </div>
            `;

        });

    } catch (error) {

        console.error(error);

    }

}

// ================================
// Remove Cart Item
// ================================

async function removeFromCart(cartId) {

    try {

        const response = await fetch(
            `http://127.0.0.1:5000/cart/${cartId}`,
            {
                method: "DELETE"
            }
        );

        const result = await response.json();

        console.log(result.message);

        loadCart();

    } catch (error) {

        console.error(error);

    }

}

// ================================
// Increase Quantity
// ================================

async function increaseQuantity(cartId) {

    try {

        const response = await fetch(
            `http://127.0.0.1:5000/cart/${cartId}/increase`,
            {
                method: "PATCH"
            }
        );

        const result = await response.json();

        console.log(result.message);

        loadCart();

    } catch (error) {

        console.error(error);

    }

}

// ================================
// Decrease Quantity
// ================================

async function decreaseQuantity(cartId) {

    try {

        const response = await fetch(
            `http://127.0.0.1:5000/cart/${cartId}/decrease`,
            {
                method: "PATCH"
            }
        );

        const result = await response.json();

        console.log(result.message);

        loadCart();

    } catch (error) {

        console.error(error);

    }

}

// ================================
// Place Order
// ================================

async function placeOrder() {

    try {

        const user = JSON.parse(localStorage.getItem("user"));

        const response = await fetch(
            "http://127.0.0.1:5000/orders",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    user_id: user.id
                })
            }
        );

        const result = await response.json();

        console.log(result);

        loadCart();

    } catch (error) {

        console.error(error);

    }

}

// ================================
// Start Application
// ================================

showLoggedInUser();
loadProducts();
loadCart();