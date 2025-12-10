# AVI-Backend

The backend of the AVI project is built using **Node.js** with the **Express** framework and a **MySQ**L database. It provides a **RESTful API** that handles authentication, user management, product catalog, supermarkets, and shopping lists. The backend is tested with **Postman** and structured in a modular way with **controllers, services, models, and routes.**

It handles tasks like:
- User registration and login with **JWT authentication.**
- CRUD operations for products and shopping lists.
- Database management and seeding with initial test data.
- Error handling and input validation.

---

## Table of Contents

- [🎯 How to Initialize](#how-to-initialize-the-backend)
- [📂 Structure](#backend-structure)
- [📅 Flow](#backend-flow)
- [🛠️ API](#api-documentation)
- [📅 Future Updates](#upcoming-updates)
---

## How to initialize the Backend
### 1️⃣ Installation
*(Steps to install dependencies and prepare the environment)*

- **Clone the repository:**
```bash
git clone <URL-del-repo>
```

- **Install backend dependencies:**
`````
cd backend
npm install
`````
- Other installation steps (creating databases, permissions, global libraries, etc.)

### 2️⃣ Commands to launch the Backend
#### 🖥️ Backend
- **First time** (to initialize the database with test data):
`````
npm run seed
`````

- **Launch server normally:**
`````
npm run dev
`````

## Backend Structure

````
├── backend/                           # REST API in Node.js (Express + MySQL)
│   ├── config/                        # Central system configuration
│   │   ├── database.js                # MySQL database connection
│   │   └── config.js                  # Loads environment variables (.env)
│   │
│   ├── controllers/                   # Controllers → receive requests and respond
│   │   ├── authController.js          # Login/registration control
│   │   ├── userController.js          # User management
│   │   ├── productController.js       # Product endpoints
│   │   └── shoppingListController.js  # Shopping list endpoints
│   │
│   ├── db/                            # Database-related resources and utilities
│   │   ├── index.js                   # Initializes models and exports connections
│   │   ├── info_scraps_mercadona.csv  # Temporary dataset with scraped data
│   │   ├── schema.js                  # Table schema definition using JavaScript
│   │   ├── schema.sql                 # SQL script to create tables and full structure
│   │   └── seed.js                    # Script to populate the database with data
│   │
│   ├── middlewares/                   # Functions that intercept requests
│   │   ├── authMiddleware.js          # JWT verification (protects routes)
│   │   └── errorHandler.js            # Global error handling
│   │
│   ├── models/                        # Models → direct database interaction
│   │   ├── userModel.js               # User model
│   │   ├── productModel.js            # Product model
│   │   ├── categoryModel.js           # Category model
│   │   └── shoppingListModel.js       # Shopping list model
│   │
│   ├── routes/                        # Endpoint definitions
│   │   ├── authRoutes.js              # Authentication routes (/api/auth)
│   │   ├── userRoutes.js              # User routes (/api/users)
│   │   ├── productRoutes.js           # Product routes (/api/products)
│   │   └── shoppingListRoutes.js      # Shopping list routes (/api/shopping-lists)
│   │
│   ├── services/                      # Business logic (layer between controller and model)
│   │   ├── authService.js             # Authentication logic
│   │   ├── userService.js             # User logic
│   │   ├── productService.js          # Product logic
│   │   └── shoppingListService.js     # Shopping list logic
│   │
│   ├── utils/                         # Utilities and helper tools
│   │   ├── helpers.js                 # Reusable generic functions
│   │   └── tokenService.js            # JWT management and creation
│   │
│   ├── server.js                      # Backend entry point (Express)
│   ├── .env                           # Environment variables (DB, TOKEN_SECRET, etc.)
│   └── package.json                   # Backend dependencies
````

## Backend Flow
Here goes the documentation of the bckend flow.

## API documentation
### Main Endpoints
### Auth
**Register**
````
POST /api/auth/register
Body (JSON): { "username", "email", "password" }
- Returns: success message and user data
````
- Notes: Password should meet validation rules; email must be unique.

**Login**
````
POST /api/auth/login
Body (JSON): { "email", "password" }
Returns: JWT token and user info
````
- Notes: JWT required for protected routes.

**Get Current User** (Protected)
````
GET /api/auth/me
Headers: Authorization: Bearer <TOKEN>
Returns: current user info
````
- Notes: Returns error if token is missing or invalid.

### Products
**Get All Products**
````
GET /api/products
Returns: List of products
````
- Notes: Optional query params: category, supermarket, search

**Get Product by ID**
````
GET /api/products/:id
Returns: Product details
````
- Notes: 404 if product does not exist.

**Get Products by Category**
````
GET /api/products?category=<id>
Returns: List of products in category
````
**Get Products by Supermarket**
````
GET /api/products?supermarket=<id>
Returns: List of products in the supermarket
````
**Search Products by Name**
````
GET /api/products?search=<name>
Returns: List of products matching the search
````
**Get Categories**
````
GET /api/products/categories
Returns: List of product categories
````
**Create Product (Protected)**
````
POST /api/products
Headers: Authorization: Bearer <TOKEN>
Body: { "name", "descripcion", "price", "unidad_medida", "category_id", "supermarket_id" }
````
- Notes: Returns 500 if invalid token or missing fields.

### Supermarkets
**Get All Supermarkets**
````
GET /api/supermarkets
Returns: List of supermarkets
````
**Get Supermarket by ID**
````
GET /api/supermarkets/:id
Returns: Supermarket details
````
- Notes: 404 if not found.

### Shopping Lists
**Create Shopping List (Protected)**
````
POST /api/shopping-lists
Headers: Authorization: Bearer <TOKEN>
Body: { "name" }
Returns: Created shopping list
````
**Get Shopping Lists (Protected)**
````
GET /api/shopping-lists
Headers: Authorization: Bearer <TOKEN>
Returns: List of user’s shopping lists
````
**Add Item to Shopping List (Protected)**
````
POST /api/shopping-lists/:id/items
Headers: Authorization: Bearer <TOKEN>
Body: { "product_id", "quantity" }
Returns: Updated list with added item
````
- Notes: Checks quantity > 0; product must exist.

### Notes
All protected endpoints require a valid JWT token.
Errors return standard JSON:
````
{ "success": false, "message": "Error description" }
Validation ensures required fields are present and correctly formatted.
````
**HTTP status codes:**
- 200 OK → Successful GET/POST
- 201 Created → Successful creation
- 400 Bad Request → Missing/invalid input
- 401 Unauthorized → Missing/invalid token
- 404 Not Found → Resource does not exist
- 500 Internal Server Error → Unexpected errors

## Upcoming Updates

The backend will be updated once the frontend defines the final components and interaction flow.
- Add more detailed API documentation for each endpoint.
- Implement additional validation and error handling.
- Optimize queries and database relations if needed.
- Add automated tests for core functionality.