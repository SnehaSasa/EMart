// document.addEventListener('DOMContentLoaded', () => {

//     /* Data structure mapping exactly to user prompt */
//     const apparelsData = {
//         mens: [
//             {
//                 category: 'T-shirts',
//                 items: [
//                     { id: 'm_ts_1', name: 'Long Sleeve', img: 'longsleeve.jpeg', price: 24.99 },
//                     { id: 'm_ts_2', name: 'V-Neck Comfort', img: 'vneck.jpeg', price: 19.99 },
//                     { id: 'm_ts_3', name: 'Everyday Crewneck', img: 'crewneck.jpeg', price: 22.50 }
//                 ]
//             },
//             {
//                 category: 'Shirts',
//                 items: [
//                     { id: 'm_sh_1', name: 'Formal White', img: 'formal1.jpeg', price: 34.99 },
//                     { id: 'm_sh_2', name: 'Classic Denim', img: 'denim.jpeg', price: 45.00 },
//                     { id: 'm_sh_3', name: 'Linen Summer', img: 'linen.jpeg', price: 39.99 }
//                 ]
//             },
//             {
//                 category: 'Jackets',
//                 items: [
//                     { id: 'm_jk_1', name: 'Premium Leather', img: 'leather.jpeg', price: 120.00 },
//                     { id: 'm_jk_2', name: 'Denim Jacket', img: 'denimjacket.jpeg', price: 65.00 },
//                     { id: 'm_jk_3', name: 'Hooded Winter', img: 'hooded.jpeg', price: 55.00 }
//                 ]
//             },
//             {
//                 category: 'Jeans',
//                 items: [
//                     { id: 'm_jn_1', name: 'Slim Fit', img: 'slimfit.jpeg', price: 49.99 },
//                     { id: 'm_jn_2', name: 'Ripped Look', img: 'ripped.jpeg', price: 54.99 },
//                     { id: 'm_jn_3', name: 'Baggy Style', img: 'baggy.jpeg', price: 42.00 }
//                 ]
//             },
//             {
//                 category: 'Shorts',
//                 items: [
//                     { id: 'm_st_1', name: 'Cargo Shorts', img: 'cargo.jpeg', price: 29.99 },
//                     { id: 'm_st_2', name: 'Gym Training', img: 'gym.jpeg', price: 24.50 },
//                     { id: 'm_st_3', name: 'Running Shorts', img: 'running.jpeg', price: 22.00 }
//                 ]
//             }
//         ],
//         womens: [
//             {
//                 category: 'Tops',
//                 items: [
//                     { id: 'w_tp_1', name: 'Active Tank', img: 'tank.jpeg', price: 15.99 },
//                     { id: 'w_tp_2', name: 'Fashion Crop', img: 'crop.jpeg', price: 18.50 },
//                     { id: 'w_tp_3', name: 'Elegant Blazer', img: 'blazer.jpeg', price: 65.00 }
//                 ]
//             },
//             {
//                 category: 'Jeans',
//                 items: [
//                     { id: 'w_jn_1', name: 'Ripped Denim', img: 'rippedjeans.jpeg', price: 45.00 },
//                     { id: 'w_jn_2', name: 'Skinny Fit', img: 'skinny.jpeg', price: 49.99 },
//                     { id: 'w_jn_3', name: 'Cropped Jeans', img: 'cropped.jpeg', price: 42.50 }
//                 ]
//             },
//             {
//                 category: 'Dresses',
//                 items: [
//                     { id: 'w_dr_1', name: 'Evening Gown', img: 'eveninggown.jpeg', price: 110.00 },
//                     { id: 'w_dr_2', name: 'Summer Sundress', img: 'sundress.jpeg', price: 34.99 },
//                     { id: 'w_dr_3', name: 'Formal Blazer Dress', img: 'blazer.jpeg', price: 75.00 } 
//                 ]
//             }
//         ]
//     };

//     const sectionHeading = document.getElementById('sectionHeading');
//     const accordionContainer = document.getElementById('accordionContainer');

//     // Sidebar Toggles
//     const btnMens = document.getElementById('btnMens');
//     const btnWomens = document.getElementById('btnWomens');

//     const cartState = {}; // local qty counter

