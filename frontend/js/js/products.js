/* ===============================
   PRODUCTS PAGE
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
   PLACE ORDER ELEMENTS
================================== */

const orderModal = document.getElementById("orderModal");

const closeOrderModal = document.getElementById("closeOrderModal");

const orderForm = document.getElementById("orderForm");

const customerNameInput = document.getElementById("customerName");

const productInput = document.getElementById("orderProduct");

const priceInput = document.getElementById("orderPrice");

const stockInput = document.getElementById("availableStock");

const quantityInput = document.getElementById("orderQuantity");

const totalInput = document.getElementById("orderTotal");

let selectedProduct = null;

/* ===============================
   GET HTML ELEMENTS
================================== */

const productContainer = document.getElementById("productContainer");

const searchProduct = document.getElementById("searchProduct");

const categoryFilter = document.getElementById("categoryFilter");

const addProductBtn = document.getElementById("addProductBtn");

const productModal = document.getElementById("productModal");

const closeModal = document.getElementById("closeModal");

const productForm = document.getElementById("productForm");


/* ===============================
   DEFAULT PRODUCTS
================================== */

const defaultProducts = [

{
    id:1,
    name:"Carrot",
    category:"Vegetables",
    price:40,
    stock:100,
    unit:"kg",
    description:"Fresh organic carrots directly from local farmers.",
    image:"images/carrot.jpg"
},

{
    id:2,
    name:"Tomato",
    category:"Vegetables",
    price:30,
    stock:150,
    unit:"kg",
    description:"Juicy red tomatoes freshly harvested.",
    image:"images/tomato.jpeg"
},

{
    id:3,
    name:"Potato",
    category:"Vegetables",
    price:35,
    stock:200,
    unit:"kg",
    description:"Premium quality potatoes.",
    image:"images/Potato.jpg"
},

{
    id:4,
    name:"Onion",
    category:"Vegetables",
    price:45,
    stock:180,
    unit:"kg",
    description:"Fresh onions from local farms.",
    image:"images/Onion.jpg"
},

{
    id:5,
    name:"Cabbage",
    category:"Vegetables",
    price:30,
    stock:80,
    unit:"kg",
    description:"Healthy green cabbage.",
    image:"images/cabbage.jpg"
},

{
    id:6,
    name:"Brinjal",
    category:"Vegetables",
    price:50,
    stock:70,
    unit:"kg",
    description:"Fresh purple brinjals.",
    image:"images/brinjal.jpg"
},

{
    id:7,
    name:"Beans",
    category:"Vegetables",
    price:45,
    stock:90,
    unit:"kg",
    description:"Fresh green beans.",
    image:"images/beans.jpg"
},

{
    id:8,
    name:"Capsicum",
    category:"Vegetables",
    price:60,
    stock:70,
    unit:"kg",
    description:"Fresh red capsicum.",
    image:"images/capsicum.jpg"
},

{
    id:9,
    name:"Cauliflower",
    category:"Vegetables",
    price:50,
    stock:75,
    unit:"kg",
    description:"Fresh cauliflower.",
    image:"images/cauliflower.jpg"
},

{
    id:10,
    name:"Okra",
    category:"Vegetables",
    price:55,
    stock:100,
    unit:"kg",
    description:"Farm fresh okra.",
    image:"images/okra.jpg"
},

{
    id:11,
    name:"Apple",
    category:"Fruits",
    price:120,
    stock:90,
    unit:"kg",
    description:"Fresh red apples.",
    image:"images/apple.jpg"
},

{
    id:12,
    name:"Banana",
    category:"Fruits",
    price:60,
    stock:150,
    unit:"dozen",
    description:"Naturally ripened bananas.",
    image:"images/banana.jpg"
},

{
    id:13,
    name:"Mango",
    category:"Fruits",
    price:150,
    stock:80,
    unit:"kg",
    description:"Sweet seasonal mangoes.",
    image:"images/mango.jpg"
},

{
    id:14,
    name:"Orange",
    category:"Fruits",
    price:90,
    stock:85,
    unit:"kg",
    description:"Juicy oranges rich in Vitamin C.",
    image:"images/orange.jpg"
},

{
    id:15,
    name:"Papaya",
    category:"Fruits",
    price:70,
    stock:60,
    unit:"kg",
    description:"Naturally sweet papayas.",
    image:"images/papaya.jpg"
},

{
    id:16,
    name:"Milk",
    category:"Dairy",
    price:60,
    stock:100,
    unit:"litre",
    description:"Pure fresh cow milk.",
    image:"images/milk.jpg"
},

{
    id:17,
    name:"Paneer",
    category:"Dairy",
    price:180,
    stock:50,
    unit:"kg",
    description:"Fresh homemade paneer.",
    image:"images/paneer.jpg"
},

{
    id:18,
    name:"Rice",
    category:"Grains",
    price:70,
    stock:500,
    unit:"kg",
    description:"Premium quality rice.",
    image:"images/rice.jpg"
},

{
    id:19,
    name:"Wheat",
    category:"Grains",
    price:55,
    stock:400,
    unit:"kg",
    description:"Organic wheat grains.",
    image:"images/wheat.jpg"
}

];
/* ===============================
   PRODUCTS ARRAY
================================== */
let products = [];

