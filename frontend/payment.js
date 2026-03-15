document.addEventListener("DOMContentLoaded", () => {

const methodSelect = document.getElementById("paymentMethod");
const formDiv = document.getElementById("paymentForm");
const payBtn = document.getElementById("payNowBtn");

function renderPaymentForm(method){

    if(method === "card"){
        formDiv.innerHTML = `
        <input placeholder="Card Number">
        <input placeholder="Expiry">
        <input placeholder="CVV">
        `;
    }

    if(method === "netbanking"){
        formDiv.innerHTML = `
        <select>
            <option>SBI</option>
            <option>HDFC</option>
            <option>ICICI</option>
        </select>
        <input placeholder="User ID">
        <input placeholder="Password">
        `;
    }

    if(method === "upi"){
        formDiv.innerHTML = `
        <input placeholder="UPI ID">
        `;
    }

}

/* Show default form */
renderPaymentForm(methodSelect.value);

/* Change form when payment method changes */
methodSelect.addEventListener("change", () => {
    renderPaymentForm(methodSelect.value);
});


payBtn.onclick = async () => {

    payBtn.textContent = "Processing...";
    payBtn.disabled = true;

    try{

        const res = await fetch("http://localhost:8000/payment/process",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                method:methodSelect.value,
                amount:100
            })
        });

        const data = await res.json();

        if(data.status === "success"){

            const userId = localStorage.getItem("userId");

            if(userId){

                const checkoutRes = await fetch("http://localhost:8000/orders/checkout",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        user_id:userId
                    })
                });

                const checkoutData = await checkoutRes.json();

                console.log("Checkout result:", checkoutData);

            }

            window.location.href = "order_success.html";
        }

    }catch(e){
        alert("Payment failed. Please try again.");
    }

    payBtn.textContent = "Pay Now";
    payBtn.disabled = false;

};

});