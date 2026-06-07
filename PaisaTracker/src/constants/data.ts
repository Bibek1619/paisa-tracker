import { ExpenseCategory, PaymentMethod, IncomeSource } from '../types';

export const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  'Food',
  'Transport',
  'Rent',
  'Utilities',
  'Entertainment',
  'Healthcare',
  'Education',
  'Shopping',
  'Investment',
  'Other',
];

export const PAYMENT_METHODS: PaymentMethod[] = [
  'Cash',
  'eSewa',
  'Khalti',
  'Fonepay',
  'Bank',
  'Card',
];

export const INCOME_SOURCES: IncomeSource[] = [
  'Salary',
  'Freelance',
  'Business',
  'Investment',
  'Rent',
  'Gift',
  'Other',
];

export const CATEGORY_ICONS: Record<ExpenseCategory, string> = {
  Food: 'food',
  Transport: 'car',
  Rent: 'home',
  Utilities: 'lightbulb',
  Entertainment: 'movie',
  Healthcare: 'medical-bag',
  Education: 'school',
  Shopping: 'shopping',
  Investment: 'trending-up',
  Other: 'dots-horizontal',
};

export const CATEGORY_COLORS: Record<ExpenseCategory, string> = {
  Food: '#EF4444',        // Red
  Transport: '#3B82F6',   // Blue
  Rent: '#8B5CF6',        // Purple
  Utilities: '#F59E0B',   // Orange
  Entertainment: '#EC4899', // Pink
  Healthcare: '#10B981',  // Green
  Education: '#2563EB',   // Blue
  Shopping: '#F97316',    // Orange
  Investment: '#10B981',  // Green
  Other: '#6B7280',       // Gray
};
