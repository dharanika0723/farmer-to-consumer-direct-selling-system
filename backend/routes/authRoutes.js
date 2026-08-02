/* =====================================================
   IMPORTS
===================================================== */

const express = require("express");

const router = express.Router();

const {

    registerUser

} = require("../controllers/authController");


/* =====================================================
   AUTH ROUTES
===================================================== */

/* Register User */

router.post(

    "/register",

    registerUser

);


/* =====================================================
   EXPORT ROUTER
===================================================== */

module.exports = router;