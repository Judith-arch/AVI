import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const DB_NAME = process.env.DB_NAME || "avi";
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_HOST = process.env.DB_HOST || "localhost";

let db;

export async function initDB() {
    try {
        // Paso 1: Conectar al servidor MySQL (sin seleccionar DB)
        const connection = await mysql.createConnection({
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASSWORD
        });

        // Paso 2: Crear la base de datos si no existe
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
        console.log(`✅ Base de datos '${DB_NAME}' verificada/creada`);
        await connection.end();

        // Paso 3: Conectarse a la base de datos
        db = await mysql.createConnection({
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASSWORD,
            database: DB_NAME
        });

        console.log(`✅ Conectado a la base de datos: ${DB_NAME}`);

        // Paso 4: Crear tablas
        await createTables();

        return db;

    } catch (err) {
        console.error("❌ Error al inicializar DB:", err);
        throw err;
    }
}

async function createTables() {
    try {
        // Tabla users
        await db.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) NOT NULL,
                email VARCHAR(100) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Tabla supermarkets (ejemplo)
        await db.query(`
            CREATE TABLE IF NOT EXISTS supermarkets (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                address VARCHAR(255) NOT NULL,
                city VARCHAR(100) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        console.log("✅ Tablas creadas/verificadas");

    } catch (err) {
        console.error("❌ Error al crear tablas:", err);
        throw err;
    }
}

// Función helper para ejecutar queries
export async function query(sql, params = []) {
    if (!db) {
        throw new Error("❌ Database not initialized. Call initDB() first.");
    }
    try {
        const [results] = await db.query(sql, params);
        return results;
    } catch (error) {
        console.error("❌ Query error:", error);
        throw error;
    }
}

// Cerrar conexión
export async function closeDB() {
    if (db) {
        await db.end();
        console.log("🔌 Conexión a DB cerrada");
    }
}

export { db };