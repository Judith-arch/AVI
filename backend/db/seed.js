import { db } from "./index.js";
import bcrypt from "bcryptjs";

export async function seedDatabase() {
    try {
        // Verificar si ya hay datos
        const [existingUsers] = await db.query("SELECT COUNT(*) as count FROM users");
        
        if (existingUsers[0].count > 0) {
            console.log("⚠️  La base de datos ya contiene datos. Saltando seed...");
            return;
        }

        console.log("🌱 Iniciando seed de la base de datos...");

        // Hash de contraseñas
        const password1 = await bcrypt.hash("admin123", 10);
        const password2 = await bcrypt.hash("user123", 10);

        // Insertar usuarios
        await db.query(`
            INSERT INTO users (username, email, password) VALUES
            ('admin', 'admin@example.com', ?),
            ('usuario1', 'user1@example.com', ?)
        `, [password1, password2]);

        console.log("✅ Usuarios insertados");

        // Insertar supermercados
        await db.query(`
            INSERT INTO supermarkets (name, address, city) VALUES
            ('Mercadona Centro', 'Calle Mayor 1', 'Barcelona'),
            ('Carrefour Express', 'Av. Diagonal 123', 'Barcelona'),
            ('Lidl Norte', 'Calle Norte 45', 'Madrid')
        `);

        console.log("✅ Supermercados insertados");
        console.log("✅ Seed completado exitosamente");

        // Mostrar credenciales de prueba
        console.log("\n📧 Credenciales de prueba:");
        console.log("   Email: admin@example.com | Password: admin123");
        console.log("   Email: user1@example.com | Password: user123\n");

    } catch (err) {
        console.error("❌ Error durante el seed:", err);
        throw err;
    }
}