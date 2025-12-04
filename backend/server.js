import "dotenv/config";
import express from "express";
import cors from "cors";
import { initDB } from "./db/index.js";
import { seedDatabase } from "./db/seed.js";
import authRoutes from "./routes/authRoutes.js";
import supermarketRoutes from "./routes/supermarketRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import productRoutes from "./routes/productRoutes.js";
import shoppingListRoutes from "./routes/shoppingListRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// ===== MIDDLEWARES GLOBALES =====
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log de requests en desarrollo
if (process.env.NODE_ENV === "development") {
    app.use((req, res, next) => {
        console.log(`📨 ${req.method} ${req.path}`);
        next();
    });
}

// ===== RUTAS =====
app.get("/", (req, res) => {
    res.json({
        message: "🚀 API funcionando correctamente",
        version: "1.0.0",
        endpoints: {
            auth: "/api/auth",
            supermarkets: "/api/supermarkets"
        }
    });
});

app.get("/api", (req, res) => {
    res.json({
        message: "API Documentation",
        endpoints: [
            {
                name: "Register",
                author: "Judith",
                status: "Funciona December 4, 2025",
                request: {
                    method: "POST",
                    url: "http://localhost:5000/api/auth/register",
                    body: {
                        type: "json",
                        example: {
                            "username": "testuser",
                            "email": "test@example.com",
                            "password": "123456"
                        }
                    }
                },
                response: {
                    success: {
                        "success": true,
                        "message": "Usuario registrado exitosamente",
                        "data": {
                            "id": 3,
                            "username": "testuser",
                            "email": "test@example.com",
                            "created_at": "2024-12-04T..."
                        }
                    }
                }
            },
            {
                name: "Login",
                author: "Judith",
                status: "Funciona December 4, 2025",
                request: {
                    method: "POST",
                    url: "http://localhost:5000/api/auth/login",
                    body: {
                        type: "json",
                        example: {
                            "email": "admin@example.com",
                            "password": "admin123"
                        }
                    }
                },
                response: {
                    success: {
                        "success": true,
                        "message": "Login exitoso",
                        "data": {
                            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                            "user": {
                                "id": 1,
                                "username": "admin",
                                "email": "admin@example.com"
                            }
                        }
                    }
                }
            },
            {
                name: "Auth / Obtener usuario actual",
                author: "Judith",
                status: "Funciona December 4, 2025",
                request: {
                    method: "GET",
                    url: "http://localhost:5000/api/auth/me",
                    headers: {
                        Authorization: "Bearer TU_TOKEN_AQUI"
                    },
                    note: "🔑 IMPORTANTE: Copia el token para los siguientes tests protegidos"
                },
                response: {
                    withToken: {
                        "success": true,
                        "data": {
                            "id": 1,
                            "username": "admin",
                            "email": "admin@example.com",
                            "latitud_favorita": "41.38510000",
                            "longitud_favorita": "2.17340000",
                            "created_at": "2024-12-04T..."
                        }
                    },
                    withoutToken: {
                        "success": false,
                        "message": "Token no proporcionado"
                    }
                }
            },
            {
                name: "Get Productos",
                author: "Judith",
                status: "Funciona December 4, 2025",
                request: {
                    method: "GET",
                    url: "http://localhost:5000/api/products"
                },
                response: {
                    success: "Ver JSON completo en documentación original (18 productos)"
                }
            },
            {
                name: "Get Producto by ID",
                author: "Judith",
                status: "Funciona December 4, 2025",
                request: {
                    method: "GET",
                    url: "http://localhost:5000/api/products/1"
                },
                response: {
                    success: "Ver JSON ejemplo producto ID 1",
                    notFound: {
                        "success": false,
                        "message": "Producto no encontrado"
                    }
                }
            },
            {
                name: "Get Productos by Categoría",
                author: "Judith",
                status: "Funciona December 4, 2025",
                request: {
                    method: "GET",
                    url: "http://localhost:5000/api/products?category=1"
                },
                response: {
                    success: "Ver JSON ejemplo (4 productos)",
                    empty: {
                        "success": true,
                        "count": 0,
                        "data": []
                    }
                }
            },
            {
                name: "Get Productos by Supermarket",
                author: "Judith",
                status: "Funciona December 4, 2025",
                request: {
                    method: "GET",
                    url: "http://localhost:5000/api/products?supermarket=1"
                },
                response: {
                    success: "Ver JSON ejemplo (7 productos)",
                    empty: {
                        "success": true,
                        "count": 0,
                        "data": []
                    }
                }
            },
            {
                name: "Get Productos by nombre (search)",
                author: "Judith",
                status: "Funciona December 4, 2025",
                request: {
                    method: "GET",
                    url: "http://localhost:5000/api/products?search=leche"
                },
                response: {
                    success: "Ver JSON ejemplo (1 producto)"
                }
            },
            {
                name: "Get Categorías",
                author: "Judith",
                status: "Funciona December 4, 2025",
                request: {
                    method: "GET",
                    url: "http://localhost:5000/api/products/categories"
                },
                response: {
                    success: "Ver JSON ejemplo (8 categorías)"
                }
            },
            {
                name: "Producto protegido (Crear Producto)",
                author: "Judith",
                status: "Funciona December 4, 2025",
                request: {
                    method: "POST",
                    url: "http://localhost:5000/api/products",
                    headers: {
                        Authorization: "Bearer TU_TOKEN_AQUI"
                    },
                    body: {
                        type: "json",
                        example: {
                            "name": "Aceite de Oliva",
                            "descripcion": "Aceite virgen extra",
                            "price": 8.50,
                            "unidad_medida": "litro",
                            "category_id": 1,
                            "supermarket_id": 1
                        }
                    }
                },
                response: {
                    success: "Ver JSON ejemplo producto creado",
                    error500: "Error interno del servidor al usar token incorrecto"
                }
            },
            {
                name: "Get Supermarkets",
                author: "Judith",
                status: "Funciona December 4, 2025",
                request: {
                    method: "GET",
                    url: "http://localhost:5000/api/supermarkets"
                },
                response: {
                    success: "Ver JSON ejemplo 4 supermercados"
                }
            },
            {
                name: "Get Supermarkets by ID",
                author: "Judith",
                status: "Funciona December 4, 2025",
                request: {
                    method: "GET",
                    url: "http://localhost:5000/api/supermarkets/1"
                },
                response: {
                    success: "Ver JSON ejemplo supermercado ID 1"
                }
            },
            {
                name: "Crear lista de la compra",
                author: "Judith",
                status: "Funciona December 4, 2025",
                request: {
                    method: "POST",
                    url: "http://localhost:5000/api/shopping-lists",
                    headers: {
                        Authorization: "Bearer TU_TOKEN_AQUI"
                    },
                    body: {
                        type: "json",
                        example: { "name": "Lista del supermercado" }
                    }
                },
                response: {
                    success: "Ver JSON ejemplo lista creada"
                }
            },
            {
                name: "Get Lista de la compra",
                author: "Judith",
                status: "Funciona December 4, 2025",
                request: {
                    method: "GET",
                    url: "http://localhost:5000/api/shopping-lists"
                },
                response: {
                    success: "Ver JSON ejemplo (1 lista)"
                }
            },
            {
                name: "Post Item en lista de la compra",
                author: "Judith",
                status: "Funciona December 4, 2025",
                request: {
                    method: "POST",
                    url: "http://localhost:5000/api/shopping-lists/1/items",
                    headers: {
                        Authorization: "Bearer TU_TOKEN_AQUI"
                    },
                    body: {
                        type: "json",
                        example: {
                            "product_id": 1,
                            "quantity": 2
                        }
                    }
                },
                response: {
                    success: "Ver JSON ejemplo item añadido"
                }
            }
        ]
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/supermarkets", supermarketRoutes);
app.use("/api/products", productRoutes);
app.use("/api/shopping-lists", shoppingListRoutes);

// Ruta 404
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "❌ Ruta no encontrada"
    });
});

// Middleware de errores (SIEMPRE AL FINAL)
app.use(errorHandler);

// ===== INICIAR SERVIDOR =====
async function startServer() {
    try {
        console.log("🔄 Iniciando servidor...");
        
        // Inicializar DB
        await initDB();
        
        // Hacer seed si está activado
        if (process.env.RUN_SEED === "true") {
            await seedDatabase();
        }

        // Iniciar servidor
        app.listen(PORT, () => {
            console.log("\n" + "=".repeat(50));
            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
            console.log(`📚 Documentación: http://localhost:${PORT}/api`);
            console.log(`🗄️  Base de datos: ${process.env.DB_NAME}`);
            console.log("=".repeat(50) + "\n");
        });

    } catch (err) {
        console.error("❌ Error al iniciar el servidor:", err);
        process.exit(1);
    }
}

// Manejo de cierre graceful
process.on("SIGINT", async () => {
    console.log("\n🛑 Cerrando servidor...");
    process.exit(0);
});

startServer();