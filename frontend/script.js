
const API_URL = "http://localhost:8080/api/products";

const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");

// Fetch products from Spring Boot backend
async function loadProducts(search = "") {
    try {
        productList.innerHTML = "<p>Loading products...</p>";

        const url = search
            ? `${API_URL}?search=${encodeURIComponent(search)}`
            : API_URL;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Unable to fetch products");
        }

        const products = await response.json();

        displayProducts(products);

    } catch (error) {
        productList.innerHTML =
            "<p>Unable to load products. Please make sure the backend is running.</p>";

        console.error(error);
    }
}

// Display products as cards
function displayProducts(products) {
    productList.innerHTML = "";

    if (products.length === 0) {
        productList.innerHTML = "<p>No products found.</p>";
        return;
    }

    products.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="price">₹${Number(product.price).toLocaleString("en-IN")}</div>
                <a href="product.html?id=${product.id}" class="details-btn">
                    View Details
                </a>
            </div>
        `;

        productList.appendChild(card);
    });
}

// Search products as the user types
searchInput.addEventListener("input", function () {
    loadProducts(this.value.trim());
});

// Load all products when page opens
loadProducts();
