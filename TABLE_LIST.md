# 🗄️ Database Table List
## Farmer to Consumer Direct Selling System

> Complete list of all database tables, columns, data types, constraints, and descriptions.

---

## 📋 Table Summary

| # | Table Name     | Description                                      | Primary Key   |
|---|----------------|--------------------------------------------------|---------------|
| 1 | `farmers`      | Stores farmer registration & profile data        | `farmer_id`   |
| 2 | `consumers`    | Stores consumer registration & profile data      | `consumer_id` |
| 3 | `products`     | Stores products listed by farmers                | `product_id`  |
| 4 | `orders`       | Stores orders placed by consumers                | `order_id`    |
| 5 | `order_items`  | Stores individual items within each order        | `item_id`     |
| 6 | `categories`   | Stores product categories                        | `category_id` |

---

## 1️⃣ Table: `farmers`

Stores all registered farmer information.

| Column         | Data Type      | Constraints                  | Description                        |
|----------------|----------------|------------------------------|------------------------------------|
| `farmer_id`    | INT            | PRIMARY KEY, AUTO_INCREMENT  | Unique farmer identifier           |
| `full_name`    | VARCHAR(100)   | NOT NULL                     | Farmer's full name                 |
| `email`        | VARCHAR(100)   | NOT NULL, UNIQUE             | Farmer's email address             |
| `password`     | VARCHAR(255)   | NOT NULL                     | Hashed password                    |
| `phone`        | VARCHAR(15)    | NOT NULL                     | Contact phone number               |
| `address`      | TEXT           | NOT NULL                     | Farm / home address                |
| `farm_name`    | VARCHAR(150)   | NULL                         | Name of the farm (optional)        |
| `profile_pic`  | VARCHAR(255)   | NULL                         | Profile picture filename           |
| `created_at`   | TIMESTAMP      | DEFAULT CURRENT_TIMESTAMP    | Registration date & time           |
| `updated_at`   | TIMESTAMP      | DEFAULT CURRENT_TIMESTAMP    | Last profile update                |

---

## 2️⃣ Table: `consumers`

Stores all registered consumer information.

| Column         | Data Type      | Constraints                  | Description                        |
|----------------|----------------|------------------------------|------------------------------------|
| `consumer_id`  | INT            | PRIMARY KEY, AUTO_INCREMENT  | Unique consumer identifier         |
| `full_name`    | VARCHAR(100)   | NOT NULL                     | Consumer's full name               |
| `email`        | VARCHAR(100)   | NOT NULL, UNIQUE             | Consumer's email address           |
| `password`     | VARCHAR(255)   | NOT NULL                     | Hashed password                    |
| `phone`        | VARCHAR(15)    | NOT NULL                     | Contact phone number               |
| `address`      | TEXT           | NOT NULL                     | Delivery address                   |
| `profile_pic`  | VARCHAR(255)   | NULL                         | Profile picture filename           |
| `created_at`   | TIMESTAMP      | DEFAULT CURRENT_TIMESTAMP    | Registration date & time           |
| `updated_at`   | TIMESTAMP      | DEFAULT CURRENT_TIMESTAMP    | Last profile update                |

---

## 3️⃣ Table: `categories`

Stores product categories for classifying products.

| Column          | Data Type     | Constraints                  | Description                        |
|-----------------|---------------|------------------------------|------------------------------------|
| `category_id`   | INT           | PRIMARY KEY, AUTO_INCREMENT  | Unique category identifier         |
| `category_name` | VARCHAR(100)  | NOT NULL, UNIQUE             | Category name (e.g., Vegetables)   |
| `description`   | TEXT          | NULL                         | Brief description of the category  |
| `created_at`    | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP    | Creation date                      |

**Sample Categories:**
- Vegetables
- Fruits
- Grains & Cereals
- Dairy Products
- Herbs & Spices

---

## 4️⃣ Table: `products`

Stores all products listed by farmers.

