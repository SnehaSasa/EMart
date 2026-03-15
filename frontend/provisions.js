// document.addEventListener('DOMContentLoaded', () => {

//     // Database segregated from images directory
//     const productsData = {
//         cereals: [
//             { id: 'c1', name: 'Corn Flakes', img: 'cornflakes.jpeg', price: 3.49, unit: '/ box' },
//             { id: 'c2', name: 'Granola', img: 'granola.jpeg', price: 4.99, unit: '/ bag' },
//             { id: 'c3', name: 'Macaroni', img: 'macaroni.jpeg', price: 1.25, unit: '/ pack' },
//             { id: 'c4', name: 'Muesli', img: 'muesli.jpeg', price: 5.50, unit: '/ box' },
//             { id: 'c5', name: 'Oatmeal', img: 'oatmeal.jpeg', price: 2.99, unit: '/ tub' },
//             { id: 'c6', name: 'Penne', img: 'penne.jpeg', price: 1.35, unit: '/ pack' },
//             { id: 'c7', name: 'Spaghetti', img: 'spaghetti.jpeg', price: 1.40, unit: '/ pack' }
//         ],
//         grains: [
//             { id: 'g1', name: 'Barley', img: 'barley.jpeg', price: 1.89, unit: '/ lb' },
//             { id: 'g2', name: 'Black Beans', img: 'blackbeans.jpeg', price: 1.49, unit: '/ lb' },
//             { id: 'g3', name: 'Brown Rice', img: 'brownrice.jpeg', price: 2.10, unit: '/ lb' },
//             { id: 'g4', name: 'Bulgur', img: 'bulgur.jpeg', price: 2.30, unit: '/ lb' },
//             { id: 'g5', name: 'Chickpeas', img: 'chickpeas.jpeg', price: 1.75, unit: '/ lb' },
//             { id: 'g6', name: 'Kidney Beans', img: 'kidneybeans.jpeg', price: 1.60, unit: '/ lb' },
//             { id: 'g7', name: 'Pinto Beans', img: 'pinto.jpeg', price: 1.50, unit: '/ lb' },
//             { id: 'g8', name: 'Rice', img: 'rice.jpeg', price: 1.99, unit: '/ lb' },
//             { id: 'g9', name: 'White Beans', img: 'whitebeans.jpeg', price: 1.65, unit: '/ lb' }
//         ],
//         oils: [
//             { id: 'o1', name: 'Butter', img: 'butter.jpeg', price: 4.50, unit: '/ stick' },
//             { id: 'o2', name: 'Canola Oil', img: 'canola.jpeg', price: 6.99, unit: '/ bottle' },
//             { id: 'o3', name: 'Coconut Oil', img: 'cocooil.jpeg', price: 8.50, unit: '/ jar' },
//             { id: 'o4', name: 'Ghee', img: 'ghee.jpeg', price: 12.00, unit: '/ jar' },
//             { id: 'o5', name: 'Margarine', img: 'margarine.jpeg', price: 3.25, unit: '/ tub' },
//             { id: 'o6', name: 'Olive Oil', img: 'olive.jpeg', price: 14.99, unit: '/ bottle' },
//             { id: 'o7', name: 'Vegetable Oil', img: 'vegoil.jpeg', price: 5.50, unit: '/ bottle' }
//         ],
//         spices: [
//             { id: 's1', name: 'Cinnamon', img: 'cinnamon.jpeg', price: 3.99, unit: '/ jar' },
//             { id: 's2', name: 'Cumin', img: 'cumin.jpeg', price: 2.99, unit: '/ jar' },
//             { id: 's3', name: 'Hot Sauce', img: 'hotsauce.jpeg', price: 2.50, unit: '/ bottle' },
//             { id: 's4', name: 'Ketchup', img: 'ketchup.jpeg', price: 3.20, unit: '/ bottle' },
//             { id: 's5', name: 'Mayonnaise', img: 'mayo.jpeg', price: 4.10, unit: '/ jar' },
//             { id: 's6', name: 'Mustard', img: 'mustard.jpeg', price: 2.25, unit: '/ bottle' },
//             { id: 's7', name: 'Nutmeg', img: 'nutmeg.jpeg', price: 4.50, unit: '/ jar' },
//             { id: 's8', name: 'Oregano', img: 'oregano.jpeg', price: 2.75, unit: '/ jar' },
//             { id: 's9', name: 'Paprika', img: 'paprika.jpeg', price: 2.85, unit: '/ jar' },
//             { id: 's10', name: 'Pepper', img: 'pepper.jpeg', price: 3.10, unit: '/ jar' },
//             { id: 's11', name: 'Rosemary', img: 'rosemary.jpeg', price: 2.95, unit: '/ jar' },
//             { id: 's12', name: 'Salt', img: 'salt.jpeg', price: 1.50, unit: '/ box' },
//             { id: 's13', name: 'Soy Sauce', img: 'soysauce.jpeg', price: 3.50, unit: '/ bottle' },
//             { id: 's14', name: 'Thyme', img: 'thyme.jpeg', price: 2.80, unit: '/ jar' },
//             { id: 's15', name: 'Turmeric', img: 'turmeric.jpeg', price: 3.40, unit: '/ jar' }
//         ],
//         baking: [
//             { id: 'b1', name: 'Almond Flour', img: 'almondflour.jpeg', price: 8.99, unit: '/ bag' },
//             { id: 'b2', name: 'Baking Soda', img: 'bakingsoda.jpeg', price: 1.25, unit: '/ box' },
//             { id: 'b3', name: 'Cocoa Powder', img: 'cocoa.jpeg', price: 5.49, unit: '/ container' },
//             { id: 'b4', name: 'Cornmeal', img: 'cornmeal.jpeg', price: 2.30, unit: '/ bag' },
//             { id: 'b5', name: 'All Purpose Flour', img: 'flour.jpeg', price: 3.50, unit: '/ bag' },
//             { id: 'b6', name: 'Honey', img: 'honey.jpeg', price: 6.99, unit: '/ jar' },
//             { id: 'b7', name: 'Maple Syrup', img: 'maplesyrup.jpeg', price: 8.50, unit: '/ bottle' },
//             { id: 'b8', name: 'Sugar', img: 'sugar.jpeg', price: 2.99, unit: '/ bag' },
//             { id: 'b9', name: 'Wheat Flour', img: 'wheatflour.jpeg', price: 4.20, unit: '/ bag' },
//             { id: 'b10', name: 'Yeast', img: 'yeast.jpeg', price: 2.10, unit: '/ jar' }
//         ]
//     };