//     // Function to render accordions and internal cards
//     const renderApparels = (headingText, categoryData) => {
//         sectionHeading.textContent = headingText;
//         accordionContainer.innerHTML = '';

//         categoryData.forEach((section, index) => {
//             // Build the accordion item container
//             const accItem = document.createElement('div');
//             accItem.className = 'accordion-item';

//             // Card HTML generation
//             let cardsHTML = '';
//             section.items.forEach(product => {
//                 const currentQty = cartState[product.id] || 1;
                
//                 cardsHTML += `
//                 <div class="product-card">
//                     <h3 class="card-title">${product.name}</h3>
//                     <img src="../images/${product.img}" alt="${product.name}" class="card-image">
//                     <div class="card-content">
                        
//                         <div class="price-quantity-row">
//                             <div class="card-price">$${product.price.toFixed(2)}</div>
//                             <div class="quantity-controls">
//                                 <button class="qty-btn dec-btn" data-id="${product.id}">-</button>
//                                 <span class="qty-display" id="qty-${product.id}">${currentQty}</span>
//                                 <button class="qty-btn inc-btn" data-id="${product.id}">+</button>
//                             </div>
//                         </div>

//                         <!-- Sizes Selector -->
//                         <div class="size-selector" id="sizes-${product.id}">
//                             <button class="size-btn" data-size="S" data-id="${product.id}">S</button>
//                             <button class="size-btn" data-size="M" data-id="${product.id}">M</button>
//                             <button class="size-btn selected" data-size="L" data-id="${product.id}">L</button>
//                             <button class="size-btn" data-size="XL" data-id="${product.id}">XL</button>
//                             <button class="size-btn" data-size="XXL" data-id="${product.id}">XXL</button>
//                         </div>
                        
                        
//                         <button 
//                             class="add-cart-btn" 
//                             data-id="${product.id}"
//                             ${product.stock === 0 ? "disabled" : ""}
//                             >
//                             ${product.stock === 0 ? "Out of Stock" : "Add to Cart"}
//                         </button>
//                     </div>
//                 </div>
//                 `;
//             });

//             // Put it all into the Accordion HTML
//             accItem.innerHTML = `
//                 <div class="accordion-header ${index === 0 ? 'active' : ''}">
//                     <span>${section.category}</span>
//                     <span class="accordion-icon">+</span>
//                 </div>
//                 <div class="accordion-content">
//                     <div class="accordion-content-inner">
//                         ${cardsHTML}
//                     </div>
//                 </div>
//             `;
            
//             accordionContainer.appendChild(accItem);
//         });

//         // Initialize accordion logic
//         initAccordionLogics();
//         // Initialize cards click logics
//         initCardLogics(categoryData);
//     };

//     const initAccordionLogics = () => {
//         const headers = document.querySelectorAll('.accordion-header');
        
//         headers.forEach(header => {
//             const content = header.nextElementSibling;
            
//             // If the header naturally started 'active', open it instantly
//             if (header.classList.contains('active')) {
//                 content.style.maxHeight = content.scrollHeight + 'px';
//             }

//             header.addEventListener('click', () => {
//                 // Determine if it was already open
//                 const isOpen = header.classList.contains('active');
                
//                 // Close all others first if desired (accordion style)
//                 /* 
//                 headers.forEach(h => {
//                     h.classList.remove('active');
//                     h.nextElementSibling.style.maxHeight = null;
//                 });
//                 */
//                 // We will just toggle the current one independently without closing others
                
//                 if (isOpen) {
//                     header.classList.remove('active');
//                     content.style.maxHeight = null;
//                 } else {
//                     header.classList.add('active');
//                     content.style.maxHeight = content.scrollHeight + 'px';
//                 }
//             });
//         });
//     };

//     const initCardLogics = (categoryData) => {
//         // Flat map all current category items to easily search by ID on cart add
//         const activeItems = categoryData.flatMap(section => section.items);

//         // Size Selection Toggle
//         document.querySelectorAll('.size-selector').forEach(selector => {
//             const buttons = selector.querySelectorAll('.size-btn');
//             buttons.forEach(btn => {
//                 btn.addEventListener('click', (e) => {
//                     e.preventDefault();
//                     // clear selected in this scoped group
//                     buttons.forEach(b => b.classList.remove('selected'));
//                     // set clicked to selected
//                     e.target.classList.add('selected');
//                 });
//             });
//         });

