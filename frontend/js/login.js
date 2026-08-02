/* =====================================================
   FARM2HOME
   LOGIN MODULE - PART 1
===================================================== */


/* =====================================================
   SELECT ELEMENTS
===================================================== */

const loginForm =

    document.getElementById("loginForm");

const email =

    document.getElementById("email");

const password =

    document.getElementById("password");


const emailError =

    document.getElementById("emailError");

const passwordError =

    document.getElementById("passwordError");


const togglePassword =

    document.getElementById("togglePassword");


/* =====================================================
   LOAD USERS
===================================================== */

let users =

    JSON.parse(localStorage.getItem("users")) || [];


/* =====================================================
   SHOW / HIDE PASSWORD
===================================================== */

togglePassword.addEventListener("click", function () {

    if (password.type === "password") {

        password.type = "text";

        togglePassword.classList.replace(

            "fa-eye",

            "fa-eye-slash"

        );

    }

    else {

        password.type = "password";

        togglePassword.classList.replace(

            "fa-eye-slash",

            "fa-eye"

        );

    }

});


/* =====================================================
   IF NO USERS REGISTERED
===================================================== */

if (users.length === 0) {

    console.warn("No registered users found.");

}


/* =====================================================
   PAGE LOADED
===================================================== */

console.log("✅ Login Part 1 Loaded");
/* =====================================================
   VALIDATION
===================================================== */

function validateEmail() {

    const emailPattern =

        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.value.trim() === "") {

        emailError.textContent =

            "Email is required";

        return false;

    }

    if (!emailPattern.test(email.value.trim())) {

        emailError.textContent =

            "Enter a valid email address";

        return false;

    }

    emailError.textContent = "";

    return true;

}


/* =====================================================
   PASSWORD VALIDATION
===================================================== */

function validatePassword() {

    if (password.value.trim() === "") {

        passwordError.textContent =

            "Password is required";

        return false;

    }

    if (password.value.length < 6) {

        passwordError.textContent =

            "Password must be at least 6 characters";

        return false;

    }

    passwordError.textContent = "";

    return true;

}


/* =====================================================
   CLEAR ERRORS WHILE TYPING
===================================================== */

email.addEventListener("input", function () {

    emailError.textContent = "";

});

password.addEventListener("input", function () {

    passwordError.textContent = "";

});


/* =====================================================
   FIND USER
===================================================== */

function findUser(emailAddress, passwordValue) {

    return users.find(user =>

        user.email.toLowerCase() ===
        emailAddress.toLowerCase()

        &&

        user.password === passwordValue

    );

}


console.log("✅ Login Part 2 Loaded");
/* =====================================================
   LOGIN FORM SUBMIT
===================================================== */

loginForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (!isEmailValid || !isPasswordValid) {

        return;

    }

    const loginData = {

        email: email.value.trim().toLowerCase(),

        password: password.value

    };

    try {

        const response = await fetch(

            "http://localhost:5000/api/auth/login",

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(loginData)

            }

        );

        const data = await response.json();

        if (data.success) {

            /* Save Logged-in User */

            localStorage.setItem(

                "loggedInUser",

                JSON.stringify(data.user)

            );

            alert(data.message);

            window.location.href = "dashboard.html";

        }

        else {

            alert(data.message);

        }

    }

    catch (error) {

        console.error(error);

        alert("Unable to connect to server.");

    }

});
/* =====================================================
   AUTO REDIRECT IF ALREADY LOGGED IN
===================================================== */

const loggedInUser =

    JSON.parse(

        localStorage.getItem("loggedInUser")

    );

if (loggedInUser) {

    console.log(

        "Already Logged In:",

        loggedInUser.email

    );

}


/* =====================================================
   LOGIN MODULE LOADED
===================================================== */

console.log("✅ Login Module Loaded Successfully");