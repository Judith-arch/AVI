// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { initDB } from "./db/index.js";
import { seedData } from "./db/seed.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

(async () => {
    try {
        // ⚡ Inicializar DB (crea tablas si no existen)
        const db = await initDB();

        // ⚡ Insertar datos de prueba (seed)
        await seedData(db);

        console.log("Base de datos lista con datos de prueba.");

        // ================== ENDPOINTS ==================
        app.get("/api/hello", (req, res) => {
        res.json({ message: "Hola desde el backend" });
        });

        // Ejemplo: listar categorías
        app.get("/api/categorias", async (req, res) => {
        try {
            const [rows] = await db.query("SELECT * FROM categorias");
            res.json(rows);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Error al obtener categorías" });
        }
        });

        // Ejemplo: listar tiendas
        app.get("/api/tiendas", async (req, res) => {
        try {
            const [rows] = await db.query("SELECT * FROM tiendas");
            res.json(rows);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Error al obtener tiendas" });
        }
        });

        // ================== INICIAR SERVIDOR ==================
        app.listen(PORT, () =>
        console.log(`Servidor corriendo en puerto ${PORT}`)
        );
    } catch (err) {
        console.error("Error al iniciar el servidor:", err);
    }
})();
