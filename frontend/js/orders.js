/* =====================================================
   ORDERS PAGE
===================================================== */

/* =====================================================
   LOGGED IN USER
===================================================== */

const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser) {
    alert("Please login first.");
    window.location.href = "login.html";
}

/* =====================================================
   USER ROLE
===================================================== */

const userRole = loggedInUser.role;

/* =====================================================
   HTML ELEMENTS
===================================================== */

const ordersTable = document.getElementById("ordersTable");
const searchOrder = document.getElementById("searchOrder");
const statusFilter = document.getElementById("statusFilter");
const addOrderBtn = document.getElementById("addOrderBtn");

/* =====================================================
   LOAD ORDERS FROM MYSQL
===================================================== */

let orders = [];

async function loadOrders() {

    try {

        const response = await fetch("http://localhost:5000/api/orders");

        const data = await response.json();

        if (data.success) {

            orders = data.orders;

            displayOrders();

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.error(error);

        alert("Unable to load orders.");

    }

}

/* =====================================================
   DISPLAY ORDERS
===================================================== */

function displayOrders(orderList = orders) {

    ordersTable.innerHTML = "";

    /* ==========================================
       CUSTOMER -> ONLY OWN ORDERS
    ========================================== */

    if (userRole === "Customer") {

        orderList = orderList.filter(order =>
            order.customer_id == loggedInUser.id
        );

    }

    /* ==========================================
       FARMER -> ONLY PRODUCTS OWNED BY FARMER
    ========================================== */

    else if (userRole === "Farmer") {

        orderList = orderList.filter(order =>
            order.farmer_id == loggedInUser.id
        );

    }

    /* ==========================================
       NO ORDERS
    ========================================== */

    if (orderList.length === 0) {

        ordersTable.innerHTML = `
        <tr>
            <td colspan="8" class="no-orders">
                <i class="fa-solid fa-box-open"></i><br>
                No Orders Available
            </td>
        </tr>
        `;

        return;

    }

    /* ==========================================
       DISPLAY TABLE
    ========================================== */

    orderList.forEach(order => {

        const badge = getStatusClass(order.status);

        ordersTable.innerHTML += `

        <tr>

            <td>#${order.id}</td>

            <td>${order.customer}</td>

            <td>${order.product}</td>

            <td>${order.quantity} ${order.unit}</td>

            <td>₹${order.total_price}</td>

            <td>
                <span class="status ${badge}">
                    ${order.status}
                </span>
            </td>

            <td>${new Date(order.created_at).toLocaleDateString()}</td>

            <td>

                ${userRole === "Farmer"

                ?

                `
                <div class="action-buttons">

                    <button
                        class="edit-btn"
                        onclick="editOrder(${order.id})">

                        <i class="fa-solid fa-pen"></i>

                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteOrder(${order.id})">

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </div>
                `

                :

                `
                <span class="customer-order">

                    View Only

                </span>
                `}

            </td>

        </tr>

        `;

    });

}
/* =====================================================
   LOAD PAGE
===================================================== */

loadOrders();

/* =====================================================
   SEARCH ORDERS
===================================================== */

if (searchOrder) {
    searchOrder.addEventListener("keyup", filterOrders);
}

/* =====================================================
   FILTER BY STATUS
===================================================== */

if (statusFilter) {
    statusFilter.addEventListener("change", filterOrders);
}

/* =====================================================
   SEARCH + FILTER
===================================================== */

function filterOrders() {

    let filteredOrders = [...orders];

    /* ==========================================
       CUSTOMER -> ONLY OWN ORDERS
    ========================================== */

    if (userRole === "Customer") {

        filteredOrders = filteredOrders.filter(order =>
            order.customer_id == loggedInUser.id
        );

    }

    /* ==========================================
       FARMER -> ONLY OWN PRODUCT ORDERS
    ========================================== */

    else if (userRole === "Farmer") {

        filteredOrders = filteredOrders.filter(order =>
            order.farmer_id == loggedInUser.id
        );

    }

    /* ==========================================
       SEARCH
    ========================================== */

    const searchValue = searchOrder.value.toLowerCase().trim();

    if (searchValue !== "") {

        filteredOrders = filteredOrders.filter(order =>

            order.customer.toLowerCase().includes(searchValue) ||

            order.product.toLowerCase().includes(searchValue)

        );

    }

    /* ==========================================
       STATUS FILTER
    ========================================== */

    const selectedStatus = statusFilter.value;

    if (selectedStatus !== "All") {

        filteredOrders = filteredOrders.filter(order =>

            order.status === selectedStatus

        );

    }

    displayOrders(filteredOrders);

}

/* =====================================================
   DELETE ORDER
===================================================== */

async function deleteOrder(id) {

    if (userRole !== "Farmer") return;

    if (!confirm("Are you sure you want to delete this order?")) return;

    try {

        const response = await fetch(`http://localhost:5000/api/orders/${id}`, {
            method: "DELETE"
        });

        const data = await response.json();

        alert(data.message);

        loadOrders();

    } catch (error) {

        console.error(error);

        alert("Unable to connect to server.");

    }

}

/* =====================================================
   EDIT ORDER STATUS
===================================================== */

async function editOrder(id) {

    if (userRole !== "Farmer") return;

    const newStatus = prompt(
`Update Order Status

Pending
Processing
Delivered
Cancelled`
    );

    if (!newStatus) return;

    try {

        const response = await fetch(`http://localhost:5000/api/orders/${id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                status: newStatus
            })

        });

        const data = await response.json();

        alert(data.message);

        loadOrders();

    } catch (error) {

        console.error(error);

        alert("Unable to connect to server.");

    }

}

/* =====================================================
   REFRESH ORDERS
===================================================== */

function refreshOrders() {

    loadOrders();

}

/* =====================================================
   ORDER STATUS COLORS
===================================================== */

function getStatusClass(status) {

    switch (status) {

        case "Pending":
            return "pending";

        case "Processing":
            return "processing";

        case "Delivered":
            return "delivered";

        case "Cancelled":
            return "cancelled";

        default:
            return "pending";

    }

}
/* =====================================================
   EXPORT ORDERS (Future Use)
===================================================== */

function exportOrders(){

    alert("Export Orders feature will be connected with the backend.");

}

/* =====================================================
   PRINT ORDERS
===================================================== */

function printOrders(){

    window.print();

}

/* =====================================================
   FARMER / CUSTOMER BUTTONS
===================================================== */

if(addOrderBtn){

    if(userRole==="Customer"){

        addOrderBtn.style.display="none";

    }

}

/* =====================================================
   PAGE VISIBILITY REFRESH
===================================================== */

document.addEventListener("visibilitychange",function(){

    if(!document.hidden){

        refreshOrders();

    }

});

/* =====================================================
   SORT ORDERS
===================================================== */

function sortOrders(){

    orders.sort((a,b)=>b.id-a.id);

}

/* =====================================================
   INITIALIZE PAGE
===================================================== */

loadOrders();

/* =====================================================
   GLOBAL FUNCTIONS
===================================================== */

window.displayOrders=displayOrders;
window.filterOrders=filterOrders;
window.editOrder=editOrder;
window.deleteOrder=deleteOrder;
window.refreshOrders=refreshOrders;
window.exportOrders=exportOrders;
window.printOrders=printOrders;

/* =====================================================
   ORDERS MODULE LOADED
===================================================== */

console.log("✅ Orders Module Loaded Successfully");