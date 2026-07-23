// ================================
// Add Product to Cart
// ================================

const user = JSON.parse(localStorage.getItem("user"));

if (!user) {

    window.location.href = "login.html";

}


function logout() {

    localStorage.removeItem("user");

    window.location.href = "login.html";

}

function showLoggedInUser() {

    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {

        document.getElementById("user-info").innerHTML = `
            <h3>👤 Welcome, ${user.name}</h3>
            <p>${user.email}</p>
        `;

    }

}


async function addToCart(product) {

    const user = JSON.parse(localStorage.getItem("user"));

    await fetch("http://127.0.0.1:5000/cart", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            id: product.id,
            user_id: user.id
        })

    });

    loadCart();
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

        const user = JSON.parse(localStorage.getItem("user"));

const response = await fetch(
    `http://127.0.0.1:5000/cart?user_id=${user.id}`
);

        const cart = await response.json();

        console.log(cart);

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

<button onclick="increaseQuantity(${item.id})">
    ➕
</button>

<button onclick="removeFromCart(${item.id})">
    🗑 Remove
</button>

<button onclick="decreaseQuantity(${item.id})">
    ➖
</button>

            <hr>

        </div>
    `;

});

    } catch (error) {

        console.error(error);

    }

}

async function removeFromCart(cartId){
    try{
        const response = await fetch(`http://127.0.0.1:5000/cart/${cartId}`,{method:"DELETE"});
        const result =await response.json();
        console.log(result.message);
        loadCart();
    }  catch (error) {
        
        console.error(error);   
    }
}

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

        await loadCart();

    } catch (error) {

        console.error(error);

    }

}
    

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

        await loadCart();

    } catch (error) {

        console.error(error);

    }

}

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