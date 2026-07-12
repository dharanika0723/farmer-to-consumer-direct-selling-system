/* =====================================================
   FARM2HOME
   ANALYTICS MODULE - PART 1
===================================================== */


/* =====================================================
   LOGGED IN USER
===================================================== */

const loggedInUser = JSON.parse(

    localStorage.getItem("loggedInUser")

);

if (!loggedInUser) {

    alert("Please login first.");

    window.location.href = "login.html";

}


/* =====================================================
   ONLY FARMERS CAN ACCESS
===================================================== */

if (loggedInUser.role !== "Farmer") {

    document.body.innerHTML = `

    <div class="access-denied">

        <i class="fa-solid fa-lock"></i>

        <h2>Access Denied</h2>

        <p>

            Only Farmers can access
            the Analytics Dashboard.

        </p>

    </div>

    `;

    setTimeout(() => {

        window.location.href = "dashboard.html";

    },2000);

}


/* =====================================================
   HTML ELEMENTS
===================================================== */

const totalProducts =

    document.getElementById("totalProducts");

const totalOrders =

    document.getElementById("totalOrders");

const totalCustomers =

    document.getElementById("totalCustomers");

const totalRevenue =

    document.getElementById("totalRevenue");

const bestProduct =

    document.getElementById("bestProduct");

const lowStockProduct =

    document.getElementById("lowStockProduct");

const recentOrdersTable =

    document.getElementById("recentOrdersTable");


/* =====================================================
   LOAD LOCAL STORAGE
===================================================== */

const products =

    JSON.parse(localStorage.getItem("products")) || [];

const orders =

    JSON.parse(localStorage.getItem("orders")) || [];

const users =

    JSON.parse(localStorage.getItem("users")) || [];


/* =====================================================
   FILTER CUSTOMERS
===================================================== */

const customers = users.filter(user =>

    user.role === "Customer"

);


/* =====================================================
   SUMMARY CARDS
===================================================== */

function updateSummaryCards() {

    totalProducts.textContent =

        products.length;

    totalOrders.textContent =

        orders.length;

    totalCustomers.textContent =

        customers.length;


    let revenue = 0;

    orders.forEach(order => {

        revenue += Number(order.total);

    });

    totalRevenue.textContent =

        "₹" + revenue.toLocaleString();

}


/* =====================================================
   INITIALIZE
===================================================== */

updateSummaryCards();

console.log("✅ Analytics Part 1 Loaded");
/* =====================================================
   BEST SELLING PRODUCT
===================================================== */

function updateBestSellingProduct() {

    if (orders.length === 0) {

        bestProduct.textContent = "--";

        return;

    }

    const sales = {};

    orders.forEach(order => {

        if (!sales[order.product]) {

            sales[order.product] = 0;

        }

        sales[order.product] += Number(order.quantity);

    });

    let topProduct = "";
    let highestSales = 0;

    for (const product in sales) {

        if (sales[product] > highestSales) {

            highestSales = sales[product];

            topProduct = product;

        }

    }

    bestProduct.textContent =

        `${topProduct} (${highestSales})`;

}


/* =====================================================
   LOW STOCK PRODUCT
===================================================== */

function updateLowStockProduct() {

    if (products.length === 0) {

        lowStockProduct.textContent = "--";

        return;

    }

    const sortedProducts = [...products].sort(

        (a, b) => Number(a.stock) - Number(b.stock)

    );

    const product = sortedProducts[0];

    lowStockProduct.textContent =

        `${product.name} (${product.stock} ${product.unit})`;

}


/* =====================================================
   SALES OVERVIEW CHART
===================================================== */

function createSalesChart() {

    const ctx = document

        .getElementById("salesChart")

        .getContext("2d");

    const labels = orders.map(order => order.product);

    const totals = orders.map(order => Number(order.total));

    new Chart(ctx, {

        type: "bar",

        data: {

            labels: labels,

            datasets: [

                {

                    label: "Sales (₹)",

                    data: totals,

                    borderWidth: 1

                }

            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            scales: {

                y: {

                    beginAtZero: true

                }

            }

        }

    });

}


/* =====================================================
   CATEGORY CHART
===================================================== */

function createCategoryChart() {

    const ctx = document

        .getElementById("categoryChart")

        .getContext("2d");

    const categories = {};

    products.forEach(product => {

        if (!categories[product.category]) {

            categories[product.category] = 0;

        }

        categories[product.category]++;

    });

    new Chart(ctx, {

        type: "pie",

        data: {

            labels: Object.keys(categories),

            datasets: [

                {

                    data: Object.values(categories)

                }

            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false

        }

    });

}


/* =====================================================
   LOAD ANALYTICS
===================================================== */

updateBestSellingProduct();

updateLowStockProduct();

createSalesChart();

createCategoryChart();

console.log("✅ Analytics Part 2 Loaded");
/* =====================================================
   RECENT ORDERS TABLE
===================================================== */

function displayRecentOrders() {

    recentOrdersTable.innerHTML = "";

    if (orders.length === 0) {

        recentOrdersTable.innerHTML = `

        <tr>

            <td colspan="7">

                <div class="no-data">

                    <i class="fa-solid fa-box-open"></i>

                    <h3>No Orders Available</h3>

                    <p>No orders have been placed yet.</p>

                </div>

            </td>

        </tr>

        `;

        return;

    }

    const latestOrders = [...orders]

        .sort((a, b) => b.id - a.id)

        .slice(0, 5);

    latestOrders.forEach(order => {

        let statusClass = "";

        switch (order.status) {

            case "Pending":
                statusClass = "pending";
                break;

            case "Processing":
                statusClass = "processing";
                break;

            case "Delivered":
                statusClass = "delivered";
                break;

            case "Cancelled":
                statusClass = "cancelled";
                break;

            default:
                statusClass = "pending";
        }

        recentOrdersTable.innerHTML += `

        <tr>

            <td>#${order.id}</td>

            <td>${order.customer}</td>

            <td>${order.product}</td>

            <td>${order.quantity}</td>

            <td>₹${order.total}</td>

            <td>

                <span class="status ${statusClass}">

                    ${order.status}

                </span>

            </td>

            <td>${order.date}</td>

        </tr>

        `;

    });

}


/* =====================================================
   AUTO REFRESH
===================================================== */

window.addEventListener("storage", function () {

    location.reload();

});


document.addEventListener("visibilitychange", function () {

    if (!document.hidden) {

        displayRecentOrders();

        updateSummaryCards();

        updateBestSellingProduct();

        updateLowStockProduct();

    }

});


/* =====================================================
   RELOAD DASHBOARD
===================================================== */

function reloadAnalytics() {

    displayRecentOrders();

    updateSummaryCards();

    updateBestSellingProduct();

    updateLowStockProduct();

}

/* =====================================================
   GLOBAL FUNCTIONS
===================================================== */

window.reloadAnalytics = reloadAnalytics;


/* =====================================================
   INITIALIZE PAGE
===================================================== */

displayRecentOrders();

reloadAnalytics();


/* =====================================================
   MODULE LOADED
===================================================== */

console.log("📊 Analytics Module Loaded Successfully");