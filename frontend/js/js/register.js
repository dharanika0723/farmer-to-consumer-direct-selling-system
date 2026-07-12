/* =====================================================
   FARM2HOME
   REGISTER MODULE - PART 1
===================================================== */


/* =====================================================
   SELECT ELEMENTS
===================================================== */

const registerForm =

    document.getElementById("registerForm");

const name =

    document.getElementById("name");

const email =

    document.getElementById("email");

const phone =

    document.getElementById("phone");

const role =

    document.getElementById("role");

const password =

    document.getElementById("password");

const confirmPassword =

    document.getElementById("confirmPassword");


/* =====================================================
   ERROR ELEMENTS
===================================================== */

const nameError =

    document.getElementById("nameError");

const emailError =

    document.getElementById("emailError");

const phoneError =

    document.getElementById("phoneError");

const roleError =

    document.getElementById("roleError");

const passwordError =

    document.getElementById("passwordError");

const confirmPasswordError =

    document.getElementById("confirmPasswordError");


/* =====================================================
   PASSWORD TOGGLE
===================================================== */

const togglePassword =

    document.getElementById("togglePassword");

const toggleConfirmPassword =

    document.getElementById("toggleConfirmPassword");


/* =====================================================
   LOCAL STORAGE
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


toggleConfirmPassword.addEventListener("click", function () {

    if (confirmPassword.type === "password") {

        confirmPassword.type = "text";

        toggleConfirmPassword.classList.replace(

            "fa-eye",

            "fa-eye-slash"

        );

    }

    else {

        confirmPassword.type = "password";

        toggleConfirmPassword.classList.replace(

            "fa-eye-slash",

            "fa-eye"

        );

    }

});
/* =====================================================
   VALIDATION
===================================================== */

function validateForm() {

    let isValid = true;

    nameError.textContent = "";
    emailError.textContent = "";
    phoneError.textContent = "";
    roleError.textContent = "";
    passwordError.textContent = "";
    confirmPasswordError.textContent = "";


    /* ===============================
       NAME
    =============================== */

    if (name.value.trim() === "") {

        nameError.textContent = "Please enter your full name";

        isValid = false;

    }


    /* ===============================
       EMAIL
    =============================== */

    const emailPattern =

        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.value.trim() === "") {

        emailError.textContent = "Please enter your email";

        isValid = false;

    }

    else if (!emailPattern.test(email.value.trim())) {

        emailError.textContent = "Enter a valid email";

        isValid = false;

    }

    else {

        const emailExists = users.some(user =>

            user.email.toLowerCase() ===
            email.value.trim().toLowerCase()

        );

        if (emailExists) {

            emailError.textContent =

                "Email already registered";

            isValid = false;

        }

    }


    /* ===============================
       PHONE
    =============================== */

    const phonePattern = /^[6-9]\d{9}$/;

    if (phone.value.trim() === "") {

        phoneError.textContent =

            "Please enter phone number";

        isValid = false;

    }

    else if (!phonePattern.test(phone.value.trim())) {

        phoneError.textContent =

            "Enter valid 10-digit phone number";

        isValid = false;

    }


    /* ===============================
       ROLE
    =============================== */

    if (role.value === "") {

        roleError.textContent =

            "Please select your role";

        isValid = false;

    }


    /* ===============================
       PASSWORD
    =============================== */

    if (password.value === "") {

        passwordError.textContent =

            "Password is required";

        isValid = false;

    }

    else if (password.value.length < 6) {

        passwordError.textContent =

            "Minimum 6 characters required";

        isValid = false;

    }


    /* ===============================
       CONFIRM PASSWORD
    =============================== */

    if (confirmPassword.value === "") {

        confirmPasswordError.textContent =

            "Confirm your password";

        isValid = false;

    }

    else if (

        password.value !== confirmPassword.value

    ) {

        confirmPasswordError.textContent =

            "Passwords do not match";

        isValid = false;

    }

    return isValid;

}


/* =====================================================
   CLEAR ERROR WHILE TYPING
===================================================== */

name.addEventListener("input", () =>

    nameError.textContent = ""

);

email.addEventListener("input", () =>

    emailError.textContent = ""

);

phone.addEventListener("input", () =>

    phoneError.textContent = ""

);

role.addEventListener("change", () =>

    roleError.textContent = ""

);

password.addEventListener("input", () =>

    passwordError.textContent = ""

);

confirmPassword.addEventListener("input", () =>

    confirmPasswordError.textContent = ""

);
/* =====================================================
   REGISTER FORM SUBMIT
===================================================== */

registerForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    if (!validateForm()) {

        return;

    }

    const newUser = {

        name: name.value.trim(),

        email: email.value.trim().toLowerCase(),

        phone: phone.value.trim(),

        role: role.value,

        password: password.value

    };


    try {

        const response = await fetch(

            "http://localhost:5000/api/auth/register",

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(newUser)

            }

        );


        const data = await response.json();


        if (data.success) {

            alert(data.message);

            registerForm.reset();

            window.location.href = "login.html";

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
   PAGE LOADED
===================================================== */

console.log("✅ Register Module Loaded Successfully");