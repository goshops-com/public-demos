async function searchProducts(event) {
    if (event.key === 'Enter') {
        const searchText = event.target.value;
        const results = await window.gsSDK.search(searchText, {});
        displayProducts(results);
    }
}

function displayProducts(products) {
    const container = document.getElementById('productsContainer');
    container.innerHTML = ''; // Clear previous results
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'col-md-4 mb-3';
        productDiv.innerHTML = `
            <div class="card">
                <img src="${product.image_url}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                </div>
            </div>
        `;
        container.appendChild(productDiv);
    });
}
