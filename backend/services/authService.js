import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

class AuthService {
    static async register(username, email, password) {
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            throw new Error("El email ya está registrado");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userId = await User.create({
            username,
            email,
            password: hashedPassword
        });

        const user = await User.findById(userId);
        return user;
    }

    static async login(email, password) {
        const user = await User.findByEmail(email);
        if (!user) {
            throw new Error("Credenciales inválidas");
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw new Error("Credenciales inválidas");
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                username: user.username
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || "24h" }
        );

        return {
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        };
    }
}

export default AuthService;