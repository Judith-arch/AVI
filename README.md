# AVI - API y Frontend

Proyecto que gestiona usuarios, productos, supermercados y listas de la compra. Incluye backend en Node.js/Express y frontend en React.

## Estructura del proyecto (se ha de ir actualizando)
`````
AVI/
├── backend/                           # API REST en Node.js (Express + MySQL)
│   ├── config/                        # Configuración central del sistema
│   │   ├── database.js                # Conexión a la base de datos MySQL
│   │   └── config.js                  # Carga de variables de entorno (.env)
│   │
│   ├── controllers/                   # Controladores → reciben petición y responden
│   │   ├── authController.js          # Control de login/registro
│   │   ├── userController.js          # Gestión del usuario
│   │   ├── productController.js       # Endpoints de productos
│   │   └── shoppingListController.js  # Endpoints de listas de compra
│   │
│   ├── middlewares/                   # Funciones que interceptan las peticiones
│   │   ├── authMiddleware.js          # Verificación JWT (protege rutas)
│   │   └── errorHandler.js            # Manejo global de errores
│   │
│   ├── models/                        # Modelos → interacción directa con BD
│   │   ├── userModel.js               # Modelo de usuarios
│   │   ├── productModel.js            # Modelo de productos
│   │   ├── categoryModel.js           # Modelo de categorías
│   │   └── shoppingListModel.js       # Modelo de listas de compra
│   │
│   ├── routes/                        # Definición de endpoints
│   │   ├── authRoutes.js              # Rutas de autenticación (/api/auth)
│   │   ├── userRoutes.js              # Rutas de usuario (/api/users)
│   │   ├── productRoutes.js           # Rutas de productos (/api/products)
│   │   └── shoppingListRoutes.js      # Rutas listas de compra (/api/shopping-lists)
│   │
│   ├── services/                      # Lógica de negocios (capa entre controller y modelo)
│   │   ├── authService.js             # Lógica de autenticación
│   │   ├── userService.js             # Lógica del usuario
│   │   ├── productService.js          # Lógica de productos
│   │   └── shoppingListService.js     # Lógica listas de compra
│   │
│   ├── utils/                         # Utilidades y herramientas auxiliares
│   │   ├── helpers.js                 # Funciones genéricas reutilizables
│   │   └── tokenService.js            # Gestión y creación de JWT
│   │
│   ├── server.js                      # Punto de entrada del backend (Express)
│   ├── .env                           # Variables de entorno (DB, TOKEN_SECRET, etc.)
│   └── package.json                   # Dependencias del backend
│
└── frontend/                          # Aplicación cliente (React)
    ├── public/                        # Archivos estáticos públicos
    │
    ├── src/
    │   ├── api/
    │   │   └── api.js                 # Config de Axios (baseURL, interceptores…)
    │   │
    │   ├── assets/                    # Imágenes y recursos estáticos
    │   │   └── *.svg                  # Actualmente solo un SVG
    │   │
    │   ├── components/                # Componentes reutilizables
    │   │   ├── Head.jsx               # Header de la app
    │   │   └── Head.css               # Estilos del header
    │   │
    │   ├── pages/                     # Vistas principales
    │   │   ├── Inicio.jsx             # Página de inicio
    │   │   ├── Inicio.css
    │   │   ├── Productos.jsx          # Vista de productos + lista de compra
    │   │   ├── Productos.css
    │   │   ├── Register.jsx           # Registro / Login
    │   │   └── Register.css
    │   │
    │   ├── App.jsx                    # Componente raíz
    │   ├── App.css
    │   ├── main.js                    # Punto de arranque de React
    │   └── index.js                   # Renderizado al DOM
    │
    └── package.json                   # Dependencias del frontend

`````
---

# Documentación de la API

## Autenticación

#### Registro
`````
POST /api/auth/register
`````
#####Content-Type: application/json
    
####Body:
```http
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "123456"
}
```
####Respuesta:
```http
{
  "success": true,
  "message": "Usuario registrado exitosamente",
  "data": {
    "id": 3,
    "username": "testuser",
    "email": "test@example.com",
    "created_at": "2024-12-04T..."
  }
}
```

#### Login
`````
POST /api/auth/login
`````
Content-Type: application/json
    
#####Body:
```http
{
  "email": "admin@example.com",
  "password": "admin123"
}

```
#####Respuesta:
```http
{
  "success": true,
  "message": "Login exitoso",
  "data": {
    "token": "JWT_TOKEN_AQUI",
    "user": {
      "id": 1,
      "username": "admin",
      "email": "admin@example.com"
    }
  }
}
```

#### Obtener usuario actual (protegido)
`````
GET /api/auth/me
Authorization: Bearer JWT_TOKEN_AQUI
`````
Content-Type: application/json
    
#####Respuesta con token:
```http
{
  "success": true,
  "data": {
    "id": 1,
    "username": "admin",
    "email": "admin@example.com",
    "latitud_favorita": "41.38510000",
    "longitud_favorita": "2.17340000",
    "created_at": "2024-12-04T..."
  }
}

```
#####Respuesta sin token:
```http
{
  "success": false,
  "message": "Token no proporcionado"
}
```

#### Productos
`````
GET /api/products
`````
Respuesta: Lista de productos con campos como id, name, descripcion, price, unidad_medida, category_name, supermarket_name, supermarket_city, etc.
    
#####Obtener producto por ID
```http
GET /api/products/:id
```
####Respuesta:
```http
{
    "success": true,
    "data": {
        "id": 1,
        "name": "Manzanas Golden",
        "descripcion": "Manzanas frescas origen España",
        "price": "2.50",
        "unidad_medida": "kg",
        "category_id": 1,
        "supermarket_id": 1,
        "image_url": null,
        "created_at": "2025-12-04T08:53:30.000Z",
        "category_name": "Frutas y Verduras",
        "supermarket_name": "Mercadona Centro",
        "supermarket_address": "Calle Mayor 1",
        "supermarket_city": "Barcelona"
    }
}
```
######No encontrado:
```http
{
    "success": false,
    "message": "Producto no encontrado"
}
```
Otras opciones de GET de Productos:
#####Obtener producto por Categoría
```http
GET http://localhost:5000/api/products?category=1
```
#####Obtener producto por Supermercado
```http
GET http://localhost:5000/api/products?supermarket=1
```
#####Obtener producto por Nombre
```http
GET http://localhost:5000/api/products?search=leche
```

###Supermercados
#####Obtener lista de Supermercados
```http
GET /api/supermarkets
```
####Respuesta:
```http
{
    "success": true,
    "count": 4,
    "data": [
        {
            "id": 2,
            "nombre": "Carrefour Express",
            "cadena": "Carrefour",
            "direccion": "Av. Diagonal 123",
            "ciudad": "Barcelona",
            "codigo_postal": "08028",
            "latitud": "41.38790000",
            "longitud": "2.16990000",
            "telefono": "933445566",
            "horario_apertura": "08:00:00",
            "horario_cierre": "22:00:00",
            "activa": 1,
            "fecha_registro": "2025-12-04T08:53:30.000Z"
        },
        // asi continuaria la lista con todos los qu hay
```
