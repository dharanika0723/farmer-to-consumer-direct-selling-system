/* =====================================================
   FARM2HOME
   CUSTOMERS MODULE - PART 1
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
   ONLY FARMER CAN ACCESS
===================================================== */

if (loggedInUser.role !== "Farmer") {

    document.body.innerHTML = `

    <div class="access-denied">

        <i class="fa-solid fa-lock"></i>

        <h2>Access Denied</h2>

        <p>

            Only Farmers can access the
            Customers Management page.

        </p>

        <p>

            Redirecting to Dashboard...

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

const customersTable =
    document.getElementById("customersTable");

const searchCustomer =
    document.getElementById("searchCustomer");

const totalCustomers =
    document.getElementById("totalCustomers");

const totalOrders =
    document.getElementById("totalOrders");

const totalRevenue =
    document.getElementById("totalRevenue");


/* =====================================================
   LOAD DATA
===================================================== */

const users =
    JSON.parse(localStorage.getItem("users")) || [];

const orders =
    JSON.parse(localStorage.getItem("orders")) || [];


/* =====================================================
   GET ONLY CUSTOMERS
===================================================== */

const customers = users.filter(user =>

    user.role === "Customer"

);


/* =====================================================
   UPDATE DASHBOARD CARDS
===================================================== */

function updateStatistics(){

    totalCustomers.textContent = customers.length;

    totalOrders.textContent = orders.length;

    let revenue = 0;

    orders.forEach(order =>{

        revenue += Number(order.total);

    });

    totalRevenue.textContent =

        "₹" + revenue.toLocaleString();

}


/* =====================================================
   DISPLAY CUSTOMERS
===================================================== */

function displayCustomers(customerList = customers){

    customersTable.innerHTML = "";

    if(customerList.length === 0){

        customersTable.innerHTML = `

        <tr>

            <td colspan="6">

                <div class="no-customers">

                    <i class="fa-solid fa-users-slash"></i>

                    <h2>No Customers Found</h2>

                    <p>

                        Customer records will appear here.

                    </p>

                </div>

            </td>

        </tr>

        `;

        return;

    }

    customerList.forEach(customer =>{

        const customerOrders = orders.filter(order =>

            order.email === customer.email

        );

        const totalSpent = customerOrders.reduce(

            (sum,order)=>sum + Number(order.total),

            0

        );

        customersTable.innerHTML += `

        <tr>

            <td>

                <div class="customer-info">

                    <div class="customer-avatar">

                        ${customer.name.charAt(0).toUpperCase()}

                    </div>

                    ${customer.name}

                </div>

            </td>

            <td>

                ${customer.email}

            </td>

            <td>

                ${customer.phone}

            </td>

            <td>

                ${customerOrders.length}

            </td>

            <td class="total-spent">

                ₹${totalSpent}

            </td>

            <td>

                <div class="action-buttons">

                    <button
                        class="view-btn"
                        onclick="viewCustomer('${customer.email}')">

                        <i class="fa-solid fa-eye"></i>

                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteCustomer('${customer.email}')">

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </div>

            </td>

        </tr>

        `;

    });

}


/* =====================================================
   INITIALIZE PAGE
===================================================== */

updateStatistics();

displayCustomers();
/* =====================================================
   SEARCH CUSTOMERS
===================================================== */

if (searchCustomer) {

    searchCustomer.addEventListener("keyup", searchCustomers);

}


/* =====================================================
   SEARCH FUNCTION
===================================================== */

function searchCustomers() {

    const keyword = searchCustomer.value
        .toLowerCase()
        .trim();

    const filteredCustomers = customers.filter(customer =>

        customer.name.toLowerCase().includes(keyword) ||

        customer.email.toLowerCase().includes(keyword) ||

        customer.phone.includes(keyword)

    );

    displayCustomers(filteredCustomers);

}


/* =====================================================
   VIEW CUSTOMER
===================================================== */

function viewCustomer(email) {

    const customer = customers.find(user =>

        user.email === email

    );

    if (!customer) return;


    const customerOrders = orders.filter(order =>

        order.email === email

    );

    let totalSpent = 0;

    customerOrders.forEach(order => {

        totalSpent += Number(order.total);

    });


    alert(

`Customer Details

Name : ${customer.name}

Email : ${customer.email}

Phone : ${customer.phone}

Role : ${customer.role}

Orders : ${customerOrders.length}

Total Spent : ₹${totalSpent}`

    );

}


/* =====================================================
   DELETE CUSTOMER
===================================================== */

function deleteCustomer(email) {

    const confirmDelete = confirm(

        "Are you sure you want to delete this customer?"

    );

    if (!confirmDelete) {

        return;

    }


    const updatedUsers = users.filter(user =>

        user.email !== email

    );

    localStorage.setItem(

        "users",

        JSON.stringify(updatedUsers)

    );


    const index = customers.findIndex(customer =>

        customer.email === email

    );

    if (index !== -1) {

        customers.splice(index, 1);

    }


    updateStatistics();

    displayCustomers();

}
/* =====================================================
   REFRESH DATA
===================================================== */

function refreshCustomers() {

    location.reload();

}
/* =====================================================
   SORT CUSTOMERS (A-Z)
===================================================== */

customers.sort((a, b) =>

    a.name.localeCompare(b.name)

);


/* =====================================================
   EXPORT CUSTOMERS (Future Backend)
===================================================== */

function exportCustomers() {

    alert(

        "Export Customers feature will be available after backend integration."

    );

}


/* =====================================================
   PRINT CUSTOMER LIST
===================================================== */

function printCustomers() {

    window.print();

}


/* =====================================================
   AUTO REFRESH WHEN LOCAL STORAGE CHANGES
===================================================== */

window.addEventListener("storage", function () {

    location.reload();

});


/* =====================================================
   REFRESH WHEN PAGE BECOMES ACTIVE
===================================================== */

document.addEventListener("visibilitychange", function () {

    if (!document.hidden) {

        displayCustomers();

        updateStatistics();

    }

});


/* =====================================================
   RELOAD DATA
===================================================== */

function reloadCustomers() {

    displayCustomers();

    updateStatistics();

}


/* =====================================================
   GLOBAL FUNCTIONS
===================================================== */

window.viewCustomer = viewCustomer;

window.deleteCustomer = deleteCustomer;

window.searchCustomers = searchCustomers;

window.exportCustomers = exportCustomers;

window.printCustomers = printCustomers;

window.reloadCustomers = reloadCustomers;


/* =====================================================
   INITIALIZE PAGE
===================================================== */

updateStatistics();

displayCustomers();


/* =====================================================
   MODULE LOADED
===================================================== */

console.log("✅ Customers Module Loaded Successfully");