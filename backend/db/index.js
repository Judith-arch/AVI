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
                latitud_favorita DECIMAL(10, 8), -- Ubicación guardada del usuario
                longitud_favorita DECIMAL(11, 8),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Tabla supermarkets (ejemplo)
        await db.query(`
            CREATE TABLE IF NOT EXISTS supermarkets (
                id INT PRIMARY KEY AUTO_INCREMENT,
                nombre VARCHAR(100) NOT NULL,
                cadena VARCHAR(100),
                direccion VARCHAR(255) NOT NULL,
                ciudad VARCHAR(100) NOT NULL,
                codigo_postal VARCHAR(10),
                latitud DECIMAL(10, 8) NOT NULL,
                longitud DECIMAL(11, 8) NOT NULL,
                telefono VARCHAR(20),
                horario_apertura TIME,
                horario_cierre TIME,
                activa BOOLEAN DEFAULT TRUE,
                fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Tabla categories
        await db.query(`
            CREATE TABLE IF NOT EXISTS categories (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL UNIQUE,
                descripcion TEXT,
                icono VARCHAR(50),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Tabla products
        await db.query(`
            CREATE TABLE IF NOT EXISTS products (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(200) NOT NULL,
                descripcion TEXT,
                price DECIMAL(10, 2) NOT NULL,
                unidad_medida VARCHAR(20),
                category_id INT,
                supermarket_id INT,
                image_url VARCHAR(500),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
                FOREIGN KEY (supermarket_id) REFERENCES supermarkets(id) ON DELETE SET NULL
            )
        `);

        // Tabla shopping_lists
        await db.query(`
            CREATE TABLE IF NOT EXISTS shopping_lists (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                name VARCHAR(200) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);

        // Tabla shopping_list_items
        await db.query(`
            CREATE TABLE IF NOT EXISTS shopping_list_items (
                id INT AUTO_INCREMENT PRIMARY KEY,
                shopping_list_id INT NOT NULL,
                product_id INT NOT NULL,
                quantity INT DEFAULT 1,
                checked BOOLEAN DEFAULT FALSE,
                added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (shopping_list_id) REFERENCES shopping_lists(id) ON DELETE CASCADE,
                FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
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