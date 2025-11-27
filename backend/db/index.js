import mysql from "mysql2/promise";
import { schema, syncSchema } from "./schema.js";

const DB_NAME = process.env.DB_NAME || "avi";
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "55cf58e7G&";
const DB_HOST = process.env.DB_HOST || "localhost";

let db;

export async function initDB() {
    try {
        // Conectar al servidor sin DB
        const connection = await mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD
        });

        // Crear base de datos si no existe
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);

        // Conectar ya a la base de datos
        db = await mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME
        });

        console.log("Conectado a la base de datos:", DB_NAME);

        // ⚡ Aquí sincronizamos todas las tablas
        await syncSchema(db, schema);

        return db;

    } catch (err) {
        console.error("Error al inicializar DB:", err);
        throw err;
    }
}

export { db };
