import express from "express";
import ShoppingListController from "../controllers/shoppingListController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(authMiddleware);

router.get("/", ShoppingListController.getUserLists);
router.post("/", ShoppingListController.create);
router.get("/:id", ShoppingListController.getListById);
router.delete("/:id", ShoppingListController.delete);

router.post("/:id/items", ShoppingListController.addProduct);
router.patch("/:listId/items/:itemId/toggle", ShoppingListController.toggleItem);
router.patch("/:listId/items/:itemId/quantity", ShoppingListController.updateQuantity);
router.delete("/:listId/items/:itemId", ShoppingListController.removeItem);

export default router;