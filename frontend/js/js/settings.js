/* =====================================================
   FARM2HOME
   SETTINGS MODULE - PART 1
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
   LOAD LOCAL STORAGE
===================================================== */

let users =

    JSON.parse(localStorage.getItem("users")) || [];

let products =

    JSON.parse(localStorage.getItem("products")) || [];

let orders =

    JSON.parse(localStorage.getItem("orders")) || [];


/* =====================================================
   HTML ELEMENTS
===================================================== */

const fullName =

    document.getElementById("fullName");

const phone =

    document.getElementById("phone");

const saveProfileBtn =

    document.getElementById("saveProfileBtn");


const currentPassword =

    document.getElementById("currentPassword");

const newPassword =

    document.getElementById("newPassword");

const confirmPassword =

    document.getElementById("confirmPassword");

const changePasswordBtn =

    document.getElementById("changePasswordBtn");


const farmerSettings =

    document.getElementById("farmerSettings");


/* =====================================================
   LOAD USER DETAILS
===================================================== */

function loadUserDetails() {

    fullName.value = loggedInUser.name || "";

    phone.value = loggedInUser.phone || "";

}


/* =====================================================
   ROLE BASED SETTINGS
===================================================== */

if (loggedInUser.role !== "Farmer") {

    farmerSettings.style.display = "none";

}


/* =====================================================
   SAVE PROFILE
===================================================== */

saveProfileBtn.addEventListener("click", function () {

    const name = fullName.value.trim();

    const mobile = phone.value.trim();

    if (name === "" || mobile === "") {

        alert("Please fill all fields.");

        return;

    }

    loggedInUser.name = name;

    loggedInUser.phone = mobile;

    localStorage.setItem(

        "loggedInUser",

        JSON.stringify(loggedInUser)

    );

    users = users.map(user => {

        if (user.email === loggedInUser.email) {

            user.name = name;

            user.phone = mobile;

        }

        return user;

    });

    localStorage.setItem(

        "users",

        JSON.stringify(users)

    );

    alert("Profile updated successfully.");

});


/* =====================================================
   INITIALIZE
===================================================== */

loadUserDetails();

console.log("✅ Settings Part 1 Loaded");
/* =====================================================
   CHANGE PASSWORD
===================================================== */

changePasswordBtn.addEventListener("click", function () {

    const current = currentPassword.value.trim();

    const newPass = newPassword.value.trim();

    const confirmPass = confirmPassword.value.trim();

    if (!current || !newPass || !confirmPass) {

        alert("Please fill all password fields.");

        return;

    }

    if (current !== loggedInUser.password) {

        alert("Current password is incorrect.");

        return;

    }

    if (newPass.length < 6) {

        alert("New password must be at least 6 characters.");

        return;

    }

    if (newPass !== confirmPass) {

        alert("Passwords do not match.");

        return;

    }

    loggedInUser.password = newPass;

    localStorage.setItem(

        "loggedInUser",

        JSON.stringify(loggedInUser)

    );

    users = users.map(user => {

        if (user.email === loggedInUser.email) {

            user.password = newPass;

        }

        return user;

    });

    localStorage.setItem(

        "users",

        JSON.stringify(users)

    );

    currentPassword.value = "";

    newPassword.value = "";

    confirmPassword.value = "";

    alert("Password updated successfully.");

});


/* =====================================================
   NOTIFICATION SETTINGS
===================================================== */

const emailNotification =

    document.getElementById("emailNotification");

const orderNotification =

    document.getElementById("orderNotification");


emailNotification.checked =

    JSON.parse(localStorage.getItem("emailNotification")) ?? true;

orderNotification.checked =

    JSON.parse(localStorage.getItem("orderNotification")) ?? true;


emailNotification.addEventListener("change", function () {

    localStorage.setItem(

        "emailNotification",

        JSON.stringify(emailNotification.checked)

    );

});


orderNotification.addEventListener("change", function () {

    localStorage.setItem(

        "orderNotification",

        JSON.stringify(orderNotification.checked)

    );

});


/* =====================================================
   THEME SETTINGS
===================================================== */

const themeOptions =

    document.querySelectorAll("input[name='theme']");


const savedTheme =

    localStorage.getItem("theme") || "light";


document.body.classList.toggle(

    "dark",

    savedTheme === "dark"

);


themeOptions.forEach(option => {

    if (option.value === savedTheme) {

        option.checked = true;

    }

    option.addEventListener("change", function () {

        localStorage.setItem("theme", this.value);

        document.body.classList.toggle(

            "dark",

            this.value === "dark"

        );

    });

});


/* =====================================================
   LANGUAGE SETTINGS
===================================================== */

const language =

    document.getElementById("language");


language.value =

    localStorage.getItem("language") || "English";


language.addEventListener("change", function () {

    localStorage.setItem(

        "language",

        this.value

    );

    alert(

        "Language changed to " + this.value

    );

});


console.log("✅ Settings Part 2 Loaded");
/* =====================================================
   FARMER RESET BUTTONS
===================================================== */

const resetProductsBtn =
    document.getElementById("resetProductsBtn");

const resetOrdersBtn =
    document.getElementById("resetOrdersBtn");

const resetCustomersBtn =
    document.getElementById("resetCustomersBtn");

const resetAppBtn =
    document.getElementById("resetAppBtn");

if (resetProductsBtn) {

    resetProductsBtn.addEventListener("click", function () {

        if (!confirm("Reset all products?")) return;

        localStorage.removeItem("products");

        alert("Products have been reset.");

    });

}

if (resetOrdersBtn) {

    resetOrdersBtn.addEventListener("click", function () {

        if (!confirm("Reset all orders?")) return;

        localStorage.removeItem("orders");

        alert("Orders have been reset.");

    });

}

if (resetCustomersBtn) {

    resetCustomersBtn.addEventListener("click", function () {

        if (!confirm("Reset all customers?")) return;

        localStorage.removeItem("users");

        localStorage.removeItem("loggedInUser");

        alert("Customers have been reset.");

        window.location.href = "login.html";

    });

}

if (resetAppBtn) {

    resetAppBtn.addEventListener("click", function () {

        if (!confirm("This will clear the entire application data. Continue?")) {

            return;

        }

        localStorage.clear();

        alert("Application data reset successfully.");

        window.location.href = "login.html";

    });

}


/* =====================================================
   LOGOUT
===================================================== */

const logoutBtn =
    document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", function () {

    if (!confirm("Are you sure you want to logout?")) {

        return;

    }

    localStorage.removeItem("loggedInUser");

    alert("Logged out successfully.");

    window.location.href = "login.html";

});


/* =====================================================
   PAGE INITIALIZATION
===================================================== */

function initializeSettings() {

    loadUserDetails();

    console.log("⚙️ Settings initialized successfully.");

}

initializeSettings();


/* =====================================================
   MODULE LOADED
===================================================== */

console.log("✅ Settings Module Loaded Successfully");