//     const sectionHeading = document.getElementById('sectionHeading');
//     const productsGrid = document.getElementById('productsGrid');
    
//     // Links
//     const btnCereals = document.getElementById('btnCereals');
//     const btnGrains = document.getElementById('btnGrains');
//     const btnOils = document.getElementById('btnOils');
//     const btnSpices = document.getElementById('btnSpices');
//     const btnBaking = document.getElementById('btnBaking');

//     const sidebarLinks = [btnCereals, btnGrains, btnOils, btnSpices, btnBaking];

//     // State
//     const cartState = {};

//     // Render Function
//     const renderProducts = (categoryName, productsList) => {
//         sectionHeading.textContent = categoryName;
//         productsGrid.innerHTML = ''; // Clear container

//         productsList.forEach(product => {
//             const card = document.createElement('div');
//             card.className = 'product-card';
            
//             const currentQty = cartState[product.id] || 1;

//             card.innerHTML = `
//                 <h3 class="card-title">${product.name}</h3>
//                 <img src="../images/${product.img}" alt="${product.name}" class="card-image">
//                 <div class="card-content">
//                     <div class="price-quantity-row">
//                         <div class="card-price">$${product.price.toFixed(2)} <span style="font-size:14px;color:#777;font-weight:400">${product.unit}</span></div>
//                         <div class="quantity-controls">
//                             <button class="qty-btn dec-btn" data-id="${product.id}">-</button>
//                             <span class="qty-display" id="qty-${product.id}">${currentQty}</span>
//                             <button class="qty-btn inc-btn" data-id="${product.id}">+</button>
//                         </div>
//                     </div>
//                     <button class="add-cart-btn" data-id="${product.id}">Add to Cart</button>
//                 </div>
//             `;
//             productsGrid.appendChild(card);
//         });

//         attachEventListeners(productsList);
//     };

//     // Attach listeners for newly rendered cards
//     const attachEventListeners = (productsList) => {
        
//         document.querySelectorAll('.inc-btn').forEach(btn => {
//             btn.addEventListener('click', (e) => {
//                 const id = e.target.getAttribute('data-id');
//                 const display = document.getElementById(`qty-${id}`);
//                 let qty = parseInt(display.textContent);
//                 qty++;
//                 display.textContent = qty;
//                 cartState[id] = qty;
//             });
//         });

//         document.querySelectorAll('.dec-btn').forEach(btn => {
//             btn.addEventListener('click', (e) => {
//                 const id = e.target.getAttribute('data-id');
//                 const display = document.getElementById(`qty-${id}`);
//                 let qty = parseInt(display.textContent);
//                 if (qty > 1) {
//                     qty--;
//                     display.textContent = qty;
//                     cartState[id] = qty;
//                 }
//             });
//         });

//         document.querySelectorAll('.add-cart-btn').forEach(btn => {
//             btn.addEventListener('click', async (e) => {
//                 const id = e.target.getAttribute('data-id');
//                 const qty = parseInt(document.getElementById(`qty-${id}`).textContent);
//                 const product = productsList.find(p => p.id === id);
                
//                 // Call backend API via shared utility
//                 await addToCartAPI(product.img, product.name, qty, e.target);
//             });
//         });
//     };

//     const setActive = (activeLink) => {
//         sidebarLinks.forEach(link => link.classList.remove('active'));
//         activeLink.classList.add('active');
//     };

//     // Tab Switching
//     btnCereals.addEventListener('click', (e) => {
//         e.preventDefault();
//         setActive(btnCereals);
//         renderProducts('Breakfast Cereals & Pasta', productsData.cereals);
//     });

