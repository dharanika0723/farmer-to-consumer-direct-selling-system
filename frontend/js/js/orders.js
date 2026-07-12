/* ===============================
   ORDERS PAGE
================================== */

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
   LOAD ORDERS
===================================================== */

let orders = JSON.parse(localStorage.getItem("orders")) || [];


/* =====================================================
   DISPLAY ORDERS
===================================================== */

function displayOrders(orderList = orders){

    ordersTable.innerHTML = "";


    /* ==========================================
       CUSTOMER -> ONLY OWN ORDERS
    ========================================== */

    if(userRole === "Customer"){

        orderList = orderList.filter(order =>

            order.email === loggedInUser.email

        );

    }


    /* ==========================================
       NO ORDERS
    ========================================== */

    if(orderList.length === 0){

        ordersTable.innerHTML = `

        <tr>

            <td colspan="8" class="no-orders">

                <i class="fa-solid fa-box-open"></i>

                <br>

                No Orders Available

            </td>

        </tr>

        `;

        return;

    }


    /* ==========================================
       CREATE TABLE ROWS
    ========================================== */

    orderList.forEach(order =>{

        let badge = "";

        switch(order.status){

            case "Pending":

                badge = "pending";

                break;

            case "Processing":

                badge = "processing";

                break;

            case "Delivered":

                badge = "delivered";

                break;

            case "Cancelled":

                badge = "cancelled";

                break;

            default:

                badge = "pending";

        }


        ordersTable.innerHTML += `

        <tr>

            <td>#${order.id}</td>

            <td>${order.customer}</td>

            <td>${order.product}</td>

            <td>${order.quantity} ${order.unit || ""}</td>

            <td>₹${order.total}</td>

            <td>

                <span class="status ${badge}">

                    ${order.status}

                </span>

            </td>

            <td>${order.date}</td>

            <td>

                ${

                    userRole === "Farmer"

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

                    `

                }

            </td>

        </tr>

        `;

    });

}


/* =====================================================
   LOAD PAGE
===================================================== */

displayOrders();
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

            order.email &&
            order.email.toLowerCase() === loggedInUser.email.toLowerCase()

        );

    }


    /* ==========================================
       SEARCH
    ========================================== */

    const searchValue = searchOrder.value
        .toLowerCase()
        .trim();

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

function deleteOrder(id) {

    if (userRole !== "Farmer") {

        return;

    }

    const confirmDelete = confirm(

        "Are you sure you want to delete this order?"

    );

    if (!confirmDelete) return;


    orders = orders.filter(order => order.id !== id);

    localStorage.setItem(

        "orders",

        JSON.stringify(orders)

    );

    displayOrders();

}


/* =====================================================
   EDIT ORDER
===================================================== */

function editOrder(id) {

    if (userRole !== "Farmer") {

        return;

    }

    const order = orders.find(item => item.id === id);

    if (!order) return;


    const newStatus = prompt(

`Update Order Status

Pending
Processing
Delivered
Cancelled`,

        order.status

    );

    if (!newStatus) return;


    order.status = newStatus;

    localStorage.setItem(

        "orders",

        JSON.stringify(orders)

    );

    displayOrders();

}


/* =====================================================
   REFRESH ORDERS
===================================================== */

function refreshOrders(){

    orders = JSON.parse(

        localStorage.getItem("orders")

    ) || [];

    displayOrders();

}
/* =====================================================
   ORDER STATUS COLORS
===================================================== */

function getStatusClass(status){

    switch(status){

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
   PRINT ORDERS (Future Use)
===================================================== */

function printOrders(){

    window.print();

}


/* =====================================================
   FARMER ONLY BUTTONS
===================================================== */

if(addOrderBtn){

    if(userRole === "Customer"){

        addOrderBtn.style.display = "none";

    }

}


/* =====================================================
   AUTO REFRESH WHEN LOCAL STORAGE CHANGES
===================================================== */

window.addEventListener("storage", function(){

    refreshOrders();

});


/* =====================================================
   PAGE VISIBILITY REFRESH
===================================================== */

document.addEventListener("visibilitychange", function(){

    if(!document.hidden){

        refreshOrders();

    }

});


/* =====================================================
   SORT ORDERS (Newest First)
===================================================== */

function sortOrders(){

    orders.sort((a,b)=>{

        return b.id - a.id;

    });

}

sortOrders();


/* =====================================================
   INITIALIZE PAGE
===================================================== */

refreshOrders();


/* =====================================================
   GLOBAL FUNCTIONS
===================================================== */

window.displayOrders = displayOrders;

window.filterOrders = filterOrders;

window.editOrder = editOrder;

window.deleteOrder = deleteOrder;

window.refreshOrders = refreshOrders;

window.exportOrders = exportOrders;

window.printOrders = printOrders;


/* =====================================================
   END OF ORDERS MODULE
===================================================== */

console.log(
    "✅ Orders Module Loaded Successfully"
);