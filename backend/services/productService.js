import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";

class ProductService {
    static async getAllProducts(filters = {}) {
        const { category, supermarket, search } = filters;

        if (search) {
            return await Product.search(search);
        }

        if (category) {
            return await Product.findByCategory(category);
        }

        if (supermarket) {
            return await Product.findBySupermarket(supermarket);
        }

        return await Product.findAll();
    }

    static async getProductById(id) {
        const product = await Product.findById(id);
        if (!product) {
            throw new Error("Producto no encontrado");
        }
        return product;
    }

    static async getAllCategories() {
        return await Category.findAll();
    }

    static async createProduct(data) {
        const { name, descripcion, price, unidad_medida, category_id, supermarket_id, image_url } = data;

        if (!name || !price) {
            throw new Error("Nombre y precio son requeridos");
        }

        const id = await Product.create({
            name,
            descripcion,
            price,
            unidad_medida,
            category_id,
            supermarket_id,
            image_url
        });

        return await Product.findById(id);
    }
}

export default ProductService;