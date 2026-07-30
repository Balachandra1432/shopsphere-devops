// ================================
// Check Login
// ================================

let allProducts = [];
const API_BASE_URL = "http://127.0.0.1:5000";
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
function toggleWishlist(element, productId) {

    let wishlist = getWishlist();

    if (wishlist.includes(productId)) {

        wishlist = wishlist.filter(id => id !== productId);

        element.textContent = "🤍";

    } else {

        wishlist.push(productId);

        element.textContent = "❤️";

    }

    saveWishlist(wishlist);

}

// ================================
// Wishlist Storage
// ================================

function getWishlist() {

    return JSON.parse(localStorage.getItem("wishlist")) || [];

}

function saveWishlist(wishlist) {

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

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

        const response = await fetch(`${API_BASE_URL}/cart`, {

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
// Display Products
// ================================

function displayProducts(products) {
    const wishlist = getWishlist();

    const container = document.getElementById("product-container");

    container.innerHTML = "";

    products.forEach(product => {

        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `
    <div class="wishlist" onclick="toggleWishlist(this, ${product.id})">
    ${wishlist.includes(product.id) ? "❤️" : "🤍"}
</div>

    <div class="discount-badge">
        🔥 20% OFF
    </div>

    <img src="${product.image}" alt="${product.name}">

    <h3>${product.name}</h3>

    <div class="rating">
        ⭐⭐⭐⭐☆ <span>(4.6)</span>
    </div>

    <div class="price-section">
        <span class="new-price">₹${product.price}</span>
        <span class="old-price">₹${Math.round(product.price * 1.2)}</span>
    </div>

    <button onclick="addToCart(${product.id})">
        🛒 Add to Cart
    </button>
`;

        container.appendChild(card);

    });

}

// ================================
// Load Products
// ================================

async function loadProducts() {

    try {

        const response = await fetch(`${API_BASE_URL}/products`);

        const products = await response.json();

        allProducts = products;

displayProducts(allProducts);

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

        const response = await fetch(`${API_BASE_URL}/cart/${cartId}`,
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


const searchInput = document.getElementById("search-input");

searchInput.addEventListener("input", () => {

    const searchText = searchInput.value.toLowerCase();

    const filteredProducts = allProducts.filter(product =>
        product.name.toLowerCase().includes(searchText)
    );

    displayProducts(filteredProducts);

});

// ================================
// Start Application
// ================================

showLoggedInUser();
loadProducts();
loadCart();