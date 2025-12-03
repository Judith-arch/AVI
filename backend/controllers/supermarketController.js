import SupermarketService from "../services/supermarketService.js";

class SupermarketController {
    static async getAll(req, res, next) {
        try {
            const { city } = req.query;

            let supermarkets;
            if (city) {
                supermarkets = await SupermarketService.searchByCity(city);
            } else {
                supermarkets = await SupermarketService.getAllSupermarkets();
            }

            res.json({
                success: true,
                count: supermarkets.length,
                data: supermarkets
            });
        } catch (error) {
            next(error);
        }
    }

    static async getById(req, res, next) {
        try {
            const { id } = req.params;
            const supermarket = await SupermarketService.getSupermarketById(id);

            res.json({
                success: true,
                data: supermarket
            });
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const supermarket = await SupermarketService.createSupermarket(req.body);

            res.status(201).json({
                success: true,
                message: "Supermercado creado exitosamente",
                data: supermarket
            });
        } catch (error) {
            next(error);
        }
    }
}

export default SupermarketController;