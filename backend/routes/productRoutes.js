import express from "express";
import ProductController from "../controllers/productController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Rutas públicas (respetar orden que sino peta)
router.get("/categories", ProductController.getCategories);  // ⭐ ESTA PRIMERO
router.get("/:id", ProductController.getById);               // Esta después
router.get("/", ProductController.getAll);

// Rutas protegidas
router.post("/", authMiddleware, ProductController.create);

export default router;