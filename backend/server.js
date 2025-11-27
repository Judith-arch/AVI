import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

/* ============================================================
    🔧 CONFIGURACIÓN DE VARIABLES PARA LA BASE DE DATOS
    Estas variables toman los valores del archivo .env, y si no,
    usan valores por defecto.
============================================================ */
const DB_NAME = process.env.DB_NAME || "mitienda";
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_HOST = process.env.DB_HOST || "localhost";

/*
    ============================================================
    🗄️ VARIABLE GLOBAL PARA GUARDAR LA CONEXIÓN MYSQL
============================================================ */
let db;

/* ============================================================
    🚀 FUNCIÓN PARA INICIALIZAR LA BASE DE DATOS
    Esta función:
    1. Se conecta a MySQL SIN seleccionar base de datos.
    2. Crea la base de datos si no existe.
    3. Se conecta nuevamente ya seleccionando la base.
    4. Crea la tabla `users` si no existe.
============================================================ */
async function initDB() {
    try {
        // 1️⃣ Conexión inicial SIN seleccionar base de datos
        // Se necesita así para poder crearla si no existe
        const connection = await mysql.createConnection({
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASSWORD
        });

        // 2️⃣ Crear la base de datos si no existe
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
        console.log(`Base de datos "${DB_NAME}" lista.`);

        // 3️⃣ Crear ahora la conexión DEFINITIVA ya usando la base creada
        db = await mysql.createConnection({
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASSWORD,
            database: DB_NAME
        });

        // 4️⃣ Crear tabla `users` si no existe
        // Esta tabla almacenará los usuarios registrados en el sistema
        await db.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT PRIMARY KEY AUTO_INCREMENT,
                username VARCHAR(50) NOT NULL,
                email VARCHAR(100) NOT NULL,
                password VARCHAR(100) NOT NULL
            )
        `);

        console.log("Tabla 'users' lista.");
        
    } catch (error) {
        console.error("Error al inicializar la DB:", error);
    }
}

/* ============================================================
    🏁 INICIALIZAR BASE DE DATOS AL INICIAR EL SERVIDOR
============================================================ */
await initDB();

/* ============================================================
    ===============           ENDPOINTS          ===============
============================================================ */

// Endpoint de prueba
app.get("/api/hello", (req, res) => {
    res.json({ message: "Hola desde el backend" });
});

// 📌 Registrar usuario
app.post("/api/register", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Insertar el usuario en la tabla "users"
        await db.query(
            "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
            [username, email, password]
        );

        res.status(201).json({ message: "Usuario registrado" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al registrar usuario" });
    }
});

// 📌 Obtener todos los usuarios (solo ejemplo)
app.get("/api/users", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM users");
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener usuarios" });
    }
});

/* ============================================================
    🚀 INICIAR SERVIDOR
============================================================ */
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

