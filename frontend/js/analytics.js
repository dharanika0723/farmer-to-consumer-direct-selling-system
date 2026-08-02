/* =====================================================
   ANALYTICS PAGE
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
const totalRevenue = document.getElementById("totalRevenue");

const bestProduct = document.getElementById("bestProduct");
const lowStockProduct = document.getElementById("lowStockProduct");

const recentOrdersTable = document.getElementById("recentOrdersTable");

/* =====================================================
   ANALYTICS DATA
===================================================== */

let analytics = {};

/* =====================================================
   LOAD ANALYTICS
===================================================== */

async function loadAnalytics() {

    try {

        const response = await fetch("http://localhost:5000/api/analytics");

        const data = await response.json();

        if (!data.success) {

            alert(data.message);

            return;

        }

        analytics = data.analytics;

        updateSummaryCards();

        loadHighlights();

    }

    catch (error) {

        console.error(error);

        alert("Unable to load analytics.");

    }

}

/* =====================================================
   SUMMARY CARDS
===================================================== */

function updateSummaryCards() {

    totalProducts.textContent = analytics.totalProducts;

    totalOrders.textContent = analytics.totalOrders;

    totalCustomers.textContent = analytics.totalCustomers;

    totalRevenue.textContent = "₹" + analytics.totalRevenue;

}

/* =====================================================
   BEST PRODUCT & LOW STOCK
===================================================== */

function loadHighlights() {

    if (bestProduct) {

        if (analytics.bestProduct) {

            bestProduct.textContent =
                analytics.bestProduct.name +
                " (" +
                analytics.bestProduct.totalSold +
                " sold)";

        }

        else {

            bestProduct.textContent = "No Data";

        }

    }

    if (lowStockProduct) {

        if (analytics.lowStock) {

            lowStockProduct.textContent =
                analytics.lowStock.name +
                " (" +
                analytics.lowStock.stock +
                " " +
                analytics.lowStock.unit +
                ")";

        }

        else {

            lowStockProduct.textContent = "No Data";

        }

    }

}
/* =====================================================
   RECENT ORDERS TABLE
===================================================== */

function loadRecentOrders() {

    if (!recentOrdersTable) return;

    recentOrdersTable.innerHTML = "";

    if (!analytics.recentOrders || analytics.recentOrders.length === 0) {

        recentOrdersTable.innerHTML = `
        <tr>
            <td colspan="7">No Recent Orders</td>
        </tr>
        `;

        return;

    }

    analytics.recentOrders.forEach(order => {

        recentOrdersTable.innerHTML += `

        <tr>

            <td>#${order.id}</td>

            <td>${order.customer}</td>

            <td>${order.product}</td>

            <td>${order.quantity}</td>

            <td>₹${order.total_price}</td>

            <td>

                <span class="${getStatusClass(order.status)}">

                    ${order.status}

                </span>

            </td>

            <td>${new Date(order.created_at).toLocaleDateString()}</td>

        </tr>

        `;

    });

}

/* =====================================================
   STATUS CLASS
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
   CATEGORY CHART
===================================================== */

let categoryChart;

function loadCategoryChart(){

    const ctx=document.getElementById("categoryChart");

    if(!ctx) return;

    if(categoryChart){

        categoryChart.destroy();

    }

    categoryChart=new Chart(ctx,{

        type:"pie",

        data:{

            labels:analytics.categories.map(item=>item.category),

            datasets:[{

                data:analytics.categories.map(item=>item.total)

            }]

        },

        options:{

            responsive:true,

            plugins:{

                legend:{
                    position:"bottom"
                }

            }

        }

    });

}

/* =====================================================
   SALES CHART
===================================================== */

let salesChart;

function loadSalesChart(){

    const ctx=document.getElementById("salesChart");

    if(!ctx) return;

    if(salesChart){

        salesChart.destroy();

    }

    salesChart=new Chart(ctx,{

        type:"bar",

        data:{

            labels:["Products","Orders","Customers"],

            datasets:[{

                label:"Overview",

                data:[
                    analytics.totalProducts,
                    analytics.totalOrders,
                    analytics.totalCustomers
                ]

            }]

        },

        options:{

            responsive:true,

            scales:{

                y:{
                    beginAtZero:true
                }

            }

        }

    });

}
/* =====================================================
   REFRESH ANALYTICS
===================================================== */

function refreshAnalytics(){

    loadAnalytics().then(()=>{

        loadRecentOrders();

        loadCategoryChart();

        loadSalesChart();

    });

}

/* =====================================================
   PAGE VISIBILITY REFRESH
===================================================== */

document.addEventListener("visibilitychange",function(){

    if(!document.hidden){

        refreshAnalytics();

    }

});

/* =====================================================
   AUTO REFRESH EVERY 30 SECONDS
===================================================== */

setInterval(function(){

    refreshAnalytics();

},30000);

/* =====================================================
   INITIALIZE PAGE
===================================================== */

refreshAnalytics();

/* =====================================================
   GLOBAL FUNCTIONS
===================================================== */

window.refreshAnalytics=refreshAnalytics;
window.loadAnalytics=loadAnalytics;
window.loadRecentOrders=loadRecentOrders;
window.loadCategoryChart=loadCategoryChart;
window.loadSalesChart=loadSalesChart;

/* =====================================================
   MODULE LOADED
===================================================== */

console.log("✅ Analytics Module Loaded Successfully");