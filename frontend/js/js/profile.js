/* ===============================
   PROFILE PAGE
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
   GET ELEMENTS
================================== */

const profileForm = document.getElementById("profileForm");

const profileName = document.getElementById("profileName");
const profileRole = document.getElementById("profileRole");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const roleInput = document.getElementById("role");
const addressInput = document.getElementById("address");
const cityInput = document.getElementById("city");
const stateInput = document.getElementById("state");
const pincodeInput = document.getElementById("pincode");


/* ===============================
   LOAD USER DATA
================================== */

function loadProfile() {

    profileName.textContent = loggedInUser.name || "User";
    profileRole.textContent = loggedInUser.role || "Consumer";

    nameInput.value = loggedInUser.name || "";
    emailInput.value = loggedInUser.email || "";
    phoneInput.value = loggedInUser.phone || "";
    roleInput.value = loggedInUser.role || "Consumer";

    addressInput.value = loggedInUser.address || "";
    cityInput.value = loggedInUser.city || "";
    stateInput.value = loggedInUser.state || "";
    pincodeInput.value = loggedInUser.pincode || "";

}

loadProfile();


/* ===============================
   SAVE PROFILE
================================== */

profileForm.addEventListener("submit", function (e) {

    e.preventDefault();

    loggedInUser.name = nameInput.value.trim();
    loggedInUser.email = emailInput.value.trim();
    loggedInUser.phone = phoneInput.value.trim();
    loggedInUser.role = roleInput.value;

    loggedInUser.address = addressInput.value.trim();
    loggedInUser.city = cityInput.value.trim();
    loggedInUser.state = stateInput.value.trim();
    loggedInUser.pincode = pincodeInput.value.trim();

    // Update logged in user
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

    // Update registered user (temporary frontend)
    localStorage.setItem("user", JSON.stringify(loggedInUser));

    profileName.textContent = loggedInUser.name;
    profileRole.textContent = loggedInUser.role;

    alert("Profile updated successfully!");

});


/* ===============================
   BASIC VALIDATION
================================== */

phoneInput.addEventListener("input", function () {

    this.value = this.value.replace(/\D/g, "").slice(0, 10);

});

pincodeInput.addEventListener("input", function () {

    this.value = this.value.replace(/\D/g, "").slice(0, 6);

});


/* ===============================
   PAGE LOADED
================================== */

console.log("Profile Page Loaded Successfully");