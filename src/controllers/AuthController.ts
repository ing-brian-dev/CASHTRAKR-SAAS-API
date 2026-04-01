import type { Request, Response } from "express";
import User from "../models/User";
import { checkPassword, hashPassword } from "../utils/auth";
import { generateToken } from "../utils/token";
import { AuthEmail } from "../emails/AuthEmail";
import { generateJWT } from "../utils/jwt";

export class AuthController {
    static createAccount = async (req: Request, res: Response) => {
        try {

            const { email, password } = req.body;
            const userExists = await User.findOne({ where: { email } });
            if (userExists) {
                const error = new Error('El usuario ya existe.');
                return res.status(409).json({ error: error.message });
            }

            const user = new User(req.body);
            user.token = generateToken();
            user.password = await hashPassword(password);

            await Promise.all([
                user.save(),
                AuthEmail.sendConfirmationEmail({
                    name: user.name,
                    email: user.email,
                    token: user.token
                })
            ]);

            return res.status(201).json("Usuario creado correctamente.");
        } catch (error) {
            return res.status(500).json({ error: "Hubo un error" });
        }
    }

    static confirmAccount = async (req: Request, res: Response) => {
        try {
            const { token } = req.body;

            const tokenExists = await User.findOne({ where: { token } });
            if (!tokenExists) {
                const error = new Error('Token no válido.');
                return res.status(401).json({ error: error.message });
            }

            tokenExists.confirmed = true;
            tokenExists.token = null;
            await tokenExists.save();

            return res.status(201).json("Cuenta confirmada correctamente.");
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Hubo un error" });
        }
    }

    static login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;

            const userExists = await User.findOne({ where: { email } });

            if (!userExists) {
                const error = new Error('Usuario no encontrado.');
                return res.status(404).json({ error: error.message });
            }

            if (!userExists.confirmed) {
                const error = new Error('Cuenta no confirmada.');
                return res.status(403).json({ error: error.message });
            }

            if (!await checkPassword(password, userExists.password)) {
                const error = new Error('Password incorrecto.');
                return res.status(401).json({ error: error.message });
            }

            return res.status(200).json(generateJWT(userExists.id));
        } catch (error) {
            return res.status(500).json({ error: "Hubo un error" });
        }
    }

    static forgotPassword = async (req: Request, res: Response) => {
        try {
            const { email } = req.body;

            const userExists = await User.findOne({ where: { email } });
            if (!userExists) {
                const error = new Error('Usuario no encontrado.');
                return res.status(404).json({ error: error.message });
            }

            userExists.token = generateToken();
            await Promise.all([
                userExists.save(),
                AuthEmail.sendPasswordResetToken({
                    name: userExists.name,
                    email: userExists.email,
                    token: userExists.token
                })
            ]);

            return res.status(200).json('Revisa tu email para instrucciones.');
        } catch (error) {
            return res.status(500).json({ error: "Hubo un error" });
        }
    }

    static validateToken = async (req: Request, res: Response) => {
        try {
            const { token } = req.body;

            const tokenExists = await User.findOne({ where: { token } });

            if (!tokenExists) {
                const error = new Error('Token no valido.');
                return res.status(404).json({ error: error.message });
            }

            return res.status(200).json('Token valido, asigna un nuevo password');
        } catch (error) {
            return res.status(500).json({ error: "Hubo un error" });
        }
    }

    static resetPasswordWithToken = async (req: Request, res: Response) => {
        try {
            const { token } = req.params;
            const { password } = req.body;

            const tokenExists = await User.findOne({ where: { token } });
            if (!tokenExists) {
                const error = new Error('Token no valido');
                return res.status(404).json({ error: error.message });
            }

            tokenExists.password = await hashPassword(password);
            tokenExists.token = null;
            await tokenExists.save();

            return res.status(200).json('Password modificado correctamente.')
        } catch (error) {
            return res.status(500).json({ error: "Hubo un error" });
        }
    }

    static user = async (req: Request, res: Response) => {
        return res.status(200).json(req.user);
    }

    static updateCurrentUserPassword = async (req: Request, res: Response) => {
        const { current_password, new_password } = req.body;
        const user = await User.findByPk(req.user.id);

        if (!await checkPassword(current_password, user.password)) {
            const error = new Error('Password actual incorrecto.');
            return res.status(401).json({ error: error.message });
        }

        user.password = await hashPassword(new_password);
        await user.save();
        return res.status(200).json('Password modificado correctamente.')
    }

    static updateUser = async (req: Request, res: Response) => {
        try {
            const { name, email } = req.body;

            const userExisting = await User.findOne({ where: { email }, attributes: ['id', 'name', 'email'] });
            if (userExisting && userExisting.id !== req.user.id) {
                const error = new Error(`El correo ${userExisting.email} ya existe.`)
                return res.status(409).json({ error: error.message });
            }

            await User.update({ name, email }, {
                where: { id: req.user.id }
            })

            return res.status(200).json("Usuario actualizado correctamente.")
        } catch (error) {
            return res.status(500).json({ error: "Hubo un error" });
        }
    }

    static checkPassword = async (req: Request, res: Response) => {
        const { current_password } = req.body;
        const user = await User.findByPk(req.user.id);

        if (!await checkPassword(current_password, user.password)) {
            const error = new Error('Password actual incorrecto.');
            return res.status(401).json({ error: error.message });
        }

        return res.status(200).json('Password correcto.')
    }
}
