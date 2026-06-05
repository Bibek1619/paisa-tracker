// Sample seed data and constants for PaisaTrack Nepal

import { ExpenseCategory, PaymentMethod, IncomeSource } from '../types';

export const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  'Food',
  'Transport',
  'Rent',
  'Shopping',
  'Education',
  'Health',
  'Entertainment',
  'Mobile Recharge',
  'Internet',
  'Others',
];

export const PAYMENT_METHODS: PaymentMethod[] = [
  'Cash',
  'eSewa',
  'Khalti',
  'Bank',
  'Fonepay',
];

export const INCOME_SOURCES: IncomeSource[] = [
  'Salary',
  'Freelance',
  'Business',
  'Gift',
  'Other',
];

export const QUICK_AMOUNTS = [100, 500, 1000, 2000, 5000];

export const CURRENCY = 'NPR';
export const CURRENCY_SYMBOL = 'Rs.';

export const BUDGET_THRESHOLDS = {
  LOW: 80,
  MEDIUM: 90,
  HIGH: 100,
};

export const STORAGE_KEYS = {
  EXPENSES: '@expenses',
  INCOME: '@income',
  BUDGETS: '@budgets',
  SETTINGS: '@settings',
};

export const APP_VERSION = '1.0.0';
