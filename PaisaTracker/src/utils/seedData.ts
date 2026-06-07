import { Expense, Income } from '../types';

export const seedExpenses: Expense[] = [
  {
    id: '1',
    userId: 'demo-user',
    amount: 500,
    category: 'Food',
    description: 'Lunch at restaurant',
    date: new Date(),
    paymentMethod: 'eSewa',
    createdAt: new Date(),
  },
  {
    id: '2',
    userId: 'demo-user',
    amount: 200,
    category: 'Transport',
    description: 'Taxi fare',
    date: new Date(),
    paymentMethod: 'Cash',
    createdAt: new Date(),
  },
];

export const seedIncome: Income[] = [
  {
    id: '1',
    userId: 'demo-user',
    amount: 50000,
    source: 'Salary',
    description: 'Monthly salary',
    date: new Date(),
    createdAt: new Date(),
  },
];
