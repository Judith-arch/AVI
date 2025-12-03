import Supermarket from "../models/supermarketModel.js";

class SupermarketService {
    static async getAllSupermarkets() {
        return await Supermarket.findAll();
    }

    static async getSupermarketById(id) {
        const supermarket = await Supermarket.findById(id);
        if (!supermarket) {
            throw new Error("Supermercado no encontrado");
        }
        return supermarket;
    }

    static async createSupermarket(data) {
        const { name, address, city } = data;

        if (!name || !address || !city) {
            throw new Error("Faltan datos requeridos");
        }

        const id = await Supermarket.create({ name, address, city });
        return await Supermarket.findById(id);
    }

    static async searchByCity(city) {
        return await Supermarket.searchByCity(city);
    }
}

export default SupermarketService;