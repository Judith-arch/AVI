// db/seed.js
export async function seedData(db) {
    try {
        // Categorías
        await db.query(`
        INSERT INTO categorias (nombre, descripcion, icono) VALUES
        ('Frutas y Verduras', 'Productos frescos', 'apple'),
        ('Lácteos', 'Leche, queso, yogur', 'milk'),
        ('Panadería', 'Pan y bollería', 'bread'),
        ('Carnes', 'Carnes frescas y procesadas', 'meat'),
        ('Bebidas', 'Agua, refrescos, zumos', 'drink')
        ON DUPLICATE KEY UPDATE nombre=VALUES(nombre);
        `);

        // Tiendas
        await db.query(`
        INSERT INTO tiendas (nombre, cadena, direccion, ciudad, codigo_postal, latitud, longitud, telefono) VALUES
        ('Mercadona Gracia', 'Mercadona', 'Calle Gran de Gràcia 123', 'Barcelona', '08012', 41.403629, 2.158680, '932123456'),
        ('Carrefour Express Eixample', 'Carrefour', 'Passeig de Gràcia 45', 'Barcelona', '08007', 41.391900, 2.165850, '933456789'),
        ('Lidl Diagonal', 'Lidl', 'Avinguda Diagonal 500', 'Barcelona', '08006', 41.395500, 2.153000, '934567890')
        ON DUPLICATE KEY UPDATE nombre=VALUES(nombre);
        `);

        // Productos
        await db.query(`
        INSERT INTO productos (nombre, marca, categoria_id, codigo_barras, unidad_medida) VALUES
        ('Leche Entera', 'Hacendado', 2, '8480000123456', 'litros'),
        ('Pan de Molde', 'Bimbo', 3, '8410000123456', 'unidades'),
        ('Manzanas Golden', 'Sin marca', 1, '8420000123456', 'kg'),
        ('Agua Mineral', 'Font Vella', 5, '8430000123456', 'litros')
        ON DUPLICATE KEY UPDATE nombre=VALUES(nombre);
        `);

        // Precios
        await db.query(`
        INSERT INTO precios (producto_id, tienda_id, precio, en_stock) VALUES
        (1, 1, 0.95, TRUE),
        (1, 2, 1.05, TRUE),
        (1, 3, 0.89, TRUE),
        (2, 1, 1.20, TRUE),
        (2, 2, 1.35, TRUE),
        (3, 1, 2.50, TRUE),
        (3, 3, 2.30, TRUE),
        (4, 1, 0.35, TRUE),
        (4, 2, 0.40, TRUE),
        (4, 3, 0.32, TRUE)
        ON DUPLICATE KEY UPDATE precio=VALUES(precio);
        `);

        console.log("Datos de prueba insertados correctamente.");

    } catch (err) {
        console.error("Error al insertar datos de prueba:", err);
    }
}
