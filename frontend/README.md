# 🎨 AVI (Frontend)
Client-side application for **AVI** — an intelligent price comparison and shopping optimization platform.

The frontend is built with **React + Vite** and provides the UI for:
- browsing offers and products,
- proximity search with an interactive map,
- building shopping lists,
- and route optimization via Mapbox integration.

---

## 📌 Table of Contents
- 🎯 Objective (Frontend Scope)
- ⚙️ Features
- 📂 Current project structure
- 🛠️ Technologies and tools
- 🚀 How to run
- 🔧 Environment variables
- 📅 Roadmap

---

## 🎯 Objective (Frontend Scope)

The goal of the frontend is to deliver a fast, clean and intuitive experience that allows users to:
- access pricing information quickly,
- compare offers across supermarkets,
- and optimize their purchase decisions based on proximity + total shopping cost.

For the **MVP**, the frontend focuses on implementing and validating the core flows with a small group of users:
- browsing offers,
- searching and filtering,
- shopping list creation,
- and basic map interaction.

⚠️ The MVP does not include all final UI/UX features, but provides a stable base for feedback and iteration.

---

## ⚙️ Features

### 📍 Proximity Search (Map)
- Interactive map view showing supermarkets near the user
- Search by location / postal code
- Display stores and relevant information in a map-driven experience

### 💰 Product & Offer Browsing
- Browse and search products/offers
- Product detail view (price, store, discount)
- Visual components for offer cards and store cards

### 🛒 Shopping List UI
- Create and manage shopping lists from the UI
- View estimated totals (depending on backend calculation)
- UI prepared to show “best store recommendation” results

### 🔎 Filters & UX Components
- Advanced filters panel
- Search bar
- Review carousel / UI sections to enrich the experience

### 🔔 Notifications (UI-ready)
- UI prepared to support notifications/alerts
- Integration depends on backend availability

---

## 📂 Current project structure

frontend/
│
├── public/                     # Archivos estáticos públicos
│
├── src/
│   ├── api/
│   │   └── api.js              # Configuración de Axios (baseURL, interceptors…)
│   │
│   ├── assets/                 # Imágenes y recursos estáticos
│   │   └── *.svg
│   │
│   ├── components/             # Componentes reutilizables de UI
│   │   ├── FiltersPanel/
│   │   ├── ReviewCarousel/
│   │   ├── SearchBar/
│   │   ├── StoreCard/
│   │   ├── Head.jsx
│   │   └── Head.css
│   │
│   ├── pages/                  # Vistas principales
│   │   ├── Inicio.jsx
│   │   ├── Inicio.css
│   │   ├── Productos.jsx
│   │   ├── Productos.css
│   │   ├── Register.jsx
│   │   ├── Register.css
│   │   └── Map/
│   │       ├── Map.jsx
│   │       └── Map.css
│   │
│   ├── App.jsx                 # Componente raíz
│   ├── App.css                 # Estilos globales
│   ├── main.js                 # Punto de entrada de React
│   └── index.js                # Renderizado al DOM
│
├── index.html
├── vite.config.js
└── package.json
```


---

## 🛠️ Technologies and tools

### 🎨 Frontend
- **React + Vite**
- **CSS** (per-component stylesheets)
- **Axios** (API consumption via `src/api/api.js`)
- **Mapbox** (map view + route visualization)
- **Figma** (UI/UX design)
- **VS Code** (development)
- **Notion** (planning & documentation)

### ⚙️ DevOps / Workflow
- **GitHub** (version control)
- CI/CD planned (GitHub Actions / deployment)

💡 To be used:
- Mapbox JS advanced features (routing, geocoding)
- Deployment (Vercel/Netlify + VPS backend)
- Docker (optional, for full environment)

---

## 🚀 How to Run

### 1️⃣ Installation

Clone the repository:
```bash
git clone <REPO_URL>
cd frontend
npm install
```

### 2️⃣ Start the Development Server
```bash
npm run dev
```

The app will be available at **http://localhost:5173**

---

## 🔧 Environment Variables

Create a `.env` file inside `frontend/` with the following variables:
```env
VITE_API_URL=http://localhost:5000
VITE_MAPBOX_TOKEN=your_mapbox_token
```

> ⚠️ `VITE_API_URL` must match your backend server address.

---

## 📅 Roadmap

| Status | Task |
|--------|------|
| ✅ | Base project setup (Vite + React) |
| ✅ | Main pages structure (Inicio, Productos, Register, Map) |
| ⚙️ | Improve filtering UX and responsiveness |
| ⚙️ | Shopping list UX polish and edge cases |
| ⚙️ | Auth integration + Google OAuth UI |
| 🧪 | UI testing and bug fixing |
| 🚀 | Deployment (Vercel / Netlify) |