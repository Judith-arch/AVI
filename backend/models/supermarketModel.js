import { query } from "../db/index.js";

class Supermarket {
    static async findAll() {
        return await query("SELECT * FROM supermarkets ORDER BY nombre");
    }

    static async findById(id) {
        const results = await query(
            "SELECT * FROM supermarkets WHERE id = ?",
            [id]
        );
        return results[0] || null;
    }

    static async create({ nombre, direccion, ciudad }) {
        const result = await query(
            "INSERT INTO supermarkets (nombre, direccion, ciudad) VALUES (?, ?, ?)",
            [nombre, direccion, ciudad]
        );
        return result.insertId;
    }

    static async searchByCity(ciudad) {
        return await query(
            "SELECT * FROM supermarkets WHERE ciudad LIKE ? ORDER BY nombre",
            [`%${ciudad}%`]
        );
    }
}

export default Supermarket;