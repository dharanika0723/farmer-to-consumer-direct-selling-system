/* =====================================================
   DASHBOARD PAGE
===================================================== */

/* =====================================================
   LOGIN CHECK
===================================================== */

const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser) {
    alert("Please login first.");
    window.location.href = "login.html";
}

/* =====================================================
   HTML ELEMENTS
===================================================== */

const totalProducts = document.getElementById("totalProducts");
const totalOrders = document.getElementById("totalOrders");
const totalCustomers = document.getElementById("totalCustomers");
const revenue = document.getElementById("revenue");

/* =====================================================
   LOAD DASHBOARD STATS
===================================================== */

async function loadDashboardStats() {

    try {

        const response = await fetch("http://localhost:5000/api/dashboard/stats");

        const data = await response.json();

        if (!data.success) {

            alert(data.message);

            return;

        }

        totalProducts.textContent = data.stats.totalProducts;
        totalOrders.textContent = data.stats.totalOrders;
        totalCustomers.textContent = data.stats.totalCustomers;
        revenue.textContent = "₹" + data.stats.totalRevenue;

    } catch (error) {

        console.error(error);

        alert("Unable to load dashboard statistics.");

    }

}

/* =====================================================
   LOAD RECENT ORDERS
===================================================== */

async function loadRecentOrders() {

    const recentOrdersTable = document.getElementById("recentOrders");

    if (!recentOrdersTable) {

        console.error("recentOrders tbody not found.");

        return;

    }

    try {

        const response = await fetch("http://localhost:5000/api/dashboard/recent-orders");

        const data = await response.json();

        if (!data.success) {

            alert(data.message);

            return;

        }

        recentOrdersTable.innerHTML = "";

        if (data.orders.length === 0) {

            recentOrdersTable.innerHTML = `
            <tr>
                <td colspan="4">No Recent Orders</td>
            </tr>
            `;

            return;

        }

        data.orders.forEach(order => {

            recentOrdersTable.innerHTML += `

            <tr>

                <td>#${order.id}</td>

                <td>${order.customer}</td>

                <td>${order.product}</td>

                <td>

                    <span class="${getStatusClass(order.status)}">

                        ${order.status}

                    </span>

                </td>

            </tr>

            `;

        });

    } catch (error) {

        console.error(error);

        alert("Unable to load recent orders.");

    }

}

/* =====================================================
   STATUS COLORS
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
   REFRESH DASHBOARD
===================================================== */

function refreshDashboard(){

    loadDashboardStats();

    loadRecentOrders();

}

/* =====================================================
   AUTO REFRESH
===================================================== */

document.addEventListener("visibilitychange",function(){

    if(!document.hidden){

        refreshDashboard();

    }

});

/* =====================================================
   REFRESH EVERY 30 SECONDS
===================================================== */

setInterval(function(){

    refreshDashboard();

},30000);

/* =====================================================
   GLOBAL FUNCTIONS
===================================================== */

window.refreshDashboard=refreshDashboard;

/* =====================================================
   INITIALIZE DASHBOARD
===================================================== */

refreshDashboard();

/* =====================================================
   DASHBOARD MODULE LOADED
===================================================== */

console.log("✅ Dashboard Module Loaded Successfully");