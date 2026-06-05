// Seed data utility for testing (optional)

import { Expense, Income, Budget } from '../types';
import { generateId, getTodayString } from './helpers';

export const generateSeedExpenses = (): Expense[] => {
  const now = new Date();
  const expenses: Expense[] = [];

  // Current month expenses
  expenses.push(
    {
      id: generateId(),
      amount: 500,
      category: 'Food',
      paymentMethod: 'Cash',
      note: 'Lunch at local restaurant',
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString(),
      createdAt: getTodayString(),
    },
    {
      id: generateId(),
      amount: 200,
      category: 'Transport',
      paymentMethod: 'eSewa',
      note: 'Taxi fare',
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1).toISOString(),
      createdAt: getTodayString(),
    },
    {
      id: generateId(),
      amount: 1500,
      category: 'Shopping',
      paymentMethod: 'Khalti',
      note: 'Clothes shopping',
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2).toISOString(),
      createdAt: getTodayString(),
    },
    {
      id: generateId(),
      amount: 300,
      category: 'Mobile Recharge',
      paymentMethod: 'eSewa',
      note: 'Mobile recharge',
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 3).toISOString(),
      createdAt: getTodayString(),
    },
    {
      id: generateId(),
      amount: 800,
      category: 'Food',
      paymentMethod: 'Cash',
      note: 'Grocery shopping',
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 5).toISOString(),
      createdAt: getTodayString(),
    },
    {
      id: generateId(),
      amount: 1000,
      category: 'Entertainment',
      paymentMethod: 'Bank',
      note: 'Movie tickets',
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7).toISOString(),
      createdAt: getTodayString(),
    },
    {
      id: generateId(),
      amount: 250,
      category: 'Health',
      paymentMethod: 'Cash',
      note: 'Medicine',
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 10).toISOString(),
      createdAt: getTodayString(),
    }
  );

  return expenses;
};

export const generateSeedIncome = (): Income[] => {
  const now = new Date();
  const income: Income[] = [];

  income.push(
    {
      id: generateId(),
      amount: 50000,
      source: 'Salary',
      note: 'Monthly salary',
      date: new Date(now.getFullYear(), now.getMonth(), 1).toISOString(),
      createdAt: getTodayString(),
    },
    {
      id: generateId(),
      amount: 5000,
      source: 'Freelance',
      note: 'Website project',
      date: new Date(now.getFullYear(), now.getMonth(), 15).toISOString(),
      createdAt: getTodayString(),
    }
  );

  return income;
};

export const generateSeedBudgets = (): Budget[] => {
  const now = new Date();
  const budgets: Budget[] = [];

  budgets.push(
    {
      id: generateId(),
      category: 'overall',
      limitAmount: 30000,
      currentSpent: 0,
      month: now.getMonth() + 1,
      year: now.getFullYear(),
    },
    {
      id: generateId(),
      category: 'Food',
      limitAmount: 10000,
      currentSpent: 0,
      month: now.getMonth() + 1,
      year: now.getFullYear(),
    },
    {
      id: generateId(),
      category: 'Transport',
      limitAmount: 5000,
      currentSpent: 0,
      month: now.getMonth() + 1,
      year: now.getFullYear(),
    },
    {
      id: generateId(),
      category: 'Entertainment',
      limitAmount: 3000,
      currentSpent: 0,
      month: now.getMonth() + 1,
      year: now.getFullYear(),
    }
  );

  return budgets;
};

// Helper to seed all data at once
export const seedAllData = async () => {
  const storage = await import('../storage');
  
  // Check if data already exists
  const existingExpenses = await storage.getExpenses();
  if (existingExpenses.length > 0) {
    console.log('✅ Data already exists, skipping seed');
    return;
  }

  const expenses = generateSeedExpenses();
  const income = generateSeedIncome();
  const budgets = generateSeedBudgets();

  await storage.saveExpenses(expenses);
  await storage.saveIncome(income);
  await storage.saveBudgets(budgets);

  console.log('✅ Seed data loaded successfully!');
  console.log(`- ${expenses.length} expenses`);
  console.log(`- ${income.length} income entries`);
  console.log(`- ${budgets.length} budgets`);
};

// Auto-seed on first run
export const autoSeedIfEmpty = async () => {
  try {
    await seedAllData();
  } catch (error) {
    console.error('Error auto-seeding data:', error);
  }
};
