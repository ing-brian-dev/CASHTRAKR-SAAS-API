import { Router } from "express";
import { hasAccess, validateBudgetExists, validateBudgetId, validateBudgetInput } from "../middlewares/budget";
import { belongsToBudget, validateExpenseExists, validateExpenseId, validateExpenseInput } from "../middlewares/expense";
import { handleInputErrors } from "../middlewares/handleInputErrors";
import { BudgetController } from "../controllers/BudgetController";
import { ExpenseController } from "../controllers/ExpenseController";
import { authenticate } from "../middlewares/auth";

const budgetRouter = Router();

budgetRouter.use(authenticate); // req.user

budgetRouter.param("budgetId", validateBudgetId);
budgetRouter.param("budgetId", validateBudgetExists); // req.budget
budgetRouter.param("budgetId", hasAccess );

budgetRouter.param('expenseId', validateExpenseId)
budgetRouter.param('expenseId', validateExpenseExists)
budgetRouter.param('expenseId', belongsToBudget )

budgetRouter.get("/",
    BudgetController.getAll
);

budgetRouter.post("/",
    validateBudgetInput,
    handleInputErrors,
    BudgetController.create
);

budgetRouter.get("/:budgetId",
    BudgetController.getById
);
budgetRouter.put("/:budgetId",
    validateBudgetInput,
    handleInputErrors,
    BudgetController.updateById
);
budgetRouter.delete("/:budgetId",
    BudgetController.deleteById
);

/**Routes for exprenses Arquitecture ROA = orientado a recursos*/

budgetRouter.post('/:budgetId/expenses',
    validateExpenseInput,
    handleInputErrors,
    ExpenseController.create
);
budgetRouter.get('/:budgetId/expenses/:expenseId', ExpenseController.getById);
budgetRouter.put('/:budgetId/expenses/:expenseId', 
    validateExpenseInput,
    handleInputErrors,
    ExpenseController.updateById
);
budgetRouter.delete('/:budgetId/expenses/:expenseId', ExpenseController.deleteById);

export default budgetRouter;
