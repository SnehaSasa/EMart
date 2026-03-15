document.addEventListener('DOMContentLoaded', () => {

    // Groceries database segregated from images directory using American standard mapping (lb) = pound / piece / bundle
    // Each item has a name, img matching filename, price (randomized for realism), unit.
    // const productsData = {
    //     fruits: [
    //         { id: 'f1', name: 'Apples', img: 'apples.jpeg', price: 1.49, unit: '/ lb' },
    //         { id: 'f2', name: 'Bananas', img: 'banana.jpeg', price: 0.59, unit: '/ lb' },
    //         { id: 'f3', name: 'Blueberries', img: 'blueberries.jpeg', price: 3.99, unit: '/ pint' },
    //         { id: 'f4', name: 'Cherries', img: 'cherries.jpeg', price: 4.99, unit: '/ lb' },
    //         { id: 'f5', name: 'Grapes', img: 'grapes.jpeg', price: 2.49, unit: '/ lb' },
    //         { id: 'f6', name: 'Mango', img: 'mango.jpeg', price: 1.25, unit: 'each' },
    //         { id: 'f7', name: 'Orange', img: 'orange.jpeg', price: 0.99, unit: 'each' },
    //         { id: 'f8', name: 'Papaya', img: 'papaya.jpeg', price: 1.50, unit: '/ lb' },
    //         { id: 'f9', name: 'Peaches', img: 'peaches.jpeg', price: 1.99, unit: '/ lb' },
    //         { id: 'f10', name: 'Pineapple', img: 'pineapple.jpeg', price: 2.99, unit: 'each' },
    //         { id: 'f11', name: 'Pomegranate', img: 'pomegranate.jpeg', price: 2.00, unit: 'each' },
    //         { id: 'f12', name: 'Strawberries', img: 'strawberries.jpeg', price: 3.50, unit: '/ packet' },
    //         { id: 'f13', name: 'Watermelon', img: 'watermelon.jpeg', price: 5.99, unit: 'each' }
    //     ],
    //     vegetables: [
    //         { id: 'v1', name: 'Bell Peppers', img: 'bellpeppers.jpeg', price: 1.20, unit: 'each' },
    //         { id: 'v2', name: 'Broccoli', img: 'broccoli.jpeg', price: 1.89, unit: '/ head' },
    //         { id: 'v3', name: 'Cabbage', img: 'cabbage.jpeg', price: 0.89, unit: '/ lb' },
    //         { id: 'v4', name: 'Carrots', img: 'carrots.jpeg', price: 1.15, unit: '/ bunch' },
    //         { id: 'v5', name: 'Cauliflower', img: 'cauliflower.jpeg', price: 2.49, unit: '/ head' },
    //         { id: 'v6', name: 'Garlic', img: 'garlic.jpeg', price: 0.50, unit: '/ bulb' },
    //         { id: 'v7', name: 'Lettuce', img: 'lettuce.jpeg', price: 1.99, unit: '/ head' },
    //         { id: 'v8', name: 'Onion', img: 'onion.jpeg', price: 0.99, unit: '/ lb' },
    //         { id: 'v9', name: 'Potato', img: 'potato.jpeg', price: 0.89, unit: '/ lb' },
    //         { id: 'v10', name: 'Spinach', img: 'spinach.jpeg', price: 2.50, unit: '/ bunch' },
    //         { id: 'v11', name: 'Tomato', img: 'tomato.jpeg', price: 1.49, unit: '/ lb' },
    //         { id: 'v12', name: 'Zucchini', img: 'zucchini.jpeg', price: 1.29, unit: '/ lb' }
    //     ]
    // };

    const BASE_URL = "http://localhost:8000";

    async function fetchProducts(category, subcategory){

        let url = `${BASE_URL}/products?category=${category}&limit=200`;

        if(subcategory){
            url += `&subcategory=${subcategory}`;
        }

        const res = await fetch(url);
        return await res.json();
    }

    const sectionHeading = document.getElementById('sectionHeading');
    const productsGrid = document.getElementById('productsGrid');
    
    // Links
    const btnFruits = document.getElementById('btnFruits');
    const btnVegetables = document.getElementById('btnVegetables');

    // State
    const cartState = {}; // { itemId: qty }  - For UI state sync only, purely client side initially

    // Render Function
    const renderProducts = (categoryName, productsList) => {
        sectionHeading.textContent = `Fresh ${categoryName}`;
        productsGrid.innerHTML = ''; // Clear container

        productsList.forEach(product => {
            // Setup card elements
            const card = document.createElement('div');
            card.className = 'product-card';
            
            // If item has a qty selected, retrieve it, default to 1
            const currentQty = cartState[product.id] || 1;

            // card.innerHTML = `
            //     <h3 class="card-title">${product.name}</h3>
            //     <img src="../images/${product.image}" alt="${product.name}" class="card-image">
            //     <div class="card-content">
            //         <div class="price-quantity-row">
            //             <div class="card-price">$${product.price.toFixed(2)} <span style="font-size:14px;color:#777;font-weight:400">${product.unit}</span></div>
            //             <div class="stock-label">
            //                 In stock: ${product.stock}
            //             </div>
            //             <div class="quantity-controls">
            //                 <button class="qty-btn dec-btn" data-id="${product.id}">-</button>
            //                 <span class="qty-display" id="qty-${product.id}">${currentQty}</span>
            //                 <button class="qty-btn inc-btn" data-id="${product.id}">+</button>
            //             </div>
            //         </div>
            //         <button class="add-cart-btn" data-id="${product.id}">Add to Cart</button>
            //     </div>
            // `;

            // card.innerHTML = `
            //     <h3 class="card-title">${product.name}</h3>
            //     <img src="../images/${product.image}" alt="${product.name}" class="card-image">

            //     <div class="card-content">

            //         <div class="card-price">
            //             $${product.price.toFixed(2)}
            //             <span style="font-size:14px;color:#777">${product.unit || ''}</span>
            //         </div>

            //         <div class="stock-label">
            //             In stock: ${product.stock}
            //         </div>

            //         <div class="quantity-controls">
            //             <button class="qty-btn dec-btn" data-id="${product.id}">-</button>
            //             <span class="qty-display" id="qty-${product.id}">${currentQty}</span>
            //             <button class="qty-btn inc-btn" data-id="${product.id}">+</button>
            //         </div>

            //         <button class="add-cart-btn" data-id="${product.id}">
            //             Add to Cart
            //         </button>

            //     </div>
            // `;

            const isOutOfStock = product.stock === 0;

            card.innerHTML = `
                <h3 class="card-title">${product.name}</h3>

                <img src="../images/${product.image}" 
                    alt="${product.name}" 
                    class="card-image ${isOutOfStock ? 'out-of-stock-img' : ''}">

                <div class="card-content">

                    <div class="card-price">
                        $${product.price.toFixed(2)}
                        <span style="font-size:14px;color:#777">${product.unit || ''}</span>
                    </div>

                    <div class="stock-label ${isOutOfStock ? 'out-stock' : ''}">
                        ${isOutOfStock ? 'Out of Stock' : `In stock: ${product.stock}`}
                    </div>

                    <div class="quantity-controls">
                        <button class="qty-btn dec-btn" data-id="${product.id}" ${isOutOfStock ? 'disabled' : ''}>-</button>
                        <span class="qty-display" id="qty-${product.id}">${currentQty}</span>
                        <button class="qty-btn inc-btn" data-id="${product.id}" ${isOutOfStock ? 'disabled' : ''}>+</button>
                    </div>

                    <button class="add-cart-btn" data-id="${product.id}" ${isOutOfStock ? 'disabled' : ''}>
                        ${isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                    </button>

                </div>
            `;
            productsGrid.appendChild(card);
        });

        attachEventListeners(productsList);
    };

    // Attach listeners for newly rendered cards
    const attachEventListeners = (productsList) => {
        
        // Increase/Decrease Qty
        // document.querySelectorAll('.inc-btn').forEach(btn => {
        //     btn.addEventListener('click', (e) => {
        //         const id = e.target.getAttribute('data-id');
        //         const display = document.getElementById(`qty-${id}`);
        //         let qty = parseInt(display.textContent);
        //         qty++;
        //         display.textContent = qty;
        //         cartState[id] = qty;
        //     });
        // });

        document.querySelectorAll('.inc-btn').forEach(btn => {

            btn.addEventListener('click', (e) => {

                const id = e.target.getAttribute('data-id');
                const display = document.getElementById(`qty-${id}`);
                let qty = parseInt(display.textContent);

                const product = productsList.find(p => p.id == id);

                if(qty < product.stock){
                    qty++;
                    display.textContent = qty;
                    cartState[id] = qty;
                }

            });

        });

        document.querySelectorAll('.dec-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                const display = document.getElementById(`qty-${id}`);
                let qty = parseInt(display.textContent);
                if (qty > 1) {
                    qty--;
                    display.textContent = qty;
                    cartState[id] = qty;
                }
            });
        });

        // Add to Cart
        document.querySelectorAll('.add-cart-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const id = e.target.getAttribute('data-id');
                const qty = parseInt(document.getElementById(`qty-${id}`).textContent);
                const product = productsList.find(p => p.id == id);
                
                // Call backend API via shared utility
                await addToCartAPI(product.id, qty, e.target);
            });
        });
    };

    // Tab Switching
    btnFruits.addEventListener('click', async (e) => {

        e.preventDefault();

        btnFruits.classList.add('active');
        btnVegetables.classList.remove('active');

        const fruits = await fetchProducts("groceries","fruits");

        renderProducts("Fruits", fruits);

    });

    btnVegetables.addEventListener('click', async (e) => {

        e.preventDefault();

        btnVegetables.classList.add('active');
        btnFruits.classList.remove('active');

        const vegetables = await fetchProducts("groceries","vegetables");

        renderProducts("Vegetables", vegetables);

    });


    // Initial Render - Load Fruits initially
    (async () => {

        const fruits = await fetchProducts("groceries","fruits");

        renderProducts("Fruits", fruits);

    })();
});