| Column          | Data Type      | Constraints                      | Description                          |
|-----------------|----------------|----------------------------------|--------------------------------------|
| `product_id`    | INT            | PRIMARY KEY, AUTO_INCREMENT      | Unique product identifier            |
| `farmer_id`     | INT            | NOT NULL, FOREIGN KEY → farmers  | Farmer who listed this product       |
| `category_id`   | INT            | NOT NULL, FOREIGN KEY → categories | Product category                   |
| `product_name`  | VARCHAR(150)   | NOT NULL                         | Name of the product                  |
| `description`   | TEXT           | NULL                             | Product description                  |
| `price`         | DECIMAL(10,2)  | NOT NULL                         | Price per unit (in ₹ or $)           |
| `quantity`      | INT            | NOT NULL, DEFAULT 0              | Available stock quantity             |
| `unit`          | VARCHAR(30)    | NOT NULL                         | Unit of measure (kg, litre, piece)   |
| `image`         | VARCHAR(255)   | NULL                             | Product image filename               |
| `status`        | ENUM           | DEFAULT 'available'              | available / out_of_stock / removed   |
| `created_at`    | TIMESTAMP      | DEFAULT CURRENT_TIMESTAMP        | Date product was listed              |
| `updated_at`    | TIMESTAMP      | DEFAULT CURRENT_TIMESTAMP        | Last updated                         |

---

## 5️⃣ Table: `orders`

Stores orders placed by consumers.

| Column            | Data Type      | Constraints                        | Description                          |
|-------------------|----------------|------------------------------------|--------------------------------------|
| `order_id`        | INT            | PRIMARY KEY, AUTO_INCREMENT        | Unique order identifier              |
| `consumer_id`     | INT            | NOT NULL, FOREIGN KEY → consumers  | Consumer who placed the order        |
| `total_amount`    | DECIMAL(10,2)  | NOT NULL                           | Total order value                    |
| `delivery_address`| TEXT           | NOT NULL                           | Delivery address for the order       |
| `order_status`    | ENUM           | DEFAULT 'pending'                  | pending / confirmed / delivered / cancelled |
| `payment_status`  | ENUM           | DEFAULT 'unpaid'                   | unpaid / paid                        |
| `order_date`      | TIMESTAMP      | DEFAULT CURRENT_TIMESTAMP          | Date & time order was placed         |
| `updated_at`      | TIMESTAMP      | DEFAULT CURRENT_TIMESTAMP          | Last status update                   |

---

## 6️⃣ Table: `order_items`

Stores each product line within an order (supports multiple products per order).

| Column          | Data Type      | Constraints                        | Description                          |
|-----------------|----------------|------------------------------------|--------------------------------------|
| `item_id`       | INT            | PRIMARY KEY, AUTO_INCREMENT        | Unique item identifier               |
| `order_id`      | INT            | NOT NULL, FOREIGN KEY → orders     | Associated order                     |
| `product_id`    | INT            | NOT NULL, FOREIGN KEY → products   | Product ordered                      |
| `farmer_id`     | INT            | NOT NULL, FOREIGN KEY → farmers    | Farmer who owns this product         |
| `quantity`      | INT            | NOT NULL                           | Quantity ordered                     |
| `unit_price`    | DECIMAL(10,2)  | NOT NULL                           | Price at time of order               |
| `subtotal`      | DECIMAL(10,2)  | NOT NULL                           | quantity × unit_price                |

---

## 🔗 Relationships Summary

| Relationship                         | Type       | Description                                     |
|--------------------------------------|------------|-------------------------------------------------|
| `farmers` → `products`               | One-to-Many| One farmer can list many products               |
| `categories` → `products`            | One-to-Many| One category can have many products             |
| `consumers` → `orders`               | One-to-Many| One consumer can place many orders              |
| `orders` → `order_items`             | One-to-Many| One order can have many items                   |
| `products` → `order_items`           | One-to-Many| One product can appear in many order items      |
| `farmers` → `order_items`            | One-to-Many| One farmer can have many order items            |

---

## 📊 Table Statistics

| Table          | Estimated Rows (Initial) | Critical Indexes                    |
|----------------|--------------------------|-------------------------------------|
| `farmers`      | Small (10–100)           | `email`                             |
| `consumers`    | Medium (100–1000)        | `email`                             |
| `categories`   | Very Small (5–20)        | `category_name`                     |
| `products`     | Medium (50–500)          | `farmer_id`, `category_id`          |
| `orders`       | Large (grows over time)  | `consumer_id`, `order_status`       |
| `order_items`  | Very Large               | `order_id`, `product_id`            |

---

*Last Updated: 2026 | Farmer to Consumer Direct Selling System — Academic Project*
