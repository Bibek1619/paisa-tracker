// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

// Expense Types
export interface Expense {
  id: string;
  userId: string;
  amount: number;
  category: ExpenseCategory;
  description: string;
  date: Date;
  paymentMethod: PaymentMethod;
  createdAt: Date;
}

export type ExpenseCategory =
  | 'Food'
  | 'Transport'
  | 'Rent'
  | 'Utilities'
  | 'Entertainment'
  | 'Healthcare'
  | 'Education'
  | 'Shopping'
  | 'Investment'
  | 'Other';

export type PaymentMethod = 'Cash' | 'eSewa' | 'Khalti' | 'Fonepay' | 'Bank' | 'Card';

// Income Types
export interface Income {
  id: string;
  userId: string;
  amount: number;
  source: IncomeSource;
  description: string;
  date: Date;
  createdAt: Date;
}

export type IncomeSource =
  | 'Salary'
  | 'Freelance'
  | 'Business'
  | 'Investment'
  | 'Rent'
  | 'Gift'
  | 'Other';

// Budget Types
export interface Budget {
  id: string;
  userId: string;
  category: ExpenseCategory;
  amount: number;
  month: string; // Format: "2024-01"
  spent: number;
  createdAt: Date;
}

// Navigation Types
export type RootStackParamList = {
  Login: undefined;
  Dashboard: undefined;
  Transactions: undefined;
  Reports: undefined;
  Budget: undefined;
  Profile: undefined;
};
