import { query } from "../db/index.js";

class Product {
    static async findAll() {
        return await query(`
            SELECT
                p.*,
                c.name as category_name,
                s.nombre as supermarket_name,
                s.ciudad as supermarket_city
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
            LEFT JOIN supermarkets s ON p.supermarket_id = s.id
            ORDER BY p.name
        `);
    }

    static async findById(id) {
        const results = await query(`
            SELECT
                p.*,
                c.name as category_name,
                s.nombre as supermarket_name,
                s.direccion as supermarket_address,
                s.ciudad as supermarket_city
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
            LEFT JOIN supermarkets s ON p.supermarket_id = s.id
            WHERE p.id = ?
        `, [id]);
        return results[0] || null;
    }

    static async findByCategory(categoryId) {
        return await query(`
            SELECT
                p.*,
                c.name as category_name,
                s.nombre as supermarket_name
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
            LEFT JOIN supermarkets s ON p.supermarket_id = s.id
            WHERE p.category_id = ?
            ORDER BY p.name
        `, [categoryId]);
    }

    static async findBySupermarket(supermarketId) {
        return await query(`
            SELECT
                p.*,
                c.name as category_name,
                s.nombre as supermarket_name
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
            LEFT JOIN supermarkets s ON p.supermarket_id = s.id
            WHERE p.supermarket_id = ?
            ORDER BY p.name
        `, [supermarketId]);
    }

    static async search(searchTerm) {
        return await query(`
            SELECT
                p.*,
                c.name as category_name,
                s.nombre as supermarket_name
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
            LEFT JOIN supermarkets s ON p.supermarket_id = s.id
            WHERE p.name LIKE ? OR p.descripcion LIKE ?
            ORDER BY p.name
        `, [`%${searchTerm}%`, `%${searchTerm}%`]);
    }

    static async create({ name, descripcion, price, unidad_medida, category_id, supermarket_id, image_url }) {
        const result = await query(
            "INSERT INTO products (name, descripcion, price, unidad_medida, category_id, supermarket_id, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [name, descripcion, price, unidad_medida, category_id, supermarket_id, image_url]
        );
        return result.insertId;
    }
}

export default Product;