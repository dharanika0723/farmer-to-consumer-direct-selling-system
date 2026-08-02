/* =====================================================
   IMPORT PACKAGES
===================================================== */

const express = require("express");

const cors = require("cors");

const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const db = require("./config/db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
/* =====================================================
   LOAD ENVIRONMENT VARIABLES
===================================================== */

dotenv.config();


/* =====================================================
   CREATE EXPRESS APP
===================================================== */

const app = express();


/* =====================================================
   MIDDLEWARE
===================================================== */

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));


/* =====================================================
   DEFAULT ROUTE
===================================================== */

app.get("/", (req, res) => {

    res.send("🌱 Farm2Home Backend Server Running Successfully");

});
/* =====================================================
   REGISTER API
===================================================== */

app.post("/api/auth/register", async (req, res) => {

    try {

        const {

            name,

            email,

            phone,

            role,

            password

        } = req.body;


        /* ===============================
           VALIDATION
        =============================== */

        if (

            !name ||

            !email ||

            !phone ||

            !role ||

            !password

        ) {

            return res.status(400).json({

                success: false,

                message: "All fields are required."

            });

        }


        /* ===============================
           CHECK EXISTING EMAIL
        =============================== */

        const checkQuery =

            "SELECT * FROM users WHERE email = ?";


        db.query(

            checkQuery,

            [email],

            async (err, result) => {

                if (err) {

                    return res.status(500).json({

                        success: false,

                        message: err.message

                    });

                }

                if (result.length > 0) {

                    return res.status(409).json({

                        success: false,

                        message: "Email already exists."

                    });

                }

               /* ===============================
   HASH PASSWORD
=============================== */

const hashedPassword = await bcrypt.hash(

    password,

    10

);


/* ===============================
   INSERT USER
=============================== */

const insertQuery = `

    INSERT INTO users

    (

        name,

        email,

        phone,

        role,

        password

    )

    VALUES (?, ?, ?, ?, ?)

`;


db.query(

    insertQuery,

    [

        name,

        email,

        phone,

        role,

        hashedPassword

    ],

    (err, result) => {

        if (err) {

            return res.status(500).json({

                success: false,

                message: err.message

            });

        }

       /* ===============================
   REGISTRATION SUCCESS
=============================== */

        return res.status(201).json({

            success: true,

            message: "Registration Successful!",

            user: {

                id: result.insertId,

                name,

                email,

                phone,

                role

            }

        });

    }

);


            }

        );

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

});
/* =====================================================
   LOGIN API
===================================================== */

app.post("/api/auth/login", (req, res) => {

    const {

        email,

        password

    } = req.body;


    /* ===============================
       VALIDATION
    =============================== */

    if (

        !email ||

        !password

    ) {

        return res.status(400).json({

            success: false,

            message: "Email and Password are required."

        });

    }


    /* ===============================
       FIND USER
    =============================== */

    const query =

        "SELECT * FROM users WHERE email = ?";


    db.query(

        query,

        [email],

        async (err, result) => {

            if (err) {

                return res.status(500).json({

                    success: false,

                    message: err.message

                });

            }

            if (result.length === 0) {

                return res.status(404).json({

                    success: false,

                    message: "User not found."

                });

            }

            const user = result[0];

            /* ===============================
   VERIFY PASSWORD
=============================== */

const isMatch = await bcrypt.compare(

    password,

    user.password

);


if (!isMatch) {

    return res.status(401).json({

        success: false,

        message: "Invalid Email or Password."

    });

}
/* ===============================
   LOGIN SUCCESS
=============================== */

return res.status(200).json({

    success: true,

    message: "Login Successful!",

    user: {

        id: user.id,

        name: user.name,

        email: user.email,

        phone: user.phone,

        role: user.role

    }

});

        }

    );

});
/* ==================== ADD PRODUCT API ==================== */

app.post("/api/products",(req,res)=>{

    const{
        farmer_id,
        name,
        category,
        price,
        unit,
        stock,
        description,
        image
    }=req.body;

    if(!farmer_id || !name || !category || !price || !unit || stock==null){
        return res.status(400).json({
            success:false,
            message:"Please fill all required fields."
        });
    }

    const sql=`INSERT INTO products
    (farmer_id,name,category,price,unit,stock,description,image)
    VALUES(?,?,?,?,?,?,?,?)`;

    db.query(sql,
    [farmer_id,name,category,price,unit,stock,description,image],
    (err,result)=>{

        if(err){
            return res.status(500).json({
                success:false,
                message:err.message
            });
        }

        res.json({
            success:true,
            message:"Product Added Successfully!",
            productId:result.insertId
        });

    });

});
/* ==================== GET ALL PRODUCTS ==================== */

app.get("/api/products",(req,res)=>{

    const sql=`SELECT
        products.*,
        users.name AS farmer_name
        FROM products
        JOIN users
        ON products.farmer_id=users.id
        ORDER BY products.created_at DESC`;

    db.query(sql,(err,result)=>{

        if(err){

            return res.status(500).json({
                success:false,
                message:err.message
            });

        }

        res.json({
            success:true,
            products:result
        });

    });

});
/* ==================== UPDATE PRODUCT API ==================== */

app.put("/api/products/:id",(req,res)=>{

    const{id}=req.params;

    const{
        name,
        category,
        price,
        unit,
        stock,
        description,
        image
    }=req.body;

    const sql=`UPDATE products
    SET
    name=?,
    category=?,
    price=?,
    unit=?,
    stock=?,
    description=?,
    image=?
    WHERE id=?`;

    db.query(
        sql,
        [name,category,price,unit,stock,description,image,id],
        (err,result)=>{

            if(err){
                return res.status(500).json({
                    success:false,
                    message:err.message
                });
            }

            if(result.affectedRows===0){
                return res.status(404).json({
                    success:false,
                    message:"Product not found."
                });
            }

            res.json({
                success:true,
                message:"Product Updated Successfully!"
            });

        }
    );

});
/* ==================== DELETE PRODUCT API ==================== */

app.delete("/api/products/:id",(req,res)=>{

    const{id}=req.params;

    const sql="DELETE FROM products WHERE id=?";

    db.query(sql,[id],(err,result)=>{

        if(err){
            return res.status(500).json({
                success:false,
                message:err.message
            });
        }

        if(result.affectedRows===0){
            return res.status(404).json({
                success:false,
                message:"Product not found."
            });
        }

        res.json({
            success:true,
            message:"Product Deleted Successfully!"
        });

    });

});
/* ==================== PLACE ORDER API ==================== */

app.post("/api/orders",(req,res)=>{

    const{
        product_id,
        customer_id,
        quantity,
        total_price
    }=req.body;

    if(!product_id||!customer_id||!quantity||!total_price){
        return res.status(400).json({
            success:false,
            message:"Please fill all required fields."
        });
    }

    const checkSql="SELECT stock FROM products WHERE id=?";

    db.query(checkSql,[product_id],(err,result)=>{

        if(err){
            return res.status(500).json({
                success:false,
                message:err.message
            });
        }

        if(result.length===0){
            return res.status(404).json({
                success:false,
                message:"Product not found."
            });
        }

        const availableStock=result[0].stock;

        if(quantity>availableStock){
            return res.status(400).json({
                success:false,
                message:`Only ${availableStock} item(s) available in stock.`
            });
        }

        const orderSql=`INSERT INTO orders
        (product_id,customer_id,quantity,total_price)
        VALUES(?,?,?,?)`;

        db.query(
            orderSql,
            [product_id,customer_id,quantity,total_price],
            (err,orderResult)=>{

                if(err){
                    return res.status(500).json({
                        success:false,
                        message:err.message
                    });
                }

                const updateStockSql=
                "UPDATE products SET stock=stock-? WHERE id=?";

                db.query(
                    updateStockSql,
                    [quantity,product_id],
                    (err)=>{

                        if(err){
                            return res.status(500).json({
                                success:false,
                                message:err.message
                            });
                        }

                        res.json({
                            success:true,
                            message:"Order Placed Successfully!",
                            orderId:orderResult.insertId
                        });

                    }
                );

            }
        );

    });

});
/* ==================== GET ORDERS API ==================== */

app.get("/api/orders",(req,res)=>{

    const sql=`
    SELECT
        orders.id,
        orders.customer_id,
        orders.product_id,
        customer.name AS customer,
        products.farmer_id,
        farmer.name AS farmer,
        products.name AS product,
        products.unit,
        orders.quantity,
        orders.total_price,
        orders.status,
        orders.created_at
    FROM orders
    JOIN users AS customer
        ON orders.customer_id=customer.id
    JOIN products
        ON orders.product_id=products.id
    JOIN users AS farmer
        ON products.farmer_id=farmer.id
    ORDER BY orders.created_at DESC
    `;

    db.query(sql,(err,result)=>{

        if(err){
            return res.status(500).json({
                success:false,
                message:err.message
            });
        }

        res.json({
            success:true,
            orders:result
        });

    });

});
/* ==================== UPDATE ORDER STATUS API ==================== */

app.put("/api/orders/:id",(req,res)=>{

    const {status}=req.body;
    const {id}=req.params;

    if(!status){
        return res.status(400).json({
            success:false,
            message:"Order status is required."
        });
    }

    const sql="UPDATE orders SET status=? WHERE id=?";

    db.query(sql,[status,id],(err,result)=>{

        if(err){
            return res.status(500).json({
                success:false,
                message:err.message
            });
        }

        if(result.affectedRows===0){
            return res.status(404).json({
                success:false,
                message:"Order not found."
            });
        }

        res.json({
            success:true,
            message:"Order status updated successfully."
        });

    });

});
/* ==================== DELETE ORDER API ==================== */

app.delete("/api/orders/:id",(req,res)=>{

    const {id}=req.params;

    const sql="DELETE FROM orders WHERE id=?";

    db.query(sql,[id],(err,result)=>{

        if(err){
            return res.status(500).json({
                success:false,
                message:err.message
            });
        }

        if(result.affectedRows===0){
            return res.status(404).json({
                success:false,
                message:"Order not found."
            });
        }

        res.json({
            success:true,
            message:"Order deleted successfully."
        });

    });

});
/* ==================== DASHBOARD STATS API ==================== */

app.get("/api/dashboard/stats",(req,res)=>{

    const sql=`
    SELECT
        (SELECT COUNT(*) FROM products) AS totalProducts,
        (SELECT COUNT(*) FROM orders) AS totalOrders,
        (SELECT COUNT(*) FROM users WHERE role='Farmer') AS totalFarmers,
        (SELECT COUNT(*) FROM users WHERE role='Customer') AS totalCustomers,
        (SELECT IFNULL(SUM(total_price),0) FROM orders) AS totalRevenue
    `;

    db.query(sql,(err,result)=>{

        if(err){
            return res.status(500).json({
                success:false,
                message:err.message
            });
        }

        res.json({
            success:true,
            stats:result[0]
        });

    });

});
/* ==================== RECENT ORDERS API ==================== */

app.get("/api/dashboard/recent-orders",(req,res)=>{

    const sql=`
    SELECT
        orders.id,
        users.name AS customer,
        products.name AS product,
        orders.status
    FROM orders
    JOIN users
        ON orders.customer_id=users.id
    JOIN products
        ON orders.product_id=products.id
    ORDER BY orders.created_at DESC
    LIMIT 5
    `;

    db.query(sql,(err,result)=>{

        if(err){
            return res.status(500).json({
                success:false,
                message:err.message
            });
        }

        res.json({
            success:true,
            orders:result
        });

    });

});
/* ==================== GET CUSTOMERS API ==================== */

app.get("/api/customers",(req,res)=>{

    const sql=`
    SELECT
        users.id,
        users.name,
        users.email,
        users.phone,
        COUNT(orders.id) AS total_orders,
        IFNULL(SUM(orders.total_price),0) AS total_spent
    FROM users
    LEFT JOIN orders
        ON users.id=orders.customer_id
    WHERE users.role='Customer'
    GROUP BY users.id
    ORDER BY users.name ASC
    `;

    db.query(sql,(err,result)=>{

        if(err){
            return res.status(500).json({
                success:false,
                message:err.message
            });
        }

        res.json({
            success:true,
            customers:result
        });

    });

});
/* ==================== ANALYTICS API ==================== */

app.get("/api/analytics",(req,res)=>{

    const analytics={};

    db.query(
    "SELECT COUNT(*) totalProducts FROM products",
    (err,result)=>{

        if(err) return res.status(500).json({success:false,message:err.message});

        analytics.totalProducts=result[0].totalProducts;

        db.query(
        "SELECT COUNT(*) totalOrders,IFNULL(SUM(total_price),0) totalRevenue FROM orders",
        (err,result)=>{

            if(err) return res.status(500).json({success:false,message:err.message});

            analytics.totalOrders=result[0].totalOrders;
            analytics.totalRevenue=result[0].totalRevenue;

            db.query(
            "SELECT COUNT(*) totalCustomers FROM users WHERE role='Customer'",
            (err,result)=>{

                if(err) return res.status(500).json({success:false,message:err.message});

                analytics.totalCustomers=result[0].totalCustomers;

                db.query(
                `SELECT products.name,SUM(orders.quantity) totalSold
                 FROM orders
                 JOIN products ON orders.product_id=products.id
                 GROUP BY products.id
                 ORDER BY totalSold DESC
                 LIMIT 1`,
                (err,best)=>{

                    if(err) return res.status(500).json({success:false,message:err.message});

                    analytics.bestProduct=best.length?best[0]:null;

                    db.query(
                    `SELECT name,stock,unit
                     FROM products
                     ORDER BY stock ASC
                     LIMIT 1`,
                    (err,low)=>{

                        if(err) return res.status(500).json({success:false,message:err.message});

                        analytics.lowStock=low.length?low[0]:null;

                        db.query(
                        `SELECT category,COUNT(*) total
                         FROM products
                         GROUP BY category`,
                        (err,categories)=>{

                            if(err) return res.status(500).json({success:false,message:err.message});

                            analytics.categories=categories;

                            db.query(
                            `SELECT
                                orders.id,
                                users.name customer,
                                products.name product,
                                orders.quantity,
                                orders.total_price,
                                orders.status,
                                orders.created_at
                             FROM orders
                             JOIN users ON orders.customer_id=users.id
                             JOIN products ON orders.product_id=products.id
                             ORDER BY orders.created_at DESC
                             LIMIT 5`,
                            (err,recent)=>{

                                if(err) return res.status(500).json({success:false,message:err.message});

                                analytics.recentOrders=recent;

                                res.json({
                                    success:true,
                                    analytics
                                });

                            });

                        });

                    });

                });

            });

        });

    });

});
/* ==================== REPORTS API ==================== */

app.get("/api/reports",(req,res)=>{

    const reports={};

    db.query(
    "SELECT COUNT(*) totalProducts FROM products",
    (err,result)=>{

        if(err) return res.status(500).json({
            success:false,
            message:err.message
        });

        reports.totalProducts=result[0].totalProducts;

        db.query(
        "SELECT COUNT(*) totalOrders, IFNULL(SUM(total_price),0) totalRevenue FROM orders",
        (err,result)=>{

            if(err) return res.status(500).json({
                success:false,
                message:err.message
            });

            reports.totalOrders=result[0].totalOrders;
            reports.totalRevenue=result[0].totalRevenue;

            db.query(
            "SELECT COUNT(*) totalCustomers FROM users WHERE role='Customer'",
            (err,result)=>{

                if(err) return res.status(500).json({
                    success:false,
                    message:err.message
                });

                reports.totalCustomers=result[0].totalCustomers;

                db.query(
                `SELECT
                    orders.id,
                    users.name customer,
                    products.name product,
                    orders.quantity,
                    orders.total_price,
                    orders.status,
                    orders.created_at
                 FROM orders
                 JOIN users ON orders.customer_id=users.id
                 JOIN products ON orders.product_id=products.id
                 ORDER BY orders.created_at DESC`,
                (err,orders)=>{

                    if(err) return res.status(500).json({
                        success:false,
                        message:err.message
                    });

                    reports.orders=orders;

                    res.json({
                        success:true,
                        reports
                    });

                });

            });

        });

    });

});
/* ==================== GET SETTINGS ==================== */

app.get("/api/settings/:id", (req, res) => {

    const userId = req.params.id;

    const sql = `
        SELECT
            id,
            name,
            email,
            phone,
            role
        FROM users
        WHERE id = ?
    `;

    db.query(sql, [userId], (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.json({
            success: true,
            user: result[0]
        });

    });

});
/* ==================== UPDATE SETTINGS ==================== */

app.put("/api/settings/:id", (req, res) => {

    const userId = req.params.id;

    const {

        name,
        phone

    } = req.body;

    const sql = `
        UPDATE users
        SET
            name = ?,
            phone = ?
        WHERE id = ?
    `;

    db.query(

        sql,

        [

            name,
            phone,
            userId

        ],

        (err) => {

            if (err) {

                return res.status(500).json({

                    success: false,
                    message: err.message

                });

            }

            res.json({

                success: true,
                message: "Profile updated successfully."

            });

        }

    );

});
/* ==================== CHANGE PASSWORD ==================== */

app.put("/api/settings/change-password/:id", (req, res) => {

    const userId = req.params.id;

    const {

        currentPassword,
        newPassword

    } = req.body;

    const checkSql = `
        SELECT password
        FROM users
        WHERE id = ?
    `;

    db.query(checkSql, [userId], (err, result) => {

        if (err) {

            return res.status(500).json({

                success: false,
                message: err.message

            });

        }

        if (result.length === 0) {

            return res.status(404).json({

                success: false,
                message: "User not found"

            });

        }

        if (result[0].password !== currentPassword) {

            return res.status(400).json({

                success: false,
                message: "Current password is incorrect."

            });

        }

        const updateSql = `
            UPDATE users
            SET password = ?
            WHERE id = ?
        `;

        db.query(

            updateSql,

            [

                newPassword,
                userId

            ],

            (err) => {

                if (err) {

                    return res.status(500).json({

                        success: false,
                        message: err.message

                    });
                }

                res.json({

                    success: true,
                    message: "Password updated successfully."

                });

            }

        );

    });

});
/* =====================================================
   SERVER
===================================================== */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`✅ Server running on http://localhost:${PORT}`);

});