/* =====================================================
   CUSTOMERS PAGE
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
   USER ROLE
===================================================== */

const userRole = loggedInUser.role;

/* =====================================================
   HTML ELEMENTS
===================================================== */

const customersTable = document.getElementById("customersTable");
const searchCustomer = document.getElementById("searchCustomer");
const totalCustomers = document.getElementById("totalCustomers");
const totalOrders = document.getElementById("totalOrders");
const totalRevenue = document.getElementById("totalRevenue");

/* =====================================================
   CUSTOMER DATA
===================================================== */

let customers = [];

/* =====================================================
   LOAD CUSTOMERS FROM MYSQL
===================================================== */

async function loadCustomers() {

    try {

        const response = await fetch("http://localhost:5000/api/customers");

        const data = await response.json();

        if (!data.success) {

            alert(data.message);

            return;

        }

        customers = data.customers;

        updateSummary();

        displayCustomers(customers);

    } catch (error) {

        console.error(error);

        alert("Unable to load customers.");

    }

}

/* =====================================================
   UPDATE SUMMARY
===================================================== */

function updateSummary() {

    totalCustomers.textContent = customers.length;

    let orders = 0;

    let revenue = 0;

    customers.forEach(customer => {

        orders += Number(customer.total_orders);

        revenue += Number(customer.total_spent);

    });

    totalOrders.textContent = orders;

    totalRevenue.textContent = "₹" + revenue.toFixed(2);

}
/* =====================================================
   DISPLAY CUSTOMERS
===================================================== */

function displayCustomers(customerList = customers) {

    customersTable.innerHTML = "";

    if (customerList.length === 0) {

        customersTable.innerHTML = `
        <tr>
            <td colspan="6">No Customers Found</td>
        </tr>
        `;

        return;
    }

    customerList.forEach(customer => {

        customersTable.innerHTML += `

        <tr>

            <td>${customer.name}</td>

            <td>${customer.email}</td>

            <td>${customer.phone}</td>

            <td>${customer.total_orders}</td>

            <td>₹${Number(customer.total_spent).toFixed(2)}</td>

            <td>

                <button
                    class="view-btn"
                    onclick="viewCustomer(${customer.id})">

                    <i class="fa-solid fa-eye"></i>

                    View

                </button>

            </td>

        </tr>

        `;

    });

}

/* =====================================================
   SEARCH CUSTOMERS
===================================================== */

if(searchCustomer){

    searchCustomer.addEventListener("keyup",filterCustomers);

}

/* =====================================================
   FILTER CUSTOMERS
===================================================== */

function filterCustomers(){

    const keyword=searchCustomer.value.toLowerCase().trim();

    const filteredCustomers=customers.filter(customer=>

        customer.name.toLowerCase().includes(keyword) ||

        customer.email.toLowerCase().includes(keyword) ||

        customer.phone.includes(keyword)

    );

    displayCustomers(filteredCustomers);

}
/* =====================================================
   VIEW CUSTOMER
===================================================== */

function viewCustomer(id){

    const customer=customers.find(customer=>customer.id===id);

    if(!customer) return;

    alert(
`Customer Details

Name : ${customer.name}

Email : ${customer.email}

Phone : ${customer.phone}

Total Orders : ${customer.total_orders}

Total Spent : ₹${Number(customer.total_spent).toFixed(2)}`
    );

}

/* =====================================================
   REFRESH CUSTOMERS
===================================================== */

function refreshCustomers(){

    loadCustomers();

}

/* =====================================================
   AUTO REFRESH WHEN PAGE IS VISIBLE
===================================================== */

document.addEventListener("visibilitychange",function(){

    if(!document.hidden){

        refreshCustomers();

    }

});

/* =====================================================
   AUTO REFRESH EVERY 30 SECONDS
===================================================== */

setInterval(function(){

    refreshCustomers();

},30000);

/* =====================================================
   INITIALIZE PAGE
===================================================== */

refreshCustomers();

/* =====================================================
   GLOBAL FUNCTIONS
===================================================== */

window.viewCustomer=viewCustomer;
window.refreshCustomers=refreshCustomers;
window.displayCustomers=displayCustomers;
window.filterCustomers=filterCustomers;

/* =====================================================
   MODULE LOADED
===================================================== */

console.log("✅ Customers Module Loaded Successfully");