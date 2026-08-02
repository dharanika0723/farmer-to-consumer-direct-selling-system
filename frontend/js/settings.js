/* =====================================================
   SETTINGS PAGE
===================================================== */

/* =====================================================
   LOGGED IN USER
===================================================== */

const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser) {

    alert("Please login first.");

    window.location.href = "login.html";

}

/* =====================================================
   HTML ELEMENTS
===================================================== */

const fullName = document.getElementById("fullName");
const phone = document.getElementById("phone");

const saveProfileBtn = document.getElementById("saveProfileBtn");

const currentPassword = document.getElementById("currentPassword");
const newPassword = document.getElementById("newPassword");
const confirmPassword = document.getElementById("confirmPassword");

const changePasswordBtn = document.getElementById("changePasswordBtn");

const farmerSettings = document.getElementById("farmerSettings");

/* =====================================================
   ROLE BASED SETTINGS
===================================================== */

if (loggedInUser.role !== "Farmer") {

    farmerSettings.style.display = "none";

}

/* =====================================================
   LOAD USER DETAILS FROM MYSQL
===================================================== */

async function loadUserDetails() {

    try {

        const response = await fetch(

            `http://localhost:5000/api/settings/${loggedInUser.id}`

        );

        const data = await response.json();

        if (!data.success) {

            alert(data.message);

            return;

        }

        fullName.value = data.user.name;

        phone.value = data.user.phone;

    }

    catch (error) {

        console.error(error);

        alert("Unable to load user details.");

    }

}

/* =====================================================
   SAVE PROFILE
===================================================== */

saveProfileBtn.addEventListener("click", async function () {

    const name = fullName.value.trim();

    const mobile = phone.value.trim();

    if (name === "" || mobile === "") {

        alert("Please fill all fields.");

        return;

    }

    try {

        const response = await fetch(

            `http://localhost:5000/api/settings/${loggedInUser.id}`,

            {

                method: "PUT",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    name: name,

                    phone: mobile

                })

            }

        );

        const data = await response.json();

        if (!data.success) {

            alert(data.message);

            return;

        }

        loggedInUser.name = name;

        loggedInUser.phone = mobile;

        localStorage.setItem(

            "loggedInUser",

            JSON.stringify(loggedInUser)

        );

        alert("Profile updated successfully.");

    }

    catch (error) {

        console.error(error);

        alert("Unable to update profile.");

    }

});

/* =====================================================
   INITIALIZE
===================================================== */

loadUserDetails();

console.log("✅ Settings Part 1 Loaded");
/* =====================================================
   CHANGE PASSWORD (MYSQL)
===================================================== */

changePasswordBtn.addEventListener("click", async function () {

    const current = currentPassword.value.trim();

    const newPass = newPassword.value.trim();

    const confirmPass = confirmPassword.value.trim();

    if (!current || !newPass || !confirmPass) {

        alert("Please fill all password fields.");

        return;

    }

    if (newPass !== confirmPass) {

        alert("Passwords do not match.");

        return;

    }

    if (newPass.length < 6) {

        alert("Password must contain at least 6 characters.");

        return;

    }

    try {

        const response = await fetch(

            `http://localhost:5000/api/settings/change-password/${loggedInUser.id}`,

            {

                method: "PUT",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    currentPassword: current,

                    newPassword: newPass

                })

            }

        );

        const data = await response.json();

        if (!data.success) {

            alert(data.message);

            return;

        }

        currentPassword.value = "";

        newPassword.value = "";

        confirmPassword.value = "";

        alert("Password updated successfully.");

    }

    catch (error) {

        console.error(error);

        alert("Unable to update password.");

    }

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

        localStorage.setItem(

            "theme",

            this.value

        );

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
   (Temporary - Frontend Only)
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

        alert(
            "This feature will be connected to MySQL in the next update."
        );

    });

}

if (resetOrdersBtn) {

    resetOrdersBtn.addEventListener("click", function () {

        alert(
            "This feature will be connected to MySQL in the next update."
        );

    });

}

if (resetCustomersBtn) {

    resetCustomersBtn.addEventListener("click", function () {

        alert(
            "This feature will be connected to MySQL in the next update."
        );

    });

}

if (resetAppBtn) {

    resetAppBtn.addEventListener("click", function () {

        alert(
            "This feature will be connected to MySQL in the next update."
        );

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
   REFRESH SETTINGS
===================================================== */

function refreshSettings(){

    loadUserDetails();

}


/* =====================================================
   PAGE VISIBILITY REFRESH
===================================================== */

document.addEventListener("visibilitychange",function(){

    if(!document.hidden){

        refreshSettings();

    }

});


/* =====================================================
   AUTO REFRESH EVERY 30 SECONDS
===================================================== */

setInterval(function(){

    refreshSettings();

},30000);


/* =====================================================
   PAGE INITIALIZATION
===================================================== */

function initializeSettings(){

    loadUserDetails();

    console.log("⚙️ Settings initialized successfully.");

}

initializeSettings();


/* =====================================================
   GLOBAL FUNCTIONS
===================================================== */

window.refreshSettings = refreshSettings;
window.loadUserDetails = loadUserDetails;


/* =====================================================
   MODULE LOADED
===================================================== */

console.log("✅ Settings Module Loaded Successfully");