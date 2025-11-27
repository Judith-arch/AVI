import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const DB_NAME = process.env.DB_NAME || "mitienda";
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_HOST = process.env.DB_HOST || "localhost";

let db;

async function initDB() {
    try {
        // ==================================================================================
        // ❌ SE COMENTA LA CREACIÓN AUTOMÁTICA DE LA BASE DE DATOS
        // ==================================================================================
        /*
        const connection = await mysql.createConnection({
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASSWORD
        });

        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
        console.log(`Base de datos "${DB_NAME}" lista.`);
        */

        // ==================================================================================
        // ✅ SOLO SE CONECTA A LA BASE DE DATOS (YA DEBE EXISTIR)
        // ==================================================================================
        db = await mysql.createConnection({
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASSWORD,
            database: DB_NAME
        });
        console.log("Conectado a la base de datos.");

        // ==================================================================================
        // ❌ SE COMENTA LA CREACIÓN AUTOMÁTICA DE TABLAS
        // ==================================================================================
        /*
        await db.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT PRIMARY KEY AUTO_INCREMENT,
                username VARCHAR(50) NOT NULL,
                email VARCHAR(100) NOT NULL,
                password VARCHAR(100) NOT NULL
            )
        `);

        console.log("Tabla 'users' lista.");
        */

    } catch (error) {
        console.error("Error al inicializar la DB:", error);
    }
}

// Inicializar DB
await initDB();

// ================== ENDPOINTS ==================

app.get("/api/hello", (req, res) => {
    res.json({ message: "Hola desde el backend" });
});

// Registrar usuario
app.post("/api/register", async (req, res) => {
    const { username, email, password } = req.body;
    try {
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

// Listar usuarios
app.get("/api/users", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM users");
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener usuarios" });
    }
});

// ================== INICIAR SERVIDOR ==================
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));


