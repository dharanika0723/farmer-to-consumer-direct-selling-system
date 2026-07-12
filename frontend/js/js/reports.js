/* =====================================================
   FARM2HOME
   REPORTS MODULE - PART 1
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
   FARMER ACCESS ONLY
===================================================== */

if (loggedInUser.role !== "Farmer") {

    document.body.innerHTML = `

        <div class="no-data">

            <i class="fa-solid fa-lock"></i>

            <h2>Access Denied</h2>

            <p>

                Only Farmers can access Reports.

            </p>

        </div>

    `;

    setTimeout(() => {

        window.location.href = "dashboard.html";

    }, 2000);

}


/* =====================================================
   HTML ELEMENTS
===================================================== */

const reportProducts =
    document.getElementById("reportProducts");

const reportOrders =
    document.getElementById("reportOrders");

const reportCustomers =
    document.getElementById("reportCustomers");

const reportRevenue =
    document.getElementById("reportRevenue");

const reportTableBody =
    document.getElementById("reportTableBody");

const generateReportBtn =
    document.getElementById("generateReportBtn");

const fromDate =
    document.getElementById("fromDate");

const toDate =
    document.getElementById("toDate");

const reportType =
    document.getElementById("reportType");


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
   CUSTOMER LIST
===================================================== */

const customers = users.filter(user =>

    user.role === "Customer"

);


/* =====================================================
   SUMMARY CARDS
===================================================== */

function updateSummaryCards() {

    reportProducts.textContent =

        products.length;

    reportOrders.textContent =

        orders.length;

    reportCustomers.textContent =

        customers.length;

    let revenue = 0;

    orders.forEach(order => {

        revenue += Number(order.total);

    });

    reportRevenue.textContent =

        "₹" + revenue.toLocaleString();

}


/* =====================================================
   INITIALIZE
===================================================== */

updateSummaryCards();

console.log("✅ Reports Part 1 Loaded");
/* =====================================================
   DISPLAY REPORT TABLE
===================================================== */

function displayReportTable(reportList = orders) {

    reportTableBody.innerHTML = "";

    if (reportList.length === 0) {

        reportTableBody.innerHTML = `

        <tr>

            <td colspan="7">

                <div class="no-data">

                    <i class="fa-solid fa-file-circle-xmark"></i>

                    <h3>No Report Found</h3>

                    <p>

                        No records match the selected filters.

                    </p>

                </div>

            </td>

        </tr>

        `;

        return;

    }

    reportList.forEach(order => {

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

        reportTableBody.innerHTML += `

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
   GENERATE REPORT
===================================================== */

generateReportBtn.addEventListener("click", generateReport);

function generateReport() {

    let filteredOrders = [...orders];

    const from = fromDate.value;
    const to = toDate.value;
    const type = reportType.value;


    /* ===========================
       DATE FILTER
    ============================ */

    if (from && to) {

        filteredOrders = filteredOrders.filter(order => {

            return order.date >= from &&
                   order.date <= to;

        });

    }


    /* ===========================
       REPORT TYPE
    ============================ */

    switch (type) {

        case "sales":

            filteredOrders = filteredOrders.filter(order =>

                Number(order.total) > 0

            );

            break;

        case "orders":

            /* Show all orders */

            break;

        case "products":

            filteredOrders.sort((a, b) =>

                a.product.localeCompare(b.product)

            );

            break;

        case "customers":

            filteredOrders.sort((a, b) =>

                a.customer.localeCompare(b.customer)

            );

            break;

    }

    displayReportTable(filteredOrders);

}


/* =====================================================
   LOAD DEFAULT REPORT
===================================================== */

displayReportTable();

console.log("✅ Reports Part 2 Loaded");
/* =====================================================
   PRINT REPORT
===================================================== */

const printReportBtn =

    document.getElementById("printReportBtn");

printReportBtn.addEventListener("click", function () {

    window.print();

});


/* =====================================================
   EXPORT REPORT
===================================================== */

const exportReportBtn =

    document.getElementById("exportReportBtn");

exportReportBtn.addEventListener("click", function () {

    alert(

        "Export Report feature will be available after backend integration."

    );

});


/* =====================================================
   AUTO REFRESH
===================================================== */

window.addEventListener("storage", function () {

    location.reload();

});


/* =====================================================
   REFRESH WHEN PAGE BECOMES ACTIVE
===================================================== */

document.addEventListener("visibilitychange", function () {

    if (!document.hidden) {

        updateSummaryCards();

        displayReportTable();

    }

});


/* =====================================================
   RELOAD REPORTS
===================================================== */

function reloadReports() {

    updateSummaryCards();

    displayReportTable();

}


/* =====================================================
   GLOBAL FUNCTIONS
===================================================== */

window.generateReport = generateReport;

window.reloadReports = reloadReports;


/* =====================================================
   INITIALIZE PAGE
===================================================== */

reloadReports();


/* =====================================================
   MODULE LOADED
===================================================== */

console.log("📄 Reports Module Loaded Successfully");