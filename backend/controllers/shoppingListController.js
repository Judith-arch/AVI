import ShoppingListService from "../services/shoppingListService.js";

class ShoppingListController {
    static async getUserLists(req, res, next) {
        try {
            const userId = req.user.id;
            const lists = await ShoppingListService.getUserLists(userId);

            res.json({
                success: true,
                count: lists.length,
                data: lists
            });
        } catch (error) {
            next(error);
        }
    }

    static async getListById(req, res, next) {
        try {
            const userId = req.user.id;
            const { id } = req.params;

            const list = await ShoppingListService.getListById(id, userId);

            res.json({
                success: true,
                data: list
            });
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const userId = req.user.id;
            const { name } = req.body;

            const list = await ShoppingListService.createList(userId, name);

            res.status(201).json({
                success: true,
                message: "Lista creada exitosamente",
                data: list
            });
        } catch (error) {
            next(error);
        }
    }

    static async addProduct(req, res, next) {
        try {
            const userId = req.user.id;
            const { id } = req.params;
            const { product_id, quantity } = req.body;

            if (!product_id) {
                return res.status(400).json({
                    success: false,
                    message: "product_id es requerido"
                });
            }

            const list = await ShoppingListService.addProductToList(
                id,
                userId,
                product_id,
                quantity || 1
            );

            res.json({
                success: true,
                message: "Producto añadido a la lista",
                data: list
            });
        } catch (error) {
            next(error);
        }
    }

    static async toggleItem(req, res, next) {
        try {
            const userId = req.user.id;
            const { listId, itemId } = req.params;

            const list = await ShoppingListService.toggleItem(itemId, userId, listId);

            res.json({
                success: true,
                message: "Estado del item actualizado",
                data: list
            });
        } catch (error) {
            next(error);
        }
    }

    static async updateQuantity(req, res, next) {
        try {
            const userId = req.user.id;
            const { listId, itemId } = req.params;
            const { quantity } = req.body;

            if (!quantity || quantity < 1) {
                return res.status(400).json({
                    success: false,
                    message: "Cantidad inválida"
                });
            }

            const list = await ShoppingListService.updateQuantity(
                itemId,
                userId,
                listId,
                quantity
            );

            res.json({
                success: true,
                message: "Cantidad actualizada",
                data: list
            });
        } catch (error) {
            next(error);
        }
    }

    static async removeItem(req, res, next) {
        try {
            const userId = req.user.id;
            const { listId, itemId } = req.params;

            const list = await ShoppingListService.removeItem(itemId, userId, listId);

            res.json({
                success: true,
                message: "Producto eliminado de la lista",
                data: list
            });
        } catch (error) {
            next(error);
        }
    }

    static async delete(req, res, next) {
        try {
            const userId = req.user.id;
            const { id } = req.params;

            await ShoppingListService.deleteList(id, userId);

            res.json({
                success: true,
                message: "Lista eliminada correctamente"
            });
        } catch (error) {
            next(error);
        }
    }
}

export default ShoppingListController;