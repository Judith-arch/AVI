import { query } from "../db/index.js";

class ShoppingList {
    static async findByUserId(userId) {
        return await query(`
            SELECT
                sl.*,
                COUNT(sli.id) as items_count,
                SUM(p.price * sli.quantity) as total_price
            FROM shopping_lists sl
            LEFT JOIN shopping_list_items sli ON sl.id = sli.shopping_list_id
            LEFT JOIN products p ON sli.product_id = p.id
            WHERE sl.user_id = ?
            GROUP BY sl.id
            ORDER BY sl.created_at DESC
        `, [userId]);
    }

    static async findByIdWithItems(listId, userId) {
        const list = await query(
            "SELECT * FROM shopping_lists WHERE id = ? AND user_id = ?",
            [listId, userId]
        );

        if (!list || list.length === 0) {
            return null;
        }

        const items = await query(`
            SELECT
                sli.*,
                p.name as product_name,
                p.descripcion as product_description,
                p.price as product_price,
                p.unidad_medida,
                p.image_url,
                c.name as category_name,
                s.nombre as supermarket_name,
                (p.price * sli.quantity) as subtotal
            FROM shopping_list_items sli
            JOIN products p ON sli.product_id = p.id
            LEFT JOIN categories c ON p.category_id = c.id
            LEFT JOIN supermarkets s ON p.supermarket_id = s.id
            WHERE sli.shopping_list_id = ?
            ORDER BY sli.added_at DESC
        `, [listId]);

        return {
            ...list[0],
            items
        };
    }

    static async create(userId, name) {
        const result = await query(
            "INSERT INTO shopping_lists (user_id, name) VALUES (?, ?)",
            [userId, name]
        );
        return result.insertId;
    }

    static async addItem(listId, productId, quantity = 1) {
        const existing = await query(
            "SELECT * FROM shopping_list_items WHERE shopping_list_id = ? AND product_id = ?",
            [listId, productId]
        );

        if (existing.length > 0) {
            await query(
                "UPDATE shopping_list_items SET quantity = quantity + ? WHERE shopping_list_id = ? AND product_id = ?",
                [quantity, listId, productId]
            );
            return existing[0].id;
        } else {
            const result = await query(
                "INSERT INTO shopping_list_items (shopping_list_id, product_id, quantity) VALUES (?, ?, ?)",
                [listId, productId, quantity]
            );
            return result.insertId;
        }
    }

    static async toggleItemChecked(itemId) {
        await query(
            "UPDATE shopping_list_items SET checked = NOT checked WHERE id = ?",
            [itemId]
        );
    }

    static async updateItemQuantity(itemId, quantity) {
        await query(
            "UPDATE shopping_list_items SET quantity = ? WHERE id = ?",
            [quantity, itemId]
        );
    }

    static async removeItem(itemId) {
        await query("DELETE FROM shopping_list_items WHERE id = ?", [itemId]);
    }

    static async delete(listId, userId) {
        await query(
            "DELETE FROM shopping_lists WHERE id = ? AND user_id = ?",
            [listId, userId]
        );
    }
}

export default ShoppingList;