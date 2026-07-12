/* ===============================
   DASHBOARD PAGE
================================== */


/* ===============================
   CHECK USER LOGIN
================================== */

const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
const userRole = loggedInUser?.role;

if (!loggedInUser) {

    alert("Please login first.");

    window.location.href = "login.html";

}


/* ===============================
   DISPLAY USER NAME
================================== */

const username = document.getElementById("username");

if (loggedInUser && username) {

    username.textContent = loggedInUser.name;

}


/* ===============================
   LOAD DASHBOARD DATA
================================== */

const totalProducts = document.getElementById("totalProducts");
const totalOrders = document.getElementById("totalOrders");
const totalCustomers = document.getElementById("totalCustomers");
const revenue = document.getElementById("revenue");

/* Temporary Sample Data */

if (totalProducts) {

    totalProducts.textContent = "25";

}

if (totalOrders) {

    totalOrders.textContent = "15";

}

if (totalCustomers) {

    totalCustomers.textContent = "40";

}

if (revenue) {

    revenue.textContent = "₹15,000";

}


/* ===============================
   LOGOUT
================================== */

const logoutBtn = document.querySelector(".logout-btn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", function (event) {

        event.preventDefault();

        const confirmLogout = confirm("Are you sure you want to logout?");

        if (confirmLogout) {

            localStorage.removeItem("loggedInUser");

            alert("Logged out successfully!");

            window.location.href = "login.html";

        }

    });

}


/* ===============================
   QUICK ACTION BUTTONS
================================== */

const actionButtons = document.querySelectorAll(".action-btn");

actionButtons.forEach(button => {

    button.addEventListener("mouseover", function () {

        this.style.transform = "scale(1.05)";

    });

    button.addEventListener("mouseout", function () {

        this.style.transform = "scale(1)";

    });

});


/* ===============================
   PAGE LOADED
================================== */

console.log("Dashboard Page Loaded Successfully");