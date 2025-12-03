import { query } from "../db/index.js";

class User {
    static async findByEmail(email) {
        const results = await query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );
        return results[0] || null;
    }

    static async findById(id) {
        const results = await query(
            "SELECT id, username, email, created_at FROM users WHERE id = ?",
            [id]
        );
        return results[0] || null;
    }

    static async create({ username, email, password }) {
        const result = await query(
            "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
            [username, email, password]
        );
        return result.insertId;
    }

    static async emailExists(email) {
        const results = await query(
            "SELECT COUNT(*) as count FROM users WHERE email = ?",
            [email]
        );
        return results[0].count > 0;
    }

    static async findAll() {
        return await query(
            "SELECT id, username, email, created_at FROM users"
        );
    }
}

export default User;