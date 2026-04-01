import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            const error = new Error('Token no valido.')
            return res.status(401).json({ error: error.message });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (typeof decoded !== "object" || !decoded.id) {
            const error = new Error('Token invalido.')
            return res.status(401).json({ error: error.message });
        }

        const user = await User.findByPk(decoded.id, {
            attributes: ["id", "name", "email"]
        });

        if (!user) {
            const error = new Error('Usuario no encontrado updated.')
            return res.status(401).json({ error: error.message });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Token inválido o expirado" });
    }
};