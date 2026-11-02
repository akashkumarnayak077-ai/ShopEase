
const API_URL = "http://localhost:8080/api/products";

const productDetails = document.getElementById("productDetails");

async function loadProductDetails() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");

    if (!productId || !/^\d+$/.test(productId)) {
        productDetails.innerHTML = "<p>Invalid product ID.</p>";
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${productId}`);

        if (response.status === 404) {
            productDetails.innerHTML = "<p>Product not found.</p>";
            return;
        }

        if (!response.ok) {
            throw new Error("Unable to fetch product");
        }

        const product = await response.json();

        productDetails.innerHTML = `
            <div class="details-layout">
                <div class="details-image">
                    <img src="${product.imageUrl}" alt="${product.name}">
                </div>

                <div class="details-info">
                    <p class="tagline">PRODUCT DETAILS</p>
                    <h1>${product.name}</h1>
                    <p>${product.description}</p>
                    <div class="price">
                        ₹${Number(product.price).toLocaleString("en-IN")}
                    </div>
                    <p>Product ID: ${product.id}</p>
                    <a href="index.html#products" class="shop-btn">
                        Continue Shopping
                    </a>
                </div>
            </div>
        `;

    } catch (error) {
        productDetails.innerHTML =
            "<p>Unable to load product details. Please try again.</p>";

        console.error(error);
    }
}

loadProductDetails();
