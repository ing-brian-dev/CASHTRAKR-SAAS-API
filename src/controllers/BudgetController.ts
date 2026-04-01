import type { Request, Response } from "express";
import Budget from "../models/Budget";
import Expense from "../models/Expense";

export class BudgetController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const budget = await Budget.findAll({
        order: [["createdAt", "DESC"]],
        where: { userId: req.user.id }
      });
      return res.status(200).json(budget);
    } catch (error) {
      return res.status(500).json({ error: "Hubo un error" });
    }
  };

  static create = async (req: Request, res: Response) => {
    try {
      const budget = await Budget.create(req.body);
      budget.userId = req.user.id;
      await budget.save();
      return res.status(201).json("Presupuesto Creado Correctamente.");
    } catch (error) {
      return res.status(500).json({ error: "Hubo un error" });
    }
  };

  static getById = async (req: Request, res: Response) => {
    const budget = await Budget.findByPk(req.budget.id, {
      include: [Expense],

    });
    return res.status(200).json(budget);
  };

  static updateById = async (req: Request, res: Response) => {
    await req.budget.update(req.body);
    return res.status(200).json("Presupuesto actualizado correctamente");
  };

  static deleteById = async (req: Request, res: Response) => {
    await req.budget.destroy();
    return res.status(200).json("Presupuesto eliminado correctamente");
  };
}
