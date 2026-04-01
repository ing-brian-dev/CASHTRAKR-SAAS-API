import type { Request, Response } from 'express';
import Expense from '../models/Expense';

export class ExpenseController {
    static create = async (req: Request, res: Response) => {
        try {
            const expense = new Expense(req.body);
            expense.budgetId = req.budget.id;
            await expense.save();
            return res.status(201).json('Gasto Agregado correctamente!')
        } catch (error) {
            return res.status(500).json({ error: "Hubo un error" });
        }
    }
    
    static getById = async (req: Request, res: Response) => {
        return res.status(200).json(req.expense);
    }

    static updateById = async (req: Request, res: Response) => {
        await req.expense.update(req.body);
        return res.status(200).json('Se actualizo Correctamente!')
    }

    static deleteById = async (req: Request, res: Response) => {
        await req.expense.destroy();
        return res.status(200).json('Gasto Eliminado!');
    }
}