import ShoppingList from "../models/shoppingListModel.js";

class ShoppingListService {
    static async getUserLists(userId) {
        return await ShoppingList.findByUserId(userId);
    }

    static async getListById(listId, userId) {
        const list = await ShoppingList.findByIdWithItems(listId, userId);
        if (!list) {
            throw new Error("Lista no encontrada o no tienes permiso");
        }
        return list;
    }

    static async createList(userId, name) {
        if (!name || name.trim() === "") {
            throw new Error("El nombre de la lista es requerido");
        }

        const listId = await ShoppingList.create(userId, name);
        return await ShoppingList.findByIdWithItems(listId, userId);
    }

    static async addProductToList(listId, userId, productId, quantity = 1) {
        const list = await ShoppingList.findByIdWithItems(listId, userId);
        if (!list) {
            throw new Error("Lista no encontrada o no tienes permiso");
        }

        await ShoppingList.addItem(listId, productId, quantity);
        return await ShoppingList.findByIdWithItems(listId, userId);
    }

    static async toggleItem(itemId, userId, listId) {
        const list = await ShoppingList.findByIdWithItems(listId, userId);
        if (!list) {
            throw new Error("No tienes permiso para modificar esta lista");
        }

        await ShoppingList.toggleItemChecked(itemId);
        return await ShoppingList.findByIdWithItems(listId, userId);
    }

    static async updateQuantity(itemId, userId, listId, quantity) {
        const list = await ShoppingList.findByIdWithItems(listId, userId);
        if (!list) {
            throw new Error("No tienes permiso para modificar esta lista");
        }

        await ShoppingList.updateItemQuantity(itemId, quantity);
        return await ShoppingList.findByIdWithItems(listId, userId);
    }

    static async removeItem(itemId, userId, listId) {
        const list = await ShoppingList.findByIdWithItems(listId, userId);
        if (!list) {
            throw new Error("No tienes permiso para modificar esta lista");
        }

        await ShoppingList.removeItem(itemId);
        return await ShoppingList.findByIdWithItems(listId, userId);
    }

    static async deleteList(listId, userId) {
        await ShoppingList.delete(listId, userId);
        return { message: "Lista eliminada correctamente" };
    }
}

export default ShoppingListService;