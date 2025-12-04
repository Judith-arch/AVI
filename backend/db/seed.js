import { db } from "./index.js";
import bcrypt from "bcryptjs";

export async function seedDatabase() {
    try {
        const [existingUsers] = await db.query("SELECT COUNT(*) as count FROM users");
        
        if (existingUsers[0].count > 0) {
            console.log("⚠️  La base de datos ya contiene datos. Saltando seed...");
            return;
        }

        console.log("🌱 Iniciando seed de la base de datos...");

        // 1. Usuarios
        const password1 = await bcrypt.hash("admin123", 10);
        const password2 = await bcrypt.hash("user123", 10);

        await db.query(`
            INSERT INTO users (username, email, password, latitud_favorita, longitud_favorita) VALUES
            ('admin', 'admin@example.com', ?, 41.3851, 2.1734),
            ('usuario1', 'user1@example.com', ?, 41.3879, 2.1699)
        `, [password1, password2]);
        console.log("✅ Usuarios insertados");

        // 2. Categorías
        await db.query(`
            INSERT INTO categories (name, descripcion, icono) VALUES
            ('Frutas y Verduras', 'Productos frescos', '🍎'),
            ('Carnes y Pescados', 'Proteínas', '🥩'),
            ('Lácteos', 'Leche, yogures, quesos', '🥛'),
            ('Panadería', 'Pan y bollería', '🍞'),
            ('Bebidas', 'Refrescos, agua, zumos', '🥤'),
            ('Congelados', 'Productos congelados', '🧊'),
            ('Limpieza', 'Productos de limpieza', '🧹'),
            ('Higiene Personal', 'Cuidado personal', '🧴')
        `);
        console.log("✅ Categorías insertadas");

        // 3. Supermercados
        await db.query(`
            INSERT INTO supermarkets (nombre, cadena, direccion, ciudad, codigo_postal, latitud, longitud, telefono, horario_apertura, horario_cierre) VALUES
            ('Mercadona Centro', 'Mercadona', 'Calle Mayor 1', 'Barcelona', '08001', 41.3851, 2.1734, '933334455', '09:00:00', '21:30:00'),
            ('Carrefour Express', 'Carrefour', 'Av. Diagonal 123', 'Barcelona', '08028', 41.3879, 2.1699, '933445566', '08:00:00', '22:00:00'),
            ('Lidl Norte', 'Lidl', 'Calle Norte 45', 'Madrid', '28001', 40.4168, -3.7038, '912223344', '09:00:00', '21:00:00'),
            ('DIA Valencia', 'DIA', 'Calle Valencia 89', 'Valencia', '46001', 39.4699, -0.3763, '963334455', '09:00:00', '21:00:00')
        `);
        console.log("✅ Supermercados insertados");

        // 4. Productos
        await db.query(`
            INSERT INTO products (name, descripcion, price, unidad_medida, category_id, supermarket_id) VALUES
            ('Manzanas Golden', 'Manzanas frescas origen España', 2.50, 'kg', 1, 1),
            ('Plátanos', 'Plátanos de Canarias', 1.80, 'kg', 1, 1),
            ('Tomates', 'Tomates maduros', 3.20, 'kg', 1, 2),
            ('Lechuga Iceberg', 'Lechuga fresca', 1.50, 'unidad', 1, 2),
            ('Pechuga de Pollo', 'Pechuga de pollo fresca', 5.90, 'kg', 2, 1),
            ('Salmón Fresco', 'Salmón noruego', 12.50, 'kg', 2, 2),
            ('Leche Entera 1L', 'Leche entera', 0.95, 'litro', 3, 1),
            ('Yogur Natural Pack 4', 'Yogures naturales', 2.30, 'pack', 3, 2),
            ('Pan de Molde', 'Pan de molde integral', 1.20, 'paquete', 4, 1),
            ('Croissants Pack 6', 'Croissants de mantequilla', 2.80, 'pack', 4, 2),
            ('Agua Mineral 1.5L', 'Agua mineral natural', 0.40, 'botella', 5, 1),
            ('Coca Cola 2L', 'Refresco de cola', 1.85, 'botella', 5, 3),
            ('Pizza 4 Quesos', 'Pizza congelada', 3.50, 'unidad', 6, 2),
            ('Helado Vainilla 1L', 'Helado de vainilla', 4.20, 'tarrina', 6, 3),
            ('Detergente Líquido', 'Detergente para ropa', 6.50, 'botella', 7, 1),
            ('Lavavajillas', 'Líquido lavavajillas', 3.90, 'botella', 7, 4),
            ('Champú Suave', 'Champú para cabello', 4.50, 'bote', 8, 2),
            ('Gel de Baño', 'Gel de ducha', 3.20, 'bote', 8, 4)
        `);
        console.log("✅ Productos insertados");

        console.log("✅ Seed completado exitosamente");
        console.log("\n📧 Credenciales de prueba:");
        console.log("   Email: admin@example.com | Password: admin123");
        console.log("   Email: user1@example.com | Password: user123\n");

    } catch (err) {
        console.error("❌ Error durante el seed:", err);
        throw err;
    }
}