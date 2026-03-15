const BASE_URL = 'http://localhost:8000';

document.addEventListener('DOMContentLoaded', async () => {

    const cartLoading = document.getElementById('cartLoading');
    const cartEmpty = document.getElementById('cartEmpty');
    const cartContent = document.getElementById('cartContent');
    const cartItemsContainer = document.getElementById('cartItems');
    const summaryItemCount = document.getElementById('summaryItemCount');
    const summarySubtotal = document.getElementById('summarySubtotal');
    const summaryTotal = document.getElementById('summaryTotal');

    const proceedPaymentBtn = document.getElementById("proceedPaymentBtn");

    if (proceedPaymentBtn) {
        proceedPaymentBtn.addEventListener("click", () => {
            window.location.href = "payment.html";
        });
    }

    // --- Resolve user_id from JWT email ---
    let userId = null;
    let userEmail = null;

    const token = localStorage.getItem('token');
    if (!token) return;

    try {
        const payloadBase64 = token.split('.')[1];
        const decoded = JSON.parse(atob(payloadBase64));
        userEmail = decoded.sub;
    } catch (e) {
        console.error('Could not decode token');
        return;
    }

    // Fetch user_id from backend
    try {
        const res = await fetch(`${BASE_URL}/auth/me?email=${encodeURIComponent(userEmail)}`);
        if (!res.ok) throw new Error('User not found');
        const userData = await res.json();
        userId = userData.id;
        // Store for other pages to use
        localStorage.setItem('userId', userId);
    } catch (e) {
        console.error('Could not fetch user info:', e);
        cartLoading.style.display = 'none';
        cartEmpty.style.display = 'block';
        return;
    }

    // --- Load Cart ---
    let cartData = [];

    const loadCart = async () => {
        try {
            const res = await fetch(`${BASE_URL}/cart/${userId}`);
            if (!res.ok) throw new Error('Failed to load cart');
            cartData = await res.json();
        } catch (e) {
            console.error('Error loading cart:', e);
            cartData = [];
        }

        cartLoading.style.display = 'none';

        if (cartData.length === 0) {
            cartEmpty.style.display = 'block';
            cartContent.style.display = 'none';
        } else {
            cartEmpty.style.display = 'none';
            cartContent.style.display = 'grid';
            renderCartItems();
        }
    };

    // --- Render Cart Items ---
    const renderCartItems = () => {
        cartItemsContainer.innerHTML = '';

        let totalItems = 0;
        let subtotal = 0;

        cartData.forEach(item => {
            const itemTotal = item.price * item.quantity;
            totalItems += item.quantity;
            subtotal += itemTotal;

            const card = document.createElement('div');
            card.className = 'cart-item-card';
            card.id = `cart-card-${item.product_id}`;

            card.innerHTML = `
                <img src="../images/${item.image}" alt="${item.product_name}" class="cart-item-img">
                <div class="cart-item-details">
                    <span class="cart-item-name">${item.product_name}</span>
                    <span class="cart-item-category">${item.category || ''}</span>
                    <span class="cart-item-unit-price">$${item.price.toFixed(2)} ${item.unit ? item.unit : 'each'}</span>
                </div>
                <div class="cart-item-actions">
                    <div class="cart-item-total">$${itemTotal.toFixed(2)}</div>
                    <div class="cart-qty-controls">
                        <button class="cart-qty-btn cart-dec" data-pid="${item.product_id}">−</button>
                        <span class="cart-qty-display">${item.quantity}</span>
                        <button class="cart-qty-btn cart-inc" data-pid="${item.product_id}">+</button>
                    </div>
                    <button class="remove-btn" data-pid="${item.product_id}">✕ Remove</button>
                </div>
            `;

            cartItemsContainer.appendChild(card);
        });

        // Update Summary
        summaryItemCount.textContent = totalItems;
        summarySubtotal.textContent = `$${subtotal.toFixed(2)}`;
        summaryTotal.textContent = `$${subtotal.toFixed(2)}`;

        // Attach event listeners
        attachCartListeners();
    };

    // --- Event Listeners for Cart Actions ---
    const attachCartListeners = () => {

        // Increase qty
        document.querySelectorAll('.cart-inc').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const pid = parseInt(e.target.getAttribute('data-pid'));
                const item = cartData.find(i => i.product_id === pid);
                if (!item) return;

                const newQty = item.quantity + 1;
                await updateCartItem(pid, newQty);
            });
        });

        // Decrease qty
        document.querySelectorAll('.cart-dec').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const pid = parseInt(e.target.getAttribute('data-pid'));
                const item = cartData.find(i => i.product_id === pid);
                if (!item) return;

                if (item.quantity <= 1) {
                    // Remove item if quantity would go to 0
                    await removeCartItem(pid);
                } else {
                    const newQty = item.quantity - 1;
                    await updateCartItem(pid, newQty);
                }
            });
        });

        // Remove item
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const pid = parseInt(e.target.getAttribute('data-pid'));
                await removeCartItem(pid);
            });
        });
    };

    // --- API: Update Cart Item Quantity ---
    const updateCartItem = async (productId, newQty) => {
        try {
            const res = await fetch(`${BASE_URL}/cart/update`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: userId,
                    product_id: productId,
                    quantity: newQty
                })
            });

            if (res.ok) {
                // Update local data and re-render
                const item = cartData.find(i => i.product_id === productId);
                if (item) item.quantity = newQty;
                renderCartItems();
            }
        } catch (e) {
            console.error('Error updating cart:', e);
        }
    };

    // --- API: Remove Cart Item ---
    const removeCartItem = async (productId) => {
        try {
            const res = await fetch(`${BASE_URL}/cart/remove?user_id=${userId}&product_id=${productId}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                // Remove from local data and re-render
                cartData = cartData.filter(i => i.product_id !== productId);

                if (cartData.length === 0) {
                    cartContent.style.display = 'none';
                    cartEmpty.style.display = 'block';
                } else {
                    renderCartItems();
                }
            }
        } catch (e) {
            console.error('Error removing item:', e);
        }
    };


    // Fire initial cart load
    await loadCart();

});