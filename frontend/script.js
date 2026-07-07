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
                    <button>Add to Cart</button>
                </div>
            `;

        });

    } catch (error) {

        console.error(error);

    }

}

loadProducts();