# Proyecto Web AVI

Proyecto que gestiona usuarios, productos, supermercados y listas de la compra. Incluye backend en Node.js/Express y frontend en React.

## Objetivo
Democratizar el acceso a información de precios, permitiendo a las familias optimizar su presupuesto de compra mediante decisiones informadas basadas en datos reales y actualizados.

## Funcionalidades
**Búsqueda por Proximidad**

- Mapa interactivo que muestra supermercados cercanos a tu ubicación
- Filtrado por distancia para encontrar las tiendas más convenientes
- Visualización de múltiples cadenas de supermercados en un solo lugar

**Comparación de Precios**

- Base de datos actualizada con precios de productos en diferentes tiendas
- Identificación rápida de las ofertas más competitivas
- Alertas de precios especiales y descuentos activos

**Gestión de Compras**

- Creación de listas de compra personalizadas
- Cálculo automático del coste total en diferentes supermercados
- Recomendación de la tienda más económica según tu lista

## Estructura del proyecto actualmente
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
│   ├── db/                            # Recursos y utilidades relacionados con la base de datos
│   │   ├── index.js                   # Del módulo DB inicializa modelos y exporta conexiones
│   │   ├── info_scraps_mercadona.csv  # Dataset temporal con datos extraídos (scraping)
│   │   ├── schema.js                  # Definición del esquema de tablas usando JavaScript
│   │   ├── schema.sql                 # Script SQL con la creación de tablas y estructura completa
│   │   └── seed.js                    # Script para poblar la base de datos con datos
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
    │   ├── pages/                     # Vistas principales
    │   │   ├── Inicio.jsx             # Página de inicio
    │   │   ├── Inicio.css
    │   │   ├── Productos.jsx          # Vista de productos + lista de compra
    │   │   ├── Productos.css
    │   │   ├── Register.jsx           # Registro / Login
    │   │   ├── Register.css
    │   │   └── Map/                   # Vista de mapa
    │   │       ├── Map.jsx
    │   │       └── Map.css
    │   │
    │   ├── App.jsx                    # Componente raíz
    │   ├── App.css
    │   ├── main.js                    # Punto de arranque de React
    │   └── index.js                   # Renderizado al DOM
    │
    └── package.json                   # Dependencias del frontend