/* ===============================
   LOAD PRODUCTS FROM DATABASE
================================== */

async function loadProducts(){

    try{

        const response=await fetch("http://localhost:5000/api/products");

        const data=await response.json();

        if(data.success){

            products=data.products;

            loadProducts();

        }else{

            alert(data.message);

        }

    }catch(error){

        console.error(error);

        alert("Unable to load products.");

    }

}
/* ===============================
   DISPLAY PRODUCTS
================================== */

function displayProducts(productList = products) {

    productContainer.innerHTML = "";

    if (productList.length === 0) {

        productContainer.innerHTML = `
            <div class="no-products">
                <h2>No Products Found</h2>
                <p>Try another search or category.</p>
            </div>
        `;

        return;

    }

    productList.forEach(product => {

        productContainer.innerHTML += `

        <div class="product-card">

            <img src="${product.image}" alt="${product.name}">

            <div class="product-info">

                <h3>${product.name}</h3>

                <span class="category">

                    ${product.category}

                </span>

                <div class="price">

                    ₹${product.price} / ${product.unit}

                </div>

                <div class="stock">

                      <strong>📦 Stock :</strong>

                      ${product.stock} ${product.unit}

                </div>

                <div class="availability">

                    ${
                         product.stock > 10

                         ? `<span class="in-stock">🟢 In Stock</span>`

                        : product.stock > 0

                         ? `<span class="low-stock">🟡 Low Stock</span>`

                        : `<span class="out-stock">🔴 Out of Stock</span>`
                    }

                </div>

                <p class="description">

                    ${product.description}

                </p>

                <div class="product-actions">

    ${
        userRole === "Farmer"
        ? `

        <button class="edit-btn"
            onclick="editProduct(${product.id})">

            <i class="fa-solid fa-pen-to-square"></i>

            Edit

        </button>

        <button class="delete-btn"
            onclick="deleteProduct(${product.id})">

            <i class="fa-solid fa-trash"></i>

            Delete

        </button>

        `

        : `

        ${
    product.stock > 0

    ? `

    <button class="buy-btn"
        onclick="openOrderPopup(${product.id})">

        <i class="fa-solid fa-cart-shopping"></i>

        Buy Now

    </button>

    `

    : `

    <button class="buy-btn out-stock-btn" disabled>

        <i class="fa-solid fa-ban"></i>

        Out of Stock

    </button>

    `
}

        `
    }

</div>

            </div>

        </div>

        `;

    });

}
/* ===============================
   OPEN ORDER POPUP
================================== */

function openOrderPopup(productId){

    selectedProduct = products.find(product => product.id === productId);

    if(!selectedProduct) return;

    customerNameInput.value = loggedInUser?.name || "";

    productInput.value = selectedProduct.name;

    priceInput.value = selectedProduct.price;

    stockInput.value = selectedProduct.stock;

    quantityInput.value = "";

    totalInput.value = "";

    orderModal.style.display = "flex";

}
/* ===============================
   CLOSE ORDER POPUP
================================== */

closeOrderModal.addEventListener("click", function(){

    orderModal.style.display = "none";

    orderForm.reset();

});

window.addEventListener("click", function(event){

    if(event.target === orderModal){

        orderModal.style.display = "none";

        orderForm.reset();

    }

});
/* ===============================
   AUTO CALCULATE TOTAL
================================== */

quantityInput.addEventListener("input", function () {

    const quantity = Number(quantityInput.value);

    const price = Number(priceInput.value);

    if (quantity > 0) {

        totalInput.value = quantity * price;

    } else {

        totalInput.value = "";

    }

});
/* ===============================
   PLACE ORDER
================================== */

orderForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const quantity = Number(quantityInput.value);

    const stock = Number(stockInput.value);

    if (quantity <= 0) {

        alert("Please enter a valid quantity.");

        return;

    }

    if (quantity > stock) {

        alert("Only " + stock + " kg available.");

        return;

    }

    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    const newOrder = {

    id: Date.now(),

    customer: loggedInUser.name,

    email: loggedInUser.email,

    productId: selectedProduct.id,

    product: selectedProduct.name,

    category: selectedProduct.category,

    price: selectedProduct.price,

    unit: selectedProduct.unit,

    quantity: quantity,

    total: Number(totalInput.value),

    status: "Pending",

    date: new Date().toLocaleDateString(),

    orderTime: new Date().toLocaleTimeString()

};

    orders.push(newOrder);

    localStorage.setItem("orders", JSON.stringify(orders));

    selectedProduct.stock -= quantity;

    localStorage.setItem("products", JSON.stringify(products));

    alert(
    `✅ Order Placed Successfully!

Product : ${selectedProduct.name}

Quantity : ${quantity} ${selectedProduct.unit}

Total : ₹${totalInput.value}`
);

    orderModal.style.display = "none";

    orderForm.reset();

   loadProducts();

});

