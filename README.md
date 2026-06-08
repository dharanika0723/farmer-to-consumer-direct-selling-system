# 🌾 Farmer to Consumer Direct Selling System

> **Connecting Farmers Directly with Consumers — Eliminating Middlemen, Empowering Communities**

![Platform](https://img.shields.io/badge/Platform-Web-green?style=flat-square)
![Backend](https://img.shields.io/badge/Backend-PHP-blue?style=flat-square)
![Database](https://img.shields.io/badge/Database-MySQL-orange?style=flat-square)
![Frontend](https://img.shields.io/badge/Frontend-HTML%20%7C%20CSS%20%7C%20JavaScript-yellow?style=flat-square)
![Status](https://img.shields.io/badge/Status-Academic%20Project-purple?style=flat-square)

---

## 📖 Project Overview

The **Farmer to Consumer Direct Selling System** is a web-based platform that bridges the gap between farmers and consumers. By removing intermediaries from the agricultural supply chain, farmers can sell their products at fair prices while consumers gain direct access to fresh, quality agricultural produce.

This system promotes **transparency**, **fair pricing**, and **affordability** — benefiting both farmers and consumers alike.

---

## 🎯 Purpose

- 🔗 Connect farmers and consumers **directly**
- 🚫 Eliminate middlemen from the agricultural supply chain
- 💰 Ensure **fair prices** for farmers
- 🥦 Provide **fresh and quality products** to consumers
- 🔍 Improve **transparency** in agricultural product sales

---

## 👥 Target Users

### 🧑‍🌾 Farmer
| Feature | Description |
|--------|-------------|
| Register & Login | Secure farmer authentication |
| Add Products | List agricultural products for sale |
| View Products | Manage their product listings |
| View Orders | Track orders placed by consumers |

### 🛒 Consumer
| Feature | Description |
|--------|-------------|
| Register & Login | Secure consumer authentication |
| View Products | Browse available agricultural products |
| Place Orders | Order directly from farmers |
| View Orders | Track their order history |

---

## ✨ Key Features

### 🧑‍🌾 Farmer Module
- Farmer Registration & Login
- Add, View, and Manage Products
- View and Track Incoming Orders

### 🛒 Consumer Module
- Consumer Registration & Login
- Browse All Available Products
- Place and View Orders

### 📦 Product Management
- Product Name, Category, Price, and Quantity management

### 📋 Order Management
- Place Orders
- View Order Details
- Order Tracking

---

## 🛠️ Technologies Used

| Layer | Technology |
|-------|-----------|
| 🎨 UI/UX Design | Figma |
| 🌐 Frontend | HTML5, CSS3, JavaScript |
| ⚙️ Backend | PHP |
| 🗄️ Database | MySQL |

---

## 📂 Project Modules

```
Farmer to Consumer Direct Selling System
├── 1. User Authentication Module
├── 2. Farmer Management Module
├── 3. Consumer Management Module
├── 4. Product Management Module
└── 5. Order Management Module
```

---

## 🗄️ Database Tables

| Table | Description |
|-------|-------------|
| `farmers` | Stores farmer registration and profile data |
| `consumers` | Stores consumer registration and profile data |
| `products` | Stores product listings added by farmers |
| `orders` | Stores orders placed by consumers |

---

## 🔄 System Workflow

```
1. Farmer registers and logs in
        ↓
2. Farmer adds agricultural products
        ↓
3. Consumer registers and logs in
        ↓
4. Consumer views available products
        ↓
5. Consumer places an order
        ↓
6. Farmer views received orders
        ↓
7. Order is processed and delivered
```

---

## 🚀 Advantages

✅ **Direct Farmer-to-Consumer Connection**  
✅ **Better Income for Farmers**  
✅ **Affordable Prices for Consumers**  
✅ **Transparency and Trust**  
✅ **Fresh and Quality Products**  
✅ **Easy Product Management**  
✅ **Simple Order Tracking**  

---

## 📌 Future Enhancements

- 💳 Online Payment Gateway Integration
- ⭐ Product Reviews and Ratings
- 🚚 Real-time Delivery Tracking
- 📱 Mobile Application Support
- 🤖 AI-Based Product Recommendations

---

## 🗂️ Project Structure

```
farmer-to-consumer/
├── index.php               # Landing page
├── farmer/
│   ├── register.php        # Farmer registration
│   ├── login.php           # Farmer login
│   ├── add_product.php     # Add product
│   ├── view_products.php   # View products
│   └── view_orders.php     # View orders
├── consumer/
│   ├── register.php        # Consumer registration
│   ├── login.php           # Consumer login
│   ├── products.php        # Browse products
│   ├── place_order.php     # Place order
│   └── view_orders.php     # View order history
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
└── database/
    └── schema.sql          # Database schema
```

---

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/farmer-to-consumer.git
   cd farmer-to-consumer
   ```

2. **Set up the database**
   - Open **phpMyAdmin** or your MySQL client
   - Create a new database: `farmer_consumer_db`
   - Import `database/schema.sql`

3. **Configure database connection**
   - Open `config/db.php`
   - Update with your database credentials:
     ```php
     $host = "localhost";
     $user = "root";
     $password = "";
     $database = "farmer_consumer_db";
     ```

4. **Run the project**
   - Place the project folder inside `htdocs` (XAMPP) or `www` (WAMP)
   - Start **Apache** and **MySQL** from your control panel
   - Open your browser: `http://localhost/farmer-to-consumer`

---

## 👨‍💻 Developer Info

| Field | Details |
|-------|---------|
| Project Type | Academic Mini Project / Final Year Project |
| Project Title | Farmer to Consumer Direct Selling System |
| Domain | Agriculture / E-Commerce |

---

## 📄 License

This project is developed for **academic purposes**.  
Feel free to use it as a reference for your own learning and projects.

---

<p align="center">
  Made with ❤️ for Farmers & Consumers
</p>
