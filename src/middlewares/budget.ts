import { Request, Response, NextFunction } from 'express';
import { body, param, validationResult } from 'express-validator';
import Budget from '../models/Budget';

declare global {
    namespace Express {
        interface Request {
            budget?: Budget;
        }
    }
}

export const validateBudgetId = async (req: Request, res: Response, next: NextFunction) => {
    await param("budgetId")
        .notEmpty().withMessage("El id es requerido.")
        .isInt().withMessage("El id debe ser numérico.")
        .custom((value) => value > 0).withMessage("El id debe ser mayor a cero.").run(req)
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    next();
}

export const validateBudgetExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { budgetId } = req.params;
        const budget = await Budget.findByPk(Number(budgetId));

        if (!budget) {
            const error = new Error(`El presupuesto: ${budgetId} no encontrado.`);
            return res.status(404).json({ error: error.message });
        }
        req.budget = budget;
        next();
    } catch (error) {
        return res.status(500).json({ error: "Hubo un error" });
    }
}

export const validateBudgetInput = async (req: Request, res: Response, next: NextFunction) => {
    await body("name").notEmpty().withMessage("El nombre es requerido.").run(req);
    await body("amount")
        .notEmpty().withMessage("La cantidad es requerida.")
        .isNumeric().withMessage("La cantidad debe ser numerica.")
        .custom((value) => value > 0).withMessage("La cantidad debe ser mayor a cero.").run(req);
    next();
}

export const hasAccess = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.budget.userId !== req.user.id) {
            const error = new Error('Accion no valida.')
            return res.status(401).json({ error: error.message })
        }
        next();

    } catch (error) {
        return res.status(500).json({ error: "Hubo un error" });
    }
}