import { createRequest, createResponse } from 'node-mocks-http'
import { BudgetController } from '../../controllers/BudgetController'
import { budgets } from '../mocks/budgets'
import Budget from '../../models/Budget'

jest.mock('../../models/Budget', () => ({
    findAll: jest.fn(),
    create: jest.fn(),
    findByPk: jest.fn()
}))

describe('BudgetController.getAll', () => {

    beforeEach(() => {
        (Budget.findAll as jest.Mock).mockReset();
        (Budget.findAll as jest.Mock).mockImplementation((options) => {
            const updatedBudgets = budgets.filter((budget) => budget.userId === options.where.userId);
            return Promise.resolve(updatedBudgets)
        })
    })

    it('should retrive 2 budgets for user whit id 1', async () => {

        const req = createRequest({
            method: 'GET',
            url: '/api/budgets',
            user: { id: 1 }
        });

        const res = createResponse();
        await BudgetController.getAll(req, res);

        const data = res._getJSONData();

        expect(data).toHaveLength(2);
        expect(res.statusCode).toBe(200);
        expect(res.statusCode).not.toBe(404);
    });

    it('should retrive 1 budget for user whit id 2', async () => {

        const req = createRequest({
            method: 'GET',
            url: '/api/budgets',
            user: { id: 2 }
        });

        const res = createResponse();
        await BudgetController.getAll(req, res);

        const data = res._getJSONData();

        expect(data).toHaveLength(1);
        expect(res.statusCode).toBe(200);
        expect(res.statusCode).not.toBe(404);
    });

    it('should retrive 0 budgets for user whit id 10', async () => {

        const req = createRequest({
            method: 'GET',
            url: '/api/budgets',
            user: { id: 10 }
        });

        const res = createResponse();
        await BudgetController.getAll(req, res);

        const data = res._getJSONData();

        expect(data).toHaveLength(0);
        expect(res.statusCode).toBe(200);
        expect(res.statusCode).not.toBe(404);
    });

    it('Should handle errors when fetching budgets', async () => {
        const req = createRequest({
            method: 'GET',
            url: '/api/budgets',
            user: { id: 10 }
        });
        const res = createResponse();

        (Budget.findAll as jest.Mock).mockRejectedValue(new Error);
        await BudgetController.getAll(req, res);

        expect(res.statusCode).toBe(500);
        expect(res._getJSONData()).toEqual({ error: 'Hubo un error' });
    });
});

describe('BudgetController.create', () => {
    it('Should create a new Budget and respond with statusCode 201', async () => {
        const mockBudget = {
            save: jest.fn().mockResolvedValue(true)
        };

        (Budget.create as jest.Mock).mockResolvedValue(mockBudget);
        const req = createRequest({
            method: 'POST',
            url: '/api/budgets',
            user: { id: 1 },
            body: {
                name: "Playa",
                amount: 1000
            }
        });

        const res = createResponse();
        await BudgetController.create(req, res)

        const data = res._getJSONData();

        expect(res.statusCode).toBe(201);
        expect(data).toBe("Presupuesto Creado Correctamente.");
        expect(mockBudget.save).toHaveBeenCalled();
        expect(mockBudget.save).toHaveBeenCalledTimes(1);
        expect(Budget.create).toHaveBeenCalledWith(req.body)
    });

    it('Should handle Budget creation error', async () => {

        const mockBudget = {
            save: jest.fn()
        };

        (Budget.create as jest.Mock).mockRejectedValue(new Error);
        const req = createRequest({
            method: 'POST',
            url: '/api/budgets',
            user: { id: 1 },
            body: {
                name: "Playa",
                amount: 1000
            }
        });

        const res = createResponse();
        await BudgetController.create(req, res)

        const data = res._getJSONData();

        expect(res.statusCode).toBe(500);
        expect(data).toEqual({ error: 'Hubo un error' });
        expect(mockBudget.save).not.toHaveBeenCalled();
        expect(Budget.create).toHaveBeenCalledWith(req.body);
    });

});

describe('BudgetController.getById', () => {

    beforeEach(() => {
        (Budget.findByPk as jest.Mock).mockImplementation((id, include) => {
            console.log(id);
            console.log(include);
        });
    });
    
    it('Should return a budget whit id 1 and 3 expenses', async () => {
        const req = createRequest({
            method: 'GET',
            url: '/api/budgets/:budgetId',
            budget: { id: 1 }
        });
        const res = createResponse();
        await BudgetController.getById(req,res);
    })
});