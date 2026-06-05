// Type definitions for PaisaTrack Nepal

export type ExpenseCategory =
  | 'Food'
  | 'Transport'
  | 'Rent'
  | 'Shopping'
  | 'Education'
  | 'Health'
  | 'Entertainment'
  | 'Mobile Recharge'
  | 'Internet'
  | 'Others';

export type PaymentMethod =
  | 'Cash'
  | 'eSewa'
  | 'Khalti'
  | 'Bank'
  | 'Fonepay';

export type IncomeSource =
  | 'Salary'
  | 'Freelance'
  | 'Business'
  | 'Gift'
  | 'Other';

export interface Expense {
  id: string;
  amount: number;
  category: ExpenseCategory;
  paymentMethod: PaymentMethod;
  note: string;
  date: string;
  createdAt: string;
}

export interface Income {
  id: string;
  amount: number;
  source: IncomeSource;
  note: string;
  date: string;
  createdAt: string;
}

export interface Budget {
  id: string;
  category: ExpenseCategory | 'overall';
  limitAmount: number;
  currentSpent: number;
  month: number;
  year: number;
}

export interface MonthlyStats {
  totalIncome: number;
  totalExpense: number;
  netSavings: number;
  remainingBudget: number;
}

export interface CategoryBreakdown {
  category: ExpenseCategory;
  amount: number;
  percentage: number;
  color: string;
}

export interface MonthlyTrend {
  month: string;
  income: number;
  expense: number;
  savings: number;
}

export interface Insight {
  id: string;
  type: 'info' | 'warning' | 'success';
  message: string;
  icon: string;
}

export interface UserSettings {
  name: string;
  currency: string;
  darkMode: boolean;
}