`````
---

## Tecnologías y herramientas utilizadas
### **Backend**
Frameworks, bases de datos, herramientas vinculadas al desarrollo del servidor.
- **MySQL Server** – Motor de base de datos utilizado en el backend.
- **MySQL Workbench** – Herramienta visual para administrar la base de datos.
- **Postman** – Cliente para probar y documentar endpoints del backend.
- **MapBox** (si el backend gestiona peticiones de mapas/geocodificación).

Por usar:
- **APIs externas** – Servicios de terceros que requiere el backend (ej: APIs de tiempo).
- **Servidor VPS** – Hardware donde se ejecuta el backend.
- **SSH** – Protocolo para conectarse al servidor y desplegar/administrar el backend.

### **Frontend**
Frameworks, librerías de UI/diseño, herramientas usadas para la parte visual o interacción con usuario.
- **Figma** – Diseño UI/UX del frontend.
- **Notion** – Documentación y planificación del desarrollo.
- **GitHub** (licencias, integración con IDE) – Gestión del código del frontend.
- **Visual** Studio Code – Editor principal para desarrollo del frontend.

Por usar:
- **MapBox** - El frontend muestra mapas con la librería JS.
- **APIs externas** (si son consumidas directamente desde el frontend).

### **DevOps**
Infraestructura, despliegue, automatizaciones, contenedores y herramientas transversales.
- **GitHub**
  - Control de versiones
  - CI/CD si se usa GitHub Actions
- **Notion** – Organización del equipo (puede considerarse una herramienta transversal).

Por usar:
- **Docker** – Contenedores para backend, base de datos o entorno completo del proyecto.
- **Servidor VPS** – Entorno de despliegue (también aplica aquí, además de backend).
- **SSH** – Acceso remoto al VPS (gestionado dentro de prácticas DevOps).
- **Licencias de IDE** (IntelliJ, etc.) – Herramientas usadas en la cadena de desarrollo.

## Cómo ejecutar el proyecto
### 1.Instalación
(Por detallar: pasos para instalar dependencias y preparar el entorno)

- Clonar el repositorio:
`````
git clone <URL-del-repo>
`````

- Instalar dependencias del backend y frontend:
`````
cd backend
npm install
cd ../frontend
npm install
`````
- Otros pasos de instalación (creación de bases de datos, permisos, librerías globales, etc.)

### 2. Comandos para levantar el proyecto
#### Backend
- Primera vez (para inicializar la base de datos con datos de prueba):
`````
npm run seed
`````

- Levantar servidor normalmente:
`````
npm run dev
`````

#### Frontend
- Levantar servidor de desarrollo:
`````
npm run dev
`````

### 3. Variables de entorno necesarias
(Por detallar: agregar las variables que necesita el backend y frontend, por ejemplo: DB_HOST, DB_USER, API_KEY, etc.)

#### - Backend:
`````
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
JWT_SECRET=
PORT=
`````
#### - Frontend:
Posiblemente de a futuro cuando este definido:
`````
VITE_API_URL=
MAPBOX_TOKEN=
`````

## Roadmap
  ### – Etapas y sus fases del proyecto:

    #### - **Planteamiento** (acabada)
      - **Descripción del proyecto:** Qué es la aplicación y para qué sirve.
        - **Alcance:** Qué funcionalidades sí y cuáles no se incluirán.
      - **Usuarios objetivo:** Quiénes usarán la app y sus necesidades.
      - **Roadmap / Cronograma:** Etapas del proyecto y fechas clave.
      - **Requerimientos:**
        - Funcionales (qué hace)
        - No funcionales (rendimiento, seguridad, etc.).
      - **Recursos necesarios**: Herramientas, licencias, infraestructura.
      - **Funcionalidades del MVP:** Definir las esenciales para la primera versión.
      - **Documentación e investigación previa:** Lógica del proceso, info necesaria para el desarrollo.
    Etapa inicial donde se definió qué se va a construir, para quién y con qué alcance. Aquí se establecieron las bases conceptuales del proyecto.

    #### - **Diseño** (en proceso)
      - **Diagrama de uso / Flujo de navegación de la Web**
      - **Wireframes/Previsualización** (Mockups)
          - Baja fidelidad
          - Alta fidelidad
      - **Diseño Visual** (asentar las bases visuales, prototipo)
      - **UI / UX Guidelines:** Colores, tipografías, botones, estilos. (Bootstrap)
    Construcción de la experiencia visual y funcional del producto. Esta etapa define cómo se usa y cómo se ve la aplicación.
  Actualmente se desarrolla en paralelo con la etapa de desarrollo.

    #### - **Desarrollo** (en proceso)
      - **Arquitectura del proyecto:** Frontend, backend, base de datos.
      - **Tecnologías a usar:** Frameworks, librerías, servicios externos.
      - **Estructura de carpetas y archivos:** Organización del código.
      - **Integraciones:** APIs o servicios externos.
      - **Checklist de funcionalidades:** Lista de features a implementar.
    Implementación técnica del sistema: frontend, backend y base de datos.
  Evoluciona en paralelo con el diseño y aún está pendiente de consolidar antes de comenzar el testing.

    #### - **Testing QA** (en prceso)
      - **Pruebas unitarias:** Validar componentes individuales del sistema (funciones, controladores, servicios).
      - **Pruebas de integración:** Comprobación del flujo completo entre Frontend → Backend → Base de Datos.
      - **Pruebas funcionales:** Confirmar que cada funcionalidad cumple su propósito y responde como se espera.
      - **Pruebas de interfaz / usuario (UI/UX):** Verificar experiencia de usuario, navegación y diseño visual.
      - **Pruebas de rendimiento:** Medir tiempos de carga, consumo de recursos y estabilidad bajo uso.
      - **Registro de bugs / incidencias:** Documentación, seguimiento y resolución de errores detectados.
      - **Corrección de errores y refinamiento final:** Ajustes previos al despliegue.
  La fase de testing ha comenzado, especialmente con las pruebas de integración, verificando que el flujo completo entre frontend, backend y base de datos funciona correctamente. Aún queda completar las demás pruebas y la corrección de errores para cerrar esta etapa.