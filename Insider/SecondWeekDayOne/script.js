let user = {};

let cart = [];

const products = [
    { id: 1, name: "PERSBOL Chair", price: 350 },
    { id: 2, name: "VEDBO Chair", price: 140 },
    { id: 3, name: "SOTENAS Chair", price: 210 }
];

function getUserInfo() {
    user.name = prompt("Please enter your name:");
    user.age = prompt("Please enter your age:");
    user.occupation = prompt("Please enter your occupation:");
    alert(`Welcome ${user.name}!`);
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        alert(`${product.name} Added to cart!\nCart Total: $${total}`);
    }
}

function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index > -1) {
        const removedItem = cart.splice(index, 1)[0];
        alert(`${removedItem.name} removed from cart!`);
    }
}

function addNewProduct() {
    const name = prompt("Please enter the product name:");
    const price = Number(prompt("Please enter the product price:"));
    if (name && price) {
        const newProduct = {
            id: products.length + 1,
            name: name,
            price: price
        };
        products.push(newProduct);
        alert("New product added!");
    }
}

function listCart() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    let cartList = `Your Cart (Total: $${total}):\n\n`;
    cart.forEach((item, index) => {
        cartList += `${index + 1}. ${item.name} - $${item.price}\n`;
    });
    
    cartList += "\nAvailable Products to Add:\n";
    products.forEach((product, index) => {
        cartList += `${cart.length + index + 1}. ${product.name} - $${product.price}\n`;
    });
    
    const action = prompt(`${cartList}\n\nEnter a number to:\n1-${cart.length} to remove item\n${cart.length + 1}-${cart.length + products.length} to add item\n(or cancel to exit):`);
    
    if (action !== null) {
        const actionNum = parseInt(action) - 1;
        if (actionNum >= 0 && actionNum < cart.length) {
            removeFromCart(cart[actionNum].id);
            listCart();
        } else if (actionNum >= cart.length && actionNum < cart.length + products.length) {
            const productIndex = actionNum - cart.length;
            addToCart(products[productIndex].id);
            listCart();
        }
    }
}

getUserInfo();

const buttons = document.querySelectorAll('.cart-button');
buttons.forEach((button, index) => {
    const buttonText = button.querySelector('.cart-text').textContent;
    if (buttonText === 'Add to cart') {
        button.addEventListener('click', () => {
            const productIndex = Math.floor(index / 2);
            addToCart(products[productIndex].id);
        });
    } else if (buttonText === 'Go to cart') {
        button.addEventListener('click', listCart);
    }
});