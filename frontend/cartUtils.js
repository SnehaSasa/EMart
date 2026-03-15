/**
 * Shared Cart Utility for all product pages.
 * Provides addToCartAPI() that looks up the product by image name 
 * and calls the backend POST /cart/add endpoint.
 */

const CART_API_BASE = 'http://localhost:8000';

// Cache for product lookups (image -> product_id)
// const productIdCache = {};

/**
 * Resolve the logged-in user's ID from JWT token via backend /auth/me
 * Caches result in localStorage for subsequent calls.
 */
async function resolveUserId() {
    // Check cache first
    const cached = localStorage.getItem('userId');
    if (cached) return parseInt(cached);

    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const payloadBase64 = token.split('.')[1];
        const decoded = JSON.parse(atob(payloadBase64));
        const email = decoded.sub;

        const res = await fetch(`${CART_API_BASE}/auth/me?email=${encodeURIComponent(email)}`);
        if (!res.ok) return null;
        const data = await res.json();
        localStorage.setItem('userId', data.id);
        return data.id;
    } catch (e) {
        console.error('resolveUserId failed:', e);
        return null;
    }
}

/**
 * Look up a product's database ID by its image filename.
 * Uses GET /products/search?q=<name> and matches by image.
 */
// async function lookupProductId(imageName, productName) {
//     // Check cache
//     if (productIdCache[imageName]) return productIdCache[imageName];

//     try {
//         const res = await fetch(`${CART_API_BASE}/products/search?q=${encodeURIComponent(productName)}`);
//         if (!res.ok) return null;
//         const products = await res.json();

//         // Find exact match by image filename
//         const match = products.find(p => p.image === imageName);
//         if (match) {
//             productIdCache[imageName] = match.id;
//             return match.id;
//         }

//         // Fallback: first result
//         if (products.length > 0) {
//             productIdCache[imageName] = products[0].id;
//             return products[0].id;
//         }
//     } catch (e) {
//         console.error('lookupProductId failed:', e);
//     }
//     return null;
// }

/**
 * Add a product to cart via the backend API.
 * @param {string} imageName - The image filename (e.g. "apples.jpeg")
 * @param {string} productName - The product display name
 * @param {number} quantity - Quantity to add
 * @param {HTMLElement} buttonEl - The "Add to Cart" button for visual feedback
 */
// async function addToCartAPI(imageName, productName, quantity, buttonEl) {
//     const userId = await resolveUserId();
//     if (!userId) {
//         alert('Please log in to add items to your cart.');
//         return;
//     }

//     const productId = await lookupProductId(imageName, productName);
//     if (!productId) {
//         console.error('Could not find product in database:', productName);
//         buttonEl.textContent = 'Error ✘';
//         buttonEl.style.background = '#e74c3c';
//         setTimeout(() => {
//             buttonEl.textContent = 'Add to Cart';
//             buttonEl.style.background = '';
//         }, 1500);
//         return;
//     }

//     try {
//         const res = await fetch(`${CART_API_BASE}/cart/add`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 user_id: userId,
//                 product_id: productId,
//                 quantity: quantity
//             })
//         });

//         if (res.ok) {
//             // Visual feedback - success
//             const originalText = buttonEl.textContent;
//             buttonEl.textContent = 'Added ✔';
//             buttonEl.style.background = '#0e701e';
//             setTimeout(() => {
//                 buttonEl.textContent = originalText;
//                 buttonEl.style.background = '';
//             }, 1000);
//         } else {
//             throw new Error('API error');
//         }
//     } catch (e) {
//         console.error('addToCartAPI failed:', e);
//         buttonEl.textContent = 'Error ✘';
//         buttonEl.style.background = '#e74c3c';
//         setTimeout(() => {
//             buttonEl.textContent = 'Add to Cart';
//             buttonEl.style.background = '';
//         }, 1500);
//     }
// }




async function addToCartAPI(productId, quantity, buttonEl) {

    const userId = await resolveUserId();

    if (!userId) {
        alert('Please log in to add items to your cart.');
        return;
    }

    try {

        const res = await fetch(`${CART_API_BASE}/cart/add`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_id: userId,
                product_id: productId,
                quantity: quantity
            })
        });

        if (res.ok) {

            const originalText = buttonEl.textContent;

            buttonEl.textContent = "Added ✔";
            buttonEl.style.background = "#0e701e";

            setTimeout(() => {
                buttonEl.textContent = originalText;
                buttonEl.style.background = "";
            }, 1000);

        }

    } catch (err) {

        console.error(err);

        buttonEl.textContent = "Error ✘";
        buttonEl.style.background = "#e74c3c";

        setTimeout(() => {
            buttonEl.textContent = "Add to Cart";
            buttonEl.style.background = "";
        }, 1500);

    }
}