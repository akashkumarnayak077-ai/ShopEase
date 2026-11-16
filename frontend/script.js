
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

// =============================
// CSS THEME GENERATOR
// =============================

const themes = [
    {
        name: "Ocean Blue",
        primary: "#1769aa",
        page: "#eaf4ff",
        surface: "#ffffff",
        text: "#20243a",
        heroStart: "#d6eaff",
        heroEnd: "#eff7ff",
        footer: "#123653",
        font: "Arial, sans-serif"
    },
    {
        name: "Forest Green",
        primary: "#287a43",
        page: "#edf7ed",
        surface: "#ffffff",
        text: "#203328",
        heroStart: "#d9efdc",
        heroEnd: "#f0f8f0",
        footer: "#183d26",
        font: "Georgia, serif"
    },
    {
        name: "Sunset Orange",
        primary: "#d65a24",
        page: "#fff4eb",
        surface: "#ffffff",
        text: "#38251c",
        heroStart: "#ffe0c9",
        heroEnd: "#fff2e8",
        footer: "#572b19",
        font: "Trebuchet MS, sans-serif"
    },
    {
        name: "Royal Purple",
        primary: "#8045b8",
        page: "#f5efff",
        surface: "#ffffff",
        text: "#30203f",
        heroStart: "#e9d9ff",
        heroEnd: "#f6efff",
        footer: "#392052",
        font: "Verdana, sans-serif"
    },
    {
        name: "Midnight Dark",
        primary: "#8baeff",
        page: "#202938",
        surface: "#2c3749",
        text: "#f2f4f8",
        heroStart: "#273b59",
        heroEnd: "#202938",
        footer: "#111827",
        font: "Arial, sans-serif"
    }
];

const generateButton = document.getElementById("generateThemeBtn");
const themeName = document.getElementById("themeName");

if (generateButton && themeName) {

    generateButton.addEventListener("click", function () {

        // Select a random theme
        const randomIndex = Math.floor(Math.random() * themes.length);
        const selectedTheme = themes[randomIndex];

        // Get the root CSS element
        const root = document.documentElement;

        // Apply the selected theme
        root.style.setProperty("--primary-color", selectedTheme.primary);
        root.style.setProperty("--page-bg", selectedTheme.page);
        root.style.setProperty("--surface-color", selectedTheme.surface);
        root.style.setProperty("--text-color", selectedTheme.text);
        root.style.setProperty("--hero-start", selectedTheme.heroStart);
        root.style.setProperty("--hero-end", selectedTheme.heroEnd);
        root.style.setProperty("--footer-color", selectedTheme.footer);
        root.style.setProperty("--font-family", selectedTheme.font);

        // Display the selected theme name
        themeName.textContent = "Current Theme: " + selectedTheme.name;

        // Save the selected theme so it remains active across pages
       localStorage.setItem("selectedTheme", JSON.stringify(selectedTheme));
    });
}