//         // Quantity Increment
//         // document.querySelectorAll('.inc-btn').forEach(btn => {
//         //     btn.addEventListener('click', (e) => {
//         //         const id = e.target.getAttribute('data-id');
//         //         const display = document.getElementById(`qty-${id}`);
//         //         let qty = parseInt(display.textContent);
//         //         qty++;
//         //         display.textContent = qty;
//         //         cartState[id] = qty;
//         //     });
//         // });

//         document.querySelectorAll('.inc-btn').forEach(btn => {
//             btn.addEventListener('click', (e) => {
//                 const id = e.target.getAttribute('data-id');
//                 const display = document.getElementById(`qty-${id}`);
//                 let qty = parseInt(display.textContent);

//                 const product = activeItems.find(p => p.id === id);

//                 if(product.stock && qty < product.stock){
//                     qty++;
//                     display.textContent = qty;
//                     cartState[id] = qty;
//                 }
//             });
//         });

//         // Quantity Decrement
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

//         // Add to Cart Logic incorporating Size!
//         document.querySelectorAll('.add-cart-btn').forEach(btn => {
//             btn.addEventListener('click', async (e) => {
//                 const id = e.target.getAttribute('data-id');
//                 const qtyElement = document.getElementById(`qty-${id}`);
//                 const qty = parseInt(qtyElement.textContent);
                
//                 const product = activeItems.find(p => p.id === id);
                
//                 // Call backend API via shared utility
//                 if(product.stock === 0){
//                     alert("This item is out of stock");
//                     return;
//                 }

//                 await addToCartAPI(product.img, product.name, qty, e.target);
//             });
//         });
//     };

//     // Sidebar interaction
//     btnMens.addEventListener('click', (e) => {
//         e.preventDefault();
//         btnMens.classList.add('active');
//         btnWomens.classList.remove('active');
//         renderApparels("Men's Clothing", apparelsData.mens);
//     });

//     btnWomens.addEventListener('click', (e) => {
//         e.preventDefault();
//         btnWomens.classList.add('active');
//         btnMens.classList.remove('active');
//         renderApparels("Women's Clothing", apparelsData.womens);
//     });

