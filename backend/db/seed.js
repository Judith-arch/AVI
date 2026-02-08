import { db } from "./index.js";
import bcrypt from "bcryptjs";
import fs from "fs/promises";
import path from "path";

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
            ('Lácteos', 'Leche, quesos y derivados', '🥛'),
            ('Limpieza y hogar', 'Productos para el hogar', '🧹'),
            ('Maquillaje', 'Productos de cosmética', '💄'),
            ('Marisco y pescado', 'Pescados y mariscos frescos', '🐟'),
            ('Mascotas', 'Productos para animales', '🐾'),
            ('Panadería y pastelería', 'Panes, bollería y repostería', '🍞'),
            ('Pizzas y platos preparados', 'Comida lista para calentar o servir', '🍕'),
            ('Postres y yogures', 'Postres fríos y yogures', '🍮'),
            ('Zumos', 'Zumos y bebidas naturales', '🧃')
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

        // 4. Productos desde archivo JSON
        await importProductsFromJSON();

        console.log("✅ Seed completado exitosamente");
        console.log("\n📧 Credenciales de prueba:");
        console.log("   Email: admin@example.com | Password: admin123");
        console.log("   Email: user1@example.com | Password: user123\n");

    } catch (err) {
        console.error("❌ Error durante el seed:", err);
        throw err;
    }
}

async function importProductsFromJSON() {
    try {
        // Lee el archivo JSON
        const jsonPath = path.join(process.cwd(), 'db', 'data', 'products_mercadona.json');
        const jsonData = await fs.readFile(jsonPath, 'utf-8');
        const products = JSON.parse(jsonData);

        console.log(`📦 Importando ${products.length} productos desde JSON...`);

        // Filtrar productos con datos válidos
        const validProducts = products.filter(product => {
            const isValid = product.name &&
                            product.price &&
                            product.category_id !== '' &&
                            product.category_id !== null &&
                            product.supermarket_id !== '' &&
                            product.supermarket_id !== null;
            
            if (!isValid) {
                console.log(`   ⚠️  Producto omitido (datos incompletos): ${product.name || 'Sin nombre'}`);
            }
            return isValid;
        });

        console.log(`📦 ${validProducts.length} productos válidos de ${products.length} totales`);

        // Insertar productos en lotes para mejor rendimiento
        const batchSize = 50;
        let insertedCount = 0;

        for (let i = 0; i < validProducts.length; i += batchSize) {
            const batch = validProducts.slice(i, i + batchSize);
            
            // Construir query con placeholders
            const values = [];
            const placeholders = batch.map(product => {
                values.push(
                    product.name,
                    product.descripcion || null,
                    product.price,
                    product.unidad_media || 'unidad',
                    parseInt(product.category_id) || 1,
                    parseInt(product.supermarket_id) || 1,
                    product.image_url || null
                );
                return '(?, ?, ?, ?, ?, ?, ?)';
            }).join(', ');

            const query = `
                INSERT INTO products (name, descripcion, price, unidad_medida, category_id, supermarket_id, image_url)
                VALUES ${placeholders}
            `;

            await db.query(query, values);
            insertedCount += batch.length;
            
            console.log(`   ⏳ Insertados ${insertedCount}/${validProducts.length} productos...`);
        }

        console.log(`✅ ${insertedCount} productos importados correctamente`);
        
        const skippedCount = products.length - validProducts.length;
        if (skippedCount > 0) {
            console.log(`⚠️  ${skippedCount} productos omitidos por datos incompletos`);
        }

    } catch (err) {
        if (err.code === 'ENOENT') {
            console.log('⚠️  Archivo products_mercadona.json no encontrado. Usando productos por defecto...');
            await insertDefaultProducts();
        } else {
            throw err;
        }
    }
}

async function insertDefaultProducts() {
    // Productos por defecto en caso de que no exista el archivo JSON
    await db.query(`
        INSERT INTO products (name, descripcion, price, unidad_medida, category_id, supermarket_id, image_url) VALUES
        ('Manzanas Golden', 'Manzanas frescas origen España', 2.50, 'kg', 1, 1, NULL),
        ('Plátanos', 'Plátanos de Canarias', 1.80, 'kg', 1, 1, NULL),
        ('Tomates', 'Tomates maduros', 3.20, 'kg', 1, 2, NULL),
        ('Lechuga Iceberg', 'Lechuga fresca', 1.50, 'unidad', 1, 2, NULL),
        ('Pechuga de Pollo', 'Pechuga de pollo fresca', 5.90, 'kg', 2, 1, NULL),
        ('Salmón Fresco', 'Salmón noruego', 12.50, 'kg', 2, 2, NULL),
        ('Leche Entera 1L', 'Leche entera', 0.95, 'litro', 3, 1, NULL),
        ('Yogur Natural Pack 4', 'Yogures naturales', 2.30, 'pack', 3, 2, NULL)
    `);
    console.log("✅ Productos por defecto insertados");
}