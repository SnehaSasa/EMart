const BASE_URL = "http://localhost:8000";

document.addEventListener("DOMContentLoaded", async () => {

const ordersContainer = document.getElementById("ordersContainer");

const userId = localStorage.getItem("userId");

if(!userId){
ordersContainer.innerHTML = "<p>Please login first.</p>";
return;
}

try{

const res = await fetch(`${BASE_URL}/orders/user/${userId}`);

const orders = await res.json();

if(orders.length === 0){

ordersContainer.innerHTML = `
<div class="cart-empty">
<h3>No Orders Yet</h3>
<p>You haven't placed any orders yet.</p>
<a href="dashboard.html" class="btn primary-btn">Start Shopping</a>
</div>
`;

return;
}

orders.forEach(order => {

const card = document.createElement("div");

card.className = "order-card";

card.innerHTML = `

<div class="order-info">

<span class="order-id">Order #EMR-${order.order_id}</span>

<span class="order-date">Placed on ${order.created_at}</span>

<span class="order-price">$${order.total_price.toFixed(2)}</span>

<span>Status: ${order.status}</span>

</div>

<button class="btn primary-btn track-btn"
onclick="window.location.href='track_order.html'">

Track Order

</button>
`;

ordersContainer.appendChild(card);

});

}catch(e){

ordersContainer.innerHTML = "<p>Error loading orders.</p>";

}

});