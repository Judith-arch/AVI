# AVI Web Project

*Project that manages users, products, supermarkets, and shopping lists.*
Includes **backend in Node.js/Express** and **frontend in React**.

---

## Table of Contents

- [🎯 Objective and MVP](#objective-and-mvp)
- [⚙️ Features](#features)
- [📂 Current project structure](#current-project-structure)
- [🛠️ Technologies and tools](#technologies-and-tools-used)
- [🚀 How to run](#how-to-run-the-project)
- [📅 Roadmap](#roadmap)

---

## Objective and MVP

The ultimate goal of the project is to **democratize access to pricing information**, allowing families to optimize their shopping budget by making informed decisions based on **real, up-to-date data**.

For this first version (MVP), the focus is on implementing and ensuring the proper functioning of the features listed below, so that the application can be tested with a small group of known users.
This MVP testing and refinement phase is planned to last until approximately January.

> ⚠️ The MVP does not include all the final features, but serves as a **functional basis for validating the idea and gathering feedback** before moving forward with the full development and integration of all functionalities.

## Features

### 📍 Proximity Search
- Interactive map showing supermarkets near your location.
- Filter by distance to find the most convenient stores.
- View multiple supermarket chains in one place.

<!-- ![Example map](path/to/your/map-image.png) -->
*Screenshot of the proximity search feature.*

---

### 💰 Price Comparison
- Updated database with product prices in different stores.
- Quick identification of the most competitive offers.
- Special price alerts and active discounts.

---

### 🛒 Shopping Management
- Creation of personalized shopping lists.
- Automatic calculation of the total cost in different supermarkets.
- Recommendation of the cheapest store based on your list.

<!-- ![Shopping list](path/to/your/image-list.png) -->
*Example of shopping list view in the app.*

## Current project structure
`````
AVI/
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
│
└── frontend/                          # Client application (React)
    ├── public/                        # Public static files
    │
    ├── src/
    │   ├── api/
    │   │   └── api.js                 # Axios configuration (baseURL, interceptors…)
    │   │
    │   ├── assets/                    # Images and static resources
    │   │   └── *.svg                  # Currently only one SVG
    │   │
    │   ├── components/                # Reusable components
    │   │   ├── FiltersPanel/
    │   │   │   ├── FiltersPanel.css
    │   │   │   └── FiltersPanel.jsx
    │   │   ├── ReviewCarousel/
    │   │   │   ├── ReviewCarousel.css
    │   │   │   └── ReviewCarousel.jsx
    │   │   ├── SearchBar/
    │   │   │   ├── SearchBar.css
    │   │   │   └── SearchBar.jsx
    │   │   ├── StoreCard/
    │   │   │   ├── StoreCard.css
    │   │   │   └── StoreCard.jsx
    │   │   ├── Head.css
    │   │   └── Head.jsx
    │   │
    │   ├── pages/                     # Main views
    │   │   ├── Inicio.jsx             # Home page
    │   │   ├── Inicio.css
    │   │   ├── Productos.jsx          # Products + shopping list view
    │   │   ├── Productos.css
    │   │   ├── Register.jsx           # Registration / Login
    │   │   ├── Register.css
    │   │   └── Map/                   # Map view
    │   │       ├── Map.jsx
    │   │       └── Map.css
    │   │
    │   ├── App.jsx                    # Root component
    │   ├── App.css
    │   ├── main.js                    # React entry point
    │   └── index.js                   # Render to DOM
    │
    └── package.json                   # Frontend dependencies

`````
---

## Technologies and tools used

### 🖥️ Backend
Frameworks, databases, and tools related to server development.

- **MySQL Server** – Database engine used in the backend.
- **MySQL Workbench** – Visual tool for managing the database.
- **Postman** – Client for testing and documenting backend endpoints.
- **MapBox** – If the backend manages map/geocoding requests.

💡 **To be used:**
- 🌐 **External APIs** – Third-party services (e.g., weather APIs).
- 🖥️ **VPS server** – Hardware where the backend runs.
- 🔑 **SSH** – Protocol for connecting to the server and deploying/managing the backend.

---

### 🎨 Frontend
Frameworks, UI/design libraries, and tools used for the visual part or user interaction.

- **Figma** – Frontend UI/UX design.
- **Notion** – Documentation and development planning.
- **GitHub** – Licensing and IDE integration, code management.
- **Visual Studio Code** – Main editor for frontend development.

💡 **To be used:**
- 🗺️ **MapBox** – The frontend displays maps with the JS library.
- 🌐 **External APIs** – If consumed directly from the frontend.

---

### ⚙️ DevOps
Infrastructure, deployment, automation, and cross-functional tools.

- **GitHub**
  - Version control
  - CI/CD if GitHub Actions is used
- **Notion** – Team organization (cross-functional tool).

💡 **To be used:**
- 🐳 **Docker** – Containers for backend, database, or complete environment.
- 🖥️ **VPS server** – Deployment environment (also applies to backend).
- 🔑 **SSH** – Remote access to VPS.
- 🛠️ **IDE licenses** – IntelliJ, etc., used in the development chain.

## How to run the project
### 1️⃣ Installation
*(Steps to install dependencies and prepare the environment)*

- **Clone the repository:**
```bash
git clone <URL-del-repo>
```

- **Install backend and frontend dependencies:**
`````
cd backend
npm install
cd ../frontend
npm install
`````
- Other installation steps (creating databases, permissions, global libraries, etc.)

### 2️⃣ Commands to launch the project
#### 🖥️ Backend
- **First time** (to initialize the database with test data):
`````
npm run seed
`````

- **Launch server normally:**
`````
npm run dev
`````

#### 🎨 Frontend
- **Launch development server:**
`````
npm run dev
`````

### 3️⃣ Required environment variables
(Add the variables needed by the backend and frontend)

#### - 🔑 Backend:
`````
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
JWT_SECRET=
PORT=
`````
#### - 🌐 Frontend:
Possibly in the future when defined:
`````
VITE_API_URL=
MAPBOX_TOKEN=
`````

## Roadmap

### 📝 Project stages and phases

---

#### 1️⃣ Approach (✅ completed)
- **Project description:** What the application is and what it is used for.
  - **Scope:** Which features will and will not be included.
- **Target users:** Who will use the app and what are their needs?
- **Roadmap/Schedule:** Project stages and key dates.
- **Requirements:**
  - Functional (what it does)
  - Non-functional (performance, security, etc.)
- **Required resources:** Tools, licenses, infrastructure.
- **MVP features:** Define the essential features for the first version.
- **Documentation and preliminary research:** Process logic, information needed for development.

> *Initial stage where we defined what we were going to build, for whom, and with what scope. This is where we laid the conceptual foundations for the project.*

---

#### 2️⃣ Design (⚙️ in progress)
- **Usage diagram / Website navigation flow**
- **Wireframes / Preview (Mockups):**
  - Low fidelity
  - High fidelity
- **Visual Design:** Laying the visual foundations, prototype.
- **UI/UX Guidelines:** Colors, fonts, buttons, styles (Bootstrap).

> *Building the visual and functional experience of the product. Defines how the application is used and how it looks. This stage is developed in parallel with the development stage.*

---

#### 3️⃣ Development (⚙️ in progress)
- **Project architecture:** Frontend, backend, database.
- **Technologies to be used:** Frameworks, libraries, external services.
- **Folder and file structure:** Code organization.
- **Integrations:** APIs or external services.
- **Functionality checklist:** List of features to be implemented.

> *Technical implementation of the system: frontend, backend, and database. This evolves in parallel with the design and still needs to be consolidated before testing can begin.*

---

#### 4️⃣ QA testing (🧪 in progress)
- **Unit tests:** Validate individual components of the system (functions, controllers, services).
- **Integration tests:** Check the entire flow between Frontend → Backend → Database.
- **Functional testing:** Confirm that each feature fulfills its purpose and responds as expected.
- **Interface/user testing (UI/UX):** Verify user experience, navigation, and visual design.
- **Performance testing:** Measure load times, resource consumption, and stability under use.
- **Bug/incident logging:** Documentation, tracking, and resolution of detected errors.
- **Bug fixing and final refinement:** Pre-deployment adjustments.

> *The testing phase has begun, particularly with integration testing, verifying that the entire flow between the frontend, backend, and database is functioning correctly. The remaining tests and bug fixes still need to be completed to close this stage.*