//     // Fire initial render
//     renderApparels("Men's Clothing", apparelsData.mens);
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
    const accordionContainer = document.getElementById('accordionContainer');

    const btnMens = document.getElementById('btnMens');
    const btnWomens = document.getElementById('btnWomens');

    const cartState = {};

    function buildCard(product){

        const currentQty = cartState[product.id] || 1;
        const out = product.stock === 0;

        return `
        <div class="product-card">

            <h3 class="card-title">${product.name}</h3>

            <img src="../images/${product.image}"
            class="card-image ${out ? 'out-of-stock-img' : ''}">

            <div class="card-content">

                <div class="card-price">
                    $${product.price.toFixed(2)}
                </div>

                <div class="stock-label ${out ? 'out-stock' : ''}">
                    ${out ? "Out of Stock" : `In stock: ${product.stock}`}
                </div>

                <div class="quantity-controls">
                    <button class="qty-btn dec-btn" data-id="${product.id}" ${out ? "disabled" : ""}>-</button>

                    <span class="qty-display" id="qty-${product.id}">
                        ${currentQty}
                    </span>

                    <button class="qty-btn inc-btn" data-id="${product.id}" ${out ? "disabled" : ""}>+</button>
                </div>

                <div class="size-selector">

                    <button class="size-btn" data-size="S">S</button>
                    <button class="size-btn" data-size="M">M</button>
                    <button class="size-btn selected" data-size="L">L</button>
                    <button class="size-btn" data-size="XL">XL</button>
                    <button class="size-btn" data-size="XXL">XXL</button>

                </div>

                <button class="add-cart-btn"
                data-id="${product.id}"
                ${out ? "disabled" : ""}>

                ${out ? "Out of Stock" : "Add to Cart"}

                </button>

            </div>

        </div>
        `;
    }

    function renderAccordion(title, products){

    const accItem = document.createElement('div');
    accItem.className = 'accordion-item';

    let cardsHTML = '';

    products.forEach(p => {
    cardsHTML += buildCard(p);
    });

    accItem.innerHTML = `

    <div class="accordion-header active">
    <span>${title}</span>
    <span class="accordion-icon">+</span>
    </div>

    <div class="accordion-content">
    <div class="accordion-content-inner">
    ${cardsHTML}
    </div>
    </div>

    `;

    accordionContainer.appendChild(accItem);

    }

    function initAccordion(){

    document.querySelectorAll('.accordion-header').forEach(header=>{

    const content = header.nextElementSibling;

    content.style.maxHeight = content.scrollHeight + "px";

    header.addEventListener('click',()=>{

    if(header.classList.contains("active")){

    header.classList.remove("active");
    content.style.maxHeight = null;

    }else{

    header.classList.add("active");
    content.style.maxHeight = content.scrollHeight + "px";

    }

    });

    });

    }

    function attachCardLogic(products){

    document.querySelectorAll('.inc-btn').forEach(btn=>{

    btn.addEventListener('click',(e)=>{

    const id = e.target.dataset.id;
    const display = document.getElementById(`qty-${id}`);
    let qty = parseInt(display.textContent);

    const product = products.find(p=>p.id == id);

    if(qty < product.stock){
    qty++;
    display.textContent = qty;
    cartState[id] = qty;
    }

    });

    });

    document.querySelectorAll('.dec-btn').forEach(btn=>{

    btn.addEventListener('click',(e)=>{

    const id = e.target.dataset.id;
    const display = document.getElementById(`qty-${id}`);
    let qty = parseInt(display.textContent);

    if(qty>1){
    qty--;
    display.textContent = qty;
    cartState[id] = qty;
    }

    });

    });

    document.querySelectorAll('.add-cart-btn').forEach(btn=>{

    btn.addEventListener('click',async(e)=>{

    const id = e.target.dataset.id;
    const qty = parseInt(document.getElementById(`qty-${id}`).textContent);

    await addToCartAPI(Number(id), qty, e.target);

    });

    });

    document.querySelectorAll('.size-selector').forEach(selector=>{

    const buttons = selector.querySelectorAll('.size-btn');

    buttons.forEach(btn=>{

    btn.addEventListener('click',()=>{

    buttons.forEach(b=>b.classList.remove("selected"));
    btn.classList.add("selected");

    });

    });

    });

    }

    async function loadMens(){

    accordionContainer.innerHTML="";

    const tshirts = await fetchProducts("apparels","mens_tshirts");
    const shirts = await fetchProducts("apparels","mens_shirts");
    const jackets = await fetchProducts("apparels","mens_jackets");
    const jeans = await fetchProducts("apparels","mens_jeans");
    const shorts = await fetchProducts("apparels","mens_shorts");

    renderAccordion("T-Shirts", tshirts);
    renderAccordion("Shirts", shirts);
    renderAccordion("Jackets", jackets);
    renderAccordion("Jeans", jeans);
    renderAccordion("Shorts", shorts);

    const all = [...tshirts,...shirts,...jackets,...jeans,...shorts];

    initAccordion();
    attachCardLogic(all);

    }

    async function loadWomens(){

    accordionContainer.innerHTML="";

    const tops = await fetchProducts("apparels","womens_tops");
    const jeans = await fetchProducts("apparels","womens_jeans");
    const dresses = await fetchProducts("apparels","womens_dresses");

    renderAccordion("Tops", tops);
    renderAccordion("Jeans", jeans);
    renderAccordion("Dresses", dresses);

    const all = [...tops,...jeans,...dresses];

    initAccordion();
    attachCardLogic(all);

    }

    btnMens.addEventListener("click",async(e)=>{

    e.preventDefault();

    btnMens.classList.add("active");
    btnWomens.classList.remove("active");

    sectionHeading.textContent="Men's Clothing";

    await loadMens();

    });

    btnWomens.addEventListener("click",async(e)=>{

    e.preventDefault();

    btnWomens.classList.add("active");
    btnMens.classList.remove("active");

    sectionHeading.textContent="Women's Clothing";

    await loadWomens();

    });

    loadMens();

});