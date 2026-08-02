/* =====================================================
   FARM2HOME DATABASE
===================================================== */

CREATE DATABASE IF NOT EXISTS farm2home;

USE farm2home;


/* =====================================================
   USERS TABLE
===================================================== */

CREATE TABLE IF NOT EXISTS users (

    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    email VARCHAR(100) NOT NULL UNIQUE,

    phone VARCHAR(15) NOT NULL,

    role ENUM('Farmer','Customer') NOT NULL,

    password VARCHAR(255) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);
/* =====================================================
   PRODUCTS TABLE
===================================================== */

CREATE TABLE IF NOT EXISTS products (

    id INT AUTO_INCREMENT PRIMARY KEY,

    farmer_id INT NOT NULL,

    name VARCHAR(100) NOT NULL,

    category VARCHAR(50) NOT NULL,

    price DECIMAL(10,2) NOT NULL,

    unit VARCHAR(20) NOT NULL,

    stock INT NOT NULL DEFAULT 0,

    description TEXT,

    image VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_products_farmer
        FOREIGN KEY (farmer_id)
        REFERENCES users(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE

);
/* =====================================================
   ORDERS TABLE
===================================================== */

CREATE TABLE IF NOT EXISTS orders (

    id INT AUTO_INCREMENT PRIMARY KEY,

    customer_id INT NOT NULL,

    product_id INT NOT NULL,

    quantity INT NOT NULL,

    total DECIMAL(10,2) NOT NULL,

    status ENUM(
        'Pending',
        'Processing',
        'Delivered',
        'Cancelled'
    ) DEFAULT 'Pending',

    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_orders_customer
        FOREIGN KEY (customer_id)
        REFERENCES users(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_orders_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE

);