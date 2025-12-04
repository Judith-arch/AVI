import ProductService from "../services/productService.js";

class ProductController {
    static async getAll(req, res, next) {
        try {
            const { category, supermarket, search } = req.query;
            
            const products = await ProductService.getAllProducts({
                category,
                supermarket,
                search
            });

            res.json({
                success: true,
                count: products.length,
                data: products
            });
        } catch (error) {
            next(error);
        }
    }

    static async getById(req, res, next) {
        try {
            const { id } = req.params;
            const product = await ProductService.getProductById(id);

            res.json({
                success: true,
                data: product
            });
        } catch (error) {
            next(error);
        }
    }

    static async getCategories(req, res, next) {
        try {
            const categories = await ProductService.getAllCategories();

            res.json({
                success: true,
                count: categories.length,
                data: categories
            });
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const product = await ProductService.createProduct(req.body);

            res.status(201).json({
                success: true,
                message: "Producto creado exitosamente",
                data: product
            });
        } catch (error) {
            next(error);
        }
    }
}

export default ProductController;