/* =====================================================
   REPORTS PAGE
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
   FARMER ACCESS ONLY
===================================================== */

if (loggedInUser.role !== "Farmer") {

    alert("Only Farmers can access Reports.");

    window.location.href = "dashboard.html";

}

/* =====================================================
   HTML ELEMENTS
===================================================== */

const reportProducts = document.getElementById("reportProducts");
const reportOrders = document.getElementById("reportOrders");
const reportCustomers = document.getElementById("reportCustomers");
const reportRevenue = document.getElementById("reportRevenue");

const reportTableBody = document.getElementById("reportTableBody");

const fromDate = document.getElementById("fromDate");
const toDate = document.getElementById("toDate");
const reportType = document.getElementById("reportType");

const generateReportBtn = document.getElementById("generateReportBtn");
const printReportBtn = document.getElementById("printReportBtn");
const exportReportBtn = document.getElementById("exportReportBtn");

/* =====================================================
   REPORT DATA
===================================================== */

let reports = {};

/* =====================================================
   LOAD REPORTS FROM MYSQL
===================================================== */

async function loadReports() {

    try {

        const response = await fetch("http://localhost:5000/api/reports");

        const data = await response.json();

        if (!data.success) {

            alert(data.message);

            return;

        }

        reports = data.reports;

        updateSummaryCards();

        displayReportTable(reports.orders);

    }

    catch (error) {

        console.error(error);

        alert("Unable to load reports.");

    }

}

/* =====================================================
   SUMMARY CARDS
===================================================== */

function updateSummaryCards() {

    reportProducts.textContent = reports.totalProducts;

    reportOrders.textContent = reports.totalOrders;

    reportCustomers.textContent = reports.totalCustomers;

    reportRevenue.textContent = "₹" + reports.totalRevenue;

}
/* =====================================================
   DISPLAY REPORT TABLE
===================================================== */

function displayReportTable(orderList = reports.orders) {

    reportTableBody.innerHTML = "";

    if (!orderList || orderList.length === 0) {

        reportTableBody.innerHTML = `

        <tr>

            <td colspan="7">

                No Report Data Available

            </td>

        </tr>

        `;

        return;

    }

    orderList.forEach(order => {

        reportTableBody.innerHTML += `

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
   STATUS COLOR
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
   GENERATE REPORT
===================================================== */

generateReportBtn.addEventListener("click", generateReport);

function generateReport(){

    let filtered = [...reports.orders];

    /* -----------------------------
       FROM DATE
    ------------------------------ */

    if(fromDate.value){

        filtered = filtered.filter(order=>{

            return new Date(order.created_at) >= new Date(fromDate.value);

        });

    }

    /* -----------------------------
       TO DATE
    ------------------------------ */

    if(toDate.value){

        const endDate = new Date(toDate.value);

        endDate.setHours(23,59,59,999);

        filtered = filtered.filter(order=>{

            return new Date(order.created_at) <= endDate;

        });

    }

    /* -----------------------------
       REPORT TYPE
    ------------------------------ */

    switch(reportType.value){

        case "orders":

            break;

        case "sales":

            filtered = filtered.filter(order=>

                Number(order.total_price) > 0

            );

            break;

        case "products":

            filtered.sort((a,b)=>

                a.product.localeCompare(b.product)

            );

            break;

        case "customers":

            filtered.sort((a,b)=>

                a.customer.localeCompare(b.customer)

            );

            break;

        default:

            break;

    }

    displayReportTable(filtered);

}
/* =====================================================
   PRINT REPORT
===================================================== */

printReportBtn.addEventListener("click", function(){

    window.print();

});

/* =====================================================
   EXPORT REPORT
===================================================== */

exportReportBtn.addEventListener("click", function(){

    let csv = "Order ID,Customer,Product,Quantity,Total,Status,Date\n";

    reports.orders.forEach(order=>{

        csv +=
            order.id + "," +
            order.customer + "," +
            order.product + "," +
            order.quantity + "," +
            order.total_price + "," +
            order.status + "," +
            new Date(order.created_at).toLocaleDateString() +
            "\n";

    });

    const blob = new Blob([csv],{

        type:"text/csv"

    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "Farm_Report.csv";

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);

    URL.revokeObjectURL(url);

});

/* =====================================================
   REFRESH REPORTS
===================================================== */

function refreshReports(){

    loadReports();

}

/* =====================================================
   PAGE VISIBILITY REFRESH
===================================================== */

document.addEventListener("visibilitychange",function(){

    if(!document.hidden){

        refreshReports();

    }

});

/* =====================================================
   AUTO REFRESH EVERY 30 SECONDS
===================================================== */

setInterval(function(){

    refreshReports();

},30000);

/* =====================================================
   INITIALIZE PAGE
===================================================== */

refreshReports();

/* =====================================================
   GLOBAL FUNCTIONS
===================================================== */

window.refreshReports = refreshReports;
window.loadReports = loadReports;
window.generateReport = generateReport;
window.displayReportTable = displayReportTable;

/* =====================================================
   MODULE LOADED
===================================================== */

console.log("✅ Reports Module Loaded Successfully");