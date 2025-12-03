import AuthService from "../services/authService.js";

class AuthController {
    static async register(req, res, next) {
        try {
            const { username, email, password } = req.body;

            if (!username || !email || !password) {
                return res.status(400).json({
                    success: false,
                    message: "Todos los campos son requeridos"
                });
            }

            if (password.length < 6) {
                return res.status(400).json({
                    success: false,
                    message: "La contraseña debe tener al menos 6 caracteres"
                });
            }

            const user = await AuthService.register(username, email, password);

            res.status(201).json({
                success: true,
                message: "Usuario registrado exitosamente",
                data: user
            });
        } catch (error) {
            next(error);
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: "Email y contraseña son requeridos"
                });
            }

            const result = await AuthService.login(email, password);

            res.json({
                success: true,
                message: "Login exitoso",
                data: result
            });
        } catch (error) {
            next(error);
        }
    }

    static async getCurrentUser(req, res, next) {
        try {
            res.json({
                success: true,
                data: req.user
            });
        } catch (error) {
            next(error);
        }
    }
}

export default AuthController;