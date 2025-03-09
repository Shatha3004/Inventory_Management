document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.getElementById("sidebar");
    const toggleBtn = document.getElementById("toggleBtn");
    const closeBtn = document.getElementById("closeBtn");

    toggleBtn.addEventListener("click", function () {
        sidebar.classList.add("active");
    });

    closeBtn.addEventListener("click", function () {
        sidebar.classList.remove("active");
    });
});

document.getElementById("productForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let id = document.getElementById("productID").value.trim();
    let name = document.getElementById("productName").value.trim();
    let type = document.getElementById("productType").value.trim().toLowerCase();
    let quantity = parseInt(document.getElementById("productQuantity").value.trim());
    let price = parseInt(document.getElementById("productPrice").value.trim());

    if (!["electronics", "cloths", "foods"].includes(type)) {
        alert("Invalid product type! Use: electronics, cloths, or foods.");
        return;
    }

    let products = JSON.parse(localStorage.getItem("products")) || [];
    
    let existingProduct = products.find(product => product.name === name && product.type === type);

    if (existingProduct) {
        // If the same product name & type exists, increase quantity
        existingProduct.quantity += quantity;
        alert(`Quantity updated! New quantity: ${existingProduct.quantity}`);
    } else {
        // Check if the same ID is being used for a different product
        let sameIDProduct = products.find(product => product.id === id && (product.name !== name || product.type !== type));

        if (sameIDProduct) {
            alert("Product ID already exists but with a different name/type! Please use a unique ID.");
            return;
        }

        // Add new product
        let newProduct = { id, name, type, quantity, price };
        products.push(newProduct);
        alert("Product added successfully!");
    }

    localStorage.setItem("products", JSON.stringify(products));

    document.getElementById("productForm").reset();
    loadProducts(); // Reload the products to update the UI
});