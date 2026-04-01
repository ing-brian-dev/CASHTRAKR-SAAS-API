import { Request, Response, NextFunction } from 'express';
import { body, param, validationResult } from 'express-validator';
import Expense from '../models/Expense';

declare global {
    namespace Express {
        interface Request {
            expense?: Expense;
        }
    }
}

export const validateExpenseInput = async (req: Request, res: Response, next: NextFunction) => {
    await body("name").notEmpty().withMessage("El nombre es requerido.").run(req);
    await body("amount")
        .notEmpty().withMessage("La cantidad es requerida.")
        .isNumeric().withMessage("La cantidad debe ser numerica.")
        .custom((value) => value > 0).withMessage("La cantidad debe ser mayor a cero.").run(req);
    next();
}


export const validateExpenseId = async (req: Request, res: Response, next: NextFunction) => {
    await param('expenseId').
        notEmpty().withMessage("El id es requerido.")
        .isInt().withMessage("El id debe ser numérico.")
        .custom((value) => value > 0).withMessage("El id debe ser mayor a cero.").run(req);
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    next();
}

export const validateExpenseExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { expenseId } = req.params;
        const expense = await Expense.findByPk(Number(expenseId));

        if (!expense) {
            const error = new Error(`El gasto: ${expenseId} no fue encontrado.`);
            return res.status(404).json({ error: error.message });
        }
        req.expense = expense;
        next();
    } catch (error) {
        return res.status(500).json({ error: "Hubo un error" });
    }
}

export const belongsToBudget = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.budget.id !== req.expense.budgetId) {
            const error = Error('Acción no válida');
            return res.status(403).json({ error: error.message });
        }

        next();
    } catch (error) {
        return res.status(500).json({ error: "Hubo un error" });
    }
}