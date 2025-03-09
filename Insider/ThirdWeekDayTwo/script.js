document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements
    const fetchButton = document.getElementById('fetchProducts');
    const productContainer = document.getElementById('productContainer');
    
    // Add click event to list products button
    fetchButton.addEventListener('click', fetchProducts);
    
    // Fetch products with AJAX
    function fetchProducts() {
        // Create XMLHttpRequest object
        const xhr = new XMLHttpRequest();
        
        // Open connection (GET method, request products.json file)
        xhr.open('GET', 'products.json', true);
        
        // Define what to do when response is received
        xhr.onload = function() {
            if (this.status === 200) {
                try {
                    // Convert JSON data to JavaScript object
                    const products = JSON.parse(this.responseText);
                    
                    // Clear product container
                    productContainer.innerHTML = '';
                    
                    // Create card for each product
                    products.forEach(product => {
                        createProductCard(product);
                    });
                } catch (e) {
                    console.error('JSON parsing error:', e);
                    productContainer.innerHTML = '<p>An error occurred while loading product data.</p>';
                }
            } else {
                productContainer.innerHTML = '<p>Product data could not be retrieved. Error code: ' + this.status + '</p>';
            }
        };
        
        // In case of network error
        xhr.onerror = function() {
            productContainer.innerHTML = '<p>A network error occurred.</p>';
        };
        
        // Send the request
        xhr.send();
    }
    
    // Function to create product card
    function createProductCard(product) {
        // Create a new product card
        const card = document.createElement('div');
        card.classList.add('product-card');
        
        // Add product image
        const productImage = document.createElement('img');
        productImage.classList.add('product-image');
        productImage.src = product.image;
        productImage.alt = product.name;
        card.appendChild(productImage);
        
        // Product info container
        const productInfo = document.createElement('div');
        productInfo.classList.add('product-info');
        
        // Product name
        const productName = document.createElement('div');
        productName.classList.add('product-name');
        productName.textContent = product.name;
        
        // Product price
        const productPrice = document.createElement('div');
        productPrice.classList.add('product-price');
        productPrice.textContent = '₺' + product.price;
        
        // Product link
        const productLink = document.createElement('a');
        productLink.classList.add('product-link');
        productLink.href = product.link;
        productLink.textContent = 'Product Details';
        productLink.target = '_blank'; // Open in new tab
        
        // Connect elements together
        productInfo.appendChild(productName);
        productInfo.appendChild(productPrice);
        productInfo.appendChild(productLink);
        card.appendChild(productInfo);
        
        // Add card to container
        productContainer.appendChild(card);
    }
}); 