//     btnGrains.addEventListener('click', (e) => {
//         e.preventDefault();
//         setActive(btnGrains);
//         renderProducts('Grains & Beans', productsData.grains);
//     });

//     btnOils.addEventListener('click', (e) => {
//         e.preventDefault();
//         setActive(btnOils);
//         renderProducts('Oils & Fats', productsData.oils);
//     });

//     btnSpices.addEventListener('click', (e) => {
//         e.preventDefault();
//         setActive(btnSpices);
//         renderProducts('Spices & Sauces', productsData.spices);
//     });

//     btnBaking.addEventListener('click', (e) => {
//         e.preventDefault();
//         setActive(btnBaking);
//         renderProducts('Flour & Baking Essentials', productsData.baking);
//     });

//     // Initial Render - Load Cereals initially
//     renderProducts('Breakfast Cereals & Pasta', productsData.cereals);
// });






document.addEventListener('DOMContentLoaded', () => {

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

    const btnCereals = document.getElementById('btnCereals');
    const btnGrains = document.getElementById('btnGrains');
    const btnOils = document.getElementById('btnOils');
    const btnSpices = document.getElementById('btnSpices');
    const btnBaking = document.getElementById('btnBaking');

    const sidebarLinks = [btnCereals, btnGrains, btnOils, btnSpices, btnBaking];

    const cartState = {};

    const renderProducts = (categoryName, productsList) => {

        sectionHeading.textContent = categoryName;
        productsGrid.innerHTML = '';

        productsList.forEach(product => {

            const card = document.createElement('div');
            card.className = 'product-card';

            const currentQty = cartState[product.id] || 1;
            const isOutOfStock = product.stock === 0;

            card.innerHTML = `
                <h3 class="card-title">${product.name}</h3>

                <img src="../images/${product.image}" 
                     class="card-image ${isOutOfStock ? 'out-of-stock-img' : ''}">

                <div class="card-content">

                    <div class="card-price">
                        $${product.price.toFixed(2)}
                        <span style="font-size:14px;color:#777">${product.unit || ''}</span>
                    </div>

                    <div class="stock-label ${isOutOfStock ? 'out-stock' : ''}">
                        ${isOutOfStock ? "Out of Stock" : `In stock: ${product.stock}`}
                    </div>

                    <div class="quantity-controls">
                        <button class="qty-btn dec-btn" data-id="${product.id}" ${isOutOfStock ? "disabled" : ""}>-</button>

                        <span class="qty-display" id="qty-${product.id}">
                            ${currentQty}
                        </span>

                        <button class="qty-btn inc-btn" data-id="${product.id}" ${isOutOfStock ? "disabled" : ""}>+</button>
                    </div>

                    <button class="add-cart-btn" data-id="${product.id}" ${isOutOfStock ? "disabled" : ""}>
                        ${isOutOfStock ? "Out of Stock" : "Add to Cart"}
                    </button>

                </div>
            `;

            productsGrid.appendChild(card);

        });

        attachEventListeners(productsList);
    };

    const attachEventListeners = (productsList) => {

        document.querySelectorAll('.inc-btn').forEach(btn => {

            btn.addEventListener('click', (e) => {

                const id = e.target.getAttribute('data-id');
                const display = document.getElementById(`qty-${id}`);
                let qty = parseInt(display.textContent);

                const product = productsList.find(p => p.id === Number(id));

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

                if(qty > 1){
                    qty--;
                    display.textContent = qty;
                    cartState[id] = qty;
                }

            });

        });

        document.querySelectorAll('.add-cart-btn').forEach(btn => {

            btn.addEventListener('click', async (e) => {

                const id = e.target.getAttribute('data-id');
                const qty = parseInt(document.getElementById(`qty-${id}`).textContent);

                await addToCartAPI(Number(id), qty, e.target);

            });

        });

    };

    const setActive = (activeLink) => {
        sidebarLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    };

    btnCereals.addEventListener('click', async (e) => {

        e.preventDefault();

        setActive(btnCereals);

        const products = await fetchProducts("provisions","cereals");

        renderProducts("Breakfast Cereals & Pasta", products);

    });

    btnGrains.addEventListener('click', async (e) => {

        e.preventDefault();

        setActive(btnGrains);

        const products = await fetchProducts("provisions","grains");

        renderProducts("Grains & Beans", products);

    });

    btnOils.addEventListener('click', async (e) => {

        e.preventDefault();

        setActive(btnOils);

        const products = await fetchProducts("provisions","oils");

        renderProducts("Oils & Fats", products);

    });

    btnSpices.addEventListener('click', async (e) => {

        e.preventDefault();

        setActive(btnSpices);

        const products = await fetchProducts("provisions","spices");

        renderProducts("Spices & Sauces", products);

    });

    btnBaking.addEventListener('click', async (e) => {

        e.preventDefault();

        setActive(btnBaking);

        const products = await fetchProducts("provisions","baking");

        renderProducts("Flour & Baking Essentials", products);

    });

    (async () => {

        const products = await fetchProducts("provisions","cereals");

        renderProducts("Breakfast Cereals & Pasta", products);

    })();

});