/* ===============================
   LOAD PRODUCTS
================================== */

async function loadProducts(){

    try{

        const response=await fetch("http://localhost:5000/api/products");

        const data=await response.json();

        if(data.success){

            products=data.products;

            loadProducts();

        }

    }catch(error){

        console.error(error);

    }

}


/* ===============================
   OPEN MODAL
================================== */

addProductBtn.addEventListener("click", function () {

    productModal.style.display = "flex";

});


/* ===============================
   CLOSE MODAL
================================== */

closeModal.addEventListener("click", function () {

    productModal.style.display = "none";

    productForm.reset();

});


/* ===============================
   CLOSE MODAL WHEN CLICKING OUTSIDE
================================== */

window.addEventListener("click", function (event) {

    if (event.target === productModal) {

        productModal.style.display = "none";

        productForm.reset();

    }

});
/* ===============================
   CURRENT EDIT PRODUCT ID
================================== */

let editProductId = null;
/* ===============================
   ADD PRODUCT
================================== */

productForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    const formData = new FormData();

    formData.append("farmer_id", loggedInUser.id);
    formData.append("name", document.getElementById("productName").value.trim());
    formData.append("category", document.getElementById("productCategory").value);
    formData.append("price", document.getElementById("productPrice").value);
    formData.append("stock", document.getElementById("productStock").value);
    formData.append("unit", document.getElementById("productUnit").value.trim());
    formData.append("description", document.getElementById("productDescription").value.trim());

    const imageFile = document.getElementById("productImage").files[0];

    if (imageFile) {
        formData.append("image", imageFile);
    }

    try {

        const response = await fetch("http://localhost:5000/api/products", {

            method: "POST",

            body: formData

        });

        const data = await response.json();

        if (data.success) {

            alert(data.message);

            productForm.reset();

            productModal.style.display = "none";

            loadProducts();

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.error(error);

        alert("Unable to connect to server.");

    }

});
/* ===============================
   DELETE PRODUCT
================================== */

function deleteProduct(id) {

    const confirmDelete = confirm("Are you sure you want to delete this product?");

    if (!confirmDelete) return;

    await fetch(`http://localhost:5000/api/products/${id}`,{
    method:"DELETE"
});

loadProducts();

}


/* ===============================
   EDIT PRODUCT
================================== */

function editProduct(id) {

    const product = products.find(item => item.id === id);

    if (!product) return;

    editProductId = id;

    document.getElementById("productName").value = product.name;

    document.getElementById("productCategory").value = product.category;

    document.getElementById("productPrice").value = product.price;

    document.getElementById("productStock").value = product.stock;

    document.getElementById("productUnit").value = product.unit;

    document.getElementById("productDescription").value = product.description;

    document.getElementById("productImage").value =
        product.image.replace("images/", "");

    productModal.style.display = "flex";

}
/* ===============================
   SEARCH PRODUCTS
================================== */

searchProduct.addEventListener("keyup", filterProducts);


/* ===============================
   FILTER BY CATEGORY
================================== */

categoryFilter.addEventListener("change", filterProducts);


/* ===============================
   SEARCH + FILTER FUNCTION
================================== */

function filterProducts() {

    const searchValue = searchProduct.value.toLowerCase().trim();

    const selectedCategory = categoryFilter.value;

    const filteredProducts = products.filter(product => {

        const matchesSearch =
            product.name.toLowerCase().includes(searchValue);

        const matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        return matchesSearch && matchesCategory;

    });

    displayProducts(filteredProducts);

}


/* ===============================
   RESET PRODUCT FORM
================================== */

function resetProductForm() {

    productForm.reset();

    editProductId = null;

}


/* ===============================
   RESET FORM WHEN MODAL CLOSES
================================== */

closeModal.addEventListener("click", resetProductForm);

window.addEventListener("click", function(event){

    if(event.target === productModal){

        resetProductForm();

    }

});


/* ===============================
   INITIALIZE PAGE
================================== */

document.addEventListener("DOMContentLoaded", function(){

    loadProducts();

});


/* ===============================
   READY FOR BACKEND
================================== */

/*
Future Backend Integration

GET    /api/products
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id

Replace localStorage with API calls.
The UI does not need to change.
*/

console.log("Products Module Loaded Successfully");