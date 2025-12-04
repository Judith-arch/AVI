import { query } from "../db/index.js";

class Category {
    static async findAll() {
        return await query("SELECT * FROM categories ORDER BY name");
    }

    static async findById(id) {
        const results = await query("SELECT * FROM categories WHERE id = ?", [id]);
        return results[0] || null;
    }

    static async create(name, descripcion, icono) {
        const result = await query(
            "INSERT INTO categories (name, descripcion, icono) VALUES (?, ?, ?)",
            [name, descripcion, icono]
        );
        return result.insertId;
    }
}

export default Category;