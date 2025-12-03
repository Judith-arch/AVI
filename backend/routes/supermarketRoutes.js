import express from "express";
import SupermarketController from "../controllers/supermarketController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Rutas públicas
router.get("/", SupermarketController.getAll);
router.get("/:id", SupermarketController.getById);

// Rutas protegidas
router.post("/", authMiddleware, SupermarketController.create);

export default router;