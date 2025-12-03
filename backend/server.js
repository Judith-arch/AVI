import "dotenv/config";
import express from "express";
import cors from "cors";
import { initDB } from "./db/index.js";
import { seedDatabase } from "./db/seed.js";
import authRoutes from "./routes/authRoutes.js";
import supermarketRoutes from "./routes/supermarketRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

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
            { method: "POST", path: "/api/auth/register", description: "Registrar usuario" },
            { method: "POST", path: "/api/auth/login", description: "Iniciar sesión" },
            { method: "GET", path: "/api/auth/me", description: "Obtener usuario actual (protegido)" },
            { method: "GET", path: "/api/supermarkets", description: "Listar supermercados" },
            { method: "GET", path: "/api/supermarkets/:id", description: "Obtener supermercado por ID" },
            { method: "POST", path: "/api/supermarkets", description: "Crear supermercado (protegido)" }
        ]
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/supermarkets", supermarketRoutes);

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