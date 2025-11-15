// Cart page functionality
function displayCartItems() {
    const cartContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cart = getCart();
    
    if (!cartContainer) return;
    
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                <h4>Your cart is empty</h4>
                <a href="products.html" class="btn btn-primary mt-3">Continue Shopping</a>
            </div>
        `;
        return;
    }
    
    let total = 0;
    cartContainer.innerHTML = '';
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = `
            <div class="cart-item row align-items-center">
                <div class="col-md-2">
                    <img src="${item.image}" alt="${item.name}" class="img-fluid rounded">
                </div>
                <div class="col-md-4">
                    <h6 class="mb-1">${item.name}</h6>
                    <small class="text-muted">Size: ${item.size}</small>
                </div>
                <div class="col-md-2">
                    <span class="price">$${item.price}</span>
                </div>
                <div class="col-md-2">
                    <div class="input-group">
                        <button class="btn btn-outline-secondary quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                        <input type="text" class="form-control text-center" value="${item.quantity}" readonly>
                        <button class="btn btn-outline-secondary quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                    </div>
                </div>
                <div class="col-md-2">
                    <span class="fw-bold">$${itemTotal.toFixed(2)}</span>
                    <button class="btn btn-danger btn-sm ms-2" onclick="removeFromCart(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        
        cartContainer.innerHTML += cartItem;
    });
    
    cartTotal.textContent = total.toFixed(2);
}

function updateQuantity(index, change) {
    const cart = getCart();
    cart[index].quantity += change;
    
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    
    saveCart(cart);
    displayCartItems();
}

function removeFromCart(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    displayCartItems();
}

// Initialize cart page
if (document.getElementById('cart-items')) {
    displayCartItems();
}