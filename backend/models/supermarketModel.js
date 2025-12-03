import { query } from "../db/index.js";

class Supermarket {
    static async findAll() {
        return await query("SELECT * FROM supermarkets ORDER BY name");
    }

    static async findById(id) {
        const results = await query(
            "SELECT * FROM supermarkets WHERE id = ?",
            [id]
        );
        return results[0] || null;
    }

    static async create({ name, address, city }) {
        const result = await query(
            "INSERT INTO supermarkets (name, address, city) VALUES (?, ?, ?)",
            [name, address, city]
        );
        return result.insertId;
    }

    static async searchByCity(city) {
        return await query(
            "SELECT * FROM supermarkets WHERE city LIKE ? ORDER BY name",
            [`%${city}%`]
        );
    }
}

export default Supermarket;