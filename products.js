function loadProducts() {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    document.querySelectorAll(".product-item").forEach(item => item.remove()); // Clear UI before loading

    products.forEach(product => {
        addProductToUI(product);
    });
}

function addProductToUI(product) {
    let productDiv = document.createElement("div");
    productDiv.classList.add("product-item");
    productDiv.setAttribute("data-name", product.name.toLowerCase());
    productDiv.setAttribute("data-id", product.id.toLowerCase());

    productDiv.innerHTML = `
        <strong>${product.name}</strong> (ID: ${product.id}, Qty: <span class="qty">${product.quantity}</span>)
        <button class="remove-btn" data-id="${product.id}">Remove</button>
    `;

    let categoryDiv = document.querySelector(`.${product.type}`);
    if (categoryDiv) {
        categoryDiv.appendChild(productDiv);
    }

    productDiv.querySelector(".remove-btn").addEventListener("click", function() {
        removeOneQuantity(product.id);
    });
}





// Function to search products dynamically
function searchProducts(event) {
    let searchTerm = event.target.value.toLowerCase();
    let categoryDiv = event.target.parentElement; // Get the parent category div

    let productItems = categoryDiv.querySelectorAll(".product-item");

    productItems.forEach(item => {
        let id = item.getAttribute("data-id"); // Search only by Product ID

        item.style.display = id.includes(searchTerm) ? "block" : "none";
    });
}

// Attach event listeners to all search bars
    document.querySelectorAll(".searchBar").forEach(searchBar => {
    searchBar.addEventListener("input", searchProducts);
});






// Function to remove one quantity of a product
function removeOneQuantity(productId) {
    let products = JSON.parse(localStorage.getItem("products")) || [];

    let product = products.find(p => p.id === productId);
    
    if (!product) {
        alert("Product not found!");
        return;
    }

    // Ask the user how many to remove
    let removeQty = parseInt(prompt(`Enter quantity to remove (Available: ${product.quantity}):`), 10);

    // Validate user input
    if (isNaN(removeQty) || removeQty <= 0) {
        alert("Invalid quantity! Please enter a valid number.");
        return;
    }

    if (removeQty > product.quantity) {
        alert("You cannot remove more than available quantity!");
        return;
    }

    // Update quantity
    let updatedProducts = products.map(p => {
        if (p.id === productId) {
            p.quantity -= removeQty;
            return p.quantity > 0 ? p : null;  // Remove product if quantity is 0
        }
        return p;
    }).filter(p => p !== null);

    // Update localStorage
    localStorage.setItem("products", JSON.stringify(updatedProducts));

    // Reload UI
    loadProducts();

    alert(`${removeQty} quantity removed!`);
}

// Load products when the page loads
window.onload = loadProducts;