// ================================
// Add Product to Cart
// ================================

async function addToCart(product) {

    try {

        const response = await fetch("http://127.0.0.1:5000/cart", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(product)

        });

        const result = await response.json();

        console.log(result.message);

        // Refresh the cart after adding a product
        await loadCart();

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

            container.innerHTML += `
                <div class="card">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>₹${product.price}</p>

                    <button onclick='addToCart(${JSON.stringify(product)})'>
                        Add to Cart
                    </button>

                </div>
            `;

        });

    } catch (error) {

        console.error(error);

    }

}


// ================================
// Load Cart
// ================================

async function loadCart() {

    try {

        const response = await fetch("http://127.0.0.1:5000/cart");

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
                    <p>Quantity: ${item.quantity}</p>
                    <hr>
                </div>
            `;

        });

    } catch (error) {

        console.error(error);

    }

}


// ================================
// Start Application
// ================================

loadProducts();
loadCart();